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
  getters: {
    allItemsById: (state) => {
      const result = {};
      utils.types.forEach(type => Object.assign(result, state[type].itemsById));
      return result;
    },
    pathsByItemId: (state, getters) => {
      const result = {};
      const foldersById = state.folder.itemsById;
      const getPath = (item) => {
        let itemPath = result[item.id];
        if (!itemPath) {
          if (item.parendId === 'trash') {
            itemPath = `.stackedit-trash/${item.name}`;
          } else {
            let { name } = item;
            if (foldersById[item.id]) {
              name += '/';
            }
            const parentFolder = foldersById[item.parentId];
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

      [
        ...getters['folder/items'],
        ...getters['file/items'],
      ].forEach(item => getPath(item));
      return result;
    },
    itemsByPath: (state, { allItemsById, pathsByItemId }) => {
      const result = {};
      Object.entries(pathsByItemId).forEach(([id, path]) => {
        const items = result[path] || [];
        items.push(allItemsById[id]);
        result[path] = items;
      });
      return result;
    },
    gitPathsByItemId: (state, { allItemsById, pathsByItemId }) => {
      const result = {};
      Object.entries(allItemsById).forEach(([id, item]) => {
        if (item.type === 'data') {
          result[id] = `.stackedit-data/${id}.json`;
        } else if (item.type === 'file') {
          const filePath = pathsByItemId[id];
          result[id] = `${filePath}.md`;
          result[`${id}/content`] = `/${filePath}.md`;
        } else if (item.type === 'content') {
          const [fileId] = id.split('/');
          const filePath = pathsByItemId[fileId];
          result[fileId] = `${filePath}.md`;
          result[id] = `/${filePath}.md`;
        } else if (item.type === 'folder') {
          result[id] = pathsByItemId[id];
        } else if (item.type === 'syncLocation' || item.type === 'publishLocation') {
          // locations are stored as paths
          const encodedItem = utils.encodeBase64(utils.serializeObject({
            ...item,
            id: undefined,
            type: undefined,
            fileId: undefined,
          }), true);
          const extension = item.type === 'syncLocation' ? 'sync' : 'publish';
          result[id] = `${pathsByItemId[item.fileId]}.${encodedItem}.${extension}`;
        }
      });
      return result;
    },
    itemsByGitPath: (state, { allItemsById, gitPathsByItemId }) => {
      const result = {};
      Object.entries(gitPathsByItemId).forEach(([id, path]) => {
        const item = allItemsById[id];
        if (item) {
          const items = result[path] || [];
          items.push(item);
          result[path] = items;
        }
      });
      return result;
    },
    isSponsor: ({ light, monetizeSponsor }, getters) => {
      const sponsorToken = getters['workspace/sponsorToken'];
      return light || monetizeSponsor || (sponsorToken && sponsorToken.isSponsor);
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
