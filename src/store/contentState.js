import moduleTemplate from './moduleTemplate.js';
import empty from '../data/empties/emptyContentState.js';

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
