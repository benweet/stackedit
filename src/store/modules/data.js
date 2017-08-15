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

module.getters = {
  ...module.getters,
  localSettings: getter('localSettings'),
  settings: getter('settings'),
  syncData: getter('syncData'),
  tokens: getter('tokens'),
  googleTokens: (state, getters) => getters.tokens.google || {},
  loginToken: (state, getters) => {
    const googleTokens = getters.googleTokens;
    // Return the first googleToken that has the isLogin flag
    const loginSubs = Object.keys(googleTokens)
      .filter(sub => googleTokens[sub].isLogin);
    return googleTokens[loginSubs[0]];
  },
};

const patcher = id => ({ getters, commit }, value) => commit('patchOrSetItem', {
  ...value,
  id,
});

const localSettingsToggler = propertyName => ({ getters, dispatch }, value) => dispatch('patchLocalSettings', {
  [propertyName]: value === undefined ? !getters.localSettings[propertyName] : value,
});

module.actions = {
  ...module.actions,
  patchLocalSettings: patcher('localSettings'),
  patchSyncData: patcher('syncData'),
  patchTokens: patcher('tokens'),
  setGoogleToken({ getters, dispatch }, googleToken) {
    dispatch('patchTokens', {
      google: {
        ...getters.googleTokens,
        [googleToken.sub]: googleToken,
      },
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
