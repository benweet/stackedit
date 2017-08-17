import moduleTemplate from './moduleTemplate';
import defaultLocalSettings from '../../data/defaultLocalSettings';

const itemTemplate = (id, data = {}) => ({ id, type: 'data', data, updated: 0 });

const empty = (id) => {
  switch (id) {
    case 'localSettings':
      return itemTemplate(id, defaultLocalSettings());
    default:
      return itemTemplate(id);
  }
};
const module = moduleTemplate(empty);

const getter = id => state => (state.itemMap[id] || empty(id)).data;
const setter = id => ({ commit }, data) => commit('setItem', itemTemplate(id, data));
const patcher = id => ({ state, commit }, data) => {
  const item = state.itemMap[id] || empty(id);
  commit('patchOrSetItem', {
    ...item,
    data: {
      ...item.data,
      ...data,
    },
  });
};
const localSettingsToggler = propertyName => ({ getters, dispatch }, value) => dispatch('patchLocalSettings', {
  [propertyName]: value === undefined ? !getters.localSettings[propertyName] : value,
});

// Local settings
module.getters.localSettings = getter('localSettings');
module.actions.patchLocalSettings = patcher('localSettings');
module.actions.toggleNavigationBar = localSettingsToggler('showNavigationBar');
module.actions.toggleEditor = localSettingsToggler('showEditor');
module.actions.toggleSidePreview = localSettingsToggler('showSidePreview');
module.actions.toggleStatusBar = localSettingsToggler('showStatusBar');
module.actions.toggleSideBar = localSettingsToggler('showSideBar');
module.actions.toggleExplorer = localSettingsToggler('showExplorer');
module.actions.toggleFocusMode = localSettingsToggler('focusMode');

// Settings
module.getters.settings = getter('settings');

// Last opened
module.getters.lastOpened = getter('lastOpened');
const getLastOpenedIds = (lastOpened, rootState) => Object.keys(lastOpened)
  .filter(id => rootState.file.itemMap[id])
  .sort((id1, id2) => lastOpened[id2] - lastOpened[id1])
  .slice(0, 10);
module.getters.lastOpenedIds = (state, getters, rootState) =>
  getLastOpenedIds(getters.lastOpened, rootState);
module.actions.setLastOpenedId = ({ getters, commit, rootState }, fileId) => {
  const lastOpened = { ...getters.lastOpened };
  lastOpened[fileId] = Date.now();
  const filteredLastOpened = {};
  getLastOpenedIds(lastOpened, rootState)
    .forEach((id) => {
      filteredLastOpened[id] = lastOpened[id];
    });
  commit('setItem', itemTemplate('lastOpened', lastOpened));
};

// Sync data
module.getters.syncData = getter('syncData');
module.getters.syncDataByItemId = (state, getters) => {
  const result = {};
  const syncData = getters.syncData;
  Object.keys(syncData).forEach((id) => {
    const value = syncData[id];
    result[value.itemId] = value;
  });
  return result;
};
module.actions.patchSyncData = patcher('syncData');
module.actions.setSyncData = setter('syncData');

// Tokens
module.getters.tokens = getter('tokens');
module.getters.googleTokens = (state, getters) => getters.tokens.google || {};
module.getters.loginToken = (state, getters) => {
  // Return the first googleToken that has the isLogin flag
  const googleTokens = getters.googleTokens;
  const loginSubs = Object.keys(googleTokens)
    .filter(sub => googleTokens[sub].isLogin);
  return googleTokens[loginSubs[0]];
};
module.actions.patchTokens = patcher('tokens');
module.actions.setGoogleToken = ({ getters, dispatch }, googleToken) => {
  dispatch('patchTokens', {
    google: {
      ...getters.googleTokens,
      [googleToken.sub]: googleToken,
    },
  });
};

export default module;
