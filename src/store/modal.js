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
    config: ({ hidden, stack }) => !hidden && stack[0],
  },
  actions: {
    async open({ commit, state }, param) {
      const config = typeof param === 'object' ? { ...param } : { type: param };
      try {
        return await new Promise((resolve, reject) => {
          config.resolve = resolve;
          config.reject = reject;
          commit('setStack', [config, ...state.stack]);
        });
      } finally {
        commit('setStack', state.stack.filter((otherConfig => otherConfig !== config)));
      }
    },
    async hideUntil({ commit }, promise) {
      try {
        commit('setHidden', true);
        return await promise;
      } finally {
        commit('setHidden', false);
      }
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
      rejectText: 'Ok',
    }),
    fileRestoration: ({ dispatch }) => dispatch('open', {
      content: '<p>You are about to revert some changes. Are you sure?</p>',
      resolveText: 'Yes, revert',
      rejectText: 'No',
    }),
    unauthorizedName: ({ dispatch }, name) => dispatch('open', {
      content: `<p><b>${name}</b> is not an authorized name.</p>`,
      rejectText: 'Ok',
    }),
    stripName: ({ dispatch }, name) => dispatch('open', {
      content: `<p><b>${name}</b> contains illegal characters. Do you want to strip them?</p>`,
      resolveText: 'Yes, strip',
      rejectText: 'No',
    }),
    pathConflict: ({ dispatch }, name) => dispatch('open', {
      content: `<p><b>${name}</b> already exists. Do you want to add a suffix?</p>`,
      resolveText: 'Yes, add suffix',
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
    providerRedirection: ({ dispatch }, { providerName }) => dispatch('open', {
      content: `<p>You are about to navigate to the <b>${providerName}</b> authorization page.</p>`,
      resolveText: 'Ok, go on',
      rejectText: 'Cancel',
    }),
    workspaceGoogleRedirection: ({ dispatch }) => dispatch('open', {
      content: '<p>StackEdit needs full Google Drive access to open this workspace.</p>',
      resolveText: 'Ok, grant',
      rejectText: 'Cancel',
    }),
    signInForSponsorship: ({ dispatch }) => dispatch('open', {
      type: 'signInForSponsorship',
      content: `<p>You have to sign in with Google to sponsor.</p>
      <div class="modal__info"><b>Note:</b> This will sync your main workspace.</div>`,
      resolveText: 'Ok, sign in',
      rejectText: 'Cancel',
    }),
    signInForComment: ({ dispatch }) => dispatch('open', {
      content: `<p>You have to sign in with Google to start commenting.</p>
      <div class="modal__info"><b>Note:</b> This will sync your main workspace.</div>`,
      resolveText: 'Ok, sign in',
      rejectText: 'Cancel',
    }),
    signInForHistory: ({ dispatch }) => dispatch('open', {
      content: `<p>You have to sign in with Google to enable revision history.</p>
      <div class="modal__info"><b>Note:</b> This will sync your main workspace.</div>`,
      resolveText: 'Ok, sign in',
      rejectText: 'Cancel',
    }),
    sponsorOnly: ({ dispatch }) => dispatch('open', {
      content: '<p>This feature is restricted to sponsors as it relies on server resources.</p>',
      rejectText: 'Ok, I understand',
    }),
    paymentSuccess: ({ dispatch }) => dispatch('open', {
      content: '<p>Thank you for your payment! Your sponsorship will be active in a minute.</p>',
      rejectText: 'Ok',
    }),
  },
};
