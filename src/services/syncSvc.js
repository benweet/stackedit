import localDbSvc from './localDbSvc';
import store from '../store';
import welcomeFile from '../data/welcomeFile.md';
import utils from './utils';
import userActivitySvc from './userActivitySvc';
import googleHelper from './helpers/googleHelper';

const lastSyncActivityKey = 'lastSyncActivity';
let lastSyncActivity;
const getStoredLastSyncActivity = () => parseInt(localStorage[lastSyncActivityKey], 10) || 0;
const inactivityThreshold = 3 * 1000; // 3 sec
const autoSyncAfter = 60 * 1000; // 1 min
const isSyncAvailable = () => window.navigator.onLine !== false &&
  !!store.getters['data/loginToken'];

function isSyncWindow() {
  const storedLastSyncActivity = getStoredLastSyncActivity();
  return lastSyncActivity === storedLastSyncActivity ||
    Date.now() > inactivityThreshold + storedLastSyncActivity;
}

function isAutoSyncNeeded() {
  const storedLastSyncActivity = getStoredLastSyncActivity();
  return Date.now() > autoSyncAfter + storedLastSyncActivity;
}

function setLastSyncActivity() {
  const currentDate = Date.now();
  lastSyncActivity = currentDate;
  localStorage[lastSyncActivityKey] = currentDate;
}

function sync() {
  const googleToken = store.getters['data/loginToken'];
  return googleHelper.getChanges(googleToken)
    .then((changes) => {
      console.log(changes);
      const localChanges = [];
      [
        store.state.files,
      ].forEach((moduleState) => {
        Object.keys(moduleState.itemMap).forEach((id) => {
          localChanges.push(moduleState.itemMap[id]);
        });
      });
      const uploadLocalChange = () => {
        const localChange = localChanges.pop();
        if (!localChange) {
          return null;
        }
        return googleHelper.insertAppData(googleToken, localChange)
          .then(() => uploadLocalChange());
      };
      return uploadLocalChange();
    });
}

function requestSync() {
  store.dispatch('queue/enqueueSyncRequest', () => new Promise((resolve, reject) => {
    let intervalId;
    const attempt = () => {
      // Only start syncing when these conditions are met
      if (userActivitySvc.isActive() && isSyncWindow()) {
        clearInterval(intervalId);
        if (!isSyncAvailable()) {
          // Cancel sync
          reject();
        } else {
          // Call setLastSyncActivity periodically
          intervalId = utils.setInterval(() => setLastSyncActivity(), 1000);
          setLastSyncActivity();
          const cleaner = cb => (res) => {
            clearInterval(intervalId);
            cb(res);
          };
          sync().then(cleaner(resolve), cleaner(reject));
        }
      }
    };
    intervalId = utils.setInterval(() => attempt(), 1000);
    attempt();
  }));
}

// Sync periodically
utils.setInterval(() => {
  if (isSyncAvailable() &&
    userActivitySvc.isActive() &&
    isSyncWindow() &&
    isAutoSyncNeeded()
  ) {
    requestSync();
  }
}, 1000);

const ifNoId = cb => (obj) => {
  if (obj.id) {
    return obj;
  }
  return cb();
};

// Load the DB on boot
localDbSvc.sync()
  // And watch file changing
  .then(() => store.watch(
    () => store.getters['files/current'].id,
    () => Promise.resolve(store.getters['files/current'])
    // If current file has no ID, get the most recent file
    .then(ifNoId(() => store.getters['files/mostRecent']))
    // If still no ID, create a new file
    .then(ifNoId(() => {
      const contentId = utils.uid();
      store.commit('contents/setItem', {
        id: contentId,
        text: welcomeFile,
      });
      const fileId = utils.uid();
      store.commit('files/setItem', {
        id: fileId,
        name: 'Welcome file',
        contentId,
      });
      return store.state.files.itemMap[fileId];
    }))
    .then((currentFile) => {
      store.commit('files/setCurrentId', currentFile.id);
      store.dispatch('files/patchCurrent', {}); // Update `updated` field to make it the mostRecent
    }), {
      immediate: true,
    }));

// Sync local DB periodically
utils.setInterval(() => localDbSvc.sync(), 1000);

export default {
  isSyncAvailable,
  requestSync,
};
