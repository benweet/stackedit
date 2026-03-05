import moduleTemplate from './moduleTemplate';
import utils from '../services/utils';

const addToGroup = (groups, item) => {
  const list = groups[item.fileId];
  if (!list) {
    groups[item.fileId] = [item];
  } else {
    list.push(item);
  }
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
    groupedByFileIdAndHash: (state, { items }) => {
      const fileIdGroups = {};
      items.forEach((item) => {
        let hashGroups = fileIdGroups[item.fileId];
        if (!hashGroups) {
          hashGroups = {};
          fileIdGroups[item.fileId] = hashGroups;
        }
        const list = hashGroups[item.hash];
        if (!list) {
          hashGroups[item.hash] = [item];
        } else {
          list.push(item);
        }
      });
      return fileIdGroups;
    },
    filteredGroupedByFileId: (state, { items }) => {
      const groups = {};
      items.forEach(item => addToGroup(groups, item));
      return groups;
    },
    current: (state, { filteredGroupedByFileId }, rootState, rootGetters) => {
      const locations = filteredGroupedByFileId[rootGetters['file/current'].id] || [];
      return locations.map(location => ({
        ...location,
        description: utils.sanitizeName(location.providerId),
        url: null,
      }));
    },
    currentWithWorkspaceSyncLocation: (state, { current }) => current,
  };

  return module;
};
