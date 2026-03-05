<template>
  <modal-inner aria-label="Export with Pandoc">
    <div class="modal__content">
      <p>Please choose a format for your <b>Pandoc export</b>.</p>
      <form-entry label="Template">
        <select class="textfield" slot="field" v-model="selectedFormat" @keydown.enter="resolve()">
          <option value="asciidoc">AsciiDoc</option>
          <option value="context">ConTeXt</option>
          <option value="epub">EPUB</option>
          <option value="epub3">EPUB v3</option>
          <option value="latex">LaTeX</option>
          <option value="odt">OpenOffice</option>
          <option value="pdf">PDF</option>
          <option value="rst">reStructuredText</option>
          <option value="rtf">Rich Text Format</option>
          <option value="textile">Textile</option>
          <option value="docx">Word</option>
        </select>
      </form-entry>
    </div>
    <div class="modal__button-bar">
      <button class="button" @click="config.reject()">Cancel</button>
      <button class="button button--resolve" @click="resolve()">Ok</button>
    </div>
  </modal-inner>
</template>

<script>
import modalTemplate from './common/modalTemplate';
import store from '../../store';

export default modalTemplate({
  computedLocalSettings: {
    selectedFormat: 'pandocExportFormat',
  },
  methods: {
    async resolve() {
      this.config.resolve();
      store.dispatch('notification/error', 'Pandoc export is not available.');
    },
  },
});
</script>
