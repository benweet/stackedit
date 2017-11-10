import moduleTemplate from './moduleTemplate';
import empty from '../data/emptySyncedContent';

const module = moduleTemplate(empty, true);

module.getters = {
  ...module.getters,
  current: (state, getters, rootState, rootGetters) =>
    state.itemMap[`${rootGetters['file/current'].id}/syncedContent`] || empty(),
};

export default module;
