<template>
  <modal-inner aria-label="GitLab account">
    <div class="modal__content">
      <div class="modal__image">
        <icon-provider provider-id="gitlab"></icon-provider>
      </div>
      <p>Link your <b>GitLab</b> account to <b>StackEdit</b>.</p>
      <form-entry label="GitLab URL" error="serverUrl">
        <input v-if="config.forceServerUrl" slot="field" class="textfield" type="text" disabled="disabled" v-model="config.forceServerUrl">
        <input v-else slot="field" class="textfield" type="text" v-model.trim="serverUrl" @keydown.enter="resolve()">
        <div class="form-entry__info">
          <b>Example:</b> https://gitlab.example.com/
        </div>
      </form-entry>
      <form-entry label="Application ID" error="applicationId">
        <input slot="field" class="textfield" type="text" v-model.trim="applicationId" @keydown.enter="resolve()">
        <div class="form-entry__info">
          You have to configure an OAuth2 Application with redirect URL <b>{{redirectUrl}}</b>
        </div>
        <div class="form-entry__actions">
          <a href="https://docs.gitlab.com/ee/integration/oauth_provider.html" target="_blank">More info</a>
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
import modalTemplate from '../common/modalTemplate';
import constants from '../../../data/constants';

export default modalTemplate({
  data: () => ({
    redirectUrl: constants.oauth2RedirectUri,
  }),
  computedLocalSettings: {
    serverUrl: 'gitlabServerUrl',
    applicationId: 'gitlabApplicationId',
  },
  methods: {
    resolve() {
      const serverUrl = this.config.forceServerUrl || this.serverUrl;
      if (!serverUrl) {
        this.setError('serverUrl');
      }
      if (!this.applicationId) {
        this.setError('applicationId');
      }
      if (serverUrl && this.applicationId) {
        const parsedUrl = serverUrl.match(/^(https:\/\/[^/]+)/);
        if (!parsedUrl) {
          this.setError('serverUrl');
        } else {
          this.config.resolve({
            serverUrl: parsedUrl[1],
            applicationId: this.applicationId,
          });
        }
      }
    },
  },
});
</script>
