import store from '../store';
import utils from './utils';

const forbiddenFolderNameMatcher = /^\.stackedit-data$|^\.stackedit-trash$|\.md$|\.sync$|\.publish$/;

export default {
  /**
   * Create a file in the store with the specified fields.
   */
  createFile(fields = {}, background = false) {
    const id = utils.uid();
    const file = {
      id,
      name: utils.sanitizeName(fields.name),
      parentId: fields.parentId || null,
    };
    const content = {
      id: `${id}/content`,
      text: utils.sanitizeText(fields.text || store.getters['data/computedSettings'].newFileContent),
      properties: utils.sanitizeText(
        fields.properties || store.getters['data/computedSettings'].newFileProperties),
      discussions: fields.discussions || {},
      comments: fields.comments || {},
    };
    const nameStripped = file.name !== utils.defaultName && file.name !== fields.name;

    // Check if there is a path conflict
    const workspaceUniquePaths = store.getters['workspace/hasUniquePaths'];
    let pathConflict;
    if (workspaceUniquePaths) {
      const parentPath = store.getters.itemPaths[file.parentId] || '';
      const path = parentPath + file.name;
      pathConflict = !!store.getters.pathItems[path];
    }

    // Show warning dialogs and then save in the store
    return Promise.resolve()
      .then(() => !background && nameStripped && store.dispatch('modal/stripName', fields.name))
      .then(() => !background && pathConflict && store.dispatch('modal/pathConflict', fields.name))
      .then(() => {
        store.commit('content/setItem', content);
        store.commit('file/setItem', file);
        if (workspaceUniquePaths) {
          this.makePathUnique(id);
        }
        return store.state.file.itemMap[id];
      });
  },

  /**
   * Make sanity checks and then create/update the folder/file in the store.
   */
  async storeItem(item, background = false) {
    const id = item.id || utils.uid();
    const sanitizedName = utils.sanitizeName(item.name);

    if (item.type === 'folder' && forbiddenFolderNameMatcher.exec(sanitizedName)) {
      if (background) {
        return null;
      }
      await store.dispatch('modal/unauthorizedName', item.name);
      throw new Error('Unauthorized name.');
    }

    const workspaceUniquePaths = store.getters['workspace/hasUniquePaths'];

    // Show warning dialogs
    if (!background) {
      // If name has been stripped
      if (sanitizedName !== utils.defaultName && sanitizedName !== item.name) {
        await store.dispatch('modal/stripName', item.name);
      }
      // Check if there is a path conflict
      if (workspaceUniquePaths) {
        const parentPath = store.getters.itemPaths[item.parentId] || '';
        const path = parentPath + sanitizedName;
        const pathItems = store.getters.pathItems[path] || [];
        if (pathItems.some(itemWithSamePath => itemWithSamePath.id !== id)) {
          await store.dispatch('modal/pathConflict', item.name);
        }
      }
    }

    // Save item in the store
    store.commit(`${item.type}/setItem`, {
      id,
      parentId: item.parentId || null,
      name: sanitizedName,
    });

    // Ensure path uniqueness
    if (workspaceUniquePaths) {
      this.makePathUnique(id);
    }
    return store.getters.allItemMap[id];
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
   * Ensure two files/folders don't have the same path if the workspace doesn't support it.
   */
  ensureUniquePaths() {
    if (store.getters['workspace/hasUniquePaths']) {
      if (Object.keys(store.getters.itemPaths).some(id => this.makePathUnique(id))) {
        this.ensureUniquePaths();
      }
    }
  },

  /**
   * Return false if the file/folder path is unique.
   * Add a prefix to its name and return true otherwise.
   */
  makePathUnique(id) {
    const item = store.getters.allItemMap[id];
    if (!item) {
      return false;
    }
    let path = store.getters.itemPaths[id];
    const pathItems = store.getters.pathItems;
    if (pathItems[path].length === 1) {
      return false;
    }
    const isFolder = item.type === 'folder';
    if (isFolder) {
      // Remove trailing slash
      path = path.slice(0, -1);
    }
    for (let suffix = 1; ; suffix += 1) {
      let pathWithPrefix = `${path}.${suffix}`;
      if (isFolder) {
        pathWithPrefix += '/';
      }
      if (!pathItems[pathWithPrefix]) {
        store.commit(`${item.type}/patchItem`, {
          id: item.id,
          name: `${item.name}.${suffix}`,
        });
        return true;
      }
    }
  },
};
