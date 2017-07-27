import moduleTemplate from './moduleTemplate';
import emptyContent from '../../data/emptyContent';

const module = moduleTemplate();

module.getters = {
  ...module.getters,
  current: (state, getters, rootState, rootGetters) =>
    state.itemMap[rootGetters['files/current'].contentId] || emptyContent(),
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
