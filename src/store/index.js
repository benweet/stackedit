import createLogger from 'vuex/dist/logger';
import Vue from 'vue';
import Vuex from 'vuex';
import files from './modules/files';
import layout from './modules/layout';
import editor from './modules/editor';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  modules: {
    files,
    layout,
    editor,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});

export default store;
