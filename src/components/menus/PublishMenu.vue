<template>
  <div class="side-bar__panel side-bar__panel--menu">
    <div class="side-bar__warning" v-if="publishLocations.length">
      <p><b>{{currentFileName}}</b> is already published.</p>
      <menu-entry v-if="!offline" @click.native="requestPublish">
        <icon-upload slot="icon"></icon-upload>
        <div>Publish now</div>
        <span>Upload current file to its publication locations.</span>
      </menu-entry>
      <menu-entry @click.native="managePublish">
        <icon-view-list slot="icon"></icon-view-list>
        <div>File publication</div>
        <span>Manage current file publication locations.</span>
      </menu-entry>
    </div>
    <hr>
    <div v-for="token in googleDriveTokens" :key="token.sub">
      <menu-entry @click.native="publishGoogleDrive(token)">
        <icon-provider slot="icon" provider-id="googleDrive"></icon-provider>
        <div>Publish to Google Drive</div>
        <span>{{token.name}}</span>
      </menu-entry>
    </div>
    <div v-for="token in dropboxTokens" :key="token.sub">
      <menu-entry @click.native="publishDropbox(token)">
        <icon-provider slot="icon" provider-id="dropbox"></icon-provider>
        <div>Publish to Dropbox</div>
        <span>{{token.name}}</span>
      </menu-entry>
    </div>
    <div v-for="token in githubTokens" :key="token.sub">
      <menu-entry @click.native="publishGithub(token)">
        <icon-provider slot="icon" provider-id="github"></icon-provider>
        <div>Publish to GitHub</div>
        <span>{{token.name}}</span>
      </menu-entry>
      <menu-entry @click.native="publishGist(token)">
        <icon-provider slot="icon" provider-id="gist"></icon-provider>
        <div>Publish to Gist</div>
        <span>{{token.name}}</span>
      </menu-entry>
    </div>
    <div v-for="token in bloggerTokens" :key="token.sub">
      <menu-entry @click.native="publishBlogger(token)">
        <icon-provider slot="icon" provider-id="blogger"></icon-provider>
        <div>Publish to Blogger</div>
        <span>{{token.name}}</span>
      </menu-entry>
      <menu-entry @click.native="publishBloggerPage(token)">
        <icon-provider slot="icon" provider-id="bloggerPage"></icon-provider>
        <div>Publish to Blogger Page</div>
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
    <menu-entry @click.native="addBloggerAccount">
      <icon-provider slot="icon" provider-id="blogger"></icon-provider>
      <span>Add Blogger account</span>
    </menu-entry>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import MenuEntry from './MenuEntry';
import googleHelper from '../../services/providers/helpers/googleHelper';
import dropboxHelper from '../../services/providers/helpers/dropboxHelper';
import githubHelper from '../../services/providers/helpers/githubHelper';
import publishSvc from '../../services/publishSvc';
import store from '../../store';

const tokensToArray = (tokens, filter = () => true) => Object.keys(tokens)
  .map(sub => tokens[sub])
  .filter(token => filter(token))
  .sort((token1, token2) => token1.name.localeCompare(token2.name));

const openPublishModal = (token, type) => store.dispatch('modal/open', {
  type,
  token,
}).then(publishLocation => publishSvc.createPublishLocation(publishLocation));

export default {
  components: {
    MenuEntry,
  },
  computed: {
    ...mapState([
      'offline',
    ]),
    ...mapState('queue', [
      'isPublishRequested',
    ]),
    ...mapGetters('publishLocation', {
      publishLocations: 'current',
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
    bloggerTokens() {
      return tokensToArray(this.$store.getters['data/googleTokens'], token => token.isBlogger);
    },
  },
  methods: {
    requestPublish() {
      if (!this.isPublishRequested) {
        publishSvc.requestPublish();
      }
    },
    managePublish() {
      return this.$store.dispatch('modal/open', 'publishManagement');
    },
    addGoogleDriveAccount() {
      return googleHelper.addDriveAccount();
    },
    addDropboxAccount() {
      return dropboxHelper.addAccount();
    },
    addGithubAccount() {
      return githubHelper.addAccount();
    },
    addBloggerAccount() {
      return googleHelper.addBloggerAccount();
    },
    publishGoogleDrive(token) {
      return openPublishModal(token, 'googleDrivePublish');
    },
    publishDropbox(token) {
      return openPublishModal(token, 'dropboxPublish');
    },
    publishGithub(token) {
      return openPublishModal(token, 'githubPublish');
    },
    publishGist(token) {
      return openPublishModal(token, 'gistPublish');
    },
    publishBlogger(token) {
      return openPublishModal(token, 'bloggerPublish');
    },
    publishBloggerPage(token) {
      return openPublishModal(token, 'bloggerPagePublish');
    },
  },
};
</script>
