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

const request = (token, options) => utils.request({
  ...options,
  headers: {
    ...options.headers,
    Authorization: `Bearer ${token.accessToken}`,
  },
});

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
      .then(token => request(token, {
        method: 'GET',
        url: 'https://www.googleapis.com/plus/v1/people/me',
      }).then((res) => {
        // Add name to token
        token.name = res.body.displayName;
        const existingToken = store.getters['data/googleTokens'][token.sub];
        if (existingToken) {
          if (!sub) {
            throw new Error('Google account already linked.');
          }
          // Add isLogin and nextPageToken to token
          token.isLogin = existingToken.isLogin;
          token.nextPageToken = existingToken.nextPageToken;
        }
        // Add token to googleTokens
        store.dispatch('data/setGoogleToken', token);
        return token;
      }));
  },
  refreshToken(scopes, token) {
    const sub = token.sub;
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
  getChanges(token) {
    let changes = [];
    return this.refreshToken(['https://www.googleapis.com/auth/drive.appdata'], token)
      .then((refreshedToken) => {
        const getPage = (pageToken = '1') => request(refreshedToken, {
          method: 'GET',
          url: 'https://www.googleapis.com/drive/v3/changes',
          params: {
            pageToken,
            spaces: 'appDataFolder',
            pageSize: 1000,
            fields: 'nextPageToken,newStartPageToken,changes(fileId,removed,file/name,file/properties)',
          },
        }).then((res) => {
          changes = changes.concat(res.body.changes.filter(item => item.fileId));
          if (res.body.nextPageToken) {
            return getPage(res.body.nextPageToken);
          }
          changes.forEach((change) => {
            if (change.file) {
              change.item = {
                name: change.file.name,
              };
              if (change.file.properties) {
                Object.keys(change.file.properties).forEach((key) => {
                  change.item[key] = JSON.parse(change.file.properties[key]);
                });
              }
              change.syncData = {
                id: change.fileId,
                itemId: change.item.id,
                updated: change.item.updated,
              };
              change.file = undefined;
            }
          });
          changes.nextPageToken = res.body.newStartPageToken;
          return changes;
        });

        return getPage(refreshedToken.nextPageToken);
      });
  },
  updateNextPageToken(token, changes) {
    const lastToken = store.getters['data/googleTokens'][token.sub];
    if (changes.nextPageToken !== lastToken.nextPageToken) {
      store.dispatch('data/setGoogleToken', {
        ...lastToken,
        nextPageToken: changes.nextPageToken,
      });
    }
  },
  saveItem(token, item, syncData, ifNotTooLate = cb => res => cb(res)) {
    return this.refreshToken(['https://www.googleapis.com/auth/drive.appdata'], token)
      // Refreshing a token can take a while if an oauth window pops up, so check if it's too late
      .then(ifNotTooLate((refreshedToken) => {
        const options = {
          method: 'POST',
          url: 'https://www.googleapis.com/drive/v3/files',
        };
        const metadata = {
          name: item.name,
          properties: {},
        };
        if (syncData) {
          options.method = 'PATCH';
          options.url = `https://www.googleapis.com/drive/v3/files/${syncData.id}`;
        } else {
          // Parents field is not patchable
          metadata.parents = ['appDataFolder'];
        }
        Object.keys(item).forEach((key) => {
          if (key !== 'name' && key !== 'tx') {
            metadata.properties[key] = JSON.stringify(item[key]);
          }
        });
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
          options.url = options.url.replace(
            'https://www.googleapis.com/',
            'https://www.googleapis.com/upload/');
          return request(refreshedToken, {
            ...options,
            params: {
              uploadType: 'multipart',
            },
            headers: {
              'Content-Type': `multipart/mixed; boundary="${boundary}"`,
            },
            body: multipartRequestBody,
          });
        }
        return request(refreshedToken, {
          ...options,
          body: metadata,
        }).then(res => ({
          // Build sync data
          id: res.body.id,
          itemId: item.id,
          updated: item.updated,
        }));
      }));
  },
  removeItem(token, syncData, ifNotTooLate = cb => res => cb(res)) {
    return this.refreshToken(['https://www.googleapis.com/auth/drive.appdata'], token)
      // Refreshing a token can take a while if an oauth window pops up, so check if it's too late
      .then(ifNotTooLate(refreshedToken => request(refreshedToken, {
        method: 'DELETE',
        url: `https://www.googleapis.com/drive/v3/files/${syncData.id}`,
      })).then(() => syncData));
  },
  downloadFile(refreshedToken, id) {
    return request(refreshedToken, {
      method: 'GET',
      url: `https://www.googleapis.com/drive/v3/files/${id}?alt=media`,
    }).then(res => res.body);
  },
  downloadAppDataFile(token, id) {
    return this.refreshToken(['https://www.googleapis.com/auth/drive.appdata'], token)
      .then(refreshedToken => this.downloadFile(refreshedToken, id));
  },
};
