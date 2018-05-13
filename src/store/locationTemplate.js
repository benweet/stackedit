import moduleTemplate from './moduleTemplate';
import providerRegistry from '../services/providers/common/providerRegistry';

const addToGroup = (groups, item) => {
  const list = groups[item.fileId] || [];
  list.push(item);
  groups[item.fileId] = list;
};

export default (empty) => {
  const module = moduleTemplate(empty);

  module.getters = {
    ...module.getters,
    groupedByFileId: (state, { items }) => {
      const groups = {};
      items.forEach(item => addToGroup(groups, item));
      return groups;
    },
    filteredGroupedByFileId: (state, { items }) => {
      const groups = {};
      items.filter((item) => {
        // Filter items that we can't use
        const provider = providerRegistry.providers[item.providerId];
        return provider && provider.getToken(item);
      }).forEach(item => addToGroup(groups, item));
      return groups;
    },
    current: (state, { filteredGroupedByFileId }, rootState, rootGetters) => {
      const locations = filteredGroupedByFileId[rootGetters['file/current'].id] || [];
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

  return module;
};
