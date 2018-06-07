import store from '../../store';
import couchdbHelper from './helpers/couchdbHelper';
import Provider from './common/Provider';
import utils from '../utils';

let syncLastSeq;

export default new Provider({
  id: 'couchdbWorkspace',
  getToken() {
    return store.getters['workspace/syncToken'];
  },
  async initWorkspace() {
    const dbUrl = (utils.queryParams.dbUrl || '').replace(/\/?$/, ''); // Remove trailing /
    const workspaceParams = {
      providerId: this.id,
      dbUrl,
    };
    const workspaceId = utils.makeWorkspaceId(workspaceParams);
    const getToken = () => store.getters['data/couchdbTokens'][workspaceId];
    const getWorkspace = () => store.getters['data/sanitizedWorkspaces'][workspaceId];

    if (!getToken()) {
      // Create token
      store.dispatch('data/setCouchdbToken', {
        sub: workspaceId,
        dbUrl,
      });
    }

    // Create the workspace
    let workspace = getWorkspace();
    if (!workspace) {
      // Make sure the database exists and retrieve its name
      let db;
      try {
        db = await couchdbHelper.getDb(getToken());
      } catch (e) {
        throw new Error(`${dbUrl} is not accessible. Make sure you have the proper permissions.`);
      }
      store.dispatch('data/patchWorkspaces', {
        [workspaceId]: {
          id: workspaceId,
          name: db.db_name,
          providerId: this.id,
          dbUrl,
        },
      });
      workspace = getWorkspace();
    }

    // Fix the URL hash
    utils.setQueryParams(workspaceParams);
    if (workspace.url !== window.location.href) {
      store.dispatch('data/patchWorkspaces', {
        [workspace.id]: {
          ...workspace,
          url: window.location.href,
        },
      });
    }
    return getWorkspace();
  },
  async getChanges() {
    const syncToken = store.getters['workspace/syncToken'];
    const lastSeq = store.getters['data/localSettings'].syncLastSeq;
    const result = await couchdbHelper.getChanges(syncToken, lastSeq);
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
    syncLastSeq = result.lastSeq;
    return changes;
  },
  onChangesApplied() {
    store.dispatch('data/patchLocalSettings', {
      syncLastSeq,
    });
  },
  async saveWorkspaceItem(item, syncData) {
    const syncToken = store.getters['workspace/syncToken'];
    const { id, rev } = couchdbHelper.uploadDocument({
      token: syncToken,
      item,
      documentId: syncData && syncData.id,
      rev: syncData && syncData.rev,
    });
    return {
      // Build sync data
      id,
      itemId: item.id,
      type: item.type,
      hash: item.hash,
      rev,
    };
  },
  removeWorkspaceItem(syncData) {
    const syncToken = store.getters['workspace/syncToken'];
    return couchdbHelper.removeDocument(syncToken, syncData.id, syncData.rev);
  },
  async downloadWorkspaceContent(token, syncData) {
    const body = await couchdbHelper.retrieveDocumentWithAttachments(token, syncData.id);
    const rev = body._rev; // eslint-disable-line no-underscore-dangle
    const item = Provider.parseContent(body.attachments.data, body.item.id);
    return {
      item,
      syncData: {
        ...syncData,
        hash: item.hash,
        rev,
      },
    };
  },
  async downloadWorkspaceData(token, dataId, syncData) {
    if (!syncData) {
      return {};
    }

    const body = await couchdbHelper.retrieveDocumentWithAttachments(token, syncData.id);
    const item = utils.addItemHash(JSON.parse(body.attachments.data));
    const rev = body._rev; // eslint-disable-line no-underscore-dangle
    return {
      item,
      syncData: {
        ...syncData,
        hash: item.hash,
        rev,
      },
    };
  },
  async uploadWorkspaceContent(token, item, syncData) {
    const res = await couchdbHelper.uploadDocument({
      token,
      item: {
        id: item.id,
        type: item.type,
        hash: item.hash,
      },
      data: Provider.serializeContent(item),
      dataType: 'text/plain',
      documentId: syncData && syncData.id,
      rev: syncData && syncData.rev,
    });

    // Return new sync data
    return {
      id: res.id,
      itemId: item.id,
      type: item.type,
      hash: item.hash,
      rev: res.rev,
    };
  },
  async uploadWorkspaceData(token, item, syncData) {
    const res = await couchdbHelper.uploadDocument({
      token,
      item: {
        id: item.id,
        type: item.type,
        hash: item.hash,
      },
      data: JSON.stringify(item),
      dataType: 'application/json',
      documentId: syncData && syncData.id,
      rev: syncData && syncData.rev,
    });

    // Return new sync data
    return {
      id: res.id,
      itemId: item.id,
      type: item.type,
      hash: item.hash,
      rev: res.rev,
    };
  },
  async listRevisions(token, fileId) {
    const syncData = Provider.getContentSyncData(fileId);
    const body = await couchdbHelper.retrieveDocumentWithRevisions(token, syncData.id);
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
  },
  async loadRevision(token, fileId, revision) {
    const syncData = Provider.getContentSyncData(fileId);
    const body = await couchdbHelper.retrieveDocument(token, syncData.id, revision.id);
    revision.sub = body.sub;
    revision.created = body.time || 1; // Has to be truthy to prevent from loading several times
  },
  async getRevisionContent(token, fileId, revisionId) {
    const syncData = Provider.getContentSyncData(fileId);
    const body = await couchdbHelper
      .retrieveDocumentWithAttachments(token, syncData.id, revisionId);
    return Provider.parseContent(body.attachments.data, body.item.id);
  },
});
