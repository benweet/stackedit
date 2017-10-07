import createLogger from 'vuex/dist/logger';
import Vue from 'vue';
import Vuex from 'vuex';
import utils from '../services/utils';
import contentState from './modules/contentState';
import syncedContent from './modules/syncedContent';
import content from './modules/content';
import file from './modules/file';
import folder from './modules/folder';
import publishLocation from './modules/publishLocation';
import syncLocation from './modules/syncLocation';
import data from './modules/data';
import layout from './modules/layout';
import explorer from './modules/explorer';
import modal from './modules/modal';
import notification from './modules/notification';
import queue from './modules/queue';
import userInfo from './modules/userInfo';

Vue.use(Vuex);

const debug = NODE_ENV !== 'production';

const store = new Vuex.Store({
  state: {
    ready: false,
    offline: false,
    lastOfflineCheck: 0,
  },
  getters: {
    allItemMap: (state) => {
      const result = {};
      utils.types.forEach(type => Object.assign(result, state[type].itemMap));
      return result;
    },
  },
  mutations: {
    setReady: (state) => {
      state.ready = true;
    },
    setOffline: (state, value) => {
      state.offline = value;
    },
    updateLastOfflineCheck: (state) => {
      state.lastOfflineCheck = Date.now();
    },
  },
  actions: {
    setOffline: ({ state, commit }, value) => {
      if (state.offline !== value) {
        commit('setOffline', value);
        if (state.offline) {
          return Promise.reject('You are offline.');
        }
        store.dispatch('notification/info', 'You are back online!');
      }
      return Promise.resolve();
    },
    deleteFile({ getters, commit }, fileId) {
      commit('file/deleteItem', fileId);
      commit('content/deleteItem', `${fileId}/content`);
      commit('syncedContent/deleteItem', `${fileId}/syncedContent`);
      commit('contentState/deleteItem', `${fileId}/contentState`);
      getters['syncLocation/items']
        .filter(item => item.fileId === fileId)
        .forEach(item => commit('syncLocation/deleteItem', item.id));
      getters['publishLocation/items']
        .filter(item => item.fileId === fileId)
        .forEach(item => commit('publishLocation/deleteItem', item.id));
    },
  },
  modules: {
    contentState,
    syncedContent,
    content,
    file,
    folder,
    publishLocation,
    syncLocation,
    data,
    layout,
    explorer,
    modal,
    notification,
    queue,
    userInfo,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});

export default store;
