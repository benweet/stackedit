import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    itemsById: {},
  },
  mutations: {
    addItem: ({ itemsById }, item) => {
      Vue.set(itemsById, item.id, item);
    },
  },
};
