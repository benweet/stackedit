<template>
  <div class="side-bar__panel side-bar__panel--menu">
    <menu-entry v-if="!loginToken" @click.native="signin">
      <icon-login slot="icon"></icon-login>
      <div>Sign in with Google</div>
      <span>Back up and sync all your files, folders and settings.</span>
    </menu-entry>
    <hr>
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
      <span>Add metadata and configure extensions.</span>
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
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import MenuEntry from './MenuEntry';
import googleHelper from '../../services/providers/helpers/googleHelper';
import syncSvc from '../../services/syncSvc';

export default {
  components: {
    MenuEntry,
  },
  computed: {
    ...mapGetters('data', [
      'loginToken',
    ]),
  },
  methods: {
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
  },
};
</script>
