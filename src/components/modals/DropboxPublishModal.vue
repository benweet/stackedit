<template>
  <div class="modal__inner-1 modal__inner-1--google-drive-sync">
    <div class="modal__inner-2">
      <div class="modal__image">
        <icon-provider provider-id="dropbox"></icon-provider>
      </div>
      <p>This will publish <b>{{currentFileName}}</b> to your <b>Dropbox</b>.</p>
      <div class="form-entry">
        <label class="form-entry__label" for="path">File path</label>
        <div class="form-entry__field">
          <input id="path" type="text" class="textfield" v-model.trim="path" @keyup.enter="resolve()">
        </div>
        <div class="form-entry__info">
          <b>Example:</b> /path/to/My Document.html<br>
          If the file exists, it will be replaced.
        </div>
      </div>
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
        <button class="button" @click="config.reject()">Cancel</button>
        <button class="button" @click="resolve()">Ok</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import dropboxProvider from '../../services/providers/dropboxProvider';
import dropboxRestrictedProvider from '../../services/providers/dropboxRestrictedProvider';
import store from '../../store';

const computedLocalSetting = id => ({
  get() {
    return store.getters['data/localSettings'][id];
  },
  set(value) {
    store.dispatch('data/patchLocalSettings', {
      [id]: value,
    });
  },
});

export default {
  data: () => ({
    path: '',
  }),
  computed: {
    ...mapGetters('modal', [
      'config',
    ]),
    currentFileName() {
      return this.$store.getters['file/current'].name;
    },
    ...mapGetters('data', [
      'allTemplates',
    ]),
    selectedTemplate: computedLocalSetting('dropboxPublishTemplate'),
  },
  created() {
    this.path = `/${this.currentFileName}.html`;
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
            dropboxPublishTemplate: selectedId,
          });
        });
    },
    resolve() {
      if (dropboxProvider.checkPath(this.path)) {
        // Return new location
        const location = this.config.token.fullAccess
          ? dropboxProvider.makeLocation(this.config.token, this.path)
          : dropboxRestrictedProvider.makeLocation(this.config.token, this.path);
        location.templateId = this.selectedTemplate;
        this.config.resolve(location);
      }
    },
  },
};
</script>
