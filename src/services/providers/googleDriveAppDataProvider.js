import store from '../../store';
import googleHelper from './helpers/googleHelper';
import Provider from './common/Provider';
import utils from '../utils';

let syncStartPageToken;

export default new Provider({
  id: 'googleDriveAppData',
  name: 'Google Drive app data',
  getToken() {
    return store.getters['workspace/syncToken'];
  },
  getWorkspaceParams() {
    // No param as it's the main workspace
    return {};
  },
  getWorkspaceLocationUrl() {
    // No direct link to app data
    return null;
  },
  getSyncDataUrl() {
    // No direct link to app data
    return null;
  },
  getSyncDataDescription({ id }) {
    return id;
  },
  async initWorkspace() {
    // Nothing much to do since the main workspace isn't necessarily synchronized
    // Return the main workspace
    return store.getters['workspace/workspacesById'].main;
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
  async saveWorkspaceItem({ item, syncData, ifNotTooLate }) {
    const syncToken = store.getters['workspace/syncToken'];
    const file = await googleHelper.uploadAppDataFile({
      token: syncToken,
      name: JSON.stringify(item),
      fileId: syncData && syncData.id,
      ifNotTooLate,
    });

    // Build sync data to save
    return {
      syncData: {
        id: file.id,
        itemId: item.id,
        type: item.type,
        hash: item.hash,
      },
    };
  },
  removeWorkspaceItem({ syncData, ifNotTooLate }) {
    const syncToken = store.getters['workspace/syncToken'];
    return googleHelper.removeAppDataFile(syncToken, syncData.id, ifNotTooLate);
  },
  async downloadWorkspaceContent({ token, contentSyncData }) {
    const data = await googleHelper.downloadAppDataFile(token, contentSyncData.id);
    const content = utils.addItemHash(JSON.parse(data));
    return {
      content,
      contentSyncData: {
        ...contentSyncData,
        hash: content.hash,
      },
    };
  },
  async downloadWorkspaceData({ token, syncData }) {
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
  async uploadWorkspaceContent({
    token,
    content,
    contentSyncData,
    ifNotTooLate,
  }) {
    const gdriveFile = await googleHelper.uploadAppDataFile({
      token,
      name: JSON.stringify({
        id: content.id,
        type: content.type,
        hash: content.hash,
      }),
      media: JSON.stringify(content),
      fileId: contentSyncData && contentSyncData.id,
      ifNotTooLate,
    });

    // Return new sync data
    return {
      contentSyncData: {
        id: gdriveFile.id,
        itemId: content.id,
        type: content.type,
        hash: content.hash,
      },
    };
  },
  async uploadWorkspaceData({
    token,
    item,
    syncData,
    ifNotTooLate,
  }) {
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
      syncData: {
        id: file.id,
        itemId: item.id,
        type: item.type,
        hash: item.hash,
      },
    };
  },
  async listFileRevisions({ token, contentSyncDataId }) {
    const revisions = await googleHelper.getAppDataFileRevisions(token, contentSyncDataId);
    return revisions.map(revision => ({
      id: revision.id,
      sub: `${googleHelper.subPrefix}:${revision.lastModifyingUser.permissionId}`,
      created: new Date(revision.modifiedTime).getTime(),
    }));
  },
  async loadFileRevision() {
    // Revisions are already loaded
    return false;
  },
  async getFileRevisionContent({ token, contentSyncDataId, revisionId }) {
    const content = await googleHelper
      .downloadAppDataFileRevision(token, contentSyncDataId, revisionId);
    return JSON.parse(content);
  },
});
