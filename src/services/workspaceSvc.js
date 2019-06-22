import store from '../store';
import utils from './utils';
import constants from '../data/constants';
import badgeSvc from './badgeSvc';

const forbiddenFolderNameMatcher = /^\.stackedit-data$|^\.stackedit-trash$|\.md$|\.sync$|\.publish$/;

export default {

  /**
   * Create a file in the store with the specified fields.
   */
  async createFile({
    name,
    parentId,
    text,
    properties,
    discussions,
    comments,
  } = {}, background = false) {
    const id = utils.uid();
    const item = {
      id,
      name: utils.sanitizeFilename(name),
      parentId: parentId || null,
    };
    const content = {
      id: `${id}/content`,
      text: utils.sanitizeText(text || store.getters['data/computedSettings'].newFileContent),
      properties: utils
        .sanitizeText(properties || store.getters['data/computedSettings'].newFileProperties),
      discussions: discussions || {},
      comments: comments || {},
    };
    const workspaceUniquePaths = store.getters['workspace/currentWorkspaceHasUniquePaths'];

    // Show warning dialogs
    if (!background) {
      // If name is being stripped
      if (item.name !== constants.defaultName && item.name !== name) {
        await store.dispatch('modal/open', {
          type: 'stripName',
          item,
        });
      }

      // Check if there is already a file with that path
      if (workspaceUniquePaths) {
        const parentPath = store.getters.pathsByItemId[item.parentId] || '';
        const path = parentPath + item.name;
        if (store.getters.itemsByPath[path]) {
          await store.dispatch('modal/open', {
            type: 'pathConflict',
            item,
          });
        }
      }
    }

    // Save file and content in the store
    store.commit('content/setItem', content);
    store.commit('file/setItem', item);
    if (workspaceUniquePaths) {
      this.makePathUnique(id);
    }

    // Return the new file item
    return store.state.file.itemsById[id];
  },

  /**
   * Make sanity checks and then create/update the folder/file in the store.
   */
  async storeItem(item) {
    const id = item.id || utils.uid();
    const sanitizedName = utils.sanitizeFilename(item.name);

    if (item.type === 'folder' && forbiddenFolderNameMatcher.exec(sanitizedName)) {
      await store.dispatch('modal/open', {
        type: 'unauthorizedName',
        item,
      });
      throw new Error('Unauthorized name.');
    }

    // Show warning dialogs
    // If name has been stripped
    if (sanitizedName !== constants.defaultName && sanitizedName !== item.name) {
      await store.dispatch('modal/open', {
        type: 'stripName',
        item,
      });
    }

    // Check if there is a path conflict
    if (store.getters['workspace/currentWorkspaceHasUniquePaths']) {
      const parentPath = store.getters.pathsByItemId[item.parentId] || '';
      const path = parentPath + sanitizedName;
      const items = store.getters.itemsByPath[path] || [];
      if (items.some(itemWithSamePath => itemWithSamePath.id !== id)) {
        await store.dispatch('modal/open', {
          type: 'pathConflict',
          item,
        });
      }
    }

    return this.setOrPatchItem({
      ...item,
      id,
    });
  },

  /**
   * Create/update the folder/file in the store and make sure its path is unique.
   */
  setOrPatchItem(patch) {
    const item = {
      ...store.getters.allItemsById[patch.id] || patch,
    };
    if (!item.id) {
      return null;
    }

    if (patch.parentId !== undefined) {
      item.parentId = patch.parentId || null;
    }
    if (patch.name) {
      const sanitizedName = utils.sanitizeFilename(patch.name);
      if (item.type !== 'folder' || !forbiddenFolderNameMatcher.exec(sanitizedName)) {
        item.name = sanitizedName;
      }
    }

    // Save item in the store
    store.commit(`${item.type}/setItem`, item);

    // Remove circular reference
    this.removeCircularReference(item);

    // Ensure path uniqueness
    if (store.getters['workspace/currentWorkspaceHasUniquePaths']) {
      this.makePathUnique(item.id);
    }

    return store.getters.allItemsById[item.id];
  },

  /**
   * Delete a file in the store and all its related items.
   */
  deleteFile(fileId) {
    // Delete the file
    store.commit('file/deleteItem', fileId);
    // Delete the content
    store.commit('content/deleteItem', `${fileId}/content`);
    // Delete the syncedContent
    store.commit('syncedContent/deleteItem', `${fileId}/syncedContent`);
    // Delete the contentState
    store.commit('contentState/deleteItem', `${fileId}/contentState`);
    // Delete sync locations
    (store.getters['syncLocation/groupedByFileId'][fileId] || [])
      .forEach(item => store.commit('syncLocation/deleteItem', item.id));
    // Delete publish locations
    (store.getters['publishLocation/groupedByFileId'][fileId] || [])
      .forEach(item => store.commit('publishLocation/deleteItem', item.id));
  },

  /**
   * Sanitize the whole workspace.
   */
  sanitizeWorkspace(idsToKeep) {
    // Detect and remove circular references for all folders.
    store.getters['folder/items'].forEach(folder => this.removeCircularReference(folder));

    this.ensureUniquePaths(idsToKeep);
    this.ensureUniqueLocations(idsToKeep);
  },

  /**
   * Detect and remove circular reference for an item.
   */
  removeCircularReference(item) {
    const foldersById = store.state.folder.itemsById;
    for (
      let parentFolder = foldersById[item.parentId];
      parentFolder;
      parentFolder = foldersById[parentFolder.parentId]
    ) {
      if (parentFolder.id === item.id) {
        store.commit('folder/patchItem', {
          id: item.id,
          parentId: null,
        });
        break;
      }
    }
  },

  /**
   * Ensure two files/folders don't have the same path if the workspace doesn't allow it.
   */
  ensureUniquePaths(idsToKeep = {}) {
    if (store.getters['workspace/currentWorkspaceHasUniquePaths']) {
      if (Object.keys(store.getters.pathsByItemId)
        .some(id => !idsToKeep[id] && this.makePathUnique(id))
      ) {
        // Just changed one item path, restart
        this.ensureUniquePaths(idsToKeep);
      }
    }
  },

  /**
   * Return false if the file/folder path is unique.
   * Add a prefix to its name and return true otherwise.
   */
  makePathUnique(id) {
    const { itemsByPath, allItemsById, pathsByItemId } = store.getters;
    const item = allItemsById[id];
    if (!item) {
      return false;
    }
    let path = pathsByItemId[id];
    if (itemsByPath[path].length === 1) {
      return false;
    }
    const isFolder = item.type === 'folder';
    if (isFolder) {
      // Remove trailing slash
      path = path.slice(0, -1);
    }
    for (let suffix = 1; ; suffix += 1) {
      let pathWithSuffix = `${path}.${suffix}`;
      if (isFolder) {
        pathWithSuffix += '/';
      }
      if (!itemsByPath[pathWithSuffix]) {
        store.commit(`${item.type}/patchItem`, {
          id: item.id,
          name: `${item.name}.${suffix}`,
        });
        return true;
      }
    }
  },

  addSyncLocation(location) {
    store.commit('syncLocation/setItem', {
      ...location,
      id: utils.uid(),
    });

    // Sanitize the workspace
    this.ensureUniqueLocations();

    if (Object.keys(store.getters['syncLocation/currentWithWorkspaceSyncLocation']).length > 1) {
      badgeSvc.addBadge('syncMultipleLocations');
    }
  },

  addPublishLocation(location) {
    store.commit('publishLocation/setItem', {
      ...location,
      id: utils.uid(),
    });

    // Sanitize the workspace
    this.ensureUniqueLocations();

    if (Object.keys(store.getters['publishLocation/current']).length > 1) {
      badgeSvc.addBadge('publishMultipleLocations');
    }
  },

  /**
   * Ensure two sync/publish locations of the same file don't have the same hash.
   */
  ensureUniqueLocations(idsToKeep = {}) {
    ['syncLocation', 'publishLocation'].forEach((type) => {
      store.getters[`${type}/items`].forEach((item) => {
        if (!idsToKeep[item.id]
          && store.getters[`${type}/groupedByFileIdAndHash`][item.fileId][item.hash].length > 1
        ) {
          store.commit(`${item.type}/deleteItem`, item.id);
        }
      });
    });
  },

  /**
   * Drop the database and clean the localStorage for the specified workspaceId.
   */
  async removeWorkspace(id) {
    // Remove from the store first as workspace tabs will reload.
    // Workspace deletion will be persisted as soon as possible
    // by the store.getters['data/workspaces'] watcher in localDbSvc.
    store.dispatch('workspace/removeWorkspace', id);

    // Drop the database
    await new Promise((resolve) => {
      const dbName = utils.getDbName(id);
      const request = indexedDB.deleteDatabase(dbName);
      request.onerror = resolve; // Ignore errors
      request.onsuccess = resolve;
    });

    // Clean the local storage
    localStorage.removeItem(`${id}/lastSyncActivity`);
    localStorage.removeItem(`${id}/lastWindowFocus`);
  },
};
