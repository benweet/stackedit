import Vue from 'vue';
import utils from '../../services/utils';

export default empty => ({
  namespaced: true,
  state: {
    itemMap: {},
  },
  getters: {
    items: state => Object.keys(state.itemMap).map(key => state.itemMap[key]),
  },
  mutations: {
    setItem(state, value) {
      const item = Object.assign(empty(), value);
      if (!item.id) {
        item.id = utils.uid();
      }
      if (!item.updated) {
        item.updated = Date.now();
      }
      Vue.set(state.itemMap, item.id, item);
    },
    patchItem(state, patch) {
      const item = state.itemMap[patch.id];
      if (item) {
        Object.assign(item, patch);
        item.updated = Date.now(); // Trigger sync
        Vue.set(state.itemMap, item.id, item);
      }
    },
    deleteItem(state, id) {
      Vue.delete(state.itemMap, id);
    },
  },
  actions: {},
});
