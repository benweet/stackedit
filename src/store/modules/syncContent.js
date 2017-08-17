import moduleTemplate from './moduleTemplate';
import empty from '../../data/emptySyncContent';

const module = moduleTemplate(empty);

module.getters = {
  ...module.getters,
  current: (state, getters, rootState, rootGetters) =>
    state.itemMap[`${rootGetters['file/current'].id}/syncContent`] || empty(),
};

export default module;
