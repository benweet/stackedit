<template>
  <div class="explorer-node" :class="{'explorer-node--selected': selected, 'explorer-node--open': open}">
    <div v-if="editing" class="explorer-node__item-editor" :class="['explorer-node__item-editor--' + node.item.type]" :style="{'padding-left': leftPadding}">
      <input type="text" class="text-input" v-focus @blur="submitEdit()" @keyup.enter="submitEdit()" @keyup.esc="submitEdit(true)" v-model="editingNodeName">
    </div>
    <div v-else-if="!node.isRoot" class="explorer-node__item" :class="['explorer-node__item--' + node.item.type]" :style="{'padding-left': leftPadding}" @click="select(node.item.id)">
      {{node.item.name}}
    </div>
    <div v-if="node.isFolder && open">
      <explorer-node v-for="node in node.folders" :key="node.item.id" :node="node" :depth="depth + 1"></explorer-node>
      <div v-if="newChild" class="explorer-node__new-child" :class="['explorer-node__new-child--' + newChild.item.type]" :style="{'padding-left': childLeftPadding}">
        <input type="text" class="text-input" v-focus @blur="submitNewChild()" @keyup.enter="submitNewChild()" @keyup.esc="submitNewChild(true)" v-model.trim="newChildName">
      </div>
      <explorer-node v-for="node in node.files" :key="node.item.id" :node="node" :depth="depth + 1"></explorer-node>
    </div>
  </div>
</template>

<script>
import utils from '../services/utils';
import defaultContent from '../data/defaultContent.md';

export default {
  name: 'explorer-node',
  props: ['node', 'depth'],
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      },
    },
  },
  data: () => ({
    editingValue: '',
  }),
  computed: {
    leftPadding() {
      return `${this.depth * 15}px`;
    },
    childLeftPadding() {
      return `${(this.depth + 1) * 15}px`;
    },
    selected() {
      return this.$store.getters['explorer/selectedNode'] === this.node;
    },
    editing() {
      return this.$store.getters['explorer/editingNode'] === this.node;
    },
    open() {
      return this.$store.state.explorer.openNodes[this.node.item.id] || this.node.isRoot;
    },
    newChild() {
      return this.$store.getters['explorer/newChildNodeParent'] === this.node
        && this.$store.state.explorer.newChildNode;
    },
    newChildName: {
      get() {
        return this.$store.state.explorer.newChildNode.item.name;
      },
      set(value) {
        this.$store.commit('explorer/setNewItemName', value && value.slice(0, 250));
      },
    },
    editingNodeName: {
      get() {
        return this.$store.getters['explorer/editingNode'].item.name;
      },
      set(value) {
        this.editingValue = value.trim();
      },
    },
  },
  methods: {
    select(id) {
      this.$store.commit('explorer/setSelectedId', id);
      if (this.node.isFolder) {
        this.$store.commit('explorer/toggleOpenNode', id);
      } else {
        this.$store.commit('files/setCurrentId', id);
      }
    },
    submitNewChild(cancel) {
      const newChildNode = this.$store.state.explorer.newChildNode;
      if (!cancel && newChildNode.item.name) {
        const id = utils.uid();
        if (newChildNode.isFolder) {
          this.$store.commit('folders/setItem', {
            ...newChildNode.item,
            id,
          });
        } else {
          const contentId = utils.uid();
          this.$store.commit('contents/setItem', {
            id: contentId,
            text: defaultContent,
          });
          this.$store.commit('files/setItem', {
            ...newChildNode.item,
            id,
            contentId,
          });
        }
        this.select(id);
      }
      this.$store.commit('explorer/setNewItem', null);
    },
    submitEdit(cancel) {
      const id = this.$store.getters['explorer/editingNode'].item.id;
      const value = this.editingValue;
      if (!cancel && id && value) {
        this.$store.commit('files/patchItem', {
          id,
          name: value.slice(0, 250),
        });
      }
      this.$store.commit('explorer/setEditingId', null);
    },
  },
};
</script>

<style lang="scss">
$item-font-size: 14px;

.explorer-node__item {
  cursor: pointer;
  font-size: $item-font-size;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  .explorer-node--selected > & {
    background-color: rgba(0, 0, 0, 0.2);

    .explorer__tree:focus & {
      background-color: #39f;
      color: #fff;
    }
  }

  .explorer__tree--new-item & {
    opacity: 0.33;
  }
}

.explorer-node__item--folder,
.explorer-node__item-editor--folder,
.explorer-node__new-child--folder {
  &::before {
    content: '▸';
    position: absolute;
    margin-left: -13px;

    .explorer-node--open > & {
      content: '▾';
    }
  }
}

$new-child-height: 25px;

.explorer-node__item-editor,
.explorer-node__new-child {
  padding: 1px 10px;

  .text-input {
    font-size: $item-font-size;
    padding: 2px;
    height: $new-child-height;
  }
}
</style>
