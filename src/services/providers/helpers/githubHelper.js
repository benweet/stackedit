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
})
  .then(res => res.body);

const getCommitMessage = (name, path) => {
  const message = store.getters['data/computedSettings'].github[name];
  return message.replace(/{{path}}/g, path);
};

export default {

  /**
   * https://developer.github.com/apps/building-oauth-apps/authorization-options-for-oauth-apps/
   */
  async startOauth2(scopes, sub = null, silent = false) {
    const { code } = await networkSvc.startOauth2(
      'https://github.com/login/oauth/authorize',
      {
        client_id: clientId,
        scope: scopes.join(' '),
      },
      silent,
    );

    // Exchange code with token
    const accessToken = (await networkSvc.request({
      method: 'GET',
      url: 'oauth2/githubToken',
      params: {
        clientId,
        code,
      },
    })).body;

    // Call the user info endpoint
    const user = (await networkSvc.request({
      method: 'GET',
      url: 'https://api.github.com/user',
      params: {
        access_token: accessToken,
      },
    })).body;

    // Check the returned sub consistency
    if (sub && `${user.id}` !== sub) {
      throw new Error('GitHub account ID not expected.');
    }

    // Build token object including scopes and sub
    const token = {
      scopes,
      accessToken,
      name: user.login,
      sub: `${user.id}`,
      repoFullAccess: scopes.indexOf('repo') !== -1,
    };

    // Add token to github tokens
    store.dispatch('data/addGithubToken', token);
    return token;
  },
  async addAccount(repoFullAccess = false) {
    return this.startOauth2(getScopes({ repoFullAccess }));
  },

  /**
   * Getting a user from its userId is not feasible with API v3.
   * Using an undocumented endpoint...
   */
  async getUser(userId) {
    const user = (await networkSvc.request({
      url: `https://api.github.com/user/${userId}`,
      params: {
        t: Date.now(), // Prevent from caching
      },
    })).body;
    store.commit('userInfo/addItem', {
      id: `gh:${user.id}`,
      name: user.login,
      imageUrl: user.avatar_url || '',
    });
    return user;
  },

  /**
   * https://developer.github.com/v3/repos/commits/#get-a-single-commit
   * https://developer.github.com/v3/git/trees/#get-a-tree
   */
  async getTree({
    token,
    owner,
    repo,
    branch,
  }) {
    const { commit } = await repoRequest(token, owner, repo, {
      url: `commits/${encodeURIComponent(branch)}`,
    });
    const { tree, truncated } = await repoRequest(token, owner, repo, {
      url: `git/trees/${encodeURIComponent(commit.tree.sha)}?recursive=1`,
    });
    if (truncated) {
      throw new Error('Git tree too big. Please remove some files in the repository.');
    }
    return tree;
  },

  /**
   * https://developer.github.com/v3/repos/commits/#list-commits-on-a-repository
   */
  async getCommits({
    token,
    owner,
    repo,
    sha,
    path,
  }) {
    return repoRequest(token, owner, repo, {
      url: 'commits',
      params: { sha, path },
    });
  },

  /**
   * https://developer.github.com/v3/repos/contents/#create-a-file
   * https://developer.github.com/v3/repos/contents/#update-a-file
   */
  async uploadFile({
    token,
    owner,
    repo,
    branch,
    path,
    content,
    sha,
  }) {
    return repoRequest(token, owner, repo, {
      method: 'PUT',
      url: `contents/${encodeURIComponent(path)}`,
      body: {
        message: getCommitMessage(sha ? 'updateFileMessage' : 'createFileMessage', path),
        content: utils.encodeBase64(content),
        sha,
        branch,
      },
    });
  },

  /**
   * https://developer.github.com/v3/repos/contents/#delete-a-file
   */
  async removeFile({
    token,
    owner,
    repo,
    branch,
    path,
    sha,
  }) {
    return repoRequest(token, owner, repo, {
      method: 'DELETE',
      url: `contents/${encodeURIComponent(path)}`,
      body: {
        message: getCommitMessage('deleteFileMessage', path),
        sha,
        branch,
      },
    });
  },

  /**
   * https://developer.github.com/v3/repos/contents/#get-contents
   */
  async downloadFile({
    token,
    owner,
    repo,
    branch,
    path,
  }) {
    const { sha, content } = await repoRequest(token, owner, repo, {
      url: `contents/${encodeURIComponent(path)}`,
      params: { ref: branch },
    });
    return {
      sha,
      data: utils.decodeBase64(content),
    };
  },

  /**
   * https://developer.github.com/v3/gists/#create-a-gist
   * https://developer.github.com/v3/gists/#edit-a-gist
   */
  async uploadGist({
    token,
    description,
    filename,
    content,
    isPublic,
    gistId,
  }) {
    const { body } = await request(token, gistId ? {
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
    });
    return body;
  },

  /**
   * https://developer.github.com/v3/gists/#get-a-single-gist
   */
  async downloadGist({
    token,
    gistId,
    filename,
  }) {
    const result = (await request(token, {
      url: `https://api.github.com/gists/${gistId}`,
    })).body.files[filename];
    if (!result) {
      throw new Error('Gist file not found.');
    }
    return result.content;
  },
};
