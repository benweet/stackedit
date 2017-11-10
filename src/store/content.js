import moduleTemplate from './moduleTemplate';
import empty from '../data/emptyContent';
import utils from '../services/utils';

const module = moduleTemplate(empty);

module.getters = {
  ...module.getters,
  current: (state, getters, rootState, rootGetters) =>
    state.itemMap[`${rootGetters['file/current'].id}/content`] || empty(),
  currentProperties: (state, getters) => utils.computeProperties(getters.current.properties),
};

module.actions = {
  ...module.actions,
  patchCurrent({ getters, commit }, value) {
    commit('patchItem', {
      ...value,
      id: getters.current.id,
    });
  },
};

export default module;
