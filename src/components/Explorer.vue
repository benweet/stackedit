<template>
  <div class="explorer flex flex--column">
    <div class="side-title flex flex--row flex--space-between">
      <div class="flex flex--row">
        <button class="side-title__button button" @click="newItem()" v-title="'New file'">
          <icon-file-plus></icon-file-plus>
        </button>
        <button class="side-title__button button" @click="newItem(true)" v-title="'New folder'">
          <icon-folder-plus></icon-folder-plus>
        </button>
        <button class="side-title__button button" @click="deleteItem()" v-title="'Remove'">
          <icon-delete></icon-delete>
        </button>
        <button class="side-title__button button" @click="editItem()" v-title="'Rename'">
          <icon-pen></icon-pen>
        </button>
      </div>
      <button class="side-title__button button" @click="toggleExplorer(false)" v-title="'Close explorer'">
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
      let parentId = this.$store.getters['explorer/selectedNodeFolder'].item.id;
      if (parentId === 'trash') {
        parentId = null;
      }
      this.$store.dispatch('explorer/openNode', parentId);
      this.$store.commit('explorer/setNewItem', {
        type: isFolder ? 'folder' : 'file',
        parentId,
      });
    },
    editItem() {
      const selectedNode = this.$store.getters['explorer/selectedNode'];
      if (selectedNode.item.id !== 'trash') {
        this.$store.commit('explorer/setEditingId', selectedNode.item.id);
      }
    },
    deleteItem() {
      const selectedNode = this.$store.getters['explorer/selectedNode'];
      if (!selectedNode.isNil) {
        if (selectedNode.item.id === 'trash' || selectedNode.item.parentId === 'trash') {
          this.$store.dispatch('modal/trashDeletion');
          return;
        }
        this.$store.dispatch(selectedNode.isFolder
          ? 'modal/folderDeletion'
          : 'modal/fileDeletion',
          selectedNode.item)
          .then(() => {
            if (selectedNode === this.$store.getters['explorer/selectedNode']) {
              if (selectedNode.isFolder) {
                const recursiveMoveToTrash = (folderNode) => {
                  folderNode.folders.forEach(recursiveMoveToTrash);
                  folderNode.files.forEach((fileNode) => {
                    this.$store.commit('file/patchItem', {
                      id: fileNode.item.id,
                      parentId: 'trash',
                    });
                  });
                  this.$store.commit('folder/deleteItem', folderNode.item.id);
                };
                recursiveMoveToTrash(selectedNode);
              } else {
                this.$store.commit('file/patchItem', {
                  id: selectedNode.item.id,
                  parentId: 'trash',
                });
                this.$store.commit('file/setCurrentId', this.$store.getters['data/lastOpenedIds'][1]);
              }
            }
          });
      }
    },
  },
  created() {
    this.$store.watch(
      () => this.$store.getters['file/current'].id,
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
