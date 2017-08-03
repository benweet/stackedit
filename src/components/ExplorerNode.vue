<template>
  <div class="explorer-node" :class="{'explorer-node--selected': isSelected, 'explorer-node--open': isOpen, 'explorer-node--drag-target': isDragTargetFolder}" @dragover.prevent @dragenter.stop="setDragTarget(node.item.id)" @dragleave.stop="isDragTarget && setDragTargetId()" @drop.stop="onDrop">
    <div v-if="isEditing" class="explorer-node__item-editor" :class="['explorer-node__item-editor--' + node.item.type]" :style="{'padding-left': leftPadding}">
      <input type="text" class="text-input" v-focus @blur="submitEdit()" @keyup.enter="submitEdit()" @keyup.esc="submitEdit(true)" v-model="editingNodeName">
    </div>
    <div v-else class="explorer-node__item" :class="['explorer-node__item--' + node.item.type]" :style="{'padding-left': leftPadding}" @click="select(node.item.id)" draggable="true" @dragstart.stop="setDragSourceId" @dragend.stop="setDragTargetId()">
      {{node.item.name}}
    </div>
    <div class="explorer-node__children" v-if="node.isFolder && isOpen">
      <explorer-node v-for="node in node.folders" :key="node.item.id" :node="node" :depth="depth + 1"></explorer-node>
      <div v-if="newChild" class="explorer-node__new-child" :class="['explorer-node__new-child--' + newChild.item.type]" :style="{'padding-left': childLeftPadding}">
        <input type="text" class="text-input" v-focus @blur="submitNewChild()" @keyup.enter="submitNewChild()" @keyup.esc="submitNewChild(true)" v-model.trim="newChildName">
      </div>
      <explorer-node v-for="node in node.files" :key="node.item.id" :node="node" :depth="depth + 1"></explorer-node>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';
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
    isSelected() {
      return this.$store.getters['explorer/selectedNode'] === this.node;
    },
    isEditing() {
      return this.$store.getters['explorer/editingNode'] === this.node;
    },
    isDragTarget() {
      return this.$store.getters['explorer/dragTargetNode'] === this.node;
    },
    isDragTargetFolder() {
      return this.$store.getters['explorer/dragTargetNodeFolder'] === this.node;
    },
    isOpen() {
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
    ...mapMutations('explorer', [
      'setDragTargetId',
    ]),
    ...mapActions('explorer', [
      'setDragTarget',
    ]),
    select(id) {
      const node = this.$store.getters['explorer/nodeMap'][id];
      if (node) {
        this.$store.commit('explorer/setSelectedId', id);
        if (node.isFolder) {
          this.$store.commit('explorer/toggleOpenNode', id);
        } else {
          this.$store.commit('files/setCurrentId', id);
        }
      }
    },
    submitNewChild(cancel) {
      const newChildNode = this.$store.state.explorer.newChildNode;
      if (!cancel && !newChildNode.isNil && newChildNode.item.name) {
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
    setDragSourceId(evt) {
      const id = this.node.item.id;
      if (id === 'fake') {
        evt.preventDefault();
        return;
      }
      this.$store.commit('explorer/setDragSourceId', id);
    },
    onDrop() {
      const sourceNode = this.$store.getters['explorer/dragSourceNode'];
      const targetNode = this.$store.getters['explorer/dragTargetNodeFolder'];
      this.setDragTargetId();
      if (!sourceNode.isNil
        && !targetNode.isNil
        && sourceNode.item.id !== targetNode.item.id
      ) {
        const patch = {
          id: sourceNode.item.id,
          parentId: targetNode.item.id,
        };
        if (sourceNode.isFolder) {
          this.$store.commit('folders/patchItem', patch);
        } else {
          this.$store.commit('files/patchItem', patch);
        }
      }
    },
  },
};
</script>

<style lang="scss">
$item-font-size: 14px;

.explorer-node--drag-target {
  background-color: rgba(0, 128, 255, 0.2);
}

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
