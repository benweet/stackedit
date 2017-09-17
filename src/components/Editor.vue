<template>
  <div class="editor">
    <pre class="editor__inner markdown-highlighting" :style="{padding: styles.editorPadding}" :class="{monospaced: computedSettings.editor.monospacedFontOnly}"></pre>
  </div>
</template>


<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('layout', [
      'styles',
    ]),
    ...mapGetters('data', [
      'computedSettings',
    ]),
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
