<template>
  <div class="modal__inner-1 modal__inner-1--google-photo">
    <div class="modal__inner-2">
      <div class="google-photo__tumbnail" :style="{'background-image': thumbnailUrl}"></div>
      <div class="form-entry">
        <label class="form-entry__label" for="title">Title (optional)</label>
        <div class="form-entry__field">
          <input id="title" type="text" class="textfield" v-model.trim="title" @keyup.enter="resolve()">
        </div>
      </div>
      <div class="form-entry">
        <label class="form-entry__label" for="size">Size limit (optional)</label>
        <div class="form-entry__field">
          <input id="size" type="text" class="textfield" v-model="size" @keyup.enter="resolve()">
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
import { mapState } from 'vuex';

const makeThumbnail = (url, size) => `${url}=s${size}`;

export default {
  data: () => ({
    title: '',
    size: '',
  }),
  computed: {
    thumbnailUrl() {
      return `url(${makeThumbnail(this.config.url, 320)})`;
    },
    ...mapState('modal', [
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
