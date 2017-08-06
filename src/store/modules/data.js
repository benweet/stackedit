import moduleTemplate from './moduleTemplate';
import defaultLocalSettings from '../../data/defaultLocalSettings';

const empty = (id) => {
  switch (id) {
    case 'localSettings':
      return defaultLocalSettings();
    default:
      return { id, updated: 0 };
  }
};
const module = moduleTemplate(empty);

const getter = id => state => state.itemMap[id] || empty(id);

const localSettingsToggler = propertyName => ({ getters, dispatch }, value) => {
  dispatch('patchLocalSettings', {
    [propertyName]: value === undefined ? !getters.localSettings[propertyName] : value,
  });
};

module.getters = {
  ...module.getters,
  localSettings: getter('localSettings'),
  tokens: getter('tokens'),
};

module.actions = {
  ...module.actions,
  patchLocalSettings({ getters, commit }, value) {
    commit('patchOrSetItem', {
      ...value,
      id: 'localSettings',
    });
  },
  patchTokens({ getters, commit }, value) {
    commit('patchOrSetItem', {
      ...value,
      id: 'tokens',
    });
  },
  toggleNavigationBar: localSettingsToggler('showNavigationBar'),
  toggleEditor: localSettingsToggler('showEditor'),
  toggleSidePreview: localSettingsToggler('showSidePreview'),
  toggleStatusBar: localSettingsToggler('showStatusBar'),
  toggleSideBar: localSettingsToggler('showSideBar'),
  toggleExplorer: localSettingsToggler('showExplorer'),
  toggleFocusMode: localSettingsToggler('focusMode'),
};

export default module;
