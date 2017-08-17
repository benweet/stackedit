import createLogger from 'vuex/dist/logger';
import Vue from 'vue';
import Vuex from 'vuex';
import utils from '../services/utils';
import contentState from './modules/contentState';
import syncContent from './modules/syncContent';
import content from './modules/content';
import file from './modules/file';
import folder from './modules/folder';
import data from './modules/data';
import layout from './modules/layout';
import editor from './modules/editor';
import explorer from './modules/explorer';
import modal from './modules/modal';
import queue from './modules/queue';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  state: {
    ready: false,
  },
  getters: {
    allItemMap: (state) => {
      const result = {};
      utils.types.forEach(type => Object.assign(result, state[type].itemMap));
      return result;
    },
    syncedItemMap: (state) => {
      const result = {};
      ['file', 'folder'].forEach(type => Object.assign(result, state[type].itemMap));
      return result;
    },
  },
  mutations: {
    setReady: (state) => {
      state.ready = true;
    },
  },
  modules: {
    contentState,
    syncContent,
    content,
    file,
    folder,
    data,
    layout,
    editor,
    explorer,
    modal,
    queue,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
