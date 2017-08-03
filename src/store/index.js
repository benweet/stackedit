import createLogger from 'vuex/dist/logger';
import Vue from 'vue';
import Vuex from 'vuex';
import contents from './modules/contents';
import files from './modules/files';
import folders from './modules/folders';
import data from './modules/data';
import layout from './modules/layout';
import editor from './modules/editor';
import explorer from './modules/explorer';
import modal from './modules/modal';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  state: {
    ready: false,
  },
  mutations: {
    setReady: (state) => {
      state.ready = true;
    },
  },
  modules: {
    contents,
    files,
    folders,
    data,
    layout,
    editor,
    explorer,
    modal,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});

export default store;
