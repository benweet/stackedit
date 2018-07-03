<template>
  <modal-inner aria-label="Link Dropbox account">
    <div class="modal__content">
      <div class="modal__image">
        <icon-provider provider-id="dropbox"></icon-provider>
      </div>
      <p>Link your <b>Dropbox</b> account to <b>StackEdit</b>.</p>
      <div class="form-entry">
        <div class="form-entry__checkbox">
          <label>
            <input type="checkbox" v-model="restrictedAccess"> Restrict access
          </label>
          <div class="form-entry__info">
            If checked, access will be restricted to the <b>/Applications/StackEdit (restricted)</b> folder.
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
    restrictedAccess: 'dropboxRestrictedAccess',
  },
});
</script>
