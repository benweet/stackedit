export default {
  namespaced: true,
  state: {
    type: null,
    lastOpen: 0,
    findText: '',
    replaceText: '',
  },
  mutations: {
    setType: (state, value) => {
      state.type = value;
    },
    setLastOpen: (state) => {
      state.lastOpen = Date.now();
    },
    setFindText: (state, value) => {
      state.findText = value;
    },
    setReplaceText: (state, value) => {
      state.replaceText = value;
    },
  },
  actions: {
    open({ commit }, { type, findText }) {
      commit('setType', type);
      if (findText) {
        commit('setFindText', findText);
      }
      commit('setLastOpen');
    },
  },
};
