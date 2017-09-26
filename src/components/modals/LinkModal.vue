<template>
  <div class="modal__inner-1">
    <div class="modal__inner-2">
      <p>Please provide a <b>URL</b> for your link.
      <form-entry label="URL">
        <input slot="field" class="textfield" type="text" v-model.trim="url" @keyup.enter="resolve()">
      </form-entry>
      <div class="modal__button-bar">
        <button class="button" @click="reject()">Cancel</button>
        <button class="button" @click="resolve()">Ok</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import FormEntry from './FormEntry';

export default {
  components: {
    FormEntry,
  },
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
