import moduleTemplate from './moduleTemplate';
import empty from '../../data/emptyPublishLocation';
import providerRegistry from '../../services/providers/providerRegistry';

const module = moduleTemplate(empty);

module.getters = {
  ...module.getters,
  groupedByFileId: (state, getters) => {
    const result = {};
    getters.items.forEach((item) => {
      // Filter items that we can't use
      if (providerRegistry.providers[item.providerId].getToken(item)) {
        const list = result[item.fileId] || [];
        list.push(item);
        result[item.fileId] = list;
      }
    });
    return result;
  },
  current: (state, getters, rootState, rootGetters) => {
    const locations = getters.groupedByFileId[rootGetters['file/current'].id] || [];
    return locations.map((location) => {
      const provider = providerRegistry.providers[location.providerId];
      return {
        ...location,
        description: provider.getDescription(location),
        url: provider.getUrl(location),
      };
    });
  },
};

export default module;
