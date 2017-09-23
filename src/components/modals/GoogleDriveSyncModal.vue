<template>
  <div class="modal__inner-1 modal__inner-1--google-drive-sync">
    <div class="modal__inner-2">
      <div class="modal__image">
        <icon-provider provider-id="googleDrive"></icon-provider>
      </div>
      <p>This will save <b>{{currentFileName}}</b> to your <b>Google Drive</b> account and keep it synchronized.</p>
      <a href="javascript:void(0)" v-if="!showOptions" @click="showOptions = true">See options ▾</a>
      <div v-else>
        <div class="form-entry">
          <label class="form-entry__label" for="folderId">Folder ID (optional)</label>
          <div class="form-entry__field">
            <input id="folderId" type="text" class="textfield" v-model.trim="folderId" @keyup.enter="resolve()">
          </div>
          <div class="form-entry__info">
            If no folder ID is supplied, the file will be created in your root folder.
          </div>
          <div class="form-entry__actions">
            <a href="javascript:void(0)" @click="openFolder">Choose folder</a>
          </div>
        </div>
        <div class="form-entry">
          <label class="form-entry__label" for="fileId">File ID (optional)</label>
          <div class="form-entry__field">
            <input id="fileId" type="text" class="textfield" v-model="fileId" @keyup.enter="resolve()">
          </div>
          <div class="form-entry__info">
            This will overwrite the existing file on the server.
          </div>
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
import googleHelper from '../../services/providers/helpers/googleHelper';
import googleDriveProvider from '../../services/providers/googleDriveProvider';

export default {
  data: () => ({
    showOptions: false,
    fileId: '',
  }),
  computed: {
    ...mapGetters('modal', [
      'config',
    ]),
    currentFileName() {
      return this.$store.getters['file/current'].name;
    },
    folderId: {
      get() {
        return this.$store.getters['data/localSettings'].googleDriveFolderId;
      },
      set(value) {
        this.$store.dispatch('data/patchLocalSettings', {
          googleDriveFolderId: value,
        });
      },
    },
  },
  created() {
    this.showOptions = this.folderId || this.fileId;
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
};
</script>
