import moduleTemplate from './moduleTemplate';
import empty from '../../data/emptyFile';

const module = moduleTemplate(empty);

module.state = {
  ...module.state,
  currentId: null,
};

module.getters = {
  ...module.getters,
  current: state => state.itemMap[state.currentId] || empty(),
  itemsByUpdated: (state, getters) =>
    getters.items.slice().sort((file1, file2) => file2.updated - file1.updated),
  mostRecent: (state, getters) => getters.itemsByUpdated[0] || empty(),
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
