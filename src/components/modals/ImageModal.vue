<template>
  <modal-inner aria-label="Insert image">
    <div class="modal__content">
      <p>Please provide a <b>URL</b> for your image.</p>
      <form-entry label="URL" error="url">
        <input slot="field" class="textfield" type="text" v-model.trim="url" @keydown.enter="resolve">
      </form-entry>
      <menu-entry @click.native="openGooglePhotos(token)" v-for="token in googlePhotosTokens" :key="token.sub">
        <icon-provider slot="icon" provider-id="googlePhotos"></icon-provider>
        <div>Open from Google Photos</div>
        <span>{{token.name}}</span>
      </menu-entry>
      <menu-entry @click.native="addGooglePhotosAccount">
        <icon-provider slot="icon" provider-id="googlePhotos"></icon-provider>
        <span>Add Google Photos account</span>
      </menu-entry>
    </div>
    <div class="modal__button-bar">
      <button class="button" @click="reject()">Cancel</button>
      <button class="button button--resolve" @click="resolve">Ok</button>
    </div>
  </modal-inner>
</template>

<script>
import modalTemplate from './common/modalTemplate';
import MenuEntry from '../menus/common/MenuEntry';
import googleHelper from '../../services/providers/helpers/googleHelper';
import store from '../../store';

export default modalTemplate({
  components: {
    MenuEntry,
  },
  data: () => ({
    url: '',
  }),
  computed: {
    googlePhotosTokens() {
      const googleTokensBySub = store.getters['data/googleTokensBySub'];
      return Object.values(googleTokensBySub)
        .filter(token => token.isPhotos)
        .sort((token1, token2) => token1.name.localeCompare(token2.name));
    },
  },
  methods: {
    resolve(evt) {
      evt.preventDefault(); // Fixes https://github.com/benweet/stackedit/issues/1503
      if (!this.url) {
        this.setError('url');
      } else {
        const { callback } = this.config;
        this.config.resolve();
        callback(this.url);
      }
    },
    reject() {
      const { callback } = this.config;
      this.config.reject();
      callback(null);
    },
    async addGooglePhotosAccount() {
      try {
        await googleHelper.addPhotosAccount();
      } catch (e) { /* cancel */ }
    },
    async openGooglePhotos(token) {
      const { callback } = this.config;
      this.config.reject();
      const res = await googleHelper.openPicker(token, 'img');
      if (res[0]) {
        store.dispatch('modal/open', {
          type: 'googlePhoto',
          url: res[0].url,
          callback,
        });
      }
    },
  },
});
</script>
