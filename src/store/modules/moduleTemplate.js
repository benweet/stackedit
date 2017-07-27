import Vue from 'vue';

export default () => ({
  namespaced: true,
  state: {
    itemMap: {},
  },
  getters: {},
  mutations: {
    setItem(state, item) {
      Vue.set(state.itemMap, item.id, item);
    },
    patchItem(state, patch) {
      const item = state.itemMap[patch.id];
      if (item) {
        Vue.set(state.itemMap, item.id, {
          ...item,
          ...patch,
          updated: Date.now(), // Trigger sync
        });
      }
    },
    deleteItem(state, id) {
      Vue.delete(state.itemMap, id);
    },
  },
  actions: {},
});
