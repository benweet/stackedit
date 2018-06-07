import store from '../../store';
import googleHelper from './helpers/googleHelper';
import Provider from './common/Provider';
import utils from '../utils';

let syncStartPageToken;

export default new Provider({
  id: 'googleDriveAppData',
  getToken() {
    return store.getters['workspace/syncToken'];
  },
  async initWorkspace() {
    // Nothing much to do since the main workspace isn't necessarily synchronized
    // Remove the URL hash
    utils.setQueryParams();
    // Return the main workspace
    return store.getters['data/workspaces'].main;
  },
  async getChanges() {
    const syncToken = store.getters['workspace/syncToken'];
    const startPageToken = store.getters['data/localSettings'].syncStartPageToken;
    const result = await googleHelper.getChanges(syncToken, startPageToken, true);
    const changes = result.changes.filter((change) => {
      if (change.file) {
        // Parse item from file name
        try {
          change.item = JSON.parse(change.file.name);
        } catch (e) {
          return false;
        }
        // Build sync data
        change.syncData = {
          id: change.fileId,
          itemId: change.item.id,
          type: change.item.type,
          hash: change.item.hash,
        };
      }
      change.syncDataId = change.fileId;
      return true;
    });
    syncStartPageToken = result.startPageToken;
    return changes;
  },
  onChangesApplied() {
    store.dispatch('data/patchLocalSettings', {
      syncStartPageToken,
    });
  },
  async saveWorkspaceItem(item, syncData, ifNotTooLate) {
    const syncToken = store.getters['workspace/syncToken'];
    const file = await googleHelper.uploadAppDataFile({
      token: syncToken,
      name: JSON.stringify(item),
      fileId: syncData && syncData.id,
      ifNotTooLate,
    });
    // Build sync data
    return {
      id: file.id,
      itemId: item.id,
      type: item.type,
      hash: item.hash,
    };
  },
  removeWorkspaceItem(syncData, ifNotTooLate) {
    const syncToken = store.getters['workspace/syncToken'];
    return googleHelper.removeAppDataFile(syncToken, syncData.id, ifNotTooLate);
  },
  async downloadWorkspaceContent(token, syncData) {
    const data = await googleHelper.downloadAppDataFile(token, syncData.id);
    const item = utils.addItemHash(JSON.parse(data));
    return {
      item,
      syncData: {
        ...syncData,
        hash: item.hash,
      },
    };
  },
  async downloadWorkspaceData(token, dataId, syncData) {
    if (!syncData) {
      return {};
    }

    const data = await googleHelper.downloadAppDataFile(token, syncData.id);
    const item = utils.addItemHash(JSON.parse(data));
    return {
      item,
      syncData: {
        ...syncData,
        hash: item.hash,
      },
    };
  },
  async uploadWorkspaceContent(token, item, syncData, ifNotTooLate) {
    const file = await googleHelper.uploadAppDataFile({
      token,
      name: JSON.stringify({
        id: item.id,
        type: item.type,
        hash: item.hash,
      }),
      media: JSON.stringify(item),
      fileId: syncData && syncData.id,
      ifNotTooLate,
    });

    // Return new sync data
    return {
      id: file.id,
      itemId: item.id,
      type: item.type,
      hash: item.hash,
    };
  },
  async uploadWorkspaceData(token, item, syncData, ifNotTooLate) {
    const file = await googleHelper.uploadAppDataFile({
      token,
      name: JSON.stringify({
        id: item.id,
        type: item.type,
        hash: item.hash,
      }),
      media: JSON.stringify(item),
      fileId: syncData && syncData.id,
      ifNotTooLate,
    });

    // Return new sync data
    return {
      id: file.id,
      itemId: item.id,
      type: item.type,
      hash: item.hash,
    };
  },
  async listRevisions(token, fileId) {
    const syncData = Provider.getContentSyncData(fileId);
    const revisions = await googleHelper.getAppDataFileRevisions(token, syncData.id);
    return revisions.map(revision => ({
      id: revision.id,
      sub: revision.lastModifyingUser && `go:${revision.lastModifyingUser.permissionId}`,
      created: new Date(revision.modifiedTime).getTime(),
    }))
      .sort((revision1, revision2) => revision2.created - revision1.created);
  },
  async getRevisionContent(token, fileId, revisionId) {
    const syncData = Provider.getContentSyncData(fileId);
    const content = await googleHelper.downloadAppDataFileRevision(token, syncData.id, revisionId);
    return JSON.parse(content);
  },
});
