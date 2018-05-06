import createLogger from 'vuex/dist/logger';
import Vue from 'vue';
import Vuex from 'vuex';
import utils from '../services/utils';
import content from './content';
import contentState from './contentState';
import contextMenu from './contextMenu';
import data from './data';
import discussion from './discussion';
import explorer from './explorer';
import file from './file';
import findReplace from './findReplace';
import folder from './folder';
import layout from './layout';
import modal from './modal';
import notification from './notification';
import queue from './queue';
import syncedContent from './syncedContent';
import userInfo from './userInfo';
import workspace from './workspace';
import locationTemplate from './locationTemplate';
import emptyPublishLocation from '../data/emptyPublishLocation';
import emptySyncLocation from '../data/emptySyncLocation';

Vue.use(Vuex);

const debug = NODE_ENV !== 'production';

const store = new Vuex.Store({
  modules: {
    content,
    contentState,
    contextMenu,
    data,
    discussion,
    explorer,
    file,
    findReplace,
    folder,
    layout,
    modal,
    notification,
    publishLocation: locationTemplate(emptyPublishLocation),
    queue,
    syncedContent,
    syncLocation: locationTemplate(emptySyncLocation),
    userInfo,
    workspace,
  },
  state: {
    light: false,
    offline: false,
    lastOfflineCheck: 0,
    minuteCounter: 0,
    monetizeSponsor: false,
  },
  getters: {
    allItemMap: (state) => {
      const result = {};
      utils.types.forEach(type => Object.assign(result, state[type].itemMap));
      return result;
    },
    itemPaths: (state) => {
      const result = {};
      const folderMap = state.folder.itemMap;
      const getPath = (item) => {
        let itemPath = result[item.id];
        if (!itemPath) {
          if (item.parendId === 'trash') {
            itemPath = `.stackedit-trash/${item.name}`;
          } else {
            let { name } = item;
            if (folderMap[item.id]) {
              name += '/';
            }
            const parentFolder = folderMap[item.parentId];
            if (parentFolder) {
              itemPath = getPath(parentFolder) + name;
            } else {
              itemPath = name;
            }
          }
        }
        result[item.id] = itemPath;
        return itemPath;
      };

      [...state.folder.items, ...state.file.items].forEach(item => getPath(item));
      return result;
    },
    pathItems: (state, { allItemMap, itemPaths }) => {
      const result = {};
      Object.entries(itemPaths).forEach(([id, path]) => {
        const items = result[path] || [];
        items.push(allItemMap[id]);
        result[path] = items;
      });
      return result;
    },
    isSponsor: (state, getters) => {
      const sponsorToken = getters['workspace/sponsorToken'];
      return state.light || state.monetizeSponsor || (sponsorToken && sponsorToken.isSponsor);
    },
  },
  mutations: {
    setLight: (state, value) => {
      state.light = value;
    },
    setOffline: (state, value) => {
      state.offline = value;
    },
    updateLastOfflineCheck: (state) => {
      state.lastOfflineCheck = Date.now();
    },
    updateMinuteCounter: (state) => {
      state.minuteCounter += 1;
    },
    setMonetizeSponsor: (state, value) => {
      state.monetizeSponsor = value;
    },
    setGoogleSponsor: (state, value) => {
      state.googleSponsor = value;
    },
  },
  actions: {
    setOffline: ({ state, commit, dispatch }, value) => {
      if (state.offline !== value) {
        commit('setOffline', value);
        if (state.offline) {
          return Promise.reject(new Error('You are offline.'));
        }
        dispatch('notification/info', 'You are back online!');
      }
      return Promise.resolve();
    },
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});

setInterval(() => {
  store.commit('updateMinuteCounter');
}, 60 * 1000);

export default store;
