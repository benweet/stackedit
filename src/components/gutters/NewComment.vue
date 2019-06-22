<template>
  <div class="comment comment--new" @keydown.esc.stop="cancelNewComment">
    <div class="comment__header flex flex--row flex--space-between flex--align-center">
      <div class="comment__user flex flex--row flex--align-center">
        <div class="comment__user-image">
          <user-image :user-id="userId"></user-image>
        </div>
        <span class="user-name">{{loginToken.name}}</span>
      </div>
    </div>
    <div class="comment__text">
      <div class="comment__text-inner">
        <pre class="markdown-highlighting"></pre>
      </div>
    </div>
    <div class="comment__buttons flex flex--row flex--end">
      <button class="comment__button button" @click="cancelNewComment">Cancel</button>
      <button class="comment__button button" @click="addComment">Ok</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import Prism from 'prismjs';
import UserImage from '../UserImage';
import cledit from '../../services/editor/cledit';
import editorSvc from '../../services/editorSvc';
import markdownConversionSvc from '../../services/markdownConversionSvc';
import utils from '../../services/utils';
import userSvc from '../../services/userSvc';
import store from '../../store';
import badgeSvc from '../../services/badgeSvc';

export default {
  components: {
    UserImage,
  },
  computed: {
    ...mapGetters('workspace', [
      'loginToken',
    ]),
    userId() {
      return userSvc.getCurrentUserId();
    },
  },
  methods: {
    ...mapMutations('discussion', [
      'setNewCommentFocus',
    ]),
    ...mapActions('discussion', [
      'cancelNewComment',
    ]),
    addComment() {
      const text = store.state.discussion.newCommentText.trim();
      if (text.length) {
        if (text.length > 2000) {
          store.dispatch('notification/error', 'Comment is too long.');
        } else {
          // Create comment
          const discussionId = store.state.discussion.currentDiscussionId;
          const comment = {
            discussionId,
            sub: this.userId,
            text,
            created: Date.now(),
          };
          const patch = {
            comments: {
              ...store.getters['content/current'].comments,
              [utils.uid()]: comment,
            },
          };
          if (discussionId === store.state.discussion.newDiscussionId) {
            // Create discussion
            patch.discussions = {
              ...store.getters['content/current'].discussions,
              [discussionId]: store.getters['discussion/newDiscussion'],
            };
            badgeSvc.addBadge('createDiscussion');
          } else {
            badgeSvc.addBadge('addComment');
          }
          store.dispatch('content/patchCurrent', patch);
          store.commit('discussion/setNewCommentText');
          store.commit('discussion/setIsCommenting');
        }
      }
    },
  },
  mounted() {
    const preElt = this.$el.querySelector('pre.markdown-highlighting');
    const scrollerElt = this.$el.querySelector('.comment__text-inner');
    const clEditor = cledit(preElt, scrollerElt, true);
    clEditor.init({
      sectionHighlighter: section => Prism.highlight(
        section.text,
        editorSvc.prismGrammars[section.data],
      ),
      sectionParser: text => markdownConversionSvc
        .parseSections(editorSvc.converter, text).sections,
      content: store.state.discussion.newCommentText,
      selectionStart: store.state.discussion.newCommentSelection.start,
      selectionEnd: store.state.discussion.newCommentSelection.end,
      getCursorFocusRatio: () => 0.2,
    });
    clEditor.on('focus', () => this.setNewCommentFocus(true));

    // Save typed content and selection
    clEditor.on('contentChanged', value =>
      store.commit('discussion/setNewCommentText', value));
    clEditor.selectionMgr.on('selectionChanged', (start, end) =>
      store.commit('discussion/setNewCommentSelection', {
        start, end,
      }));

    const isSticky = this.$el.parentNode.classList.contains('sticky-comment');
    const isVisible = () => isSticky || store.state.discussion.stickyComment === null;

    this.$watch(
      () => store.state.discussion.currentDiscussionId,
      () => this.$nextTick(() => {
        if (isVisible() && store.state.discussion.newCommentFocus) {
          clEditor.focus();
        }
      }),
      { immediate: true },
    );

    if (isSticky) {
      let scrollerMirrorElt;
      const getScrollerMirrorElt = () => {
        if (!scrollerMirrorElt) {
          scrollerMirrorElt = document.querySelector('.comment-list .comment--new .comment__text-inner');
        }
        return scrollerMirrorElt || { scrollTop: 0 };
      };

      scrollerElt.scrollTop = getScrollerMirrorElt().scrollTop;
      scrollerElt.addEventListener('scroll', () => {
        getScrollerMirrorElt().scrollTop = scrollerElt.scrollTop;
      });
    } else {
      // Maintain the state with the sticky comment
      this.$watch(
        () => isVisible(),
        (visible) => {
          clEditor.toggleEditable(visible);
          if (visible) {
            const text = store.state.discussion.newCommentText;
            clEditor.setContent(text);
            const selection = store.state.discussion.newCommentSelection;
            clEditor.selectionMgr.setSelectionStartEnd(selection.start, selection.end);
            if (store.state.discussion.newCommentFocus) {
              clEditor.focus();
            }
          }
        },
        { immediate: true },
      );
      this.$watch(
        () => store.state.discussion.newCommentText,
        newCommentText => clEditor.setContent(newCommentText),
      );
    }
  },
};
</script>
