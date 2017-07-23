<template>
  <div class="editor">
    <pre class="editor__inner markdown-highlighting" :style="{ 'padding-left': editorPadding + 'px', 'padding-right': editorPadding + 'px' }"></pre>
  </div>
</template>


<script>
import { mapState } from 'vuex';

export default {
  computed: mapState('layout', [
    'editorPadding',
  ]),
};
</script>

<style lang="scss">
@import 'common/variables.scss';

.editor {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: #fff;
}

.editor__inner {
  font-family: $font-family-editor;
  font-variant-ligatures: no-common-ligatures;
  margin: 0;
  padding: 10px 20px 360px 110px;
  white-space: pre-wrap;
  word-break: break-word;
  word-wrap: break-word;

  * {
    line-height: 1.65;
  }

  .cledit-section {
    font-family: inherit;
  }

  .discussion-highlight,
  .find-replace-highlight {
    background-color: transparentize(#ffe400, 0.5);
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
