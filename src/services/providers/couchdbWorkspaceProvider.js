import store from '../../store';
import couchdbHelper from './helpers/couchdbHelper';
import providerRegistry from './providerRegistry';
import utils from '../utils';

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
    const workspace = store.getters['workspace/currentWorkspace'];
    const syncToken = store.getters['workspace/syncToken'];
    const lastSeq = store.getters['data/localSettings'].syncLastSeq;
    return couchdbHelper.getChanges(syncToken, lastSeq, true)
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
});
