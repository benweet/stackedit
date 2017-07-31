<template>
  <div class="preview">
    <div class="preview__inner" :style="{ 'padding-left': styles.previewPadding + 'px', 'padding-right': styles.previewPadding + 'px' }">
    </div>
  </div>
</template>


<script>
import { mapGetters } from 'vuex';

const appUri = `${window.location.protocol}//${window.location.host}`;

export default {
  computed: mapGetters('layout', [
    'styles',
  ]),
  mounted() {
    this.$el.addEventListener('click', (evt) => {
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
    });
  },
};
</script>

<style lang="scss">
.preview {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.preview__inner {
  margin: 0;
  padding: 0 1035px 360px;
}

.preview__inner > :first-child {
  & > h1,
  & > h2,
  & > h3,
  & > h4,
  & > h5,
  & > h6 {
    &:first-child {
      margin-top: 0;
    }
  }
}
</style>
