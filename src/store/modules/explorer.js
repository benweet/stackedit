import Vue from 'vue';
import emptyFile from '../../data/emptyFile';
import emptyFolder from '../../data/emptyFolder';

const setter = propertyName => (state, value) => {
  state[propertyName] = value;
};

const collator = new Intl.Collator(undefined, { sensitivity: 'base' });
const compare = (node1, node2) => collator.compare(node1.item.name, node2.item.name);

class Node {
  constructor(item, isFolder, isRoot) {
    this.item = item;
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

function getParent(node, getters) {
  if (node === nilFileNode) {
    return nilFileNode;
  }
  return getters.nodeMap[node.item.parentId] || getters.rootNode;
}

export default {
  namespaced: true,
  state: {
    selectedId: null,
    editingId: null,
    newChildNode: nilFileNode,
    openNodes: {},
  },
  getters: {
    nodeStructure: (state, getters, rootState, rootGetters) => {
      const nodeMap = {};
      rootGetters['folders/items'].forEach((item) => {
        nodeMap[item.id] = new Node(item, true);
      });
      rootGetters['files/items'].forEach((item) => {
        nodeMap[item.id] = new Node(item);
      });
      const rootNode = new Node(emptyFolder(), true, true);
      Object.keys(nodeMap).forEach((id) => {
        const node = nodeMap[id];
        let parentNode = nodeMap[node.item.parentId];
        if (!parentNode || !parentNode.isFolder) {
          parentNode = rootNode;
        }
        if (node.isFolder) {
          parentNode.folders.push(node);
        } else {
          parentNode.files.push(node);
        }
      });
      rootNode.sortChildren();
      return {
        nodeMap,
        rootNode,
      };
    },
    nodeMap: (state, getters) => getters.nodeStructure.nodeMap,
    rootNode: (state, getters) => getters.nodeStructure.rootNode,
    newChildNodeParent: (state, getters) => getParent(state.newChildNode, getters),
    selectedNode: (state, getters) => getters.nodeMap[state.selectedId] || nilFileNode,
    selectedNodeFolder: (state, getters) => {
      const selectedNode = getters.selectedNode;
      return selectedNode.item.type === 'folder'
        ? selectedNode
        : getParent(selectedNode, getters);
    },
    editingNode: (state, getters) => getters.nodeMap[state.editingId] || nilFileNode,
  },
  mutations: {
    setSelectedId: setter('selectedId'),
    setEditingId: setter('editingId'),
    setNewItem(state, item) {
      state.newChildNode = item ? new Node(item) : nilFileNode;
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
  },
};
