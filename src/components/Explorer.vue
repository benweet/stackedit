<template>
  <div class="explorer flex flex--column">
    <div class="side-title flex flex--row flex--space-between">
      <div class="flex flex--row">
        <button class="side-title__button button" @click="newItem()">
          <icon-file-plus></icon-file-plus>
        </button>
        <button class="side-title__button button" @click="newItem(true)">
          <icon-folder-plus></icon-folder-plus>
        </button>
        <button class="side-title__button button" @click="editItem()">
          <icon-pen></icon-pen>
        </button>
        <button class="side-title__button button" @click="deleteItem()">
          <icon-delete></icon-delete>
        </button>
      </div>
      <button class="side-title__button button" @click="toggleExplorer(false)">
        <icon-close></icon-close>
      </button>
    </div>
    <div class="explorer__tree" :class="{'explorer__tree--new-item': !newChildNode.isNil}" tabindex="0">
      <explorer-node :node="rootNode" :depth="0"></explorer-node>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import ExplorerNode from './ExplorerNode';

export default {
  components: {
    ExplorerNode,
  },
  computed: {
    ...mapState('explorer', [
      'newChildNode',
    ]),
    ...mapGetters('explorer', [
      'rootNode',
    ]),
  },
  methods: {
    ...mapActions('data', [
      'toggleExplorer',
    ]),
    newItem(isFolder) {
      const parentId = this.$store.getters['explorer/selectedNodeFolder'].item.id;
      this.$store.dispatch('explorer/openNode', parentId);
      this.$store.commit('explorer/setNewItem', {
        type: isFolder ? 'folder' : 'file',
        parentId,
      });
    },
    editItem() {
      const selectedNode = this.$store.getters['explorer/selectedNode'];
      this.$store.commit('explorer/setEditingId', selectedNode.item.id);
    },
    deleteItem() {
      const selectedNode = this.$store.getters['explorer/selectedNode'];
      if (!selectedNode.isNil) {
        this.$store.dispatch(selectedNode.isFolder
          ? 'modal/folderDeletion'
          : 'modal/fileDeletion',
          selectedNode.item)
          .then(() => {
            if (selectedNode === this.$store.getters['explorer/selectedNode']) {
              if (selectedNode.isFolder) {
                const recursiveDelete = (folderNode) => {
                  folderNode.folders.forEach(recursiveDelete);
                  folderNode.files.forEach((fileNode) => {
                    this.$store.commit('files/deleteItem', fileNode.item.id);
                  });
                  this.$store.commit('folders/deleteItem', folderNode.item.id);
                };
                recursiveDelete(selectedNode);
              } else {
                this.$store.commit('files/deleteItem', selectedNode.item.id);
              }
            }
          });
      }
    },
  },
  created() {
    this.$store.watch(
      () => this.$store.getters['files/current'].id,
      (currentFileId) => {
        this.$store.commit('explorer/setSelectedId', currentFileId);
        this.$store.dispatch('explorer/openNode', currentFileId);
      }, {
        immediate: true,
      });
  },
};
</script>

<style lang="scss">
.explorer,
.explorer__tree {
  height: 100%;
}

.explorer__tree {
  overflow: auto;

  /* fake element */
  & > .explorer-node > .explorer-node__children > .explorer-node:last-child > .explorer-node__item {
    height: 20px;
    cursor: auto;
  }
}
</style>
