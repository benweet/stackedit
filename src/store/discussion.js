import utils from '../services/utils';
import googleHelper from '../services/providers/helpers/googleHelper';
import syncSvc from '../services/syncSvc';

const idShifter = offset => (state, getters) => {
  const ids = Object.keys(getters.currentFileDiscussions)
    .filter(id => id !== state.newDiscussionId);
  const idx = ids.indexOf(state.currentDiscussionId) + offset + ids.length;
  return ids[idx % ids.length];
};

export default {
  namespaced: true,
  state: {
    currentDiscussionId: null,
    newDiscussion: null,
    newDiscussionId: null,
    isCommenting: false,
    newCommentText: '',
    newCommentSelection: { start: 0, end: 0 },
    newCommentFocus: false,
    stickyComment: null,
  },
  mutations: {
    setCurrentDiscussionId: (state, value) => {
      if (state.currentDiscussionId !== value) {
        state.currentDiscussionId = value;
        state.isCommenting = false;
      }
    },
    setNewDiscussion: (state, value) => {
      state.newDiscussion = value;
      state.newDiscussionId = utils.uid();
      state.currentDiscussionId = state.newDiscussionId;
      state.isCommenting = true;
      state.newCommentFocus = true;
    },
    patchNewDiscussion: (state, value) => {
      Object.assign(state.newDiscussion, value);
    },
    setIsCommenting: (state, value) => {
      state.isCommenting = value;
      if (!value) {
        state.newDiscussionId = null;
      } else {
        state.newCommentFocus = true;
      }
    },
    setNewCommentText: (state, value) => {
      state.newCommentText = value || '';
    },
    setNewCommentSelection: (state, value) => {
      state.newCommentSelection = value;
    },
    setNewCommentFocus: (state, value) => {
      state.newCommentFocus = value;
    },
    setStickyComment: (state, value) => {
      state.stickyComment = value;
    },
  },
  getters: {
    newDiscussion: ({ currentDiscussionId, newDiscussionId, newDiscussion }) =>
      currentDiscussionId === newDiscussionId && newDiscussion,
    currentFileDiscussionLastComments: (state, getters, rootState, rootGetters) => {
      const { discussions, comments } = rootGetters['content/current'];
      const discussionLastComments = {};
      Object.entries(comments).forEach(([, comment]) => {
        if (discussions[comment.discussionId]) {
          const lastComment = discussionLastComments[comment.discussionId];
          if (!lastComment || lastComment.created < comment.created) {
            discussionLastComments[comment.discussionId] = comment;
          }
        }
      });
      return discussionLastComments;
    },
    currentFileDiscussions: (
      { newDiscussionId },
      { newDiscussion, currentFileDiscussionLastComments },
      rootState,
      rootGetters,
    ) => {
      const currentFileDiscussions = {};
      if (newDiscussion) {
        currentFileDiscussions[newDiscussionId] = newDiscussion;
      }
      const { discussions } = rootGetters['content/current'];
      Object.entries(currentFileDiscussionLastComments)
        .sort(([, lastComment1], [, lastComment2]) =>
          lastComment1.created - lastComment2.created)
        .forEach(([discussionId]) => {
          currentFileDiscussions[discussionId] = discussions[discussionId];
        });
      return currentFileDiscussions;
    },
    currentDiscussion: ({ currentDiscussionId }, { currentFileDiscussions }) =>
      currentFileDiscussions[currentDiscussionId],
    previousDiscussionId: idShifter(-1),
    nextDiscussionId: idShifter(1),
    currentDiscussionComments: (
      { currentDiscussionId },
      { currentDiscussion },
      rootState,
      rootGetters,
    ) => {
      const comments = {};
      if (currentDiscussion) {
        const contentComments = rootGetters['content/current'].comments;
        Object.entries(contentComments)
          .filter(([, comment]) =>
            comment.discussionId === currentDiscussionId)
          .sort(([, comment1], [, comment2]) =>
            comment1.created - comment2.created)
          .forEach(([commentId, comment]) => {
            comments[commentId] = comment;
          });
      }
      return comments;
    },
    currentDiscussionLastCommentId: (state, { currentDiscussionComments }) =>
      Object.keys(currentDiscussionComments).pop(),
    currentDiscussionLastComment: (
      state,
      { currentDiscussionComments, currentDiscussionLastCommentId },
    ) => currentDiscussionComments[currentDiscussionLastCommentId],
  },
  actions: {
    cancelNewComment({ commit, getters }) {
      commit('setIsCommenting', false);
      if (!getters.currentDiscussion) {
        commit('setCurrentDiscussionId', getters.nextDiscussionId);
      }
    },
    async createNewDiscussion({ commit, dispatch, rootGetters }, selection) {
      const loginToken = rootGetters['workspace/loginToken'];
      if (!loginToken) {
        try {
          await dispatch('modal/open', 'signInForComment', { root: true });
          await googleHelper.signin();
          syncSvc.requestSync();
          await dispatch('createNewDiscussion', selection);
        } catch (e) { /* cancel */ }
      } else if (selection) {
        let text = rootGetters['content/current'].text.slice(selection.start, selection.end).trim();
        const maxLength = 80;
        if (text.length > maxLength) {
          text = `${text.slice(0, maxLength - 1).trim()}…`;
        }
        commit('setNewDiscussion', { ...selection, text });
      }
    },
    cleanCurrentFile({
      getters,
      rootGetters,
      commit,
      dispatch,
    }, { filterComment, filterDiscussion } = {}) {
      const { discussions } = rootGetters['content/current'];
      const { comments } = rootGetters['content/current'];
      const patch = {
        discussions: {},
        comments: {},
      };
      Object.entries(comments).forEach(([commentId, comment]) => {
        const discussion = discussions[comment.discussionId];
        if (discussion && comment !== filterComment && discussion !== filterDiscussion) {
          patch.discussions[comment.discussionId] = discussion;
          patch.comments[commentId] = comment;
        }
      });

      const { nextDiscussionId } = getters;
      dispatch('content/patchCurrent', patch, { root: true });
      if (!getters.currentDiscussion) {
        // Keep the gutter open
        commit('setCurrentDiscussionId', nextDiscussionId);
      }
    },
  },
};
