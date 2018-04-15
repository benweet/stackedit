import store from '../../store';
import googleHelper from './helpers/googleHelper';
import providerRegistry from './providerRegistry';
import providerUtils from './providerUtils';
import utils from '../utils';

let fileIdToOpen;

const getSyncData = (fileId) => {
  const syncData = store.getters['data/syncDataByItemId'][`${fileId}/content`];
  return syncData
    ? Promise.resolve(syncData)
    : Promise.reject(); // No need for a proper error message.
};

export default providerRegistry.register({
  id: 'googleDriveWorkspace',
  getToken() {
    return store.getters['workspace/syncToken'];
  },
  initWorkspace() {
    const makeWorkspaceIdParams = folderId => ({
      providerId: this.id,
      folderId,
    });

    const makeWorkspaceId = folderId => folderId && utils.makeWorkspaceId(
      makeWorkspaceIdParams(folderId));

    const getWorkspace = folderId =>
      store.getters['data/sanitizedWorkspaces'][makeWorkspaceId(folderId)];

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
          googleHelper.folderMimeType,
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
          googleHelper.folderMimeType,
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
          googleHelper.folderMimeType,
          folder.id,
        )
          .then(() => properties);
      })
      .then((properties) => {
        // Update workspace in the store
        const workspaceId = makeWorkspaceId(folder.id);
        store.dispatch('data/patchWorkspaces', {
          [workspaceId]: {
            id: workspaceId,
            sub: token.sub,
            name: folder.name,
            providerId: this.id,
            url: location.href,
            folderId: folder.id,
            teamDriveId: folder.teamDriveId,
            dataFolderId: properties.dataFolderId,
            trashFolderId: properties.trashFolderId,
          },
        });

        // Return the workspace
        return store.getters['data/sanitizedWorkspaces'][workspaceId];
      });

    return Promise.resolve()
      .then(() => {
        const workspace = getWorkspace(utils.queryParams.folderId);
        // See if we already have a token
        const googleTokens = store.getters['data/googleTokens'];
        // Token sub is in the workspace or in the url if workspace is about to be created
        const token = workspace ? googleTokens[workspace.sub] : googleTokens[utils.queryParams.sub];
        if (token && token.isDrive && token.driveFullAccess) {
          return token;
        }
        // If no token has been found, popup an authorize window and get one
        return store.dispatch('modal/workspaceGoogleRedirection', {
          onResolve: () => googleHelper.addDriveAccount(true, utils.queryParams.sub),
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
          googleHelper.folderMimeType,
        )
          .then(folder => initFolder(token, {
            ...folder,
            appProperties: {},
          })
          .then(() => folder.id)))
        // If workspace does not exist, initialize one
        .then(folderId => getWorkspace(folderId) || googleHelper.getFile(token, folderId)
          .then((folder) => {
            folder.appProperties = folder.appProperties || {};
            const folderIdProperty = folder.appProperties.folderId;
            if (folderIdProperty && folderIdProperty !== folderId) {
              throw new Error(`Folder ${folderId} is part of another workspace.`);
            }
            return initFolder(token, folder);
          }, () => {
            throw new Error(`Folder ${folderId} is not accessible. Make sure you have the right permissions.`);
          }))
        .then((workspace) => {
          // Fix the URL hash
          utils.setQueryParams(makeWorkspaceIdParams(workspace.folderId));
          if (workspace.url !== location.href) {
            store.dispatch('data/patchWorkspaces', {
              [workspace.id]: {
                ...workspace,
                url: location.href,
              },
            });
          }
          return store.getters['data/sanitizedWorkspaces'][workspace.id];
        }));
  },
  performAction() {
    return Promise.resolve()
      .then(() => {
        const state = googleHelper.driveState || {};
        const token = this.getToken();
        switch (token && state.action) {
          case 'create':
            return Promise.resolve()
              .then(() => {
                const driveFolder = googleHelper.driveActionFolder;
                let syncData = store.getters['data/syncData'][driveFolder.id];
                if (!syncData && driveFolder.appProperties.id) {
                  // Create folder if not already synced
                  store.commit('folder/setItem', {
                    id: driveFolder.appProperties.id,
                    name: driveFolder.name,
                  });
                  const item = store.state.folder.itemMap[driveFolder.appProperties.id];
                  syncData = {
                    id: driveFolder.id,
                    itemId: item.id,
                    type: item.type,
                    hash: item.hash,
                  };
                  store.dispatch('data/patchSyncData', {
                    [syncData.id]: syncData,
                  });
                }
                return store.dispatch('createFile', {
                  parentId: syncData && syncData.itemId,
                })
                  .then((file) => {
                    store.commit('file/setCurrentId', file.id);
                    // File will be created on next workspace sync
                  });
              });
          case 'open':
            return Promise.resolve()
              .then(() => {
                // open first file only
                const firstFile = googleHelper.driveActionFiles[0];
                const syncData = store.getters['data/syncData'][firstFile.id];
                if (!syncData) {
                  fileIdToOpen = firstFile.id;
                } else {
                  store.commit('file/setCurrentId', syncData.itemId);
                }
              });
          default:
            return null;
        }
      });
  },
  getChanges() {
    const workspace = store.getters['workspace/currentWorkspace'];
    const syncToken = store.getters['workspace/syncToken'];
    const startPageToken = store.getters['data/localSettings'].syncStartPageToken;
    return googleHelper.getChanges(syncToken, startPageToken, false, workspace.teamDriveId)
      .then((result) => {
        // Collect possible parent IDs
        const parentIds = {};
        Object.entries(store.getters['data/syncDataByItemId']).forEach(([id, syncData]) => {
          parentIds[syncData.id] = id;
        });
        result.changes.forEach((change) => {
          const id = ((change.file || {}).appProperties || {}).id;
          if (id) {
            parentIds[change.fileId] = id;
          }
        });

        // Collect changes
        const changes = [];
        result.changes.forEach((change) => {
          // Ignore changes on StackEdit own folders
          if (change.fileId === workspace.folderId
            || change.fileId === workspace.dataFolderId
            || change.fileId === workspace.trashFolderId
          ) {
            return;
          }

          let contentChange;
          if (change.file) {
            // Ignore changes in files that are not in the workspace
            const appProperties = change.file.appProperties;
            if (!appProperties || appProperties.folderId !== workspace.folderId
            ) {
              return;
            }

            // If change is on a data item
            if (change.file.parents[0] === workspace.dataFolderId) {
              // Data item has a JSON filename
              try {
                change.item = JSON.parse(change.file.name);
              } catch (e) {
                return;
              }
            } else {
              // Change on a file or folder
              const type = change.file.mimeType === googleHelper.folderMimeType
                ? 'folder'
                : 'file';
              const item = {
                id: appProperties.id,
                type,
                name: change.file.name,
                parentId: null,
              };

              // Fill parentId
              if (change.file.parents.some(parentId => parentId === workspace.trashFolderId)) {
                item.parentId = 'trash';
              } else {
                change.file.parents.some((parentId) => {
                  if (!parentIds[parentId]) {
                    return false;
                  }
                  item.parentId = parentIds[parentId];
                  return true;
                });
              }
              change.item = utils.addItemHash(item);

              if (type === 'file') {
                // create a fake change as a file content change
                contentChange = {
                  item: {
                    id: `${appProperties.id}/content`,
                    type: 'content',
                    // Need a truthy value to force saving sync data
                    hash: 1,
                  },
                  syncData: {
                    id: `${change.fileId}/content`,
                    itemId: `${appProperties.id}/content`,
                    type: 'content',
                    // Need a truthy value to force downloading the content
                    hash: 1,
                  },
                  syncDataId: `${change.fileId}/content`,
                };
              }
            }

            // Build sync data
            change.syncData = {
              id: change.fileId,
              parentIds: change.file.parents,
              itemId: change.item.id,
              type: change.item.type,
              hash: change.item.hash,
            };
          } else {
            // Item was removed
            const syncData = store.getters['data/syncData'][change.fileId];
            if (syncData && syncData.type === 'file') {
              // create a fake change as a file content change
              contentChange = {
                syncDataId: `${change.fileId}/content`,
              };
            }
          }

          // Push change
          change.syncDataId = change.fileId;
          changes.push(change);
          if (contentChange) {
            changes.push(contentChange);
          }
        });
        changes.startPageToken = result.startPageToken;
        return changes;
      });
  },
  setAppliedChanges(changes) {
    store.dispatch('data/patchLocalSettings', {
      syncStartPageToken: changes.startPageToken,
    });
  },
  saveSimpleItem(item, syncData, ifNotTooLate) {
    return Promise.resolve()
      .then(() => {
        const workspace = store.getters['workspace/currentWorkspace'];
        const syncToken = store.getters['workspace/syncToken'];
        if (item.type !== 'file' && item.type !== 'folder') {
          return googleHelper.uploadFile(
            syncToken,
            JSON.stringify(item),
            [workspace.dataFolderId],
            {
              folderId: workspace.folderId,
            },
            undefined,
            undefined,
            syncData && syncData.id,
            syncData && syncData.parentIds,
            ifNotTooLate,
          );
        }

        // For type `file` or `folder`
        const parentSyncData = store.getters['data/syncDataByItemId'][item.parentId];
        let parentId;
        if (item.parentId === 'trash') {
          parentId = workspace.trashFolderId;
        } else if (parentSyncData) {
          parentId = parentSyncData.id;
        } else {
          parentId = workspace.folderId;
        }

        return googleHelper.uploadFile(
          syncToken,
          item.name,
          [parentId],
          {
            id: item.id,
            folderId: workspace.folderId,
          },
          undefined,
          item.type === 'folder' ? googleHelper.folderMimeType : undefined,
          syncData && syncData.id,
          syncData && syncData.parentIds,
          ifNotTooLate,
        );
      })
      .then(file => ({
        // Build sync data
        id: file.id,
        itemId: item.id,
        type: item.type,
        hash: item.hash,
      }));
  },
  removeItem(syncData, ifNotTooLate) {
    // Ignore content deletion
    if (syncData.type === 'content') {
      return Promise.resolve();
    }
    const syncToken = store.getters['workspace/syncToken'];
    return googleHelper.removeFile(syncToken, syncData.id, ifNotTooLate);
  },
  downloadContent(token, syncLocation) {
    const syncData = store.getters['data/syncDataByItemId'][syncLocation.fileId];
    const contentSyncData = store.getters['data/syncDataByItemId'][`${syncLocation.fileId}/content`];
    if (!syncData || !contentSyncData) {
      return Promise.resolve();
    }
    return googleHelper.downloadFile(token, syncData.id)
      .then((content) => {
        const item = providerUtils.parseContent(content, `${syncLocation.fileId}/content`);
        if (item.hash !== contentSyncData.hash) {
          store.dispatch('data/patchSyncData', {
            [contentSyncData.id]: {
              ...contentSyncData,
              hash: item.hash,
            },
          });
        }
        // Open the file requested by action if it was to synced yet
        if (fileIdToOpen && fileIdToOpen === syncData.id) {
          fileIdToOpen = null;
          // Open the file once downloaded content has been stored
          setTimeout(() => {
            store.commit('file/setCurrentId', syncData.itemId);
          }, 10);
        }
        return item;
      });
  },
  downloadData(dataId) {
    const syncData = store.getters['data/syncDataByItemId'][dataId];
    if (!syncData) {
      return Promise.resolve();
    }
    const syncToken = store.getters['workspace/syncToken'];
    return googleHelper.downloadFile(syncToken, syncData.id)
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
    const contentSyncData = store.getters['data/syncDataByItemId'][`${syncLocation.fileId}/content`];
    if (contentSyncData && contentSyncData.hash === content.hash) {
      return Promise.resolve(syncLocation);
    }
    return Promise.resolve()
      .then(() => {
        const syncData = store.getters['data/syncDataByItemId'][syncLocation.fileId];
        if (syncData) {
          // Only update file media
          return googleHelper.uploadFile(
            token,
            undefined,
            undefined,
            undefined,
            providerUtils.serializeContent(content),
            undefined,
            syncData.id,
            undefined,
            ifNotTooLate,
          );
        }
        // Create file with media
        const workspace = store.getters['workspace/currentWorkspace'];
        // Use deepCopy to freeze objects
        const item = utils.deepCopy(store.state.file.itemMap[syncLocation.fileId]);
        const parentSyncData = store.getters['data/syncDataByItemId'][item.parentId];
        return googleHelper.uploadFile(
          token,
          item.name,
          [parentSyncData ? parentSyncData.id : workspace.folderId],
          {
            id: item.id,
            folderId: workspace.folderId,
          },
          providerUtils.serializeContent(content),
          undefined,
          undefined,
          undefined,
          ifNotTooLate,
        )
          .then((file) => {
            store.dispatch('data/patchSyncData', {
              [file.id]: {
                id: file.id,
                itemId: item.id,
                type: item.type,
                hash: item.hash,
              },
            });
            return file;
          });
      })
      .then(file => store.dispatch('data/patchSyncData', {
        [`${file.id}/content`]: {
          // Build sync data
          id: `${file.id}/content`,
          itemId: content.id,
          type: content.type,
          hash: content.hash,
        },
      }))
      .then(() => syncLocation);
  },
  uploadData(item, dataId, ifNotTooLate) {
    const syncData = store.getters['data/syncDataByItemId'][dataId];
    if (syncData && syncData.hash === item.hash) {
      return Promise.resolve();
    }
    const workspace = store.getters['workspace/currentWorkspace'];
    const syncToken = store.getters['workspace/syncToken'];
    return googleHelper.uploadFile(
      syncToken,
      JSON.stringify({
        id: item.id,
        type: item.type,
        hash: item.hash,
      }),
      [workspace.dataFolderId],
      {
        folderId: workspace.folderId,
      },
      JSON.stringify(item),
      undefined,
      syncData && syncData.id,
      syncData && syncData.parentIds,
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
    return getSyncData(fileId)
      .then(syncData => googleHelper.getFileRevisions(token, syncData.id))
      .then(revisions => revisions.map(revision => ({
        id: revision.id,
        sub: revision.lastModifyingUser && revision.lastModifyingUser.permissionId,
        created: new Date(revision.modifiedTime).getTime(),
      }))
        .sort((revision1, revision2) => revision2.created - revision1.created));
  },
  getRevisionContent(token, fileId, revisionId) {
    return getSyncData(fileId)
      .then(syncData => googleHelper.downloadFileRevision(token, syncData.id, revisionId))
      .then(content => providerUtils.parseContent(content, `${fileId}/content`));
  },
});
