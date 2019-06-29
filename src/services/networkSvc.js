import utils from './utils';
import store from '../store';
import constants from '../data/constants';

const scriptLoadingPromises = Object.create(null);
const authorizeTimeout = 6 * 60 * 1000; // 2 minutes
const silentAuthorizeTimeout = 15 * 1000; // 15 secondes (which will be reattempted)
const networkTimeout = 30 * 1000; // 30 sec
let isConnectionDown = false;
const userInactiveAfter = 3 * 60 * 1000; // 3 minutes (twice the default sync period)
let lastActivity = 0;
let lastFocus = 0;
let isConfLoading = false;
let isConfLoaded = false;

function parseHeaders(xhr) {
  const pairs = xhr.getAllResponseHeaders().trim().split('\n');
  const headers = {};
  pairs.forEach((header) => {
    const split = header.trim().split(':');
    const key = split.shift().trim().toLowerCase();
    const value = split.join(':').trim();
    headers[key] = value;
  });
  return headers;
}

function isRetriable(err) {
  if (err.status === 403) {
    const googleReason = ((((err.body || {}).error || {}).errors || [])[0] || {}).reason;
    return googleReason === 'rateLimitExceeded' || googleReason === 'userRateLimitExceeded';
  }
  return err.status === 429 || (err.status >= 500 && err.status < 600);
}

export default {
  async init() {
    // Keep track of the last user activity
    const setLastActivity = () => {
      lastActivity = Date.now();
    };
    window.document.addEventListener('mousedown', setLastActivity);
    window.document.addEventListener('keydown', setLastActivity);
    window.document.addEventListener('touchstart', setLastActivity);

    // Keep track of the last window focus
    lastFocus = 0;
    const setLastFocus = () => {
      lastFocus = Date.now();
      localStorage.setItem(store.getters['workspace/lastFocusKey'], lastFocus);
      setLastActivity();
    };
    if (document.hasFocus()) {
      setLastFocus();
    }
    window.addEventListener('focus', setLastFocus);

    // Check that browser is online periodically
    const checkOffline = async () => {
      const isBrowserOffline = window.navigator.onLine === false;
      if (!isBrowserOffline
        && store.state.lastOfflineCheck + networkTimeout + 5000 < Date.now()
        && this.isUserActive()
      ) {
        store.commit('updateLastOfflineCheck');
        const script = document.createElement('script');
        let timeout;
        try {
          await new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = reject;
            script.src = `https://apis.google.com/js/api.js?${Date.now()}`;
            try {
              document.head.appendChild(script); // This can fail with bad network
              timeout = setTimeout(reject, networkTimeout);
            } catch (e) {
              reject(e);
            }
          });
          isConnectionDown = false;
        } catch (e) {
          isConnectionDown = true;
        } finally {
          clearTimeout(timeout);
          document.head.removeChild(script);
        }
      }
      const offline = isBrowserOffline || isConnectionDown;
      if (store.state.offline !== offline) {
        store.commit('setOffline', offline);
        if (offline) {
          store.dispatch('notification/error', 'You are offline.');
        } else {
          store.dispatch('notification/info', 'You are back online!');
          this.getServerConf();
        }
      }
    };

    utils.setInterval(checkOffline, 1000);
    window.addEventListener('online', () => {
      isConnectionDown = false;
      checkOffline();
    });
    window.addEventListener('offline', checkOffline);
    await checkOffline();
    this.getServerConf();
  },
  async getServerConf() {
    if (!store.state.offline && !isConfLoading && !isConfLoaded) {
      try {
        isConfLoading = true;
        const res = await this.request({ url: 'conf' });
        await store.dispatch('data/setServerConf', res.body);
        isConfLoaded = true;
      } finally {
        isConfLoading = false;
      }
    }
  },
  isWindowFocused() {
    // We don't use state.workspace.lastFocus as it's not reactive
    const storedLastFocus = localStorage.getItem(store.getters['workspace/lastFocusKey']);
    return parseInt(storedLastFocus, 10) === lastFocus;
  },
  isUserActive() {
    return lastActivity > Date.now() - userInactiveAfter && this.isWindowFocused();
  },
  isConfLoaded() {
    return !!Object.keys(store.getters['data/serverConf']).length;
  },
  async loadScript(url) {
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
  async startOauth2(url, params = {}, silent = false, reattempt = false) {
    try {
      // Build the authorize URL
      const state = utils.uid();
      const authorizeUrl = utils.addQueryParams(url, {
        ...params,
        state,
        redirect_uri: constants.oauth2RedirectUri,
      });

      let iframeElt;
      let wnd;
      if (silent) {
        // Use an iframe as wnd for silent mode
        iframeElt = utils.createHiddenIframe(authorizeUrl);
        document.body.appendChild(iframeElt);
        wnd = iframeElt.contentWindow;
      } else {
        // Open a tab otherwise
        wnd = window.open(authorizeUrl);
        if (!wnd) {
          throw new Error('The authorize window was blocked.');
        }
      }

      let checkClosedInterval;
      let closeTimeout;
      let msgHandler;
      try {
        return await new Promise((resolve, reject) => {
          if (silent) {
            iframeElt.onerror = () => {
              reject(new Error('Unknown error.'));
            };
            closeTimeout = setTimeout(() => {
              if (!reattempt) {
                reject(new Error('REATTEMPT'));
              } else {
                isConnectionDown = true;
                store.commit('setOffline', true);
                store.commit('updateLastOfflineCheck');
                reject(new Error('You are offline.'));
              }
            }, silentAuthorizeTimeout);
          } else {
            closeTimeout = setTimeout(() => {
              reject(new Error('Timeout.'));
            }, authorizeTimeout);
          }

          msgHandler = (event) => {
            if (event.source === wnd && event.origin === constants.origin) {
              const data = utils.parseQueryParams(`${event.data}`.slice(1));
              if (data.error || data.state !== state) {
                console.error(data); // eslint-disable-line no-console
                reject(new Error('Could not get required authorization.'));
              } else {
                resolve({
                  accessToken: data.access_token,
                  code: data.code,
                  idToken: data.id_token,
                  expiresIn: data.expires_in,
                });
              }
            }
          };

          window.addEventListener('message', msgHandler);
          if (!silent) {
            checkClosedInterval = setInterval(() => {
              if (wnd.closed) {
                reject(new Error('Authorize window was closed.'));
              }
            }, 250);
          }
        });
      } finally {
        clearInterval(checkClosedInterval);
        if (!silent && !wnd.closed) {
          wnd.close();
        }
        if (iframeElt) {
          document.body.removeChild(iframeElt);
        }
        clearTimeout(closeTimeout);
        window.removeEventListener('message', msgHandler);
      }
    } catch (e) {
      if (e.message === 'REATTEMPT') {
        return this.startOauth2(url, params, silent, true);
      }
      throw e;
    }
  },
  async request(config, offlineCheck = false) {
    let retryAfter = 500; // 500 ms
    const maxRetryAfter = 10 * 1000; // 10 sec
    const sanitizedConfig = Object.assign({}, config);
    sanitizedConfig.timeout = sanitizedConfig.timeout || networkTimeout;
    sanitizedConfig.headers = Object.assign({}, sanitizedConfig.headers);
    if (sanitizedConfig.body && typeof sanitizedConfig.body === 'object') {
      sanitizedConfig.body = JSON.stringify(sanitizedConfig.body);
      sanitizedConfig.headers['Content-Type'] = 'application/json';
    }

    const attempt = async () => {
      try {
        return await new Promise((resolve, reject) => {
          if (offlineCheck) {
            store.commit('updateLastOfflineCheck');
          }

          const xhr = new window.XMLHttpRequest();
          xhr.withCredentials = sanitizedConfig.withCredentials || false;

          const timeoutId = setTimeout(() => {
            xhr.abort();
            if (offlineCheck) {
              isConnectionDown = true;
              store.commit('setOffline', true);
              reject(new Error('You are offline.'));
            } else {
              reject(new Error('Network request timeout.'));
            }
          }, sanitizedConfig.timeout);

          xhr.onload = () => {
            if (offlineCheck) {
              isConnectionDown = false;
            }
            clearTimeout(timeoutId);
            const result = {
              status: xhr.status,
              headers: parseHeaders(xhr),
              body: sanitizedConfig.blob ? xhr.response : xhr.responseText,
            };
            if (!sanitizedConfig.raw && !sanitizedConfig.blob) {
              try {
                result.body = JSON.parse(result.body);
              } catch (e) {
                // ignore
              }
            }
            if (result.status >= 200 && result.status < 300) {
              resolve(result);
            } else {
              reject(result);
            }
          };

          xhr.onerror = () => {
            clearTimeout(timeoutId);
            if (offlineCheck) {
              isConnectionDown = true;
              store.commit('setOffline', true);
              reject(new Error('You are offline.'));
            } else {
              reject(new Error('Network request failed.'));
            }
          };

          const url = utils.addQueryParams(sanitizedConfig.url, sanitizedConfig.params);
          xhr.open(sanitizedConfig.method || 'GET', url);
          Object.entries(sanitizedConfig.headers).forEach(([key, value]) => {
            if (value) {
              xhr.setRequestHeader(key, `${value}`);
            }
          });
          if (sanitizedConfig.blob) {
            xhr.responseType = 'blob';
          }
          xhr.send(sanitizedConfig.body || null);
        });
      } catch (err) {
        // Try again later in case of retriable error
        if (isRetriable(err) && retryAfter < maxRetryAfter) {
          await new Promise((resolve) => {
            setTimeout(resolve, retryAfter);
            // Exponential backoff
            retryAfter *= 2;
          });
          return attempt();
        }
        throw err;
      }
    };

    return attempt();
  },
};
