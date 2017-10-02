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

export default {
  components: {
    MenuEntry,
  },
  methods: {
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
