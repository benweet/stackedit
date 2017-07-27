import createLogger from 'vuex/dist/logger';
import Vue from 'vue';
import Vuex from 'vuex';
import files from './modules/files';
import layout from './modules/layout';
import editor from './modules/editor';
import LocalDbStorage from '../services/localDbSvc';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const localDbStorage = new LocalDbStorage();

const store = new Vuex.Store({
  modules: {
    files,
    layout,
    editor,
  },
  strict: debug,
  plugins: [_store => localDbStorage.init(_store)].concat(debug ? [createLogger()] : []),
});

export default store;
