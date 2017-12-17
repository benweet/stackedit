import store from '../../store';
import googleHelper from './helpers/googleHelper';
import providerRegistry from './providerRegistry';
import utils from '../utils';

export default providerRegistry.register({
  id: 'googleDriveWorkspace',
  getToken() {
    return store.getters['workspace/syncToken'];
  },
  initWorkspace() {
    const makeWorkspaceId = folderId => folderId && Math.abs(utils.hash(utils.serializeObject({
      providerId: this.id,
      folderId,
    }))).toString(36);

    const getWorkspace = folderId => store.getters['data/workspaces'][makeWorkspaceId(folderId)];

    const initFolder = (token, folder) => Promise.resolve({
      folderId: folder.id,
      dataFolderId: folder.appProperties.dataFolderId,
      trashFolderId: folder.appProperties.trashFolderId,
    })
      .then((properties) => {
        // Make sure data folder exists
        if (properties.dataFolderId) {
          return properties;
        }
        return googleHelper.uploadFile(
          token,
          '.stackedit-data',
          [folder.id],
          { folderId: folder.id },
          undefined,
          'application/vnd.google-apps.folder',
        )
          .then(dataFolder => ({
            ...properties,
            dataFolderId: dataFolder.id,
          }));
      })
      .then((properties) => {
        // Make sure trash folder exists
        if (properties.trashFolderId) {
          return properties;
        }
        return googleHelper.uploadFile(
          token,
          '.stackedit-trash',
          [folder.id],
          { folderId: folder.id },
          undefined,
          'application/vnd.google-apps.folder',
        )
          .then(trashFolder => ({
            ...properties,
            trashFolderId: trashFolder.id,
          }));
      })
      .then((properties) => {
        // Update workspace if some properties are missing
        if (properties.folderId === folder.appProperties.folderId
          && properties.dataFolderId === folder.appProperties.dataFolderId
          && properties.trashFolderId === folder.appProperties.trashFolderId
        ) {
          return properties;
        }
        return googleHelper.uploadFile(
          token,
          undefined,
          undefined,
          properties,
          undefined,
          'application/vnd.google-apps.folder',
          folder.id,
        )
          .then(() => properties);
      })
      .then((properties) => {
        // Fix the current url hash
        const hash = `#providerId=${this.id}&folderId=${folder.id}`;
        if (location.hash !== hash) {
          location.hash = hash;
        }

        // Update workspace in the store
        const workspaceId = makeWorkspaceId(folder.id);
        store.dispatch('data/patchWorkspaces', {
          [workspaceId]: {
            id: workspaceId,
            sub: token.sub,
            name: folder.name,
            providerId: this.id,
            url: utils.resolveUrl(hash),
            folderId: folder.id,
            dataFolderId: properties.dataFolderId,
            trashFolderId: properties.trashFolderId,
          },
        });

        // Return the workspace
        return getWorkspace(folder.id);
      });

    const workspace = getWorkspace(utils.queryParams.folderId);
    return Promise.resolve()
      .then(() => {
        // See if we already have a token
        const googleTokens = store.getters['data/googleTokens'];
        // Token sub is in the workspace or in the url if workspace is about to be created
        const token = workspace ? googleTokens[workspace.sub] : googleTokens[utils.queryParams.sub];
        if (token && token.isDrive) {
          return token;
        }
        // If no token has been found, popup an authorize window and get one
        return store.dispatch('modal/workspaceGoogleRedirection', {
          onResolve: () => googleHelper.addDriveAccount(),
        });
      })
      .then(token => Promise.resolve()
        // If no folderId is provided, create one
        .then(() => utils.queryParams.folderId || googleHelper.uploadFile(
          token,
          'StackEdit workspace',
          [],
          undefined,
          undefined,
          'application/vnd.google-apps.folder',
        )
          .then(folder => initFolder(token, {
            ...folder,
            appProperties: {},
          })
          .then(() => folder.id)))
        // If workspace does not exist, initialize one
        .then(folderId => getWorkspace(folderId) || googleHelper.getFile(token, folderId)
          .then((folder) => {
            const folderIdProperty = folder.appProperties.folderId;
            if (folderIdProperty && folderIdProperty !== folderId) {
              throw new Error(`Google Drive folder ${folderId} is part of another workspace.`);
            }
            return initFolder(token, folder);
          }, () => {
            throw new Error(`Folder ${folderId} is not accessible. Make sure it's a valid StackEdit workspace folder and you have the right permissions.`);
          })));
  },
  getChanges(token) {
    const startPageToken = store.getters['data/localSettings'].syncStartPageToken;
    return googleHelper.getChanges(token, startPageToken, 'appDataFolder')
      .then((result) => {
        const changes = result.changes.filter((change) => {
          if (change.file) {
            // Parse item from file name
            try {
              change.item = JSON.parse(change.file.name);
            } catch (e) {
              return false;
            }
            // Build sync data
            change.syncData = {
              id: change.fileId,
              itemId: change.item.id,
              type: change.item.type,
              hash: change.item.hash,
            };
            change.file = undefined;
          }
          change.syncDataId = change.fileId;
          return true;
        });
        changes.startPageToken = result.startPageToken;
        return changes;
      });
  },
});
