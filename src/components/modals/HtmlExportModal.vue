<template>
  <modal-inner aria-label="Export to HTML">
    <div class="modal__content">
      <p>Please choose a template for your <b>HTML export</b>.</p>
      <form-entry label="Template">
        <select class="textfield" slot="field" v-model="selectedTemplate" @keydown.enter="resolve()">
          <option v-for="(template, id) in allTemplates" :key="id" :value="id">
            {{ template.name }}
          </option>
        </select>
        <div class="form-entry__actions">
          <a href="javascript:void(0)" @click="configureTemplates">Configure templates</a>
        </div>
      </form-entry>
    </div>
    <div class="modal__button-bar">
      <button class="button button--copy">Copy to clipboard</button>
      <button class="button" @click="config.reject()">Cancel</button>
      <button class="button" @click="resolve()">Ok</button>
    </div>
  </modal-inner>
</template>

<script>
import Clipboard from 'clipboard';
import exportSvc from '../../services/exportSvc';
import modalTemplate from './common/modalTemplate';

export default modalTemplate({
  data: () => ({
    result: '',
  }),
  computedLocalSettings: {
    selectedTemplate: 'htmlExportTemplate',
  },
  mounted() {
    let timeoutId;
    this.$watch('selectedTemplate', (selectedTemplate) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const currentFile = this.$store.getters['file/current'];
        exportSvc.applyTemplate(currentFile.id, this.allTemplates[selectedTemplate])
          .then((html) => {
            this.result = html;
          });
      }, 10);
    }, {
      immediate: true,
    });
    this.clipboard = new Clipboard(this.$el.querySelector('.button--copy'), {
      text: () => this.result,
    });
  },
  destroyed() {
    this.clipboard.destroy();
  },
  methods: {
    resolve() {
      const config = this.config;
      const currentFile = this.$store.getters['file/current'];
      config.resolve();
      exportSvc.exportToDisk(currentFile.id, 'html', this.allTemplates[this.selectedTemplate]);
    },
  },
});
</script>
