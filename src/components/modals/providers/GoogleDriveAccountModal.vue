<template>
  <modal-inner aria-label="Link Google Drive account">
    <div class="modal__content">
      <div class="modal__image">
        <icon-provider provider-id="googleDrive"></icon-provider>
      </div>
      <p>Link your <b>Google Drive</b> account to <b>StackEdit</b>.</p>
      <div class="form-entry">
        <div class="form-entry__checkbox">
          <label>
            <input type="checkbox" v-model="restrictedAccess"> Restrict access
          </label>
          <div class="form-entry__info">
            If checked, access will be restricted to files that you have opened or created with <b>StackEdit</b>.
          </div>
        </div>
      </div>
    </div>
    <div class="modal__button-bar">
      <button class="button" @click="config.reject()">Cancel</button>
      <button class="button button--resolve" @click="config.resolve()">Ok</button>
    </div>
  </modal-inner>
</template>

<script>
import modalTemplate from '../common/modalTemplate';

export default modalTemplate({
  computedLocalSettings: {
    restrictedAccess: 'googleDriveRestrictedAccess',
  },
});
</script>
