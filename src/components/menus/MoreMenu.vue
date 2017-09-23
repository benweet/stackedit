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
        .then(settings => this.$store.dispatch('data/setSettings', settings));
    },
    templates() {
      return this.$store.dispatch('modal/open', 'templates')
        .then(({ templates }) => this.$store.dispatch('data/setTemplates', templates));
    },
    reset() {
      return this.$store.dispatch('modal/reset')
        .then(() => localDbSvc.removeDb());
    },
  },
};
</script>
