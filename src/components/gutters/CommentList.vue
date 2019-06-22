<template>
  <div class="comment-list" :class="stickyComment && 'comment-list--' + stickyComment" :style="{width: constants.gutterWidth + 'px'}">
    <comment v-for="(comment, discussionId) in currentFileDiscussionLastComments" :key="discussionId" v-if="comment.discussionId !== currentDiscussionId" :comment="comment" class="comment--last" :class="'comment--discussion-' + discussionId" :style="{top: tops[discussionId] + 'px'}" @click.native="setCurrentDiscussionId(discussionId)"></comment>
    <div class="comment-list__current-discussion" :style="{top: tops.current + 'px'}">
      <comment v-for="(comment, id) in currentDiscussionComments" :key="id" :comment="comment" :class="'comment--' + id"></comment>
      <new-comment v-if="isCommenting"></new-comment>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import Comment from './Comment';
import NewComment from './NewComment';
import editorSvc from '../../services/editorSvc';
import store from '../../store';
import utils from '../../services/utils';

export default {
  components: {
    Comment,
    NewComment,
  },
  data: () => ({
    tops: {},
  }),
  computed: {
    ...mapGetters('layout', [
      'constants',
      'styles',
    ]),
    ...mapState('discussion', [
      'currentDiscussionId',
      'isCommenting',
      'newCommentText',
      'stickyComment',
    ]),
    ...mapGetters('discussion', [
      'newDiscussion',
      'currentDiscussion',
      'currentFileDiscussions',
      'currentFileDiscussionLastComments',
      'currentDiscussionComments',
      'currentDiscussionLastCommentId',
    ]),
    updateTopsTrigger() {
      return utils.serializeObject([
        this.styles,
        this.currentFileDiscussionLastComments,
        this.currentDiscussionComments,
        this.currentDiscussionId,
        this.isCommenting,
      ]);
    },
    updateStickyTrigger() {
      return utils.serializeObject([
        this.updateTopsTrigger,
        this.newCommentText,
      ]);
    },
  },
  methods: {
    ...mapMutations('discussion', [
      'setCurrentDiscussionId',
    ]),
    updateTops() {
      const layoutSettings = store.getters['data/layoutSettings'];
      const minTop = -2;
      let minCommentTop = minTop;
      const getTop = (discussion, commentElt1, commentElt2, isCurrent) => {
        const firstElt = commentElt1 || commentElt2;
        const secondElt = commentElt1 && commentElt2;
        const coordinates = layoutSettings.showEditor
          ? editorSvc.clEditor.selectionMgr.getCoordinates(discussion.end)
          : editorSvc.getPreviewOffsetCoordinates(editorSvc.getPreviewOffset(discussion.end));
        let commentTop = minTop;
        if (coordinates) {
          commentTop = (coordinates.top + coordinates.height) - 80;
        }
        let top = commentTop;
        if (isCurrent) {
          top -= firstElt.offsetTop + 2; // 2 for top border
        }
        if (top < minTop) {
          commentTop += minTop - top;
          top = minTop;
        }
        if (commentTop < minCommentTop) {
          top += minCommentTop - commentTop;
          commentTop = minCommentTop;
        }
        minCommentTop = commentTop + firstElt.offsetHeight + 60;
        if (secondElt) {
          minCommentTop += secondElt.offsetHeight;
        }
        return top;
      };

      // Get the discussion top coordinates
      const tops = {};
      const discussions = this.currentFileDiscussions;
      Object.entries(discussions)
        .sort(([, discussion1], [, discussion2]) => discussion1.end - discussion2.end)
        .forEach(([discussionId, discussion]) => {
          if (discussion === this.currentDiscussion || discussion === this.newDiscussion) {
            tops.current = getTop(
              discussion,
              this.currentDiscussionLastCommentId
                && this.$el.querySelector(`.comment--${this.currentDiscussionLastCommentId}`),
              this.$el.querySelector('.comment--new'),
              true,
            );
          } else {
            tops[discussionId] = getTop(
              discussion,
              this.$el.querySelector(`.comment--discussion-${discussionId}`),
            );
          }
        });
      this.tops = tops;
    },
  },
  mounted() {
    this.$watch(
      () => this.updateTopsTrigger,
      () => this.updateTops(),
      { immediate: true },
    );

    const layoutSettings = store.getters['data/layoutSettings'];
    this.scrollerElt = layoutSettings.showEditor
      ? editorSvc.editorElt.parentNode
      : editorSvc.previewElt.parentNode;

    this.updateSticky = () => {
      let height = 0;
      let offsetTop = this.tops.current;
      const lastCommentElt = this.$el.querySelector(`.comment--${this.currentDiscussionLastCommentId}`);
      if (lastCommentElt) {
        height += lastCommentElt.clientHeight;
        offsetTop += lastCommentElt.offsetTop;
      }
      const newCommentElt = this.$el.querySelector('.comment--new');
      if (newCommentElt) {
        height += newCommentElt.clientHeight;
      }
      const currentDiscussionElt = document.querySelector('.current-discussion__inner');
      const minOffsetTop = this.scrollerElt.scrollTop + 10;
      const maxOffsetTop = (this.scrollerElt.scrollTop + this.scrollerElt.clientHeight) - height
        - currentDiscussionElt.clientHeight;
      let stickyComment = null;
      if (offsetTop > maxOffsetTop || maxOffsetTop < minOffsetTop) {
        stickyComment = 'bottom';
      } else if (offsetTop < minOffsetTop) {
        stickyComment = 'top';
      }
      if (store.state.discussion.stickyComment !== stickyComment) {
        store.commit('discussion/setStickyComment', stickyComment);
      }
    };

    this.scrollerElt.addEventListener('scroll', this.updateSticky);
    this.$watch(
      () => this.updateStickyTrigger,
      () => this.updateSticky(),
      { immediate: true },
    );

    // Move preview discussions once previewCtxWithDiffs has been calculated
    if (!editorSvc.previewCtxWithDiffs) {
      editorSvc.$once('previewCtxWithDiffs', () => {
        this.updateTops();
        this.updateSticky();
      });
    }
  },
  destroyed() {
    this.scrollerElt.removeEventListener('scroll', this.updateSticky);
  },
};
</script>

<style lang="scss">
@import '../../styles/variables.scss';

.comment-list {
  position: absolute;
  right: 0;
  font-size: 15px;
}

.comment--last,
.comment-list__current-discussion {
  position: absolute;
  width: 100%;
  padding-top: 10px;
}

/* use div selector to avoid collision with Prism */
div.comment {
  padding: 5px 10px 10px;
}

.comment--last {
  opacity: 0.33;
  cursor: pointer;

  * {
    pointer-events: none;
  }

  &:hover,
  &.comment--hover {
    opacity: 0.5;
  }
}

.comment__header {
  font-size: 0.75em;
  padding-bottom: 0.25em;
}

.comment__user-image {
  height: 20px;
  width: 20px;
  border-radius: $border-radius-base;
  overflow: hidden;
  margin-right: 5px;

  .comment:hover & {
    display: none;

    .sticky-comment & {
      display: block;
    }
  }

  .comment--new:hover &,
  .comment--last:hover & {
    display: block;
  }
}

.comment__remove-button {
  height: 20px;
  width: 20px;
  padding: 1px;
  color: rgba(0, 0, 0, 0.33);
  margin-right: 5px;
  display: none;

  &:active,
  &:focus,
  &:hover {
    color: rgba(0, 0, 0, 0.5);
  }

  .comment:hover & {
    display: block;

    .sticky-comment & {
      display: none;
    }
  }

  .comment--last:hover & {
    display: none;
  }
}

.comment__created {
  opacity: 0.5;
}

.comment__buttons {
  padding: 10px 5px 0;
}

.comment__button {
  padding: 0 8px;
  line-height: 28px;
  height: 28px;
}

.comment__text {
  position: relative;

  &::before {
    content: '';
    position: absolute;
    bottom: -8px;
    right: 0;
    border-top: 8px solid $editor-background-light;
    border-left: 8px solid transparent;

    .app--dark & {
      border-top-color: $editor-background-dark;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: inherit;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  ul,
  ol,
  dl {
    margin: 0.25em 0;
  }

  pre {
    font-variant-ligatures: no-common-ligatures;
    white-space: pre-wrap;
    word-break: break-word;
    word-wrap: break-word;
    caret-color: #000;
  }

  img {
    max-width: 100%;
  }

  .table-wrapper {
    max-width: 100%;
    overflow: auto;
  }
}

.comment__text-inner {
  min-height: 37px;
  max-height: 200px;
  overflow: auto;
  padding: 1px 8px;
  background-color: $editor-background-light;
  border: 1px solid transparent;
  border-radius: $border-radius-base;
  border-bottom-right-radius: 0;

  .app--dark & {
    background-color: $editor-background-dark;
  }

  .markdown-highlighting {
    padding: 5px 0;
    margin: 0;
  }
}
</style>
