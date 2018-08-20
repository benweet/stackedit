import moduleTemplate from './moduleTemplate';
import empty from '../data/empties/emptyContentState';

const module = moduleTemplate(empty, true);

module.getters = {
  ...module.getters,
  current: ({ itemsById }, getters, rootState, rootGetters) =>
    itemsById[`${rootGetters['file/current'].id}/contentState`] || empty(),
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
