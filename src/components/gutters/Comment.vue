<template>
  <div class="comment">
    <div class="comment__header flex flex--row flex--space-between flex--align-center">
      <div class="comment__user flex flex--row flex--align-center">
        <div class="comment__user-image">
          <user-image :user-id="comment.sub"></user-image>
        </div>
        <button class="comment__remove-button button" v-title="'Remove comment'" @click="removeComment">
          <icon-delete></icon-delete>
        </button>
        <user-name :user-id="comment.sub"></user-name>
      </div>
      <div class="comment__created">{{comment.created | formatTime}}</div>
    </div>
    <div class="comment__text">
      <div class="comment__text-inner" v-html="text"></div>
    </div>
    <div class="comment__buttons flex flex--row flex--end" v-if="showReply">
      <button class="comment__button button" @click="setIsCommenting(true)">Reply</button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import UserImage from '../UserImage';
import UserName from '../UserName';
import editorSvc from '../../services/editorSvc';
import htmlSanitizer from '../../libs/htmlSanitizer';
import store from '../../store';
import badgeSvc from '../../services/badgeSvc';

export default {
  components: {
    UserImage,
    UserName,
  },
  props: ['comment'],
  computed: {
    showReply() {
      return this.comment === store.getters['discussion/currentDiscussionLastComment'] &&
        !store.state.discussion.isCommenting;
    },
    text() {
      return htmlSanitizer.sanitizeHtml(editorSvc.converter.render(this.comment.text));
    },
  },
  methods: {
    ...mapMutations('discussion', [
      'setIsCommenting',
    ]),
    async removeComment() {
      try {
        await store.dispatch('modal/open', 'commentDeletion');
        store.dispatch('discussion/cleanCurrentFile', { filterComment: this.comment });
        badgeSvc.addBadge('removeComment');
      } catch (e) {
        // Cancel
      }
    },
  },
  mounted() {
    const isSticky = this.$el.parentNode.classList.contains('sticky-comment');
    if (isSticky) {
      const commentId = store.getters['discussion/currentDiscussionLastCommentId'];
      const scrollerElt = this.$el.querySelector('.comment__text-inner');

      let scrollerMirrorElt;
      const getScrollerMirrorElt = () => {
        if (!scrollerMirrorElt) {
          scrollerMirrorElt = document.querySelector(`.comment-list .comment--${commentId} .comment__text-inner`);
        }
        return scrollerMirrorElt || { scrollTop: 0 };
      };

      scrollerElt.scrollTop = getScrollerMirrorElt().scrollTop;
      scrollerElt.addEventListener('scroll', () => {
        getScrollerMirrorElt().scrollTop = scrollerElt.scrollTop;
      });
    }
  },
};
</script>
