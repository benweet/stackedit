import store from '../../store';
import githubHelper from './helpers/githubHelper';
import Provider from './common/Provider';
import utils from '../utils';
import userSvc from '../userSvc';

const getAbsolutePath = syncData =>
  `${store.getters['workspace/currentWorkspace'].path || ''}${syncData.id}`;

const getWorkspaceWithOwner = () => {
  const workspace = store.getters['workspace/currentWorkspace'];
  const [owner, repo] = workspace.repo.split('/');
  return {
    ...workspace,
    owner,
    repo,
  };
};

let treeShaMap;
let treeFolderMap;
let treeFileMap;
let treeDataMap;
let treeSyncLocationMap;
let treePublishLocationMap;

const endsWith = (str, suffix) => str.slice(-suffix.length) === suffix;

export default new Provider({
  id: 'githubWorkspace',
  getToken() {
    return store.getters['workspace/syncToken'];
  },
  async initWorkspace() {
    const [owner, repo] = (utils.queryParams.repo || '').split('/');
    const { branch } = utils.queryParams;
    const workspaceParams = {
      providerId: this.id,
      repo: `${owner}/${repo}`,
      branch,
    };
    const path = (utils.queryParams.path || '')
      .replace(/^\/*/, '') // Remove leading `/`
      .replace(/\/*$/, '/'); // Add trailing `/`
    if (path !== '/') {
      workspaceParams.path = path;
    }
    const workspaceId = utils.makeWorkspaceId(workspaceParams);
    let workspace = store.getters['data/sanitizedWorkspacesById'][workspaceId];

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
      workspace = {
        ...workspaceParams,
        id: workspaceId,
        sub: token.sub,
        name,
      };
    }

    // Fix the URL hash
    utils.setQueryParams(workspaceParams);
    if (workspace.url !== window.location.href) {
      store.dispatch('data/patchWorkspacesById', {
        [workspaceId]: {
          ...workspace,
          url: window.location.href,
        },
      });
    }
    return store.getters['data/sanitizedWorkspacesById'][workspaceId];
  },
  getChanges() {
    const syncToken = store.getters['workspace/syncToken'];
    const { owner, repo, branch } = getWorkspaceWithOwner();
    return githubHelper.getTree({
      token: syncToken,
      owner,
      repo,
      branch,
    });
  },
  prepareChanges(tree) {
    const workspacePath = store.getters['workspace/currentWorkspace'].path || '';

    // Store all blobs sha
    treeShaMap = Object.create(null);
    // Store interesting paths
    treeFolderMap = Object.create(null);
    treeFileMap = Object.create(null);
    treeDataMap = Object.create(null);
    treeSyncLocationMap = Object.create(null);
    treePublishLocationMap = Object.create(null);

    tree.filter(({ type, path }) => type === 'blob' && path.indexOf(workspacePath) === 0)
      .forEach((blobEntry) => {
        // Make path relative
        const path = blobEntry.path.slice(workspacePath.length);
        // Collect blob sha
        treeShaMap[path] = blobEntry.sha;
        if (path.indexOf('.stackedit-data/') === 0) {
          treeDataMap[path] = true;
        } else {
          // Collect parents path
          let parentPath = '';
          path.split('/').slice(0, -1).forEach((folderName) => {
            const folderPath = `${parentPath}${folderName}/`;
            treeFolderMap[folderPath] = parentPath;
            parentPath = folderPath;
          });
          // Collect file path
          if (endsWith(path, '.md')) {
            treeFileMap[path] = parentPath;
          } else if (endsWith(path, '.sync')) {
            treeSyncLocationMap[path] = true;
          } else if (endsWith(path, '.publish')) {
            treePublishLocationMap[path] = true;
          }
        }
      });

    // Collect changes
    const changes = [];
    const pathIds = {};
    const syncDataToKeep = Object.create(null);
    const syncDataByPath = store.getters['data/syncDataById'];
    const { itemsByGitPath } = store.getters;
    const getId = (path) => {
      const existingItem = itemsByGitPath[path];
      // Use the item ID only if the item was already synced
      if (existingItem && syncDataByPath[path]) {
        pathIds[path] = existingItem.id;
        return existingItem.id;
      }
      // Generate a new ID
      let id = utils.uid();
      if (path[0] === '/') {
        id += '/content';
      }
      pathIds[path] = id;
      return id;
    };

    // Folder creations/updates
    // Assume map entries are sorted from top to bottom
    Object.entries(treeFolderMap).forEach(([path, parentPath]) => {
      const item = utils.addItemHash({
        id: getId(path),
        type: 'folder',
        name: path.slice(parentPath.length, -1),
        parentId: pathIds[parentPath] || null,
      });
      changes.push({
        syncDataId: path,
        item,
        syncData: {
          id: path,
          type: item.type,
          hash: item.hash,
        },
      });
    });

    // File/content creations/updates
    Object.entries(treeFileMap).forEach(([path, parentPath]) => {
      // Look for content sync data as it's created before file sync data
      const contentPath = `/${path}`;
      const contentId = getId(contentPath);

      // File creations/updates
      const [fileId] = contentId.split('/');
      const item = utils.addItemHash({
        id: fileId,
        type: 'file',
        name: path.slice(parentPath.length, -'.md'.length),
        parentId: pathIds[parentPath] || null,
      });
      changes.push({
        syncDataId: path,
        item,
        syncData: {
          id: path,
          type: item.type,
          hash: item.hash,
        },
      });

      // Content creations/updates
      const contentSyncData = syncDataByPath[contentPath];
      if (contentSyncData) {
        syncDataToKeep[path] = true;
        syncDataToKeep[contentPath] = true;
      }
      if (!contentSyncData || contentSyncData.sha !== treeShaMap[path]) {
        const type = 'content';
        // Use `/` as a prefix to get a unique syncData id
        changes.push({
          syncDataId: contentPath,
          item: {
            id: contentId,
            type,
            // Need a truthy value to force downloading the content
            hash: 1,
          },
          syncData: {
            id: contentPath,
            type,
            // Need a truthy value to force downloading the content
            hash: 1,
          },
        });
      }
    });

    // Data creations/updates
    const syncDataByItemId = store.getters['data/syncDataByItemId'];
    Object.keys(treeDataMap).forEach((path) => {
      // Only template data are stored
      const [, id] = path.match(/^\.stackedit-data\/(templates)\.json$/) || [];
      if (id) {
        pathIds[path] = id;
        const syncData = syncDataByItemId[id];
        if (syncData) {
          syncDataToKeep[syncData.id] = true;
        }
        if (!syncData || syncData.sha !== treeShaMap[path]) {
          const type = 'data';
          changes.push({
            syncDataId: path,
            item: {
              id,
              type,
              // Need a truthy value to force saving sync data
              hash: 1,
            },
            syncData: {
              id: path,
              type,
              // Need a truthy value to force downloading the content
              hash: 1,
            },
          });
        }
      }
    });

    // Location creations/updates
    [{
      type: 'syncLocation',
      map: treeSyncLocationMap,
      pathMatcher: /^([\s\S]+)\.([\w-]+)\.sync$/,
    }, {
      type: 'publishLocation',
      map: treePublishLocationMap,
      pathMatcher: /^([\s\S]+)\.([\w-]+)\.publish$/,
    }]
      .forEach(({ type, map, pathMatcher }) => Object.keys(map).forEach((path) => {
        const [, filePath, data] = path.match(pathMatcher) || [];
        if (filePath) {
          // If there is a corresponding md file in the tree
          const fileId = pathIds[`${filePath}.md`];
          if (fileId) {
            // Reuse existing ID or create a new one
            const existingItem = itemsByGitPath[path];
            const id = existingItem
              ? existingItem.id
              : utils.uid();
            pathIds[path] = id;

            const item = utils.addItemHash({
              ...JSON.parse(utils.decodeBase64(data)),
              id,
              type,
              fileId,
            });
            changes.push({
              syncDataId: path,
              item,
              syncData: {
                id: path,
                type: item.type,
                hash: item.hash,
              },
            });
          }
        }
      }));

    // Deletions
    Object.keys(syncDataByPath).forEach((path) => {
      if (!pathIds[path] && !syncDataToKeep[path]) {
        changes.push({ syncDataId: path });
      }
    });

    return changes;
  },
  async saveWorkspaceItem({ item }) {
    const syncData = {
      id: store.getters.gitPathsByItemId[item.id],
      type: item.type,
      hash: item.hash,
    };

    // Files and folders are not in git, only contents
    if (item.type === 'file' || item.type === 'folder') {
      return syncData;
    }

    // locations are stored as paths, so we upload an empty file
    const syncToken = store.getters['workspace/syncToken'];
    await githubHelper.uploadFile({
      ...getWorkspaceWithOwner(),
      token: syncToken,
      path: getAbsolutePath(syncData),
      content: '',
      sha: treeShaMap[syncData.id],
    });
    return syncData;
  },
  async removeWorkspaceItem({ syncData }) {
    if (treeShaMap[syncData.id]) {
      const syncToken = store.getters['workspace/syncToken'];
      await githubHelper.removeFile({
        ...getWorkspaceWithOwner(),
        token: syncToken,
        path: getAbsolutePath(syncData),
        sha: treeShaMap[syncData.id],
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
      ...getWorkspaceWithOwner(),
      token,
      path: getAbsolutePath(fileSyncData),
    });
    treeShaMap[fileSyncData.id] = sha;
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
      ...getWorkspaceWithOwner(),
      token,
      path: getAbsolutePath(syncData),
    });
    treeShaMap[syncData.id] = sha;
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
      ...getWorkspaceWithOwner(),
      token,
      path: absolutePath,
      content: Provider.serializeContent(content),
      sha: treeShaMap[path],
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
      ...getWorkspaceWithOwner(),
      token,
      path: getAbsolutePath(syncData),
      content: JSON.stringify(item),
      sha: treeShaMap[path],
    });

    return {
      syncData: {
        ...syncData,
        sha: res.content.sha,
      },
    };
  },
  onSyncEnd() {
    // Clean up
    treeShaMap = null;
    treeFolderMap = null;
    treeFileMap = null;
    treeDataMap = null;
    treeSyncLocationMap = null;
    treePublishLocationMap = null;
  },
  async listRevisions(token, fileId) {
    const { owner, repo, branch } = getWorkspaceWithOwner();
    const syncData = Provider.getContentSyncData(fileId);
    const entries = await githubHelper.getCommits({
      token,
      owner,
      repo,
      sha: branch,
      path: syncData.id,
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
      const sub = `gh:${user.id}`;
      userSvc.addInfo({ id: sub, name: user.login, imageUrl: user.avatar_url });
      const date = (commit.author && commit.author.date)
        || (commit.committer && commit.committer.date);
      return {
        id: sha,
        sub,
        created: date ? new Date(date).getTime() : 1,
      };
    })
      .sort((revision1, revision2) => revision2.created - revision1.created);
  },
  async getRevisionContent(token, fileId, revisionId) {
    const syncData = Provider.getContentSyncData(fileId);
    const { data } = await githubHelper.downloadFile({
      ...getWorkspaceWithOwner(),
      token,
      branch: revisionId,
      path: getAbsolutePath(syncData),
    });
    return Provider.parseContent(data, `${fileId}/content`);
  },
});
