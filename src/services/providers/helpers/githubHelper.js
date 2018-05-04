import utils from '../../utils';
import networkSvc from '../../networkSvc';
import store from '../../../store';

const clientId = GITHUB_CLIENT_ID;
const getScopes = token => [token.repoFullAccess ? 'repo' : 'public_repo', 'gist'];

const request = (token, options) => networkSvc.request({
  ...options,
  headers: {
    ...options.headers || {},
    Authorization: `token ${token.accessToken}`,
  },
  params: {
    ...options.params || {},
    t: Date.now(), // Prevent from caching
  },
});

const repoRequest = (token, owner, repo, options) => request(token, {
  ...options,
  url: `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/${options.url}`,
});

const getCommitMessage = (name, path) => {
  const message = store.getters['data/computedSettings'].github[name];
  return message.replace(/{{path}}/g, path);
};

export default {
  startOauth2(scopes, sub = null, silent = false) {
    return networkSvc.startOauth2(
      'https://github.com/login/oauth/authorize', {
        client_id: clientId,
        scope: scopes.join(' '),
      }, silent)
      // Exchange code with token
      .then(data => networkSvc.request({
        method: 'GET',
        url: 'oauth2/githubToken',
        params: {
          clientId,
          code: data.code,
        },
      })
        .then(res => res.body))
      // Call the user info endpoint
      .then(accessToken => networkSvc.request({
        method: 'GET',
        url: 'https://api.github.com/user',
        params: {
          access_token: accessToken,
        },
      })
        .then((res) => {
          // Check the returned sub consistency
          if (sub && `${res.body.id}` !== sub) {
            throw new Error('GitHub account ID not expected.');
          }
          // Build token object including scopes and sub
          const token = {
            scopes,
            accessToken,
            name: res.body.login,
            sub: `${res.body.id}`,
            repoFullAccess: scopes.indexOf('repo') !== -1,
          };
          // Add token to githubTokens
          store.dispatch('data/setGithubToken', token);
          return token;
        }));
  },
  addAccount(repoFullAccess = false) {
    return this.startOauth2(getScopes({ repoFullAccess }));
  },
  getUser(userId) {
    return networkSvc.request({
      url: `https://api.github.com/user/${userId}`,
      params: {
        t: Date.now(), // Prevent from caching
      },
    })
      .then((res) => {
        store.commit('userInfo/addItem', {
          id: `gh:${res.body.id}`,
          name: res.body.login,
          imageUrl: res.body.avatar_url || '',
        });
        return res.body;
      });
  },
  getTree(token, owner, repo, sha) {
    return repoRequest(token, owner, repo, {
      url: `git/trees/${encodeURIComponent(sha)}?recursive=1`,
    })
      .then((res) => {
        if (res.body.truncated) {
          throw new Error('Git tree too big. Please remove some files in the repository.');
        }
        return res.body.tree;
      });
  },
  getHeadTree(token, owner, repo, branch) {
    return repoRequest(token, owner, repo, {
      url: `commits/${encodeURIComponent(branch)}`,
    })
      .then(res => this.getTree(token, owner, repo, res.body.commit.tree.sha));
  },
  getCommits(token, owner, repo, sha, path) {
    return repoRequest(token, owner, repo, {
      url: 'commits',
      params: { sha, path },
    })
      .then(res => res.body);
  },
  uploadFile(token, owner, repo, branch, path, content, sha) {
    return repoRequest(token, owner, repo, {
      method: 'PUT',
      url: `contents/${encodeURIComponent(path)}`,
      body: {
        message: getCommitMessage(sha ? 'updateFileMessage' : 'createFileMessage', path),
        content: utils.encodeBase64(content),
        sha,
        branch,
      },
    })
      .then(res => res.body);
  },
  removeFile(token, owner, repo, branch, path, sha) {
    return repoRequest(token, owner, repo, {
      method: 'DELETE',
      url: `contents/${encodeURIComponent(path)}`,
      body: {
        message: getCommitMessage('deleteFileMessage', path),
        sha,
        branch,
      },
    })
      .then(res => res.body);
  },
  downloadFile(token, owner, repo, branch, path) {
    return repoRequest(token, owner, repo, {
      url: `contents/${encodeURIComponent(path)}`,
      params: { ref: branch },
    })
      .then(res => ({
        sha: res.body.sha,
        content: utils.decodeBase64(res.body.content),
      }));
  },
  uploadGist(token, description, filename, content, isPublic, gistId) {
    return request(token, gistId ? {
      method: 'PATCH',
      url: `https://api.github.com/gists/${gistId}`,
      body: {
        description,
        files: {
          [filename]: {
            content,
          },
        },
      },
    } : {
      method: 'POST',
      url: 'https://api.github.com/gists',
      body: {
        description,
        files: {
          [filename]: {
            content,
          },
        },
        public: isPublic,
      },
    })
      .then(res => res.body);
  },
  downloadGist(token, gistId, filename) {
    return request(token, {
      url: `https://api.github.com/gists/${gistId}`,
    })
      .then((res) => {
        const result = res.body.files[filename];
        if (!result) {
          throw new Error('Gist file not found.');
        }
        return result.content;
      });
  },
};
