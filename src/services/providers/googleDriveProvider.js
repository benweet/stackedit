import store from '../../store';
import googleHelper from './helpers/googleHelper';
import providerUtils from './providerUtils';
import providerRegistry from './providerRegistry';
import utils from '../utils';

export default providerRegistry.register({
  id: 'googleDrive',
  getToken(location) {
    const token = store.getters['data/googleTokens'][location.sub];
    return token && token.isDrive ? token : null;
  },
  getUrl(location) {
    return `https://docs.google.com/file/d/${location.driveFileId}/edit`;
  },
  getDescription(location) {
    const token = this.getToken(location);
    return `${location.driveFileId} — ${token.name}`;
  },
  initAction() {
    const state = googleHelper.driveState || {};
    return state.userId && Promise.resolve()
      .then(() => {
        // Try to find the token corresponding to the user ID
        const token = store.getters['data/googleTokens'][state.userId];
        // If not found or not enough permission, popup an OAuth2 window
        return token && token.isDrive ? token : store.dispatch('modal/open', {
          type: 'googleDriveAccount',
          onResolve: () => googleHelper.addDriveAccount(
            !store.getters['data/localSettings'].googleDriveRestrictedAccess,
            state.userId,
          ),
        });
      })
      .then((token) => {
        const openWorkspaceIfExists = (file) => {
          const folderId = file
            && file.appProperties
            && file.appProperties.folderId;
          if (folderId) {
            // See if we have the corresponding workspace
            const workspaceParams = {
              providerId: 'googleDriveWorkspace',
              folderId,
            };
            const workspaceId = utils.makeWorkspaceId(workspaceParams);
            const workspace = store.getters['data/sanitizedWorkspaces'][workspaceId];
            // If we have the workspace, open it by changing the current URL
            if (workspace) {
              utils.setQueryParams(workspaceParams);
            }
          }
        };

        switch (state.action) {
          case 'create':
          default:
            // See if folder is part of a workspace we can open
            return googleHelper.getFile(token, state.folderId)
              .then((folder) => {
                folder.appProperties = folder.appProperties || {};
                googleHelper.driveActionFolder = folder;
                openWorkspaceIfExists(folder);
              }, (err) => {
                if (!err || err.status !== 404) {
                  throw err;
                }
                // We received an HTTP 404 meaning we have no permission to read the folder
                googleHelper.driveActionFolder = { id: state.folderId };
              });

          case 'open': {
            const getOneFile = (ids = state.ids || []) => {
              const id = ids.shift();
              return id && googleHelper.getFile(token, id)
                .then((file) => {
                  file.appProperties = file.appProperties || {};
                  googleHelper.driveActionFiles.push(file);
                  return getOneFile(ids);
                });
            };

            return getOneFile()
              // Check if first file is part of a workspace
              .then(() => openWorkspaceIfExists(googleHelper.driveActionFiles[0]));
          }
        }
      });
  },
  performAction() {
    return Promise.resolve()
      .then(() => {
        const state = googleHelper.driveState || {};
        const token = store.getters['data/googleTokens'][state.userId];
        switch (token && state.action) {
          case 'create':
            return store.dispatch('createFile')
              .then((file) => {
                store.commit('file/setCurrentId', file.id);
                // Return a new syncLocation
                return this.makeLocation(token, null, googleHelper.driveActionFolder.id);
              });
          case 'open':
            return store.dispatch('queue/enqueue',
              () => this.openFiles(token, googleHelper.driveActionFiles));
          default:
            return null;
        }
      });
  },
  downloadContent(token, syncLocation) {
    return googleHelper.downloadFile(token, syncLocation.driveFileId)
      .then(content => providerUtils.parseContent(content, `${syncLocation.fileId}/content`));
  },
  uploadContent(token, content, syncLocation, ifNotTooLate) {
    const file = store.state.file.itemMap[syncLocation.fileId];
    const name = utils.sanitizeName(file && file.name);
    const parents = [];
    if (syncLocation.driveParentId) {
      parents.push(syncLocation.driveParentId);
    }
    return googleHelper.uploadFile(
      token,
      name,
      parents,
      undefined,
      providerUtils.serializeContent(content),
      undefined,
      syncLocation.driveFileId,
      undefined,
      ifNotTooLate,
    )
      .then(driveFile => ({
        ...syncLocation,
        driveFileId: driveFile.id,
      }));
  },
  publish(token, html, metadata, publishLocation) {
    return googleHelper.uploadFile(
      token,
      metadata.title,
      [],
      undefined,
      html,
      publishLocation.templateId ? 'text/html' : undefined,
      publishLocation.driveFileId,
    )
      .then(driveFile => ({
        ...publishLocation,
        driveFileId: driveFile.id,
      }));
  },
  openFiles(token, driveFiles) {
    const openOneFile = () => {
      const driveFile = driveFiles.shift();
      if (!driveFile) {
        return null;
      }
      if (providerUtils.openFileWithLocation(store.getters['syncLocation/items'], {
        providerId: this.id,
        driveFileId: driveFile.id,
      })) {
        // File exists and has just been opened. Next...
        return openOneFile();
      }
      // Download content from Google Drive and create the file
      const syncLocation = {
        driveFileId: driveFile.id,
        providerId: this.id,
        sub: token.sub,
      };
      return this.downloadContent(token, syncLocation)
        .then((content) => {
          const id = utils.uid();
          delete content.history;
          store.commit('content/setItem', {
            ...content,
            id: `${id}/content`,
          });
          store.commit('file/setItem', {
            id,
            name: utils.sanitizeName(driveFile.name),
            parentId: store.getters['file/current'].parentId,
          });
          store.commit('syncLocation/setItem', {
            ...syncLocation,
            id: utils.uid(),
            fileId: id,
          });
          store.commit('file/setCurrentId', id);
          store.dispatch('notification/info', `${store.getters['file/current'].name} was imported from Google Drive.`);
        }, () => {
          store.dispatch('notification/error', `Could not open file ${driveFile.id}.`);
        })
        .then(() => openOneFile());
    };
    return Promise.resolve()
      .then(() => openOneFile());
  },
  makeLocation(token, fileId, folderId) {
    const location = {
      providerId: this.id,
      sub: token.sub,
    };
    if (fileId) {
      location.driveFileId = fileId;
    }
    if (folderId) {
      location.driveParentId = folderId;
    }
    return location;
  },
});
