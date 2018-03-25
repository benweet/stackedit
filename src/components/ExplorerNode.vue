<template>
  <div class="explorer-node" :class="{'explorer-node--selected': isSelected, 'explorer-node--open': isOpen, 'explorer-node--drag-target': isDragTargetFolder}" @dragover.prevent @dragenter.stop="node.noDrop || setDragTarget(node.item.id)" @dragleave.stop="isDragTarget && setDragTargetId()" @drop.prevent.stop="onDrop" @contextmenu="onContextMenu">
    <div class="explorer-node__item-editor" v-if="isEditing" :class="['explorer-node__item-editor--' + node.item.type]" :style="{paddingLeft: leftPadding}" draggable="true" @dragstart.stop.prevent>
      <input type="text" class="text-input" v-focus @blur="submitEdit()" @keydown.stop @keydown.enter="submitEdit()" @keydown.esc="submitEdit(true)" v-model="editingNodeName">
    </div>
    <div class="explorer-node__item" v-else :class="['explorer-node__item--' + node.item.type]" :style="{paddingLeft: leftPadding}" @click="select()" draggable="true" @dragstart.stop="setDragSourceId" @dragend.stop="setDragTargetId()">
      {{node.item.name}}
      <icon-provider class="explorer-node__location" v-for="location in node.locations" :key="location.id" :provider-id="location.providerId"></icon-provider>
    </div>
    <div class="explorer-node__children" v-if="node.isFolder && isOpen">
      <explorer-node v-for="node in node.folders" :key="node.item.id" :node="node" :depth="depth + 1"></explorer-node>
      <div v-if="newChild" class="explorer-node__new-child" :class="['explorer-node__new-child--' + newChild.item.type]" :style="{paddingLeft: childLeftPadding}">
        <input type="text" class="text-input" v-focus @blur="submitNewChild()" @keydown.stop @keydown.enter="submitNewChild()" @keydown.esc="submitNewChild(true)" v-model.trim="newChildName">
      </div>
      <explorer-node v-for="node in node.files" :key="node.item.id" :node="node" :depth="depth + 1"></explorer-node>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';
import utils from '../services/utils';

export default {
  name: 'explorer-node', // Required for recursivity
  props: ['node', 'depth'],
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
        this.$store.commit('explorer/setNewItemName', value);
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
      'setEditingId',
    ]),
    ...mapActions('explorer', [
      'setDragTarget',
      'newItem',
      'deleteItem',
    ]),
    select(id = this.node.item.id, doOpen = true) {
      const node = this.$store.getters['explorer/nodeMap'][id];
      if (!node) {
        return false;
      }
      this.$store.commit('explorer/setSelectedId', id);
      if (doOpen) {
        // Prevent from freezing the UI while loading the file
        setTimeout(() => {
          if (node.isFolder) {
            this.$store.commit('explorer/toggleOpenNode', id);
          } else {
            this.$store.commit('file/setCurrentId', id);
          }
        }, 10);
      }
      return true;
    },
    submitNewChild(cancel) {
      const newChildNode = this.$store.state.explorer.newChildNode;
      if (!cancel && !newChildNode.isNil && newChildNode.item.name) {
        if (newChildNode.isFolder) {
          const id = utils.uid();
          this.$store.commit('folder/setItem', {
            ...newChildNode.item,
            id,
            name: utils.sanitizeName(newChildNode.item.name),
          });
          this.select(id);
        } else {
          this.$store.dispatch('createFile', newChildNode.item)
            .then(file => this.select(file.id));
        }
      }
      this.$store.commit('explorer/setNewItem', null);
    },
    submitEdit(cancel) {
      const editingNode = this.$store.getters['explorer/editingNode'];
      const id = editingNode.item.id;
      const value = this.editingValue;
      if (!cancel && id && value) {
        this.$store.commit(editingNode.isFolder ? 'folder/patchItem' : 'file/patchItem', {
          id,
          name: utils.sanitizeName(value),
        });
      }
      this.setEditingId(null);
    },
    setDragSourceId(evt) {
      if (this.node.noDrag) {
        evt.preventDefault();
        return;
      }
      this.$store.commit('explorer/setDragSourceId', this.node.item.id);
      // Fix for Firefox
      // See https://stackoverflow.com/a/3977637/1333165
      evt.dataTransfer.setData('Text', '');
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
          this.$store.commit('folder/patchItem', patch);
        } else {
          this.$store.commit('file/patchItem', patch);
        }
      }
    },
    onContextMenu(evt) {
      if (this.select(undefined, false)) {
        evt.preventDefault();
        evt.stopPropagation();
        this.$store.dispatch('contextMenu/open', {
          coordinates: {
            left: evt.clientX,
            top: evt.clientY,
          },
          items: [{
            name: 'New file',
            disabled: !this.node.isFolder || this.node.isTrash,
            perform: () => this.newItem(false),
          }, {
            name: 'New folder',
            disabled: !this.node.isFolder || this.node.isTrash || this.node.isTemp,
            perform: () => this.newItem(true),
          }, {
            type: 'separator',
          }, {
            name: 'Rename',
            disabled: this.node.isTrash || this.node.isTemp,
            perform: () => this.setEditingId(this.node.item.id),
          }, {
            name: 'Delete',
            perform: () => this.deleteItem(),
          }],
        })
          .then(item => item.perform());
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
  position: relative;
  cursor: pointer;
  font-size: $item-font-size;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-right: 5px;

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

  .explorer-node__location {
    float: right;
    width: 18px;
    height: 18px;
    margin: 2px 1px;
  }
}

.explorer-node__item--folder,
.explorer-node__item-editor--folder,
.explorer-node__new-child--folder {
  &::before {
    content: '▹';
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
