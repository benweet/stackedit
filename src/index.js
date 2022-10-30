import store from './store/index.js';
import localDbSvc from './services/localDbSvc.js';
import './icons/index.js';
import 'indexeddbshim/dist/indexeddbshim.js';
import * as OfflinePluginRuntime from 'offline-plugin/runtime.js';
import './extensions/index.js';
import './services/optional/index.js';
import { app } from './VueApp.js';


app.mount('#app')

if (!indexedDB) {
  throw new Error('Your browser is not supported. Please upgrade to the latest version.');
}
OfflinePluginRuntime.install({
  onUpdateReady: () => {
    // Tells to new SW to take control immediately
    OfflinePluginRuntime.applyUpdate();
  },
  onUpdated: async () => {
    if (!store.state.light) {
      await localDbSvc.sync();
      localStorage.updated = true;
      // Reload the webpage to load into the new version
      window.location.reload();
    }
  },
});

if (localStorage.updated) {
  store.dispatch('notification/info', 'StackEdit has just updated itself!');
  setTimeout(() => localStorage.removeItem('updated'), 2000);
}

if (!localStorage.installPrompted) {
  window.addEventListener('beforeinstallprompt', async (promptEvent) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    promptEvent.preventDefault();

    try {
      await store.dispatch('notification/confirm', 'Add StackEdit to your home screen?');
      promptEvent.prompt();
      await promptEvent.userChoice;
    } catch (err) {
      // Cancel
    }
    localStorage.installPrompted = true;
  });
}



console.log("Started")
