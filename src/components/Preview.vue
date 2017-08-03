<template>
  <div class="preview">
    <div class="preview__inner-1" @click="onClick" @scroll="onScroll">
      <div class="preview__inner-2" :style="{padding: styles.previewPadding}">
      </div>
    </div>
    <div v-if="!styles.showEditor" class="preview__button-bar">
      <div class="preview__button" @click="toggleEditor(true)">
        <icon-pen></icon-pen>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';

const appUri = `${window.location.protocol}//${window.location.host}`;

export default {
  data: () => ({
    previewTop: true,
  }),
  computed: mapGetters('layout', [
    'styles',
  ]),
  methods: {
    ...mapActions('data', [
      'toggleEditor',
    ]),
    onClick(evt) {
      let elt = evt.target;
      while (elt !== this.$el) {
        if (elt.href && elt.href.match(/^https?:\/\//)
          && (!elt.hash || elt.href.slice(0, appUri.length) !== appUri)) {
          evt.preventDefault();
          const wnd = window.open(elt.href, '_blank');
          wnd.focus();
          return;
        }
        elt = elt.parentNode;
      }
    },
    onScroll(evt) {
      this.previewTop = evt.target.scrollTop < 10;
    },
  },
};
</script>

<style lang="scss">
@import 'common/variables.scss';

.preview,
.preview__inner-1 {
  position: absolute;
  width: 100%;
  height: 100%;
}

.preview__inner-1 {
  overflow: auto;
}

.preview__inner-2 {
  margin: 0;
}

.preview__inner-2 > :first-child > :first-child {
  margin-top: 0;
}

.preview__button-bar {
  position: absolute;
  top: 10px;
  right: 26px;
}

.preview__button {
  cursor: pointer;
  color: rgba(0, 0, 0, 0.25);
  width: 40px;
  height: 40px;
  padding: 5px;
  border-radius: $border-radius-base;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.75);
  }
}
</style>
