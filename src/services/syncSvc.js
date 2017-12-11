import localDbSvc from './localDbSvc';
import store from '../store';
import utils from './utils';
import diffUtils from './diffUtils';
import networkSvc from './networkSvc';
import providerRegistry from './providers/providerRegistry';
import googleDriveAppDataProvider from './providers/googleDriveAppDataProvider';

const inactivityThreshold = 3 * 1000; // 3 sec
const restartSyncAfter = 30 * 1000; // 30 sec
const autoSyncAfter = utils.randomize(60 * 1000); // 60 sec

let workspaceProvider;

/**
 * Use a lock in the local storage to prevent multiple windows concurrency.
 */
let lastSyncActivity;
const getLastStoredSyncActivity = () =>
  parseInt(localStorage.getItem(store.getters['workspace/lastSyncActivityKey']), 10) || 0;

/**
 * Return true if workspace sync is possible.
 */
const isWorkspaceSyncPossible = () => {
  const loginToken = store.getters['data/loginToken'];
  if (!loginToken && Object.keys(store.getters['data/syncData']).length) {
    // Reset sync data if token was removed
    store.dispatch('data/setSyncData', {});
  }
  return !!loginToken;
};

/**
 * Return true if file has at least one explicit sync location.
 */
const hasCurrentFileSyncLocations = () => !!store.getters['syncLocation/current'].length;

/**
 * Return true if we are online and we have something to sync.
 */
const isSyncPossible = () => !store.state.offline &&
  (isWorkspaceSyncPossible() || hasCurrentFileSyncLocations());

/**
 * Return true if we are the many window, ie we have the lastSyncActivity lock.
 */
function isSyncWindow() {
  const storedLastSyncActivity = getLastStoredSyncActivity();
  return lastSyncActivity === storedLastSyncActivity ||
    Date.now() > inactivityThreshold + storedLastSyncActivity;
}

/**
 * Return true if auto sync can start, ie if lastSyncActivity is old enough.
 */
function isAutoSyncReady() {
  const storedLastSyncActivity = getLastStoredSyncActivity();
  return Date.now() > autoSyncAfter + storedLastSyncActivity;
}

/**
 * Update the lastSyncActivity, assuming we have the lock.
 */
function setLastSyncActivity() {
  const currentDate = Date.now();
  lastSyncActivity = currentDate;
  localStorage.setItem(store.getters['workspace/lastSyncActivityKey'], currentDate);
}

/**
 * Clean a syncedContent.
 */
function cleanSyncedContent(syncedContent) {
  // Clean syncHistory from removed syncLocations
  Object.keys(syncedContent.syncHistory).forEach((syncLocationId) => {
    if (syncLocationId !== 'main' && !store.state.syncLocation.itemMap[syncLocationId]) {
      delete syncedContent.syncHistory[syncLocationId];
    }
  });
  const allSyncLocationHashSet = new Set([].concat(
    ...Object.keys(syncedContent.syncHistory).map(
      id => syncedContent.syncHistory[id])));
  // Clean historyData from unused contents
  Object.keys(syncedContent.historyData).map(hash => parseInt(hash, 10)).forEach((hash) => {
    if (!allSyncLocationHashSet.has(hash)) {
      delete syncedContent.historyData[hash];
    }
  });
}

/**
 * Apply changes retrieved from the main provider. Update sync data accordingly.
 * @param {*} changes The changes to apply.
 */
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
    } else if (!change.removed && change.item && change.item.hash) {
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

/**
 * Create a sync location by uploading the current file content.
 */
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
        .then(syncLocationToStore => localDbSvc.loadSyncedContent(fileId)
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

class SyncContext {
  constructor() {
    this.restart = false;
    this.synced = {};
  }
}

class FileSyncContext {
  constructor() {
    this.downloaded = {};
    this.errors = {};
  }
}

/**
 * Sync one file with all its locations.
 */
function syncFile(fileId, syncContext = new SyncContext()) {
  const fileSyncContext = new FileSyncContext();
  syncContext.synced[`${fileId}/content`] = true;
  return localDbSvc.loadSyncedContent(fileId)
    .then(() => localDbSvc.loadItem(`${fileId}/content`)
      .catch(() => {})) // Item may not exist if content has not been downloaded yet
    .then(() => {
      const getFile = () => store.state.file.itemMap[fileId];
      const getContent = () => store.state.content.itemMap[`${fileId}/content`];
      const getSyncedContent = () => store.state.syncedContent.itemMap[`${fileId}/syncedContent`];
      const getSyncHistoryItem = syncLocationId => getSyncedContent().syncHistory[syncLocationId];

      const isLocationSynced = (syncLocation) => {
        const syncHistoryItem = getSyncHistoryItem(syncLocation.id);
        return syncHistoryItem && syncHistoryItem[LAST_SENT] === getContent().hash;
      };

      const isWelcomeFile = () => {
        if (store.getters['data/syncDataByItemId'][`${fileId}/content`]) {
          // If file has already been synced, keep on syncing
          return false;
        }
        const file = getFile();
        const content = getContent();
        if (!file || !content) {
          return false;
        }
        const welcomeFileHashes = store.getters['data/localSettings'].welcomeFileHashes;
        const hash = utils.hash(content.text);
        const hasDiscussions = Object.keys(content.discussions).length;
        return file.name === 'Welcome file' && welcomeFileHashes[hash] && !hasDiscussions;
      };

      const syncOneContentLocation = () => {
        const syncLocations = [
          ...store.getters['syncLocation/groupedByFileId'][fileId] || [],
        ];
        if (isWorkspaceSyncPossible()) {
          syncLocations.unshift({ id: 'main', providerId: mainProvider.id, fileId });
        }
        let result;
        syncLocations.some((syncLocation) => {
          const provider = providerRegistry.providers[syncLocation.providerId];
          if (
            // Skip if it previously threw an error
            !fileSyncContext.errors[syncLocation.id] &&
            // Skip if it has previously been downloaded and has not changed since then
            (!fileSyncContext.downloaded[syncLocation.id] || !isLocationSynced(syncLocation)) &&
            // Skip welcome file if not synchronized explicitly
            (syncLocations.length > 1 || !isWelcomeFile())
          ) {
            const token = provider && provider.getToken(syncLocation);
            result = token && store.dispatch('queue/doWithLocation', {
              location: syncLocation,
              promise: provider.downloadContent(token, syncLocation)
                .then((serverContent = null) => {
                  fileSyncContext.downloaded[syncLocation.id] = true;

                  const syncedContent = getSyncedContent();
                  const syncHistoryItem = getSyncHistoryItem(syncLocation.id);
                  let mergedContent = (() => {
                    const clientContent = utils.deepCopy(getContent());
                    if (!clientContent) {
                      return utils.deepCopy(serverContent);
                    }
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

                  if (!mergedContent) {
                    fileSyncContext.errors[syncLocation.id] = true;
                    return null;
                  }

                  // Update or set content in store
                  store.commit('content/setItem', {
                    id: `${fileId}/content`,
                    text: utils.sanitizeText(mergedContent.text),
                    properties: utils.sanitizeText(mergedContent.properties),
                    discussions: mergedContent.discussions,
                    comments: mergedContent.comments,
                    hash: 0,
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

                      // If content was just created, restart sync to create the file as well
                      if (provider === mainProvider &&
                        !store.getters['data/syncDataByItemId'][fileId]
                      ) {
                        syncContext.restart = true;
                      }
                    });
                })
                .catch((err) => {
                  if (store.state.offline) {
                    throw err;
                  }
                  console.error(err); // eslint-disable-line no-console
                  store.dispatch('notification/error', err);
                  fileSyncContext.errors[syncLocation.id] = true;
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
        return syncFile(fileId, syncContext);
      }
      throw err;
    });
}

/**
 * Sync a data item, typically settings and templates.
 */
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
        const clientItem = utils.deepCopy(store.state.data.itemMap[dataId]);
        if (!clientItem) {
          return serverItem;
        }
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

      if (!mergedItem) {
        return null;
      }

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

/**
 * Sync the whole workspace with the main provider and the current file explicit locations.
 */
function syncWorkspace() {
  const syncContext = new SyncContext();
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
        Object.entries(storeItemMap).some(([id, item]) => {
          const existingSyncData = syncDataByItemId[id];
          if ((!existingSyncData || existingSyncData.hash !== item.hash) &&
            // Add file if content has been uploaded
            (item.type !== 'file' || syncDataByItemId[`${id}/content`])
          ) {
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
        Object.entries(syncData).some(([, existingSyncData]) => {
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
        const contentIds = [...new Set([
          ...Object.keys(localDbSvc.hashMap.content),
          ...store.getters['file/items'].map(file => `${file.id}/content`),
        ])];
        let fileId;
        contentIds.some((contentId) => {
          // Get content hash from itemMap or from localDbSvc if not loaded
          const loadedContent = store.state.content.itemMap[contentId];
          const hash = loadedContent ? loadedContent.hash : localDbSvc.hashMap.content[contentId];
          const syncData = store.getters['data/syncDataByItemId'][contentId];
          if (
            // Sync if syncData does not exist and content syncing was not attempted yet
            (!syncData && !syncContext.synced[contentId]) ||
            // Or if content hash and syncData hash are inconsistent
            (syncData && hash !== syncData.hash)
          ) {
            [fileId] = contentId.split('/');
          }
          return fileId;
        });
        return fileId;
      };

      const syncNextFile = () => {
        const fileId = getOneFileIdToSync();
        if (!fileId) {
          return null;
        }
        return syncFile(fileId, syncContext)
          .then(() => syncNextFile());
      };

      return Promise.resolve()
        .then(() => saveNextItem())
        .then(() => removeNextItem())
        .then(() => syncDataItem('settings'))
        .then(() => syncDataItem('templates'))
        .then(() => {
          const currentFileId = store.getters['file/current'].id;
          if (currentFileId) {
            // Sync current file first
            return syncFile(currentFileId, syncContext)
              .then(() => syncNextFile());
          }
          return syncNextFile();
        })
        .then(
          () => {
            if (syncContext.restart) {
              // Restart sync
              return syncWorkspace();
            }
            return null;
          },
          (err) => {
            if (err && err.message === 'TOO_LATE') {
              // Restart sync
              return syncWorkspace();
            }
            throw err;
          });
    });
}

/**
 * Enqueue a sync task, if possible.
 */
function requestSync() {
  store.dispatch('queue/enqueueSyncRequest', () => new Promise((resolve, reject) => {
    let intervalId;
    const attempt = () => {
      // Only start syncing when these conditions are met
      if (networkSvc.isUserActive() && isSyncWindow()) {
        clearInterval(intervalId);
        if (!isSyncPossible()) {
          // Cancel sync
          reject('Sync not possible.');
          return;
        }

        // Determine if we have to clean files
        const fileHashesToClean = {};
        if (getLastStoredSyncActivity() + utils.cleanTrashAfter < Date.now()) {
          // Last synchronization happened 7 days ago
          const syncDataByItemId = store.getters['data/syncDataByItemId'];
          store.getters['file/items'].forEach((file) => {
            // If file is in the trash and has not been modified since it was last synced
            const syncData = syncDataByItemId[file.id];
            if (syncData && file.parentId === 'trash' && file.hash === syncData.hash) {
              fileHashesToClean[file.id] = file.hash;
            }
          });
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
            if (isWorkspaceSyncPossible()) {
              return syncWorkspace();
            }
            if (hasCurrentFileSyncLocations()) {
              // Only sync current file if data sync is unavailable.
              // We also could sync files that are out-of-sync but it would
              // require to load the syncedContent objects of all files.
              return syncFile(store.getters['file/current'].id);
            }
            return null;
          })
          .then(() => {
            // Clean files
            Object.entries(fileHashesToClean).forEach(([fileId, fileHash]) => {
              const file = store.state.file.itemMap[fileId];
              if (file && file.hash === fileHash) {
                store.dispatch('deleteFile', fileId);
              }
            });
          })
          .then(cleaner(resolve), cleaner(reject));
      }
    };
    intervalId = utils.setInterval(() => attempt(), 1000);
    attempt();
  }));
}

export default {
  init() {
    // Load workspaces and tokens from localStorage
    localDbSvc.syncLocalStorage();

    // Try to find a suitable workspace provider
    workspaceProvider = providerRegistry.providers[utils.queryParams.providerId];
    if (!workspaceProvider || !workspaceProvider.initWorkspace) {
      workspaceProvider = googleDriveAppDataProvider;
    }

    return workspaceProvider.initWorkspace()
      .then(workspace => store.commit('workspace/setCurrentWorkspaceId', workspace.id))
      .then(() => localDbSvc.init())
      .then(() => {
        // Sync periodically
        utils.setInterval(() => {
          if (isSyncPossible() &&
          networkSvc.isUserActive() &&
            isSyncWindow() &&
            isAutoSyncReady()
          ) {
            requestSync();
          }
        }, 1000);

        // Unload contents from memory periodically
        utils.setInterval(() => {
          // Wait for sync and publish to finish
          if (store.state.queue.isEmpty) {
            localDbSvc.unloadContents();
          }
        }, 5000);
      });
  },
  isSyncPossible,
  requestSync,
  createSyncLocation,
};
