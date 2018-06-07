import store from '../../store';
import googleHelper from './helpers/googleHelper';
import Provider from './common/Provider';
import utils from '../utils';
import fileSvc from '../fileSvc';

let fileIdToOpen;
let syncStartPageToken;

export default new Provider({
  id: 'googleDriveWorkspace',
  getToken() {
    return store.getters['workspace/syncToken'];
  },
  async initWorkspace() {
    const makeWorkspaceParams = folderId => ({
      providerId: this.id,
      folderId,
    });

    const makeWorkspaceId = folderId => folderId
      && utils.makeWorkspaceId(makeWorkspaceParams(folderId));

    const getWorkspace = folderId =>
      store.getters['data/sanitizedWorkspaces'][makeWorkspaceId(folderId)];

    const initFolder = async (token, folder) => {
      const appProperties = {
        folderId: folder.id,
        dataFolderId: folder.appProperties.dataFolderId,
        trashFolderId: folder.appProperties.trashFolderId,
      };

      // Make sure data folder exists
      if (!appProperties.dataFolderId) {
        appProperties.dataFolderId = (await googleHelper.uploadFile({
          token,
          name: '.stackedit-data',
          parents: [folder.id],
          appProperties: { folderId: folder.id },
          mediaType: googleHelper.folderMimeType,
        })).id;
      }

      // Make sure trash folder exists
      if (!appProperties.trashFolderId) {
        appProperties.trashFolderId = (await googleHelper.uploadFile({
          token,
          name: '.stackedit-trash',
          parents: [folder.id],
          appProperties: { folderId: folder.id },
          mediaType: googleHelper.folderMimeType,
        })).id;
      }

      // Update workspace if some properties are missing
      if (appProperties.folderId !== folder.appProperties.folderId
        || appProperties.dataFolderId !== folder.appProperties.dataFolderId
        || appProperties.trashFolderId !== folder.appProperties.trashFolderId
      ) {
        await googleHelper.uploadFile({
          token,
          appProperties,
          mediaType: googleHelper.folderMimeType,
          fileId: folder.id,
        });
      }

      // Update workspace in the store
      const workspaceId = makeWorkspaceId(folder.id);
      store.dispatch('data/patchWorkspaces', {
        [workspaceId]: {
          id: workspaceId,
          sub: token.sub,
          name: folder.name,
          providerId: this.id,
          url: window.location.href,
          folderId: folder.id,
          teamDriveId: folder.teamDriveId,
          dataFolderId: appProperties.dataFolderId,
          trashFolderId: appProperties.trashFolderId,
        },
      });
    };

    // Token sub is in the workspace or in the url if workspace is about to be created
    const { sub } = getWorkspace(utils.queryParams.folderId) || utils.queryParams;
    // See if we already have a token
    let token = store.getters['data/googleTokens'][sub];
    // If no token has been found, popup an authorize window and get one
    if (!token || !token.isDrive || !token.driveFullAccess) {
      await store.dispatch('modal/open', 'workspaceGoogleRedirection');
      token = await googleHelper.addDriveAccount(true, utils.queryParams.sub);
    }

    let { folderId } = utils.queryParams;
    // If no folderId is provided, create one
    if (!folderId) {
      const folder = await googleHelper.uploadFile({
        token,
        name: 'StackEdit workspace',
        parents: [],
        mediaType: googleHelper.folderMimeType,
      });
      await initFolder(token, {
        ...folder,
        appProperties: {},
      });
      folderId = folder.id;
    }

    // Init workspace
    let workspace = getWorkspace(folderId);
    if (!workspace) {
      let folder;
      try {
        folder = googleHelper.getFile(token, folderId);
      } catch (err) {
        throw new Error(`Folder ${folderId} is not accessible. Make sure you have the right permissions.`);
      }
      folder.appProperties = folder.appProperties || {};
      const folderIdProperty = folder.appProperties.folderId;
      if (folderIdProperty && folderIdProperty !== folderId) {
        throw new Error(`Folder ${folderId} is part of another workspace.`);
      }
      await initFolder(token, folder);
      workspace = getWorkspace(folderId);
    }

    // Fix the URL hash
    utils.setQueryParams(makeWorkspaceParams(workspace.folderId));
    if (workspace.url !== window.location.href) {
      store.dispatch('data/patchWorkspaces', {
        [workspace.id]: {
          ...workspace,
          url: window.location.href,
        },
      });
    }
    return store.getters['data/sanitizedWorkspaces'][workspace.id];
  },
  async performAction() {
    const state = googleHelper.driveState || {};
    const token = this.getToken();
    switch (token && state.action) {
      case 'create': {
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
        const file = await fileSvc.createFile({
          parentId: syncData && syncData.itemId,
        }, true);
        store.commit('file/setCurrentId', file.id);
        // File will be created on next workspace sync
        break;
      }
      case 'open': {
        // open first file only
        const firstFile = googleHelper.driveActionFiles[0];
        const syncData = store.getters['data/syncData'][firstFile.id];
        if (!syncData) {
          fileIdToOpen = firstFile.id;
        } else {
          store.commit('file/setCurrentId', syncData.itemId);
        }
        break;
      }
      default:
    }
  },
  async getChanges() {
    const workspace = store.getters['workspace/currentWorkspace'];
    const syncToken = store.getters['workspace/syncToken'];
    const lastStartPageToken = store.getters['data/localSettings'].syncStartPageToken;
    const { changes, startPageToken } = await googleHelper
      .getChanges(syncToken, lastStartPageToken, false, workspace.teamDriveId);

    // Collect possible parent IDs
    const parentIds = {};
    Object.entries(store.getters['data/syncDataByItemId']).forEach(([id, syncData]) => {
      parentIds[syncData.id] = id;
    });
    changes.forEach((change) => {
      const { id } = (change.file || {}).appProperties || {};
      if (id) {
        parentIds[change.fileId] = id;
      }
    });

    // Collect changes
    const result = [];
    changes.forEach((change) => {
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
        const { appProperties } = change.file;
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
      result.push(change);
      if (contentChange) {
        result.push(contentChange);
      }
    });
    syncStartPageToken = startPageToken;
    return result;
  },
  onChangesApplied() {
    store.dispatch('data/patchLocalSettings', {
      syncStartPageToken,
    });
  },
  async saveWorkspaceItem(item, syncData, ifNotTooLate) {
    const workspace = store.getters['workspace/currentWorkspace'];
    const syncToken = store.getters['workspace/syncToken'];
    let file;
    if (item.type !== 'file' && item.type !== 'folder') {
      // For sync/publish locations, store item as filename
      file = await googleHelper.uploadFile({
        token: syncToken,
        name: JSON.stringify(item),
        parents: [workspace.dataFolderId],
        appProperties: {
          folderId: workspace.folderId,
        },
        fileId: syncData && syncData.id,
        oldParents: syncData && syncData.parentIds,
        ifNotTooLate,
      });
    } else {
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

      file = await googleHelper.uploadFile({
        token: syncToken,
        name: item.name,
        parents: [parentId],
        appProperties: {
          id: item.id,
          folderId: workspace.folderId,
        },
        mediaType: item.type === 'folder' ? googleHelper.folderMimeType : undefined,
        fileId: syncData && syncData.id,
        oldParents: syncData && syncData.parentIds,
        ifNotTooLate,
      });
    }
    // Build sync data
    return {
      id: file.id,
      itemId: item.id,
      type: item.type,
      hash: item.hash,
    };
  },
  async removeWorkspaceItem(syncData, ifNotTooLate) {
    // Ignore content deletion
    if (syncData.type !== 'content') {
      const syncToken = store.getters['workspace/syncToken'];
      await googleHelper.removeFile(syncToken, syncData.id, ifNotTooLate);
    }
  },
  async downloadWorkspaceContent(token, contentSyncData) {
    const [fileId] = contentSyncData.itemId.split('/');
    const syncData = store.getters['data/syncDataByItemId'][fileId];
    if (!syncData) {
      return {};
    }
    const content = await googleHelper.downloadFile(token, syncData.id);
    const item = Provider.parseContent(content, contentSyncData.itemId);

    // Open the file requested by action if it wasn't synced yet
    if (fileIdToOpen && fileIdToOpen === syncData.id) {
      fileIdToOpen = null;
      // Open the file once downloaded content has been stored
      setTimeout(() => {
        store.commit('file/setCurrentId', fileId);
      }, 10);
    }

    return {
      item,
      syncData: {
        ...contentSyncData,
        hash: item.hash,
      },
    };
  },
  async downloadWorkspaceData(token, dataId, syncData) {
    if (!syncData) {
      return {};
    }

    const content = await googleHelper.downloadFile(token, syncData.id);
    const item = JSON.parse(content);
    return {
      item,
      syncData: {
        ...syncData,
        hash: item.hash,
      },
    };
  },
  async uploadWorkspaceContent(token, content, contentSyncData, ifNotTooLate) {
    const [fileId] = content.id.split('/');
    const syncData = store.getters['data/syncDataByItemId'][fileId];
    let file;

    if (syncData) {
      // Only update file media
      file = await googleHelper.uploadFile({
        token,
        media: Provider.serializeContent(content),
        fileId: syncData.id,
        ifNotTooLate,
      });
    } else {
      // Create file with media
      const workspace = store.getters['workspace/currentWorkspace'];
      // Use deepCopy to freeze objects
      const item = utils.deepCopy(store.state.file.itemMap[fileId]);
      const parentSyncData = store.getters['data/syncDataByItemId'][item.parentId];
      file = await googleHelper.uploadFile({
        token,
        name: item.name,
        parents: [parentSyncData ? parentSyncData.id : workspace.folderId],
        appProperties: {
          id: item.id,
          folderId: workspace.folderId,
        },
        media: Provider.serializeContent(content),
        ifNotTooLate,
      });

      // Create file syncData
      store.dispatch('data/patchSyncData', {
        [file.id]: {
          id: file.id,
          itemId: item.id,
          type: item.type,
          hash: item.hash,
        },
      });
    }

    // Return new sync data
    return {
      id: `${file.id}/content`,
      itemId: content.id,
      type: content.type,
      hash: content.hash,
    };
  },
  async uploadWorkspaceData(token, item, syncData, ifNotTooLate) {
    const workspace = store.getters['workspace/currentWorkspace'];
    const file = await googleHelper.uploadFile({
      token,
      name: JSON.stringify({
        id: item.id,
        type: item.type,
        hash: item.hash,
      }),
      parents: [workspace.dataFolderId],
      appProperties: {
        folderId: workspace.folderId,
      },
      media: JSON.stringify(item),
      fileId: syncData && syncData.id,
      oldParents: syncData && syncData.parentIds,
      ifNotTooLate,
    });

    // Return new sync data
    return {
      id: file.id,
      itemId: item.id,
      type: item.type,
      hash: item.hash,
    };
  },
  async listRevisions(token, fileId) {
    const syncData = Provider.getContentSyncData(fileId);
    const revisions = await googleHelper.getFileRevisions(token, syncData.id);
    return revisions.map(revision => ({
      id: revision.id,
      sub: revision.lastModifyingUser && revision.lastModifyingUser.permissionId,
      created: new Date(revision.modifiedTime).getTime(),
    }))
      .sort((revision1, revision2) => revision2.created - revision1.created);
  },
  async getRevisionContent(token, fileId, revisionId) {
    const syncData = Provider.getContentSyncData(fileId);
    const content = await googleHelper.downloadFileRevision(token, syncData.id, revisionId);
    return Provider.parseContent(content, `${fileId}/content`);
  },
});
