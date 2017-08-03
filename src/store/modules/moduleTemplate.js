import Vue from 'vue';

export default (empty) => {
  function setItem(state, value) {
    const item = Object.assign(empty(value.id), value);
    if (!item.updated) {
      item.updated = Date.now();
    }
    Vue.set(state.itemMap, item.id, item);
  }

  function patchItem(state, patch) {
    const item = state.itemMap[patch.id];
    if (item) {
      Object.assign(item, patch);
      item.updated = Date.now(); // Trigger sync
      Vue.set(state.itemMap, item.id, item);
      return true;
    }
    return false;
  }

  return {
    namespaced: true,
    state: {
      itemMap: {},
    },
    getters: {
      items: state => Object.keys(state.itemMap).map(key => state.itemMap[key]),
    },
    mutations: {
      setItem,
      patchItem,
      patchOrSetItem(state, patch) {
        if (!patchItem(state, patch)) {
          setItem(state, patch);
        }
      },
      deleteItem(state, id) {
        Vue.delete(state.itemMap, id);
      },
    },
    actions: {},
  };
};
