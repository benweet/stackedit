import 'babel-polyfill';
import 'indexeddbshim';
import debug from 'debug';
import store from '../store';

const dbg = debug('stackedit:localDbSvc');

let indexedDB = window.indexedDB;
const localStorage = window.localStorage;
const dbVersion = 1;
const dbStoreName = 'objects';

// Use the shim on Safari or when indexedDB is not available
if (window.shimIndexedDB && (!indexedDB || (navigator.userAgent.indexOf('Chrome') === -1 && navigator.userAgent.indexOf('Safari') !== -1))) {
  indexedDB = window.shimIndexedDB;
}

function getStorePrefixFromType(type) {
  // Return `files` for type `file`, `folders` for type `folder`, etc...
  const prefix = `${type}s`;
  return store.state[prefix] ? prefix : 'data';
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
      localStorage.localDbVersion = this.db.version; // Safari does not support onversionchange
      this.db.onversionchange = () => window.location.reload();

      this.getTxCbs.forEach(cb => this.createTx(cb));
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
   * Create a connection asynchronously.
   */
  createTx(cb) {
    if (!this.db) {
      this.getTxCbs.push(cb);
      return;
    }

    // If DB version has changed (Safari support)
    if (parseInt(localStorage.localDbVersion, 10) !== this.db.version) {
      window.location.reload();
      return;
    }

    // Open transaction in read/write will prevent conflict with other tabs
    const tx = this.db.transaction(this.db.objectStoreNames, 'readwrite');
    tx.onerror = (evt) => {
      dbg('Rollback transaction', evt);
    };
    // Read the current txCounter
    const dbStore = tx.objectStore(dbStoreName);
    const request = dbStore.get('txCounter');
    request.onsuccess = () => {
      tx.txCounter = request.result ? request.result.tx : 0;
      tx.txCounter += 1;
      cb(tx);
    };
  }
}

export default {
  lastTx: 0,
  updatedMap: Object.create(null),
  connection: new Connection(),

  /**
   * Return a promise that is resolved once the synchronization between the store and the localDb
   * is finished. Effectively, open a transaction, then read and apply all changes from the DB
   * since the previous transaction, then write all the changes from the store.
   */
  sync() {
    return new Promise((resolve) => {
      const storeItemMap = {};
      [
        store.state.contents,
        store.state.files,
        store.state.folders,
        store.state.data,
      ].forEach(moduleState => Object.assign(storeItemMap, moduleState.itemMap));
      this.connection.createTx((tx) => {
        this.readAll(storeItemMap, tx, () => {
          this.writeAll(storeItemMap, tx);
          if (!store.state.ready) {
            store.commit('setReady');
          }
          resolve();
        });
      });
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
        if (changes.length) {
          dbg(`Got ${changes.length} changes`);
        }
        changes.forEach((item) => {
          this.readDbItem(item, storeItemMap);
          // If item is an old delete marker, remove it from the DB
          if (!item.updated && lastTx - item.tx > deleteMarkerMaxAge) {
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
    Object.keys(this.updatedMap).forEach((id) => {
      if (!storeItemMap[id]) {
        // Put a delete marker to notify other tabs
        dbStore.put({
          id,
          tx: incrementedTx,
        });
        delete this.updatedMap[id];
        this.lastTx = incrementedTx; // No need to read what we just wrote
      }
    });

    // Put changes
    Object.keys(storeItemMap).forEach((id) => {
      const storeItem = storeItemMap[id];
      // Store object has changed
      if (this.updatedMap[storeItem.id] !== storeItem.updated) {
        const item = {
          ...storeItem,
          tx: incrementedTx,
        };
        dbg('Putting 1 item');
        dbStore.put(item);
        this.updatedMap[item.id] = item.updated;
        this.lastTx = incrementedTx; // No need to read what we just wrote
      }
    });
  },

  /**
   * Read and apply one DB change.
   */
  readDbItem(dbItem, storeItemMap) {
    if (!dbItem.updated) {
      // DB item is a delete marker
      delete this.updatedMap[dbItem.id];
      const existingStoreItem = storeItemMap[dbItem.id];
      if (existingStoreItem) {
        delete storeItemMap[existingStoreItem.id];
        // Remove object from the store
        const prefix = getStorePrefixFromType(existingStoreItem.type);
        store.commit(`${prefix}/deleteItem`, existingStoreItem.id);
      }
    } else if (this.updatedMap[dbItem.id] !== dbItem.updated) {
      // DB item is different from the corresponding store item
      this.updatedMap[dbItem.id] = dbItem.updated;
      storeItemMap[dbItem.id] = dbItem;
      // Put object in the store
      const prefix = getStorePrefixFromType(dbItem.type);
      store.commit(`${prefix}/setItem`, dbItem);
    }
  },
};
