import Vue from 'vue';
import yaml from 'js-yaml';
import moduleTemplate from './moduleTemplate';
import utils from '../services/utils';
import defaultSettings from '../data/defaultSettings.yml';
import defaultLocalSettings from '../data/defaultLocalSettings';
import plainHtmlTemplate from '../data/plainHtmlTemplate.html';
import styledHtmlTemplate from '../data/styledHtmlTemplate.html';
import styledHtmlWithTocTemplate from '../data/styledHtmlWithTocTemplate.html';
import jekyllSiteTemplate from '../data/jekyllSiteTemplate.html';

const itemTemplate = (id, data = {}) => ({ id, type: 'data', data, hash: 0 });

const empty = (id) => {
  switch (id) {
    case 'settings':
      return itemTemplate(id, '\n');
    case 'localSettings':
      return itemTemplate(id, defaultLocalSettings());
    default:
      return itemTemplate(id);
  }
};
const module = moduleTemplate(empty, true);

module.mutations.setItem = (state, value) => {
  const emptyItem = empty(value.id);
  const data = typeof value.data === 'object'
    ? Object.assign(emptyItem.data, value.data)
    : value.data;
  const item = {
    ...emptyItem,
    data,
  };
  item.hash = utils.hash(utils.serializeObject({
    ...item,
    hash: undefined,
  }));
  Vue.set(state.itemMap, item.id, item);
};

const getter = id => state => (state.itemMap[id] || empty(id)).data;
const setter = id => ({ commit }, data) => commit('setItem', itemTemplate(id, data));
const patcher = id => ({ state, commit }, data) => {
  const item = Object.assign(empty(id), state.itemMap[id]);
  commit('setItem', {
    ...empty(id),
    data: typeof data === 'object' ? {
      ...item.data,
      ...data,
    } : data,
  });
};

// Local settings
module.getters.localSettings = getter('localSettings');
module.actions.patchLocalSettings = patcher('localSettings');
const localSettingsToggler = propertyName => ({ getters, dispatch }, value) => dispatch('patchLocalSettings', {
  [propertyName]: value === undefined ? !getters.localSettings[propertyName] : value,
});
module.actions.toggleNavigationBar = localSettingsToggler('showNavigationBar');
module.actions.toggleEditor = localSettingsToggler('showEditor');
module.actions.toggleSidePreview = localSettingsToggler('showSidePreview');
module.actions.toggleStatusBar = localSettingsToggler('showStatusBar');
module.actions.toggleScrollSync = localSettingsToggler('scrollSync');
module.actions.toggleFocusMode = localSettingsToggler('focusMode');
const notEnoughSpace = (getters) => {
  const constants = getters['layout/constants'];
  const showGutter = getters['discussion/currentDiscussion'];
  return document.body.clientWidth < constants.editorMinWidth +
    constants.explorerWidth +
    constants.sideBarWidth +
    constants.buttonBarWidth +
    (showGutter ? constants.gutterWidth : 0);
};
module.actions.toggleSideBar = ({ commit, getters, dispatch, rootGetters }, value) => {
  // Reset side bar
  dispatch('setSideBarPanel');
  // Close explorer if not enough space
  const patch = {
    showSideBar: value === undefined ? !getters.localSettings.showSideBar : value,
  };
  if (patch.showSideBar && notEnoughSpace(rootGetters)) {
    patch.showExplorer = false;
  }
  dispatch('patchLocalSettings', patch);
};
module.actions.toggleExplorer = ({ commit, getters, dispatch, rootGetters }, value) => {
  // Close side bar if not enough space
  const patch = {
    showExplorer: value === undefined ? !getters.localSettings.showExplorer : value,
  };
  if (patch.showExplorer && notEnoughSpace(rootGetters)) {
    patch.showSideBar = false;
  }
  dispatch('patchLocalSettings', patch);
};
module.actions.setSideBarPanel = ({ dispatch }, value) => dispatch('patchLocalSettings', {
  sideBarPanel: value === undefined ? 'menu' : value,
});

// Settings
module.getters.settings = getter('settings');
module.getters.computedSettings = (state, getters) => {
  const customSettings = yaml.safeLoad(getters.settings);
  const settings = yaml.safeLoad(defaultSettings);
  const override = (obj, opt) => {
    const objType = Object.prototype.toString.call(obj);
    const optType = Object.prototype.toString.call(opt);
    if (objType !== optType) {
      return obj;
    } else if (objType !== '[object Object]') {
      return opt;
    }
    Object.keys(obj).forEach((key) => {
      if (key === 'shortcuts') {
        obj[key] = Object.assign(obj[key], opt[key]);
      } else {
        obj[key] = override(obj[key], opt[key]);
      }
    });
    return obj;
  };
  return override(settings, customSettings);
};
module.actions.setSettings = setter('settings');

// Templates
module.getters.templates = getter('templates');
const makeAdditionalTemplate = (name, value, helpers = '\n') => ({
  name,
  value,
  helpers,
  isAdditional: true,
});
const additionalTemplates = {
  plainText: makeAdditionalTemplate('Plain text', '{{{files.0.content.text}}}'),
  plainHtml: makeAdditionalTemplate('Plain HTML', plainHtmlTemplate),
  styledHtml: makeAdditionalTemplate('Styled HTML', styledHtmlTemplate),
  styledHtmlWithToc: makeAdditionalTemplate('Styled HTML with TOC', styledHtmlWithTocTemplate),
  jekyllSite: makeAdditionalTemplate('Jekyll site', jekyllSiteTemplate),
};
module.getters.allTemplates = (state, getters) => ({
  ...getters.templates,
  ...additionalTemplates,
});
module.actions.setTemplates = ({ commit }, data) => {
  const dataToCommit = {
    ...data,
  };
  // We don't store additional templates
  Object.keys(additionalTemplates).forEach((id) => {
    delete dataToCommit[id];
  });
  commit('setItem', itemTemplate('templates', dataToCommit));
};

// Last opened
module.getters.lastOpened = getter('lastOpened');
module.getters.lastOpenedIds = (state, getters, rootState) => {
  const lastOpened = getters.lastOpened;
  return Object.keys(lastOpened)
    .filter(id => rootState.file.itemMap[id])
    .sort((id1, id2) => lastOpened[id2] - lastOpened[id1])
    .slice(0, 20);
};
module.actions.setLastOpenedId = ({ getters, commit, dispatch, rootState }, fileId) => {
  const lastOpened = { ...getters.lastOpened };
  lastOpened[fileId] = Date.now();
  commit('setItem', itemTemplate('lastOpened', lastOpened));
  dispatch('cleanLastOpenedId');
};
module.actions.cleanLastOpenedId = ({ getters, commit, rootState }) => {
  const lastOpened = {};
  const oldLastOpened = getters.lastOpened;
  Object.keys(oldLastOpened).forEach((fileId) => {
    if (rootState.file.itemMap[fileId]) {
      lastOpened[fileId] = oldLastOpened[fileId];
    }
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
module.getters.syncDataByType = (state, getters) => {
  const result = {};
  utils.types.forEach((type) => {
    result[type] = {};
  });
  const syncData = getters.syncData;
  Object.keys(syncData).forEach((id) => {
    const item = syncData[id];
    if (result[item.type]) {
      result[item.type][item.itemId] = item;
    }
  });
  return result;
};
module.actions.patchSyncData = patcher('syncData');
module.actions.setSyncData = setter('syncData');

// Data sync data (used to sync settings and settings)
module.getters.dataSyncData = getter('dataSyncData');
module.actions.patchDataSyncData = patcher('dataSyncData');

// Tokens
module.getters.tokens = getter('tokens');
module.getters.googleTokens = (state, getters) => getters.tokens.google || {};
module.getters.dropboxTokens = (state, getters) => getters.tokens.dropbox || {};
module.getters.githubTokens = (state, getters) => getters.tokens.github || {};
module.getters.wordpressTokens = (state, getters) => getters.tokens.wordpress || {};
module.getters.zendeskTokens = (state, getters) => getters.tokens.zendesk || {};
module.getters.loginToken = (state, getters) => {
  // Return the first google token that has the isLogin flag
  const googleTokens = getters.googleTokens;
  const loginSubs = Object.keys(googleTokens)
    .filter(sub => googleTokens[sub].isLogin);
  return googleTokens[loginSubs[0]];
};
module.actions.patchTokens = patcher('tokens');
const tokenSetter = providerId => ({ getters, dispatch }, token) => {
  dispatch('patchTokens', {
    [providerId]: {
      ...getters[`${providerId}Tokens`],
      [token.sub]: token,
    },
  });
};
module.actions.setGoogleToken = tokenSetter('google');
module.actions.setDropboxToken = tokenSetter('dropbox');
module.actions.setGithubToken = tokenSetter('github');
module.actions.setWordpressToken = tokenSetter('wordpress');
module.actions.setZendeskToken = tokenSetter('zendesk');

export default module;
