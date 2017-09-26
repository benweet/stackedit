import localDbSvc from './localDbSvc';
import store from '../store';
import welcomeFile from '../data/welcomeFile.md';
import utils from './utils';
import diffUtils from './diffUtils';
import providerRegistry from './providers/providerRegistry';
import mainProvider from './providers/googleDriveAppDataProvider';

const lastSyncActivityKey = `${utils.workspaceId}/lastSyncActivity`;
let lastSyncActivity;
const getStoredLastSyncActivity = () => parseInt(localStorage[lastSyncActivityKey], 10) || 0;
const inactivityThreshold = 3 * 1000; // 3 sec
const restartSyncAfter = 30 * 1000; // 30 sec
const autoSyncAfter = utils.randomize(60 * 1000); // 60 sec

const isDataSyncPossible = () => !!store.getters['data/loginToken'];
const hasCurrentFileSyncLocations = () => !!store.getters['syncLocation/current'].length;

const isSyncPossible = () => !store.state.offline &&
  (isDataSyncPossible() || hasCurrentFileSyncLocations());

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

function cleanSyncedContent(syncedContent) {
  // Clean syncHistory from removed syncLocations
  Object.keys(syncedContent.syncHistory).forEach((syncLocationId) => {
    if (syncLocationId !== 'main' && !store.state.syncLocation.itemMap[syncLocationId]) {
      delete syncedContent.syncHistory[syncLocationId];
    }
  });
  const allSyncLocationHashes = new Set([].concat(
    ...Object.keys(syncedContent.syncHistory).map(
      id => syncedContent.syncHistory[id])));
  // Clean historyData from unused contents
  Object.keys(syncedContent.historyData).map(hash => parseInt(hash, 10)).forEach((hash) => {
    if (!allSyncLocationHashes.has(hash)) {
      delete syncedContent.historyData[hash];
    }
  });
}

const loader = type => fileId => localDbSvc.loadItem(`${fileId}/${type}`)
  // Item does not exist, create it
  .catch(() => store.commit(`${type}/setItem`, {
    id: `${fileId}/${type}`,
  }));
const loadContent = loader('content');
const loadSyncedContent = loader('syncedContent');
const loadContentState = loader('contentState');

function applyChanges(changes) {
  const token = mainProvider.getToken();
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
    } else if (!change.removed && change.item && change.item.hash && (
      // Ignore items that belong to another user (like settings)
      !change.item.sub || change.item.sub === token.sub
    )) {
      if (!existingSyncData || (existingSyncData.hash !== change.item.hash && (
        !existingItem || existingItem.hash !== change.item.hash
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

const LAST_SENT = 0;
const LAST_MERGED = 1;

function createSyncLocation(syncLocation) {
  syncLocation.id = utils.uid();
  const currentFile = store.getters['file/current'];
  const fileId = currentFile.id;
  syncLocation.fileId = fileId;
  // Use deepCopy to freeze item
  const content = utils.deepCopy(store.getters['content/current']);
  store.dispatch('queue/enqueue',
    () => {
      const provider = providerRegistry.providers[syncLocation.providerId];
      const token = provider.getToken(syncLocation);
      return provider.uploadContent(token, {
        ...content,
        history: [content.hash],
      }, syncLocation)
        .then(syncLocationToStore => loadSyncedContent(fileId)
          .then(() => {
            const newSyncedContent = utils.deepCopy(
              store.state.syncedContent.itemMap[`${fileId}/syncedContent`]);
            const newSyncHistoryItem = [];
            newSyncedContent.syncHistory[syncLocation.id] = newSyncHistoryItem;
            newSyncHistoryItem[LAST_SENT] = content.hash;
            newSyncedContent.historyData[content.hash] = content;

            store.commit('syncedContent/patchItem', newSyncedContent);
            store.commit('syncLocation/setItem', syncLocationToStore);
            store.dispatch('notification/info', `A new synchronized location was added to "${currentFile.name}".`);
          }));
    });
}

function syncFile(fileId) {
  return loadSyncedContent(fileId)
    .then(() => loadContent(fileId))
    .then(() => {
      const getContent = () => store.state.content.itemMap[`${fileId}/content`];
      const getSyncedContent = () => store.state.syncedContent.itemMap[`${fileId}/syncedContent`];
      const getSyncHistoryItem = syncLocationId => getSyncedContent().syncHistory[syncLocationId];
      const downloadedLocations = {};
      const errorLocations = {};

      const isLocationSynced = (syncLocation) => {
        const syncHistoryItem = getSyncHistoryItem(syncLocation.id);
        return syncHistoryItem && syncHistoryItem[LAST_SENT] === getContent().hash;
      };

      const syncOneContentLocation = () => {
        const syncLocations = [
          ...store.getters['syncLocation/groupedByFileId'][fileId] || [],
        ];
        if (isDataSyncPossible()) {
          syncLocations.unshift({ id: 'main', providerId: mainProvider.id, fileId });
        }
        let result;
        syncLocations.some((syncLocation) => {
          if (!errorLocations[syncLocation.id] &&
            (!downloadedLocations[syncLocation.id] || !isLocationSynced(syncLocation))
          ) {
            const provider = providerRegistry.providers[syncLocation.providerId];
            const token = provider.getToken(syncLocation);
            result = provider && token && store.dispatch('queue/doWithLocation', {
              location: syncLocation,
              promise: provider.downloadContent(token, syncLocation)
                .then((serverContent = null) => {
                  downloadedLocations[syncLocation.id] = true;

                  const syncedContent = getSyncedContent();
                  const syncHistoryItem = getSyncHistoryItem(syncLocation.id);
                  let mergedContent = (() => {
                    const clientContent = utils.deepCopy(getContent());
                    if (!serverContent) {
                      // Sync location has not been created yet
                      return clientContent;
                    }
                    if (serverContent.hash === clientContent.hash) {
                      // Server and client contents are synced
                      return clientContent;
                    }
                    if (syncedContent.historyData[serverContent.hash]) {
                      // Server content has not changed or has already been merged
                      return clientContent;
                    }
                    // Perform a merge with last merged content if any, or a simple fusion otherwise
                    let lastMergedContent;
                    serverContent.history.some((hash) => {
                      lastMergedContent = syncedContent.historyData[hash];
                      return lastMergedContent;
                    });
                    if (!lastMergedContent && syncHistoryItem) {
                      lastMergedContent = syncedContent.historyData[syncHistoryItem[LAST_MERGED]];
                    }
                    return diffUtils.mergeContent(serverContent, clientContent, lastMergedContent);
                  })();

                  // Update content in store
                  store.commit('content/patchItem', {
                    id: `${fileId}/content`,
                    ...mergedContent,
                  });

                  // Retrieve content with new `hash` and freeze it
                  mergedContent = utils.deepCopy(getContent());

                  // Make merged content history
                  const mergedContentHistory = serverContent ? serverContent.history.slice() : [];
                  let skipUpload = true;
                  if (mergedContentHistory[0] !== mergedContent.hash) {
                    // Put merged content hash at the beginning of history
                    mergedContentHistory.unshift(mergedContent.hash);
                    // Server content is either out of sync or its history is incomplete, do upload
                    skipUpload = false;
                  }
                  if (syncHistoryItem && syncHistoryItem[0] !== mergedContent.hash) {
                    // Clean up by removing the hash we've previously added
                    const idx = mergedContentHistory.indexOf(syncHistoryItem[LAST_SENT]);
                    if (idx !== -1) {
                      mergedContentHistory.splice(idx, 1);
                    }
                  }

                  // Store last sent if it's in the server history,
                  // and merged content which will be sent if different
                  const newSyncedContent = utils.deepCopy(syncedContent);
                  const newSyncHistoryItem = newSyncedContent.syncHistory[syncLocation.id] || [];
                  newSyncedContent.syncHistory[syncLocation.id] = newSyncHistoryItem;
                  if (serverContent && (serverContent.hash === newSyncHistoryItem[LAST_SENT] ||
                    serverContent.history.indexOf(newSyncHistoryItem[LAST_SENT]) !== -1)
                  ) {
                    // The server has accepted the content we previously sent
                    newSyncHistoryItem[LAST_MERGED] = newSyncHistoryItem[LAST_SENT];
                  }
                  newSyncHistoryItem[LAST_SENT] = mergedContent.hash;
                  newSyncedContent.historyData[mergedContent.hash] = mergedContent;

                  // Clean synced content from unused revisions
                  cleanSyncedContent(newSyncedContent);
                  // Store synced content
                  store.commit('syncedContent/patchItem', newSyncedContent);

                  if (skipUpload) {
                    // Server content and merged content are equal, skip content upload
                    return null;
                  }

                  // Prevent from sending new content too long after old content has been fetched
                  const syncStartTime = Date.now();
                  const ifNotTooLate = cb => (res) => {
                    // No time to refresh a token...
                    if (syncStartTime + 500 < Date.now()) {
                      throw new Error('TOO_LATE');
                    }
                    return cb(res);
                  };

                  // Upload merged content
                  return provider.uploadContent(token, {
                    ...mergedContent,
                    history: mergedContentHistory,
                  }, syncLocation, ifNotTooLate)
                    .then((syncLocationToStore) => {
                      // Replace sync location if modified
                      if (utils.serializeObject(syncLocation) !==
                        utils.serializeObject(syncLocationToStore)
                      ) {
                        store.commit('syncLocation/patchItem', syncLocationToStore);
                      }
                    });
                })
                .catch((err) => {
                  if (store.state.offline) {
                    throw err;
                  }
                  console.error(err); // eslint-disable-line no-console
                  store.dispatch('notification/error', err);
                  errorLocations[syncLocation.id] = true;
                }),
            })
            .then(() => syncOneContentLocation());
          }
          return result;
        });
        return result;
      };

      return syncOneContentLocation();
    })
    .then(
      () => localDbSvc.unloadContents(),
      err => localDbSvc.unloadContents()
        .then(() => {
          throw err;
        }))
    .catch((err) => {
      if (err && err.message === 'TOO_LATE') {
        // Restart sync
        return syncFile(fileId);
      }
      throw err;
    });
}


function syncDataItem(dataId) {
  const item = store.state.data.itemMap[dataId];
  const syncData = store.getters['data/syncDataByItemId'][dataId];
  // Sync if item hash and syncData hash are inconsistent
  if (syncData && item && item.hash === syncData.hash) {
    return null;
  }
  const token = mainProvider.getToken();
  return token && mainProvider.downloadData(token, dataId)
    .then((serverItem = null) => {
      const dataSyncData = store.getters['data/dataSyncData'][dataId];
      let mergedItem = (() => {
        const clientItem = utils.deepCopy(store.getters[`data/${dataId}`]);
        if (!serverItem) {
          return clientItem;
        }
        if (!dataSyncData) {
          return serverItem;
        }
        if (dataSyncData.hash !== serverItem.hash) {
          // Server version has changed
          if (dataSyncData.hash !== clientItem.hash && typeof clientItem.data === 'object') {
            // Client version has changed as well, merge data objects
            return {
              ...clientItem,
              data: diffUtils.mergeObjects(serverItem.data, clientItem.data),
            };
          }
          return serverItem;
        }
        return clientItem;
      })();

      // Update item in store
      store.commit('data/setItem', {
        id: dataId,
        ...mergedItem,
      });

      // Retrieve item with new `hash` and freeze it
      mergedItem = utils.deepCopy(store.state.data.itemMap[dataId]);

      return Promise.resolve()
        .then(() => {
          if (serverItem && serverItem.hash === mergedItem.hash) {
            return null;
          }
          return mainProvider.uploadData(
            token,
            dataId === 'settings' ? token.sub : undefined,
            mergedItem,
            dataId,
          );
        })
        .then(() => {
          store.dispatch('data/patchDataSyncData', {
            [dataId]: utils.deepCopy(store.getters['data/syncDataByItemId'][dataId]),
          });
        });
    });
}

function sync() {
  const mainToken = store.getters['data/loginToken'];
  return mainProvider.getChanges(mainToken)
    .then((changes) => {
      // Apply changes
      applyChanges(changes);
      mainProvider.setAppliedChanges(mainToken, changes);

      // Prevent from sending items too long after changes have been retrieved
      const syncStartTime = Date.now();
      const ifNotTooLate = cb => (res) => {
        if (syncStartTime + restartSyncAfter < Date.now()) {
          throw new Error('TOO_LATE');
        }
        return cb(res);
      };

      // Called until no item to save
      const saveNextItem = ifNotTooLate(() => {
        const storeItemMap = {
          ...store.state.file.itemMap,
          ...store.state.folder.itemMap,
          ...store.state.syncLocation.itemMap,
          ...store.state.publishLocation.itemMap,
          // Deal with contents and data later
        };
        const syncDataByItemId = store.getters['data/syncDataByItemId'];
        let result;
        Object.keys(storeItemMap).some((id) => {
          const item = storeItemMap[id];
          const existingSyncData = syncDataByItemId[id];
          if (!existingSyncData || existingSyncData.hash !== item.hash) {
            result = mainProvider.saveItem(
              mainToken,
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
        const storeItemMap = {
          ...store.state.file.itemMap,
          ...store.state.folder.itemMap,
          ...store.state.syncLocation.itemMap,
          ...store.state.publishLocation.itemMap,
          ...store.state.content.itemMap,
          ...store.state.data.itemMap,
        };
        const syncData = store.getters['data/syncData'];
        let result;
        Object.keys(syncData).some((id) => {
          const existingSyncData = syncData[id];
          if (!storeItemMap[existingSyncData.itemId] &&
            // Remove content only if file has been removed
            (existingSyncData.type !== 'content' || !storeItemMap[existingSyncData.itemId.split('/')[0]])
          ) {
            // Use deepCopy to freeze objects
            const syncDataToRemove = utils.deepCopy(existingSyncData);
            result = mainProvider
              .removeItem(mainToken, syncDataToRemove, ifNotTooLate)
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

      const getOneFileIdToSync = () => {
        const allContentIds = Object.keys(localDbSvc.hashMap.content);
        let fileId;
        allContentIds.some((contentId) => {
          // Get content hash from itemMap or from localDbSvc if not loaded
          const loadedContent = store.state.content.itemMap[contentId];
          const hash = loadedContent ? loadedContent.hash : localDbSvc.hashMap.content[contentId];
          const syncData = store.getters['data/syncDataByItemId'][contentId];
          // Sync if item hash and syncData hash are inconsistent
          if (!syncData || hash !== syncData.hash) {
            [fileId] = contentId.split('/');
          }
          return fileId;
        });
        return fileId;
      };

      const syncNextFile = () => {
        const fileId = getOneFileIdToSync();
        return fileId && syncFile(fileId)
          .then(() => syncNextFile());
      };

      return Promise.resolve()
        .then(() => saveNextItem())
        .then(() => removeNextItem())
        .then(() => syncDataItem('settings'))
        .then(() => syncDataItem('templates'))
        .then(() => {
          const currentFileId = store.getters['content/current'].id;
          if (currentFileId) {
            // Sync current file first
            return syncFile(currentFileId)
              .then(() => syncNextFile());
          }
          return syncNextFile();
        })
        .catch((err) => {
          if (err && err.message === 'TOO_LATE') {
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
      if (utils.isUserActive() && isSyncWindow()) {
        clearInterval(intervalId);
        if (!isSyncPossible()) {
          // Cancel sync
          reject('Sync not possible.');
          return;
        }

        // Call setLastSyncActivity periodically
        intervalId = utils.setInterval(() => setLastSyncActivity(), 1000);
        setLastSyncActivity();
        const cleaner = cb => (res) => {
          clearInterval(intervalId);
          cb(res);
        };
        Promise.resolve()
          .then(() => {
            if (isDataSyncPossible()) {
              return sync();
            }
            if (hasCurrentFileSyncLocations()) {
              // Only sync current file if data sync is unavailable.
              // We also could sync files that are out-of-sync but it would
              // require to load the syncedContent objects of all files.
              return syncFile(store.getters['file/current'].id);
            }
            return null;
          })
          .then(cleaner(resolve), cleaner(reject));
      }
    };
    intervalId = utils.setInterval(() => attempt(), 1000);
    attempt();
  }));
}

// Sync periodically
utils.setInterval(() => {
  if (isSyncPossible() &&
    utils.isUserActive() &&
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
          .then(() => loadContentState(currentFile.id))
          // Load syncedContent from DB
          .then(() => loadSyncedContent(currentFile.id))
          // Load content from DB
          .then(() => localDbSvc.loadItem(`${currentFile.id}/content`));
      }),
    {
      immediate: true,
    }));

// Sync local DB periodically
utils.setInterval(() => localDbSvc.sync(), 1000);

// Unload contents from memory periodically
utils.setInterval(() => {
  // Wait for sync and publish to finish
  if (store.state.queue.isEmpty) {
    localDbSvc.unloadContents();
  }
}, 5000);

export default {
  isSyncPossible,
  requestSync,
  createSyncLocation,
};
