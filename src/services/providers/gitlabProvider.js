import store from '../../store';
import gitlabHelper from './helpers/gitlabHelper';
import Provider from './common/Provider';
import utils from '../utils';
import workspaceSvc from '../workspaceSvc';
import userSvc from '../userSvc';

const savedSha = {};

export default new Provider({
  id: 'gitlab',
  name: 'GitLab',
  getToken({ sub }) {
    return store.getters['data/gitlabTokensBySub'][sub];
  },
  getLocationUrl({
    sub,
    projectPath,
    branch,
    path,
  }) {
    const token = this.getToken({ sub });
    return `${token.serverUrl}/${projectPath}/blob/${encodeURIComponent(branch)}/${utils.encodeUrlPath(path)}`;
  },
  getLocationDescription({ path }) {
    return path;
  },
  async downloadContent(token, syncLocation) {
    const { sha, data } = await gitlabHelper.downloadFile({
      ...syncLocation,
      token,
    });
    savedSha[syncLocation.id] = sha;
    return Provider.parseContent(data, `${syncLocation.fileId}/content`);
  },
  async uploadContent(token, content, syncLocation) {
    const updatedSyncLocation = {
      ...syncLocation,
      projectId: await gitlabHelper.getProjectId(token, syncLocation),
    };
    if (!savedSha[updatedSyncLocation.id]) {
      try {
        // Get the last sha
        await this.downloadContent(token, updatedSyncLocation);
      } catch (e) {
        // Ignore error
      }
    }
    const sha = savedSha[updatedSyncLocation.id];
    delete savedSha[updatedSyncLocation.id];
    await gitlabHelper.uploadFile({
      ...updatedSyncLocation,
      token,
      content: Provider.serializeContent(content),
      sha,
    });
    return updatedSyncLocation;
  },
  async publish(token, html, metadata, publishLocation) {
    const updatedPublishLocation = {
      ...publishLocation,
      projectId: await gitlabHelper.getProjectId(token, publishLocation),
    };
    try {
      // Get the last sha
      await this.downloadContent(token, updatedPublishLocation);
    } catch (e) {
      // Ignore error
    }
    const sha = savedSha[updatedPublishLocation.id];
    delete savedSha[updatedPublishLocation.id];
    await gitlabHelper.uploadFile({
      ...updatedPublishLocation,
      token,
      content: html,
      sha,
    });
    return updatedPublishLocation;
  },
  async openFile(token, syncLocation) {
    const updatedSyncLocation = {
      ...syncLocation,
      projectId: await gitlabHelper.getProjectId(token, syncLocation),
    };

    // Check if the file exists and open it
    if (!Provider.openFileWithLocation(updatedSyncLocation)) {
      // Download content from GitLab
      let content;
      try {
        content = await this.downloadContent(token, updatedSyncLocation);
      } catch (e) {
        store.dispatch('notification/error', `Could not open file ${updatedSyncLocation.path}.`);
        return;
      }

      // Create the file
      let name = updatedSyncLocation.path;
      const slashPos = name.lastIndexOf('/');
      if (slashPos > -1 && slashPos < name.length - 1) {
        name = name.slice(slashPos + 1);
      }
      const dotPos = name.lastIndexOf('.');
      if (dotPos > 0 && slashPos < name.length) {
        name = name.slice(0, dotPos);
      }
      const item = await workspaceSvc.createFile({
        name,
        parentId: store.getters['file/current'].parentId,
        text: content.text,
        properties: content.properties,
        discussions: content.discussions,
        comments: content.comments,
      }, true);
      store.commit('file/setCurrentId', item.id);
      workspaceSvc.addSyncLocation({
        ...updatedSyncLocation,
        fileId: item.id,
      });
      store.dispatch('notification/info', `${store.getters['file/current'].name} was imported from GitLab.`);
    }
  },
  makeLocation(token, projectPath, branch, path) {
    return {
      providerId: this.id,
      sub: token.sub,
      projectPath,
      branch,
      path,
    };
  },
  async listFileRevisions({ token, syncLocation }) {
    const entries = await gitlabHelper.getCommits({
      ...syncLocation,
      token,
    });

    return entries.map((entry) => {
      const email = entry.author_email || entry.committer_email;
      const sub = `${gitlabHelper.subPrefix}:${token.serverUrl}/${email}`;
      userSvc.addUserInfo({
        id: sub,
        name: entry.author_name || entry.committer_name,
        imageUrl: '',
      });
      const date = entry.authored_date || entry.committed_date || 1;
      return {
        id: entry.id,
        sub,
        created: date ? new Date(date).getTime() : 1,
      };
    });
  },
  async loadFileRevision() {
    // Revision are already loaded
    return false;
  },
  async getFileRevisionContent({
    token,
    contentId,
    syncLocation,
    revisionId,
  }) {
    const { data } = await gitlabHelper.downloadFile({
      ...syncLocation,
      token,
      branch: revisionId,
    });
    return Provider.parseContent(data, contentId);
  },
});
