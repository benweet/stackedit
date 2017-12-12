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
    discussionDeletion: ({ dispatch }) => dispatch('open', {
      content: '<p>You are about to delete a discussion. Are you sure?</p>',
      resolveText: 'Yes, delete',
      rejectText: 'No',
    }),
    commentDeletion: ({ dispatch }) => dispatch('open', {
      content: '<p>You are about to delete a comment. Are you sure?</p>',
      resolveText: 'Yes, delete',
      rejectText: 'No',
    }),
    trashDeletion: ({ dispatch }) => dispatch('open', {
      content: '<p>Files in the trash are automatically deleted after 7 days of inactivity.</p>',
      resolveText: 'Ok',
    }),
    fileRestoration: ({ dispatch }) => dispatch('open', {
      content: '<p>You are about to revert some changes. Are you sure?</p>',
      resolveText: 'Yes, revert',
      rejectText: 'No',
    }),
    reset: ({ dispatch }) => dispatch('open', {
      content: '<p>This will clean your local files and settings. Are you sure?</p>',
      resolveText: 'Yes, clean',
      rejectText: 'No',
    }),
    providerRedirection: ({ dispatch }, { providerName, onResolve }) => dispatch('open', {
      content: `<p>You are about to navigate to the <b>${providerName}</b> authorization page.</p>`,
      resolveText: 'Ok, go on',
      rejectText: 'Cancel',
      onResolve,
    }),
    signInForSponsorship: ({ dispatch }) => dispatch('open', {
      type: 'signInForSponsorship',
      content: `<p>You have to sign in with Google to enable your sponsorship.</p>
      <div class="modal__info"><b>Note:</b> This will sync all your files and settings.</div>`,
      resolveText: 'Ok, sign in',
      rejectText: 'Cancel',
    }),
    signInForComment: ({ dispatch }) => dispatch('open', {
      content: `<p>You have to sign in with Google to start commenting.</p>
      <div class="modal__info"><b>Note:</b> This will sync all your files and settings.</div>`,
      resolveText: 'Ok, sign in',
      rejectText: 'Cancel',
    }),
    signInForHistory: ({ dispatch }) => dispatch('open', {
      content: `<p>You have to sign in with Google to enable revision history.</p>
      <div class="modal__info"><b>Note:</b> This will sync all your files and settings.</div>`,
      resolveText: 'Ok, sign in',
      rejectText: 'Cancel',
    }),
    sponsorOnly: ({ dispatch }) => dispatch('open', {
      content: '<p>This feature is restricted to <b>sponsor users</b> as it relies on server resources.</p>',
      resolveText: 'Ok, I understand',
    }),
    paymentSuccess: ({ dispatch }) => dispatch('open', {
      content: '<p>Thank you for your payment! Your sponsorship will be active in a minute.</p>',
      resolveText: 'Ok',
    }),
    exportMd: ({ dispatch }) => dispatch('open', {
      type: 'exportMd',
    }),
  },
};
