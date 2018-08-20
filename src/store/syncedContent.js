import moduleTemplate from './moduleTemplate';
import empty from '../data/empties/emptySyncedContent';

const module = moduleTemplate(empty, true);

module.getters = {
  ...module.getters,
  current: ({ itemsById }, getters, rootState, rootGetters) =>
    itemsById[`${rootGetters['file/current'].id}/syncedContent`] || empty(),
};

export default module;
