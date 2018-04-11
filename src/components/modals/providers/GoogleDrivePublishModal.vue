<template>
  <modal-inner aria-label="Publish to Google Drive">
    <div class="modal__content">
      <div class="modal__image">
        <icon-provider provider-id="googleDrive"></icon-provider>
      </div>
      <p>This will publish <b>{{currentFileName}}</b> to your <b>Google Drive</b> account.</p>
      <form-entry label="Folder ID" info="optional">
        <input slot="field" class="textfield" type="text" v-model.trim="folderId" @keydown.enter="resolve()">
        <div class="form-entry__info">
          If not supplied, the file will be created in your Drive root folder.
        </div>
        <div class="form-entry__actions">
          <a href="javascript:void(0)" @click="openFolder">Choose folder</a>
        </div>
      </form-entry>
      <form-entry label="Existing file ID" info="optional">
        <input slot="field" class="textfield" type="text" v-model.trim="fileId" @keydown.enter="resolve()">
        <div class="form-entry__info">
          This will overwrite the file on the server.
        </div>
      </form-entry>
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
      <form-entry label="Template">
        <select slot="field" class="textfield" v-model="selectedTemplate" @keydown.enter="resolve()">
          <option v-for="(template, id) in allTemplates" :key="id" :value="id">
            {{ template.name }}
          </option>
        </select>
        <div class="form-entry__actions">
          <a href="javascript:void(0)" @click="configureTemplates">Configure templates</a>
        </div>
      </form-entry>
      <div class="modal__info">
        <b>ProTip:</b> You can provide a value for <code>title</code> in the <a href="javascript:void(0)" @click="openFileProperties">file properties</a>.
      </div>
    </div>
    <div class="modal__button-bar">
      <button class="button" @click="config.reject()">Cancel</button>
      <button class="button" @click="resolve()">Ok</button>
    </div>
  </modal-inner>
</template>

<script>
import googleHelper from '../../../services/providers/helpers/googleHelper';
import googleDriveProvider from '../../../services/providers/googleDriveProvider';
import modalTemplate from '../common/modalTemplate';

export default modalTemplate({
  data: () => ({
    fileId: '',
  }),
  computedLocalSettings: {
    folderId: 'googleDriveFolderId',
    selectedTemplate: 'googleDrivePublishTemplate',
    format: 'googleDrivePublishFormat',
  },
  methods: {
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
});
</script>
