import store from '../../store';
import githubHelper from './helpers/githubHelper';
import Provider from './common/Provider';
import utils from '../utils';
import userSvc from '../userSvc';

const getAbsolutePath = ({ id }) =>
  `${store.getters['workspace/currentWorkspace'].path || ''}${id}`;

let treeShaMap;
let treeFolderMap;
let treeFileMap;
let treeDataMap;
let treeSyncLocationMap;
let treePublishLocationMap;

const endsWith = (str, suffix) => str.slice(-suffix.length) === suffix;

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

    return store.getters['workspace/workspacesById'][workspaceId];
  },
  getChanges() {
    const syncToken = store.getters['workspace/syncToken'];
    return githubHelper.getTree({
      ...store.getters['workspace/currentWorkspace'],
      token: syncToken,
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
    const idsByPath = {};
    const syncDataByPath = store.getters['data/syncDataById'];
    const { itemIdsByGitPath } = store.getters;
    const getIdFromPath = (path, isFile) => {
      let itemId = idsByPath[path];
      if (!itemId) {
        const existingItemId = itemIdsByGitPath[path];
        if (existingItemId
          // Reuse a file ID only if it has already been synced
          && (!isFile || syncDataByPath[path]
          // Content may have already been synced
          || syncDataByPath[`/${path}`])
        ) {
          itemId = existingItemId;
        } else {
          // Otherwise, make a new ID for a new item
          itemId = utils.uid();
        }
        // If it's a file path, add the content path as well
        if (isFile) {
          idsByPath[`/${path}`] = `${itemId}/content`;
        }
        idsByPath[path] = itemId;
      }
      return itemId;
    };

    // Folder creations/updates
    // Assume map entries are sorted from top to bottom
    Object.entries(treeFolderMap).forEach(([path, parentPath]) => {
      if (path === '.stackedit-trash/') {
        idsByPath[path] = 'trash';
      } else {
        const item = utils.addItemHash({
          id: getIdFromPath(path),
          type: 'folder',
          name: path.slice(parentPath.length, -1),
          parentId: idsByPath[parentPath] || null,
        });

        const folderSyncData = syncDataByPath[path];
        if (!folderSyncData || folderSyncData.hash !== item.hash) {
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
    });

    // File/content creations/updates
    Object.entries(treeFileMap).forEach(([path, parentPath]) => {
      const fileId = getIdFromPath(path, true);
      const contentPath = `/${path}`;
      const contentId = idsByPath[contentPath];

      // File creations/updates
      const item = utils.addItemHash({
        id: fileId,
        type: 'file',
        name: path.slice(parentPath.length, -'.md'.length),
        parentId: idsByPath[parentPath] || null,
      });

      const fileSyncData = syncDataByPath[path];
      if (!fileSyncData || fileSyncData.hash !== item.hash) {
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

      // Content creations/updates
      const contentSyncData = syncDataByPath[contentPath];
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
        idsByPath[path] = id;
        const syncData = syncDataByItemId[id];
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
          const fileId = idsByPath[`${filePath}.md`];
          if (fileId) {
            // Reuse existing ID or create a new one
            const id = itemIdsByGitPath[path] || utils.uid();
            idsByPath[path] = id;

            const item = utils.addItemHash({
              ...JSON.parse(utils.decodeBase64(data)),
              id,
              type,
              fileId,
            });

            const locationSyncData = syncDataByPath[path];
            if (!locationSyncData || locationSyncData.hash !== item.hash) {
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
        }
      }));

    // Deletions
    Object.keys(syncDataByPath).forEach((path) => {
      if (!idsByPath[path]) {
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
      return { syncData };
    }

    // locations are stored as paths, so we upload an empty file
    const syncToken = store.getters['workspace/syncToken'];
    await githubHelper.uploadFile({
      ...store.getters['workspace/currentWorkspace'],
      token: syncToken,
      path: getAbsolutePath(syncData),
      content: '',
      sha: treeShaMap[syncData.id],
    });

    // Return sync data to save
    return { syncData };
  },
  async removeWorkspaceItem({ syncData }) {
    if (treeShaMap[syncData.id]) {
      const syncToken = store.getters['workspace/syncToken'];
      await githubHelper.removeFile({
        ...store.getters['workspace/currentWorkspace'],
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
      ...store.getters['workspace/currentWorkspace'],
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
      ...store.getters['workspace/currentWorkspace'],
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
      ...store.getters['workspace/currentWorkspace'],
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
      ...store.getters['workspace/currentWorkspace'],
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
  async listFileRevisions({ token, fileSyncData }) {
    const { owner, repo, branch } = store.getters['workspace/currentWorkspace'];
    const entries = await githubHelper.getCommits({
      token,
      owner,
      repo,
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
      const sub = `gh:${user.id}`;
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
    const { data } = await githubHelper.downloadFile({
      ...store.getters['workspace/currentWorkspace'],
      token,
      branch: revisionId,
      path: getAbsolutePath(fileSyncData),
    });
    return Provider.parseContent(data, contentId);
  },
});
