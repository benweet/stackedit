<template>
  <div class="modal__inner-1" role="dialog" aria-label="Link Dropbox account">
    <div class="modal__inner-2">
      <div class="modal__image">
        <icon-provider provider-id="dropbox"></icon-provider>
      </div>
      <p>This will link your <b>Dropbox</b> account to your <b>StackEdit</b> workspace.</p>
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
      <div class="modal__button-bar">
        <button class="button" @click="config.reject()">Cancel</button>
        <button class="button" @click="config.resolve()">Ok</button>
      </div>
    </div>
  </div>
</template>

<script>
import modalTemplate from './modalTemplate';

export default modalTemplate({
  computedLocalSettings: {
    restrictedAccess: 'dropboxRestrictedAccess',
  },
});
</script>
