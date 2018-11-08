<template>
  <div class="preview">
    <div class="preview__inner-1" @click="onClick" @scroll="onScroll">
      <div class="preview__inner-2" :style="{padding: styles.previewPadding}">
      </div>
      <div class="gutter" :style="{left: styles.previewGutterLeft + 'px'}">
        <comment-list v-if="styles.previewGutterWidth"></comment-list>
        <preview-new-discussion-button v-if="!isCurrentTemp"></preview-new-discussion-button>
      </div>
    </div>
    <div v-if="!styles.showEditor" class="preview__corner">
      <button class="preview__button button" @click="toggleEditor(true)" v-title="'Edit file'">
        <icon-pen></icon-pen>
      </button>
    </div>
  </div>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';
import CommentList from './gutters/CommentList';
import PreviewNewDiscussionButton from './gutters/PreviewNewDiscussionButton';
import store from '../store';

const appUri = `${window.location.protocol}//${window.location.host}`;

export default {
  components: {
    CommentList,
    PreviewNewDiscussionButton,
  },
  data: () => ({
    previewTop: true,
  }),
  computed: {
    ...mapGetters('file', [
      'isCurrentTemp',
    ]),
    ...mapGetters('layout', [
      'styles',
    ]),
  },
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

    const classToggler = toggle => (discussionId) => {
      previewElt.getElementsByClassName(`discussion-preview-highlighting--${discussionId}`)
        .cl_each(elt => elt.classList.toggle('discussion-preview-highlighting--hover', toggle));
      document.getElementsByClassName(`comment--discussion-${discussionId}`)
        .cl_each(elt => elt.classList.toggle('comment--hover', toggle));
    };

    previewElt.addEventListener('mouseover', onDiscussionEvt(classToggler(true)));
    previewElt.addEventListener('mouseout', onDiscussionEvt(classToggler(false)));
    previewElt.addEventListener('click', onDiscussionEvt((discussionId) => {
      store.commit('discussion/setCurrentDiscussionId', discussionId);
    }));

    this.$watch(
      () => store.state.discussion.currentDiscussionId,
      (discussionId, oldDiscussionId) => {
        if (oldDiscussionId) {
          previewElt.querySelectorAll(`.discussion-preview-highlighting--${oldDiscussionId}`)
            .cl_each(elt => elt.classList.remove('discussion-preview-highlighting--selected'));
        }
        if (discussionId) {
          previewElt.querySelectorAll(`.discussion-preview-highlighting--${discussionId}`)
            .cl_each(elt => elt.classList.add('discussion-preview-highlighting--selected'));
        }
      },
    );
  },
};
</script>

<style lang="scss">
@import '../styles/variables.scss';

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

$corner-size: 110px;

.preview__corner {
  position: absolute;
  top: 0;
  right: 0;

  &::before {
    content: '';
    position: absolute;
    right: 0;
    border-top: $corner-size solid rgba(0, 0, 0, 0.075);
    border-left: $corner-size solid transparent;
    pointer-events: none;

    .app--dark & {
      border-top-color: rgba(255, 255, 255, 0.075);
    }
  }
}

.preview__button {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 40px;
  height: 40px;
  padding: 5px;
  color: rgba(0, 0, 0, 0.25);

  .app--dark & {
    color: rgba(255, 255, 255, 0.25);
  }

  &:active,
  &:focus,
  &:hover {
    color: rgba(0, 0, 0, 0.33);
    background-color: transparent;

    .app--dark & {
      color: rgba(255, 255, 255, 0.33);
    }
  }
}
</style>
