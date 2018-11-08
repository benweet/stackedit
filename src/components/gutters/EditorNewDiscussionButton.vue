<template>
  <a class="new-discussion-button" href="javascript:void(0)" v-if="coordinates" :style="{top: coordinates.top + 'px'}" v-title="'Start a discussion'" @mousedown.stop.prevent @click="createNewDiscussion(selection)">
    <icon-message></icon-message>
  </a>
</template>

<script>
import { mapActions } from 'vuex';
import editorSvc from '../../services/editorSvc';
import store from '../../store';

export default {
  data: () => ({
    selection: null,
    coordinates: null,
  }),
  methods: {
    ...mapActions('discussion', [
      'createNewDiscussion',
    ]),
    checkSelection() {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        let offset;
        // Show the button if content is not a revision and has the focus
        if (
          !store.state.content.revisionContent &&
          editorSvc.clEditor.selectionMgr.hasFocus()
        ) {
          this.selection = editorSvc.getTrimmedSelection();
          if (this.selection) {
            const text = editorSvc.clEditor.getContent();
            offset = this.selection.end;
            while (offset && text[offset - 1] === '\n') {
              offset -= 1;
            }
          }
        }
        this.coordinates = offset
          ? editorSvc.clEditor.selectionMgr.getCoordinates(offset)
          : null;
      }, 25);
    },
  },
  mounted() {
    this.$nextTick(() => {
      editorSvc.clEditor.selectionMgr.on('selectionChanged', () => this.checkSelection());
      editorSvc.clEditor.selectionMgr.on('cursorCoordinatesChanged', () => this.checkSelection());
      editorSvc.clEditor.on('focus', () => this.checkSelection());
      editorSvc.clEditor.on('blur', () => this.checkSelection());
      this.checkSelection();
    });
  },
};
</script>
