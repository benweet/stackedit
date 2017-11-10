<template>
  <div class="gutter gutter--new-discussion-button" :style="{left: styles.previewGutterLeft + 'px'}">
    <a class="new-discussion-button" href="javascript:void(0)" v-if="coordinates" :style="{top: coordinates.top + 'px'}" v-title="'Start a discussion'" @mousedown.stop.prevent @click="createNewDiscussion(selection)">
      <icon-message></icon-message>
    </a>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import cledit from '../../libs/cledit';
import editorSvc from '../../services/editorSvc';

export default {
  data: () => ({
    coordinates: null,
  }),
  computed: {
    ...mapGetters('layout', [
      'styles',
    ]),
  },
  methods: {
    ...mapActions('discussion', [
      'createNewDiscussion',
    ]),
    checkSelection() {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        let offset;
        if (editorSvc.previewSelectionRange) {
          this.selection = editorSvc.getTrimmedSelection();
          if (this.selection) {
            const text = editorSvc.previewTextWithDiffsList;
            offset = editorSvc.getPreviewOffset(this.selection.end);
            while (offset && text[offset - 1] === '\n') {
              offset -= 1;
            }
          }
        }
        if (!offset) {
          this.coordinates = null;
        } else {
          const start = cledit.Utils.findContainer(editorSvc.previewElt, offset - 1);
          const end = cledit.Utils.findContainer(editorSvc.previewElt, offset);
          const range = document.createRange();
          range.setStart(start.container, start.offsetInContainer);
          range.setEnd(end.container, end.offsetInContainer);
          const rect = range.getBoundingClientRect();
          const contentRect = editorSvc.previewElt.getBoundingClientRect();
          this.coordinates = {
            top: Math.round((rect.top - contentRect.top) + editorSvc.previewElt.scrollTop),
            height: Math.round(rect.height),
            left: Math.round((rect.right - contentRect.left) + editorSvc.previewElt.scrollLeft),
          };
        }
      }, 25);
    },
  },
  mounted() {
    this.$nextTick(() => {
      editorSvc.$on('previewSelectionRange', () => this.checkSelection());
      this.$watch(
        () => this.$store.getters['layout/styles'].previewWidth,
        () => this.checkSelection());
      this.checkSelection();
    });
  },
};
</script>

