import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    itemMap: {},
  },
  mutations: {
    addItem: ({ itemMap }, item) => {
      Vue.set(itemMap, item.id, item);
    },
  },
};
