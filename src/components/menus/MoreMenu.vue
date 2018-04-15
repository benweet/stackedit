<template>
  <div class="side-bar__panel side-bar__panel--menu">
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
      <span>Sign out and clean all workspaces.</span>
    </menu-entry>
    <hr>
    <menu-entry @click.native="exportWorkspace">
      <icon-content-save slot="icon"></icon-content-save>
      Export workspace backup
    </menu-entry>
    <input class="hidden-file" id="import-backup-file-input" type="file" @change="onImportBackup">
    <label class="menu-entry button flex flex--row flex--align-center" for="import-backup-file-input">
      <div class="menu-entry__icon flex flex--column flex--center">
        <icon-content-save></icon-content-save>
      </div>
      <div class="flex flex--column">
        Import workspace backup
      </div>
    </label>
    <hr>
    <menu-entry href="editor" target="_blank">
      <icon-open-in-new slot="icon"></icon-open-in-new>
      <span>StackEdit 4 &mdash; deprecated</span>
    </menu-entry>
    <menu-entry @click.native="about">
      <icon-help-circle slot="icon"></icon-help-circle>
      <span>About StackEdit</span>
    </menu-entry>
  </div>
</template>

<script>
import MenuEntry from './common/MenuEntry';
import backupSvc from '../../services/backupSvc';
import utils from '../../services/utils';

export default {
  components: {
    MenuEntry,
  },
  methods: {
    onImportBackup(evt) {
      const file = evt.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const text = e.target.result;
          if (text.match(/\uFFFD/)) {
            this.$store.dispatch('notification/error', 'File is not readable.');
          } else {
            backupSvc.importBackup(text);
          }
        };
        const blob = file.slice(0, 10000000);
        reader.readAsText(blob);
      }
    },
    exportWorkspace() {
      const url = utils.addQueryParams('app', {
        ...utils.queryParams,
        exportWorkspace: true,
      }, true);
      const iframeElt = utils.createHiddenIframe(url);
      document.body.appendChild(iframeElt);
      setTimeout(() => {
        document.body.removeChild(iframeElt);
      }, 60000);
    },
    settings() {
      return this.$store.dispatch('modal/open', 'settings')
        .then(
          settings => this.$store.dispatch('data/setSettings', settings),
          () => {}, // Cancel
        );
    },
    templates() {
      return this.$store.dispatch('modal/open', 'templates')
        .then(
          ({ templates }) => this.$store.dispatch('data/setTemplates', templates),
          () => {}, // Cancel
        );
    },
    reset() {
      return this.$store.dispatch('modal/reset')
        .then(() => {
          location.href = '#reset=true';
          location.reload();
        });
    },
    about() {
      return this.$store.dispatch('modal/open', 'about');
    },
  },
};
</script>
