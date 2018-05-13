import Vue from 'vue';
import yaml from 'js-yaml';
import utils from '../services/utils';
import defaultWorkspaces from '../data/defaultWorkspaces';
import defaultSettings from '../data/defaultSettings.yml';
import defaultLocalSettings from '../data/defaultLocalSettings';
import defaultLayoutSettings from '../data/defaultLayoutSettings';
import plainHtmlTemplate from '../data/plainHtmlTemplate.html';
import styledHtmlTemplate from '../data/styledHtmlTemplate.html';
import styledHtmlWithTocTemplate from '../data/styledHtmlWithTocTemplate.html';
import jekyllSiteTemplate from '../data/jekyllSiteTemplate.html';

const itemTemplate = (id, data = {}) => ({
  id,
  type: 'data',
  data,
  hash: 0,
});

const empty = (id) => {
  switch (id) {
    case 'workspaces':
      return itemTemplate(id, defaultWorkspaces());
    case 'settings':
      return itemTemplate(id, '\n');
    case 'localSettings':
      return itemTemplate(id, defaultLocalSettings());
    case 'layoutSettings':
      return itemTemplate(id, defaultLayoutSettings());
    default:
      return itemTemplate(id);
  }
};

// Item IDs that will be stored in the localStorage
const lsItemIdSet = new Set(utils.localStorageDataIds);

// Getter/setter/patcher factories
const getter = id => state => ((lsItemIdSet.has(id)
  ? state.lsItemMap
  : state.itemMap)[id] || {}).data || empty(id).data;
const setter = id => ({ commit }, data) => commit('setItem', itemTemplate(id, data));
const patcher = id => ({ state, commit }, data) => {
  const item = Object.assign(empty(id), (lsItemIdSet.has(id)
    ? state.lsItemMap
    : state.itemMap)[id]);
  commit('setItem', {
    ...empty(id),
    data: typeof data === 'object' ? {
      ...item.data,
      ...data,
    } : data,
  });
};

// For layoutSettings
const layoutSettingsToggler = propertyName => ({ getters, dispatch }, value) => dispatch('patchLayoutSettings', {
  [propertyName]: value === undefined ? !getters.layoutSettings[propertyName] : value,
});
const notEnoughSpace = (getters) => {
  const constants = getters['layout/constants'];
  const showGutter = getters['discussion/currentDiscussion'];
  return document.body.clientWidth < constants.editorMinWidth +
    constants.explorerWidth +
    constants.sideBarWidth +
    constants.buttonBarWidth +
    (showGutter ? constants.gutterWidth : 0);
};

// For templates
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

// For tokens
const tokenSetter = providerId => ({ getters, dispatch }, token) => {
  dispatch('patchTokens', {
    [providerId]: {
      ...getters[`${providerId}Tokens`],
      [token.sub]: token,
    },
  });
};

// For workspaces
const urlParser = window.document.createElement('a');

export default {
  namespaced: true,
  state: {
    // Data items stored in the DB
    itemMap: {},
    // Data items stored in the localStorage
    lsItemMap: {},
  },
  mutations: {
    setItem: ({ itemMap, lsItemMap }, value) => {
      // Create an empty item and override its data field
      const emptyItem = empty(value.id);
      const data = typeof value.data === 'object'
        ? Object.assign(emptyItem.data, value.data)
        : value.data;

      // Make item with hash
      const item = utils.addItemHash({
        ...emptyItem,
        data,
      });

      // Store item in itemMap or lsItemMap if its stored in the localStorage
      Vue.set(lsItemIdSet.has(item.id) ? lsItemMap : itemMap, item.id, item);
    },
    deleteItem({ itemMap }, id) {
      // Only used by localDbSvc to clean itemMap from object moved to localStorage
      Vue.delete(itemMap, id);
    },
  },
  getters: {
    workspaces: getter('workspaces'),
    sanitizedWorkspaces: (state, { workspaces }, rootState, rootGetters) => {
      const sanitizedWorkspaces = {};
      const mainWorkspaceToken = rootGetters['workspace/mainWorkspaceToken'];
      Object.entries(workspaces).forEach(([id, workspace]) => {
        const sanitizedWorkspace = {
          id,
          providerId: mainWorkspaceToken && 'googleDriveAppData',
          sub: mainWorkspaceToken && mainWorkspaceToken.sub,
          ...workspace,
        };
        // Rebuild the url with current hostname
        urlParser.href = workspace.url || 'app';
        const params = utils.parseQueryParams(urlParser.hash.slice(1));
        sanitizedWorkspace.url = utils.addQueryParams('app', params, true);
        sanitizedWorkspaces[id] = sanitizedWorkspace;
      });
      return sanitizedWorkspaces;
    },
    settings: getter('settings'),
    computedSettings: (state, { settings }) => {
      const customSettings = yaml.safeLoad(settings);
      const parsedSettings = yaml.safeLoad(defaultSettings);
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
      return override(parsedSettings, customSettings);
    },
    localSettings: getter('localSettings'),
    layoutSettings: getter('layoutSettings'),
    templates: getter('templates'),
    allTemplates: (state, { templates }) => ({
      ...templates,
      ...additionalTemplates,
    }),
    lastCreated: getter('lastCreated'),
    lastOpened: getter('lastOpened'),
    lastOpenedIds: (state, { lastOpened }, rootState) => {
      const result = {
        ...lastOpened,
      };
      const currentFileId = rootState.file.currentId;
      if (currentFileId && !result[currentFileId]) {
        result[currentFileId] = Date.now();
      }
      return Object.keys(result)
        .filter(id => rootState.file.itemMap[id])
        .sort((id1, id2) => result[id2] - result[id1])
        .slice(0, 20);
    },
    syncData: getter('syncData'),
    syncDataByItemId: (state, { syncData }) => {
      const result = {};
      Object.entries(syncData).forEach(([, value]) => {
        result[value.itemId] = value;
      });
      return result;
    },
    syncDataByType: (state, { syncData }) => {
      const result = {};
      utils.types.forEach((type) => {
        result[type] = {};
      });
      Object.entries(syncData).forEach(([, item]) => {
        if (result[item.type]) {
          result[item.type][item.itemId] = item;
        }
      });
      return result;
    },
    dataSyncData: getter('dataSyncData'),
    tokens: getter('tokens'),
    googleTokens: (state, { tokens }) => tokens.google || {},
    couchdbTokens: (state, { tokens }) => tokens.couchdb || {},
    dropboxTokens: (state, { tokens }) => tokens.dropbox || {},
    githubTokens: (state, { tokens }) => tokens.github || {},
    wordpressTokens: (state, { tokens }) => tokens.wordpress || {},
    zendeskTokens: (state, { tokens }) => tokens.zendesk || {},
  },
  actions: {
    setWorkspaces: setter('workspaces'),
    patchWorkspaces: patcher('workspaces'),
    setSettings: setter('settings'),
    patchLocalSettings: patcher('localSettings'),
    patchLayoutSettings: patcher('layoutSettings'),
    toggleNavigationBar: layoutSettingsToggler('showNavigationBar'),
    toggleEditor: layoutSettingsToggler('showEditor'),
    toggleSidePreview: layoutSettingsToggler('showSidePreview'),
    toggleStatusBar: layoutSettingsToggler('showStatusBar'),
    toggleScrollSync: layoutSettingsToggler('scrollSync'),
    toggleFocusMode: layoutSettingsToggler('focusMode'),
    toggleSideBar: ({ getters, dispatch, rootGetters }, value) => {
      // Reset side bar
      dispatch('setSideBarPanel');

      // Close explorer if not enough space
      const patch = {
        showSideBar: value === undefined ? !getters.layoutSettings.showSideBar : value,
      };
      if (patch.showSideBar && notEnoughSpace(rootGetters)) {
        patch.showExplorer = false;
      }
      dispatch('patchLayoutSettings', patch);
    },
    toggleExplorer: ({ getters, dispatch, rootGetters }, value) => {
      // Close side bar if not enough space
      const patch = {
        showExplorer: value === undefined ? !getters.layoutSettings.showExplorer : value,
      };
      if (patch.showExplorer && notEnoughSpace(rootGetters)) {
        patch.showSideBar = false;
      }
      dispatch('patchLayoutSettings', patch);
    },
    setSideBarPanel: ({ dispatch }, value) => dispatch('patchLayoutSettings', {
      sideBarPanel: value === undefined ? 'menu' : value,
    }),
    setTemplates: ({ commit }, data) => {
      const dataToCommit = {
        ...data,
      };
      // We don't store additional templates
      Object.keys(additionalTemplates).forEach((id) => {
        delete dataToCommit[id];
      });
      commit('setItem', itemTemplate('templates', dataToCommit));
    },
    setLastCreated: setter('lastCreated'),
    setLastOpenedId: ({ getters, commit, rootState }, fileId) => {
      const lastOpened = { ...getters.lastOpened };
      lastOpened[fileId] = Date.now();
      // Remove entries that don't exist anymore
      const cleanedLastOpened = {};
      Object.entries(lastOpened).forEach(([id, value]) => {
        if (rootState.file.itemMap[id]) {
          cleanedLastOpened[id] = value;
        }
      });
      commit('setItem', itemTemplate('lastOpened', cleanedLastOpened));
    },
    setSyncData: setter('syncData'),
    patchSyncData: patcher('syncData'),
    patchDataSyncData: patcher('dataSyncData'),
    patchTokens: patcher('tokens'),
    setGoogleToken: tokenSetter('google'),
    setCouchdbToken: tokenSetter('couchdb'),
    setDropboxToken: tokenSetter('dropbox'),
    setGithubToken: tokenSetter('github'),
    setWordpressToken: tokenSetter('wordpress'),
    setZendeskToken: tokenSetter('zendesk'),
  },
};
