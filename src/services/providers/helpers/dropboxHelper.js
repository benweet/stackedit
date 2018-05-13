import networkSvc from '../../networkSvc';
import store from '../../../store';

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

  /**
   * https://www.dropbox.com/developers/documentation/http/documentation#oauth2-authorize
   */
  async startOauth2(fullAccess, sub = null, silent = false) {
    const { accessToken } = await networkSvc.startOauth2(
      'https://www.dropbox.com/oauth2/authorize',
      {
        client_id: getAppKey(fullAccess),
        response_type: 'token',
      },
      silent,
    );

    // Call the user info endpoint
    const { body } = await request({ accessToken }, {
      method: 'POST',
      url: 'https://api.dropboxapi.com/2/users/get_current_account',
    });

    // Check the returned sub consistency
    if (sub && `${body.account_id}` !== sub) {
      throw new Error('Dropbox account ID not expected.');
    }

    // Build token object including scopes and sub
    const token = {
      accessToken,
      name: body.name.display_name,
      sub: `${body.account_id}`,
      fullAccess,
    };

    // Add token to dropboxTokens
    store.dispatch('data/setDropboxToken', token);
    return token;
  },
  addAccount(fullAccess = false) {
    return this.startOauth2(fullAccess);
  },

  /**
   * https://www.dropbox.com/developers/documentation/http/documentation#files-upload
   */
  async uploadFile({
    token,
    path,
    content,
    fileId,
  }) {
    return (await request(token, {
      method: 'POST',
      url: 'https://content.dropboxapi.com/2/files/upload',
      body: content,
    }, {
      path: fileId || path,
      mode: 'overwrite',
    })).body;
  },

  /**
   * https://www.dropbox.com/developers/documentation/http/documentation#files-download
   */
  async downloadFile({
    token,
    path,
    fileId,
  }) {
    const res = await request(token, {
      method: 'POST',
      url: 'https://content.dropboxapi.com/2/files/download',
      raw: true,
    }, {
      path: fileId || path,
    });
    return {
      id: JSON.parse(res.headers['dropbox-api-result']).id,
      content: res.body,
    };
  },

  /**
   * https://www.dropbox.com/developers/chooser
   */
  async openChooser(token) {
    if (!window.Dropbox) {
      await networkSvc.loadScript('https://www.dropbox.com/static/api/2/dropins.js');
    }
    return new Promise((resolve) => {
      window.Dropbox.appKey = getAppKey(token.fullAccess);
      window.Dropbox.choose({
        multiselect: true,
        linkType: 'direct',
        success: files => resolve(files.map((file) => {
          const path = file.link.replace(/.*\/view\/[^/]*/, '');
          return decodeURI(path);
        })),
        cancel: () => resolve([]),
      });
    });
  },
};
