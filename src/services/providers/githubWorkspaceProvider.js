import store from '../../store';
import githubHelper from './helpers/githubHelper';
import Provider from './common/Provider';
import utils from '../utils';
import userSvc from '../userSvc';
import gitWorkspaceSvc from '../gitWorkspaceSvc';
import badgeSvc from '../badgeSvc';

const getAbsolutePath = ({ id }) =>
  `${store.getters['workspace/currentWorkspace'].path || ''}${id}`;

export default new Provider({
  id: 'githubWorkspace',
  name: 'GitHub',
  getToken() {
    return store.getters['workspace/syncToken'];
  },
  getWorkspaceParams({
    owner,
    repo,
    branch,
    path,
  }) {
    return {
      providerId: this.id,
      owner,
      repo,
      branch,
      path,
    };
  },
  getWorkspaceLocationUrl({
    owner,
    repo,
    branch,
    path,
  }) {
    return `https://github.com/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/tree/${encodeURIComponent(branch)}/${utils.encodeUrlPath(path)}`;
  },
  getSyncDataUrl({ id }) {
    const { owner, repo, branch } = store.getters['workspace/currentWorkspace'];
    return `https://github.com/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/tree/${encodeURIComponent(branch)}/${utils.encodeUrlPath(getAbsolutePath({ id }))}`;
  },
  getSyncDataDescription({ id }) {
    return getAbsolutePath({ id });
  },
  async initWorkspace() {
    const { owner, repo, branch } = utils.queryParams;
    const workspaceParams = this.getWorkspaceParams({ owner, repo, branch });
    if (!branch) {
      workspaceParams.branch = 'master';
    }

    // Extract path param
    const path = (utils.queryParams.path || '')
      .trim()
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
      token = store.getters['data/githubTokensBySub'][workspace.sub];
    }
    if (!token) {
      await store.dispatch('modal/open', { type: 'githubAccount' });
      token = await githubHelper.addAccount(store.getters['data/localSettings'].githubRepoFullAccess);
    }

    if (!workspace) {
      const pathEntries = (path || '').split('/');
      const name = pathEntries[pathEntries.length - 2] || repo; // path ends with `/`
      store.dispatch('workspace/patchWorkspacesById', {
        [workspaceId]: {
          ...workspaceParams,
          id: workspaceId,
          sub: token.sub,
          name,
        },
      });
    }

    badgeSvc.addBadge('addGithubWorkspace');
    return store.getters['workspace/workspacesById'][workspaceId];
  },
  getChanges() {
    return githubHelper.getTree({
      ...store.getters['workspace/currentWorkspace'],
      token: this.getToken(),
    });
  },
  prepareChanges(tree) {
    return gitWorkspaceSvc.makeChanges(tree);
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
    await githubHelper.uploadFile({
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
      await githubHelper.removeFile({
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
    const { sha, data } = await githubHelper.downloadFile({
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

    const { sha, data } = await githubHelper.downloadFile({
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
    const res = await githubHelper.uploadFile({
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
    const res = await githubHelper.uploadFile({
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
  async listFileRevisions({ token, fileSyncDataId }) {
    const { owner, repo, branch } = store.getters['workspace/currentWorkspace'];
    const entries = await githubHelper.getCommits({
      token,
      owner,
      repo,
      sha: branch,
      path: getAbsolutePath({ id: fileSyncDataId }),
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
      const sub = `${githubHelper.subPrefix}:${user.id}`;
      userSvc.addUserInfo({ id: sub, name: user.login, imageUrl: user.avatar_url });
      const date = (commit.author && commit.author.date)
        || (commit.committer && commit.committer.date)
        || 1;
      return {
        id: sha,
        sub,
        created: new Date(date).getTime(),
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
    fileSyncDataId,
    revisionId,
  }) {
    const { data } = await githubHelper.downloadFile({
      ...store.getters['workspace/currentWorkspace'],
      token,
      branch: revisionId,
      path: getAbsolutePath({ id: fileSyncDataId }),
    });
    return Provider.parseContent(data, contentId);
  },
});
