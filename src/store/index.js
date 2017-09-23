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

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  state: {
    ready: false,
    offline: false,
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
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});

let isConnectionDown = false;
let lastConnectionCheck = 0;

function checkOffline() {
  const isBrowserOffline = window.navigator.onLine === false;
  if (!isBrowserOffline && lastConnectionCheck + 30000 < Date.now() && utils.isUserActive()) {
    lastConnectionCheck = Date.now();
    utils.checkOnline()
      .then(() => {
        isConnectionDown = false;
      }, () => {
        isConnectionDown = true;
      });
  }
  const isOffline = isBrowserOffline || isConnectionDown;
  if (isOffline !== store.state.offline) {
    store.commit('setOffline', isOffline);
    if (isOffline) {
      store.dispatch('notification/info', 'You are offline.');
    } else {
      store.dispatch('notification/info', 'You are back online!');
    }
  }
}
utils.setInterval(checkOffline, 1000);
window.addEventListener('online', checkOffline);
window.addEventListener('offline', checkOffline);

export default store;
