<template>
  <pre class="code-editor textfield prism" :disabled="disabled"></pre>
</template>

<script>
import Prism from 'prismjs';
import cledit from '../services/editor/cledit';

export default {
  props: ['value', 'lang', 'disabled'],
  mounted() {
    const preElt = this.$el;
    let scrollElt = preElt;
    while (scrollElt && !scrollElt.classList.contains('modal')) {
      scrollElt = scrollElt.parentNode;
    }
    if (scrollElt) {
      const clEditor = cledit(preElt, scrollElt);
      clEditor.on('contentChanged', value => this.$emit('changed', value));
      clEditor.init({
        content: this.value,
        sectionHighlighter: section => Prism.highlight(section.text, Prism.languages[this.lang]),
      });
      clEditor.toggleEditable(!this.disabled);
    }
  },
};
</script>

<style lang="scss">
@import '../styles/variables.scss';

.code-editor {
  margin: 0;
  font-family: $font-family-monospace;
  font-size: $font-size-monospace;
  font-variant-ligatures: no-common-ligatures;
  word-break: break-word;
  word-wrap: normal;
  height: auto;
  caret-color: #000;
  min-height: 160px;
  overflow: auto;
  padding: 0.2em 0.4em;

  * {
    line-height: $line-height-base;
    font-size: inherit !important;
  }
}
</style>
