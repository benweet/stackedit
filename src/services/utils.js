import yaml from 'js-yaml';
import defaultProperties from '../data/defaultFileProperties.yml';

const workspaceId = 'main';
const origin = `${location.protocol}//${location.host}`;

// For uid()
const uidLength = 16;
const crypto = window.crypto || window.msCrypto;
const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const radix = alphabet.length;
const array = new Uint32Array(uidLength);

// For isUserActive
const inactiveAfter = 2 * 60 * 1000; // 2 minutes
let lastActivity;
const setLastActivity = () => {
  lastActivity = Date.now();
};
window.document.addEventListener('mousedown', setLastActivity);
window.document.addEventListener('keydown', setLastActivity);
window.document.addEventListener('touchstart', setLastActivity);

// For isWindowFocused
let lastFocus;
const lastFocusKey = `${workspaceId}/lastWindowFocus`;
const setLastFocus = () => {
  lastFocus = Date.now();
  localStorage[lastFocusKey] = lastFocus;
  setLastActivity();
};
setLastFocus();
window.addEventListener('focus', setLastFocus);

// For addQueryParams()
const urlParser = window.document.createElement('a');

// For loadScript()
const scriptLoadingPromises = Object.create(null);

// For startOauth2
const oauth2AuthorizationTimeout = 120 * 1000; // 2 minutes

// For checkOnline
const checkOnlineTimeout = 15 * 1000; // 15 sec

export default {
  workspaceId,
  origin,
  oauth2RedirectUri: `${origin}/oauth2/callback`,
  types: [
    'contentState',
    'syncedContent',
    'content',
    'file',
    'folder',
    'syncLocation',
    'publishLocation',
    'data',
  ],
  deepCopy(obj) {
    return obj == null ? obj : JSON.parse(JSON.stringify(obj));
  },
  serializeObject(obj) {
    return obj === undefined ? obj : JSON.stringify(obj, (key, value) => {
      if (Object.prototype.toString.call(value) !== '[object Object]') {
        return value;
      }
      // Sort keys to have a predictable result
      return Object.keys(value).sort().reduce((sorted, valueKey) => {
        sorted[valueKey] = value[valueKey];
        return sorted;
      }, {});
    });
  },
  uid() {
    crypto.getRandomValues(array);
    return array.cl_map(value => alphabet[value % radix]).join('');
  },
  hash(str) {
    let hash = 0;
    if (!str) return hash;
    for (let i = 0; i < str.length; i += 1) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char; // eslint-disable-line no-bitwise
      hash |= 0; // eslint-disable-line no-bitwise
    }
    return hash;
  },
  encodeBase64(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      (match, p1) => String.fromCharCode(`0x${p1}`)));
  },
  decodeBase64(str) {
    return decodeURIComponent(atob(str).split('').map(
      c => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`).join(''));
  },
  computeProperties(yamlProperties) {
    const customProperties = yaml.safeLoad(yamlProperties);
    const properties = yaml.safeLoad(defaultProperties);
    const override = (obj, opt) => {
      const objType = Object.prototype.toString.call(obj);
      const optType = Object.prototype.toString.call(opt);
      if (objType !== optType) {
        return obj;
      } else if (objType !== '[object Object]') {
        return opt === undefined ? obj : opt;
      }
      Object.keys({
        ...obj,
        ...opt,
      }).forEach((key) => {
        obj[key] = override(obj[key], opt[key]);
      });
      return obj;
    };
    return override(properties, customProperties);
  },
  randomize(value) {
    return Math.floor((1 + (Math.random() * 0.2)) * value);
  },
  setInterval(func, interval) {
    return setInterval(() => func(), this.randomize(interval));
  },
  isWindowFocused() {
    return parseInt(localStorage[lastFocusKey], 10) === lastFocus;
  },
  isUserActive() {
    return lastActivity > Date.now() - inactiveAfter && this.isWindowFocused();
  },
  addQueryParams(url = '', params = {}) {
    const keys = Object.keys(params).filter(key => params[key] != null);
    if (!keys.length) {
      return url;
    }
    urlParser.href = url;
    if (urlParser.search) {
      urlParser.search += '&';
    } else {
      urlParser.search = '?';
    }
    urlParser.search += keys.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join('&');
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
    params.redirect_uri = this.oauth2RedirectUri;
    const authorizeUrl = this.addQueryParams(url, params);
    if (silent) {
      // Use an iframe as wnd for silent mode
      oauth2Context.iframeElt = document.createElement('iframe');
      oauth2Context.iframeElt.style.position = 'absolute';
      oauth2Context.iframeElt.style.left = '-9999px';
      oauth2Context.closeTimeout = setTimeout(
        () => oauth2Context.clean('Unknown error.'),
        checkOnlineTimeout);
      oauth2Context.iframeElt.onerror = () => oauth2Context.clean('Unknown error.');
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
      oauth2Context.closeTimeout = setTimeout(
        () => oauth2Context.clean('Timeout.'),
        oauth2AuthorizationTimeout);
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
        oauth2Context.clean = () => {
          // Prevent from cleaning several times
        };
        if (errorMsg) {
          reject(new Error(errorMsg));
        }
      };

      oauth2Context.msgHandler = (event) => {
        if (event.source === oauth2Context.wnd &&
          event.origin === this.origin
        ) {
          oauth2Context.clean();
          const data = {};
          `${event.data}`.slice(1).split('&').forEach((param) => {
            const [key, value] = param.split('=').map(decodeURIComponent);
            if (key === 'state') {
              data.state = value;
            } else if (key === 'access_token') {
              data.accessToken = value;
            } else if (key === 'code') {
              data.code = value;
            } else if (key === 'expires_in') {
              data.expiresIn = value;
            }
          });
          if (data.state === state) {
            resolve(data);
            return;
          }
          reject('Could not get required authorization.');
        }
      };
      window.addEventListener('message', oauth2Context.msgHandler);

      oauth2Context.checkClosedInterval = !silent && setInterval(() => {
        if (oauth2Context.wnd.closed) {
          oauth2Context.clean('Authorize window was closed.');
        }
      }, 250);
    });
  },
  request(configParam) {
    let retryAfter = 500; // 500 ms
    const maxRetryAfter = 30 * 1000; // 30 sec
    const config = Object.assign({}, configParam);
    config.timeout = config.timeout || 30 * 1000; // 30 sec
    config.headers = Object.assign({}, config.headers);
    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
      config.headers['Content-Type'] = 'application/json';
    }

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
          if (!config.raw) {
            try {
              result.body = JSON.parse(result.body);
            } catch (e) {
              // ignore
            }
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
        }, config.timeout);

        const url = this.addQueryParams(config.url, config.params);
        xhr.open(config.method || 'GET', url);
        Object.keys(config.headers).forEach((key) => {
          const value = config.headers[key];
          if (value) {
            xhr.setRequestHeader(key, `${value}`);
          }
        });
        xhr.send(config.body || null);
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
  checkOnline() {
    const checkStatus = (res) => {
      if (!res.status || res.status < 200) {
        throw new Error('Offline...');
      }
    };
    return this.request({
      url: 'https://www.googleapis.com/plus/v1/people/me',
      timeout: checkOnlineTimeout,
    })
      .then(checkStatus, checkStatus);
  },
};
