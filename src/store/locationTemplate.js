import moduleTemplate from './moduleTemplate';
import providerRegistry from '../services/providers/common/providerRegistry';
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
      items
        .filter((item) => {
          // Filter items that we can't use
          const provider = providerRegistry.providersById[item.providerId];
          return provider && provider.getToken(item);
        })
        .forEach(item => addToGroup(groups, item));
      return groups;
    },
    current: (state, { filteredGroupedByFileId }, rootState, rootGetters) => {
      const locations = filteredGroupedByFileId[rootGetters['file/current'].id] || [];
      return locations.map((location) => {
        const provider = providerRegistry.providersById[location.providerId];
        return {
          ...location,
          description: utils.sanitizeName(provider.getLocationDescription(location)),
          url: provider.getLocationUrl(location),
        };
      });
    },
    currentWithWorkspaceSyncLocation: (state, { current }, rootState, rootGetters) => {
      const fileId = rootGetters['file/current'].id;
      const fileSyncData = rootGetters['data/syncDataByItemId'][fileId];
      const contentSyncData = rootGetters['data/syncDataByItemId'][`${fileId}/content`];
      if (!fileSyncData || !contentSyncData) {
        return current;
      }

      // Add the workspace sync location
      const workspaceProvider = providerRegistry.providersById[
        rootGetters['workspace/currentWorkspace'].providerId];
      return [{
        id: 'main',
        providerId: workspaceProvider.id,
        fileId,
        description: utils.sanitizeName(workspaceProvider
          .getSyncDataDescription(fileSyncData, contentSyncData)),
        url: workspaceProvider.getSyncDataUrl(fileSyncData, contentSyncData),
      }, ...current];
    },
  };

  return module;
};
