import utils from '../services/utils';
import providerRegistry from '../services/providers/common/providerRegistry';

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
    workspacesById: (state, getters, rootState, rootGetters) => {
      const workspacesById = {};
      const mainWorkspaceToken = rootGetters['workspace/mainWorkspaceToken'];
      Object.entries(rootGetters['data/workspaces']).forEach(([id, workspace]) => {
        const sanitizedWorkspace = {
          id,
          providerId: mainWorkspaceToken && 'googleDriveAppData',
          sub: mainWorkspaceToken && mainWorkspaceToken.sub,
          ...workspace,
        };
        // Filter workspaces that don't have a provider
        const workspaceProvider = providerRegistry.providersById[sanitizedWorkspace.providerId];
        if (workspaceProvider) {
          // Rebuild the url with the current hostname
          const params = workspaceProvider.getWorkspaceParams(sanitizedWorkspace);
          sanitizedWorkspace.url = utils.addQueryParams('app', params, true);
          sanitizedWorkspace.locationUrl = workspaceProvider
            .getWorkspaceLocationUrl(sanitizedWorkspace);
          workspacesById[id] = sanitizedWorkspace;
        }
      });
      return workspacesById;
    },
    mainWorkspace: (state, { workspacesById }) => workspacesById.main,
    currentWorkspace: ({ currentWorkspaceId }, { workspacesById, mainWorkspace }) =>
      workspacesById[currentWorkspaceId] || mainWorkspace,
    currentWorkspaceIsGit: (state, { currentWorkspace }) =>
      currentWorkspace.providerId === 'githubWorkspace',
    currentWorkspaceHasUniquePaths: (state, { currentWorkspace }) =>
      currentWorkspace.providerId === 'githubWorkspace',
    lastSyncActivityKey: (state, { currentWorkspace }) => `${currentWorkspace.id}/lastSyncActivity`,
    lastFocusKey: (state, { currentWorkspace }) => `${currentWorkspace.id}/lastWindowFocus`,
    mainWorkspaceToken: (state, getters, rootState, rootGetters) =>
      utils.someResult(Object.values(rootGetters['data/googleTokensBySub']), (token) => {
        if (token.isLogin) {
          return token;
        }
        return null;
      }),
    syncToken: (state, { currentWorkspace, mainWorkspaceToken }, rootState, rootGetters) => {
      switch (currentWorkspace.providerId) {
        case 'googleDriveWorkspace':
          return rootGetters['data/googleTokensBySub'][currentWorkspace.sub];
        case 'githubWorkspace':
          return rootGetters['data/githubTokensBySub'][currentWorkspace.sub];
        case 'couchdbWorkspace':
          return rootGetters['data/couchdbTokensBySub'][currentWorkspace.id];
        default:
          return mainWorkspaceToken;
      }
    },
    loginToken: (state, { currentWorkspace, mainWorkspaceToken }, rootState, rootGetters) => {
      switch (currentWorkspace.providerId) {
        case 'googleDriveWorkspace':
          return rootGetters['data/googleTokensBySub'][currentWorkspace.sub];
        case 'githubWorkspace':
          return rootGetters['data/githubTokensBySub'][currentWorkspace.sub];
        default:
          return mainWorkspaceToken;
      }
    },
    userId: (state, { loginToken }, rootState, rootGetters) => {
      if (!loginToken) {
        return null;
      }
      const prefix = utils.someResult(Object.entries(utils.userIdPrefixes), ([key, value]) => {
        if (rootGetters[`data/${value}TokensBySub`][loginToken.sub]) {
          return key;
        }
        return null;
      });
      return prefix ? `${prefix}:${loginToken.sub}` : loginToken.sub;
    },
    sponsorToken: (state, { mainWorkspaceToken }) => mainWorkspaceToken,
  },
  actions: {
    removeWorkspace: ({ commit, rootGetters }, id) => {
      const workspaces = {
        ...rootGetters['data/workspaces'],
      };
      delete workspaces[id];
      commit(
        'data/setItem',
        { id: 'workspaces', data: workspaces },
        { root: true },
      );
    },
    patchWorkspacesById: ({ commit, rootGetters }, workspaces) => {
      const sanitizedWorkspaces = {};
      Object
        .values({
          ...rootGetters['data/workspaces'],
          ...workspaces,
        })
        .forEach((workspace) => {
          sanitizedWorkspaces[workspace.id] = {
            ...workspace,
            // Do not store urls
            url: undefined,
            locationUrl: undefined,
          };
        });
      commit(
        'data/setItem',
        { id: 'workspaces', data: sanitizedWorkspaces },
        { root: true },
      );
    },
    setCurrentWorkspaceId: ({ commit, getters }, value) => {
      commit('setCurrentWorkspaceId', value);
      const lastFocus = parseInt(localStorage.getItem(getters.lastFocusKey), 10) || 0;
      commit('setLastFocus', lastFocus);
    },
  },
};
