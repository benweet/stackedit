import createLogger from 'vuex/dist/logger';
import Vue from 'vue';
import Vuex from 'vuex';
import utils from '../services/utils';
import contentState from './contentState';
import syncedContent from './syncedContent';
import content from './content';
import file from './file';
import findReplace from './findReplace';
import folder from './folder';
import publishLocation from './publishLocation';
import syncLocation from './syncLocation';
import data from './data';
import discussion from './discussion';
import layout from './layout';
import explorer from './explorer';
import modal from './modal';
import notification from './notification';
import queue from './queue';
import userInfo from './userInfo';

Vue.use(Vuex);

const debug = NODE_ENV !== 'production';

const store = new Vuex.Store({
  modules: {
    contentState,
    syncedContent,
    content,
    discussion,
    file,
    findReplace,
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
  state: {
    ready: false,
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
    isSponsor: (state, getters) => {
      const loginToken = getters['data/loginToken'];
      return state.monetizeSponsor || (loginToken && loginToken.isSponsor);
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
          return Promise.reject('You are offline.');
        }
        dispatch('notification/info', 'You are back online!');
      }
      return Promise.resolve();
    },
    createFile({ state, getters, commit }, desc) {
      const id = utils.uid();
      commit('content/setItem', {
        id: `${id}/content`,
        text: utils.sanitizeText(desc.text || getters['data/computedSettings'].newFileContent),
        properties: utils.sanitizeText(
          desc.properties || getters['data/computedSettings'].newFileProperties),
        discussions: desc.discussions || {},
        comments: desc.comments || {},
      });
      commit('file/setItem', {
        id,
        name: utils.sanitizeName(desc.name),
        parentId: desc.parentId || null,
      });
      return Promise.resolve(state.file.itemMap[id]);
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
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});

setInterval(() => {
  store.commit('updateMinuteCounter');
}, 60 * 1000);

export default store;
