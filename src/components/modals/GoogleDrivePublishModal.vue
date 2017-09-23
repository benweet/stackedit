<template>
  <div class="modal__inner-1 modal__inner-1--google-drive-sync">
    <div class="modal__inner-2">
      <div class="modal__image">
        <icon-provider provider-id="googleDrive"></icon-provider>
      </div>
      <p>This will publish <b>{{currentFileName}}</b> to your <b>Google Drive</b> account.</p>
      <div class="form-entry">
        <label class="form-entry__label" for="fileId">File ID (optional)</label>
        <div class="form-entry__field">
          <input id="fileId" type="text" class="textfield" v-model="fileId" @keyup.enter="resolve()">
        </div>
        <div class="form-entry__info">
          If no file ID is supplied, a new file will be created in your Google Drive root folder.
        </div>
      </div>
      <div class="form-entry">
        <div class="form-entry__radio">
          <label>
            <input type="radio" v-model="format" value="markdown"> Export Markdown
          </label>
        </div>
        <div class="form-entry__radio">
          <label>
            <input type="radio" v-model="format" value="html"> Export HTML
          </label>
        </div>
      </div>
      <div class="form-entry">
        <label class="form-entry__label" for="template">Template</label>
        <div class="form-entry__field">
          <select class="textfield" id="template" v-model="selectedTemplate" :disabled="format === 'markdown'" @keyup.enter="resolve()">
            <option v-for="(template, id) in allTemplates" :key="id" v-bind:value="id">
              {{ template.name }}
            </option>
          </select>
        </div>
        <div class="form-entry__actions">
          <a href="javascript:void(0)" @click="configureTemplates">Configure templates</a>
        </div>
      </div>
      <div class="modal__tip">
        <b>Tip:</b> You can provide a value for <code>title</code> in the <b>file properties</b>.
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
import googleHelper from '../../services/providers/helpers/googleHelper';
import googleDriveProvider from '../../services/providers/googleDriveProvider';
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
    fileId: '',
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
    selectedTemplate: computedLocalSetting('googleDrivePublishTemplate'),
    format: computedLocalSetting('googleDrivePublishFormat'),
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
            googleDrivePublishTemplate: selectedId,
          });
        });
    },
    openFolder() {
      return this.$store.dispatch(
        'modal/hideUntil',
        googleHelper.openPicker(this.config.token, 'folder')
          .then((folders) => {
            this.$store.dispatch('data/patchLocalSettings', {
              googleDriveFolderId: folders[0].id,
            });
          }));
    },
    resolve() {
      // Return new location
      const location = googleDriveProvider.makeLocation(
        this.config.token, this.fileId);
      if (this.format) {
        location.templateId = this.selectedTemplate;
      }
      this.config.resolve(location);
    },
  },
};
</script>
