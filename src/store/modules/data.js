import moduleTemplate from './moduleTemplate';
import defaultLocalSettings from '../../data/defaultLocalSettings';

const localSettingsToggler = propertyName => ({ getters, dispatch }, value) => {
  dispatch('patchLocalSettings', {
    [propertyName]: value === undefined ? !getters.localSettings[propertyName] : value,
  });
};

const module = moduleTemplate((id) => {
  switch (id) {
    case 'localSettings':
      return defaultLocalSettings();
    default:
      throw new Error(`Unknown data id ${id}`);
  }
});

module.getters = {
  ...module.getters,
  localSettings: state => state.itemMap.localSettings || defaultLocalSettings(),
};

module.actions = {
  ...module.actions,
  patchLocalSettings({ getters, commit }, value) {
    commit('patchOrSetItem', {
      ...value,
      id: 'localSettings',
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
