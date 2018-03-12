import moduleTemplate from './moduleTemplate';
import empty from '../data/emptyFile';

const module = moduleTemplate(empty);

module.state = {
  ...module.state,
  currentId: null,
};

module.getters = {
  ...module.getters,
  current: state => state.itemMap[state.currentId] || empty(),
  isCurrentTemp: (state, getters) => getters.current.parentId === 'temp',
  lastOpened: (state, getters, rootState, rootGetters) =>
    state.itemMap[rootGetters['data/lastOpenedIds'][0]] || getters.items[0] || empty(),
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
