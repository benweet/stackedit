<template>
  <div class="side-bar__panel side-bar__panel--menu">
    <div class="side-bar__info" v-if="isCurrentTemp">
      <p>{{currentFileName}} can't be synced as it's a temporary file.</p>
    </div>
    <div v-else>
      <div class="side-bar__info" v-if="syncLocations.length">
        <p>{{currentFileName}} is already synchronized.</p>
        <menu-entry @click.native="requestSync">
          <icon-sync slot="icon"></icon-sync>
          <div>Synchronize now</div>
          <span>Download / upload file changes.</span>
        </menu-entry>
        <menu-entry @click.native="manageSync">
          <icon-view-list slot="icon"></icon-view-list>
          <div><div class="menu-entry__label menu-entry__label--count">{{locationCount}}</div> File synchronization</div>
          <span>Manage synchronized locations for {{currentFileName}}.</span>
        </menu-entry>
      </div>
      <div class="side-bar__info" v-else-if="noToken">
        <p>You have to link an account to start syncing files.</p>
      </div>
      <hr>
      <div v-for="token in dropboxTokens" :key="token.sub">
        <menu-entry @click.native="openDropbox(token)">
          <icon-provider slot="icon" provider-id="dropbox"></icon-provider>
          <div>Open from Dropbox</div>
          <span>{{token.name}}</span>
        </menu-entry>
        <menu-entry @click.native="saveDropbox(token)">
          <icon-provider slot="icon" provider-id="dropbox"></icon-provider>
          <div>Save on Dropbox</div>
          <span>{{token.name}}</span>
        </menu-entry>
      </div>
      <div v-for="token in githubTokens" :key="token.sub">
        <menu-entry @click.native="openGithub(token)">
          <icon-provider slot="icon" provider-id="github"></icon-provider>
          <div>Open from GitHub</div>
          <span>{{token.name}}</span>
        </menu-entry>
        <menu-entry @click.native="saveGithub(token)">
          <icon-provider slot="icon" provider-id="github"></icon-provider>
          <div>Save on GitHub</div>
          <span>{{token.name}}</span>
        </menu-entry>
        <menu-entry @click.native="saveGist(token)">
          <icon-provider slot="icon" provider-id="gist"></icon-provider>
          <div>Save on Gist</div>
          <span>{{token.name}}</span>
        </menu-entry>
      </div>
      <div v-for="token in gitlabTokens" :key="token.sub">
        <menu-entry @click.native="openGitlab(token)">
          <icon-provider slot="icon" provider-id="gitlab"></icon-provider>
          <div>Open from GitLab</div>
          <span>{{token.name}}</span>
        </menu-entry>
        <menu-entry @click.native="saveGitlab(token)">
          <icon-provider slot="icon" provider-id="gitlab"></icon-provider>
          <div>Save on GitLab</div>
          <span>{{token.name}}</span>
        </menu-entry>
      </div>
      <div v-for="token in googleDriveTokens" :key="token.sub">
        <menu-entry @click.native="openGoogleDrive(token)">
          <icon-provider slot="icon" provider-id="googleDrive"></icon-provider>
          <div>Open from Google Drive</div>
          <span>{{token.name}}</span>
        </menu-entry>
        <menu-entry @click.native="saveGoogleDrive(token)">
          <icon-provider slot="icon" provider-id="googleDrive"></icon-provider>
          <div>Save on Google Drive</div>
          <span>{{token.name}}</span>
        </menu-entry>
      </div>
      <hr>
      <menu-entry @click.native="addDropboxAccount">
        <icon-provider slot="icon" provider-id="dropbox"></icon-provider>
        <span>Add Dropbox account</span>
      </menu-entry>
      <menu-entry @click.native="addGithubAccount">
        <icon-provider slot="icon" provider-id="github"></icon-provider>
        <span>Add GitHub account</span>
      </menu-entry>
      <menu-entry @click.native="addGitlabAccount">
        <icon-provider slot="icon" provider-id="gitlab"></icon-provider>
        <span>Add GitLab account</span>
      </menu-entry>
      <menu-entry @click.native="addGoogleDriveAccount">
        <icon-provider slot="icon" provider-id="googleDrive"></icon-provider>
        <span>Add Google Drive account</span>
      </menu-entry>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import MenuEntry from './common/MenuEntry';
import googleHelper from '../../services/providers/helpers/googleHelper';
import dropboxHelper from '../../services/providers/helpers/dropboxHelper';
import githubHelper from '../../services/providers/helpers/githubHelper';
import gitlabHelper from '../../services/providers/helpers/gitlabHelper';
import googleDriveProvider from '../../services/providers/googleDriveProvider';
import dropboxProvider from '../../services/providers/dropboxProvider';
import githubProvider from '../../services/providers/githubProvider';
import gitlabProvider from '../../services/providers/gitlabProvider';
import syncSvc from '../../services/syncSvc';
import store from '../../store';
import badgeSvc from '../../services/badgeSvc';

const tokensToArray = (tokens, filter = () => true) => Object.values(tokens)
  .filter(token => filter(token))
  .sort((token1, token2) => token1.name.localeCompare(token2.name));

const openSyncModal = (token, type) => store.dispatch('modal/open', {
  type,
  token,
}).then(syncLocation => syncSvc.createSyncLocation(syncLocation));

export default {
  components: {
    MenuEntry,
  },
  computed: {
    ...mapState('queue', [
      'isSyncRequested',
    ]),
    ...mapGetters('workspace', [
      'syncToken',
    ]),
    ...mapGetters('file', [
      'isCurrentTemp',
    ]),
    ...mapGetters('syncLocation', {
      syncLocations: 'currentWithWorkspaceSyncLocation',
    }),
    locationCount() {
      return Object.keys(this.syncLocations).length;
    },
    currentFileName() {
      return `"${store.getters['file/current'].name}"`;
    },
    dropboxTokens() {
      return tokensToArray(store.getters['data/dropboxTokensBySub']);
    },
    githubTokens() {
      return tokensToArray(store.getters['data/githubTokensBySub']);
    },
    gitlabTokens() {
      return tokensToArray(store.getters['data/gitlabTokensBySub']);
    },
    googleDriveTokens() {
      return tokensToArray(store.getters['data/googleTokensBySub'], token => token.isDrive);
    },
    noToken() {
      return !this.googleDriveTokens.length
        && !this.dropboxTokens.length
        && !this.githubTokens.length;
    },
  },
  methods: {
    requestSync() {
      if (!this.isSyncRequested) {
        syncSvc.requestSync(true);
      }
    },
    async manageSync() {
      try {
        await store.dispatch('modal/open', 'syncManagement');
      } catch (e) { /* cancel */ }
    },
    async addDropboxAccount() {
      try {
        await store.dispatch('modal/open', { type: 'dropboxAccount' });
        await dropboxHelper.addAccount(!store.getters['data/localSettings'].dropboxRestrictedAccess);
      } catch (e) { /* cancel */ }
    },
    async addGithubAccount() {
      try {
        await store.dispatch('modal/open', { type: 'githubAccount' });
        await githubHelper.addAccount(store.getters['data/localSettings'].githubRepoFullAccess);
      } catch (e) { /* cancel */ }
    },
    async addGitlabAccount() {
      try {
        const { serverUrl, applicationId } = await store.dispatch('modal/open', { type: 'gitlabAccount' });
        await gitlabHelper.addAccount(serverUrl, applicationId);
      } catch (e) { /* cancel */ }
    },
    async addGoogleDriveAccount() {
      try {
        await store.dispatch('modal/open', { type: 'googleDriveAccount' });
        await googleHelper.addDriveAccount(!store.getters['data/localSettings'].googleDriveRestrictedAccess);
      } catch (e) { /* cancel */ }
    },
    async openDropbox(token) {
      const paths = await dropboxHelper.openChooser(token);
      store.dispatch(
        'queue/enqueue',
        async () => {
          await dropboxProvider.openFiles(token, paths);
          badgeSvc.addBadge('openFromDropbox');
        },
      );
    },
    async saveDropbox(token) {
      try {
        await openSyncModal(token, 'dropboxSave');
        badgeSvc.addBadge('saveOnDropbox');
      } catch (e) { /* cancel */ }
    },
    async openGoogleDrive(token) {
      const files = await googleHelper.openPicker(token, 'doc');
      store.dispatch(
        'queue/enqueue',
        async () => {
          await googleDriveProvider.openFiles(token, files);
          badgeSvc.addBadge('openFromGoogleDrive');
        },
      );
    },
    async saveGoogleDrive(token) {
      try {
        await openSyncModal(token, 'googleDriveSave');
        badgeSvc.addBadge('saveOnGoogleDrive');
      } catch (e) { /* cancel */ }
    },
    async openGithub(token) {
      try {
        const syncLocation = await store.dispatch('modal/open', {
          type: 'githubOpen',
          token,
        });
        store.dispatch(
          'queue/enqueue',
          async () => {
            await githubProvider.openFile(token, syncLocation);
            badgeSvc.addBadge('openFromGithub');
          },
        );
      } catch (e) { /* cancel */ }
    },
    async saveGithub(token) {
      try {
        await openSyncModal(token, 'githubSave');
        badgeSvc.addBadge('saveOnGithub');
      } catch (e) { /* cancel */ }
    },
    async saveGist(token) {
      try {
        await openSyncModal(token, 'gistSync');
        badgeSvc.addBadge('saveOnGist');
      } catch (e) { /* cancel */ }
    },
    async openGitlab(token) {
      try {
        const syncLocation = await store.dispatch('modal/open', {
          type: 'gitlabOpen',
          token,
        });
        store.dispatch(
          'queue/enqueue',
          async () => {
            await gitlabProvider.openFile(token, syncLocation);
            badgeSvc.addBadge('openFromGitlab');
          },
        );
      } catch (e) { /* cancel */ }
    },
    async saveGitlab(token) {
      try {
        await openSyncModal(token, 'gitlabSave');
        badgeSvc.addBadge('saveOnGitlab');
      } catch (e) { /* cancel */ }
    },
  },
};
</script>
