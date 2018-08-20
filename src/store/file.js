import moduleTemplate from './moduleTemplate';
import empty from '../data/empties/emptyFile';

const module = moduleTemplate(empty);

module.state = {
  ...module.state,
  currentId: null,
};

module.getters = {
  ...module.getters,
  current: ({ itemsById, currentId }) => itemsById[currentId] || empty(),
  isCurrentTemp: (state, { current }) => current.parentId === 'temp',
  lastOpened: ({ itemsById }, { items }, rootState, rootGetters) =>
    itemsById[rootGetters['data/lastOpenedIds'][0]] || items[0] || empty(),
};

module.mutations = {
  ...module.mutations,
  setCurrentId(state, value) {
    state.currentId = value;
  },
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
