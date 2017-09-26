import Vue from 'vue';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import './extensions/';
import './services/optional';
import './icons/';
import App from './components/App';
import store from './store';

if (process.env.NODE_ENV === 'production') {
  OfflinePluginRuntime.install();
}

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App),
});
