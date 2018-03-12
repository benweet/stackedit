import Vue from 'vue';
import utils from '../services/utils';

export default (empty, simpleHash = false) => {
  // Use Date.now() as a simple hash function, which is ok for not-synced types
  const hashFunc = simpleHash ? Date.now : item => utils.hash(utils.serializeObject({
    ...item,
    hash: undefined,
  }));

  return {
    namespaced: true,
    state: {
      itemMap: {},
    },
    getters: {
      items: state => Object.entries(state.itemMap).map(([, item]) => item),
    },
    mutations: {
      setItem(state, value) {
        const item = Object.assign(empty(value.id), value);
        if (!item.hash) {
          item.hash = hashFunc(item);
        }
        Vue.set(state.itemMap, item.id, item);
      },
      patchItem(state, patch) {
        const item = state.itemMap[patch.id];
        if (item) {
          Object.assign(item, patch);
          item.hash = hashFunc(item);
          Vue.set(state.itemMap, item.id, item);
          return true;
        }
        return false;
      },
      deleteItem(state, id) {
        Vue.delete(state.itemMap, id);
      },
    },
    actions: {},
  };
};
