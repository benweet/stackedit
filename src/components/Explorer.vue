<template>
  <div class="explorer flex flex--column">
    <div class="side-title flex flex--row flex--space-between">
      <div class="flex flex--row">
        <button class="side-title__button side-title__button--new-file button" @click="newItem()" v-title="'New file'">
          <icon-file-plus></icon-file-plus>
        </button>
        <button class="side-title__button side-title__button--new-folder button" @click="newItem(true)" v-title="'New folder'">
          <icon-folder-plus></icon-folder-plus>
        </button>
        <button class="side-title__button side-title__button--delete button" @click="deleteItem()" v-title="'Delete'">
          <icon-delete></icon-delete>
        </button>
        <button class="side-title__button side-title__button--rename button" @click="editItem()" v-title="'Rename'">
          <icon-pen></icon-pen>
        </button>
      </div>
      <button class="side-title__button side-title__button--close button" @click="toggleExplorer(false)" v-title="'Close explorer'">
        <icon-close></icon-close>
      </button>
    </div>
    <div class="explorer__tree" :class="{'explorer__tree--new-item': !newChildNode.isNil}" v-if="!light" tabindex="0" @keydown.delete="deleteItem()">
      <explorer-node :node="rootNode" :depth="0"></explorer-node>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import ExplorerNode from './ExplorerNode';
import explorerSvc from '../services/explorerSvc';
import store from '../store';

export default {
  components: {
    ExplorerNode,
  },
  computed: {
    ...mapState([
      'light',
    ]),
    ...mapState('explorer', [
      'newChildNode',
    ]),
    ...mapGetters('explorer', [
      'rootNode',
      'selectedNode',
    ]),
  },
  methods: {
    ...mapActions('data', [
      'toggleExplorer',
    ]),
    newItem: isFolder => explorerSvc.newItem(isFolder),
    deleteItem: () => explorerSvc.deleteItem(),
    editItem() {
      const node = this.selectedNode;
      if (!node.isTrash && !node.isTemp) {
        store.commit('explorer/setEditingId', node.item.id);
      }
    },
  },
  created() {
    this.$watch(
      () => store.getters['file/current'].id,
      (currentFileId) => {
        store.commit('explorer/setSelectedId', currentFileId);
        store.dispatch('explorer/openNode', currentFileId);
      }, {
        immediate: true,
      },
    );
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
