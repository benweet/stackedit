import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    itemMap: {},
  },
  mutations: {
    addItem: (state, item) => {
      Vue.set(state.itemMap, item.id, item);
    },
  },
};
