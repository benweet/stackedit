<template>
  <div class="side-bar__panel side-bar__panel--menu">
    <menu-entry @click.native="exportMarkdown">
      <icon-download slot="icon"></icon-download>
      Export as Markdown
    </menu-entry>
    <menu-entry @click.native="exportHtml">
      <icon-download slot="icon"></icon-download>
      Export as HTML
    </menu-entry>
    <menu-entry @click.native="exportPdf">
      <icon-download slot="icon"></icon-download>
      Export as PDF
    </menu-entry>
  </div>
</template>

<script>
import MenuEntry from './MenuEntry';
import exportSvc from '../../services/exportSvc';

export default {
  components: {
    MenuEntry,
  },
  methods: {
    exportMarkdown() {
      const currentFile = this.$store.getters['file/current'];
      return exportSvc.exportToDisk(currentFile.id, 'md');
    },
    exportHtml() {
      return this.$store.dispatch('modal/open', 'htmlExport');
    },
    exportPdf() {
      return this.$store.dispatch('modal/notImplemented');
    },
  },
};
</script>
