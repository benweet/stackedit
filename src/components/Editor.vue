<template>
  <div class="editor">
    <pre class="editor__inner markdown-highlighting" :style="{padding: styles.editorPadding}" :class="{monospaced: computedSettings.editor.monospacedFontOnly}"></pre>
    <editor-new-discussion-button-gutter></editor-new-discussion-button-gutter>
  </div>
</template>


<script>
import { mapGetters } from 'vuex';
import EditorNewDiscussionButtonGutter from './gutters/EditorNewDiscussionButtonGutter';

export default {
  components: {
    EditorNewDiscussionButtonGutter,
  },
  computed: {
    ...mapGetters('layout', [
      'styles',
    ]),
    ...mapGetters('data', [
      'computedSettings',
    ]),
  },
  mounted() {
    const editorElt = this.$el.querySelector('.editor__inner');
    const onDiscussionEvt = cb => (evt) => {
      let elt = evt.target;
      while (elt && elt !== editorElt) {
        if (elt.discussionId) {
          cb(elt.discussionId);
          return;
        }
        elt = elt.parentNode;
      }
    };

    editorElt.addEventListener('mouseover', onDiscussionEvt(discussionId =>
      editorElt.getElementsByClassName(`discussion-editor-highlighting-${discussionId}`)
        .cl_each(elt => elt.classList.add('discussion-editor-highlighting--hover')),
      ));
    editorElt.addEventListener('mouseout', onDiscussionEvt(discussionId =>
      editorElt.getElementsByClassName(`discussion-editor-highlighting-${discussionId}`)
        .cl_each(elt => elt.classList.remove('discussion-editor-highlighting--hover')),
      ));
    editorElt.addEventListener('click', onDiscussionEvt((discussionId) => {
      this.$store.commit('discussion/setCurrentDiscussionId', discussionId);
    }));
    this.$watch(
      () => this.$store.state.discussion.currentDiscussionId,
      (discussionId, oldDiscussionId) => {
        if (oldDiscussionId) {
          editorElt.querySelectorAll(`.discussion-editor-highlighting-${oldDiscussionId}`)
            .cl_each(elt => elt.classList.remove('discussion-editor-highlighting--selected'));
        }
        if (discussionId) {
          editorElt.querySelectorAll(`.discussion-editor-highlighting-${discussionId}`)
            .cl_each(elt => elt.classList.add('discussion-editor-highlighting--selected'));
        }
      });
  },
};
</script>

<style lang="scss">
@import 'common/variables.scss';

.editor {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.editor__inner {
  margin: 0;
  font-family: $font-family-main;
  font-variant-ligatures: no-common-ligatures;
  white-space: pre-wrap;
  word-break: break-word;
  word-wrap: break-word;
  caret-color: #000;

  * {
    line-height: $line-height-base;
  }

  .cledit-section {
    font-family: inherit;
  }

  .hide {
    display: none;
  }

  &.monospaced {
    font-family: $font-family-monospace !important;
    font-size: $font-size-monospace !important;

    * {
      font-size: inherit !important;
    }
  }
}
</style>
