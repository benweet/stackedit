
export default {
  namespaced: true,
  state: {
    itemsById: {},
  },
  mutations: {
    setItem: ({ itemsById }, item) => {
      const itemToSet = {
        ...item,
      };
      const existingItem = itemsById[item.id];
      if (existingItem) {
        if (!itemToSet.name) {
          itemToSet.name = existingItem.name;
        }
        if (!itemToSet.imageUrl) {
          itemToSet.imageUrl = existingItem.imageUrl;
        }
      }
      itemsById[item.id] = itemToSet;
    },
  },
};
