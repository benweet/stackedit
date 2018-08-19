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
  },
};
