// For uid()
const crypto = window.crypto || window.msCrypto;
const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const radix = alphabet.length;
const array = new Uint32Array(20);

// For addQueryParam()
const urlParser = window.document.createElement('a');

// For loadScript()
const scriptLoadingPromises = Object.create(null);

// For startOauth2()
const origin = `${location.protocol}//${location.host}`;

export default {
  uid() {
    crypto.getRandomValues(array);
    return array.cl_map(value => alphabet[value % radix]).join('');
  },
  setInterval(func, interval) {
    const randomizedInterval = Math.floor((1 + (Math.random() * 0.1)) * interval);
    return setInterval(() => func(), randomizedInterval);
  },
  addQueryParam(url, key, value) {
    if (!url || !key || value == null) {
      return url;
    }
    urlParser.href = url;
    if (urlParser.search) {
      urlParser.search += '&';
    } else {
      urlParser.search = '?';
    }
    urlParser.search += `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    return urlParser.href;
  },
  loadScript(url) {
    if (!scriptLoadingPromises[url]) {
      scriptLoadingPromises[url] = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.onload = resolve;
        script.onerror = () => {
          scriptLoadingPromises[url] = null;
          reject();
        };
        script.src = url;
        document.head.appendChild(script);
      });
    }
    return scriptLoadingPromises[url];
  },
  startOauth2(url, params = {}, silent = false) {
    const oauth2Context = {};

    // Build the authorize URL
    const state = this.uid();
    params.state = state;
    params.redirect_uri = `${origin}/oauth2/callback.html`;
    let authorizeUrl = url;
    Object.keys(params).forEach((key) => {
      authorizeUrl = this.addQueryParam(authorizeUrl, key, params[key]);
    });
    if (silent) {
      // Use an iframe as wnd for silent mode
      oauth2Context.iframeElt = document.createElement('iframe');
      oauth2Context.iframeElt.style.position = 'absolute';
      oauth2Context.iframeElt.style.left = '-9999px';
      oauth2Context.iframeElt.onload = () => {
        oauth2Context.closeTimeout = setTimeout(() => oauth2Context.clean(), 5 * 1000);
      };
      oauth2Context.iframeElt.src = authorizeUrl;
      document.body.appendChild(oauth2Context.iframeElt);
      oauth2Context.wnd = oauth2Context.iframeElt.contentWindow;
    } else {
      // Open a new tab otherwise
      oauth2Context.wnd = window.open(authorizeUrl);
      // If window opening has been blocked by the browser
      if (!oauth2Context.wnd) {
        return Promise.reject();
      }
      oauth2Context.closeTimeout = setTimeout(() => oauth2Context.clean(), 120 * 1000);
    }
    return new Promise((resolve, reject) => {
      oauth2Context.clean = (errorMsg) => {
        clearInterval(oauth2Context.checkClosedInterval);
        if (!silent && !oauth2Context.wnd.closed) {
          oauth2Context.wnd.close();
        }
        if (oauth2Context.iframeElt) {
          document.body.removeChild(oauth2Context.iframeElt);
        }
        clearTimeout(oauth2Context.closeTimeout);
        window.removeEventListener('message', oauth2Context.msgHandler);
        oauth2Context.clean = () => {}; // Prevent from cleaning several times
        if (errorMsg) {
          reject(new Error(errorMsg));
        }
      };

      oauth2Context.msgHandler = (event) => {
        if (event.source === oauth2Context.wnd &&
          event.origin === origin &&
          event.data &&
          event.data.state === state
        ) {
          oauth2Context.clean();
          if (event.data.accessToken) {
            resolve(event.data);
          } else {
            reject(event.data);
          }
        }
      };
      window.addEventListener('message', oauth2Context.msgHandler);

      oauth2Context.checkClosedInterval = !silent && setInterval(() => {
        if (oauth2Context.wnd.closed) {
          oauth2Context.clean();
        }
      }, 200);
    });
  },
  request(configParam) {
    const timeout = 30 * 1000; // 30 sec
    let retryAfter = 500; // 500 ms
    const maxRetryAfter = 30 * 1000; // 30 sec
    const config = Object.assign({}, configParam);
    config.headers = Object.assign({
      'Content-Type': 'application/json',
    }, config.headers);

    function parseHeaders(xhr) {
      const pairs = xhr.getAllResponseHeaders().trim().split('\n');
      return pairs.reduce((headers, header) => {
        const split = header.trim().split(':');
        const key = split.shift().trim().toLowerCase();
        const value = split.join(':').trim();
        headers[key] = value;
        return headers;
      }, {});
    }

    function isRetriable(err) {
      switch (err.status) {
        case 403:
          {
            const googleReason = ((((err.body || {}).error || {}).errors || [])[0] || {}).reason;
            return googleReason === 'rateLimitExceeded' || googleReason === 'userRateLimitExceeded';
          }
        case 429:
          return true;
        default:
          if (err.status >= 500 && err.status < 600) {
            return true;
          }
      }
      return false;
    }

    const attempt =
      () => new Promise((resolve, reject) => {
        const xhr = new window.XMLHttpRequest();
        let timeoutId;

        xhr.onload = () => {
          clearTimeout(timeoutId);
          const result = {
            status: xhr.status,
            headers: parseHeaders(xhr),
            body: xhr.responseText,
          };
          try {
            result.body = JSON.parse(result.body);
          } catch (e) {
            // ignore
          }
          if (result.status >= 200 && result.status < 300) {
            resolve(result);
            return;
          }
          reject(result);
        };

        xhr.onerror = () => {
          clearTimeout(timeoutId);
          reject(new Error('Network request failed.'));
        };

        timeoutId = setTimeout(() => {
          xhr.abort();
          reject(new Error('Network request timeout.'));
        }, timeout);

        // Add query params to URL
        let url = config.url || '';
        if (config.params) {
          Object.keys(config.params).forEach((key) => {
            url = this.addQueryParam(url, key, config.params[key]);
          });
        }

        xhr.open(config.method, url);
        Object.keys(config.headers).forEach((key) => {
          xhr.setRequestHeader(key, config.headers[key]);
        });
        xhr.send(config.body ? JSON.stringify(config.body) : null);
      })
      .catch((err) => {
        // Try again later in case of retriable error
        if (isRetriable(err) && retryAfter < maxRetryAfter) {
          return new Promise(
              (resolve) => {
                setTimeout(resolve, retryAfter);
                // Exponential backoff
                retryAfter *= 2;
              })
            .then(attempt);
        }
        throw err;
      });

    return attempt();
  },
};
