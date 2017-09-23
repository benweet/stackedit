<template>
  <div class="modal__inner-1 modal__inner-1--google-drive-sync">
    <div class="modal__inner-2">
      <div class="modal__image">
        <icon-provider provider-id="dropbox"></icon-provider>
      </div>
      <p>This will save <b>{{currentFileName}}</b> to your <b>Dropbox</b> and keep it synchronized.</p>
      <div class="form-entry">
        <label class="form-entry__label" for="path">File path</label>
        <div class="form-entry__field">
          <input id="path" type="text" class="textfield" v-model.trim="path" @keyup.enter="resolve()">
        </div>
        <div class="form-entry__info">
          <b>Example:</b> /path/to/My Document.md<br>
          If the file exists, it will be replaced.
        </div>
      </div>
      <div class="modal__button-bar">
        <button class="button" @click="config.reject()">Cancel</button>
        <button class="button" @click="resolve()">Ok</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import dropboxProvider from '../../services/providers/dropboxProvider';
import dropboxRestrictedProvider from '../../services/providers/dropboxRestrictedProvider';

export default {
  data: () => ({
    path: '',
  }),
  computed: {
    ...mapGetters('modal', [
      'config',
    ]),
    currentFileName() {
      return this.$store.getters['file/current'].name;
    },
  },
  created() {
    this.path = `/${this.currentFileName}.md`;
  },
  methods: {
    resolve() {
      if (dropboxProvider.checkPath(this.path)) {
        // Return new location
        const location = this.config.token.fullAccess
          ? dropboxProvider.makeLocation(this.config.token, this.path)
          : dropboxRestrictedProvider.makeLocation(this.config.token, this.path);
        this.config.resolve(location);
      }
    },
  },
};
</script>
