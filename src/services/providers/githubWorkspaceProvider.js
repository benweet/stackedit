import store from '../../store';
import githubHelper from './helpers/githubHelper';
import Provider from './common/Provider';
import utils from '../utils';
import userSvc from '../userSvc';

const getSyncData = (fileId) => {
  const syncData = store.getters['data/syncDataByItemId'][`${fileId}/content`];
  return syncData
    ? Promise.resolve(syncData)
    : Promise.reject(); // No need for a proper error message.
};

const getAbsolutePath = syncData =>
  (store.getters['workspace/currentWorkspace'].path || '') + syncData.id;

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
  initWorkspace() {
    const [owner, repo] = (utils.queryParams.repo || '').split('/');
    const branch = utils.queryParams.branch;
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
    let workspace = store.getters['data/sanitizedWorkspaces'][workspaceId];

    return Promise.resolve()
      .then(() => {
        // See if we already have a token
        if (workspace) {
          // Token sub is in the workspace
          const token = store.getters['data/githubTokens'][workspace.sub];
          if (token) {
            return token;
          }
        }
        // If no token has been found, popup an authorize window and get one
        return store.dispatch('modal/open', {
          type: 'githubAccount',
          onResolve: () => githubHelper.addAccount(store.getters['data/localSettings'].githubRepoFullAccess),
        });
      })
      .then((token) => {
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
        if (workspace.url !== location.href) {
          store.dispatch('data/patchWorkspaces', {
            [workspaceId]: {
              ...workspace,
              url: location.href,
            },
          });
        }
        return store.getters['data/sanitizedWorkspaces'][workspaceId];
      });
  },
  getChanges() {
    const syncToken = store.getters['workspace/syncToken'];
    const { owner, repo, branch } = getWorkspaceWithOwner();
    return githubHelper.getHeadTree(syncToken, owner, repo, branch)
      .then((tree) => {
        const workspacePath = store.getters['workspace/currentWorkspace'].path || '';
        const syncDataByPath = store.getters['data/syncData'];
        const syncDataByItemId = store.getters['data/syncDataByItemId'];

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
            // Collect parents path
            let parentPath = '';
            path.split('/').slice(0, -1).forEach((folderName) => {
              const folderPath = `${parentPath}${folderName}/`;
              treeFolderMap[folderPath] = parentPath;
              parentPath = folderPath;
            });
            // Collect file path
            if (path.indexOf('.stackedit-data/') === 0) {
              treeDataMap[path] = true;
            } else if (endsWith(path, '.md')) {
              treeFileMap[path] = parentPath;
            } else if (endsWith(path, '.sync')) {
              treeSyncLocationMap[path] = true;
            } else if (endsWith(path, '.publish')) {
              treePublishLocationMap[path] = true;
            }
          });

        // Collect changes
        const changes = [];
        const pathIds = {};
        const syncDataToIgnore = Object.create(null);
        const getId = (path) => {
          const syncData = syncDataByPath[path];
          const id = syncData ? syncData.itemId : utils.uid();
          pathIds[path] = id;
          return id;
        };

        // Folder creations/updates
        // Assume map entries are sorted from top to bottom
        Object.entries(treeFolderMap).forEach(([path, parentPath]) => {
          const id = getId(path);
          const item = utils.addItemHash({
            id,
            type: 'folder',
            name: path.slice(parentPath.length, -1),
            parentId: pathIds[parentPath] || null,
          });
          changes.push({
            syncDataId: path,
            item,
            syncData: {
              id: path,
              itemId: id,
              type: item.type,
              hash: item.hash,
            },
          });
        });

        // File creations/updates
        Object.entries(treeFileMap).forEach(([path, parentPath]) => {
          const id = getId(path);
          const item = utils.addItemHash({
            id,
            type: 'file',
            name: path.slice(parentPath.length, -'.md'.length),
            parentId: pathIds[parentPath] || null,
          });
          changes.push({
            syncDataId: path,
            item,
            syncData: {
              id: path,
              itemId: id,
              type: item.type,
              hash: item.hash,
            },
          });

          // Content creations/updates
          const contentSyncData = syncDataByItemId[`${id}/content`];
          if (contentSyncData) {
            syncDataToIgnore[contentSyncData.id] = true;
          }
          if (!contentSyncData || contentSyncData.sha !== treeShaMap[path]) {
            // Use `/` as a prefix to get a unique syncData id
            changes.push({
              syncDataId: `/${path}`,
              item: {
                id: `${id}/content`,
                type: 'content',
                // Need a truthy value to force saving sync data
                hash: 1,
              },
              syncData: {
                id: `/${path}`,
                itemId: `${id}/content`,
                type: 'content',
                // Need a truthy value to force downloading the content
                hash: 1,
              },
            });
          }
        });

        // Data creations/updates
        Object.keys(treeDataMap).forEach((path) => {
          try {
            const [, id] = path.match(/^\.stackedit-data\/([\s\S]+)\.json$/);
            pathIds[path] = id;
            const syncData = syncDataByItemId[id];
            if (syncData) {
              syncDataToIgnore[syncData.id] = true;
            }
            if (!syncData || syncData.sha !== treeShaMap[path]) {
              changes.push({
                syncDataId: path,
                item: {
                  id,
                  type: 'data',
                  // Need a truthy value to force saving sync data
                  hash: 1,
                },
                syncData: {
                  id: path,
                  itemId: id,
                  type: 'data',
                  // Need a truthy value to force downloading the content
                  hash: 1,
                },
              });
            }
          } catch (e) {
            // Ignore parsing errors
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
            try {
              const [, filePath, data] = path.match(pathMatcher);
              // If there is a corresponding md file in the tree
              const fileId = pathIds[`${filePath}.md`];
              if (fileId) {
                const id = getId(path);
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
                    itemId: id,
                    type: item.type,
                    hash: item.hash,
                  },
                });
              }
            } catch (e) {
              // Ignore parsing errors
            }
          }));

        // Deletions
        Object.keys(syncDataByPath).forEach((path) => {
          if (!pathIds[path] && !syncDataToIgnore[path]) {
            changes.push({ syncDataId: path });
          }
        });

        return changes;
      });
  },
  saveSimpleItem(item) {
    const path = store.getters.itemPaths[item.fileId || item.id];
    return Promise.resolve()
      .then(() => {
        const syncToken = store.getters['workspace/syncToken'];
        const { owner, repo, branch } = getWorkspaceWithOwner();
        const syncData = {
          itemId: item.id,
          type: item.type,
          hash: item.hash,
        };

        if (item.type === 'file') {
          syncData.id = `${path}.md`;
        } else if (item.type === 'folder') {
          syncData.id = path;
        }
        if (syncData.id) {
          return syncData;
        }

        // locations are stored as paths, so we upload an empty file
        const data = utils.encodeBase64(utils.serializeObject({
          ...item,
          id: undefined,
          type: undefined,
          fileId: undefined,
        }), true);
        const extension = item.type === 'syncLocation' ? 'sync' : 'publish';
        syncData.id = `${path}.${data}.${extension}`;
        return githubHelper.uploadFile(
          syncToken,
          owner,
          repo,
          branch,
          getAbsolutePath(syncData),
          '',
          treeShaMap[syncData.id],
        ).then(() => syncData);
      });
  },
  removeItem(syncData) {
    // Ignore content deletion
    if (syncData.type === 'content') {
      return Promise.resolve();
    }
    const syncToken = store.getters['workspace/syncToken'];
    const { owner, repo, branch } = getWorkspaceWithOwner();
    return githubHelper.removeFile(
      syncToken,
      owner,
      repo,
      branch,
      getAbsolutePath(syncData),
      treeShaMap[syncData.id],
    );
  },
  downloadContent(token, syncLocation) {
    const syncData = store.getters['data/syncDataByItemId'][syncLocation.fileId];
    const contentSyncData = store.getters['data/syncDataByItemId'][`${syncLocation.fileId}/content`];
    if (!syncData || !contentSyncData) {
      return Promise.resolve();
    }
    const { owner, repo, branch } = getWorkspaceWithOwner();
    return githubHelper.downloadFile(token, owner, repo, branch, getAbsolutePath(syncData))
      .then(({ sha, content }) => {
        const item = Provider.parseContent(content, `${syncLocation.fileId}/content`);
        if (item.hash !== contentSyncData.hash) {
          store.dispatch('data/patchSyncData', {
            [contentSyncData.id]: {
              ...contentSyncData,
              hash: item.hash,
              sha,
            },
          });
        }
        return item;
      });
  },
  downloadData(dataId) {
    const syncData = store.getters['data/syncDataByItemId'][dataId];
    if (!syncData) {
      return Promise.resolve();
    }
    const syncToken = store.getters['workspace/syncToken'];
    const { owner, repo, branch } = getWorkspaceWithOwner();
    return githubHelper.downloadFile(syncToken, owner, repo, branch, getAbsolutePath(syncData))
      .then(({ sha, content }) => {
        const item = JSON.parse(content);
        if (item.hash !== syncData.hash) {
          store.dispatch('data/patchSyncData', {
            [syncData.id]: {
              ...syncData,
              hash: item.hash,
              sha,
            },
          });
        }
        return item;
      });
  },
  uploadContent(token, content, syncLocation) {
    const contentSyncData = store.getters['data/syncDataByItemId'][`${syncLocation.fileId}/content`];
    if (contentSyncData && contentSyncData.hash === content.hash) {
      return Promise.resolve(syncLocation);
    }
    const syncData = store.getters['data/syncDataByItemId'][syncLocation.fileId];
    const { owner, repo, branch } = getWorkspaceWithOwner();
    return githubHelper.uploadFile(
      token,
      owner,
      repo,
      branch,
      getAbsolutePath(syncData),
      Provider.serializeContent(content),
      treeShaMap[syncData.id],
    )
      .then((res) => {
        const id = `/${syncData.id}`;
        store.dispatch('data/patchSyncData', {
          [id]: {
            // Build sync data
            id,
            itemId: content.id,
            type: content.type,
            hash: content.hash,
            sha: res.content.sha,
          },
        });
        return syncLocation;
      });
  },
  uploadData(item) {
    const oldSyncData = store.getters['data/syncDataByItemId'][item.id];
    if (oldSyncData && oldSyncData.hash === item.hash) {
      return Promise.resolve();
    }
    const syncData = {
      id: `.stackedit-data/${item.id}.json`,
      itemId: item.id,
      type: item.type,
      hash: item.hash,
    };
    const syncToken = store.getters['workspace/syncToken'];
    const { owner, repo, branch } = getWorkspaceWithOwner();
    return githubHelper.uploadFile(
      syncToken,
      owner,
      repo,
      branch,
      getAbsolutePath(syncData),
      JSON.stringify(item),
      oldSyncData && oldSyncData.sha,
    )
      .then(res => store.dispatch('data/patchSyncData', {
        [syncData.id]: {
          ...syncData,
          sha: res.content.sha,
        },
      }));
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
  listRevisions(token, fileId) {
    const { owner, repo, branch } = getWorkspaceWithOwner();
    return getSyncData(fileId)
      .then(syncData => githubHelper.getCommits(token, owner, repo, branch, syncData.id))
      .then(entries => entries.map((entry) => {
        let user;
        if (entry.author && entry.author.login) {
          user = entry.author;
        } else if (entry.committer && entry.committer.login) {
          user = entry.committer;
        }
        const sub = `gh:${user.id}`;
        userSvc.addInfo({ id: sub, name: user.login, imageUrl: user.avatar_url });
        const date = (entry.commit.author && entry.commit.author.date)
          || (entry.commit.committer && entry.commit.committer.date);
        return {
          id: entry.sha,
          sub,
          created: date ? new Date(date).getTime() : 1,
        };
      })
        .sort((revision1, revision2) => revision2.created - revision1.created));
  },
  getRevisionContent(token, fileId, revisionId) {
    const { owner, repo } = getWorkspaceWithOwner();
    return getSyncData(fileId)
      .then(syncData => githubHelper.downloadFile(
        token, owner, repo, revisionId, getAbsolutePath(syncData)))
      .then(({ content }) => Provider.parseContent(content, `${fileId}/content`));
  },
});
