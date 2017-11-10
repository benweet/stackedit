import utils from '../services/utils';

export default {
  namespaced: true,
  state: {
    currentDiscussionId: null,
    newDiscussion: null,
    newDiscussionId: '',
  },
  mutations: {
    setCurrentDiscussionId: (state, value) => {
      state.currentDiscussionId = value;
    },
    setNewDiscussion: (state, value) => {
      state.newDiscussion = value;
      state.newDiscussionId = utils.uid();
      state.currentDiscussionId = state.newDiscussionId;
    },
    patchNewDiscussion: (state, value) => {
      Object.assign(state.newDiscussion, value);
    },
  },
  getters: {
    newDiscussion: state =>
      state.currentDiscussionId === state.newDiscussionId && state.newDiscussion,
    currentFileDiscussions: (state, getters, rootState, rootGetters) => {
      const currentContent = rootGetters['content/current'];
      const currentDiscussions = {
        ...currentContent.discussions,
      };
      const newDiscussion = getters.newDiscussion;
      if (newDiscussion) {
        currentDiscussions[state.newDiscussionId] = newDiscussion;
      }
      return currentDiscussions;
    },
    currentDiscussion: (state, getters) =>
      getters.currentFileDiscussions[state.currentDiscussionId],
  },
  actions: {
    createNewDiscussion({ commit, rootGetters }, selection) {
      if (selection) {
        let text = rootGetters['content/current'].text.slice(selection.start, selection.end).trim();
        if (text.length > 250) {
          text = `${text.slice(0, 249).trim()}…`;
        }
        commit('setNewDiscussion', { ...selection, text });
      }
    },
  },
};
