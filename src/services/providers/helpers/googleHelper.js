import utils from '../../utils';
import networkSvc from '../../networkSvc';
import store from '../../../store';
import userSvc from '../../userSvc';
import badgeSvc from '../../badgeSvc';

const appsDomain = null;
const tokenExpirationMargin = 5 * 60 * 1000; // 5 min (tokens expire after 1h)

const driveAppDataScopes = ['https://www.googleapis.com/auth/drive.appdata'];
const getDriveScopes = token => [token.driveFullAccess
  ? 'https://www.googleapis.com/auth/drive'
  : 'https://www.googleapis.com/auth/drive.file',
'https://www.googleapis.com/auth/drive.install'];
const bloggerScopes = ['https://www.googleapis.com/auth/blogger'];
const photosScopes = ['https://www.googleapis.com/auth/photos'];

const checkIdToken = (idToken) => {
  try {
    const token = idToken.split('.');
    const payload = JSON.parse(utils.decodeBase64(token[1]));
    const clientId = store.getters['data/serverConf'].googleClientId;
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

/**
 * https://developers.google.com/people/api/rest/v1/people/get
 */
const getUser = async (sub, token) => {
  const apiKey = store.getters['data/serverConf'].googleApiKey;
  const url = `https://people.googleapis.com/v1/people/${sub}?personFields=names,photos&key=${apiKey}`;
  const { body } = await networkSvc.request(sub === 'me' && token
    ? {
      method: 'GET',
      url,
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
    }
    : {
      method: 'GET',
      url,
    }, true);
  return body;
};

const subPrefix = 'go';
userSvc.setInfoResolver('google', subPrefix, async (sub) => {
  try {
    const googleToken = Object.values(store.getters['data/googleTokensBySub'])[0];
    const body = await getUser(sub, googleToken);
    const name = (body.names && body.names[0]) || {};
    const photo = (body.photos && body.photos[0]) || {};
    return {
      id: `${subPrefix}:${sub}`,
      name: name.displayName,
      imageUrl: (photo.url || '').replace(/\bsz?=\d+$/, 'sz=40'),
    };
  } catch (err) {
    if (err.status !== 404) {
      throw new Error('RETRY');
    }
    throw err;
  }
});

export default {
  subPrefix,
  folderMimeType: 'application/vnd.google-apps.folder',
  driveState,
  driveActionFolder: null,
  driveActionFiles: [],
  async $request(token, options) {
    try {
      return (await networkSvc.request({
        ...options,
        headers: {
          ...options.headers || {},
          Authorization: `Bearer ${token.accessToken}`,
        },
      }, true)).body;
    } catch (err) {
      const { reason } = (((err.body || {}).error || {}).errors || [])[0] || {};
      if (reason === 'authError') {
        // Mark the token as revoked and get a new one
        store.dispatch('data/addGoogleToken', {
          ...token,
          expiresOn: 0,
        });
        // Refresh token and retry
        const refreshedToken = await this.refreshToken(token, token.scopes);
        return this.$request(refreshedToken, options);
      }
      throw err;
    }
  },

  /**
   * https://developers.google.com/identity/protocols/OpenIDConnect
   */
  async startOauth2(scopes, sub = null, silent = false) {
    const clientId = store.getters['data/serverConf'].googleClientId;

    // Get an OAuth2 code
    const { accessToken, expiresIn, idToken } = await networkSvc.startOauth2(
      'https://accounts.google.com/o/oauth2/v2/auth',
      {
        client_id: clientId,
        response_type: 'token id_token',
        scope: ['openid', 'profile', ...scopes].join(' '),
        hd: appsDomain,
        login_hint: sub,
        prompt: silent ? 'none' : null,
        nonce: utils.uid(),
      },
      silent,
    );

    // Call the token info endpoint
    const { body } = await networkSvc.request({
      method: 'POST',
      url: 'https://www.googleapis.com/oauth2/v3/tokeninfo',
      params: {
        access_token: accessToken,
      },
    }, true);

    // Check the returned client ID consistency
    if (body.aud !== clientId) {
      throw new Error('Client ID inconsistent.');
    }
    // Check the returned sub consistency
    if (sub && `${body.sub}` !== sub) {
      throw new Error('Google account ID not expected.');
    }

    // Build token object including scopes and sub
    const existingToken = store.getters['data/googleTokensBySub'][body.sub];
    const token = {
      scopes,
      accessToken,
      expiresOn: Date.now() + (expiresIn * 1000),
      idToken,
      sub: body.sub,
      name: (existingToken || {}).name || 'Someone',
      isLogin: !store.getters['workspace/mainWorkspaceToken'] &&
        scopes.includes('https://www.googleapis.com/auth/drive.appdata'),
      isSponsor: false,
      isDrive: scopes.includes('https://www.googleapis.com/auth/drive') ||
        scopes.includes('https://www.googleapis.com/auth/drive.file'),
      isBlogger: scopes.includes('https://www.googleapis.com/auth/blogger'),
      isPhotos: scopes.includes('https://www.googleapis.com/auth/photos'),
      driveFullAccess: scopes.includes('https://www.googleapis.com/auth/drive'),
    };

    // Call the user info endpoint
    const user = await getUser('me', token);
    const userId = user.resourceName.split('/')[1];
    const name = user.names[0] || {};
    const photo = user.photos[0] || {};
    if (name.displayName) {
      token.name = name.displayName;
    }
    userSvc.addUserInfo({
      id: `${subPrefix}:${userId}`,
      name: name.displayName,
      imageUrl: (photo.url || '').replace(/\bsz?=\d+$/, 'sz=40'),
    });

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

    if (token.isLogin) {
      try {
        const res = await networkSvc.request({
          method: 'GET',
          url: 'userInfo',
          params: {
            idToken: token.idToken,
          },
        });
        token.isSponsor = res.body.sponsorUntil > Date.now();
        if (token.isSponsor) {
          badgeSvc.addBadge('sponsor');
        }
      } catch (err) {
        // Ignore
      }
    }

    // Add token to google tokens
    await store.dispatch('data/addGoogleToken', token);
    return token;
  },
  async refreshToken(token, scopes = []) {
    const { sub } = token;
    const lastToken = store.getters['data/googleTokensBySub'][sub];
    const mergedScopes = [...new Set([
      ...scopes,
      ...lastToken.scopes,
    ])];

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

    // New scopes are requested or existing token is about to expire.
    // Try to get a new token in background
    try {
      return await this.startOauth2(mergedScopes, sub, true);
    } catch (err) {
      // If it fails try to popup a window
      if (store.state.offline) {
        throw err;
      }
      await store.dispatch('modal/open', {
        type: 'providerRedirection',
        name: 'Google',
      });
      return this.startOauth2(mergedScopes, sub);
    }
  },
  signin() {
    return this.startOauth2(driveAppDataScopes);
  },
  async addDriveAccount(fullAccess = false, sub = null) {
    const token = await this.startOauth2(getDriveScopes({ driveFullAccess: fullAccess }), sub);
    badgeSvc.addBadge('addGoogleDriveAccount');
    return token;
  },
  async addBloggerAccount() {
    const token = await this.startOauth2(bloggerScopes);
    badgeSvc.addBadge('addBloggerAccount');
    return token;
  },
  async addPhotosAccount() {
    const token = await this.startOauth2(photosScopes);
    badgeSvc.addBadge('addGooglePhotosAccount');
    return token;
  },

  /**
   * https://developers.google.com/drive/v3/reference/files/create
   * https://developers.google.com/drive/v3/reference/files/update
   * https://developers.google.com/drive/v3/web/simple-upload
   */
  async $uploadFile({
    refreshedToken,
    name,
    parents,
    appProperties,
    media = null,
    mediaType = null,
    fileId = null,
    oldParents = null,
    ifNotTooLate = cb => cb(),
  }) {
    // Refreshing a token can take a while if an oauth window pops up, make sure it's not too late
    return ifNotTooLate(() => {
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
            .filter(parent => !oldParents.includes(parent))
            .join(',');
          params.removeParents = oldParents
            .filter(parent => !parents.includes(parent))
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
          'https://www.googleapis.com/upload/',
        );
        return this.$request(refreshedToken, {
          ...options,
          params: {
            ...params,
            uploadType: 'multipart',
          },
          headers: {
            'Content-Type': `multipart/mixed; boundary="${boundary}"`,
          },
          body: multipartRequestBody,
        });
      }
      if (mediaType) {
        metadata.mimeType = mediaType;
      }
      return this.$request(refreshedToken, {
        ...options,
        body: metadata,
        params,
      });
    });
  },
  async uploadFile({
    token,
    name,
    parents,
    appProperties,
    media,
    mediaType,
    fileId,
    oldParents,
    ifNotTooLate,
  }) {
    const refreshedToken = await this.refreshToken(token, getDriveScopes(token));
    return this.$uploadFile({
      refreshedToken,
      name,
      parents,
      appProperties,
      media,
      mediaType,
      fileId,
      oldParents,
      ifNotTooLate,
    });
  },
  async uploadAppDataFile({
    token,
    name,
    media,
    fileId,
    ifNotTooLate,
  }) {
    const refreshedToken = await this.refreshToken(token, driveAppDataScopes);
    return this.$uploadFile({
      refreshedToken,
      name,
      parents: ['appDataFolder'],
      media,
      fileId,
      ifNotTooLate,
    });
  },

  /**
   * https://developers.google.com/drive/v3/reference/files/get
   */
  async getFile(token, id) {
    const refreshedToken = await this.refreshToken(token, getDriveScopes(token));
    return this.$request(refreshedToken, {
      method: 'GET',
      url: `https://www.googleapis.com/drive/v3/files/${id}`,
      params: {
        fields: 'id,name,mimeType,appProperties,teamDriveId',
        supportsTeamDrives: true,
      },
    });
  },

  /**
   * https://developers.google.com/drive/v3/web/manage-downloads
   */
  async $downloadFile(refreshedToken, id) {
    return this.$request(refreshedToken, {
      method: 'GET',
      url: `https://www.googleapis.com/drive/v3/files/${id}?alt=media`,
      raw: true,
    });
  },
  async downloadFile(token, id) {
    const refreshedToken = await this.refreshToken(token, getDriveScopes(token));
    return this.$downloadFile(refreshedToken, id);
  },
  async downloadAppDataFile(token, id) {
    const refreshedToken = await this.refreshToken(token, driveAppDataScopes);
    return this.$downloadFile(refreshedToken, id);
  },

  /**
   * https://developers.google.com/drive/v3/reference/files/delete
   */
  async $removeFile(refreshedToken, id, ifNotTooLate = cb => cb()) {
    // Refreshing a token can take a while if an oauth window pops up, so check if it's too late
    return ifNotTooLate(() => this.$request(refreshedToken, {
      method: 'DELETE',
      url: `https://www.googleapis.com/drive/v3/files/${id}`,
      params: {
        supportsTeamDrives: true,
      },
    }));
  },
  async removeFile(token, id, ifNotTooLate) {
    const refreshedToken = await this.refreshToken(token, getDriveScopes(token));
    return this.$removeFile(refreshedToken, id, ifNotTooLate);
  },
  async removeAppDataFile(token, id, ifNotTooLate = cb => cb()) {
    const refreshedToken = await this.refreshToken(token, driveAppDataScopes);
    return this.$removeFile(refreshedToken, id, ifNotTooLate);
  },

  /**
   * https://developers.google.com/drive/v3/reference/revisions/list
   */
  async $getFileRevisions(refreshedToken, id) {
    const allRevisions = [];
    const getPage = async (pageToken) => {
      const { revisions, nextPageToken } = await this.$request(refreshedToken, {
        method: 'GET',
        url: `https://www.googleapis.com/drive/v3/files/${id}/revisions`,
        params: {
          pageToken,
          pageSize: 1000,
          fields: 'nextPageToken,revisions(id,modifiedTime,lastModifyingUser/permissionId,lastModifyingUser/displayName,lastModifyingUser/photoLink)',
        },
      });
      revisions.forEach((revision) => {
        userSvc.addUserInfo({
          id: `${subPrefix}:${revision.lastModifyingUser.permissionId}`,
          name: revision.lastModifyingUser.displayName,
          imageUrl: revision.lastModifyingUser.photoLink || '',
        });
        allRevisions.push(revision);
      });
      if (nextPageToken) {
        return getPage(nextPageToken);
      }
      return allRevisions;
    };
    return getPage();
  },
  async getFileRevisions(token, id) {
    const refreshedToken = await this.refreshToken(token, getDriveScopes(token));
    return this.$getFileRevisions(refreshedToken, id);
  },
  async getAppDataFileRevisions(token, id) {
    const refreshedToken = await this.refreshToken(token, driveAppDataScopes);
    return this.$getFileRevisions(refreshedToken, id);
  },

  /**
   * https://developers.google.com/drive/v3/reference/revisions/get
   */
  async $downloadFileRevision(refreshedToken, id, revisionId) {
    return this.$request(refreshedToken, {
      method: 'GET',
      url: `https://www.googleapis.com/drive/v3/files/${id}/revisions/${revisionId}?alt=media`,
      raw: true,
    });
  },
  async downloadFileRevision(token, fileId, revisionId) {
    const refreshedToken = await this.refreshToken(token, getDriveScopes(token));
    return this.$downloadFileRevision(refreshedToken, fileId, revisionId);
  },
  async downloadAppDataFileRevision(token, fileId, revisionId) {
    const refreshedToken = await this.refreshToken(token, driveAppDataScopes);
    return this.$downloadFileRevision(refreshedToken, fileId, revisionId);
  },

  /**
   * https://developers.google.com/drive/v3/reference/changes/list
   */
  async getChanges(token, startPageToken, isAppData, teamDriveId = null) {
    const result = {
      changes: [],
    };
    let fileFields = 'file/name';
    if (!isAppData) {
      fileFields += ',file/parents,file/mimeType,file/appProperties';
    }
    const refreshedToken = await this.refreshToken(
      token,
      isAppData ? driveAppDataScopes : getDriveScopes(token),
    );

    const getPage = async (pageToken = '1') => {
      const { changes, nextPageToken, newStartPageToken } = await this.$request(refreshedToken, {
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
      });
      result.changes = [...result.changes, ...changes.filter(item => item.fileId)];
      if (nextPageToken) {
        return getPage(nextPageToken);
      }
      result.startPageToken = newStartPageToken;
      return result;
    };
    return getPage(startPageToken);
  },

  /**
   * https://developers.google.com/blogger/docs/3.0/reference/blogs/getByUrl
   * https://developers.google.com/blogger/docs/3.0/reference/posts/insert
   * https://developers.google.com/blogger/docs/3.0/reference/posts/update
   */
  async uploadBlogger({
    token,
    blogUrl,
    blogId,
    postId,
    title,
    content,
    labels,
    isDraft,
    published,
    isPage,
  }) {
    const refreshedToken = await this.refreshToken(token, bloggerScopes);

    // Get the blog ID
    const blog = { id: blogId };
    if (!blog.id) {
      blog.id = (await this.$request(refreshedToken, {
        url: 'https://www.googleapis.com/blogger/v3/blogs/byurl',
        params: {
          url: blogUrl,
        },
      })).id;
    }

    // Create/update the post/page
    const path = isPage ? 'pages' : 'posts';
    let options = {
      method: 'POST',
      url: `https://www.googleapis.com/blogger/v3/blogs/${blog.id}/${path}/`,
      body: {
        kind: isPage ? 'blogger#page' : 'blogger#post',
        blog,
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
    const post = await this.$request(refreshedToken, options);
    if (isPage) {
      return post;
    }

    // Revert/publish post
    options = {
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
    return this.$request(refreshedToken, options);
  },

  /**
   * https://developers.google.com/picker/docs/
   */
  async openPicker(token, type = 'doc') {
    const scopes = type === 'img' ? photosScopes : getDriveScopes(token);
    if (!window.google) {
      await networkSvc.loadScript('https://apis.google.com/js/api.js');
      await new Promise((resolve, reject) => window.gapi.load('picker', {
        callback: resolve,
        onerror: reject,
        timeout: 30000,
        ontimeout: reject,
      }));
    }
    const refreshedToken = await this.refreshToken(token, scopes);
    const { google } = window;
    return new Promise((resolve) => {
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
          const view = new google.picker.PhotosView();
          view.setType('highlights');
          pickerBuilder.addView(view);
          pickerBuilder.addView(google.picker.ViewId.PHOTO_UPLOAD);
          break;
        }
      }
      picker = pickerBuilder.build();
      picker.setVisible(true);
    });
  },
};
