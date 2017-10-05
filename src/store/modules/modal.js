export default {
  namespaced: true,
  state: {
    stack: [],
    hidden: false,
  },
  mutations: {
    setStack: (state, value) => {
      state.stack = value;
    },
    setHidden: (state, value) => {
      state.hidden = value;
    },
  },
  getters: {
    config: state => !state.hidden && state.stack[0],
  },
  actions: {
    open({ commit, state }, param) {
      return new Promise((resolve, reject) => {
        const config = typeof param === 'object' ? { ...param } : { type: param };
        const clean = () => commit('setStack', state.stack.filter((otherConfig => otherConfig !== config)));
        config.resolve = (result) => {
          clean();
          if (config.onResolve) {
            config.onResolve(result)
              .then(res => resolve(res));
          } else {
            resolve(result);
          }
        };
        config.reject = (error) => {
          clean();
          reject(error);
        };
        commit('setStack', [config, ...state.stack]);
      });
    },
    hideUntil({ commit, state }, promise) {
      commit('setHidden', true);
      return promise.then((res) => {
        commit('setHidden', false);
        return res;
      }, (err) => {
        commit('setHidden', false);
        throw err;
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
    trashDeletion: ({ dispatch }) => dispatch('open', {
      content: '<p>Files in the trash are automatically deleted after 7 days of inactivity.</p>',
      resolveText: 'Ok',
    }),
    reset: ({ dispatch }) => dispatch('open', {
      content: '<p>This will clean your local files and settings. Are you sure?</p>',
      resolveText: 'Yes, clean',
      rejectText: 'No',
    }),
    providerRedirection: ({ dispatch }, { providerName, onResolve }) => dispatch('open', {
      content: `<p>You are about to navigate to the <b>${providerName}</b> authorization page.</p>`,
      resolveText: 'Ok, go on!',
      rejectText: 'Cancel',
      onResolve,
    }),
  },
};
