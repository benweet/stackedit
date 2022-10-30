import moduleTemplate from './moduleTemplate.js';
import empty from '../data/empties/emptySyncedContent.js';

const module = moduleTemplate(empty, true);

module.getters = {
  ...module.getters,
  current: ({ itemsById }, getters, rootState, rootGetters) =>
    itemsById[`${rootGetters['file/current'].id}/syncedContent`] || empty(),
};

export default module;
