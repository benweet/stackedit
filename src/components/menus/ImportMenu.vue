<template>
  <div class="side-bar__panel side-bar__panel--menu">
    <input class="hidden-file" id="import-markdown-file-input" type="file" @change="onImportMarkdown">
    <label class="menu-entry button flex flex--row flex--align-center" for="import-markdown-file-input">
      <div class="menu-entry__icon flex flex--column flex--center">
        <icon-upload></icon-upload>
      </div>
      <div class="flex flex--column">
        <div>Import Markdown</div>
        <span>Import a plain text file.</span>
      </div>
    </label>
    <input class="hidden-file" id="import-html-file-input" type="file" @change="onImportHtml">
    <label class="menu-entry button flex flex--row flex--align-center" for="import-html-file-input">
      <div class="menu-entry__icon flex flex--column flex--center">
        <icon-upload></icon-upload>
      </div>
      <div class="flex flex--column">
        <div>Import HTML</div>
        <span>Convert an HTML file to Markdown.</span>
      </div>
    </label>
  </div>
</template>

<script>
import TurndownService from 'turndown/lib/turndown.browser.umd';
import htmlSanitizer from '../../libs/htmlSanitizer';
import MenuEntry from './common/MenuEntry';
import Provider from '../../services/providers/common/Provider';
import store from '../../store';
import workspaceSvc from '../../services/workspaceSvc';

const turndownService = new TurndownService(store.getters['data/computedSettings'].turndown);

const readFile = file => new Promise((resolve) => {
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      if (content.match(/\uFFFD/)) {
        this.$store.dispatch('notification/error', 'File is not readable.');
      } else {
        resolve(content);
      }
    };
    reader.readAsText(file);
  }
});

export default {
  components: {
    MenuEntry,
  },
  methods: {
    async onImportMarkdown(evt) {
      const file = evt.target.files[0];
      const content = await readFile(file);
      const item = await workspaceSvc.createFile({
        ...Provider.parseContent(content),
        name: file.name,
      });
      this.$store.commit('file/setCurrentId', item.id);
    },
    async onImportHtml(evt) {
      const file = evt.target.files[0];
      const content = await readFile(file);
      const sanitizedContent = htmlSanitizer.sanitizeHtml(content)
        .replace(/&#160;/g, ' '); // Replace non-breaking spaces with classic spaces
      const item = await workspaceSvc.createFile({
        ...Provider.parseContent(turndownService.turndown(sanitizedContent)),
        name: file.name,
      });
      this.$store.commit('file/setCurrentId', item.id);
    },
  },
};
</script>
