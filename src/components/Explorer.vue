<template>
  <div class="explorer flex flex--column">
    <div class="side-title">
      <button class="side-title__button side-title__button--right button" @click="toggleExplorer(false)">
        <icon-close></icon-close>
      </button>
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
    <div class="explorer__tree" :class="{'explorer__tree--new-item': !newChildNode.isNil}" tabindex="0">
      <explorer-node :node="rootNode" :depth="0"></explorer-node>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import ExplorerNode from './ExplorerNode';
import emptyFile from '../data/emptyFile';
import emptyFolder from '../data/emptyFolder';

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
    ...mapMutations('explorer', [
      'setSelectedId',
    ]),
    ...mapMutations('layout', [
      'toggleExplorer',
    ]),
    newItem(isFolder) {
      const parentId = this.$store.getters['explorer/selectedNodeFolder'].item.id;
      this.$store.dispatch('explorer/openNode', parentId);
      this.$store.commit('explorer/setNewItem', {
        ...isFolder ? emptyFolder() : emptyFile(),
        parentId,
      });
    },
    editItem() {
      const selectNode = this.$store.getters['explorer/selectedNode'];
      this.$store.commit('explorer/setEditingId', selectNode.item.id);
    },
    deleteItem() {
      // const selectNode = this.$store.getters['explorer/selectedNode'];
      // switch (this.node.item.type) {
      //   case 'file':
      //   default:
      //     this.$store.commit('files/setCurrentId', id);
      //     break;
      //   case 'folder':
      //     this.$store.commit('explorer/toggleOpenNode', id);
      //     break;
      // }
    },
  },
  created() {
    this.$store.watch(
      () => this.$store.getters['files/current'].id,
      (currentFileId) => {
        this.setSelectedId(currentFileId);
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

.side-title {
  height: 44px;
  line-height: 44px;
  padding: 4px 8px 0;
  background-color: rgba(0, 0, 0, 0.1);
}

.side-title__button {
  width: 36px;
  padding: 6px;
  display: inline-block;
  background-color: transparent;
  opacity: 0.75;

  /* prevent from seeing wrapped buttons */
  margin-bottom: 20px;

  &:active,
  &:focus,
  &:hover {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.1);
  }
}

.side-title__button--right {
  float: right;
}
</style>
