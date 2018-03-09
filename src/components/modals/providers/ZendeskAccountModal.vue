<template>
  <modal-inner aria-label="Link Zendesk account">
    <div class="modal__content">
      <div class="modal__image">
        <icon-provider provider-id="zendesk"></icon-provider>
      </div>
      <p>This will link your <b>Zendesk</b> account to <b>StackEdit</b>.</p>
      <form-entry label="Site URL" error="siteUrl">
        <input slot="field" class="textfield" type="text" v-model.trim="siteUrl" @keydown.enter="resolve()">
        <div class="form-entry__info">
          <b>Example:</b> https://example.zendesk.com/
        </div>
      </form-entry>
      <form-entry label="Client Unique Identifier" error="clientId">
        <input slot="field" class="textfield" type="text" v-model.trim="clientId" @keydown.enter="resolve()">
        <div class="form-entry__info">
          You have to configure an OAuth Client with redirect URL <b>{{redirectUrl}}</b><br>
          <a href="https://support.zendesk.com/hc/en-us/articles/203663836" target="_blank"><b>More info</b></a>
        </div>
      </form-entry>
    </div>
    <div class="modal__button-bar">
      <button class="button" @click="config.reject()">Cancel</button>
      <button class="button" @click="resolve()">Ok</button>
    </div>
  </modal-inner>
</template>

<script>
import utils from '../../../services/utils';
import modalTemplate from '../common/modalTemplate';

export default modalTemplate({
  data: () => ({
    redirectUrl: utils.oauth2RedirectUri,
  }),
  computedLocalSettings: {
    siteUrl: 'zendeskSiteUrl',
    clientId: 'zendeskClientId',
  },
  methods: {
    resolve() {
      if (!this.siteUrl) {
        this.setError('siteUrl');
      }
      if (!this.clientId) {
        this.setError('clientId');
      }
      if (this.siteUrl && this.clientId) {
        const parsedUrl = this.siteUrl.match(/^https:\/\/([^.]+)\.zendesk\.com/);
        if (!parsedUrl) {
          this.setError('siteUrl');
        } else {
          this.config.resolve({
            subdomain: parsedUrl[1],
            clientId: this.clientId,
          });
        }
      }
    },
  },
});
</script>
