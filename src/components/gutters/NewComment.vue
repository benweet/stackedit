<template>
  <div class="comment comment--new" @keyup.esc="setIsCommenting(false)">
    <div class="comment__header flex flex--row flex--space-between flex--align-center">
      <div class="comment__user flex flex--row flex--align-center">
        <div class="comment__user-image">
          <user-image :user-id="loginToken.sub"></user-image>
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
      <button class="comment__button button" @click="setIsCommenting(false)">Cancel</button>
      <button class="comment__button button" @click="addComment">Ok</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import Prism from 'prismjs';
import UserImage from '../UserImage';
import cledit from '../../libs/cledit';
import editorSvc from '../../services/editorSvc';
import markdownConversionSvc from '../../services/markdownConversionSvc';
import utils from '../../services/utils';

export default {
  components: {
    UserImage,
  },
  computed: mapGetters('data', [
    'loginToken',
  ]),
  methods: {
    ...mapMutations('discussion', [
      'setIsCommenting',
      'setNewCommentFocus',
    ]),
    addComment() {
      const text = this.$store.state.discussion.newCommentText.trim();
      if (text.length) {
        if (text.length > 2000) {
          this.$store.dispatch('notification/error', 'Comment is too long.');
        } else {
          // Create comment
          const discussionId = this.$store.state.discussion.currentDiscussionId;
          const comment = {
            discussionId,
            sub: this.loginToken.sub,
            text,
            created: Date.now(),
          };
          const patch = {
            comments: {
              ...this.$store.getters['content/current'].comments,
              [utils.uid()]: comment,
            },
          };
          // Create discussion
          if (discussionId === this.$store.state.discussion.newDiscussionId) {
            patch.discussions = {
              ...this.$store.getters['content/current'].discussions,
              [discussionId]: this.$store.getters['discussion/newDiscussion'],
            };
          }
          this.$store.dispatch('content/patchCurrent', patch);
          this.$store.commit('discussion/setNewCommentText');
          this.$store.commit('discussion/setIsCommenting');
        }
      }
    },
  },
  mounted() {
    const preElt = this.$el.querySelector('pre.markdown-highlighting');
    const scrollerElt = this.$el.querySelector('.comment__text-inner');
    const clEditor = cledit(preElt, scrollerElt);
    clEditor.init({
      sectionHighlighter: section => Prism.highlight(
        section.text, editorSvc.prismGrammars[section.data]),
      sectionParser: text => markdownConversionSvc.parseSections(
        editorSvc.converter, text).sections,
      content: this.$store.state.discussion.newCommentText,
      selectionStart: this.$store.state.discussion.newCommentSelection.start,
      selectionEnd: this.$store.state.discussion.newCommentSelection.end,
      getCursorFocusRatio: () => 0.2,
    });
    clEditor.on('focus', () => this.setNewCommentFocus(true));

    // Save typed content and selection
    clEditor.on('contentChanged', value =>
      this.$store.commit('discussion/setNewCommentText', value));
    clEditor.selectionMgr.on('selectionChanged', (start, end) =>
      this.$store.commit('discussion/setNewCommentSelection', {
        start, end,
      }));

    this.$watch(
      () => this.$store.state.discussion.currentDiscussionId,
      () => this.$nextTick(() => {
        if (this.$store.state.discussion.newCommentFocus) {
          clEditor.focus();
        }
      }),
      { immediate: true });

    const isSticky = this.$el.parentNode.classList.contains('sticky-comment');
    if (isSticky) {
      let scrollerMirrorElt;
      const getScrollerMirrorElt = () => {
        if (!scrollerMirrorElt) {
          scrollerMirrorElt = document.querySelector(
            '.comment-list .comment--new .comment__text-inner');
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
        () => this.$store.state.discussion.stickyComment === null,
        (isVisible) => {
          clEditor.toggleEditable(isVisible);
          if (isVisible) {
            const text = this.$store.state.discussion.newCommentText;
            clEditor.setContent(text);
            const selection = this.$store.state.discussion.newCommentSelection;
            clEditor.selectionMgr.setSelectionStartEnd(selection.start, selection.end);
            if (this.$store.state.discussion.newCommentFocus) {
              clEditor.focus();
            }
          }
        },
        { immediate: true },
      );
      this.$watch(
        () => this.$store.state.discussion.newCommentText,
          newCommentText => clEditor.setContent(newCommentText),
      );
    }
  },
};
</script>
