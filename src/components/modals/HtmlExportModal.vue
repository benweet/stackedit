<template>
  <div class="modal__inner-1 modal__inner-1--html-export">
    <div class="modal__inner-2">
      <div class="form-entry">
        <label class="form-entry__label" for="template">Template</label>
        <div class="form-entry__field">
          <select class="textfield" id="template" v-model="selectedTemplate" @keyup.enter="resolve()">
            <option v-for="(template, id) in allTemplates" :key="id" v-bind:value="id">
              {{ template.name }}
            </option>
          </select>
        </div>
        <div class="form-entry__actions">
          <a href="javascript:void(0)" @click="configureTemplates">Configure templates</a>
        </div>
      </div>
      <div class="modal__button-bar">
        <button class="button button--copy">Copy to clipboard</button>
        <button class="button" @click="config.reject()">Cancel</button>
        <button class="button" @click="resolve()">Ok</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Clipboard from 'clipboard';
import exportSvc from '../../services/exportSvc';

export default {
  data: () => ({
    result: '',
  }),
  computed: {
    ...mapGetters('modal', [
      'config',
    ]),
    ...mapGetters('data', [
      'allTemplates',
    ]),
    selectedTemplate: {
      get() {
        return this.$store.getters['data/localSettings'].htmlExportTemplate;
      },
      set(value) {
        this.$store.dispatch('data/patchLocalSettings', {
          htmlExportTemplate: value,
        });
      },
    },
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
    configureTemplates() {
      this.$store.dispatch('modal/open', {
        type: 'templates',
        selectedId: this.selectedTemplate,
      })
        .then(({ templates, selectedId }) => {
          this.$store.dispatch('data/setTemplates', templates);
          this.$store.dispatch('data/patchLocalSettings', {
            htmlExportTemplate: selectedId,
          });
        });
    },
    resolve() {
      const currentFile = this.$store.getters['file/current'];
      exportSvc.exportToDisk(currentFile.id, 'html', this.allTemplates[this.selectedTemplate]);
      this.config.resolve();
    },
  },
};
</script>
