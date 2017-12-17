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
      const workspaces = rootGetters['data/workspaces'];
      return workspaces.main;
    },
    currentWorkspace: (state, getters, rootState, rootGetters) => {
      const workspaces = rootGetters['data/workspaces'];
      return workspaces[state.currentWorkspaceId] || getters.mainWorkspace;
    },
    lastSyncActivityKey: (state, getters) => `${getters.currentWorkspace.id}/lastSyncActivity`,
    lastFocusKey: (state, getters) => `${getters.currentWorkspace.id}/lastWindowFocus`,
    mainWorkspaceToken: (state, getters, rootState, rootGetters) => {
      const googleTokens = rootGetters['data/googleTokens'];
      const loginSubs = Object.keys(googleTokens)
        .filter(sub => googleTokens[sub].isLogin);
      return googleTokens[loginSubs[0]];
    },
    syncToken: (state, getters, rootState, rootGetters) => {
      const workspace = getters.currentWorkspace;
      if (workspace.providerId === 'googleDriveWorkspace') {
        const googleTokens = rootGetters['data/googleTokens'];
        return googleTokens[workspace.sub];
      }
      return getters.mainWorkspaceToken;
    },
    loginToken: (state, getters) => getters.syncToken,
    sponsorToken: (state, getters) => getters.mainWorkspaceToken,
  },
  actions: {
    setCurrentWorkspaceId: ({ commit, getters }, value) => {
      commit('setCurrentWorkspaceId', value);
      const lastFocus = parseInt(localStorage.getItem(getters.lastFocusKey), 10) || 0;
      commit('setLastFocus', lastFocus);
    },
  },
};
