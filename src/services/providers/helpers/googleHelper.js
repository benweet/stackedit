import utils from '../../utils';
import store from '../../../store';

const clientId = '241271498917-t4t7d07qis7oc0ahaskbif3ft6tk63cd.apps.googleusercontent.com';
const appsDomain = null;
const tokenExpirationMargin = 5 * 60 * 1000; // 5 min (Google tokens expire after 1h)
let gapi;
let google;

const driveAppDataScopes = ['https://www.googleapis.com/auth/drive.appdata'];
const getDriveScopes = token => [token.driveFullAccess
  ? 'https://www.googleapis.com/auth/drive'
  : 'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.install'];
const bloggerScopes = ['https://www.googleapis.com/auth/blogger'];
const photosScopes = ['https://www.googleapis.com/auth/photos'];

const libraries = ['picker'];

const request = (token, options) => utils.request({
  ...options,
  headers: {
    ...options.headers || {},
    Authorization: `Bearer ${token.accessToken}`,
  },
});

function uploadFile(refreshedToken, name, parents, media = null, mediaType = 'text/plain', fileId = null, ifNotTooLate = cb => res => cb(res)) {
  return Promise.resolve()
    // Refreshing a token can take a while if an oauth window pops up, so check if it's too late
    .then(ifNotTooLate(() => {
      const options = {
        method: 'POST',
        url: 'https://www.googleapis.com/drive/v3/files',
      };
      const metadata = { name };
      if (fileId) {
        options.method = 'PATCH';
        options.url = `https://www.googleapis.com/drive/v3/files/${fileId}`;
      } else if (parents) {
        // Parents field is not patchable
        metadata.parents = parents;
      }
      if (media) {
        const boundary = `-------${utils.uid()}`;
        const delimiter = `\r\n--${boundary}\r\n`;
        const closeDelimiter = `\r\n--${boundary}--`;
        let multipartRequestBody = '';
        multipartRequestBody += delimiter;
        multipartRequestBody += 'Content-Type: application/json; charset=UTF-8\r\n\r\n';
        multipartRequestBody += JSON.stringify(metadata);
        multipartRequestBody += delimiter;
        multipartRequestBody += `Content-Type: ${mediaType}; charset=UTF-8\r\n\r\n`;
        multipartRequestBody += media;
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
        }).then(res => res.body);
      }
      return request(refreshedToken, {
        ...options,
        body: metadata,
      }).then(res => res.body);
    }));
}

function downloadFile(refreshedToken, id) {
  return request(refreshedToken, {
    method: 'GET',
    url: `https://www.googleapis.com/drive/v3/files/${id}?alt=media`,
    raw: true,
  }).then(res => res.body);
}

export default {
  startOauth2(scopes, sub = null, silent = false) {
    return utils.startOauth2(
      'https://accounts.google.com/o/oauth2/v2/auth', {
        client_id: clientId,
        response_type: 'token',
        scope: ['openid', ...scopes].join(' '), // Need openid for user info
        hd: appsDomain,
        login_hint: sub,
        prompt: silent ? 'none' : null,
      }, silent)
      // Call the token info endpoint
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
        if (sub && `${res.body.sub}` !== sub) {
          throw new Error('Google account ID not expected.');
        }
        // Build token object including scopes and sub
        return {
          scopes,
          accessToken: data.accessToken,
          expiresOn: Date.now() + (data.expiresIn * 1000),
          sub: `${res.body.sub}`,
          isLogin: !store.getters['data/loginToken'] &&
            scopes.indexOf('https://www.googleapis.com/auth/drive.appdata') !== -1,
          isDrive: scopes.indexOf('https://www.googleapis.com/auth/drive') !== -1 ||
            scopes.indexOf('https://www.googleapis.com/auth/drive.file') !== -1,
          isBlogger: scopes.indexOf('https://www.googleapis.com/auth/blogger') !== -1,
          isPhotos: scopes.indexOf('https://www.googleapis.com/auth/photos') !== -1,
          driveFullAccess: scopes.indexOf('https://www.googleapis.com/auth/drive') !== -1,
        };
      }))
      // Call the user info endpoint
      .then(token => request(token, {
        method: 'GET',
        url: 'https://www.googleapis.com/plus/v1/people/me',
      }).then((res) => {
        // Add name to token
        token.name = res.body.displayName;
        const existingToken = store.getters['data/googleTokens'][token.sub];
        if (existingToken) {
          // We probably retrieved a new token with restricted scopes.
          // That's no problem, token will be refreshed later with merged scopes.
          // Save flags
          token.isLogin = existingToken.isLogin || token.isLogin;
          token.isDrive = existingToken.isDrive || token.isDrive;
          token.isBlogger = existingToken.isBlogger || token.isBlogger;
          token.isPhotos = existingToken.isPhotos || token.isPhotos;
          token.driveFullAccess = existingToken.driveFullAccess || token.driveFullAccess;
          // Save nextPageToken
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
        if (mergedScopes.length === lastToken.scopes.length &&
          lastToken.expiresOn > Date.now() + tokenExpirationMargin
        ) {
          return lastToken;
        }
        // New scopes are requested or existing token is going to expire.
        // Try to get a new token in background
        return this.startOauth2(mergedScopes, sub, true)
          // If it fails try to popup a window
          .catch(() => utils.checkOnline() // Check that we are online, silent mode is a hack
            .then(() => store.dispatch('modal/providerRedirection', {
              providerName: 'Google',
              onResolve: () => this.startOauth2(mergedScopes, sub),
            })));
      });
  },
  loadClientScript() {
    if (gapi) {
      return Promise.resolve();
    }
    return utils.loadScript('https://apis.google.com/js/api.js')
      .then(() => Promise.all(libraries.map(
        library => new Promise((resolve, reject) => window.gapi.load(library, {
          callback: resolve,
          onerror: reject,
          timeout: 30000,
          ontimeout: reject,
        })))))
      .then(() => {
        gapi = window.gapi;
        google = window.google;
      });
  },
  signin() {
    return this.startOauth2(driveAppDataScopes);
  },
  addDriveAccount(fullAccess = false) {
    return this.startOauth2(getDriveScopes({ driveFullAccess: fullAccess }));
  },
  addBloggerAccount() {
    return this.startOauth2(bloggerScopes);
  },
  addPhotosAccount() {
    return this.startOauth2(photosScopes);
  },
  getChanges(token) {
    const result = {
      changes: [],
    };
    return this.refreshToken(driveAppDataScopes, token)
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
          result.changes = result.changes.concat(res.body.changes.filter(item => item.fileId));
          if (res.body.nextPageToken) {
            return getPage(res.body.nextPageToken);
          }
          result.nextPageToken = res.body.newStartPageToken;
          return result;
        });

        return getPage(refreshedToken.nextPageToken);
      });
  },
  uploadFile(token, name, parents, media, mediaType, fileId, ifNotTooLate) {
    return this.refreshToken(getDriveScopes(token), token)
      .then(refreshedToken => uploadFile(
        refreshedToken, name, parents, media, mediaType, fileId, ifNotTooLate));
  },
  uploadAppDataFile(token, name, parents, media, fileId, ifNotTooLate) {
    return this.refreshToken(driveAppDataScopes, token)
      .then(refreshedToken => uploadFile(
        refreshedToken, name, parents, media, undefined, fileId, ifNotTooLate));
  },
  downloadFile(token, id) {
    return this.refreshToken(getDriveScopes(token), token)
      .then(refreshedToken => downloadFile(refreshedToken, id));
  },
  downloadAppDataFile(token, id) {
    return this.refreshToken(driveAppDataScopes, token)
      .then(refreshedToken => downloadFile(refreshedToken, id));
  },
  removeAppDataFile(token, id, ifNotTooLate = cb => res => cb(res)) {
    return this.refreshToken(driveAppDataScopes, token)
      // Refreshing a token can take a while if an oauth window pops up, so check if it's too late
      .then(ifNotTooLate(refreshedToken => request(refreshedToken, {
        method: 'DELETE',
        url: `https://www.googleapis.com/drive/v3/files/${id}`,
      })));
  },
  uploadBlogger(
    token, blogUrl, blogId, postId, title, content, labels, isDraft, published, isPage,
  ) {
    return this.refreshToken(bloggerScopes, token)
      .then(refreshedToken => Promise.resolve()
        .then(() => {
          if (blogId) {
            return blogId;
          }
          return request(refreshedToken, {
            url: 'https://www.googleapis.com/blogger/v3/blogs/byurl',
            params: {
              url: blogUrl,
            },
          }).then(res => res.body.id);
        })
        .then((resolvedBlogId) => {
          const path = isPage ? 'pages' : 'posts';
          const options = {
            method: 'POST',
            url: `https://www.googleapis.com/blogger/v3/blogs/${resolvedBlogId}/${path}/`,
            body: {
              kind: isPage ? 'blogger#page' : 'blogger#post',
              blog: {
                id: resolvedBlogId,
              },
              title,
              content,
            },
          };
          if (labels) {
            options.body.labels = labels;
          }
          if (published) {
            options.body.published = published.toISOString();
          }
          // If it's an update
          if (postId) {
            options.method = 'PUT';
            options.url += postId;
            options.body.id = postId;
          }
          return request(refreshedToken, options)
            .then(res => res.body);
        })
        .then((post) => {
          if (isPage) {
            return post;
          }
          const options = {
            method: 'POST',
            url: `https://www.googleapis.com/blogger/v3/blogs/${post.blog.id}/posts/${post.id}/`,
            params: {},
          };
          if (isDraft) {
            options.url += 'revert';
          } else {
            options.url += 'publish';
            if (published) {
              options.params.publishDate = published.toISOString();
            }
          }
          return request(refreshedToken, options)
            .then(res => res.body);
        }));
  },
  openPicker(token, type = 'doc') {
    const scopes = type === 'img' ? photosScopes : getDriveScopes(token);
    return this.loadClientScript()
      .then(() => this.refreshToken(scopes, token))
      .then(refreshedToken => new Promise((resolve) => {
        let picker;
        const pickerBuilder = new google.picker.PickerBuilder()
          .setOAuthToken(refreshedToken.accessToken)
          .setCallback((data) => {
            switch (data[google.picker.Response.ACTION]) {
              case google.picker.Action.PICKED:
              case google.picker.Action.CANCEL:
                resolve(data.docs || []);
                picker.dispose();
                break;
              default:
            }
          });
        switch (type) {
          default:
          case 'doc': {
            const view = new google.picker.DocsView(google.picker.ViewId.DOCS);
            view.setParent('root');
            view.setIncludeFolders(true);
            view.setMimeTypes([
              'text/plain',
              'text/x-markdown',
              'application/octet-stream',
            ].join(','));
            pickerBuilder.enableFeature(google.picker.Feature.NAV_HIDDEN);
            pickerBuilder.enableFeature(google.picker.Feature.MULTISELECT_ENABLED);
            pickerBuilder.addView(view);
            break;
          }
          case 'folder': {
            const view = new google.picker.DocsView(google.picker.ViewId.FOLDERS);
            view.setParent('root');
            view.setIncludeFolders(true);
            view.setSelectFolderEnabled(true);
            view.setMimeTypes('application/vnd.google-apps.folder');
            pickerBuilder.enableFeature(google.picker.Feature.NAV_HIDDEN);
            pickerBuilder.addView(view);
            break;
          }
          case 'img': {
            let view = new google.picker.PhotosView();
            view.setType('flat');
            pickerBuilder.addView(view);
            view = new google.picker.PhotosView();
            view.setType('ofuser');
            pickerBuilder.addView(view);
            pickerBuilder.addView(google.picker.ViewId.PHOTO_UPLOAD);
            break;
          }
        }
        picker = pickerBuilder.build();
        picker.setVisible(true);
      }));
  },
};
