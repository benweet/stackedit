import moduleTemplate from './moduleTemplate';
import empty from '../data/empties/emptyFile';

const module = moduleTemplate(empty);

module.state = {
  ...module.state,
  assetList: [],
};

module.getters = {
  ...module.getters,
  assetList: state => state.assetList,
};

module.mutations = {
  ...module.mutations,
  setAssetList(state, value) {
    state.assetList = value;
  },
};

module.actions = {
  ...module.actions,
};

export default module;
