import utils from '../services/utils';

export default {
  namespaced: true,
  state: {
    currentWorkspaceId: null,
    lastFocus: 0,
  },
  mutations: {
    setCurrentWorkspaceId: (state, value) => {
      state.currentWorkspaceId = value;
    },
    setLastFocus: (state, value) => {
      state.lastFocus = value;
    },
  },
  getters: {
    mainWorkspace: (state, getters, rootState, rootGetters) => {
      const sanitizedWorkspacesById = rootGetters['data/sanitizedWorkspacesById'];
      return sanitizedWorkspacesById.main;
    },
    currentWorkspace: ({ currentWorkspaceId }, { mainWorkspace }, rootState, rootGetters) => {
      const sanitizedWorkspacesById = rootGetters['data/sanitizedWorkspacesById'];
      return sanitizedWorkspacesById[currentWorkspaceId] || mainWorkspace;
    },
    currentWorkspaceIsGit: (state, { currentWorkspace }) => currentWorkspace.providerId === 'githubWorkspace',
    hasUniquePaths: (state, { currentWorkspace }) =>
      currentWorkspace.providerId === 'githubWorkspace',
    lastSyncActivityKey: (state, { currentWorkspace }) => `${currentWorkspace.id}/lastSyncActivity`,
    lastFocusKey: (state, { currentWorkspace }) => `${currentWorkspace.id}/lastWindowFocus`,
    mainWorkspaceToken: (state, getters, rootState, rootGetters) => {
      const googleTokens = rootGetters['data/googleTokens'];
      const loginSubs = Object.keys(googleTokens)
        .filter(sub => googleTokens[sub].isLogin);
      return googleTokens[loginSubs[0]];
    },
    syncToken: (state, { currentWorkspace, mainWorkspaceToken }, rootState, rootGetters) => {
      switch (currentWorkspace.providerId) {
        case 'googleDriveWorkspace': {
          const googleTokens = rootGetters['data/googleTokens'];
          return googleTokens[currentWorkspace.sub];
        }
        case 'githubWorkspace': {
          const githubTokens = rootGetters['data/githubTokens'];
          return githubTokens[currentWorkspace.sub];
        }
        case 'couchdbWorkspace': {
          const couchdbTokens = rootGetters['data/couchdbTokens'];
          return couchdbTokens[currentWorkspace.id];
        }
        default:
          return mainWorkspaceToken;
      }
    },
    loginToken: (state, { currentWorkspace, mainWorkspaceToken }, rootState, rootGetters) => {
      switch (currentWorkspace.providerId) {
        case 'googleDriveWorkspace': {
          const googleTokens = rootGetters['data/googleTokens'];
          return googleTokens[currentWorkspace.sub];
        }
        case 'githubWorkspace': {
          const githubTokens = rootGetters['data/githubTokens'];
          return githubTokens[currentWorkspace.sub];
        }
        default:
          return mainWorkspaceToken;
      }
    },
    userId: (state, { loginToken }, rootState, rootGetters) => {
      if (!loginToken) {
        return null;
      }
      let prefix;
      Object.entries(utils.userIdPrefixes).some(([key, value]) => {
        if (rootGetters[`data/${value}Tokens`][loginToken.sub]) {
          prefix = key;
        }
        return prefix;
      });
      return prefix ? `${prefix}:${loginToken.sub}` : loginToken.sub;
    },
    sponsorToken: (state, { mainWorkspaceToken }) => mainWorkspaceToken,
  },
  actions: {
    setCurrentWorkspaceId: ({ commit, getters }, value) => {
      commit('setCurrentWorkspaceId', value);
      const lastFocus = parseInt(localStorage.getItem(getters.lastFocusKey), 10) || 0;
      commit('setLastFocus', lastFocus);
    },
  },
};
