<template>
  <div class="modal__inner-1">
    <div class="modal__inner-2">
      <div class="modal__image">
        <icon-provider provider-id="googleDrive"></icon-provider>
      </div>
      <p>This will save <b>{{currentFileName}}</b> to your <b>Google Drive</b> account and keep it synchronized.</p>
      <form-entry label="Folder ID (optional)">
        <input slot="field" class="textfield" type="text" v-model.trim="folderId" @keyup.enter="resolve()">
        <div class="form-entry__info">
          If no folder ID is supplied, the file will be created in your root folder.
        </div>
        <div class="form-entry__actions">
          <a href="javascript:void(0)" @click="openFolder">Choose folder</a>
        </div>
      </form-entry>
      <form-entry label="Existing file ID (optional)">
        <input slot="field" class="textfield" type="text" v-model.trim="fileId" @keyup.enter="resolve()">
        <div class="form-entry__info">
          This will overwrite the file on the server.
        </div>
      </form-entry>
      <div class="modal__button-bar">
        <button class="button" @click="config.reject()">Cancel</button>
        <button class="button" @click="resolve()">Ok</button>
      </div>
    </div>
  </div>
</template>

<script>
import googleHelper from '../../services/providers/helpers/googleHelper';
import googleDriveProvider from '../../services/providers/googleDriveProvider';
import modalTemplate from './modalTemplate';

export default modalTemplate({
  data: () => ({
    fileId: '',
  }),
  computedLocalSettings: {
    folderId: 'googleDriveFolderId',
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
        this.config.token, this.fileId, this.folderId);
      this.config.resolve(location);
    },
  },
});
</script>
