<template>
  <div class="side-bar flex flex--column">
    <div class="side-title flex flex--row">
      <button v-if="panel !== 'menu'" class="side-title__button button" @click="setPanel('menu')">
        <icon-arrow-left></icon-arrow-left>
      </button>
      <div class="side-title__title">
        {{panelName}}
      </div>
      <button class="side-title__button button" @click="toggleSideBar(false)">
        <icon-close></icon-close>
      </button>
    </div>
    <div class="side-bar__inner">
      <!-- Main menu -->
      <div v-if="panel === 'menu'" class="side-bar__panel side-bar__panel--menu">
        <menu-entry v-if="!loginToken" @click.native="signin">
          <icon-login slot="icon"></icon-login>
          <div>Sign in with Google</div>
          <span>Back up and sync all your files, folders and settings.</span>
        </menu-entry>
        <hr v-if="!loginToken">
        <menu-entry @click.native="setPanel('sync')">
          <icon-sync slot="icon"></icon-sync>
          <div>Synchronize</div>
          <span>Open, save, collaborate in the Cloud.</span>
        </menu-entry>
        <menu-entry @click.native="setPanel('publish')">
          <icon-upload slot="icon"></icon-upload>
          <div>Publish</div>
          <span>Export to the web.</span>
        </menu-entry>
        <hr>
        <menu-entry @click.native="fileProperties">
          <icon-view-list slot="icon"></icon-view-list>
          <div>File properties</div>
          <span>Add publication metadata and configure extensions.</span>
        </menu-entry>
        <menu-entry @click.native="setPanel('toc')">
          <icon-toc slot="icon"></icon-toc>
          Table of contents
        </menu-entry>
        <menu-entry @click.native="setPanel('help')">
          <icon-help-circle slot="icon"></icon-help-circle>
          Markdown cheat sheet
        </menu-entry>
        <hr>
        <menu-entry @click.native="importFile">
          <icon-hard-disk slot="icon"></icon-hard-disk>
          Import from disk
        </menu-entry>
        <menu-entry @click.native="setPanel('export')">
          <icon-hard-disk slot="icon"></icon-hard-disk>
          Export to disk
        </menu-entry>
        <hr>
        <menu-entry @click.native="setPanel('more')">
          More...
        </menu-entry>
      </div>
      <!-- Sync menu -->
      <div v-else-if="panel === 'sync'" class="side-bar__panel side-bar__panel--menu">
        <div v-for="token in googleDriveTokens" :key="token.sub">
          <menu-entry @click.native="openGoogleDrive(token)">
            <icon-google-drive slot="icon"></icon-google-drive>
            <div>Open from Google Drive</div>
            <span>{{token.name}}</span>
          </menu-entry>
          <menu-entry @click.native="saveGoogleDrive(token)">
            <icon-google-drive slot="icon"></icon-google-drive>
            <div>Save on Google Drive</div>
            <span>{{token.name}}</span>
          </menu-entry>
          <hr>
        </div>
        <menu-entry @click.native="addGoogleDriveAccount">
          <icon-google-drive slot="icon"></icon-google-drive>
          <span>Add Google Drive account</span>
        </menu-entry>
      </div>
      <!-- More menu -->
      <div v-else-if="panel === 'more'" class="side-bar__panel side-bar__panel--menu">
        <menu-entry @click.native="settings">
          <icon-settings slot="icon"></icon-settings>
          <div>Settings</div>
          <span>Tweak application and keyboard shortcuts.</span>
        </menu-entry>
        <menu-entry @click.native="templates">
          <icon-code-braces slot="icon"></icon-code-braces>
          <div>Templates</div>
          <span>Configure Handlebars templates for your exports.</span>
        </menu-entry>
        <menu-entry @click.native="reset">
          <icon-logout slot="icon"></icon-logout>
          <div>Reset application</div>
          <span>Sign out and clean local data.</span>
        </menu-entry>
      </div>
      <!-- Export menu -->
      <div v-else-if="panel === 'export'" class="side-bar__panel side-bar__panel--menu">
        <menu-entry @click.native="exportMarkdown">
          <icon-download slot="icon"></icon-download>
          Export as Markdown
        </menu-entry>
        <menu-entry @click.native="exportHtml">
          <icon-download slot="icon"></icon-download>
          Export as HTML
        </menu-entry>
        <menu-entry @click.native="exportPdf">
          <icon-download slot="icon"></icon-download>
          Export as PDF
        </menu-entry>
      </div>
      <!-- Help -->
      <div v-else-if="panel === 'help'" class="side-bar__panel side-bar__panel--help">
        <pre class="markdown-highlighting" v-html="markdownSample"></pre>
      </div>
      <!-- TOC -->
      <div class="side-bar__panel side-bar__panel--toc" :class="{'side-bar__panel--hidden': panel !== 'toc'}">
        <toc>
        </toc>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Toc from './Toc';
import MenuEntry from './MenuEntry';
import markdownSample from '../data/markdownSample.md';
import markdownConversionSvc from '../services/markdownConversionSvc';
import googleHelper from '../services/providers/helpers/googleHelper';
import googleDriveProvider from '../services/providers/googleDriveProvider';
import syncSvc from '../services/syncSvc';
import localDbSvc from '../services/localDbSvc';
import exportSvc from '../services/exportSvc';

const panelNames = {
  menu: 'Menu',
  help: 'Markdown cheat sheet',
  toc: 'Table of contents',
  sync: 'Synchronize',
  publish: 'Publish',
  export: 'Export to disk',
  more: 'More',
};

export default {
  components: {
    Toc,
    MenuEntry,
  },
  data: () => ({
    markdownSample: markdownConversionSvc.highlight(markdownSample),
  }),
  computed: {
    ...mapGetters('data', [
      'loginToken',
    ]),
    panel() {
      return this.$store.getters['data/localSettings'].sideBarPanel;
    },
    panelName() {
      return panelNames[this.panel];
    },
    googleDriveTokens() {
      const googleToken = this.$store.getters['data/googleTokens'];
      return Object.keys(googleToken)
        .map(sub => googleToken[sub])
        .filter(token => token.isDrive)
        .sort((token1, token2) => token1.name.localeCompare(token2.name));
    },
  },
  methods: {
    ...mapActions('data', [
      'toggleSideBar',
    ]),
    ...mapActions('data', {
      setPanel: 'setSideBarPanel',
    }),
    signin() {
      return googleHelper.signin()
        .then(() => syncSvc.requestSync());
    },
    importFile() {
      return this.$store.dispatch('modal/notImplemented');
    },
    fileProperties() {
      return this.$store.dispatch('modal/open', 'fileProperties')
        .then(properties => this.$store.dispatch('content/patchCurrent', { properties }));
    },
    settings() {
      return this.$store.dispatch('modal/open', 'settings')
        .then(settings => this.$store.dispatch('data/setSettings', settings));
    },
    templates() {
      return this.$store.dispatch('modal/open', 'templates')
        .then(templates => this.$store.dispatch('data/setTemplates', templates));
    },
    reset() {
      return this.$store.dispatch('modal/reset')
        .then(() => localDbSvc.removeDb());
    },
    addGoogleDriveAccount() {
      return googleHelper.addGoogleDriveAccount();
    },
    openGoogleDrive(token) {
      return googleHelper.openPicker(token, 'doc')
        .then(files => this.$store.dispatch('queue/enqueue',
          () => googleDriveProvider.openFiles(token, files)));
    },
    exportMarkdown() {
      const currentFile = this.$store.getters['file/current'];
      return exportSvc.exportToDisk(currentFile.id, 'md');
    },
    exportHtml() {
      return this.$store.dispatch('modal/open', 'htmlExport');
    },
    exportPdf() {
      return this.$store.dispatch('modal/notImplemented');
    },
  },
};
</script>

<style lang="scss">
@import 'common/variables.scss';

.side-bar {
  overflow: hidden;
  height: 100%;

  hr {
    margin: 10px;
  }
}

.side-bar__inner {
  position: relative;
  height: 100%;
}

.side-bar__panel {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.side-bar__panel--hidden {
  left: 1000px;
}

.side-bar__panel--menu {
  padding: 10px;
}

.side-bar__panel--help {
  padding: 0 10px 40px 20px;

  pre {
    font-size: 0.9em;
    font-variant-ligatures: no-common-ligatures;
    line-height: 1.25;
    white-space: pre-wrap;
    word-break: break-word;
    word-wrap: break-word;
  }

  .code,
  .img,
  .imgref,
  .cl-toc {
    background-color: rgba(0, 0, 0, 0.05);
  }
}
</style>
