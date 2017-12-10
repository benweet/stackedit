import store from '../../store';
import googleHelper from './helpers/googleHelper';
import providerRegistry from './providerRegistry';
import utils from '../utils';

let workspaceFolderId;

const makeWorkspaceId = () => {

};

export default providerRegistry.register({
  id: 'googleDriveWorkspace',
  getToken() {
    return store.getters['data/loginToken'];
  },
  initWorkspace() {
    const initFolder = (token, folder) => Promise.resolve({
      workspaceId: this.makeWorkspaceId(folder.id),
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
          { workspaceId: properties.workspaceId },
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
          { workspaceId: properties.workspaceId },
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
        if (properties.workspaceId === folder.appProperties.workspaceId
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
        // Update workspace in the store
        store.dispatch('data/patchWorkspaces', {
          [properties.workspaceId]: {
            id: properties.workspaceId,
            sub: token.sub,
            name: folder.name,
            providerId: this.id,
            folderId: folder.id,
            dataFolderId: properties.dataFolderId,
            trashFolderId: properties.trashFolderId,
          },
        });
        return store.getters['data/workspaces'][properties.workspaceId];
      });

    return Promise.resolve(store.getters['data/googleTokens'][utils.queryParams.sub])
      .then(token => token || this.$store.dispatch('modal/workspaceGoogleRedirection', {
        onResolve: () => googleHelper.addDriveAccount(),
      }))
      .then(token => Promise.resolve()
        .then(() => utils.queryParams.folderId || googleHelper.uploadFile(
          token,
          'StackEdit workspace',
          [],
          undefined,
          undefined,
          'application/vnd.google-apps.folder',
        ).then(folder => initFolder(token, folder).then(() => folder.id)))
        .then((folderId) => {
          const workspaceId = this.makeWorkspaceId(folderId);
          const workspace = store.getters['data/workspaces'][workspaceId];
          return workspace || googleHelper.getFile(token, folderId)
            .then((folder) => {
              const folderWorkspaceId = folder.appProperties.workspaceId;
              if (folderWorkspaceId && folderWorkspaceId !== workspaceId) {
                throw new Error(`Google Drive folder ${folderId} is part of another workspace.`);
              }
              return initFolder(token, folder);
            });
        }));
  },
  getChanges(token) {
    return googleHelper.getChanges(token)
      .then((result) => {
        const changes = result.changes.filter((change) => {
          if (change.file) {
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
          return true;
        });
        changes.nextPageToken = result.nextPageToken;
        return changes;
      });
  },
  setAppliedChanges(token, changes) {
    const lastToken = store.getters['data/googleTokens'][token.sub];
    if (changes.nextPageToken !== lastToken.nextPageToken) {
      store.dispatch('data/setGoogleToken', {
        ...lastToken,
        nextPageToken: changes.nextPageToken,
      });
    }
  },
  saveItem(token, item, syncData, ifNotTooLate) {
    return googleHelper.uploadAppDataFile(
        token,
        JSON.stringify(item),
        ['appDataFolder'],
        undefined,
        undefined,
        syncData && syncData.id,
        ifNotTooLate,
      )
      .then(file => ({
        // Build sync data
        id: file.id,
        itemId: item.id,
        type: item.type,
        hash: item.hash,
      }));
  },
  removeItem(token, syncData, ifNotTooLate) {
    return googleHelper.removeAppDataFile(token, syncData.id, ifNotTooLate)
      .then(() => syncData);
  },
  downloadContent(token, syncLocation) {
    return this.downloadData(token, `${syncLocation.fileId}/content`);
  },
  downloadData(token, dataId) {
    const syncData = store.getters['data/syncDataByItemId'][dataId];
    if (!syncData) {
      return Promise.resolve();
    }
    return googleHelper.downloadAppDataFile(token, syncData.id)
      .then((content) => {
        const item = JSON.parse(content);
        if (item.hash !== syncData.hash) {
          store.dispatch('data/patchSyncData', {
            [syncData.id]: {
              ...syncData,
              hash: item.hash,
            },
          });
        }
        return item;
      });
  },
  uploadContent(token, content, syncLocation, ifNotTooLate) {
    return this.uploadData(token, content, `${syncLocation.fileId}/content`, ifNotTooLate)
      .then(() => syncLocation);
  },
  uploadData(token, item, dataId, ifNotTooLate) {
    const syncData = store.getters['data/syncDataByItemId'][dataId];
    if (syncData && syncData.hash === item.hash) {
      return Promise.resolve();
    }
    return googleHelper.uploadAppDataFile(
        token,
        JSON.stringify({
          id: item.id,
          type: item.type,
          hash: item.hash,
        }),
        ['appDataFolder'],
        undefined,
        JSON.stringify(item),
        syncData && syncData.id,
        ifNotTooLate,
      )
      .then(file => store.dispatch('data/patchSyncData', {
        [file.id]: {
          // Build sync data
          id: file.id,
          itemId: item.id,
          type: item.type,
          hash: item.hash,
        },
      }));
  },
  listRevisions(token, fileId) {
    const syncData = store.getters['data/syncDataByItemId'][`${fileId}/content`];
    if (!syncData) {
      return Promise.reject(); // No need for a proper error message.
    }
    return googleHelper.getFileRevisions(token, syncData.id)
      .then(revisions => revisions.map(revision => ({
        id: revision.id,
        sub: revision.lastModifyingUser && revision.lastModifyingUser.permissionId,
        created: new Date(revision.modifiedTime).getTime(),
      })));
  },
  getRevisionContent(token, fileId, revisionId) {
    const syncData = store.getters['data/syncDataByItemId'][`${fileId}/content`];
    if (!syncData) {
      return Promise.reject(); // No need for a proper error message.
    }
    return googleHelper.downloadFileRevision(token, syncData.id, revisionId)
      .then(content => JSON.parse(content));
  },
  makeWorkspaceId(folderId) {
    return Math.abs(utils.hash(utils.serializeObject({
      providerId: this.id,
      folderId: folderId,
    }))).toString(36);
  },
});
