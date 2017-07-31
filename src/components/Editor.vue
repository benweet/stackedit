<template>
  <div class="editor">
    <pre class="editor__inner markdown-highlighting" :style="{'padding-left': styles.editorPadding + 'px', 'padding-right': styles.editorPadding + 'px'}"></pre>
  </div>
</template>


<script>
import { mapGetters } from 'vuex';

export default {
  computed: mapGetters('layout', [
    'styles',
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
}

.editor__inner {
  font-family: $font-family-main;
  font-variant-ligatures: no-common-ligatures;
  margin: 0;
  padding: 10px 20px 360px 110px;
  white-space: pre-wrap;
  word-break: break-word;
  word-wrap: break-word;

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
