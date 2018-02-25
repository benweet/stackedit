<template>
  <div class="side-bar__panel side-bar__panel--menu">
    <input class="hidden-file" id="import-markdown-file-input" type="file" @change="onImportMarkdown">
    <label class="menu-entry button flex flex--row flex--align-center" for="import-markdown-file-input">
      <div class="menu-entry__icon flex flex--column flex--center">
        <icon-upload></icon-upload>
      </div>
      <div class="flex flex--column">
        <div>Import Markdown</div>
        <span>Open a plain text file.</span>
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
import providerUtils from '../../services/providers/providerUtils';
import store from '../../store';

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
    onImportMarkdown(evt) {
      const file = evt.target.files[0];
      readFile(file)
        .then(content => this.$store.dispatch('createFile', {
          ...providerUtils.parseContent(content),
          name: file.name,
        })
          .then(item => this.$store.commit('file/setCurrentId', item.id)));
    },
    onImportHtml(evt) {
      const file = evt.target.files[0];
      readFile(file)
        .then(content => this.$store.dispatch('createFile', {
          ...providerUtils.parseContent(
            turndownService.turndown(
              htmlSanitizer.sanitizeHtml(content)
                .replace(/&#160;/g, ' '), // Replace non-breaking spaces with classic spaces
              )),
          name: file.name,
        }))
        .then(item => this.$store.commit('file/setCurrentId', item.id));
    },
  },
};
</script>
