<template>
  <div class="preview">
    <div class="preview__inner" :style="{ 'padding-left': previewPadding + 'px', 'padding-right': previewPadding + 'px' }">
    </div>
  </div>
</template>


<script>
import { mapState } from 'vuex';

const appUri = `${window.location.protocol}//${window.location.host}`;

export default {
  computed: mapState('layout', [
    'previewPadding',
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
</style>
