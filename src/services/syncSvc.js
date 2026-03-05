import localDbSvc from './localDbSvc';
import store from '../store';
import utils from './utils';
import tempFileSvc from './tempFileSvc';

export default {
  async init() {
    // Load workspaces and tokens from localStorage
    localDbSvc.syncLocalStorage();

    // Initialize the main workspace directly (no cloud provider needed)
    const workspace = store.getters['workspace/workspacesById'].main;
    utils.setQueryParams({});

    store.dispatch('workspace/setCurrentWorkspaceId', workspace.id);
    await localDbSvc.init();

    await tempFileSvc.init();

    if (!store.state.light) {
      // Unload contents from memory periodically
      utils.setInterval(() => {
        localDbSvc.unloadContents();
      }, 5000);
    }
  },
};
