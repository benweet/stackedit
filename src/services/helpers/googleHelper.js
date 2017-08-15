import utils from '../utils';
import store from '../../store';

const clientId = '241271498917-t4t7d07qis7oc0ahaskbif3ft6tk63cd.apps.googleusercontent.com';
const appsDomain = null;
const tokenExpirationMargin = 10 * 60 * 1000; // 10 min

// const scopeMap = {
//   profile: [
//     'https://www.googleapis.com/auth/userinfo.profile',
//   ],
//   gdrive: [
//     'https://www.googleapis.com/auth/drive.install',
//     store.getters['data/settings'].gdriveFullAccess === true ?
//     'https://www.googleapis.com/auth/drive' :
//     'https://www.googleapis.com/auth/drive.file',
//   ],
//   blogger: [
//     'https://www.googleapis.com/auth/blogger',
//   ],
//   picasa: [
//     'https://www.googleapis.com/auth/photos',
//   ],
// };

const request = (googleToken, options) => utils.request({
  ...options,
  headers: {
    ...options.headers,
    Authorization: `Bearer ${googleToken.accessToken}`,
  },
});

const saveFile = (googleToken, data, appData) => {
  const options = {
    method: 'POST',
    url: 'https://www.googleapis.com/upload/drive/v2/files',
    headers: {},
  };
  if (appData) {
    options.method = 'PUT';
    options.url = `https://www.googleapis.com/drive/v2/files/${appData.id}`;
    options.headers['if-match'] = appData.etag;
  }
  const metadata = {
    title: data.name,
    parents: [{
      id: 'appDataFolder',
    }],
    properties: Object.keys(data)
      .filter(key => key !== 'name' && key !== 'tx')
      .map(key => ({
        key,
        value: JSON.stringify(data[key]),
        visibility: 'PUBLIC',
      })),
  };
  const media = null;
  const boundary = `-------${utils.uid()}`;
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;
  if (media) {
    let multipartRequestBody = '';
    multipartRequestBody += delimiter;
    multipartRequestBody += 'Content-Type: application/json\r\n\r\n';
    multipartRequestBody += JSON.stringify(metadata);
    multipartRequestBody += delimiter;
    multipartRequestBody += 'Content-Type: application/json\r\n\r\n';
    multipartRequestBody += JSON.stringify(media);
    multipartRequestBody += closeDelimiter;
    return request(googleToken, {
      ...options,
      params: {
        uploadType: 'multipart',
      },
      headers: {
        ...options.headers,
        'Content-Type': `multipart/mixed; boundary="${boundary}"`,
      },
      body: multipartRequestBody,
    });
  }
  return request(googleToken, {
    ...options,
    body: metadata,
  }).then(res => ({
    id: res.body.id,
    etag: res.body.etag,
  }));
};

export default {
  startOauth2(scopes, sub = null, silent = false) {
    return utils.startOauth2(
        'https://accounts.google.com/o/oauth2/v2/auth', {
          client_id: clientId,
          response_type: 'token',
          scope: scopes.join(' '),
          hd: appsDomain,
          login_hint: sub,
          prompt: silent ? 'none' : null,
        }, silent)
      // Call the tokeninfo endpoint
      .then(data => utils.request({
        method: 'POST',
        url: 'https://www.googleapis.com/oauth2/v3/tokeninfo',
        params: {
          access_token: data.accessToken,
        },
      }).then((res) => {
        // Check the returned client ID consistency
        if (res.body.aud !== clientId) {
          throw new Error('Client ID inconsistent.');
        }
        // Check the returned sub consistency
        if (sub && res.body.sub !== sub) {
          throw new Error('Google account ID not expected.');
        }
        // Build token object including scopes and sub
        return {
          scopes,
          accessToken: data.accessToken,
          expiresOn: Date.now() + (data.expiresIn * 1000),
          sub: res.body.sub,
          isLogin: !store.getters['data/loginToken'],
        };
      }))
      // Call the tokeninfo endpoint
      .then(googleToken => request(googleToken, {
        method: 'GET',
        url: 'https://www.googleapis.com/plus/v1/people/me',
      }).then((res) => {
        // Add name to googleToken
        googleToken.name = res.body.displayName;
        const existingToken = store.getters['data/googleTokens'][googleToken.sub];
        if (existingToken) {
          if (!sub) {
            throw new Error('Google account already linked.');
          }
          // Add isLogin and lastChangeId to googleToken
          googleToken.isLogin = existingToken.isLogin;
          googleToken.lastChangeId = existingToken.lastChangeId;
        }
        // Add googleToken to googleTokens
        store.dispatch('data/setGoogleToken', googleToken);
        return googleToken;
      }));
  },
  refreshToken(scopes, googleToken) {
    const sub = googleToken.sub;
    const lastToken = store.getters['data/googleTokens'][sub];
    const mergedScopes = [...new Set([
      ...scopes,
      ...lastToken.scopes,
    ])];

    return Promise.resolve()
      .then(() => {
        if (mergedScopes.length === lastToken.scopes.length) {
          return lastToken;
        }
        // New scopes are requested, popup an authorize window
        return this.startOauth2(mergedScopes, sub);
      })
      .then((refreshedToken) => {
        if (refreshedToken.expiresOn > Date.now() + tokenExpirationMargin) {
          // Token is fresh enough
          return refreshedToken;
        }
        // Token is almost outdated, try to take one in background
        return this.startOauth2(mergedScopes, sub, true)
          // If it fails try to popup a window
          .catch(() => this.startOauth2(mergedScopes, sub));
      });
  },
  getChanges(googleToken) {
    let changes = [];
    return this.refreshToken(['https://www.googleapis.com/auth/drive.appdata'], googleToken)
      .then((refreshedToken) => {
        const lastChangeId = refreshedToken.lastChangeId || 0;
        const getPage = pageToken => request(refreshedToken, {
          method: 'GET',
          url: 'https://www.googleapis.com/drive/v2/changes',
          params: {
            pageToken,
            startChangeId: pageToken || !lastChangeId ? null : lastChangeId + 1,
            spaces: 'appDataFolder',
            fields: 'nextPageToken,items(deleted,file/id,file/etag,file/title,file/properties(key,value))',
          },
        }).then((res) => {
          changes = changes.concat(res.body.items);
          if (res.body.nextPageToken) {
            return getPage(res.body.nextPageToken);
          }
          return changes;
        });

        return getPage();
      });
  },
  updateLastChangeId(googleToken, changes) {
    const refreshedToken = store.getters['data/googleTokens'][googleToken.sub];
    let lastChangeId = refreshedToken.lastChangeId || 0;
    changes.forEach((change) => {
      if (change.id > lastChangeId) {
        lastChangeId = change.id;
      }
    });
    if (lastChangeId !== refreshedToken.lastChangeId) {
      store.dispatch('data/setGoogleToken', {
        ...refreshedToken,
        lastChangeId,
      });
    }
  },
  insertData(googleToken, data) {
    return this.refreshToken(['https://www.googleapis.com/auth/drive.appdata'], googleToken)
      .then(refreshedToken => saveFile(refreshedToken, data));
  },
  updateData(googleToken, data, appData) {
    return this.refreshToken(['https://www.googleapis.com/auth/drive.appdata'], googleToken)
      .then(refreshedToken => saveFile(refreshedToken, data, appData));
  },
};
