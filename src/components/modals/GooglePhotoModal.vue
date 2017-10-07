<template>
  <div class="modal__inner-1 modal__inner-1--google-photo" role="dialog" aria-label="Import Google Photo">
    <div class="modal__inner-2">
      <div class="google-photo__tumbnail" :style="{'background-image': thumbnailUrl}"></div>
      <form-entry label="Title (optional)">
        <input slot="field" class="textfield" type="text" v-model.trim="title" @keyup.enter="resolve()">
      </form-entry>
      <form-entry label="Size limit (optional)">
        <input slot="field" class="textfield" type="text" v-model.trim="size" @keyup.enter="resolve()">
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

const makeThumbnail = (url, size) => `${url}=s${size}`;

export default {
  components: {
    FormEntry,
  },
  data: () => ({
    title: '',
    size: '',
  }),
  computed: {
    thumbnailUrl() {
      return `url(${makeThumbnail(this.config.url, 320)})`;
    },
    ...mapGetters('modal', [
      'config',
    ]),
  },
  methods: {
    resolve() {
      let url = this.config.url;
      const size = parseInt(this.size, 10);
      if (!isNaN(size)) {
        url = makeThumbnail(url, size);
      }
      if (this.title) {
        url += ` "${this.title}"`;
      }
      const callback = this.config.callback;
      this.config.resolve();
      callback(url);
    },
    reject() {
      const callback = this.config.callback;
      this.config.reject();
      callback(null);
    },
  },
};
</script>

<style lang="scss">
.google-photo__tumbnail {
  height: 160px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
