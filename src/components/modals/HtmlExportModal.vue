<template>
  <div class="modal__inner-1" role="dialog" aria-label="Export to HTML">
    <div class="modal__inner-2">
      <form-entry label="Template">
        <select slot="field" class="textfield" v-model="selectedTemplate" @keyup.enter="resolve()">
          <option v-for="(template, id) in allTemplates" :key="id" :value="id">
            {{ template.name }}
          </option>
        </select>
        <div class="form-entry__actions">
          <a href="javascript:void(0)" @click="configureTemplates">Configure templates</a>
        </div>
      </form-entry>
      <div class="modal__button-bar">
        <button class="button button--copy">Copy to clipboard</button>
        <button class="button" @click="config.reject()">Cancel</button>
        <button class="button" @click="resolve()">Ok</button>
      </div>
    </div>
  </div>
</template>

<script>
import Clipboard from 'clipboard';
import exportSvc from '../../services/exportSvc';
import modalTemplate from './modalTemplate';

export default modalTemplate({
  data: () => ({
    result: '',
  }),
  computedLocalSettings: {
    selectedTemplate: 'htmlExportTemplate',
  },
  mounted() {
    this.$watch('selectedTemplate', (selectedTemplate) => {
      const currentFile = this.$store.getters['file/current'];
      exportSvc.applyTemplate(currentFile.id, this.allTemplates[selectedTemplate])
        .then((html) => {
          this.result = html;
        });
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
      const currentFile = this.$store.getters['file/current'];
      exportSvc.exportToDisk(currentFile.id, 'html', this.allTemplates[this.selectedTemplate]);
      this.config.resolve();
    },
  },
});
</script>
