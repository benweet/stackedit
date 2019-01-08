import moduleTemplate from './moduleTemplate';
import empty from '../data/empties/emptyFile';

const theModule = moduleTemplate(empty);

theModule.state = {
  ...theModule.state,
  currentId: null,
};

theModule.getters = {
  ...theModule.getters,
  current: ({ itemsById, currentId }) => itemsById[currentId] || empty(),
  isCurrentTemp: (state, { current }) => current.parentId === 'temp',
  lastOpened: ({ itemsById }, { items }, rootState, rootGetters) =>
    itemsById[rootGetters['data/lastOpenedIds'][0]] || items[0] || empty(),
};

theModule.mutations = {
  ...theModule.mutations,
  setCurrentId(state, value) {
    state.currentId = value;
  },
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
