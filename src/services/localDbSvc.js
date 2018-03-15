import FileSaver from 'file-saver';
import utils from './utils';
import store from '../store';
import welcomeFile from '../data/welcomeFile.md';

const dbVersion = 1;
const dbStoreName = 'objects';
const exportWorkspace = utils.queryParams.exportWorkspace;
const silent = utils.queryParams.silent;
const resetApp = utils.queryParams.reset;
const deleteMarkerMaxAge = 1000;
const checkSponsorshipAfter = (5 * 60 * 1000) + (30 * 1000); // tokenExpirationMargin + 30 sec

const getDbName = (workspaceId) => {
  let dbName = 'stackedit-db';
  if (workspaceId !== 'main') {
    dbName += `-${workspaceId}`;
  }
  return dbName;
};

class Connection {
  constructor() {
    this.getTxCbs = [];

    // Make the DB name
    const workspaceId = store.getters['workspace/currentWorkspace'].id;
    this.dbName = getDbName(workspaceId);

    // Init connection
    const request = indexedDB.open(this.dbName, dbVersion);

    request.onerror = () => {
      throw new Error("Can't connect to IndexedDB.");
    };

    request.onsuccess = (event) => {
      this.db = event.target.result;
      this.db.onversionchange = () => location.reload();

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
        case 0:
          {
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
utils.types.forEach((type) => {
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
    utils.localStorageDataIds.forEach((id) => {
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
      const item = store.state.data.lsItemMap[id];
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
  sync() {
    return new Promise((resolve, reject) => {
      // Create the DB transaction
      this.connection.createTx((tx) => {
        // Look for DB changes and apply them to the store
        this.readAll(tx, (storeItemMap) => {
          // Persist all the store changes into the DB
          this.writeAll(storeItemMap, tx);
          // Sync localStorage
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
    let lastTx = this.lastTx;
    const dbStore = tx.objectStore(dbStoreName);
    const index = dbStore.index('tx');
    const range = window.IDBKeyRange.lowerBound(this.lastTx, true);
    const changes = [];
    index.openCursor(range).onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        const item = cursor.value;
        if (item.tx > lastTx) {
          lastTx = item.tx;
          if (this.lastTx && item.tx - this.lastTx > deleteMarkerMaxAge) {
            // We may have missed some delete markers
            location.reload();
            return;
          }
        }
        // Collect change
        changes.push(item);
        cursor.continue();
      } else {
        const storeItemMap = { ...store.getters.allItemMap };
        changes.forEach((item) => {
          this.readDbItem(item, storeItemMap);
          // If item is an old delete marker, remove it from the DB
          if (!item.hash && lastTx - item.tx > deleteMarkerMaxAge) {
            dbStore.delete(item.id);
          }
        });
        this.lastTx = lastTx;
        cb(storeItemMap);
      }
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
            if (!store.state.file.itemMap[fileId]) {
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
        this.lastTx = incrementedTx; // No need to read what we just wrote
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
        this.lastTx = incrementedTx; // No need to read what we just wrote
      }
    });
  },

  /**
   * Read and apply one DB change.
   */
  readDbItem(dbItem, storeItemMap) {
    const existingStoreItem = storeItemMap[dbItem.id];
    if (!dbItem.hash) {
      // DB item is a delete marker
      delete this.hashMap[dbItem.type][dbItem.id];
      if (existingStoreItem) {
        // Remove item from the store
        store.commit(`${existingStoreItem.type}/deleteItem`, existingStoreItem.id);
        delete storeItemMap[existingStoreItem.id];
      }
    } else if (this.hashMap[dbItem.type][dbItem.id] !== dbItem.hash) {
      // DB item is different from the corresponding store item
      this.hashMap[dbItem.type][dbItem.id] = dbItem.hash;
      // Update content only if it exists in the store
      if (existingStoreItem || !contentTypes[dbItem.type] || exportWorkspace) {
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
  loadItem(id) {
    // Check if item is in the store
    const itemInStore = store.getters.allItemMap[id];
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
  unloadContents() {
    return this.sync()
      .then(() => {
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
      });
  },

  /**
   * Drop the database and clean the localStorage for the specified workspaceId.
   */
  removeWorkspace(id) {
    const workspaces = {
      ...store.getters['data/workspaces'],
    };
    delete workspaces[id];
    store.dispatch('data/setWorkspaces', workspaces);
    this.syncLocalStorage();
    return new Promise((resolve, reject) => {
      const dbName = getDbName(id);
      const request = indexedDB.deleteDatabase(dbName);
      request.onerror = reject;
      request.onsuccess = resolve;
    })
      .then(() => {
        localStorage.removeItem(`${id}/lastSyncActivity`);
        localStorage.removeItem(`${id}/lastWindowFocus`);
      });
  },

  /**
   * Create the connection and start syncing.
   */
  init() {
    return Promise.resolve()
      .then(() => {
        // Reset the app if reset flag was passed
        if (resetApp) {
          return Promise.all(
            Object.keys(store.getters['data/workspaces'])
              .map(workspaceId => localDbSvc.removeWorkspace(workspaceId)),
          )
            .then(() => utils.localStorageDataIds.forEach((id) => {
              // Clean data stored in localStorage
              localStorage.removeItem(`data/${id}`);
            }))
            .then(() => {
              location.reload();
              throw new Error('reload');
            });
        }

        // Create the connection
        this.connection = new Connection();

        // Load the DB
        return localDbSvc.sync();
      })
      .then(() => {
        // If exportWorkspace parameter was provided
        if (exportWorkspace) {
          const backup = JSON.stringify(store.getters.allItemMap);
          const blob = new Blob([backup], {
            type: 'text/plain;charset=utf-8',
          });
          FileSaver.saveAs(blob, 'StackEdit workspace.json');
          return;
        }

        // Save welcome file content hash if not done already
        const hash = utils.hash(welcomeFile);
        const welcomeFileHashes = store.getters['data/localSettings'].welcomeFileHashes;
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
          (store.state.workspace.lastFocus + utils.cleanTrashAfter < Date.now())
        ) {
          // Clean files
          store.getters['file/items']
            .filter(file => file.parentId === 'trash') // If file is in the trash
            .forEach(file => store.dispatch('deleteFile', file.id));
        }

        // Enable sponsorship
        if (utils.queryParams.paymentSuccess) {
          location.hash = ''; // PaymentSuccess param is always on its own
          store.dispatch('modal/paymentSuccess');
          const sponsorToken = store.getters['workspace/sponsorToken'];
          // Force check sponsorship after a few seconds
          const currentDate = Date.now();
          if (sponsorToken && sponsorToken.expiresOn > currentDate - checkSponsorshipAfter) {
            store.dispatch('data/setGoogleToken', {
              ...sponsorToken,
              expiresOn: currentDate - checkSponsorshipAfter,
            });
          }
        }

        // Sync local DB periodically
        utils.setInterval(() => localDbSvc.sync(), 1000);

        // watch current file changing
        store.watch(
          () => store.getters['file/current'].id,
          () => {
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
                store.dispatch('createFile', {
                  name: 'Welcome file',
                  text: welcomeFile,
                })
                  // Set it as the current file
                  .then(newFile => store.commit('file/setCurrentId', newFile.id));
              }
            } else {
              Promise.resolve()
                // Load contentState from DB
                .then(() => localDbSvc.loadContentState(currentFile.id))
                // Load syncedContent from DB
                .then(() => localDbSvc.loadSyncedContent(currentFile.id))
                // Load content from DB
                .then(() => localDbSvc.loadItem(`${currentFile.id}/content`))
                .then(
                  () => {
                    // Set last opened file
                    store.dispatch('data/setLastOpenedId', currentFile.id);
                    // Cancel new discussion
                    store.commit('discussion/setCurrentDiscussionId');
                    // Open the gutter if file contains discussions
                    store.commit('discussion/setCurrentDiscussionId',
                      store.getters['discussion/nextDiscussionId']);
                  },
                  (err) => {
                    // Failure (content is not available), go back to previous file
                    const lastOpenedFile = store.getters['file/lastOpened'];
                    store.commit('file/setCurrentId', lastOpenedFile.id);
                    throw err;
                  },
                )
                .catch((err) => {
                  console.error(err); // eslint-disable-line no-console
                  store.dispatch('notification/error', err);
                });
            }
          }, {
            immediate: true,
          });
      });
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
