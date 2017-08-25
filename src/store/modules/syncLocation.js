import moduleTemplate from './moduleTemplate';
import empty from '../../data/emptySyncLocation';

const module = moduleTemplate(empty);

module.getters = {
  ...module.getters,
  groupedByFileId: (state, getters) => {
    const result = {};
    getters.items.forEach((item) => {
      const list = result[item.fileId] || [];
      list.push(item);
      result[item.fileId] = list;
    });
    return result;
  },
  current: (state, getters, rootState, rootGetters) =>
    getters.groupedByFileId[rootGetters['file/current'].id] || [],
};

export default module;
