import moduleTemplate from './moduleTemplate';
import empty from '../data/empties/emptyContentState';

const theModule = moduleTemplate(empty, true);

theModule.getters = {
  ...theModule.getters,
  current: ({ itemsById }, getters, rootState, rootGetters) =>
    itemsById[`${rootGetters['file/current'].id}/contentState`] || empty(),
};

theModule.actions = {
  ...theModule.actions,
  patchCurrent({ getters, commit }, value) {
    commit('patchItem', {
      ...value,
      id: getters.current.id,
    });
  },
};

export default theModule;
