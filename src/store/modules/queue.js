const setter = propertyName => (state, value) => {
  state[propertyName] = value;
};

let queue = Promise.resolve();

export default {
  namespaced: true,
  state: {
    isEmpty: true,
    isSyncRequested: false,
  },
  mutations: {
    setIsEmpty: setter('isEmpty'),
    setIsSyncRequested: setter('isSyncRequested'),
  },
  actions: {
    enqueue({ state, commit }, cb) {
      if (state.isEmpty) {
        commit('setIsEmpty', false);
      }
      const newQueue = queue
        .then(cb)
        .catch((err) => {
          console.error(err);
        })
        .then(() => {
          if (newQueue === queue) {
            commit('setIsEmpty', true);
          }
        });
      queue = newQueue;
    },
    enqueueSyncRequest({ state, commit, dispatch }, cb) {
      if (!state.isSyncRequested) {
        commit('setIsSyncRequested', true);
        const unset = () => commit('setIsSyncRequested', false);
        dispatch('enqueue', () => cb().then(unset, unset));
      }
    },
  },
};
