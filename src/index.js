import Vue from 'vue';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import './extensions/';
import './services/optional';
import './icons/';
import App from './components/App';
import store from './store';
import localDbSvc from './services/localDbSvc';

if (NODE_ENV === 'production') {
  OfflinePluginRuntime.install({
    onUpdateReady: () => {
      // Tells to new SW to take control immediately
      OfflinePluginRuntime.applyUpdate();
    },
    onUpdated: () => {
      localDbSvc.sync()
        .then(() => {
          localStorage.updated = true;
          // Reload the webpage to load into the new version
          window.location.reload();
        });
    },
  });
}

if (localStorage.updated) {
  store.dispatch('notification/info', 'StackEdit has just updated itself!');
  setTimeout(() => localStorage.removeItem('updated'), 2000);
}

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App),
});
