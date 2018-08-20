const setter = propertyName => (state, value) => {
  state[propertyName] = value;
};

let queue = Promise.resolve();

export default {
  namespaced: true,
  state: {
    isEmpty: true,
    isSyncRequested: false,
    isPublishRequested: false,
    currentLocation: {},
  },
  mutations: {
    setIsEmpty: setter('isEmpty'),
    setIsSyncRequested: setter('isSyncRequested'),
    setIsPublishRequested: setter('isPublishRequested'),
    setCurrentLocation: setter('currentLocation'),
  },
  actions: {
    enqueue({ state, commit, dispatch }, cb) {
      if (state.offline) {
        // No need to enqueue
        return;
      }
      const checkOffline = () => {
        if (state.offline) {
          // Empty queue
          queue = Promise.resolve();
          commit('setIsEmpty', true);
          throw new Error('offline');
        }
      };
      if (state.isEmpty) {
        commit('setIsEmpty', false);
      }
      const newQueue = queue
        .then(() => checkOffline())
        .then(() => Promise.resolve()
          .then(() => cb())
          .catch((err) => {
            console.error(err); // eslint-disable-line no-console
            checkOffline();
            dispatch('notification/error', err, { root: true });
          })
          .then(() => {
            if (newQueue === queue) {
              commit('setIsEmpty', true);
            }
          }));
      queue = newQueue;
    },
    enqueueSyncRequest({ state, commit, dispatch }, cb) {
      if (!state.isSyncRequested) {
        commit('setIsSyncRequested', true);
        const unset = () => commit('setIsSyncRequested', false);
        dispatch('enqueue', () => cb().then(unset, (err) => {
          unset();
          throw err;
        }));
      }
    },
    enqueuePublishRequest({ state, commit, dispatch }, cb) {
      if (!state.isSyncRequested) {
        commit('setIsPublishRequested', true);
        const unset = () => commit('setIsPublishRequested', false);
        dispatch('enqueue', () => cb().then(unset, (err) => {
          unset();
          throw err;
        }));
      }
    },
    async doWithLocation({ commit }, { location, action }) {
      try {
        commit('setCurrentLocation', location);
        return await action();
      } finally {
        commit('setCurrentLocation', {});
      }
    },
  },
};
