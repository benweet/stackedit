import store from '../../store';
import couchdbHelper from './helpers/couchdbHelper';
import providerRegistry from './providerRegistry';
import providerUtils from './providerUtils';
import utils from '../utils';

const getSyncData = (fileId) => {
  const syncData = store.getters['data/syncDataByItemId'][`${fileId}/content`];
  return syncData
    ? Promise.resolve(syncData)
    : Promise.reject(); // No need for a proper error message.
};

export default providerRegistry.register({
  id: 'couchdbWorkspace',
  getToken() {
    return store.getters['workspace/syncToken'];
  },
  initWorkspace() {
    const dbUrl = (utils.queryParams.dbUrl || '').replace(/\/?$/, ''); // Remove trailing /
    const workspaceIdParams = {
      providerId: this.id,
      dbUrl,
    };
    const workspaceId = utils.makeWorkspaceId(workspaceIdParams);
    const getToken = () => store.getters['data/couchdbTokens'][workspaceId];
    const getWorkspace = () => store.getters['data/sanitizedWorkspaces'][workspaceId];

    if (!getToken()) {
      // Create token
      store.dispatch('data/setCouchdbToken', {
        sub: workspaceId,
        dbUrl,
      });
    }

    return Promise.resolve()
      .then(() => getWorkspace() || couchdbHelper.getDb(getToken())
        .then((db) => {
          store.dispatch('data/patchWorkspaces', {
            [workspaceId]: {
              id: workspaceId,
              name: db.db_name,
              providerId: this.id,
              dbUrl,
            },
          });
          return getWorkspace();
        }, () => {
          throw new Error(`${dbUrl} is not accessible. Make sure you have the right permissions.`);
        }))
      .then((workspace) => {
        // Fix the URL hash
        utils.setQueryParams(workspaceIdParams);
        if (workspace.url !== location.href) {
          store.dispatch('data/patchWorkspaces', {
            [workspace.id]: {
              ...workspace,
              url: location.href,
            },
          });
        }
        return getWorkspace();
      });
  },
  getChanges() {
    const syncToken = store.getters['workspace/syncToken'];
    const lastSeq = store.getters['data/localSettings'].syncLastSeq;
    return couchdbHelper.getChanges(syncToken, lastSeq)
      .then((result) => {
        const changes = result.changes.filter((change) => {
          if (!change.deleted && change.doc) {
            change.item = change.doc.item;
            if (!change.item || !change.item.id || !change.item.type) {
              return false;
            }
            // Build sync data
            change.syncData = {
              id: change.id,
              itemId: change.item.id,
              type: change.item.type,
              hash: change.item.hash,
              rev: change.doc._rev, // eslint-disable-line no-underscore-dangle
            };
          }
          change.syncDataId = change.id;
          return true;
        });
        changes.lastSeq = result.lastSeq;
        return changes;
      });
  },
  setAppliedChanges(changes) {
    store.dispatch('data/patchLocalSettings', {
      syncLastSeq: changes.lastSeq,
    });
  },
  saveSimpleItem(item, syncData) {
    const syncToken = store.getters['workspace/syncToken'];
    return couchdbHelper.uploadDocument(
      syncToken,
      item,
      undefined,
      undefined,
      syncData && syncData.id,
      syncData && syncData.rev,
    )
      .then(res => ({
        // Build sync data
        id: res.id,
        itemId: item.id,
        type: item.type,
        hash: item.hash,
        rev: res.rev,
      }));
  },
  removeItem(syncData) {
    const syncToken = store.getters['workspace/syncToken'];
    return couchdbHelper.removeDocument(syncToken, syncData.id, syncData.rev);
  },
  downloadContent(token, syncLocation) {
    return this.downloadData(`${syncLocation.fileId}/content`);
  },
  downloadData(dataId) {
    const syncData = store.getters['data/syncDataByItemId'][dataId];
    if (!syncData) {
      return Promise.resolve();
    }
    const syncToken = store.getters['workspace/syncToken'];
    return couchdbHelper.retrieveDocumentWithAttachments(syncToken, syncData.id)
      .then((body) => {
        let item;
        if (body.item.type === 'content') {
          item = providerUtils.parseContent(body.attachments.data, body.item.id);
        } else {
          item = JSON.parse(body.attachments.data);
        }
        const rev = body._rev; // eslint-disable-line no-underscore-dangle
        if (item.hash !== syncData.hash || rev !== syncData.rev) {
          store.dispatch('data/patchSyncData', {
            [syncData.id]: {
              ...syncData,
              hash: item.hash,
              rev,
            },
          });
        }
        return item;
      });
  },
  uploadContent(token, content, syncLocation) {
    return this.uploadData(content, `${syncLocation.fileId}/content`)
      .then(() => syncLocation);
  },
  uploadData(item, dataId) {
    const syncData = store.getters['data/syncDataByItemId'][dataId];
    if (syncData && syncData.hash === item.hash) {
      return Promise.resolve();
    }
    let data;
    let dataType;
    if (item.type === 'content') {
      data = providerUtils.serializeContent(item);
      dataType = 'text/plain';
    } else {
      data = JSON.stringify(item);
      dataType = 'application/json';
    }
    const syncToken = store.getters['workspace/syncToken'];
    return couchdbHelper.uploadDocument(
      syncToken,
      {
        id: item.id,
        type: item.type,
        hash: item.hash,
      },
      data,
      dataType,
      syncData && syncData.id,
      syncData && syncData.rev,
    )
      .then(res => store.dispatch('data/patchSyncData', {
        [res.id]: {
          // Build sync data
          id: res.id,
          itemId: item.id,
          type: item.type,
          hash: item.hash,
          rev: res.rev,
        },
      }));
  },
  listRevisions(token, fileId) {
    return getSyncData(fileId)
      .then(syncData => couchdbHelper.retrieveDocumentWithRevisions(token, syncData.id))
      .then((body) => {
        const revisions = [];
        body._revs_info.forEach((revInfo) => { // eslint-disable-line no-underscore-dangle
          if (revInfo.status === 'available') {
            revisions.push({
              id: revInfo.rev,
              sub: null,
              created: null,
            });
          }
        });
        return revisions;
      });
  },
  loadRevision(token, fileId, revision) {
    return getSyncData(fileId)
      .then(syncData => couchdbHelper.retrieveDocument(token, syncData.id, revision.id))
      .then((body) => {
        revision.sub = body.sub;
        revision.created = body.time || 1; // Has to be truthy to prevent from loading several times
      });
  },
  getRevisionContent(token, fileId, revisionId) {
    return getSyncData(fileId)
      .then(syncData => couchdbHelper
        .retrieveDocumentWithAttachments(token, syncData.id, revisionId))
      .then(body => providerUtils.parseContent(body.attachments.data, body.item.id));
  },
});
