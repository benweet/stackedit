<template>
  <div class="side-bar__panel side-bar__panel--menu">
    <div class="side-bar__info" v-if="isCurrentTemp">
      <p><b>{{currentFileName}}</b> can not be published as it's a temporary file.</p>
    </div>
    <div v-else>
      <div class="side-bar__info" v-if="noToken">
        <p>You have to <b>link an account</b> to start publishing files.</p>
      </div>
      <div class="side-bar__info" v-if="publishLocations.length">
        <p><b>{{currentFileName}}</b> is already published.</p>
        <menu-entry @click.native="requestPublish">
          <icon-upload slot="icon"></icon-upload>
          <div>Publish now</div>
          <span>Update current file publications.</span>
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
      <div v-for="token in wordpressTokens" :key="token.sub">
        <menu-entry @click.native="publishWordpress(token)">
          <icon-provider slot="icon" provider-id="wordpress"></icon-provider>
          <div>Publish to WordPress</div>
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
      <div v-for="token in zendeskTokens" :key="token.sub">
        <menu-entry @click.native="publishZendesk(token)">
          <icon-provider slot="icon" provider-id="zendesk"></icon-provider>
          <div>Publish to Zendesk Help Center</div>
          <span>{{token.name}} — {{token.subdomain}}</span>
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
      <menu-entry @click.native="addWordpressAccount">
        <icon-provider slot="icon" provider-id="wordpress"></icon-provider>
        <span>Add WordPress account</span>
      </menu-entry>
      <menu-entry @click.native="addBloggerAccount">
        <icon-provider slot="icon" provider-id="blogger"></icon-provider>
        <span>Add Blogger account</span>
      </menu-entry>
      <menu-entry @click.native="addZendeskAccount">
        <icon-provider slot="icon" provider-id="zendesk"></icon-provider>
        <span>Add Zendesk account</span>
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
import wordpressHelper from '../../services/providers/helpers/wordpressHelper';
import zendeskHelper from '../../services/providers/helpers/zendeskHelper';
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
    ...mapState('queue', [
      'isPublishRequested',
    ]),
    ...mapGetters('file', [
      'isCurrentTemp',
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
    wordpressTokens() {
      return tokensToArray(this.$store.getters['data/wordpressTokens']);
    },
    bloggerTokens() {
      return tokensToArray(this.$store.getters['data/googleTokens'], token => token.isBlogger);
    },
    zendeskTokens() {
      return tokensToArray(this.$store.getters['data/zendeskTokens']);
    },
    noToken() {
      return !this.googleDriveTokens.length
        && !this.dropboxTokens.length
        && !this.githubTokens.length
        && !this.wordpressTokens.length
        && !this.bloggerTokens.length
        && !this.zendeskTokens.length;
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
    addWordpressAccount() {
      return wordpressHelper.addAccount()
        .catch(() => {}); // Cancel
    },
    addBloggerAccount() {
      return googleHelper.addBloggerAccount()
        .catch(() => {}); // Cancel
    },
    addZendeskAccount() {
      return this.$store.dispatch('modal/open', {
        type: 'zendeskAccount',
        onResolve: ({ subdomain, clientId }) => zendeskHelper.addAccount(subdomain, clientId),
      })
        .catch(() => {}); // Cancel
    },
    publishGoogleDrive(token) {
      return openPublishModal(token, 'googleDrivePublish')
        .catch(() => {}); // Cancel
    },
    publishDropbox(token) {
      return openPublishModal(token, 'dropboxPublish')
        .catch(() => {}); // Cancel
    },
    publishGithub(token) {
      return openPublishModal(token, 'githubPublish')
        .catch(() => {}); // Cancel
    },
    publishGist(token) {
      return openPublishModal(token, 'gistPublish')
        .catch(() => {}); // Cancel
    },
    publishWordpress(token) {
      return openPublishModal(token, 'wordpressPublish')
        .catch(() => {}); // Cancel
    },
    publishBlogger(token) {
      return openPublishModal(token, 'bloggerPublish')
        .catch(() => {}); // Cancel
    },
    publishBloggerPage(token) {
      return openPublishModal(token, 'bloggerPagePublish')
        .catch(() => {}); // Cancel
    },
    publishZendesk(token) {
      return openPublishModal(token, 'zendeskPublish')
        .catch(() => {}); // Cancel
    },
  },
};
</script>
