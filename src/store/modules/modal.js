export default {
  namespaced: true,
  state: {
    config: null,
  },
  mutations: {
    setConfig: (state, value) => {
      state.config = value;
    },
  },
  actions: {
    open({ commit }, param) {
      return new Promise((resolve, reject) => {
        let config = param;
        if (typeof config === 'string') {
          config = {
            type: config,
          };
        }
        config.resolve = (result) => {
          if (config.onResolve) {
            config.onResolve(result);
          }
          commit('setConfig');
          resolve(result);
        };
        config.reject = (error) => {
          commit('setConfig');
          reject(error);
        };
        commit('setConfig', config);
      });
    },
    notImplemented: ({ dispatch }) => dispatch('open', {
      content: '<p>Sorry, this feature is not available yet...</p>',
      rejectText: 'Ok',
    }),
    fileDeletion: ({ dispatch }, item) => dispatch('open', {
      content: `<p>You are about to delete the file <b>${item.name}</b>. Are you sure?</p>`,
      resolveText: 'Yes, delete',
      rejectText: 'No',
    }),
    folderDeletion: ({ dispatch }, item) => dispatch('open', {
      content: `<p>You are about to delete the folder <b>${item.name}</b> and all its files. Are you sure?</p>`,
      resolveText: 'Yes, delete',
      rejectText: 'No',
    }),
    reset: ({ dispatch }) => dispatch('open', {
      content: '<p>This will clean your local files and settings. Are you sure?</p>',
      resolveText: 'Yes, clean',
      rejectText: 'No',
    }),
  },
};
