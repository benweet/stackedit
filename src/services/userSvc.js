import utils from './utils';
import store from '../store';

const googleClientId = '241271498917-t4t7d07qis7oc0ahaskbif3ft6tk63cd.apps.googleusercontent.com';
const appUri = 'http://localhost:8080/';
const googleAppsDomain = null;
const origin = `${location.protocol}//${location.host}`;

export default {
  oauth2Context: null,
  signinWithGoogle() {
    this.cleanOauth2Context();
    const state = utils.uid();
    let authorizeUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    authorizeUrl = utils.addQueryParam(authorizeUrl, 'client_id', googleClientId);
    authorizeUrl = utils.addQueryParam(authorizeUrl, 'response_type', 'token');
    authorizeUrl = utils.addQueryParam(authorizeUrl, 'redirect_uri', `${appUri}oauth2/callback.html`);
    authorizeUrl = utils.addQueryParam(authorizeUrl, 'state', state);
    if (googleAppsDomain) {
      authorizeUrl = utils.addQueryParam(authorizeUrl, 'scope', 'openid email');
      authorizeUrl = utils.addQueryParam(authorizeUrl, 'hd', googleAppsDomain);
    } else {
      authorizeUrl = utils.addQueryParam(authorizeUrl, 'scope', 'profile email');
    }
    const wnd = window.open(authorizeUrl);
    if (!wnd) {
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      const msgHandler = (event) => {
        if (event.source === wnd
          && event.origin === origin
          && event.data
          && event.data.state === state
        ) {
          this.cleanOauth2Context();
          if (event.data.accessToken) {
            store.dispatch('data/patchTokens', {
              googleToken: {
                accessToken: event.data.accessToken,
              },
            });
            resolve();
          }
        }
      };
      window.addEventListener('message', msgHandler);
      const checkClosedInterval = setInterval(() => {
        if (this.oauth2Context && this.oauth2Context.wnd.closed) {
          this.cleanOauth2Context();
        }
      }, 200);
      this.oauth2Context = {
        wnd,
        msgHandler,
        checkClosedInterval,
      };
    });
  },
  cleanOauth2Context() {
    if (this.oauth2Context) {
      clearInterval(this.oauth2Context.checkClosedInterval);
      if (!this.oauth2Context.wnd.closed) {
        this.oauth2Context.wnd.close();
      }
      window.removeEventListener('message', this.oauth2Context.msgHandler);
      this.oauth2Context = null;
    }
  },
};
