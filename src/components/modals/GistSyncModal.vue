<template>
  <div class="modal__inner-1">
    <div class="modal__inner-2">
      <div class="modal__image">
        <icon-provider provider-id="gist"></icon-provider>
      </div>
      <p>This will save <b>{{currentFileName}}</b> to a <b>Gist</b> and keep it synchronized.</p>
      <form-entry label="Filename">
        <input slot="field" class="textfield" type="text" v-model.trim="filename" @keyup.enter="resolve()">
      </form-entry>
      <div class="form-entry">
        <div class="form-entry__checkbox">
          <label>
            <input type="checkbox" v-model="isPublic"> Public
          </label>
        </div>
      </div>
      <form-entry label="Existing Gist ID (optional)">
        <input slot="field" class="textfield" type="text" v-model.trim="gistId" @keyup.enter="resolve()">
        <div class="form-entry__info">
          If the file exists in the Gist, it will be replaced.
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
import gistProvider from '../../services/providers/gistProvider';
import modalTemplate from './modalTemplate';

export default modalTemplate({
  data: () => ({
    filename: '',
    gistId: '',
  }),
  computedLocalSettings: {
    isPublic: 'gistIsPublic',
  },
  created() {
    this.filename = `${this.currentFileName}.md`;
  },
  methods: {
    resolve() {
      if (this.filename) {
        // Return new location
        const location = gistProvider.makeLocation(
          this.config.token, this.filename, this.isPublic, this.gistId);
        this.config.resolve(location);
      }
    },
  },
});
</script>
