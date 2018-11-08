<template>
  <modal-inner aria-label="Add CouchDB workspace">
    <div class="modal__content">
      <div class="modal__image">
        <icon-provider provider-id="couchdb"></icon-provider>
      </div>
      <p>Create a workspace synced with a <b>CouchDB</b> database.</p>
      <form-entry label="Database URL" error="dbUrl">
        <input slot="field" class="textfield" type="text" v-model.trim="dbUrl" @keydown.enter="resolve()">
        <div class="form-entry__info">
          <b>Example:</b> https://instance.smileupps.com/stackedit-workspace
        </div>
        <div class="form-entry__actions">
          <a href="https://community.stackedit.io/t/couchdb-workspace-setup/" target="_blank">How to setup?</a>
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
import utils from '../../../services/utils';

export default modalTemplate({
  data: () => ({
    dbUrl: '',
  }),
  methods: {
    resolve() {
      if (!this.dbUrl) {
        this.setError('dbUrl');
      } else {
        const url = utils.addQueryParams('app', {
          providerId: 'couchdbWorkspace',
          dbUrl: this.dbUrl,
        }, true);
        this.config.resolve();
        window.open(url);
      }
    },
  },
});
</script>

<style lang="scss">
.couchdb-workspace__info {
  font-size: 0.8em;
}
</style>
