import localDbSvc from './localDbSvc';
import store from '../store';
import utils from './utils';
import diffUtils from './diffUtils';
import networkSvc from './networkSvc';
import providerRegistry from './providers/common/providerRegistry';
import googleDriveAppDataProvider from './providers/googleDriveAppDataProvider';
import './providers/couchdbWorkspaceProvider';
import './providers/githubWorkspaceProvider';
import './providers/gitlabWorkspaceProvider';
import './providers/googleDriveWorkspaceProvider';
import tempFileSvc from './tempFileSvc';
import workspaceSvc from './workspaceSvc';
import constants from '../data/constants';
import badgeSvc from './badgeSvc';

const minAutoSyncEvery = 60 * 1000; // 60 sec
const inactivityThreshold = 3 * 1000; // 3 sec
const restartSyncAfter = 30 * 1000; // 30 sec
const restartContentSyncAfter = 1000; // Enough to detect an authorize pop up
const checkSponsorshipAfter = (5 * 60 * 1000) + (30 * 1000); // tokenExpirationMargin + 30 sec
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
    if (syncLocationId !== 'main' && !store.state.syncLocation.itemsById[syncLocationId]) {
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
 * Apply changes retrieved from the workspace provider. Update sync data accordingly.
 */
const applyChanges = (changes) => {
  const allItemsById = { ...store.getters.allItemsById };
  const syncDataById = { ...store.getters['data/syncDataById'] };
  const idsToKeep = {};
  let saveSyncData = false;
  let getExistingItem;
  if (store.getters['workspace/currentWorkspaceIsGit']) {
    const itemsByGitPath = { ...store.getters.itemsByGitPath };
    getExistingItem = existingSyncData => existingSyncData && itemsByGitPath[existingSyncData.id];
  } else {
    getExistingItem = existingSyncData => existingSyncData && allItemsById[existingSyncData.itemId];
  }

  // Process each change
  changes.forEach((change) => {
    const existingSyncData = syncDataById[change.syncDataId];
    const existingItem = getExistingItem(existingSyncData);
    // If item was removed
    if (!change.item && existingSyncData) {
      if (syncDataById[change.syncDataId]) {
        delete syncDataById[change.syncDataId];
        saveSyncData = true;
      }
      if (existingItem) {
        // Remove object from the store
        store.commit(`${existingItem.type}/deleteItem`, existingItem.id);
        delete allItemsById[existingItem.id];
      }
    // If item was modified
    } else if (change.item && change.item.hash) {
      idsToKeep[change.item.id] = true;

      if ((existingSyncData || {}).hash !== change.syncData.hash) {
        syncDataById[change.syncDataId] = change.syncData;
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
        allItemsById[change.item.id] = change.item;
      }
    }
  });

  if (saveSyncData) {
    store.dispatch('data/setSyncDataById', syncDataById);

    // Sanitize the workspace
    workspaceSvc.sanitizeWorkspace(idsToKeep);
  }
};

/**
 * Create a sync location by uploading the current file content.
 */
const createSyncLocation = (syncLocation) => {
  const currentFile = store.getters['file/current'];
  const fileId = currentFile.id;
  syncLocation.fileId = fileId;
  // Use deepCopy to freeze the item
  const content = utils.deepCopy(store.getters['content/current']);
  store.dispatch(
    'queue/enqueue',
    async () => {
      const provider = providerRegistry.providersById[syncLocation.providerId];
      const token = provider.getToken(syncLocation);
      const updatedSyncLocation = await provider.uploadContent(token, {
        ...content,
        history: [content.hash],
      }, syncLocation);
      await localDbSvc.loadSyncedContent(fileId);
      const newSyncedContent = utils.deepCopy(upgradeSyncedContent(store.state.syncedContent.itemsById[`${fileId}/syncedContent`]));
      const newSyncHistoryItem = [];
      newSyncedContent.syncHistory[syncLocation.id] = newSyncHistoryItem;
      newSyncHistoryItem[LAST_SEEN] = content.hash;
      newSyncHistoryItem[LAST_SENT] = content.hash;
      newSyncedContent.historyData[content.hash] = content;

      store.commit('syncedContent/patchItem', newSyncedContent);
      workspaceSvc.addSyncLocation(updatedSyncLocation);
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
 * Return true if file is in the temp folder or is a welcome file.
 */
const isTempFile = (fileId) => {
  const contentId = `${fileId}/content`;
  if (store.getters['data/syncDataByItemId'][contentId]) {
    // If file has already been synced, let's not consider it a temp file
    return false;
  }
  const file = store.state.file.itemsById[fileId];
  const content = store.state.content.itemsById[contentId];
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

/**
 * Patch sync data if some have changed in the result.
 */
const updateSyncData = (result) => {
  [
    result.syncData,
    result.contentSyncData,
    result.fileSyncData,
  ].forEach((syncData) => {
    if (syncData) {
      const oldSyncData = store.getters['data/syncDataById'][syncData.id];
      if (utils.serializeObject(oldSyncData) !== utils.serializeObject(syncData)) {
        store.dispatch('data/patchSyncDataById', {
          [syncData.id]: syncData,
        });
      }
    }
  });
  return result;
};

class SyncContext {
  restartSkipContents = false;
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

  const getSyncedContent = () => upgradeSyncedContent(store.state.syncedContent.itemsById[`${fileId}/syncedContent`]);
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
      const provider = providerRegistry.providersById[syncLocation.providerId];
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
        const oldContentSyncData = store.getters['data/syncDataByItemId'][contentId];
        const oldFileSyncData = store.getters['data/syncDataByItemId'][fileId];
        if (!oldContentSyncData || !oldFileSyncData) {
          return null;
        }

        const { content } = updateSyncData(await provider.downloadWorkspaceContent({
          token,
          contentId,
          contentSyncData: oldContentSyncData,
          fileSyncData: oldFileSyncData,
        }));

        // Return the downloaded content
        return content;
      };

      const uploadContent = async (content, ifNotTooLate) => {
        // On simple provider, call simply uploadContent
        if (syncLocation.id !== 'main') {
          return provider.uploadContent(token, content, syncLocation, ifNotTooLate);
        }

        // On workspace provider, call uploadWorkspaceContent
        const oldContentSyncData = store.getters['data/syncDataByItemId'][contentId];
        if (oldContentSyncData && oldContentSyncData.hash === content.hash) {
          return syncLocation;
        }
        const oldFileSyncData = store.getters['data/syncDataByItemId'][fileId];

        updateSyncData(await provider.uploadWorkspaceContent({
          token,
          content,
          // Use deepCopy to freeze item
          file: utils.deepCopy(store.state.file.itemsById[fileId]),
          contentSyncData: oldContentSyncData,
          fileSyncData: oldFileSyncData,
          ifNotTooLate,
        }));

        // Return syncLocation
        return syncLocation;
      };

      const doSyncLocation = async () => {
        const serverContent = await downloadContent(token, syncLocation);
        const syncedContent = getSyncedContent();
        const syncHistoryItem = getSyncHistoryItem(syncLocation.id);

        // Merge content
        let mergedContent;
        const clientContent = utils.deepCopy(store.state.content.itemsById[contentId]);
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
        mergedContent = utils.deepCopy(store.state.content.itemsById[contentId]);

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
          serverContent.history.includes(newSyncHistoryItem[LAST_SEEN]))
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

        // If content is to be created, schedule a restart to create the file as well
        if (provider === workspaceProvider &&
          !store.getters['data/syncDataByItemId'][fileId]
        ) {
          syncContext.restartSkipContents = true;
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
          workspaceSvc.ensureUniqueLocations();
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
    } else {
      throw err;
    }
  } finally {
    await localDbSvc.unloadContents();
  }
};

/**
 * Sync a data item, typically settings, templates or workspaces.
 */
const syncDataItem = async (dataId) => {
  const getItem = () => store.state.data.itemsById[dataId]
    || store.state.data.lsItemsById[dataId];

  const oldItem = getItem();
  const oldSyncData = store.getters['data/syncDataByItemId'][dataId];
  // Sync if item hash and syncData hash are out of sync
  if (oldSyncData && oldItem && oldItem.hash === oldSyncData.hash) {
    return;
  }

  const token = workspaceProvider.getToken();
  const { item } = updateSyncData(await workspaceProvider.downloadWorkspaceData({
    token,
    syncData: oldSyncData,
  }));

  const serverItem = item;
  const dataSyncData = store.getters['data/dataSyncDataById'][dataId];
  const clientItem = utils.deepCopy(getItem());
  let mergedItem = (() => {
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

  if (clientItem && dataId === 'workspaces') {
    // Clean deleted workspaces
    await Promise.all(Object.keys(clientItem.data)
      .filter(id => !mergedItem.data[id])
      .map(id => workspaceSvc.removeWorkspace(id)));
  }

  // Update item in store
  store.commit('data/setItem', {
    id: dataId,
    ...mergedItem,
  });

  // Retrieve item with new `hash` and freeze it
  mergedItem = utils.deepCopy(getItem());

  // Upload merged data item if out of sync
  if (!serverItem || serverItem.hash !== mergedItem.hash) {
    updateSyncData(await workspaceProvider.uploadWorkspaceData({
      token,
      item: mergedItem,
      syncData: store.getters['data/syncDataByItemId'][dataId],
      ifNotTooLate: tooLateChecker(restartContentSyncAfter),
    }));
  }

  // Copy sync data into data sync data
  store.dispatch('data/patchDataSyncDataById', {
    [dataId]: utils.deepCopy(store.getters['data/syncDataByItemId'][dataId]),
  });
};

/**
 * Sync the whole workspace with the main provider and the current file explicit locations.
 */
const syncWorkspace = async (skipContents = false) => {
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
    applyChanges(workspaceProvider.prepareChanges(changes));
    workspaceProvider.onChangesApplied();

    // Prevent from sending items too long after changes have been retrieved
    const ifNotTooLate = tooLateChecker(restartSyncAfter);

    // Find and save one item to save
    await utils.awaitSome(() => ifNotTooLate(async () => {
      const storeItemMap = {
        ...store.state.file.itemsById,
        ...store.state.folder.itemsById,
        ...store.state.syncLocation.itemsById,
        ...store.state.publishLocation.itemsById,
        // Deal with contents and data later
      };

      const syncDataByItemId = store.getters['data/syncDataByItemId'];
      const isGit = !!store.getters['workspace/currentWorkspaceIsGit'];
      const [changedItem, syncDataToUpdate] = utils.someResult(
        Object.entries(storeItemMap),
        ([id, item]) => {
          const syncData = syncDataByItemId[id];
          if ((syncData && syncData.hash === item.hash)
            // Add file/folder only if parent folder has been added
            || (!isGit && storeItemMap[item.parentId] && !syncDataByItemId[item.parentId])
            // Don't create folder if it's a git workspace
            || (isGit && item.type === 'folder')
            // Add file only if content has been added
            || (item.type === 'file' && !syncDataByItemId[`${id}/content`])
          ) {
            return null;
          }
          return [item, syncData];
        },
      ) || [];

      if (!changedItem) return false;

      updateSyncData(await workspaceProvider.saveWorkspaceItem({
        // Use deepCopy to freeze objects
        item: utils.deepCopy(changedItem),
        syncData: utils.deepCopy(syncDataToUpdate),
        ifNotTooLate,
      }));

      return true;
    }));

    // Find and remove one item to remove
    await utils.awaitSome(() => ifNotTooLate(async () => {
      let getItem;
      let getFileItem;
      if (store.getters['workspace/currentWorkspaceIsGit']) {
        const { itemsByGitPath } = store.getters;
        getItem = syncData => itemsByGitPath[syncData.id];
        getFileItem = syncData => itemsByGitPath[syncData.id.slice(1)]; // Remove leading /
      } else {
        const { allItemsById } = store.getters;
        getItem = syncData => allItemsById[syncData.itemId];
        getFileItem = syncData => allItemsById[syncData.itemId.split('/')[0]];
      }

      const syncDataById = store.getters['data/syncDataById'];
      const syncDataToRemove = utils.deepCopy(utils.someResult(
        Object.values(syncDataById),
        (syncData) => {
          if (getItem(syncData)
            // We don't want to delete data items, especially on first sync
            || syncData.type === 'data'
            // Remove content only if file has been removed
            || (syncData.type === 'content' && getFileItem(syncData))
          ) {
            return null;
          }
          return syncData;
        },
      ));

      if (!syncDataToRemove) return false;

      await workspaceProvider.removeWorkspaceItem({
        syncData: syncDataToRemove,
        ifNotTooLate,
      });
      const syncDataByIdCopy = { ...store.getters['data/syncDataById'] };
      delete syncDataByIdCopy[syncDataToRemove.id];
      store.dispatch('data/setSyncDataById', syncDataByIdCopy);
      return true;
    }));

    // Sync settings, workspaces and badges only in the main workspace
    if (workspace.id === 'main') {
      await syncDataItem('settings');
      await syncDataItem('workspaces');
      await syncDataItem('badgeCreations');
    }
    await syncDataItem('templates');

    if (!skipContents) {
      const currentFileId = store.getters['file/current'].id;
      if (currentFileId) {
        // Sync current file first
        await syncFile(currentFileId, syncContext);
      }

      // Find and sync one file out of sync
      await utils.awaitSome(async () => {
        let getSyncData;
        if (store.getters['workspace/currentWorkspaceIsGit']) {
          const { gitPathsByItemId } = store.getters;
          const syncDataById = store.getters['data/syncDataById'];
          getSyncData = contentId => syncDataById[gitPathsByItemId[contentId]];
        } else {
          const syncDataByItemId = store.getters['data/syncDataByItemId'];
          getSyncData = contentId => syncDataByItemId[contentId];
        }

        // Collect all [fileId, contentId]
        const ids = [
          ...Object.keys(localDbSvc.hashMap.content)
            .map(contentId => [contentId.split('/')[0], contentId]),
          ...store.getters['file/items']
            .map(file => [file.id, `${file.id}/content`]),
        ];

        // Find the first content out of sync
        const contentMap = store.state.content.itemsById;
        const fileIdToSync = utils.someResult(ids, ([fileId, contentId]) => {
          // Get the content hash from itemsById or from localDbSvc if not loaded
          const loadedContent = contentMap[contentId];
          const hash = loadedContent ? loadedContent.hash : localDbSvc.hashMap.content[contentId];
          const syncData = getSyncData(contentId);
          if (
            // Sync if content syncing was not attempted yet
            !syncContext.attempted[contentId] &&
            // And if syncData does not exist or if content hash and syncData hash are inconsistent
            (!syncData || syncData.hash !== hash)
          ) {
            return fileId;
          }
          return null;
        });

        if (!fileIdToSync) return false;

        await syncFile(fileIdToSync, syncContext);
        return true;
      });
    }

    // Restart sync if requested
    if (syncContext.restartSkipContents) {
      await syncWorkspace(true);
    }

    if (workspace.id === 'main') {
      badgeSvc.addBadge('syncMainWorkspace');
    }
  } catch (err) {
    if (err && err.message === 'TOO_LATE') {
      // Restart sync
      await syncWorkspace();
    } else {
      throw err;
    }
  }
};

/**
 * Enqueue a sync task, if possible.
 */
const requestSync = (addTriggerSyncBadge = false) => {
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
        if (getLastStoredSyncActivity() + constants.cleanTrashAfter < Date.now()) {
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
            // Only sync the current file if workspace sync is unavailable
            // as we don't want to look for out-of-sync files by loading
            // all the syncedContent objects.
            await syncFile(store.getters['file/current'].id);
          }

          // Clean files
          Object.entries(fileHashesToClean).forEach(([fileId, fileHash]) => {
            const file = store.state.file.itemsById[fileId];
            if (file && file.hash === fileHash) {
              workspaceSvc.deleteFile(fileId);
            }
          });

          if (addTriggerSyncBadge) {
            badgeSvc.addBadge('triggerSync');
          }
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
    actionProvider = providerRegistry.providersById[utils.queryParams.providerId];
    if (actionProvider && actionProvider.initAction) {
      await actionProvider.initAction();
    }

    // Try to find a suitable workspace sync provider
    workspaceProvider = providerRegistry.providersById[utils.queryParams.providerId];
    if (!workspaceProvider || !workspaceProvider.initWorkspace) {
      workspaceProvider = googleDriveAppDataProvider;
    }
    const workspace = await workspaceProvider.initWorkspace();
    // Fix the URL hash
    const { paymentSuccess } = utils.queryParams;
    utils.setQueryParams(workspaceProvider.getWorkspaceParams(workspace));

    store.dispatch('workspace/setCurrentWorkspaceId', workspace.id);
    await localDbSvc.init();

    // Enable sponsorship
    if (paymentSuccess) {
      store.dispatch('modal/open', 'paymentSuccess')
        .catch(() => { /* Cancel */ });
      const sponsorToken = store.getters['workspace/sponsorToken'];
      // Force check sponsorship after a few seconds
      const currentDate = Date.now();
      if (sponsorToken && sponsorToken.expiresOn > currentDate - checkSponsorshipAfter) {
        store.dispatch('data/addGoogleToken', {
          ...sponsorToken,
          expiresOn: currentDate - checkSponsorshipAfter,
        });
      }
    }

    // Try to find a suitable action provider
    actionProvider = providerRegistry.providersById[utils.queryParams.providerId] || actionProvider;
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
