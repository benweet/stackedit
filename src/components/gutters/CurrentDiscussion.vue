<template>
  <div class="current-discussion" :style="{width: constants.gutterWidth + 'px'}">
    <sticky-comment v-if="stickyComment === 'bottom'"></sticky-comment>
    <div class="current-discussion__inner">
      <div class="flex flex--row flex--space-between">
        <div class="current-discussion__buttons flex flex--row flex--end">
          <button class="current-discussion__button button" v-if="showNext" @click="goToDiscussion(previousDiscussionId)" v-title="'Previous discussion'">
            <icon-arrow-left></icon-arrow-left>
          </button>
          <button class="current-discussion__button current-discussion__button--rotate button" v-if="showNext" @click="goToDiscussion(nextDiscussionId)" v-title="'Next discussion'">
            <icon-arrow-left></icon-arrow-left>
          </button>
        </div>
        <div class="current-discussion__buttons flex flex--row flex--end">
          <button class="current-discussion__button current-discussion__button--remove button" v-if="showRemove" @click="removeDiscussion" v-title="'Remove discussion'">
            <icon-delete></icon-delete>
          </button>
          <button class="current-discussion__button button" @click="setCurrentDiscussionId()" v-title="'Close discussion'">
            <icon-close></icon-close>
          </button>
        </div>
      </div>
      <div class="current-discussion__text markdown-highlighting markdown-highlighting--inline">
        <span @click="goToDiscussion()" v-html="text"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import editorSvc from '../../services/editorSvc';
import animationSvc from '../../services/animationSvc';
import markdownConversionSvc from '../../services/markdownConversionSvc';
import StickyComment from './StickyComment';
import store from '../../store';
import badgeSvc from '../../services/badgeSvc';

export default {
  components: {
    StickyComment,
  },
  computed: {
    ...mapState('discussion', [
      'stickyComment',
      'currentDiscussionId',
    ]),
    ...mapGetters('discussion', [
      'currentDiscussion',
      'previousDiscussionId',
      'nextDiscussionId',
      'currentFileDiscussions',
      'currentDiscussionLastCommentId',
    ]),
    ...mapGetters('layout', [
      'constants',
    ]),
    text() {
      return markdownConversionSvc.highlight(this.currentDiscussion.text);
    },
    showNext() {
      return this.nextDiscussionId && this.nextDiscussionId !== this.currentDiscussionId;
    },
    showRemove() {
      return this.currentDiscussionLastCommentId;
    },
  },
  methods: {
    ...mapMutations('discussion', [
      'setCurrentDiscussionId',
    ]),
    ...mapActions('notification', [
      'info',
    ]),
    goToDiscussion(discussionId = this.currentDiscussionId) {
      this.setCurrentDiscussionId(discussionId);
      const layoutSettings = store.getters['data/layoutSettings'];
      const discussion = this.currentFileDiscussions[discussionId];
      const coordinates = layoutSettings.showEditor
        ? editorSvc.clEditor.selectionMgr.getCoordinates(discussion.end)
        : editorSvc.getPreviewOffsetCoordinates(editorSvc.getPreviewOffset(discussion.end));
      if (!coordinates) {
        this.info("Discussion can't be located in the file.");
      } else {
        const scrollerElt = layoutSettings.showEditor
          ? editorSvc.editorElt.parentNode
          : editorSvc.previewElt.parentNode;
        let scrollTop = coordinates.top - (scrollerElt.offsetHeight / 2);
        const maxScrollTop = scrollerElt.scrollHeight - scrollerElt.offsetHeight;
        if (scrollTop < 0) {
          scrollTop = 0;
        } else if (scrollTop > maxScrollTop) {
          scrollTop = maxScrollTop;
        }
        animationSvc.animate(scrollerElt)
          .scrollTop(scrollTop)
          .duration(200)
          .start();
      }
    },
    async removeDiscussion() {
      try {
        await store.dispatch('modal/open', 'discussionDeletion');
        store.dispatch('discussion/cleanCurrentFile', {
          filterDiscussion: this.currentDiscussion,
        });
        badgeSvc.addBadge('removeDiscussion');
      } catch (e) {
        // Cancel
      }
    },
  },
};
</script>

<style lang="scss">
@import '../../styles/variables.scss';

.current-discussion {
  position: absolute;
  right: 0;
  bottom: 0;

  .sticky-comment {
    position: relative;
  }
}

.current-discussion__inner {
  position: relative;
  font-size: 16px;
  background-color: $info-bg;
  max-height: 130px; /* 3 lines max */
  overflow: hidden;
}

.current-discussion__buttons {
  padding: 4px 4px 0;
}

.current-discussion__button {
  width: 30px;
  height: 28px;
  padding: 2px;
  flex: none;
  color: rgba(0, 0, 0, 0.5);

  &:active,
  &:focus,
  &:hover {
    color: rgba(0, 0, 0, 0.75);
  }
}

.current-discussion__button--remove {
  /* Make the trash a bit smaller */
  padding: 3px;
}

.current-discussion__button--rotate {
  transform: rotate(180deg);
}

.current-discussion__text {
  padding: 10px;

  span {
    padding: 0.2em 0;
    background-color: mix($editor-background-light, $selection-highlighting-color, 10%);
    cursor: pointer;

    .app--dark {
      background-color: mix($editor-background-dark, $selection-highlighting-color, 10%);
    }
  }
}
</style>
