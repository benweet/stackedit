import utils from './utils';
import store from '../store';
import welcomeFile from '../data/welcomeFile.md';
import workspaceSvc from './workspaceSvc';
import constants from '../data/constants';

const deleteMarkerMaxAge = 1000;
const dbVersion = 1;
const dbStoreName = 'objects';
const { silent } = utils.queryParams;
const resetApp = localStorage.getItem('resetStackEdit');
if (resetApp) {
  localStorage.removeItem('resetStackEdit');
}

class Connection {
  constructor(workspaceId = store.getters['workspace/currentWorkspace'].id) {
    this.getTxCbs = [];

    // Make the DB name
    this.dbName = utils.getDbName(workspaceId);

    // Init connection
    const request = indexedDB.open(this.dbName, dbVersion);

    request.onerror = () => {
      throw new Error("Can't connect to IndexedDB.");
    };

    request.onsuccess = (event) => {
      this.db = event.target.result;
      this.db.onversionchange = () => window.location.reload();

      this.getTxCbs.forEach(({ onTx, onError }) => this.createTx(onTx, onError));
      this.getTxCbs = null;
    };

    request.onupgradeneeded = (event) => {
      const eventDb = event.target.result;
      const oldVersion = event.oldVersion || 0;

      // We don't use 'break' in this switch statement,
      // the fall-through behavior is what we want.
      /* eslint-disable no-fallthrough */
      switch (oldVersion) {
        case 0: {
          // Create store
          const dbStore = eventDb.createObjectStore(dbStoreName, {
            keyPath: 'id',
          });
          dbStore.createIndex('tx', 'tx', {
            unique: false,
          });
        }
        default:
      }
      /* eslint-enable no-fallthrough */
    };
  }

  /**
   * Create a transaction asynchronously.
   */
  createTx(onTx, onError) {
    // If DB is not ready, keep callbacks for later
    if (!this.db) {
      return this.getTxCbs.push({ onTx, onError });
    }

    // Open transaction in read/write will prevent conflict with other tabs
    const tx = this.db.transaction(this.db.objectStoreNames, 'readwrite');
    tx.onerror = onError;

    return onTx(tx);
  }
}

const contentTypes = {
  content: true,
  contentState: true,
  syncedContent: true,
};

const hashMap = {};
constants.types.forEach((type) => {
  hashMap[type] = Object.create(null);
});
const lsHashMap = Object.create(null);

const localDbSvc = {
  lastTx: 0,
  hashMap,
  connection: null,

  /**
   * Sync data items stored in the localStorage.
   */
  syncLocalStorage() {
    constants.localStorageDataIds.forEach((id) => {
      const key = `data/${id}`;

      // Skip reloading the layoutSettings
      if (id !== 'layoutSettings' || !lsHashMap[id]) {
        try {
          // Try to parse the item from the localStorage
          const storedItem = JSON.parse(localStorage.getItem(key));
          if (storedItem.hash && lsHashMap[id] !== storedItem.hash) {
            // Item has changed, replace it in the store
            store.commit('data/setItem', storedItem);
            lsHashMap[id] = storedItem.hash;
          }
        } catch (e) {
          // Ignore parsing issue
        }
      }

      // Write item if different from stored one
      const item = store.state.data.lsItemsById[id];
      if (item && item.hash !== lsHashMap[id]) {
        localStorage.setItem(key, JSON.stringify(item));
        lsHashMap[id] = item.hash;
      }
    });
  },

  /**
   * Return a promise that will be resolved once the synchronization between the store and the
   * localDb will be finished. Effectively, open a transaction, then read and apply all changes
   * from the DB since the previous transaction, then write all the changes from the store.
   */
  async sync() {
    return new Promise((resolve, reject) => {
      // Create the DB transaction
      this.connection.createTx((tx) => {
        const { lastTx } = this;

        // Look for DB changes and apply them to the store
        this.readAll(tx, (storeItemMap) => {
          // Sanitize the workspace if changes have been applied
          if (lastTx !== this.lastTx) {
            workspaceSvc.sanitizeWorkspace();
          }

          // Persist all the store changes into the DB
          this.writeAll(storeItemMap, tx);
          // Sync the localStorage
          this.syncLocalStorage();
          // Done
          resolve();
        });
      }, () => reject(new Error('Local DB access error.')));
    });
  },

  /**
   * Read and apply all changes from the DB since previous transaction.
   */
  readAll(tx, cb) {
    let { lastTx } = this;
    const dbStore = tx.objectStore(dbStoreName);
    const index = dbStore.index('tx');
    const range = IDBKeyRange.lowerBound(this.lastTx, true);
    const changes = [];
    index.openCursor(range).onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        const item = cursor.value;
        if (item.tx > lastTx) {
          lastTx = item.tx;
          if (this.lastTx && item.tx - this.lastTx > deleteMarkerMaxAge) {
            // We may have missed some delete markers
            window.location.reload();
            return;
          }
        }
        // Collect change
        changes.push(item);
        cursor.continue();
        return;
      }

      // Read the collected changes
      const storeItemMap = { ...store.getters.allItemsById };
      changes.forEach((item) => {
        this.readDbItem(item, storeItemMap);
        // If item is an old delete marker, remove it from the DB
        if (!item.hash && lastTx - item.tx > deleteMarkerMaxAge) {
          dbStore.delete(item.id);
        }
      });

      this.lastTx = lastTx;
      cb(storeItemMap);
    };
  },

  /**
   * Write all changes from the store since previous transaction.
   */
  writeAll(storeItemMap, tx) {
    if (silent) {
      // Skip writing to DB in silent mode
      return;
    }
    const dbStore = tx.objectStore(dbStoreName);
    const incrementedTx = this.lastTx + 1;

    // Remove deleted store items
    Object.keys(this.hashMap).forEach((type) => {
      // Remove this type only if file is deleted
      let checker = cb => id => !storeItemMap[id] && cb(id);
      if (contentTypes[type]) {
        // For content types, remove item only if file is deleted
        checker = cb => (id) => {
          if (!storeItemMap[id]) {
            const [fileId] = id.split('/');
            if (!store.state.file.itemsById[fileId]) {
              cb(id);
            }
          }
        };
      }
      Object.keys(this.hashMap[type]).forEach(checker((id) => {
        // Put a delete marker to notify other tabs
        dbStore.put({
          id,
          type,
          tx: incrementedTx,
        });
        delete this.hashMap[type][id];
        this.lastTx = incrementedTx;
      }));
    });

    // Put changes
    Object.entries(storeItemMap).forEach(([, storeItem]) => {
      // Store object has changed
      if (this.hashMap[storeItem.type][storeItem.id] !== storeItem.hash) {
        const item = {
          ...storeItem,
          tx: incrementedTx,
        };
        dbStore.put(item);
        this.hashMap[item.type][item.id] = item.hash;
        this.lastTx = incrementedTx;
      }
    });
  },

  /**
   * Read and apply one DB change.
   */
  readDbItem(dbItem, storeItemMap) {
    const storeItem = storeItemMap[dbItem.id];
    if (!dbItem.hash) {
      // DB item is a delete marker
      delete this.hashMap[dbItem.type][dbItem.id];
      if (storeItem) {
        // Remove item from the store
        store.commit(`${storeItem.type}/deleteItem`, storeItem.id);
        delete storeItemMap[storeItem.id];
      }
    } else if (this.hashMap[dbItem.type][dbItem.id] !== dbItem.hash) {
      // DB item is different from the corresponding store item
      this.hashMap[dbItem.type][dbItem.id] = dbItem.hash;
      // Update content only if it exists in the store
      if (storeItem || !contentTypes[dbItem.type]) {
        // Put item in the store
        dbItem.tx = undefined;
        store.commit(`${dbItem.type}/setItem`, dbItem);
        storeItemMap[dbItem.id] = dbItem;
      }
    }
  },

  /**
   * Retrieve an item from the DB and put it in the store.
   */
  async loadItem(id) {
    // Check if item is in the store
    const itemInStore = store.getters.allItemsById[id];
    if (itemInStore) {
      // Use deepCopy to freeze item
      return Promise.resolve(itemInStore);
    }
    return new Promise((resolve, reject) => {
      // Get the item from DB
      const onError = () => reject(new Error('Data not available.'));
      this.connection.createTx((tx) => {
        const dbStore = tx.objectStore(dbStoreName);
        const request = dbStore.get(id);
        request.onsuccess = () => {
          const dbItem = request.result;
          if (!dbItem || !dbItem.hash) {
            onError();
          } else {
            this.hashMap[dbItem.type][dbItem.id] = dbItem.hash;
            // Put item in the store
            dbItem.tx = undefined;
            store.commit(`${dbItem.type}/setItem`, dbItem);
            resolve(dbItem);
          }
        };
      }, () => onError());
    });
  },

  /**
   * Unload from the store contents that haven't been opened recently
   */
  async unloadContents() {
    await this.sync();
    // Keep only last opened files in memory
    const lastOpenedFileIdSet = new Set(store.getters['data/lastOpenedIds']);
    Object.keys(contentTypes).forEach((type) => {
      store.getters[`${type}/items`].forEach((item) => {
        const [fileId] = item.id.split('/');
        if (!lastOpenedFileIdSet.has(fileId)) {
          // Remove item from the store
          store.commit(`${type}/deleteItem`, item.id);
        }
      });
    });
  },

  /**
   * Create the connection and start syncing.
   */
  async init() {
    // Reset the app if the reset flag was passed
    if (resetApp) {
      await Promise.all(Object.keys(store.getters['workspace/workspacesById'])
        .map(workspaceId => workspaceSvc.removeWorkspace(workspaceId)));
      constants.localStorageDataIds.forEach((id) => {
        // Clean data stored in localStorage
        localStorage.removeItem(`data/${id}`);
      });
      throw new Error('RELOAD');
    }

    // Create the connection
    this.connection = new Connection();

    // Load the DB
    await localDbSvc.sync();

    // Watch workspace deletions and persist them as soon as possible
    // to make the changes available to reloading workspace tabs.
    store.watch(
      () => store.getters['data/workspaces'],
      () => this.syncLocalStorage(),
    );

    // Save welcome file content hash if not done already
    const hash = utils.hash(welcomeFile);
    const { welcomeFileHashes } = store.getters['data/localSettings'];
    if (!welcomeFileHashes[hash]) {
      store.dispatch('data/patchLocalSettings', {
        welcomeFileHashes: {
          ...welcomeFileHashes,
          [hash]: 1,
        },
      });
    }

    // If app was last opened 7 days ago and synchronization is off
    if (!store.getters['workspace/syncToken'] &&
      (store.state.workspace.lastFocus + constants.cleanTrashAfter < Date.now())
    ) {
      // Clean files
      store.getters['file/items']
        .filter(file => file.parentId === 'trash') // If file is in the trash
        .forEach(file => workspaceSvc.deleteFile(file.id));
    }

    // Sync local DB periodically
    utils.setInterval(() => localDbSvc.sync(), 1000);

    // watch current file changing
    store.watch(
      () => store.getters['file/current'].id,
      async () => {
        // See if currentFile is real, ie it has an ID
        const currentFile = store.getters['file/current'];
        // If current file has no ID, get the most recent file
        if (!currentFile.id) {
          const recentFile = store.getters['file/lastOpened'];
          // Set it as the current file
          if (recentFile.id) {
            store.commit('file/setCurrentId', recentFile.id);
          } else {
            // If still no ID, create a new file
            const newFile = await workspaceSvc.createFile({
              name: 'Welcome file',
              text: welcomeFile,
            }, true);
            // Set it as the current file
            store.commit('file/setCurrentId', newFile.id);
          }
        } else {
          try {
            // Load contentState from DB
            await localDbSvc.loadContentState(currentFile.id);
            // Load syncedContent from DB
            await localDbSvc.loadSyncedContent(currentFile.id);
            // Load content from DB
            try {
              await localDbSvc.loadItem(`${currentFile.id}/content`);
            } catch (err) {
              // Failure (content is not available), go back to previous file
              const lastOpenedFile = store.getters['file/lastOpened'];
              store.commit('file/setCurrentId', lastOpenedFile.id);
              throw err;
            }
            // Set last opened file
            store.dispatch('data/setLastOpenedId', currentFile.id);
            // Cancel new discussion and open the gutter if file contains discussions
            store.commit(
              'discussion/setCurrentDiscussionId',
              store.getters['discussion/nextDiscussionId'],
            );
          } catch (err) {
            console.error(err); // eslint-disable-line no-console
            store.dispatch('notification/error', err);
          }
        }
      },
      { immediate: true },
    );
  },

  getWorkspaceItems(workspaceId, onItem, onFinish = () => {}) {
    const connection = new Connection(workspaceId);
    connection.createTx((tx) => {
      const dbStore = tx.objectStore(dbStoreName);
      const index = dbStore.index('tx');
      index.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          onItem(cursor.value);
          cursor.continue();
        } else {
          connection.db.close();
          onFinish();
        }
      };
    });

    // Return a cancel function
    return () => connection.db.close();
  },
};

const loader = type => fileId => localDbSvc.loadItem(`${fileId}/${type}`)
  // Item does not exist, create it
  .catch(() => store.commit(`${type}/setItem`, {
    id: `${fileId}/${type}`,
  }));
localDbSvc.loadSyncedContent = loader('syncedContent');
localDbSvc.loadContentState = loader('contentState');

export default localDbSvc;
