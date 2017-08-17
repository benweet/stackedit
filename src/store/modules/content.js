import moduleTemplate from './moduleTemplate';
import empty from '../../data/emptyContent';

const module = moduleTemplate(empty);

module.getters = {
  ...module.getters,
  current: (state, getters, rootState, rootGetters) =>
    state.itemMap[`${rootGetters['file/current'].id}/content`] || empty(),
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
