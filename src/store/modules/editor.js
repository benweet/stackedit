const setter = propertyName => (state, value) => {
  state[propertyName] = value;
};

export default {
  namespaced: true,
  state: {
    // Configuration
    inlineImages: true,
    scrollSync: true,
  },
  mutations: {
    setInlineImages: setter('inlineImages'),
    setScrollSync: setter('scrollSync'),
  },
};
