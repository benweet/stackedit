<template>
  <div class="modal__inner-1">
    <div class="modal__inner-2">
      <p>Please provide a <b>URL</b> for your image.
      <form-entry label="URL">
        <input slot="field" class="textfield" type="text" v-model.trim="url" @keyup.enter="resolve()">
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
      <div class="modal__button-bar">
        <button class="button" @click="reject()">Cancel</button>
        <button class="button" @click="resolve()">Ok</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import MenuEntry from '../menus/MenuEntry';
import FormEntry from './FormEntry';
import googleHelper from '../../services/providers/helpers/googleHelper';

export default {
  components: {
    FormEntry,
    MenuEntry,
  },
  data: () => ({
    url: '',
  }),
  computed: {
    ...mapGetters('modal', [
      'config',
    ]),
    googlePhotosTokens() {
      const googleToken = this.$store.getters['data/googleTokens'];
      return Object.keys(googleToken)
        .map(sub => googleToken[sub])
        .filter(token => token.isPhotos)
        .sort((token1, token2) => token1.name.localeCompare(token2.name));
    },
  },
  methods: {
    resolve() {
      if (this.url) {
        const callback = this.config.callback;
        this.config.resolve();
        callback(this.url);
      }
    },
    reject() {
      const callback = this.config.callback;
      this.config.reject();
      callback(null);
    },
    addGooglePhotosAccount() {
      return googleHelper.addPhotosAccount();
    },
    openGooglePhotos(token) {
      const callback = this.config.callback;
      this.config.reject();
      googleHelper.openPicker(token, 'img')
        .then(res => res[0] && this.$store.dispatch('modal/open', {
          type: 'googlePhoto',
          url: res[0].url,
          callback,
        }));
    },
  },
};
</script>
