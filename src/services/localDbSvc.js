import 'babel-polyfill';
import 'indexeddbshim';
import utils from './utils';

let indexedDB = window.indexedDB;
const localStorage = window.localStorage;
const dbVersion = 1;

// Use the shim on Safari or if indexedDB is not available
if (window.shimIndexedDB && (!indexedDB || (navigator.userAgent.indexOf('Chrome') === -1 && navigator.userAgent.indexOf('Safari') !== -1))) {
  indexedDB = window.shimIndexedDB;
}

const deletedMarkerMaxAge = 1000;

function identity(value) {
  return value;
}

function makeStore(storeName, schemaParameter) {
  const schema = {
    ...schemaParameter,
    updated: 'int',
  };

  const schemaKeys = Object.keys(schema);
  const schemaKeysLen = schemaKeys.length;
  const complexKeys = [];
  let complexKeysLen = 0;
  const attributeCheckers = {};
  const attributeReaders = {};
  const attributeWriters = {};

  class Dao {
    constructor(id, skipInit) {
      this.id = id || utils.uid();
      if (!skipInit) {
        const fakeItem = {};
        for (let i = 0; i < schemaKeysLen; i += 1) {
          attributeReaders[schemaKeys[i]](fakeItem, this);
        }
        this.$dirty = true;
      }
    }
  }

  function createDao(id) {
    return new Dao(id);
  }

  Object.keys(schema).forEach((key) => {
    const value = schema[key];
    const storedValueKey = `_${key}`;
    let defaultValue = value.default === undefined ? '' : value.default;
    let serializer = value.serializer || identity;
    let parser = value.parser || identity;
    if (value === 'int') {
      defaultValue = 0;
    } else if (value === 'object') {
      defaultValue = 'null';
      parser = JSON.parse;
      serializer = JSON.stringify;
    }

    attributeReaders[key] = (dbItem, dao) => {
      dao[storedValueKey] = dbItem[key] || defaultValue;
    };
    attributeWriters[key] = (dbItem, dao) => {
      const storedValue = dao[storedValueKey];
      if (storedValue && storedValue !== defaultValue) {
        dbItem[key] = storedValue;
      }
    };

    function getter() {
      return this[storedValueKey];
    }

    function setter(param) {
      const val = param || defaultValue;
      if (this[storedValueKey] === val) {
        return false;
      }
      this[storedValueKey] = val;
      this.$dirty = true;
      return true;
    }

    if (key === 'updated') {
      Object.defineProperty(Dao.prototype, key, {
        get: getter,
        set: (value) => {
          if (setter.call(this, value)) {
            this.$dirtyUpdated = true;
          }
        }
      })
    } else if (value === 'string' || value === 'int') {
      Object.defineProperty(Dao.prototype, key, {
        get: getter,
        set: setter
      })
    } else if (![64, 128] // Handle string64 and string128
      .cl_some(function (length) {
        if (value === 'string' + length) {
          Object.defineProperty(Dao.prototype, key, {
            get: getter,
            set: function (value) {
              if (value && value.length > length) {
                value = value.slice(0, length)
              }
              setter.call(this, value)
            }
          })
          return true
        }
      })
    ) {
      // Other types go to complexKeys list
      complexKeys.push(key)
      complexKeysLen++

      // And have complex readers/writers
      attributeReaders[key] = function (dbItem, dao) {
        const storedValue = dbItem[key]
        if (!storedValue) {
          storedValue = defaultValue
        }
        dao[storedValueKey] = storedValue
        dao[key] = parser(storedValue)
      }
      attributeWriters[key] = function (dbItem, dao) {
        const storedValue = serializer(dao[key])
        dao[storedValueKey] = storedValue
        if (storedValue && storedValue !== defaultValue) {
          dbItem[key] = storedValue
        }
      }

      // Checkers are only for complex types
      attributeCheckers[key] = function (dao) {
        return serializer(dao[key]) !== dao[storedValueKey]
      }
    }
  })

  const lastTx = 0
  const storedSeqs = Object.create(null)

  function readDbItem(item, daoMap) {
    const dao = daoMap[item.id] || new Dao(item.id, true)
    if (!item.updated) {
      delete storedSeqs[item.id]
      if (dao.updated) {
        delete daoMap[item.id]
        return true
      }
      return
    }
    if (storedSeqs[item.id] === item.seq) {
      return
    }
    storedSeqs[item.id] = item.seq
    for (const i = 0; i < schemaKeysLen; i++) {
      attributeReaders[schemaKeys[i]](item, dao)
    }
    dao.$dirty = false
    dao.$dirtyUpdated = false
    daoMap[item.id] = dao
    return true
  }

  function getPatch(tx, cb) {
    let resetMap;

    // We may have missed some deleted markers
    if (lastTx && tx.txCounter - lastTx > deletedMarkerMaxAge) {
      // Delete all dirty daos, user was asleep anyway...
      resetMap = true
      // And retrieve everything from DB
      lastTx = 0
    }

    const hasChanged = !lastTx
    const store = tx.objectStore(storeName)
    const index = store.index('seq')
    const range = $window.IDBKeyRange.lowerBound(lastTx, true)
    const items = []
    const itemsToDelete = []
    index.openCursor(range).onsuccess = function (event) {
      const cursor = event.target.result
      if (!cursor) {
        itemsToDelete.cl_each(function (item) {
          store.delete(item.id)
        })
        items.length && debug('Got ' + items.length + ' ' + storeName + ' items')
        // Return a patch, to apply changes later
        return cb(function (daoMap) {
          if (resetMap) {
            Object.keys(daoMap).cl_each(function (key) {
              delete daoMap[key]
            })
            storedSeqs = Object.create(null)
          }
          items.cl_each(function (item) {
            hasChanged |= readDbItem(item, daoMap)
          })
          return hasChanged
        })
      }
      const item = cursor.value
      items.push(item)
      // Remove old deleted markers
      if (!item.updated && tx.txCounter - item.seq > deletedMarkerMaxAge) {
        itemsToDelete.push(item)
      }
      cursor.continue()
    }
  }

  function writeAll(daoMap, tx) {
    lastTx = tx.txCounter
    const store = tx.objectStore(storeName)

    // Remove deleted daos
    const storedIds = Object.keys(storedSeqs)
    const storedIdsLen = storedIds.length
    for (const i = 0; i < storedIdsLen; i++) {
      const id = storedIds[i]
      if (!daoMap[id]) {
        // Put a deleted marker to notify other tabs
        store.put({
          id: id,
          seq: lastTx
        })
        delete storedSeqs[id]
      }
    }

    // Put changes
    const daoIds = Object.keys(daoMap)
    const daoIdsLen = daoIds.length
    for (i = 0; i < daoIdsLen; i++) {
      const dao = daoMap[daoIds[i]]
      const dirty = dao.$dirty
      for (const j = 0; !dirty && j < complexKeysLen; j++) {
        dirty |= attributeCheckers[complexKeys[j]](dao)
      }
      if (dirty) {
        if (!dao.$dirtyUpdated) {
          // Force update the `updated` attribute
          dao.updated = Date.now()
        }
        const item = {
          id: daoIds[i],
          seq: lastTx
        }
        for (j = 0; j < schemaKeysLen; j++) {
          attributeWriters[schemaKeys[j]](item, dao)
        }
        debug('Put ' + storeName + ' item')
        store.put(item)
        storedSeqs[item.id] = item.seq
        dao.$dirty = false
        dao.$dirtyUpdated = false
      }
    }
  }

  return {
    getPatch,
    writeAll,
    createDao,
    Dao,
  };
}

class Connection {
  constructor() {
    this.getTxCbs = [];

    // Init connexion
    const request = indexedDB.open('classeur-db', dbVersion);

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
      function createStore(name) {
        const store = eventDb.createObjectStore(name, { keyPath: 'id' });
        store.createIndex('seq', 'seq', { unique: false });
      }

      // We don't use 'break' in this switch statement,
      // the fall-through behaviour is what we want.
      /* eslint-disable no-fallthrough */
      switch (oldVersion) {
        case 0:
          [
            'contents',
            'files',
            'folders',
            'objects',
            'app',
          ].forEach(createStore);
        default:
      }
      /* eslint-enable no-fallthrough */
    };
  }

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
    const tx = this.db.transaction(this.db.objectStoreNames, 'readwrite');
    // tx.onerror = (evt) => {
    //   dbg('Rollback transaction', evt);
    // };
    const store = tx.objectStore('app');
    const request = store.get('txCounter');
    request.onsuccess = () => {
      tx.txCounter = request.result ? request.result.value : 0;
      tx.txCounter += 1;
      store.put({
        id: 'txCounter',
        value: tx.txCounter,
      });
      cb(tx);
    };
  }
}

class LocalDbStorage {
  init(store) {
    this.store = store;
    store.subscribe((mutation, state) => {
      console.log(mutation, state);
    });
    this.connection = new Connection();
  }
}

export default LocalDbStorage;
