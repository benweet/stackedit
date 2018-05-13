import store from '../store';
import fileSvc from './fileSvc';

export default {
  newItem(isFolder = false) {
    let parentId = store.getters['explorer/selectedNodeFolder'].item.id;
    if (parentId === 'trash' // Not allowed to create new items in the trash
      || (isFolder && parentId === 'temp') // Not allowed to create new folders in the temp folder
    ) {
      parentId = null;
    }
    store.dispatch('explorer/openNode', parentId);
    store.commit('explorer/setNewItem', {
      type: isFolder ? 'folder' : 'file',
      parentId,
    });
  },
  async deleteItem() {
    const selectedNode = store.getters['explorer/selectedNode'];
    if (selectedNode.isNil) {
      return;
    }
    if (selectedNode.isTrash || selectedNode.item.parentId === 'trash') {
      try {
        await store.dispatch('modal/trashDeletion');
      } catch (e) {
        // Cancel
      }
      return;
    }

    // See if we have a confirmation dialog to show
    let moveToTrash = true;
    try {
      if (selectedNode.isTemp) {
        await store.dispatch('modal/tempFolderDeletion', selectedNode.item);
        moveToTrash = false;
      } else if (selectedNode.item.parentId === 'temp') {
        await store.dispatch('modal/tempFileDeletion', selectedNode.item);
        moveToTrash = false;
      } else if (selectedNode.isFolder) {
        await store.dispatch('modal/folderDeletion', selectedNode.item);
      }
    } catch (e) {
      return; // cancel
    }

    const deleteFile = (id) => {
      if (moveToTrash) {
        store.commit('file/patchItem', {
          id,
          parentId: 'trash',
        });
      } else {
        fileSvc.deleteFile(id);
      }
    };

    if (selectedNode === store.getters['explorer/selectedNode']) {
      const currentFileId = store.getters['file/current'].id;
      let doClose = selectedNode.item.id === currentFileId;
      if (selectedNode.isFolder) {
        const recursiveDelete = (folderNode) => {
          folderNode.folders.forEach(recursiveDelete);
          folderNode.files.forEach((fileNode) => {
            doClose = doClose || fileNode.item.id === currentFileId;
            deleteFile(fileNode.item.id);
          });
          store.commit('folder/deleteItem', folderNode.item.id);
        };
        recursiveDelete(selectedNode);
      } else {
        deleteFile(selectedNode.item.id);
      }
      if (doClose) {
        // Close the current file by opening the last opened, not deleted one
        store.getters['data/lastOpenedIds'].some((id) => {
          const file = store.state.file.itemMap[id];
          if (file.parentId === 'trash') {
            return false;
          }
          store.commit('file/setCurrentId', id);
          return true;
        });
      }
    }
  },
};
