<template>
  <div class="side-bar__panel side-bar__panel--menu">
    <menu-entry @click.native="exportMarkdown">
      <icon-download slot="icon"></icon-download>
      <div>Export as Markdown</div>
      <span>Save plain text file.</span>
    </menu-entry>
    <menu-entry @click.native="exportHtml">
      <icon-download slot="icon"></icon-download>
      <div>Export as HTML</div>
      <span>Generate an HTML page from a template.</span>
    </menu-entry>
    <menu-entry @click.native="exportPdf">
      <icon-download slot="icon"></icon-download>
      <div><div class="menu-entry__label">sponsor</div> Export as PDF</div>
      <span>Produce a PDF from an HTML template.</span>
    </menu-entry>
    <menu-entry @click.native="exportPandoc">
      <icon-download slot="icon"></icon-download>
      <div><div class="menu-entry__label">sponsor</div> Export with Pandoc</div>
      <span>Convert to PDF, Word, EPUB...</span>
    </menu-entry>
  </div>
</template>

<script>
import MenuEntry from './common/MenuEntry';
import exportSvc from '../../services/exportSvc';

export default {
  components: {
    MenuEntry,
  },
  methods: {
    exportMarkdown() {
      const currentFile = this.$store.getters['file/current'];
      return exportSvc.exportToDisk(currentFile.id, 'md')
        .catch(() => {}); // Cancel
    },
    exportHtml() {
      return this.$store.dispatch('modal/open', 'htmlExport')
        .catch(() => {}); // Cancel
    },
    exportPdf() {
      return this.$store.dispatch('modal/open', 'pdfExport')
        .catch(() => {}); // Cancel
    },
    exportPandoc() {
      return this.$store.dispatch('modal/open', 'pandocExport')
        .catch(() => {}); // Cancel
    },
  },
};
</script>
