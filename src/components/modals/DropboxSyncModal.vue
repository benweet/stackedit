<template>
  <div class="modal__inner-1" role="dialog" aria-label="Synchronize with Dropbox">
    <div class="modal__inner-2">
      <div class="modal__image">
        <icon-provider provider-id="dropbox"></icon-provider>
      </div>
      <p>This will save <b>{{currentFileName}}</b> to your <b>Dropbox</b> and keep it synchronized.</p>
      <form-entry label="File path" error="path">
        <input slot="field" class="textfield" type="text" v-model.trim="path" @keyup.enter="resolve()">
        <div class="form-entry__info">
          <b>Example:</b> {{config.token.fullAccess ? '' : '/Applications/StackEdit (restricted)'}}/path/to/My Document.md<br>
          If the file exists, it will be replaced.
        </div>
      </form-entry>
      <div class="modal__button-bar">
        <button class="button" @click="config.reject()">Cancel</button>
        <button class="button" @click="resolve()">Ok</button>
      </div>
    </div>
  </div>
</template>

<script>
import dropboxProvider from '../../services/providers/dropboxProvider';
import modalTemplate from './modalTemplate';

export default modalTemplate({
  data: () => ({
    path: '',
  }),
  created() {
    this.path = `/${this.currentFileName}.md`;
  },
  methods: {
    resolve() {
      if (!dropboxProvider.checkPath(this.path)) {
        this.setError('path');
      } else {
        // Return new location
        const location = dropboxProvider.makeLocation(this.config.token, this.path);
        this.config.resolve(location);
      }
    },
  },
});
</script>
