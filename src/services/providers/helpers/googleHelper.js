import utils from '../../utils';
import networkSvc from '../../networkSvc';
import store from '../../../store';

const clientId = GOOGLE_CLIENT_ID;
const apiKey = 'AIzaSyC_M4RA9pY6XmM9pmFxlT59UPMO7aHr9kk';
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

const checkIdToken = (idToken) => {
  try {
    const token = idToken.split('.');
    const payload = JSON.parse(utils.decodeBase64(token[1]));
    return payload.aud === clientId && Date.now() + tokenExpirationMargin < payload.exp * 1000;
  } catch (e) {
    return false;
  }
};

let driveState;
if (utils.queryParams.providerId === 'googleDrive') {
  try {
    driveState = JSON.parse(utils.queryParams.state);
  } catch (e) {
    // Ignore
  }
}

export default {
  folderMimeType: 'application/vnd.google-apps.folder',
  driveState,
  driveActionFolder: null,
  driveActionFiles: [],
  request(token, options) {
    return networkSvc.request({
      ...options,
      headers: {
        ...options.headers || {},
        Authorization: `Bearer ${token.accessToken}`,
      },
    }, true)
      .catch((err) => {
        const reason = ((((err.body || {}).error || {}).errors || [])[0] || {}).reason;
        if (reason === 'authError') {
          // Mark the token as revoked and get a new one
          store.dispatch('data/setGoogleToken', {
            ...token,
            expiresOn: 0,
          });
          // Refresh token and retry
          return this.refreshToken(token, token.scopes)
            .then(refreshedToken => this.request(refreshedToken, options));
        }
        throw err;
      });
  },
  uploadFileInternal(
    refreshedToken,
    name,
    parents,
    appProperties,
    media = null,
    mediaType = null,
    fileId = null,
    oldParents = null,
    ifNotTooLate = cb => res => cb(res),
  ) {
    return Promise.resolve()
      // Refreshing a token can take a while if an oauth window pops up, make sure it's not too late
      .then(ifNotTooLate(() => {
        const options = {
          method: 'POST',
          url: 'https://www.googleapis.com/drive/v3/files',
        };
        const params = {
          supportsTeamDrives: true,
        };
        const metadata = { name, appProperties };
        if (fileId) {
          options.method = 'PATCH';
          options.url = `https://www.googleapis.com/drive/v3/files/${fileId}`;
          if (parents && oldParents) {
            params.addParents = parents
              .filter(parent => oldParents.indexOf(parent) === -1)
              .join(',');
            params.removeParents = oldParents
              .filter(parent => parents.indexOf(parent) === -1)
              .join(',');
          }
        } else if (parents) {
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
          multipartRequestBody += `Content-Type: ${mediaType || 'text/plain'}; charset=UTF-8\r\n\r\n`;
          multipartRequestBody += media;
          multipartRequestBody += closeDelimiter;
          options.url = options.url.replace(
            'https://www.googleapis.com/',
            'https://www.googleapis.com/upload/');
          return this.request(refreshedToken, {
            ...options,
            params: {
              ...params,
              uploadType: 'multipart',
            },
            headers: {
              'Content-Type': `multipart/mixed; boundary="${boundary}"`,
            },
            body: multipartRequestBody,
          }).then(res => res.body);
        }
        if (mediaType) {
          metadata.mimeType = mediaType;
        }
        return this.request(refreshedToken, {
          ...options,
          body: metadata,
          params,
        }).then(res => res.body);
      }));
  },
  downloadFileInternal(refreshedToken, id) {
    return this.request(refreshedToken, {
      method: 'GET',
      url: `https://www.googleapis.com/drive/v3/files/${id}?alt=media`,
      raw: true,
    }).then(res => res.body);
  },
  removeFileInternal(refreshedToken, id, ifNotTooLate = cb => res => cb(res)) {
    return Promise.resolve()
      // Refreshing a token can take a while if an oauth window pops up, so check if it's too late
      .then(ifNotTooLate(() => this.request(refreshedToken, {
        method: 'DELETE',
        url: `https://www.googleapis.com/drive/v3/files/${id}`,
        params: {
          supportsTeamDrives: true,
        },
      })));
  },
  getFileRevisionsInternal(refreshedToken, id) {
    return Promise.resolve()
      .then(() => {
        const revisions = [];
        const getPage = pageToken => this.request(refreshedToken, {
          method: 'GET',
          url: `https://www.googleapis.com/drive/v3/files/${id}/revisions`,
          params: {
            pageToken,
            pageSize: 1000,
            fields: 'nextPageToken,revisions(id,modifiedTime,lastModifyingUser/permissionId,lastModifyingUser/displayName,lastModifyingUser/photoLink)',
          },
        })
          .then((res) => {
            res.body.revisions.forEach((revision) => {
              store.commit('userInfo/addItem', {
                id: revision.lastModifyingUser.permissionId,
                name: revision.lastModifyingUser.displayName,
                imageUrl: revision.lastModifyingUser.photoLink,
              });
              revisions.push(revision);
            });
            if (res.body.nextPageToken) {
              return getPage(res.body.nextPageToken);
            }
            return revisions;
          });

        return getPage();
      });
  },
  downloadFileRevisionInternal(refreshedToken, fileId, revisionId) {
    return Promise.resolve()
      .then(() => this.request(refreshedToken, {
        method: 'GET',
        url: `https://www.googleapis.com/drive/v3/files/${fileId}/revisions/${revisionId}?alt=media`,
        raw: true,
      }).then(res => res.body));
  },
  getUser(userId) {
    return networkSvc.request({
      method: 'GET',
      url: `https://www.googleapis.com/plus/v1/people/${userId}?key=${apiKey}`,
    }, true)
      .then((res) => {
        store.commit('userInfo/addItem', {
          id: res.body.id,
          name: res.body.displayName,
          imageUrl: (res.body.image.url || '').replace(/\bsz?=\d+$/, 'sz=40'),
        });
        return res.body;
      });
  },
  startOauth2(scopes, sub = null, silent = false) {
    return networkSvc.startOauth2(
      'https://accounts.google.com/o/oauth2/v2/auth', {
        client_id: clientId,
        response_type: 'token id_token',
        scope: ['openid', ...scopes].join(' '),
        hd: appsDomain,
        login_hint: sub,
        prompt: silent ? 'none' : null,
        nonce: utils.uid(),
      }, silent)
      // Call the token info endpoint
      .then(data => networkSvc.request({
        method: 'POST',
        url: 'https://www.googleapis.com/oauth2/v3/tokeninfo',
        params: {
          access_token: data.accessToken,
        },
      }, true).then((res) => {
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
          idToken: data.idToken,
          sub: `${res.body.sub}`,
          isLogin: !store.getters['workspace/mainWorkspaceToken'] &&
            scopes.indexOf('https://www.googleapis.com/auth/drive.appdata') !== -1,
          isSponsor: false,
          isDrive: scopes.indexOf('https://www.googleapis.com/auth/drive') !== -1 ||
            scopes.indexOf('https://www.googleapis.com/auth/drive.file') !== -1,
          isBlogger: scopes.indexOf('https://www.googleapis.com/auth/blogger') !== -1,
          isPhotos: scopes.indexOf('https://www.googleapis.com/auth/photos') !== -1,
          driveFullAccess: scopes.indexOf('https://www.googleapis.com/auth/drive') !== -1,
        };
      }))
      // Call the user info endpoint
      .then(token => this.getUser(token.sub)
        .catch((err) => {
          if (err.status === 404) {
            store.dispatch('notification/info', 'Please activate Google Plus to change your account name and photo!');
          } else {
            throw err;
          }
        })
        .then((user = {}) => {
          const existingToken = store.getters['data/googleTokens'][token.sub];
          // Add name to token
          token.name = user.displayName || (existingToken && existingToken.name) || 'Unknown';
          if (existingToken) {
            // We probably retrieved a new token with restricted scopes.
            // That's no problem, token will be refreshed later with merged scopes.
            // Restore flags
            Object.assign(token, {
              isLogin: existingToken.isLogin || token.isLogin,
              isSponsor: existingToken.isSponsor,
              isDrive: existingToken.isDrive || token.isDrive,
              isBlogger: existingToken.isBlogger || token.isBlogger,
              isPhotos: existingToken.isPhotos || token.isPhotos,
              driveFullAccess: existingToken.driveFullAccess || token.driveFullAccess,
            });
          }
          return token.isLogin && networkSvc.request({
            method: 'GET',
            url: 'userInfo',
            params: {
              idToken: token.idToken,
            },
          })
            .then((res) => {
              token.isSponsor = res.body.sponsorUntil > Date.now();
            }, () => {
              // Ignore error
            });
        })
        .then(() => {
          // Add token to googleTokens
          store.dispatch('data/setGoogleToken', token);
          return token;
        }));
  },
  refreshToken(token, scopes = []) {
    const sub = token.sub;
    const lastToken = store.getters['data/googleTokens'][sub];
    const mergedScopes = [...new Set([
      ...scopes,
      ...lastToken.scopes,
    ])];

    return Promise.resolve()
      .then(() => {
        if (
          // If we already have permissions for the requested scopes
          mergedScopes.length === lastToken.scopes.length &&
          // And lastToken is not expired
          lastToken.expiresOn > Date.now() + tokenExpirationMargin &&
          // And in case of a login token, ID token is still valid
          (!lastToken.isLogin || checkIdToken(lastToken.idToken))
        ) {
          return lastToken;
        }
        // New scopes are requested or existing token is going to expire.
        // Try to get a new token in background
        return this.startOauth2(mergedScopes, sub, true)
          // If it fails try to popup a window
          .catch((err) => {
            if (store.state.offline) {
              throw err;
            }
            return store.dispatch('modal/providerRedirection', {
              providerName: 'Google',
              onResolve: () => this.startOauth2(mergedScopes, sub),
            });
          });
      });
  },
  loadClientScript() {
    if (gapi) {
      return Promise.resolve();
    }
    return networkSvc.loadScript('https://apis.google.com/js/api.js')
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
  getSponsorship(token) {
    return this.refreshToken(token)
      .then(refreshedToken => networkSvc.request({
        method: 'GET',
        url: 'userInfo',
        params: {
          idToken: refreshedToken.idToken,
        },
      }, true));
  },
  signin() {
    return this.startOauth2(driveAppDataScopes);
  },
  addDriveAccount(fullAccess = false, sub = null) {
    return this.startOauth2(getDriveScopes({ driveFullAccess: fullAccess }), sub);
  },
  addBloggerAccount() {
    return this.startOauth2(bloggerScopes);
  },
  addPhotosAccount() {
    return this.startOauth2(photosScopes);
  },
  getChanges(token, startPageToken, isAppData, teamDriveId = null) {
    const result = {
      changes: [],
    };
    let fileFields = 'file/name';
    if (!isAppData) {
      fileFields += ',file/parents,file/mimeType,file/appProperties';
    }
    return this.refreshToken(token, isAppData ? driveAppDataScopes : getDriveScopes(token))
      .then((refreshedToken) => {
        const getPage = (pageToken = '1') => this.request(refreshedToken, {
          method: 'GET',
          url: 'https://www.googleapis.com/drive/v3/changes',
          params: {
            pageToken,
            spaces: isAppData ? 'appDataFolder' : 'drive',
            pageSize: 1000,
            fields: `nextPageToken,newStartPageToken,changes(fileId,${fileFields})`,
            supportsTeamDrives: true,
            includeTeamDriveItems: !!teamDriveId,
            teamDriveId,
          },
        })
          .then((res) => {
            result.changes = result.changes.concat(res.body.changes.filter(item => item.fileId));
            if (res.body.nextPageToken) {
              return getPage(res.body.nextPageToken);
            }
            result.startPageToken = res.body.newStartPageToken;
            return result;
          });

        return getPage(startPageToken);
      });
  },
  uploadFile(
    token,
    name,
    parents,
    appProperties,
    media,
    mediaType,
    fileId,
    oldParents,
    ifNotTooLate,
  ) {
    return this.refreshToken(token, getDriveScopes(token))
      .then(refreshedToken => this.uploadFileInternal(
        refreshedToken,
        name,
        parents,
        appProperties,
        media,
        mediaType,
        fileId,
        oldParents,
        ifNotTooLate,
      ));
  },
  uploadAppDataFile(token, name, media, fileId, ifNotTooLate) {
    return this.refreshToken(token, driveAppDataScopes)
      .then(refreshedToken => this.uploadFileInternal(
        refreshedToken,
        name,
        ['appDataFolder'],
        undefined,
        media,
        undefined,
        fileId,
        undefined,
        ifNotTooLate,
      ));
  },
  getFile(token, id) {
    return this.refreshToken(token, getDriveScopes(token))
      .then(refreshedToken => this.request(refreshedToken, {
        method: 'GET',
        url: `https://www.googleapis.com/drive/v3/files/${id}`,
        params: {
          fields: 'id,name,mimeType,appProperties,teamDriveId',
          supportsTeamDrives: true,
        },
      })
      .then(res => res.body));
  },
  downloadFile(token, id) {
    return this.refreshToken(token, getDriveScopes(token))
      .then(refreshedToken => this.downloadFileInternal(refreshedToken, id));
  },
  downloadAppDataFile(token, id) {
    return this.refreshToken(token, driveAppDataScopes)
      .then(refreshedToken => this.downloadFileInternal(refreshedToken, id));
  },
  removeFile(token, id, ifNotTooLate) {
    return this.refreshToken(token, getDriveScopes(token))
      .then(refreshedToken => this.removeFileInternal(refreshedToken, id, ifNotTooLate));
  },
  removeAppDataFile(token, id, ifNotTooLate = cb => res => cb(res)) {
    return this.refreshToken(token, driveAppDataScopes)
      .then(refreshedToken => this.removeFileInternal(refreshedToken, id, ifNotTooLate));
  },
  getFileRevisions(token, id) {
    return this.refreshToken(token, getDriveScopes(token))
      .then(refreshedToken => this.getFileRevisionsInternal(refreshedToken, id));
  },
  getAppDataFileRevisions(token, id) {
    return this.refreshToken(token, driveAppDataScopes)
      .then(refreshedToken => this.getFileRevisionsInternal(refreshedToken, id));
  },
  downloadFileRevision(token, fileId, revisionId) {
    return this.refreshToken(token, getDriveScopes(token))
      .then(refreshedToken => this.downloadFileRevisionInternal(
        refreshedToken, fileId, revisionId));
  },
  downloadAppDataFileRevision(token, fileId, revisionId) {
    return this.refreshToken(token, driveAppDataScopes)
      .then(refreshedToken => this.downloadFileRevisionInternal(
        refreshedToken, fileId, revisionId));
  },
  uploadBlogger(
    token, blogUrl, blogId, postId, title, content, labels, isDraft, published, isPage,
  ) {
    return this.refreshToken(token, bloggerScopes)
      .then(refreshedToken => Promise.resolve()
        .then(() => {
          if (blogId) {
            return blogId;
          }
          return this.request(refreshedToken, {
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
          return this.request(refreshedToken, options)
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
          return this.request(refreshedToken, options)
            .then(res => res.body);
        }));
  },
  openPicker(token, type = 'doc') {
    const scopes = type === 'img' ? photosScopes : getDriveScopes(token);
    return this.loadClientScript()
      .then(() => this.refreshToken(token, scopes))
      .then(refreshedToken => new Promise((resolve) => {
        let picker;
        const pickerBuilder = new google.picker.PickerBuilder()
          .setOAuthToken(refreshedToken.accessToken)
          .enableFeature(google.picker.Feature.SUPPORT_TEAM_DRIVES)
          .hideTitleBar()
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
            const mimeTypes = [
              'text/plain',
              'text/x-markdown',
              'application/octet-stream',
            ].join(',');

            const view = new google.picker.DocsView(google.picker.ViewId.DOCS);
            view.setMimeTypes(mimeTypes);
            pickerBuilder.addView(view);

            const teamDriveView = new google.picker.DocsView(google.picker.ViewId.DOCS);
            teamDriveView.setMimeTypes(mimeTypes);
            teamDriveView.setEnableTeamDrives(true);
            pickerBuilder.addView(teamDriveView);

            pickerBuilder.enableFeature(google.picker.Feature.MULTISELECT_ENABLED);
            pickerBuilder.enableFeature(google.picker.Feature.SUPPORT_TEAM_DRIVES);
            break;
          }
          case 'folder': {
            const folderView = new google.picker.DocsView(google.picker.ViewId.FOLDERS);
            folderView.setSelectFolderEnabled(true);
            folderView.setMimeTypes(this.folderMimeType);
            pickerBuilder.addView(folderView);

            const teamDriveView = new google.picker.DocsView(google.picker.ViewId.FOLDERS);
            teamDriveView.setSelectFolderEnabled(true);
            teamDriveView.setEnableTeamDrives(true);
            teamDriveView.setMimeTypes(this.folderMimeType);
            pickerBuilder.addView(teamDriveView);
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
