import networkSvc from '../../networkSvc';
import userSvc from '../../userSvc';
import store from '../../../store';
import badgeSvc from '../../badgeSvc';

const getAppKey = (fullAccess) => {
  if (fullAccess) {
    return store.getters['data/serverConf'].dropboxAppKeyFull;
  }
  return store.getters['data/serverConf'].dropboxAppKey;
};

const httpHeaderSafeJson = args => args && JSON.stringify(args)
  .replace(/[\u007f-\uffff]/g, c => `\\u${`000${c.charCodeAt(0).toString(16)}`.slice(-4)}`);

const request = ({ accessToken }, options, args) => networkSvc.request({
  ...options,
  headers: {
    ...options.headers || {},
    'Content-Type': options.body && (typeof options.body === 'string'
      ? 'application/octet-stream' : 'application/json; charset=utf-8'),
    'Dropbox-API-Arg': httpHeaderSafeJson(args),
    Authorization: `Bearer ${accessToken}`,
  },
});

/**
 * https://www.dropbox.com/developers/documentation/http/documentation#users-get_account
 */
const subPrefix = 'db';
userSvc.setInfoResolver('dropbox', subPrefix, async (sub) => {
  const dropboxToken = Object.values(store.getters['data/dropboxTokensBySub'])[0];
  try {
    const { body } = await request(dropboxToken, {
      method: 'POST',
      url: 'https://api.dropboxapi.com/2/users/get_account',
      body: {
        account_id: sub,
      },
    });

    return {
      id: `${subPrefix}:${body.account_id}`,
      name: body.name.display_name,
      imageUrl: body.profile_photo_url || '',
    };
  } catch (err) {
    if (!dropboxToken || err.status !== 404) {
      throw new Error('RETRY');
    }
    throw err;
  }
});

export default {
  subPrefix,

  /**
   * https://www.dropbox.com/developers/documentation/http/documentation#oauth2-authorize
   * https://www.dropbox.com/developers/documentation/http/documentation#users-get_current_account
   */
  async startOauth2(fullAccess, sub = null, silent = false) {
    // Get an OAuth2 code
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
    userSvc.addUserInfo({
      id: `${subPrefix}:${body.account_id}`,
      name: body.name.display_name,
      imageUrl: body.profile_photo_url || '',
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

    // Add token to dropbox tokens
    store.dispatch('data/addDropboxToken', token);
    return token;
  },
  async addAccount(fullAccess = false) {
    const token = await this.startOauth2(fullAccess);
    badgeSvc.addBadge('addDropboxAccount');
    return token;
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
   * https://www.dropbox.com/developers/documentation/http/documentation#list-revisions
   */
  async listRevisions({
    token,
    path,
    fileId,
  }) {
    const res = await request(token, {
      method: 'POST',
      url: 'https://api.dropboxapi.com/2/files/list_revisions',
      body: fileId ? {
        path: fileId,
        mode: 'id',
        limit: 100,
      } : {
        path,
        limit: 100,
      },
    });
    return res.body.entries;
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
