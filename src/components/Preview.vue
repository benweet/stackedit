<template>
  <div class="preview">
    <div class="preview__inner-1" @click="onClick" @scroll="onScroll">
      <div class="preview__inner-2" :style="{padding: styles.previewPadding}">
      </div>
      <preview-new-discussion-button-gutter></preview-new-discussion-button-gutter>
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
import PreviewNewDiscussionButtonGutter from './gutters/PreviewNewDiscussionButtonGutter';

const appUri = `${window.location.protocol}//${window.location.host}`;

export default {
  components: {
    PreviewNewDiscussionButtonGutter,
  },
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
  mounted() {
    const previewElt = this.$el.querySelector('.preview__inner-2');
    const onDiscussionEvt = cb => (evt) => {
      let elt = evt.target;
      while (elt && elt !== previewElt) {
        if (elt.discussionId) {
          cb(elt.discussionId);
          return;
        }
        elt = elt.parentNode;
      }
    };

    previewElt.addEventListener('mouseover', onDiscussionEvt(discussionId =>
      previewElt.getElementsByClassName(`discussion-preview-highlighting-${discussionId}`)
        .cl_each(elt => elt.classList.add('discussion-preview-highlighting--hover')),
      ));
    previewElt.addEventListener('mouseout', onDiscussionEvt(discussionId =>
      previewElt.getElementsByClassName(`discussion-preview-highlighting-${discussionId}`)
        .cl_each(elt => elt.classList.remove('discussion-preview-highlighting--hover')),
      ));
    previewElt.addEventListener('click', onDiscussionEvt((discussionId) => {
      this.$store.commit('discussion/setCurrentDiscussionId', discussionId);
    }));
    this.$watch(
      () => this.$store.state.discussion.currentDiscussionId,
      (discussionId, oldDiscussionId) => {
        if (oldDiscussionId) {
          previewElt.querySelectorAll(`.discussion-preview-highlighting-${oldDiscussionId}`)
            .cl_each(elt => elt.classList.remove('discussion-preview-highlighting--selected'));
        }
        if (discussionId) {
          previewElt.querySelectorAll(`.discussion-preview-highlighting-${discussionId}`)
            .cl_each(elt => elt.classList.add('discussion-preview-highlighting--selected'));
        }
      });
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
