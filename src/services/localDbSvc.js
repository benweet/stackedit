import 'babel-polyfill';
import 'indexeddbshim/dist/indexeddbshim';
import utils from './utils';
import store from '../store';

const indexedDB = window.indexedDB;
const dbVersion = 1;
const dbVersionKey = `${utils.workspaceId}/localDbVersion`;
const dbStoreName = 'objects';

if (!indexedDB) {
  throw new Error('Your browser is not supported. Please upgrade to the latest version.');
}

const deleteMarkerMaxAge = 1000;

class Connection {
  constructor() {
    this.getTxCbs = [];

    // Init connexion
    const request = indexedDB.open('stackedit-db', dbVersion);

    request.onerror = () => {
      throw new Error("Can't connect to IndexedDB.");
    };

    request.onsuccess = (event) => {
      this.db = event.target.result;
      localStorage[dbVersionKey] = this.db.version; // Safari does not support onversionchange
      this.db.onversionchange = () => window.location.reload();

      this.getTxCbs.forEach(({ onTx, onError }) => this.createTx(onTx, onError));
      this.getTxCbs = null;
    };

    request.onupgradeneeded = (event) => {
      const eventDb = event.target.result;
      const oldVersion = event.oldVersion || 0;

      // We don't use 'break' in this switch statement,
      // the fall-through behaviour is what we want.
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

    // If DB version has changed (Safari support)
    if (parseInt(localStorage[dbVersionKey], 10) !== this.db.version) {
      return window.location.reload();
    }

    // Open transaction in read/write will prevent conflict with other tabs
    const tx = this.db.transaction(this.db.objectStoreNames, 'readwrite');
    tx.onerror = onError;

    return onTx(tx);
  }
}

const hashMap = {};
utils.types.forEach((type) => {
  hashMap[type] = Object.create(null);
});

const contentTypes = {
  content: true,
  contentState: true,
  syncedContent: true,
};

export default {
  lastTx: 0,
  hashMap,
  connection: new Connection(),

  /**
   * Return a promise that is resolved once the synchronization between the store and the localDb
   * is finished. Effectively, open a transaction, then read and apply all changes from the DB
   * since the previous transaction, then write all the changes from the store.
   */
  sync() {
    return new Promise((resolve, reject) => {
      const storeItemMap = { ...store.getters.allItemMap };
      this.connection.createTx((tx) => {
        this.readAll(storeItemMap, tx, () => {
          this.writeAll(storeItemMap, tx);
          if (!store.state.ready) {
            store.commit('setReady');
          }
          resolve();
        });
      }, () => reject(new Error('Local DB access error.')));
    });
  },

  /**
   * Read and apply all changes from the DB since previous transaction.
   */
  readAll(storeItemMap, tx, cb) {
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
            window.location.reload();
            return;
          }
        }
        // Collect change
        changes.push(item);
        cursor.continue();
      } else {
        changes.forEach((item) => {
          this.readDbItem(item, storeItemMap);
          // If item is an old delete marker, remove it from the DB
          if (!item.hash && lastTx - item.tx > deleteMarkerMaxAge) {
            dbStore.delete(item.id);
          }
        });
        this.lastTx = lastTx;
        cb();
      }
    };
  },

  /**
   * Write all changes from the store since previous transaction.
   */
  writeAll(storeItemMap, tx) {
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
    Object.keys(storeItemMap).forEach((id) => {
      const storeItem = storeItemMap[id];
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
      if (existingStoreItem || !contentTypes[dbItem.type]) {
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
        const lastOpenedFileIds = new Set(store.getters['data/lastOpenedIds']);
        Object.keys(contentTypes).forEach((type) => {
          store.getters[`${type}/items`].forEach((item) => {
            const [fileId] = item.id.split('/');
            if (!lastOpenedFileIds.has(fileId)) {
              // Remove item from the store
              store.commit(`${type}/deleteItem`, item.id);
            }
          });
        });
      });
  },

  /**
   * Drop the database
   */
  removeDb() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.deleteDatabase('stackedit-db');
      request.onerror = reject;
      request.onsuccess = resolve;
    })
    .then(() => {
      localStorage.removeItem(dbVersionKey);
      window.location.reload();
    }, () => store.dispatch('notification/error', 'Could not delete local database.'));
  },
};
