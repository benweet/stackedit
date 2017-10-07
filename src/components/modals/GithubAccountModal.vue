<template>
  <div class="modal__inner-1" role="dialog" aria-label="Link GitHub account">
    <div class="modal__inner-2">
      <div class="modal__image">
        <icon-provider provider-id="github"></icon-provider>
      </div>
      <p>This will link your <b>GitHub</b> account to your <b>StackEdit</b> workspace.</p>
      <div class="form-entry">
        <div class="form-entry__checkbox">
          <label>
            <input type="checkbox" v-model="repoFullAccess"> Request access to private repositories
          </label>
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
    repoFullAccess: 'githubRepoFullAccess',
  },
});
</script>
