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
      store.getters['data/sanitizedWorkspacesById'][makeWorkspaceId(folderId)];

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
      store.dispatch('data/patchWorkspacesById', {
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
    let token = store.getters['data/googleTokensBySub'][sub];
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
      store.dispatch('data/patchWorkspacesById', {
        [workspace.id]: {
          ...workspace,
          url: window.location.href,
        },
      });
    }
    return store.getters['data/sanitizedWorkspacesById'][workspace.id];
  },
  async performAction() {
    const state = googleHelper.driveState || {};
    const token = this.getToken();
    switch (token && state.action) {
      case 'create': {
        const driveFolder = googleHelper.driveActionFolder;
        let syncData = store.getters['data/syncDataById'][driveFolder.id];
        if (!syncData && driveFolder.appProperties.id) {
          // Create folder if not already synced
          store.commit('folder/setItem', {
            id: driveFolder.appProperties.id,
            name: driveFolder.name,
          });
          const item = store.state.folder.itemsById[driveFolder.appProperties.id];
          syncData = {
            id: driveFolder.id,
            itemId: item.id,
            type: item.type,
            hash: item.hash,
          };
          store.dispatch('data/patchSyncDataById', {
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
        const syncData = store.getters['data/syncDataById'][firstFile.id];
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

    syncStartPageToken = startPageToken;
    return changes;
  },
  prepareChanges(changes) {
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
    const workspace = store.getters['workspace/currentWorkspace'];
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
            const id = `${appProperties.id}/content`;
            const syncDataId = `${change.fileId}/content`;
            contentChange = {
              item: {
                id,
                type: 'content',
                // Need a truthy value to force saving sync data
                hash: 1,
              },
              syncData: {
                id: syncDataId,
                itemId: id,
                type: 'content',
                // Need a truthy value to force downloading the content
                hash: 1,
              },
              syncDataId,
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
        const syncData = store.getters['data/syncDataById'][change.fileId];
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

    return result;
  },
  onChangesApplied() {
    store.dispatch('data/patchLocalSettings', {
      syncStartPageToken,
    });
  },
  async saveWorkspaceItem({ item, syncData, ifNotTooLate }) {
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
  async removeWorkspaceItem({ syncData, ifNotTooLate }) {
    // Ignore content deletion
    if (syncData.type !== 'content') {
      const syncToken = store.getters['workspace/syncToken'];
      await googleHelper.removeFile(syncToken, syncData.id, ifNotTooLate);
    }
  },
  async downloadWorkspaceContent({ token, contentSyncData, fileSyncData }) {
    const data = await googleHelper.downloadFile(token, fileSyncData.id);
    const content = Provider.parseContent(data, contentSyncData.itemId);

    // Open the file requested by action if it wasn't synced yet
    if (fileIdToOpen && fileIdToOpen === fileSyncData.id) {
      fileIdToOpen = null;
      // Open the file once downloaded content has been stored
      setTimeout(() => {
        store.commit('file/setCurrentId', fileSyncData.itemId);
      }, 10);
    }

    return {
      content,
      contentSyncData: {
        ...contentSyncData,
        hash: content.hash,
      },
    };
  },
  async downloadWorkspaceData({ token, syncData }) {
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
  async uploadWorkspaceContent({
    token,
    content,
    file,
    fileSyncData,
    ifNotTooLate,
  }) {
    let gdriveFile;
    let newFileSyncData;

    if (fileSyncData) {
      // Only update file media
      gdriveFile = await googleHelper.uploadFile({
        token,
        media: Provider.serializeContent(content),
        fileId: fileSyncData.id,
        ifNotTooLate,
      });
    } else {
      // Create file with media
      const workspace = store.getters['workspace/currentWorkspace'];
      const parentSyncData = store.getters['data/syncDataByItemId'][file.parentId];
      gdriveFile = await googleHelper.uploadFile({
        token,
        name: file.name,
        parents: [parentSyncData ? parentSyncData.id : workspace.folderId],
        appProperties: {
          id: file.id,
          folderId: workspace.folderId,
        },
        media: Provider.serializeContent(content),
        ifNotTooLate,
      });

      // Create file sync data
      newFileSyncData = {
        id: gdriveFile.id,
        itemId: file.id,
        type: file.type,
        hash: file.hash,
      };
    }

    // Return new sync data
    return {
      contentSyncData: {
        id: `${gdriveFile.id}/content`,
        itemId: content.id,
        type: content.type,
        hash: content.hash,
      },
      fileSyncData: newFileSyncData,
    };
  },
  async uploadWorkspaceData({
    token,
    item,
    syncData,
    ifNotTooLate,
  }) {
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
      syncData: {
        id: file.id,
        itemId: item.id,
        type: item.type,
        hash: item.hash,
      },
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
