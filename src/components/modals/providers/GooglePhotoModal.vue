<template>
  <modal-inner class="modal__inner-1--google-photo" aria-label="Import Google Photo">
    <div class="modal__content">
      <div class="google-photo__tumbnail" :style="{backgroundImage: thumbnailUrl}"></div>
      <form-entry label="Title" info="optional">
        <input slot="field" class="textfield" type="text" v-model.trim="title" @keydown.enter="resolve()">
      </form-entry>
      <form-entry label="Size limit" info="optional">
        <input slot="field" class="textfield" type="text" v-model.trim="size" @keydown.enter="resolve()">
      </form-entry>
    </div>
    <div class="modal__button-bar">
      <button class="button" @click="reject()">Cancel</button>
      <button class="button button--resolve" @click="resolve()">Ok</button>
    </div>
  </modal-inner>
</template>

<script>
import { mapGetters } from 'vuex';
import ModalInner from '../common/ModalInner';
import FormEntry from '../common/FormEntry';

const makeThumbnail = (url, size) => `${url}=s${size}`;

export default {
  components: {
    ModalInner,
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
      let { url } = this.config;
      const size = parseInt(this.size, 10);
      if (!Number.isNaN(size)) {
        url = makeThumbnail(url, size);
      }
      if (this.title) {
        url += ` "${this.title}"`;
      }
      const { callback } = this.config;
      this.config.resolve();
      callback(url);
    },
    reject() {
      const { callback } = this.config;
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
