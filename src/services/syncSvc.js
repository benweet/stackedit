import localDbSvc from './localDbSvc';
import store from '../store';
import utils from './utils';
import diffUtils from './diffUtils';
import networkSvc from './networkSvc';
import providerRegistry from './providers/common/providerRegistry';
import googleDriveAppDataProvider from './providers/googleDriveAppDataProvider';
import './providers/couchdbWorkspaceProvider';
import './providers/githubWorkspaceProvider';
import './providers/googleDriveWorkspaceProvider';
import tempFileSvc from './tempFileSvc';
import fileSvc from './fileSvc';

const minAutoSyncEvery = 60 * 1000; // 60 sec
const inactivityThreshold = 3 * 1000; // 3 sec
const restartSyncAfter = 30 * 1000; // 30 sec
const restartContentSyncAfter = 500; // Restart if an authorize window pops up
const maxContentHistory = 20;

const LAST_SEEN = 0;
const LAST_MERGED = 1;
const LAST_SENT = 2;

let actionProvider;
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
const isWorkspaceSyncPossible = () => !!store.getters['workspace/syncToken'];

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
const isSyncWindow = () => {
  const storedLastSyncActivity = getLastStoredSyncActivity();
  return lastSyncActivity === storedLastSyncActivity ||
    Date.now() > inactivityThreshold + storedLastSyncActivity;
};

/**
 * Return true if auto sync can start, ie if lastSyncActivity is old enough.
 */
const isAutoSyncReady = () => {
  let { autoSyncEvery } = store.getters['data/computedSettings'];
  if (autoSyncEvery < minAutoSyncEvery) {
    autoSyncEvery = minAutoSyncEvery;
  }
  return Date.now() > autoSyncEvery + getLastStoredSyncActivity();
};

/**
 * Update the lastSyncActivity, assuming we have the lock.
 */
const setLastSyncActivity = () => {
  const currentDate = Date.now();
  lastSyncActivity = currentDate;
  localStorage.setItem(store.getters['workspace/lastSyncActivityKey'], currentDate);
};

/**
 * Upgrade hashes if syncedContent is from an old version
 */
const upgradeSyncedContent = (syncedContent) => {
  if (syncedContent.v) {
    return syncedContent;
  }
  const hashUpgrades = {};
  const historyData = {};
  const syncHistory = {};
  Object.entries(syncedContent.historyData).forEach(([hash, content]) => {
    const newContent = utils.addItemHash(content);
    historyData[newContent.hash] = newContent;
    hashUpgrades[hash] = newContent.hash;
  });
  Object.entries(syncedContent.syncHistory).forEach(([id, hashEntries]) => {
    syncHistory[id] = hashEntries.map(hash => hashUpgrades[hash]);
  });
  return {
    ...syncedContent,
    historyData,
    syncHistory,
    v: 1,
  };
};

/**
 * Clean a syncedContent.
 */
const cleanSyncedContent = (syncedContent) => {
  // Clean syncHistory from removed syncLocations
  Object.keys(syncedContent.syncHistory).forEach((syncLocationId) => {
    if (syncLocationId !== 'main' && !store.state.syncLocation.itemMap[syncLocationId]) {
      delete syncedContent.syncHistory[syncLocationId];
    }
  });
  const allSyncLocationHashSet = new Set([]
    .concat(...Object.keys(syncedContent.syncHistory)
      .map(id => syncedContent.syncHistory[id])));
  // Clean historyData from unused contents
  Object.keys(syncedContent.historyData)
    .map(hash => parseInt(hash, 10))
    .forEach((hash) => {
      if (!allSyncLocationHashSet.has(hash)) {
        delete syncedContent.historyData[hash];
      }
    });
};

/**
 * Apply changes retrieved from the main provider. Update sync data accordingly.
 */
const applyChanges = (changes) => {
  const storeItemMap = { ...store.getters.allItemMap };
  const syncData = { ...store.getters['data/syncData'] };
  let saveSyncData = false;

  changes.forEach((change) => {
    const existingSyncData = syncData[change.syncDataId];
    const existingItem = existingSyncData && storeItemMap[existingSyncData.itemId];
    if (!change.item && existingSyncData) {
      // Item was removed
      if (syncData[change.syncDataId]) {
        delete syncData[change.syncDataId];
        saveSyncData = true;
      }
      if (existingItem) {
        // Remove object from the store
        store.commit(`${existingItem.type}/deleteItem`, existingItem.id);
        delete storeItemMap[existingItem.id];
      }
    } else if (change.item && change.item.hash) {
      // Item was modifed
      if ((existingSyncData || {}).hash !== change.syncData.hash) {
        syncData[change.syncDataId] = change.syncData;
        saveSyncData = true;
      }
      if (
        // If no sync data or existing one is different
        (existingSyncData || {}).hash !== change.item.hash
        // And no existing item or existing item is different
        && (existingItem || {}).hash !== change.item.hash
        // And item is not content nor data, which will be merged later
        && change.item.type !== 'content' && change.item.type !== 'data'
      ) {
        store.commit(`${change.item.type}/setItem`, change.item);
        storeItemMap[change.item.id] = change.item;
      }
    }
  });

  if (saveSyncData) {
    store.dispatch('data/setSyncData', syncData);
  }
};

/**
 * Create a sync location by uploading the current file content.
 */
const createSyncLocation = (syncLocation) => {
  syncLocation.id = utils.uid();
  const currentFile = store.getters['file/current'];
  const fileId = currentFile.id;
  syncLocation.fileId = fileId;
  // Use deepCopy to freeze item
  const content = utils.deepCopy(store.getters['content/current']);
  store.dispatch(
    'queue/enqueue',
    async () => {
      const provider = providerRegistry.providers[syncLocation.providerId];
      const token = provider.getToken(syncLocation);
      const syncLocationToStore = await provider.uploadContent(token, {
        ...content,
        history: [content.hash],
      }, syncLocation);
      await localDbSvc.loadSyncedContent(fileId);
      const newSyncedContent = utils.deepCopy(upgradeSyncedContent(store.state.syncedContent.itemMap[`${fileId}/syncedContent`]));
      const newSyncHistoryItem = [];
      newSyncedContent.syncHistory[syncLocation.id] = newSyncHistoryItem;
      newSyncHistoryItem[LAST_SEEN] = content.hash;
      newSyncHistoryItem[LAST_SENT] = content.hash;
      newSyncedContent.historyData[content.hash] = content;

      store.commit('syncedContent/patchItem', newSyncedContent);
      store.commit('syncLocation/setItem', syncLocationToStore);
      store.dispatch('notification/info', `A new synchronized location was added to "${currentFile.name}".`);
    },
  );
};

/**
 * Prevent from sending new data too long after old data has been fetched.
 */
const tooLateChecker = (timeout) => {
  const tooLateAfter = Date.now() + timeout;
  return (cb) => {
    if (tooLateAfter < Date.now()) {
      throw new Error('TOO_LATE');
    }
    return cb();
  };
};

/**
 * Return true if file is in the temp folder or it's a welcome file.
 */
const isTempFile = (fileId) => {
  const contentId = `${fileId}/content`;
  if (store.getters['data/syncDataByItemId'][contentId]) {
    // If file has already been synced, it's not a temp file
    return false;
  }
  const file = store.state.file.itemMap[fileId];
  const content = store.state.content.itemMap[contentId];
  if (!file || !content) {
    return false;
  }
  if (file.parentId === 'temp') {
    return true;
  }
  const locations = [
    ...store.getters['syncLocation/filteredGroupedByFileId'][fileId] || [],
    ...store.getters['publishLocation/filteredGroupedByFileId'][fileId] || [],
  ];
  if (locations.length) {
    // If file has sync/publish locations, it's not a temp file
    return false;
  }
  // Return true if it's a welcome file that has no discussion
  const { welcomeFileHashes } = store.getters['data/localSettings'];
  const hash = utils.hash(content.text);
  const hasDiscussions = Object.keys(content.discussions).length;
  return file.name === 'Welcome file' && welcomeFileHashes[hash] && !hasDiscussions;
};

class SyncContext {
  restart = false;
  attempted = {};
}

/**
 * Sync one file with all its locations.
 */
const syncFile = async (fileId, syncContext = new SyncContext()) => {
  const contentId = `${fileId}/content`;
  syncContext.attempted[contentId] = true;

  await localDbSvc.loadSyncedContent(fileId);
  try {
    await localDbSvc.loadItem(contentId);
  } catch (e) {
    // Item may not exist if content has not been downloaded yet
  }

  const getContent = () => store.state.content.itemMap[contentId];
  const getSyncedContent = () => upgradeSyncedContent(store.state.syncedContent.itemMap[`${fileId}/syncedContent`]);
  const getSyncHistoryItem = syncLocationId => getSyncedContent().syncHistory[syncLocationId];

  try {
    if (isTempFile(fileId)) {
      return;
    }

    const syncLocations = [
      ...store.getters['syncLocation/filteredGroupedByFileId'][fileId] || [],
    ];
    if (isWorkspaceSyncPossible()) {
      syncLocations.unshift({ id: 'main', providerId: workspaceProvider.id, fileId });
    }

    await utils.awaitSequence(syncLocations, async (syncLocation) => {
      const provider = providerRegistry.providers[syncLocation.providerId];
      if (!provider) {
        return;
      }
      const token = provider.getToken(syncLocation);
      if (!token) {
        return;
      }

      const downloadContent = async () => {
        // On simple provider, call simply downloadContent
        if (syncLocation.id !== 'main') {
          return provider.downloadContent(token, syncLocation);
        }

        // On workspace provider, call downloadWorkspaceContent
        const oldSyncData = provider.isGit
          ? store.getters['data/syncData'][store.getters.itemGitPaths[contentId]]
          : store.getters['data/syncDataByItemId'][contentId];
        if (!oldSyncData) {
          return null;
        }
        const { item, syncData } = await provider.downloadWorkspaceContent(token, oldSyncData);
        if (!item) {
          return null;
        }

        // Update sync data if changed
        if (syncData
          && utils.serializeObject(oldSyncData) !== utils.serializeObject(syncData)
        ) {
          store.dispatch('data/patchSyncData', {
            [syncData.id]: syncData,
          });
        }
        return item;
      };

      const uploadContent = async (item, ifNotTooLate) => {
        // On simple provider, call simply uploadContent
        if (syncLocation.id !== 'main') {
          return provider.uploadContent(token, item, syncLocation, ifNotTooLate);
        }

        // On workspace provider, call uploadWorkspaceContent
        const oldSyncData = provider.isGit
          ? store.getters['data/syncData'][store.getters.itemGitPaths[contentId]]
          : store.getters['data/syncDataByItemId'][contentId];
        if (oldSyncData && oldSyncData.hash === item.hash) {
          return syncLocation;
        }

        const syncData = await provider.uploadWorkspaceContent(
          token,
          item,
          oldSyncData,
          ifNotTooLate,
        );

        // Update sync data if changed
        if (syncData
          && utils.serializeObject(oldSyncData) !== utils.serializeObject(syncData)
        ) {
          store.dispatch('data/patchSyncData', {
            [syncData.id]: syncData,
          });
        }

        // Return syncLocation
        return syncLocation;
      };

      const doSyncLocation = async () => {
        const serverContent = await downloadContent(token, syncLocation);
        const syncedContent = getSyncedContent();
        const syncHistoryItem = getSyncHistoryItem(syncLocation.id);

        // Merge content
        let mergedContent;
        const clientContent = utils.deepCopy(getContent());
        if (!clientContent) {
          mergedContent = utils.deepCopy(serverContent || null);
        } else if (!serverContent // If sync location has not been created yet
          // Or server and client contents are synced
          || serverContent.hash === clientContent.hash
          // Or server content has not changed or has already been merged
          || syncedContent.historyData[serverContent.hash]
        ) {
          mergedContent = clientContent;
        } else {
          // Perform a merge with last merged content if any, or perform a simple fusion otherwise
          let lastMergedContent = utils.someResult(
            serverContent.history,
            hash => syncedContent.historyData[hash],
          );
          if (!lastMergedContent && syncHistoryItem) {
            lastMergedContent = syncedContent.historyData[syncHistoryItem[LAST_MERGED]];
          }
          mergedContent = diffUtils.mergeContent(serverContent, clientContent, lastMergedContent);
        }
        if (!mergedContent) {
          return;
        }

        // Update or set content in store
        store.commit('content/setItem', {
          id: contentId,
          text: utils.sanitizeText(mergedContent.text),
          properties: utils.sanitizeText(mergedContent.properties),
          discussions: mergedContent.discussions,
          comments: mergedContent.comments,
        });

        // Retrieve content with its new hash value and freeze it
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
        if (syncHistoryItem
          && syncHistoryItem[LAST_SENT] != null
          && syncHistoryItem[LAST_SENT] !== mergedContent.hash
        ) {
          // Clean up by removing the hash we've previously added
          const idx = mergedContentHistory.lastIndexOf(syncHistoryItem[LAST_SENT]);
          if (idx !== -1) {
            mergedContentHistory.splice(idx, 1);
          }
        }

        // Update synced content
        const newSyncedContent = utils.deepCopy(syncedContent);
        const newSyncHistoryItem = newSyncedContent.syncHistory[syncLocation.id] || [];
        newSyncedContent.syncHistory[syncLocation.id] = newSyncHistoryItem;
        if (serverContent &&
          (serverContent.hash === newSyncHistoryItem[LAST_SEEN] ||
          serverContent.history.indexOf(newSyncHistoryItem[LAST_SEEN]) !== -1)
        ) {
          // That's the 2nd time we've seen this content, trust it for future merges
          newSyncHistoryItem[LAST_MERGED] = newSyncHistoryItem[LAST_SEEN];
        }
        newSyncHistoryItem[LAST_MERGED] = newSyncHistoryItem[LAST_MERGED] || null;
        newSyncHistoryItem[LAST_SEEN] = mergedContent.hash;
        newSyncHistoryItem[LAST_SENT] = skipUpload ? null : mergedContent.hash;
        newSyncedContent.historyData[mergedContent.hash] = mergedContent;

        // Clean synced content from unused revisions
        cleanSyncedContent(newSyncedContent);
        // Store synced content
        store.commit('syncedContent/patchItem', newSyncedContent);

        if (skipUpload) {
          // Server content and merged content are equal, skip content upload
          return;
        }

        // Upload merged content
        const item = {
          ...mergedContent,
          history: mergedContentHistory.slice(0, maxContentHistory),
        };
        const syncLocationToStore = await uploadContent(
          item,
          tooLateChecker(restartContentSyncAfter),
        );

        // Replace sync location if modified
        if (utils.serializeObject(syncLocation) !==
          utils.serializeObject(syncLocationToStore)
        ) {
          store.commit('syncLocation/patchItem', syncLocationToStore);
        }

        // If content was just created, restart sync to create the file as well
        if (provider === workspaceProvider &&
          !store.getters['data/syncDataByItemId'][fileId]
        ) {
          syncContext.restart = true;
        }
      };

      await store.dispatch('queue/doWithLocation', {
        location: syncLocation,
        action: async () => {
          try {
            await doSyncLocation();
          } catch (err) {
            if (store.state.offline || (err && err.message === 'TOO_LATE')) {
              throw err;
            }
            console.error(err); // eslint-disable-line no-console
            store.dispatch('notification/error', err);
          }
        },
      });
    });
  } catch (err) {
    if (err && err.message === 'TOO_LATE') {
      // Restart sync
      await syncFile(fileId, syncContext);
    }
    throw err;
  } finally {
    await localDbSvc.unloadContents();
  }
};

/**
 * Sync a data item, typically settings, workspaces and templates.
 */
const syncDataItem = async (dataId) => {
  const getItem = () => store.state.data.itemMap[dataId]
    || store.state.data.lsItemMap[dataId];

  const oldItem = getItem();
  const oldSyncData = store.getters['data/syncDataByItemId'][dataId];
  // Sync if item hash and syncData hash are out of sync
  if (oldSyncData && oldItem && oldItem.hash === oldSyncData.hash) {
    return;
  }

  const token = workspaceProvider.getToken();
  const { item, syncData } = await workspaceProvider.downloadWorkspaceData(
    token,
    dataId,
    oldSyncData,
  );

  // Update sync data if changed
  if (syncData
    && utils.serializeObject(oldSyncData) !== utils.serializeObject(syncData)
  ) {
    store.dispatch('data/patchSyncData', {
      [syncData.id]: syncData,
    });
  }

  const serverItem = item;
  const dataSyncData = store.getters['data/dataSyncData'][dataId];
  let mergedItem = (() => {
    const clientItem = utils.deepCopy(getItem());
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
    return;
  }

  // Update item in store
  store.commit('data/setItem', {
    id: dataId,
    ...mergedItem,
  });

  // Retrieve item with new `hash` and freeze it
  mergedItem = utils.deepCopy(getItem());

  if (serverItem && serverItem.hash === mergedItem.hash) {
    return;
  }

  // Upload merged data item
  const newSyncData = await workspaceProvider.uploadWorkspaceData(
    token,
    mergedItem,
    syncData,
    tooLateChecker(restartContentSyncAfter),
  );

  // Update sync data if changed
  if (newSyncData
    && utils.serializeObject(syncData) !== utils.serializeObject(newSyncData)
  ) {
    store.dispatch('data/patchSyncData', {
      [newSyncData.id]: newSyncData,
    });
  }

  // Update data sync data
  store.dispatch('data/patchDataSyncData', {
    [dataId]: utils.deepCopy(store.getters['data/syncDataByItemId'][dataId]),
  });
};

/**
 * Sync the whole workspace with the main provider and the current file explicit locations.
 */
const syncWorkspace = async () => {
  try {
    const workspace = store.getters['workspace/currentWorkspace'];
    const syncContext = new SyncContext();

    // Store the sub in the DB since it's not safely stored in the token
    const syncToken = store.getters['workspace/syncToken'];
    const localSettings = store.getters['data/localSettings'];
    if (!localSettings.syncSub) {
      store.dispatch('data/patchLocalSettings', {
        syncSub: syncToken.sub,
      });
    } else if (localSettings.syncSub !== syncToken.sub) {
      throw new Error('Synchronization failed due to token inconsistency.');
    }

    const changes = await workspaceProvider.getChanges();
    // Apply changes
    applyChanges(changes);
    if (workspaceProvider.onChangesApplied) {
      workspaceProvider.onChangesApplied();
    }

    // Prevent from sending items too long after changes have been retrieved
    const ifNotTooLate = tooLateChecker(restartSyncAfter);

    // Called until no item to save
    const saveNextItem = () => ifNotTooLate(async () => {
      const storeItemMap = {
        ...store.state.file.itemMap,
        ...store.state.folder.itemMap,
        ...store.state.syncLocation.itemMap,
        ...store.state.publishLocation.itemMap,
        // Deal with contents and data later
      };

      let getSyncData;
      if (workspaceProvider.isGit) {
        const syncData = store.getters['data/syncData'];
        getSyncData = id => syncData[store.getters.itemGitPaths[id]];
      } else {
        const syncDataByItemId = store.getters['data/syncDataByItemId'];
        getSyncData = id => syncDataByItemId[id];
      }

      const [changedItem, syncDataToUpdate] = utils.someResult(
        Object.entries(storeItemMap),
        ([id, item]) => {
          const existingSyncData = getSyncData(id);
          if ((!existingSyncData || existingSyncData.hash !== item.hash)
            // Add file/folder if parent has been added
            && (!storeItemMap[item.parentId] || getSyncData(item.parentId))
            // Add file if content has been added
            && (item.type !== 'file' || getSyncData(`${id}/content`))
          ) {
            return [item, existingSyncData];
          }
          return null;
        },
      ) || [];

      if (changedItem) {
        const resultSyncData = await workspaceProvider
          .saveWorkspaceItem(
            // Use deepCopy to freeze objects
            utils.deepCopy(changedItem),
            utils.deepCopy(syncDataToUpdate),
            ifNotTooLate,
          );
        store.dispatch('data/patchSyncData', {
          [resultSyncData.id]: resultSyncData,
        });
        await saveNextItem();
      }
    });
    await saveNextItem();

    // Called until no item to remove
    const removeNextItem = () => ifNotTooLate(async () => {
      let getItem;
      let getFileItem;
      if (workspaceProvider.isGit) {
        const { gitPathItems } = store.getters;
        getItem = syncData => gitPathItems[syncData.id];
        getFileItem = syncData => gitPathItems[syncData.id.slice(1)]; // Remove leading /
      } else {
        const { allItemMap } = store.getters;
        getItem = syncData => allItemMap[syncData.itemId];
        getFileItem = syncData => allItemMap[syncData.itemId.split('/')[0]];
      }

      const syncData = store.getters['data/syncData'];
      const syncDataToRemove = utils.deepCopy(utils.someResult(
        Object.values(syncData),
        (existingSyncData) => {
          if (!getItem(existingSyncData)
            // We don't want to delete data items, especially on first sync
            && existingSyncData.type !== 'data'
            // Remove content only if file has been removed
            && (existingSyncData.type !== 'content'
              || !getFileItem(existingSyncData))
          ) {
            return existingSyncData;
          }
          return null;
        },
      ));

      if (syncDataToRemove) {
        // Use deepCopy to freeze objects
        await workspaceProvider.removeWorkspaceItem(syncDataToRemove, ifNotTooLate);
        const syncDataCopy = { ...store.getters['data/syncData'] };
        delete syncDataCopy[syncDataToRemove.id];
        store.dispatch('data/setSyncData', syncDataCopy);
        await removeNextItem();
      }
    });
    await removeNextItem();

    // Sync settings and workspaces only in the main workspace
    if (workspace.id === 'main') {
      await syncDataItem('settings');
      await syncDataItem('workspaces');
    }
    await syncDataItem('templates');

    const getOneFileIdToSync = () => {
      const contentIds = [...new Set([
        ...Object.keys(localDbSvc.hashMap.content),
        ...store.getters['file/items'].map(file => `${file.id}/content`),
      ])];
      const contentMap = store.state.content.itemMap;
      const syncDataById = store.getters['data/syncData'];
      let getSyncData;
      if (workspaceProvider.isGit) {
        const { itemGitPaths } = store.getters;
        getSyncData = contentId => syncDataById[itemGitPaths[contentId]];
      } else {
        const syncDataByItemId = store.getters['data/syncDataByItemId'];
        getSyncData = contentId => syncDataByItemId[contentId];
      }

      return utils.someResult(contentIds, (contentId) => {
        // Get content hash from itemMap or from localDbSvc if not loaded
        const loadedContent = contentMap[contentId];
        const hash = loadedContent ? loadedContent.hash : localDbSvc.hashMap.content[contentId];
        const syncData = getSyncData(contentId);
        if (
          // Sync if content syncing was not attempted yet
          !syncContext.attempted[contentId] &&
          // And if syncData does not exist or if content hash and syncData hash are inconsistent
          (!syncData || syncData.hash !== hash)
        ) {
          const [fileId] = contentId.split('/');
          return fileId;
        }
        return null;
      });
    };

    const syncNextFile = async () => {
      const fileId = getOneFileIdToSync();
      if (fileId) {
        await syncFile(fileId, syncContext);
        await syncNextFile();
      }
    };

    const currentFileId = store.getters['file/current'].id;
    if (currentFileId) {
      // Sync current file first
      await syncFile(currentFileId, syncContext);
    }
    await syncNextFile();

    if (syncContext.restart) {
      // Restart sync
      await syncWorkspace();
    }
  } catch (err) {
    if (err && err.message === 'TOO_LATE') {
      // Restart sync
      await syncWorkspace();
    } else {
      throw err;
    }
  } finally {
    if (workspaceProvider.onSyncEnd) {
      workspaceProvider.onSyncEnd();
    }
  }
};

/**
 * Enqueue a sync task, if possible.
 */
const requestSync = () => {
  // No sync in light mode
  if (store.state.light) {
    return;
  }

  store.dispatch('queue/enqueueSyncRequest', async () => {
    let intervalId;
    const attempt = async () => {
      // Only start syncing when these conditions are met
      if (networkSvc.isUserActive() && isSyncWindow()) {
        clearInterval(intervalId);
        if (!isSyncPossible()) {
          // Cancel sync
          throw new Error('Sync not possible.');
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

        try {
          if (isWorkspaceSyncPossible()) {
            await syncWorkspace();
          } else if (hasCurrentFileSyncLocations()) {
            // Only sync current file if workspace sync is unavailable.
            // We could sync all files that are out-of-sync but it would
            // require to load all the syncedContent objects from the DB.
            await syncFile(store.getters['file/current'].id);
          }

          // Clean files
          Object.entries(fileHashesToClean).forEach(([fileId, fileHash]) => {
            const file = store.state.file.itemMap[fileId];
            if (file && file.hash === fileHash) {
              fileSvc.deleteFile(fileId);
            }
          });
        } finally {
          clearInterval(intervalId);
        }
      }
    };

    intervalId = utils.setInterval(() => attempt(), 1000);
    return attempt();
  });
};

export default {
  async init() {
    // Load workspaces and tokens from localStorage
    localDbSvc.syncLocalStorage();

    // Try to find a suitable action provider
    actionProvider = providerRegistry.providers[utils.queryParams.providerId];
    if (actionProvider && actionProvider.initAction) {
      await actionProvider.initAction();
    }

    // Try to find a suitable workspace sync provider
    workspaceProvider = providerRegistry.providers[utils.queryParams.providerId];
    if (!workspaceProvider || !workspaceProvider.initWorkspace) {
      workspaceProvider = googleDriveAppDataProvider;
    }
    const workspace = await workspaceProvider.initWorkspace();
    store.dispatch('workspace/setCurrentWorkspaceId', workspace.id);
    await localDbSvc.init();

    // Try to find a suitable action provider
    actionProvider = providerRegistry.providers[utils.queryParams.providerId] || actionProvider;
    if (actionProvider && actionProvider.performAction) {
      const newSyncLocation = await actionProvider.performAction();
      if (newSyncLocation) {
        this.createSyncLocation(newSyncLocation);
      }
    }

    await tempFileSvc.init();

    if (!store.state.light) {
      // Sync periodically
      utils.setInterval(() => {
        if (isSyncPossible()
          && networkSvc.isUserActive()
          && isSyncWindow()
          && isAutoSyncReady()
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
    }
  },
  isSyncPossible,
  requestSync,
  createSyncLocation,
};
