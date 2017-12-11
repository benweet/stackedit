import utils from '../services/utils';
import googleHelper from '../services/providers/helpers/googleHelper';
import syncSvc from '../services/syncSvc';

const idShifter = offset => (state, getters) => {
  const ids = Object.keys(getters.currentFileDiscussions);
  const idx = ids.indexOf(state.currentDiscussionId) + offset + ids.length;
  return ids[idx % ids.length];
};

export default {
  namespaced: true,
  state: {
    currentWorkspaceId: null,
  },
  mutations: {
    setCurrentWorkspaceId: (state, value) => {
      state.currentWorkspaceId = value;
    },
  },
  getters: {
    currentWorkspace: (state, getters, rootState, rootGetters) => {
      const workspaces = rootGetters['data/workspaces'];
      return workspaces[state.currentWorkspaceId] || workspaces.main;
    },
    lastSyncActivityKey: (state, getters) => {
      const workspaceId = getters.currentWorkspace.id;
      return `${workspaceId}/lastSyncActivity`;
    },
    lastFocusKey: (state, getters) => {
      const workspaceId = getters.currentWorkspace.id;
      return `${workspaceId}/lastWindowFocus`;
    },
    lastFocus: (state, getters) => parseInt(localStorage.getItem(getters.lastFocusKey), 10) || 0,
  },
  actions: {
  },
};
