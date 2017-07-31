import createLogger from 'vuex/dist/logger';
import Vue from 'vue';
import Vuex from 'vuex';
import contents from './modules/contents';
import files from './modules/files';
import folders from './modules/folders';
import layout from './modules/layout';
import editor from './modules/editor';
import explorer from './modules/explorer';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  modules: {
    contents,
    files,
    folders,
    layout,
    editor,
    explorer,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});

export default store;
