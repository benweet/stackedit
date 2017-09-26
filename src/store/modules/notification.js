const itemTimeout = 5000;

export default {
  namespaced: true,
  state: {
    items: [],
  },
  mutations: {
    setItems: (state, value) => {
      state.items = value;
    },
  },
  actions: {
    info({ state, commit }, info) {
      const item = {
        type: 'info',
        content: info,
      };
      commit('setItems', [item, ...state.items]);
      setTimeout(() =>
        commit('setItems', state.items.filter(otherItem => otherItem !== item)), itemTimeout);
    },
    error({ state, commit, rootState }, error) {
      const item = {
        type: 'error',
      };
      if (error) {
        if (error.message) {
          item.content = error.message;
        } else if (error.status) {
          const location = rootState.queue.currentLocation;
          if (location.providerId) {
            item.content = `HTTP error ${error.status} on ${location.providerId} location.`;
          } else {
            item.content = `HTTP error ${error.status}.`;
          }
        } else {
          item.content = `${error}`;
        }
      }
      if (!item.content || item.content === '[object Object]') {
        item.content = 'Unknown error.';
      }
      commit('setItems', [item, ...state.items]);
      setTimeout(() =>
        commit('setItems', state.items.filter(otherItem => otherItem !== item)), itemTimeout);
    },
  },
};
