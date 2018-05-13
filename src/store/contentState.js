import moduleTemplate from './moduleTemplate';
import empty from '../data/emptyContentState';

const module = moduleTemplate(empty, true);

module.getters = {
  ...module.getters,
  current: ({ itemMap }, getters, rootState, rootGetters) =>
    itemMap[`${rootGetters['file/current'].id}/contentState`] || empty(),
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
