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
            // Call onResolve immediately (mostly to prevent browsers from blocking popup windows)
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
    folderDeletion: ({ dispatch }, item) => dispatch('open', {
      content: `<p>You are about to delete the folder <b>${item.name}</b>. Its files will be moved to Trash. Are you sure?</p>`,
      resolveText: 'Yes, delete',
      rejectText: 'No',
    }),
    tempFileDeletion: ({ dispatch }, item) => dispatch('open', {
      content: `<p>You are about to permanently delete the temporary file <b>${item.name}</b>. Are you sure?</p>`,
      resolveText: 'Yes, delete',
      rejectText: 'No',
    }),
    tempFolderDeletion: ({ dispatch }) => dispatch('open', {
      content: '<p>You are about to permanently delete all the temporary files. Are you sure?</p>',
      resolveText: 'Yes, delete all',
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
    removeWorkspace: ({ dispatch }) => dispatch('open', {
      content: '<p>You are about to remove a workspace locally. Are you sure?</p>',
      resolveText: 'Yes, remove',
      rejectText: 'No',
    }),
    reset: ({ dispatch }) => dispatch('open', {
      content: '<p>This will clean all your workspaces locally. Are you sure?</p>',
      resolveText: 'Yes, clean',
      rejectText: 'No',
    }),
    providerRedirection: ({ dispatch }, { providerName, onResolve }) => dispatch('open', {
      content: `<p>You are about to navigate to the <b>${providerName}</b> authorization page.</p>`,
      resolveText: 'Ok, go on',
      rejectText: 'Cancel',
      onResolve,
    }),
    workspaceGoogleRedirection: ({ dispatch }, { onResolve }) => dispatch('open', {
      content: '<p>StackEdit needs full Google Drive access to open this workspace.</p>',
      resolveText: 'Ok, grant',
      rejectText: 'Cancel',
      onResolve,
    }),
    signInForSponsorship: ({ dispatch }, { onResolve }) => dispatch('open', {
      type: 'signInForSponsorship',
      content: `<p>You have to sign in with Google to sponsor.</p>
      <div class="modal__info"><b>Note:</b> This will sync your main workspace.</div>`,
      resolveText: 'Ok, sign in',
      rejectText: 'Cancel',
      onResolve,
    }),
    signInForComment: ({ dispatch }, { onResolve }) => dispatch('open', {
      content: `<p>You have to sign in with Google to start commenting.</p>
      <div class="modal__info"><b>Note:</b> This will sync your main workspace.</div>`,
      resolveText: 'Ok, sign in',
      rejectText: 'Cancel',
      onResolve,
    }),
    signInForHistory: ({ dispatch }, { onResolve }) => dispatch('open', {
      content: `<p>You have to sign in with Google to enable revision history.</p>
      <div class="modal__info"><b>Note:</b> This will sync your main workspace.</div>`,
      resolveText: 'Ok, sign in',
      rejectText: 'Cancel',
      onResolve,
    }),
    sponsorOnly: ({ dispatch }) => dispatch('open', {
      content: '<p>This feature is restricted to sponsors as it relies on server resources.</p>',
      resolveText: 'Ok, I understand',
    }),
    paymentSuccess: ({ dispatch }) => dispatch('open', {
      content: '<p>Thank you for your payment! Your sponsorship will be active in a minute.</p>',
      resolveText: 'Ok',
    }),
  },
};
