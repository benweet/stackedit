import store from '../../store';
import googleHelper from './helpers/googleHelper';
import providerRegistry from './providerRegistry';
import utils from '../utils';

export default providerRegistry.register({
  id: 'googleDriveAppData',
  getToken() {
    return store.getters['workspace/syncToken'];
  },
  initWorkspace() {
    // Nothing much to do since the main workspace isn't necessarily synchronized
    return Promise.resolve()
      .then(() => {
        // Remove the URL hash
        utils.setQueryParams();
        // Return the main workspace
        return store.getters['data/workspaces'].main;
      });
  },
  getChanges() {
    const syncToken = store.getters['workspace/syncToken'];
    const startPageToken = store.getters['data/localSettings'].syncStartPageToken;
    return googleHelper.getChanges(syncToken, startPageToken, true)
      .then((result) => {
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
        changes.startPageToken = result.startPageToken;
        return changes;
      });
  },
  setAppliedChanges(changes) {
    store.dispatch('data/patchLocalSettings', {
      syncStartPageToken: changes.startPageToken,
    });
  },
  saveSimpleItem(item, syncData, ifNotTooLate) {
    const syncToken = store.getters['workspace/syncToken'];
    return googleHelper.uploadAppDataFile(
      syncToken,
      JSON.stringify(item),
      undefined,
      syncData && syncData.id,
      ifNotTooLate,
    )
      .then(file => ({
        // Build sync data
        id: file.id,
        itemId: item.id,
        type: item.type,
        hash: item.hash,
      }));
  },
  removeItem(syncData, ifNotTooLate) {
    const syncToken = store.getters['workspace/syncToken'];
    return googleHelper.removeAppDataFile(syncToken, syncData.id, ifNotTooLate);
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
    return googleHelper.downloadAppDataFile(syncToken, syncData.id)
      .then((data) => {
        const item = JSON.parse(data);
        if (item.hash !== syncData.hash) {
          store.dispatch('data/patchSyncData', {
            [syncData.id]: {
              ...syncData,
              hash: item.hash,
            },
          });
        }
        return item;
      });
  },
  uploadContent(token, content, syncLocation, ifNotTooLate) {
    return this.uploadData(content, `${syncLocation.fileId}/content`, ifNotTooLate)
      .then(() => syncLocation);
  },
  uploadData(item, dataId, ifNotTooLate) {
    const syncData = store.getters['data/syncDataByItemId'][dataId];
    if (syncData && syncData.hash === item.hash) {
      return Promise.resolve();
    }
    const syncToken = store.getters['workspace/syncToken'];
    return googleHelper.uploadAppDataFile(
      syncToken,
      JSON.stringify({
        id: item.id,
        type: item.type,
        hash: item.hash,
      }),
      JSON.stringify(item),
      syncData && syncData.id,
      ifNotTooLate,
    )
      .then(file => store.dispatch('data/patchSyncData', {
        [file.id]: {
          // Build sync data
          id: file.id,
          itemId: item.id,
          type: item.type,
          hash: item.hash,
        },
      }));
  },
  listRevisions(token, fileId) {
    const syncData = store.getters['data/syncDataByItemId'][`${fileId}/content`];
    if (!syncData) {
      return Promise.reject(); // No need for a proper error message.
    }
    return googleHelper.getAppDataFileRevisions(token, syncData.id)
      .then(revisions => revisions.map(revision => ({
        id: revision.id,
        sub: revision.lastModifyingUser && revision.lastModifyingUser.permissionId,
        created: new Date(revision.modifiedTime).getTime(),
      }))
        .sort((revision1, revision2) => revision2.created - revision1.created));
  },
  getRevisionContent(token, fileId, revisionId) {
    const syncData = store.getters['data/syncDataByItemId'][`${fileId}/content`];
    if (!syncData) {
      return Promise.reject(); // No need for a proper error message.
    }
    return googleHelper.downloadAppDataFileRevision(token, syncData.id, revisionId)
      .then(content => JSON.parse(content));
  },
});
