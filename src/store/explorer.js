import Vue from 'vue';
import emptyFile from '../data/emptyFile';
import emptyFolder from '../data/emptyFolder';

const setter = propertyName => (state, value) => {
  state[propertyName] = value;
};

function debounceAction(action, wait) {
  let timeoutId;
  return (context) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => action(context), wait);
  };
}

const collator = new Intl.Collator(undefined, { sensitivity: 'base' });
const compare = (node1, node2) => collator.compare(node1.item.name, node2.item.name);

class Node {
  constructor(item, locations = [], isFolder = false, isRoot = false) {
    this.item = item;
    this.locations = locations;
    this.isFolder = isFolder;
    this.isRoot = isRoot;
    if (isFolder) {
      this.folders = [];
      this.files = [];
    }
  }

  sortChildren() {
    if (this.isFolder) {
      this.folders.sort(compare);
      this.files.sort(compare);
      this.folders.forEach(child => child.sortChildren());
    }
  }
}

const nilFileNode = new Node(emptyFile());
nilFileNode.isNil = true;
const fakeFileNode = new Node(emptyFile());
fakeFileNode.item.id = 'fake';
fakeFileNode.noDrag = true;

function getParent(node, getters) {
  if (node.isNil) {
    return nilFileNode;
  }
  return getters.nodeMap[node.item.parentId] || getters.rootNode;
}

function getFolder(node, getters) {
  return node.item.type === 'folder' ?
    node :
    getParent(node, getters);
}

export default {
  namespaced: true,
  state: {
    selectedId: null,
    editingId: null,
    dragSourceId: null,
    dragTargetId: null,
    newChildNode: nilFileNode,
    openNodes: {},
  },
  getters: {
    nodeStructure: (state, getters, rootState, rootGetters) => {
      const rootNode = new Node(emptyFolder(), [], true, true);

      // Create Trash node
      const trashFolderNode = new Node(emptyFolder(), [], true);
      trashFolderNode.item.id = 'trash';
      trashFolderNode.item.name = 'Trash';
      trashFolderNode.noDrag = true;
      trashFolderNode.isTrash = true;
      trashFolderNode.parentNode = rootNode;

      // Create Temp node
      const tempFolderNode = new Node(emptyFolder(), [], true);
      tempFolderNode.item.id = 'temp';
      tempFolderNode.item.name = 'Temp';
      tempFolderNode.noDrag = true;
      tempFolderNode.noDrop = true;
      tempFolderNode.isTemp = true;
      tempFolderNode.parentNode = rootNode;

      // Fill nodeMap with all file and folder nodes
      const nodeMap = {
        trash: trashFolderNode,
        temp: tempFolderNode,
      };
      rootGetters['folder/items'].forEach((item) => {
        nodeMap[item.id] = new Node(item, [], true);
      });
      const syncLocationsByFileId = rootGetters['syncLocation/groupedByFileId'];
      const publishLocationsByFileId = rootGetters['publishLocation/groupedByFileId'];
      rootGetters['file/items'].forEach((item) => {
        const locations = [
          ...syncLocationsByFileId[item.id] || [],
          ...publishLocationsByFileId[item.id] || [],
        ];
        nodeMap[item.id] = new Node(item, locations);
      });

      // Build the tree
      Object.entries(nodeMap).forEach(([, node]) => {
        let parentNode = nodeMap[node.item.parentId];
        if (!parentNode || !parentNode.isFolder) {
          if (node.isTrash || node.isTemp) {
            return;
          }
          parentNode = rootNode;
        }
        if (node.isFolder) {
          parentNode.folders.push(node);
        } else {
          parentNode.files.push(node);
        }
        node.parentNode = parentNode;
      });
      rootNode.sortChildren();

      // Add Trash and Temp nodes
      rootNode.folders.unshift(tempFolderNode);
      tempFolderNode.files.forEach((node) => {
        node.noDrop = true;
      });
      rootNode.folders.unshift(trashFolderNode);

      // Add a fake file at the end of the root folder to allow drag and drop into it
      rootNode.files.push(fakeFileNode);
      return {
        nodeMap,
        rootNode,
      };
    },
    nodeMap: (state, getters) => getters.nodeStructure.nodeMap,
    rootNode: (state, getters) => getters.nodeStructure.rootNode,
    newChildNodeParent: (state, getters) => getParent(state.newChildNode, getters),
    selectedNode: (state, getters) => getters.nodeMap[state.selectedId] || nilFileNode,
    selectedNodeFolder: (state, getters) => getFolder(getters.selectedNode, getters),
    editingNode: (state, getters) => getters.nodeMap[state.editingId] || nilFileNode,
    dragSourceNode: (state, getters) => getters.nodeMap[state.dragSourceId] || nilFileNode,
    dragTargetNode: (state, getters) => {
      if (state.dragTargetId === 'fake') {
        return fakeFileNode;
      }
      return getters.nodeMap[state.dragTargetId] || nilFileNode;
    },
    dragTargetNodeFolder: (state, getters) => {
      if (state.dragTargetId === 'fake') {
        return getters.rootNode;
      }
      return getFolder(getters.dragTargetNode, getters);
    },
  },
  mutations: {
    setSelectedId: setter('selectedId'),
    setEditingId: setter('editingId'),
    setDragSourceId: setter('dragSourceId'),
    setDragTargetId: setter('dragTargetId'),
    setNewItem(state, item) {
      state.newChildNode = item ? new Node(item, [], item.type === 'folder') : nilFileNode;
    },
    setNewItemName(state, name) {
      state.newChildNode.item.name = name;
    },
    toggleOpenNode(state, id) {
      Vue.set(state.openNodes, id, !state.openNodes[id]);
    },
  },
  actions: {
    openNode({ state, getters, commit, dispatch }, id) {
      const node = getters.nodeMap[id];
      if (node) {
        if (node.isFolder && !state.openNodes[id]) {
          commit('toggleOpenNode', id);
        }
        dispatch('openNode', node.item.parentId);
      }
    },
    openDragTarget: debounceAction(({ state, dispatch }) => {
      dispatch('openNode', state.dragTargetId);
    }, 1000),
    setDragTarget({ state, getters, commit, dispatch }, id) {
      commit('setDragTargetId', id);
      dispatch('openDragTarget');
    },
    newItem({ getters, commit, dispatch }, isFolder) {
      let parentId = getters.selectedNodeFolder.item.id;
      if (parentId === 'trash' // Not allowed to create new items in the trash
        || (isFolder && parentId === 'temp') // Not allowed to create new folders in the temp folder
      ) {
        parentId = null;
      }
      dispatch('openNode', parentId);
      commit('setNewItem', {
        type: isFolder ? 'folder' : 'file',
        parentId,
      });
    },
    deleteItem({ rootState, getters, rootGetters, commit, dispatch }) {
      const selectedNode = getters.selectedNode;
      if (selectedNode.isNil) {
        return Promise.resolve();
      }
      if (selectedNode.isTrash || selectedNode.item.parentId === 'trash') {
        return dispatch('modal/trashDeletion', null, { root: true });
      }

      // See if we have a dialog to show
      let modalAction;
      let moveToTrash = true;
      if (selectedNode.isTemp) {
        modalAction = 'modal/tempFolderDeletion';
        moveToTrash = false;
      } else if (selectedNode.item.parentId === 'temp') {
        modalAction = 'modal/tempFileDeletion';
        moveToTrash = false;
      } else if (selectedNode.isFolder) {
        modalAction = 'modal/folderDeletion';
      }

      return (modalAction
        ? dispatch(modalAction, selectedNode.item, { root: true })
        : Promise.resolve())
        .then(() => {
          const deleteFile = (id) => {
            if (moveToTrash) {
              commit('file/patchItem', {
                id,
                parentId: 'trash',
              }, { root: true });
            } else {
              dispatch('deleteFile', id, { root: true });
            }
          };

          if (selectedNode === getters.selectedNode) {
            const currentFileId = rootGetters['file/current'].id;
            let doClose = selectedNode.item.id === currentFileId;
            if (selectedNode.isFolder) {
              const recursiveDelete = (folderNode) => {
                folderNode.folders.forEach(recursiveDelete);
                folderNode.files.forEach((fileNode) => {
                  doClose = doClose || fileNode.item.id === currentFileId;
                  deleteFile(fileNode.item.id);
                });
                commit('folder/deleteItem', folderNode.item.id, { root: true });
              };
              recursiveDelete(selectedNode);
            } else {
              deleteFile(selectedNode.item.id);
            }
            if (doClose) {
              // Close the current file by opening the last opened, not deleted one
              rootGetters['data/lastOpenedIds'].some((id) => {
                const file = rootState.file.itemMap[id];
                if (file.parentId === 'trash') {
                  return false;
                }
                commit('file/setCurrentId', id, { root: true });
                return true;
              });
            }
          }
        }, () => {}); // Cancel
    },
  },
};
