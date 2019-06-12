import Vue from 'vue';
import emptyFile from '../data/empties/emptyFile';
import emptyFolder from '../data/empties/emptyFolder';

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

const collator = new Intl.Collator(undefined, { sensitivity: 'base', numeric: true });
const compare = (node1, node2) => collator.compare(node1.item.name, node2.item.name);

class Node {
  constructor(item, locations = [], isFolder = false) {
    this.item = item;
    this.locations = locations;
    this.isFolder = isFolder;
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

function getParent({ item, isNil }, { nodeMap, rootNode }) {
  if (isNil) {
    return nilFileNode;
  }
  return nodeMap[item.parentId] || rootNode;
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
  getters: {
    nodeStructure: (state, getters, rootState, rootGetters) => {
      const rootNode = new Node(emptyFolder(), [], true);
      rootNode.isRoot = true;

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
      const syncLocationsByFileId = rootGetters['syncLocation/filteredGroupedByFileId'];
      const publishLocationsByFileId = rootGetters['publishLocation/filteredGroupedByFileId'];
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
    nodeMap: (state, { nodeStructure }) => nodeStructure.nodeMap,
    rootNode: (state, { nodeStructure }) => nodeStructure.rootNode,
    newChildNodeParent: (state, getters) => getParent(state.newChildNode, getters),
    selectedNode: ({ selectedId }, { nodeMap }) => nodeMap[selectedId] || nilFileNode,
    selectedNodeFolder: (state, getters) => getFolder(getters.selectedNode, getters),
    editingNode: ({ editingId }, { nodeMap }) => nodeMap[editingId] || nilFileNode,
    dragSourceNode: ({ dragSourceId }, { nodeMap }) => nodeMap[dragSourceId] || nilFileNode,
    dragTargetNode: ({ dragTargetId }, { nodeMap }) => {
      if (dragTargetId === 'fake') {
        return fakeFileNode;
      }
      return nodeMap[dragTargetId] || nilFileNode;
    },
    dragTargetNodeFolder: ({ dragTargetId }, getters) => {
      if (dragTargetId === 'fake') {
        return getters.rootNode;
      }
      return getFolder(getters.dragTargetNode, getters);
    },
  },
  actions: {
    openNode({
      state,
      getters,
      commit,
      dispatch,
    }, id) {
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
    setDragTarget({ commit, getters, dispatch }, node) {
      if (!node) {
        commit('setDragTargetId');
      } else {
        // Make sure target node is not a child of source node
        const folderNode = getFolder(node, getters);
        const sourceId = getters.dragSourceNode.item.id;
        const { nodeMap } = getters;
        for (let parentNode = folderNode;
          parentNode;
          parentNode = nodeMap[parentNode.item.parentId]
        ) {
          if (parentNode.item.id === sourceId) {
            commit('setDragTargetId');
            return;
          }
        }

        commit('setDragTargetId', node.item.id);
        dispatch('openDragTarget');
      }
    },
  },
};
