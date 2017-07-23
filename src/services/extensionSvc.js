const getOptionsListeners = [];
const initConverterListeners = [];
const sectionPreviewListeners = [];
const asyncPreviewListeners = [];

export default {
  onGetOptions(listener) {
    getOptionsListeners.push(listener);
  },

  onInitConverter(priority, listener) {
    initConverterListeners[priority] = listener;
  },

  onSectionPreview(listener) {
    sectionPreviewListeners.push(listener);
  },

  onAsyncPreview(listener) {
    asyncPreviewListeners.push(listener);
  },

  getOptions(properties, isCurrentFile) {
    return getOptionsListeners.reduce((options, listener) => {
      listener(options, properties, isCurrentFile);
      return options;
    }, {});
  },

  initConverter(markdown, options, isCurrentFile) {
    // Use forEach as it's a sparsed array
    initConverterListeners.forEach((listener) => {
      listener(markdown, options, isCurrentFile);
    });
  },

  sectionPreview(elt, options) {
    sectionPreviewListeners.forEach((listener) => {
      listener(elt, options);
    });
  },

  asyncPreview(options) {
    return Promise.all(asyncPreviewListeners.map(listener => listener(options)));
  },
};
