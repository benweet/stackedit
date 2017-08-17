import localDbSvc from './localDbSvc';
import store from '../store';
import welcomeFile from '../data/welcomeFile.md';
import utils from './utils';
import userActivitySvc from './userActivitySvc';
import gdriveAppDataProvider from './providers/gdriveAppDataProvider';
import googleHelper from './helpers/googleHelper';
import emptyContent from '../data/emptyContent';
import emptySyncContent from '../data/emptySyncContent';

const lastSyncActivityKey = 'lastSyncActivity';
let lastSyncActivity;
const getStoredLastSyncActivity = () => parseInt(localStorage[lastSyncActivityKey], 10) || 0;
const inactivityThreshold = 3 * 1000; // 3 sec
const restartSyncAfter = 30 * 1000; // 30 sec
const autoSyncAfter = utils.randomize(restartSyncAfter);
const isSyncAvailable = () => window.navigator.onLine !== false &&
  !!store.getters['data/loginToken'];

function isSyncWindow() {
  const storedLastSyncActivity = getStoredLastSyncActivity();
  return lastSyncActivity === storedLastSyncActivity ||
    Date.now() > inactivityThreshold + storedLastSyncActivity;
}

function isAutoSyncReady() {
  const storedLastSyncActivity = getStoredLastSyncActivity();
  return Date.now() > autoSyncAfter + storedLastSyncActivity;
}

function setLastSyncActivity() {
  const currentDate = Date.now();
  lastSyncActivity = currentDate;
  localStorage[lastSyncActivityKey] = currentDate;
}

function getSyncProvider(syncLocation) {
  switch (syncLocation.provider) {
    default:
      return gdriveAppDataProvider;
  }
}

function getSyncToken(syncLocation) {
  switch (syncLocation.provider) {
    default:
      return store.getters['data/loginToken'];
  }
}

function applyChanges(changes) {
  const storeItemMap = { ...store.getters.allItemMap };
  const syncData = { ...store.getters['data/syncData'] };
  let syncDataChanged = false;

  changes.forEach((change) => {
    const existingSyncData = syncData[change.fileId];
    const existingItem = existingSyncData && storeItemMap[existingSyncData.itemId];
    if (change.removed && existingSyncData) {
      if (existingItem) {
        // Remove object from the store
        store.commit(`${existingItem.type}/deleteItem`, existingItem.id);
        delete storeItemMap[existingItem.id];
      }
      delete syncData[change.fileId];
      syncDataChanged = true;
    } else if (!change.removed && change.item && change.item.updated) {
      if (!existingSyncData || (existingSyncData.updated !== change.item.updated && (
        !existingItem || existingItem.updated !== change.item.updated
      ))) {
        // Put object in the store
        if (change.item.type !== 'content') { // Merge contents later
          store.commit(`${change.item.type}/setItem`, change.item);
          storeItemMap[change.item.id] = change.item;
        }
      }
      syncData[change.fileId] = change.syncData;
      syncDataChanged = true;
    }
  });

  if (syncDataChanged) {
    store.dispatch('data/setSyncData', syncData);
  }
}

function sync() {
  const googleToken = store.getters['data/loginToken'];
  return googleHelper.getChanges(googleToken)
    .then((changes) => {
      // Apply changes
      applyChanges(changes);
      googleHelper.updateNextPageToken(googleToken, changes);

      // Prevent from sending items too long after changes have been retrieved
      const syncStartTime = Date.now();
      const ifNotTooLate = cb => (res) => {
        if (syncStartTime + restartSyncAfter < Date.now()) {
          throw new Error('too_late');
        }
        return cb(res);
      };

      // Called until no item to save
      const saveNextItem = ifNotTooLate(() => {
        const storeItemMap = store.getters.syncedItemMap;
        const syncDataByItemId = store.getters['data/syncDataByItemId'];
        let result;
        Object.keys(storeItemMap).some((id) => {
          const item = storeItemMap[id];
          const existingSyncData = syncDataByItemId[id];
          if (!existingSyncData || existingSyncData.updated !== item.updated) {
            result = googleHelper.saveItem(
              googleToken,
              // Use deepCopy to freeze objects
              utils.deepCopy(item),
              utils.deepCopy(existingSyncData),
              ifNotTooLate,
            )
              .then(resultSyncData => store.dispatch('data/patchSyncData', {
                [resultSyncData.id]: resultSyncData,
              }))
              .then(() => saveNextItem());
          }
          return result;
        });
        return result;
      });

      // Called until no item to remove
      const removeNextItem = ifNotTooLate(() => {
        const storeItemMap = store.getters.syncedItemMap;
        const syncData = store.getters['data/syncData'];
        let result;
        Object.keys(syncData).some((id) => {
          const existingSyncData = syncData[id];
          if (!storeItemMap[existingSyncData.itemId]) {
            // Use deepCopy to freeze objects
            const syncDataToRemove = utils.deepCopy(existingSyncData);
            result = googleHelper.removeItem(googleToken, syncDataToRemove, ifNotTooLate)
              .then(() => {
                const syncDataCopy = { ...store.getters['data/syncData'] };
                delete syncDataCopy[syncDataToRemove.id];
                store.dispatch('data/setSyncData', syncDataCopy);
              })
              .then(() => removeNextItem());
          }
          return result;
        });
        return result;
      });

      // Get content `updated` field from itemMap or from localDbSvc if not loaded
      const getContentUpdated = (contentId) => {
        const loadedContent = store.state.content.itemMap[contentId];
        return loadedContent ? loadedContent.updated : localDbSvc.updatedMap.content[contentId];
      };

      // Download current file content and contents that have changed
      const forceContentIds = { [`${store.getters['file/current'].id}/content`]: true };
      store.getters['file/items'].forEach((file) => {
        const contentId = `${file.id}/content`;
        const updated = getContentUpdated(contentId);
        const existingSyncData = store.getters['data/syncDataByItemId'][contentId];
      });

      const syncOneContent = fileId => localDbSvc.retrieveItem(`${fileId}/syncContent`)
        .catch(() => ({ ...emptySyncContent(), id: `${fileId}/syncContent` }))
        .then(syncContent => localDbSvc.retrieveItem(`${fileId}/content`)
          .catch(() => ({ ...emptyContent(), id: `${fileId}/content` }))
          .then((content) => {
            const syncOneContentLocation = (syncLocation) => {
              return Promise.resolve()
                .then(() => {
                  const provider = getSyncProvider(syncLocation);
                  const token = getSyncToken(syncLocation);
                  return provider && token && provider.downloadContent()
                });
            };

            const syncLocations = [{ provider: null }, ...content.syncLocations];
            return syncOneContentLocation(syncLocations[0]);
          }));

      // Called until no content to save
      const saveNextContent = ifNotTooLate(() => {
        let saveContentPromise;
        const getSaveContentPromise = (contentId) => {
          const updated = getContentUpdated(contentId);
          const existingSyncData = store.getters['data/syncDataByItemId'][contentId];
          if (!existingSyncData || existingSyncData.updated !== updated) {
            saveContentPromise = localDbSvc.retrieveItem(contentId)
              .then(content => googleHelper.saveItem(
                googleToken,
                // Use deepCopy to freeze objects
                utils.deepCopy(content),
                utils.deepCopy(existingSyncData),
                ifNotTooLate,
              ))
              .then(resultSyncData => store.dispatch('data/patchSyncData', {
                [resultSyncData.id]: resultSyncData,
              }))
              .then(() => saveNextContent());
          }
          return saveContentPromise;
        };
        Object.keys(localDbSvc.updatedMap.content)
          .some(id => getSaveContentPromise(id, syncDataByItemId));
        return saveContentPromise;
      });

      return Promise.resolve()
        .then(() => saveNextItem())
        .then(() => removeNextItem())
        .catch((err) => {
          if (err && err.message === 'too_late') {
            // Restart sync
            return sync();
          }
          throw err;
        });
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
    isAutoSyncReady()
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
    () => store.getters['file/current'].id,
    () => Promise.resolve(store.getters['file/current'])
      // If current file has no ID, get the most recent file
      .then(ifNoId(() => store.getters['file/lastOpened']))
      // If still no ID, create a new file
      .then(ifNoId(() => {
        const id = utils.uid();
        store.commit('content/setItem', {
          id: `${id}/content`,
          text: welcomeFile,
        });
        store.commit('file/setItem', {
          id,
          name: 'Welcome file',
        });
        return store.state.file.itemMap[id];
      }))
      .then((currentFile) => {
        // Fix current file ID
        if (store.getters['file/current'].id !== currentFile.id) {
          store.commit('file/setCurrentId', currentFile.id);
          // Wait for the next watch tick
          return null;
        }
        // Set last opened
        store.dispatch('data/setLastOpenedId', currentFile.id);
        return Promise.resolve()
          // Load contentState from DB
          .then(() => localDbSvc.retrieveItem(`${currentFile.id}/contentState`)
            // contentState does not exist, create it
            .catch(() => store.commit('contentState/setItem', {
              id: `${currentFile.id}/contentState`,
            })))
          // Load syncContent from DB
          .then(() => localDbSvc.retrieveItem(`${currentFile.id}/syncContent`)
            // syncContent does not exist, create it
            .catch(() => store.commit('syncContent/setItem', {
              id: `${currentFile.id}/syncContent`,
            })))
          // Load content from DB
          .then(() => localDbSvc.retrieveItem(`${currentFile.id}/content`));
      }),
    {
      immediate: true,
    }));

// Sync local DB periodically
utils.setInterval(() => localDbSvc.sync(), 1000);

export default {
  isSyncAvailable,
  requestSync,
};
