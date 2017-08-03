const confirmButtons = yesText => [{
  text: 'No',
}, {
  text: yesText || 'Yes',
  resolve: true,
}];

export default {
  namespaced: true,
  state: {
    content: null,
  },
  mutations: {
    setContent: (state, value) => {
      state.content = value;
    },
  },
  actions: {
    open({ commit }, content) {
      return new Promise((resolve, reject) => {
        if (!content.buttons) {
          content.buttons = [{
            text: 'OK',
            resolve: true,
          }];
        }
        content.buttons.forEach((button) => {
          button.onClick = () => {
            commit('setContent');
            if (button.resolve) {
              resolve(button.resolve);
            } else {
              reject();
            }
          };
        });
        commit('setContent', content);
      });
    },
    fileDeletion: ({ dispatch }, item) => dispatch('open', {
      text: `<p>You are about to delete the file <b>${item.name}</b>. Are you sure ?</p>`,
      buttons: confirmButtons('Yes, delete'),
    }),
    folderDeletion: ({ dispatch }, item) => dispatch('open', {
      text: `<p>You are about to delete the folder <b>${item.name}</b> and all its files. Are you sure ?</p>`,
      buttons: confirmButtons('Yes, delete'),
    }),
  },
};
