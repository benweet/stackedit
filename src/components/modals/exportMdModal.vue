
<template>
  <modal-inner aria-label="Export to Markdown">
    <p>请选择导出<b>文档类型</b>.</p>
    <div class="modal__content">
      <div>
        <button class="button" @click="exportMarkdown">Markdown格式</button>
      </div>
      <form-entry >
        <select class="textfield" slot="field" v-model="selectedTemplate" @keyup.enter="resolve()">
          <option v-for="(template, id) in allTemplates" :key="id" :value="id">
            {{ template.name }}
          </option>
        </select>
      </form-entry>
    </div>
    <div class="modal__button-bar">
      <button class="button" @click="config.reject()">取消</button>
      <button class="button" @click="resolve()">确定</button>
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
    exportMarkdown() {
      const currentFile = this.$store.getters['file/current'];
      return exportSvc.exportToDisk(currentFile.id, 'md')
        .catch(() => {}); // Cancel
    },
    resolve() {
      const config = this.config;
      const currentFile = this.$store.getters['file/current'];
      config.resolve();
      exportSvc.exportToDisk(currentFile.id, 'html', this.allTemplates[this.selectedTemplate]);
    },
  },
});
</script>
