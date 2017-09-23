<template>
  <div class="modal__inner-1 modal__inner-1--link" @keyup.enter="resolve()">
    <div class="modal__inner-2">
      <p>Please provide a <b>URL</b> for your link.
      <div class="form-entry">
        <label class="form-entry__label" for="url">URL</label>
        <div class="form-entry__field">
          <input id="url" type="text" class="textfield" v-model="url">
        </div>
      </div>
      <div class="modal__button-bar">
        <button class="button" @click="reject()">Cancel</button>
        <button class="button" @click="resolve()">Ok</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data: () => ({
    url: '',
  }),
  computed: mapGetters('modal', [
    'config',
  ]),
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
  },
};
</script>
