<template>
  <div class="side-bar__panel side-bar__panel--menu">
    <div class="side-bar__info" v-if="isCurrentTemp">
      <p><b>{{currentFileName}}</b> can not be synchronized as it's a temporary file.</p>
    </div>
    <div v-else>
      <div class="side-bar__info" v-if="noToken">
        <p>You have to <b>link an account</b> to start syncing files.</p>
      </div>
      <div class="side-bar__info" v-if="syncLocations.length">
        <p><b>{{currentFileName}}</b> is already synchronized.</p>
        <menu-entry @click.native="requestSync">
          <icon-sync slot="icon"></icon-sync>
          <div>Synchronize now</div>
          <span>Download / upload file changes.</span>
        </menu-entry>
        <menu-entry @click.native="manageSync">
          <icon-view-list slot="icon"></icon-view-list>
          <div>File synchronization</div>
          <span>Manage current file synchronized locations.</span>
        </menu-entry>
      </div>
      <hr>
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
      <hr>
      <menu-entry @click.native="addGoogleDriveAccount">
        <icon-provider slot="icon" provider-id="googleDrive"></icon-provider>
        <span>Add Google Drive account</span>
      </menu-entry>
      <menu-entry @click.native="addDropboxAccount">
        <icon-provider slot="icon" provider-id="dropbox"></icon-provider>
        <span>Add Dropbox account</span>
      </menu-entry>
      <menu-entry @click.native="addGithubAccount">
        <icon-provider slot="icon" provider-id="github"></icon-provider>
        <span>Add GitHub account</span>
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
import googleDriveProvider from '../../services/providers/googleDriveProvider';
import dropboxProvider from '../../services/providers/dropboxProvider';
import githubProvider from '../../services/providers/githubProvider';
import syncSvc from '../../services/syncSvc';
import store from '../../store';

const tokensToArray = (tokens, filter = () => true) => Object.keys(tokens)
  .map(sub => tokens[sub])
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
      syncLocations: 'current',
    }),
    currentFileName() {
      return this.$store.getters['file/current'].name;
    },
    googleDriveTokens() {
      return tokensToArray(this.$store.getters['data/googleTokens'], token => token.isDrive);
    },
    dropboxTokens() {
      return tokensToArray(this.$store.getters['data/dropboxTokens']);
    },
    githubTokens() {
      return tokensToArray(this.$store.getters['data/githubTokens']);
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
        syncSvc.requestSync();
      }
    },
    manageSync() {
      return this.$store.dispatch('modal/open', 'syncManagement');
    },
    addGoogleDriveAccount() {
      return this.$store.dispatch('modal/open', {
        type: 'googleDriveAccount',
        onResolve: () => googleHelper.addDriveAccount(!store.getters['data/localSettings'].googleDriveRestrictedAccess),
      })
        .catch(() => {}); // Cancel
    },
    addDropboxAccount() {
      return this.$store.dispatch('modal/open', {
        type: 'dropboxAccount',
        onResolve: () => dropboxHelper.addAccount(!store.getters['data/localSettings'].dropboxRestrictedAccess),
      })
        .catch(() => {}); // Cancel
    },
    addGithubAccount() {
      return this.$store.dispatch('modal/open', {
        type: 'githubAccount',
        onResolve: () => githubHelper.addAccount(store.getters['data/localSettings'].githubRepoFullAccess),
      })
        .catch(() => {}); // Cancel
    },
    openGoogleDrive(token) {
      return googleHelper.openPicker(token, 'doc')
        .then(files => this.$store.dispatch('queue/enqueue',
          () => googleDriveProvider.openFiles(token, files)));
    },
    openDropbox(token) {
      return dropboxHelper.openChooser(token)
        .then(paths => this.$store.dispatch('queue/enqueue',
          () => dropboxProvider.openFiles(token, paths)));
    },
    saveGoogleDrive(token) {
      return openSyncModal(token, 'googleDriveSave')
        .catch(() => {}); // Cancel
    },
    saveDropbox(token) {
      return openSyncModal(token, 'dropboxSave')
        .catch(() => {}); // Cancel
    },
    openGithub(token) {
      return store.dispatch('modal/open', {
        type: 'githubOpen',
        token,
      })
        .then(syncLocation => this.$store.dispatch('queue/enqueue',
          () => githubProvider.openFile(token, syncLocation)));
    },
    saveGithub(token) {
      return openSyncModal(token, 'githubSave')
        .catch(() => {}); // Cancel
    },
    saveGist(token) {
      return openSyncModal(token, 'gistSync')
        .catch(() => {}); // Cancel
    },
  },
};
</script>
