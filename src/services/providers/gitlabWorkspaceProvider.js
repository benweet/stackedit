import store from '../../store';
import gitlabHelper from './helpers/gitlabHelper';
import Provider from './common/Provider';
import utils from '../utils';
import userSvc from '../userSvc';
import gitWorkspaceSvc from '../gitWorkspaceSvc';

const getAbsolutePath = ({ id }) =>
  `${store.getters['workspace/currentWorkspace'].path || ''}${id}`;

export default new Provider({
  id: 'gitlabWorkspace',
  name: 'GitLab',
  getToken() {
    return store.getters['workspace/syncToken'];
  },
  getWorkspaceParams({
    serverUrl,
    projectPath,
    branch,
    path,
  }) {
    return {
      providerId: this.id,
      serverUrl,
      projectPath,
      branch,
      path,
    };
  },
  getWorkspaceLocationUrl({
    serverUrl,
    projectPath,
    branch,
    path,
  }) {
    return `${serverUrl}/${projectPath}/blob/${encodeURIComponent(branch)}/${utils.encodeUrlPath(path)}`;
  },
  getSyncDataUrl({ id }) {
    const { projectPath, branch } = store.getters['workspace/currentWorkspace'];
    const { serverUrl } = this.getToken();
    return `${serverUrl}/${projectPath}/blob/${encodeURIComponent(branch)}/${utils.encodeUrlPath(getAbsolutePath({ id }))}`;
  },
  getSyncDataDescription({ id }) {
    return getAbsolutePath({ id });
  },
  async initWorkspace() {
    const { projectPath, branch } = utils.queryParams;
    const workspaceParams = this.getWorkspaceParams({ projectPath, branch });
    const path = (utils.queryParams.path || '')
      .replace(/^\/*/, '') // Remove leading `/`
      .replace(/\/*$/, '/'); // Add trailing `/`
    if (path !== '/') {
      workspaceParams.path = path;
    }
    const workspaceId = utils.makeWorkspaceId(workspaceParams);
    const workspace = store.getters['workspace/workspacesById'][workspaceId];

    // See if we already have a token
    let token;
    if (workspace) {
      // Token sub is in the workspace
      token = store.getters['data/gitlabTokensBySub'][workspace.sub];
    }
    if (!token) {
      const { serverUrl, applicationId } = await store.dispatch('modal/open', { type: 'gitlabAccount' });
      token = await gitlabHelper.addAccount(serverUrl, applicationId);
    }

    if (!workspace) {
      const pathEntries = (path || '').split('/');
      const projectPathEntries = (projectPath || '').split('/');
      const name = pathEntries[pathEntries.length - 2] // path ends with `/`
        || projectPathEntries[projectPathEntries.length - 1];
      store.dispatch('workspace/patchWorkspacesById', {
        [workspaceId]: {
          ...workspaceParams,
          id: workspaceId,
          sub: token.sub,
          name,
        },
      });
    }

    return store.getters['workspace/workspacesById'][workspaceId];
  },
  getChanges() {
    return gitlabHelper.getTree({
      ...store.getters['workspace/currentWorkspace'],
      token: this.getToken(),
    });
  },
  prepareChanges(tree) {
    return gitWorkspaceSvc.makeChanges(tree.map(entry => ({
      ...entry,
      sha: entry.id,
    })));
  },
  async saveWorkspaceItem({ item }) {
    const syncData = {
      id: store.getters.gitPathsByItemId[item.id],
      type: item.type,
      hash: item.hash,
    };

    // Files and folders are not in git, only contents
    if (item.type === 'file' || item.type === 'folder') {
      return { syncData };
    }

    // locations are stored as paths, so we upload an empty file
    const syncToken = store.getters['workspace/syncToken'];
    await gitlabHelper.uploadFile({
      ...store.getters['workspace/currentWorkspace'],
      token: syncToken,
      path: getAbsolutePath(syncData),
      content: '',
      sha: gitWorkspaceSvc.shaByPath[syncData.id],
    });

    // Return sync data to save
    return { syncData };
  },
  async removeWorkspaceItem({ syncData }) {
    if (gitWorkspaceSvc.shaByPath[syncData.id]) {
      const syncToken = store.getters['workspace/syncToken'];
      await gitlabHelper.removeFile({
        ...store.getters['workspace/currentWorkspace'],
        token: syncToken,
        path: getAbsolutePath(syncData),
        sha: gitWorkspaceSvc.shaByPath[syncData.id],
      });
    }
  },
  async downloadWorkspaceContent({
    token,
    contentId,
    contentSyncData,
    fileSyncData,
  }) {
    const { sha, data } = await gitlabHelper.downloadFile({
      ...store.getters['workspace/currentWorkspace'],
      token,
      path: getAbsolutePath(fileSyncData),
    });
    gitWorkspaceSvc.shaByPath[fileSyncData.id] = sha;
    const content = Provider.parseContent(data, contentId);
    return {
      content,
      contentSyncData: {
        ...contentSyncData,
        hash: content.hash,
        sha,
      },
    };
  },
  async downloadWorkspaceData({ token, syncData }) {
    if (!syncData) {
      return {};
    }

    const { sha, data } = await gitlabHelper.downloadFile({
      ...store.getters['workspace/currentWorkspace'],
      token,
      path: getAbsolutePath(syncData),
    });
    gitWorkspaceSvc.shaByPath[syncData.id] = sha;
    const item = JSON.parse(data);
    return {
      item,
      syncData: {
        ...syncData,
        hash: item.hash,
        sha,
      },
    };
  },
  async uploadWorkspaceContent({ token, content, file }) {
    const path = store.getters.gitPathsByItemId[file.id];
    const absolutePath = `${store.getters['workspace/currentWorkspace'].path || ''}${path}`;
    const res = await gitlabHelper.uploadFile({
      ...store.getters['workspace/currentWorkspace'],
      token,
      path: absolutePath,
      content: Provider.serializeContent(content),
      sha: gitWorkspaceSvc.shaByPath[path],
    });

    // Return new sync data
    return {
      contentSyncData: {
        id: store.getters.gitPathsByItemId[content.id],
        type: content.type,
        hash: content.hash,
        sha: res.content.sha,
      },
      fileSyncData: {
        id: path,
        type: 'file',
        hash: file.hash,
      },
    };
  },
  async uploadWorkspaceData({ token, item }) {
    const path = store.getters.gitPathsByItemId[item.id];
    const syncData = {
      id: path,
      type: item.type,
      hash: item.hash,
    };
    const res = await gitlabHelper.uploadFile({
      ...store.getters['workspace/currentWorkspace'],
      token,
      path: getAbsolutePath(syncData),
      content: JSON.stringify(item),
      sha: gitWorkspaceSvc.shaByPath[path],
    });

    return {
      syncData: {
        ...syncData,
        sha: res.content.sha,
      },
    };
  },
  async listFileRevisions({ token, fileSyncData }) {
    const { projectId, branch } = store.getters['workspace/currentWorkspace'];
    const entries = await gitlabHelper.getCommits({
      token,
      projectId,
      sha: branch,
      path: getAbsolutePath(fileSyncData),
    });

    return entries.map(({
      author,
      committer,
      commit,
      sha,
    }) => {
      let user;
      if (author && author.login) {
        user = author;
      } else if (committer && committer.login) {
        user = committer;
      }
      const sub = `${gitlabHelper.subPrefix}:${user.id}`;
      userSvc.addInfo({ id: sub, name: user.login, imageUrl: user.avatar_url });
      const date = (commit.author && commit.author.date)
        || (commit.committer && commit.committer.date);
      return {
        id: sha,
        sub,
        created: date ? new Date(date).getTime() : 1,
      };
    });
  },
  async loadFileRevision() {
    // Revisions are already loaded
    return false;
  },
  async getFileRevisionContent({
    token,
    contentId,
    fileSyncData,
    revisionId,
  }) {
    const { data } = await gitlabHelper.downloadFile({
      ...store.getters['workspace/currentWorkspace'],
      token,
      branch: revisionId,
      path: getAbsolutePath(fileSyncData),
    });
    return Provider.parseContent(data, contentId);
  },
});
