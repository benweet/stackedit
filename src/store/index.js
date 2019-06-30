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
import emptyPublishLocation from '../data/empties/emptyPublishLocation';
import emptySyncLocation from '../data/empties/emptySyncLocation';
import constants from '../data/constants';

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
    timeCounter: 0,
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
    updateTimeCounter: (state) => {
      state.timeCounter += 1;
    },
  },
  getters: {
    allItemsById: (state) => {
      const result = {};
      constants.types.forEach(type => Object.assign(result, state[type].itemsById));
      return result;
    },
    pathsByItemId: (state, getters) => {
      const result = {};
      const processNode = (node, parentPath = '') => {
        let path = parentPath;
        if (node.item.id) {
          path += node.item.name;
          if (node.isTrash) {
            path = '.stackedit-trash/';
          } else if (node.isFolder) {
            path += '/';
          }
          result[node.item.id] = path;
        }

        if (node.isFolder) {
          node.folders.forEach(child => processNode(child, path));
          node.files.forEach(child => processNode(child, path));
        }
      };

      processNode(getters['explorer/rootNode']);
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
            hash: undefined,
          }), true);
          const extension = item.type === 'syncLocation' ? 'sync' : 'publish';
          result[id] = `${pathsByItemId[item.fileId]}.${encodedItem}.${extension}`;
        }
      });
      return result;
    },
    itemIdsByGitPath: (state, { gitPathsByItemId }) => {
      const result = {};
      Object.entries(gitPathsByItemId).forEach(([id, path]) => {
        result[path] = id;
      });
      return result;
    },
    itemsByGitPath: (state, { allItemsById, gitPathsByItemId }) => {
      const result = {};
      Object.entries(gitPathsByItemId).forEach(([id, path]) => {
        const item = allItemsById[id];
        if (item) {
          result[path] = item;
        }
      });
      return result;
    },
    isSponsor: ({ light }, getters) => {
      if (light) {
        return true;
      }
      if (!getters['data/serverConf'].allowSponsorship) {
        return true;
      }
      const sponsorToken = getters['workspace/sponsorToken'];
      return sponsorToken ? sponsorToken.isSponsor : false;
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
  store.commit('updateTimeCounter');
}, 30 * 1000);

export default store;
