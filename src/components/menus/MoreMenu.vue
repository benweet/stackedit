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
      <span>Sign out and clean local data.</span>
    </menu-entry>
    <hr>
    <input class="hidden-file" id="import-backup-file-input" type="file" @change="onImportBackup">
    <label class="menu-entry button flex flex--row flex--align-center" for="import-backup-file-input">
      <div class="menu-entry__icon flex flex--column flex--center">
        <icon-hard-disk></icon-hard-disk>
      </div>
      <div class="flex flex--column">
        Import backup
      </div>
    </label>
    <menu-entry href="#exportBackup=true" target="_blank">
      <icon-hard-disk slot="icon"></icon-hard-disk>
      Export backup
    </menu-entry>
    <hr>
    <menu-entry @click.native="about">
      <icon-help-circle slot="icon"></icon-help-circle>
      <span>About StackEdit</span>
    </menu-entry>
    <a href="editor" target="_blank" class="menu-entry button flex flex--row flex--align-center">
      <div class="menu-entry__icon flex flex--column flex--center">
        <icon-open-in-new></icon-open-in-new>
      </div>
      <div class="flex flex--column">
        <span>Go back to StackEdit 4</span>
      </div>
    </a>
  </div>
</template>

<script>
import MenuEntry from './MenuEntry';
import localDbSvc from '../../services/localDbSvc';
import backupSvc from '../../services/backupSvc';

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
        .then(
          () => localDbSvc.removeDb(),
          () => {}, // Cancel
        );
    },
    about() {
      return this.$store.dispatch('modal/open', 'about');
    },
  },
};
</script>
