import networkSvc from '../../networkSvc';
import store from '../../../store';

let Dropbox;

const getAppKey = (fullAccess) => {
  if (fullAccess) {
    return 'lq6mwopab8wskas';
  }
  return 'sw0hlixhr8q1xk0';
};

const request = (token, options, args) => networkSvc.request({
  ...options,
  headers: {
    ...options.headers || {},
    'Content-Type': options.body && (typeof options.body === 'string'
      ? 'application/octet-stream' : 'application/json; charset=utf-8'),
    'Dropbox-API-Arg': args && JSON.stringify(args),
    Authorization: `Bearer ${token.accessToken}`,
  },
});

export default {
  startOauth2(fullAccess, sub = null, silent = false) {
    return networkSvc.startOauth2(
      'https://www.dropbox.com/oauth2/authorize', {
        client_id: getAppKey(fullAccess),
        response_type: 'token',
      }, silent)
      // Call the user info endpoint
      .then(({ accessToken }) => request({ accessToken }, {
        method: 'POST',
        url: 'https://api.dropboxapi.com/2/users/get_current_account',
      })
        .then((res) => {
          // Check the returned sub consistency
          if (sub && `${res.body.account_id}` !== sub) {
            throw new Error('Dropbox account ID not expected.');
          }
          // Build token object including scopes and sub
          const token = {
            accessToken,
            name: res.body.name.display_name,
            sub: `${res.body.account_id}`,
            fullAccess,
          };
          // Add token to dropboxTokens
          store.dispatch('data/setDropboxToken', token);
          return token;
        }));
  },
  loadClientScript() {
    if (Dropbox) {
      return Promise.resolve();
    }
    return networkSvc.loadScript('https://www.dropbox.com/static/api/2/dropins.js')
      .then(() => {
        Dropbox = window.Dropbox;
      });
  },
  addAccount(fullAccess = false) {
    return this.startOauth2(fullAccess);
  },
  uploadFile(token, path, content, fileId) {
    return request(token, {
      method: 'POST',
      url: 'https://content.dropboxapi.com/2/files/upload',
      body: content,
    }, {
      path: fileId || path,
      mode: 'overwrite',
    })
      .then(res => res.body);
  },
  downloadFile(token, path, fileId) {
    return request(token, {
      method: 'POST',
      url: 'https://content.dropboxapi.com/2/files/download',
      raw: true,
    }, {
      path: fileId || path,
    })
      .then(res => ({
        id: JSON.parse(res.headers['dropbox-api-result']).id,
        content: res.body,
      }));
  },
  openChooser(token) {
    return this.loadClientScript()
      .then(() => new Promise((resolve) => {
        Dropbox.appKey = getAppKey(token.fullAccess);
        Dropbox.choose({
          multiselect: true,
          linkType: 'direct',
          success: (files) => {
            const paths = files.map((file) => {
              const path = file.link.replace(/.*\/view\/[^/]*/, '');
              return decodeURI(path);
            });
            resolve(paths);
          },
          cancel: () => resolve([]),
        });
      }));
  },
};
