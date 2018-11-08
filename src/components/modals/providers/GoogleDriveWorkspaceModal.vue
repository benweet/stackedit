<template>
  <modal-inner aria-label="Add Google Drive workspace">
    <div class="modal__content">
      <div class="modal__image">
        <icon-provider provider-id="googleDrive"></icon-provider>
      </div>
      <p>Create a workspace synced with a <b>Google Drive</b> folder.</p>
      <form-entry label="Folder ID" info="optional">
        <input slot="field" class="textfield" type="text" v-model.trim="folderId" @keydown.enter="resolve()">
        <div class="form-entry__info">
          If not supplied, a new workspace folder will be created in your Drive root folder.
        </div>
        <div class="form-entry__actions">
          <a href="javascript:void(0)" @click="openFolder">Choose folder</a>
        </div>
      </form-entry>
    </div>
    <div class="modal__button-bar">
      <button class="button" @click="config.reject()">Cancel</button>
      <button class="button button--resolve" @click="resolve()">Ok</button>
    </div>
  </modal-inner>
</template>

<script>
import googleHelper from '../../../services/providers/helpers/googleHelper';
import modalTemplate from '../common/modalTemplate';
import utils from '../../../services/utils';
import store from '../../../store';

export default modalTemplate({
  computedLocalSettings: {
    folderId: 'googleDriveWorkspaceFolderId',
  },
  methods: {
    openFolder() {
      return store.dispatch(
        'modal/hideUntil',
        googleHelper.openPicker(this.config.token, 'folder')
          .then((folders) => {
            if (folders[0]) {
              store.dispatch('data/patchLocalSettings', {
                googleDriveWorkspaceFolderId: folders[0].id,
              });
            }
          }),
      );
    },
    resolve() {
      const url = utils.addQueryParams('app', {
        providerId: 'googleDriveWorkspace',
        folderId: this.folderId,
        sub: this.config.token.sub,
      }, true);
      this.config.resolve();
      window.open(url);
    },
  },
});
</script>
