import moduleTemplate from './moduleTemplate';
import empty from '../data/emptySyncedContent';

const module = moduleTemplate(empty, true);

module.getters = {
  ...module.getters,
  current: ({ itemMap }, getters, rootState, rootGetters) =>
    itemMap[`${rootGetters['file/current'].id}/syncedContent`] || empty(),
};

export default module;
