import utils from '../services/utils.js';

export default (empty, simpleHash = false) => {
  // Use Date.now() as a simple hash function, which is ok for not-synced types
  const hashFunc = simpleHash ? Date.now : item => utils.getItemHash(item);

  return {
    namespaced: true,
    state: {
      itemsById: {},
    },
    getters: {
      items: ({ itemsById }) => Object.values(itemsById),
    },
    mutations: {
      setItem(state, value) {
        const item = Object.assign(empty(value.id), value);
        if (!item.hash || !simpleHash) {
          item.hash = hashFunc(item);
        }
        state.itemsById[item.id] = item;
      },
      patchItem(state, patch) {
        const item = state.itemsById[patch.id];
        if (item) {
          Object.assign(item, patch);
          item.hash = hashFunc(item);
          state.itemsById[item.id] = item;
          return true;
        }
        return false;
      },
      deleteItem(state, id) {
        delete state.itemsById[id];
      },
    },
    actions: {},
  };
};
