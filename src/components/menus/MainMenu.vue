<template>
  <div class="side-bar__panel side-bar__panel--menu">
    <div class="side-bar__info">
      <div class="menu-entry menu-entry--info flex flex--row flex--align-center">
        <div class="menu-entry__icon menu-entry__icon--disabled">
          <icon-sync-off></icon-sync-off>
        </div>
        <span><b>{{currentWorkspace.name}}</b> — local workspace.</span>
      </div>
    </div>
    <menu-entry @click.native="fileProperties">
      <icon-view-list slot="icon"></icon-view-list>
      <div>File properties</div>
      <span>Add metadata and configure extensions.</span>
    </menu-entry>
    <hr>
    <menu-entry @click.native="setPanel('toc')">
      <icon-toc slot="icon"></icon-toc>
      Table of contents
    </menu-entry>
    <menu-entry @click.native="setPanel('help')">
      <icon-help-circle slot="icon"></icon-help-circle>
      Markdown cheat sheet
    </menu-entry>
    <hr>
    <menu-entry @click.native="setPanel('importExport')">
      <icon-content-save slot="icon"></icon-content-save>
      Import/export
    </menu-entry>
    <menu-entry @click.native="print">
      <icon-printer slot="icon"></icon-printer>
      Print
    </menu-entry>
    <hr>
    <menu-entry @click.native="templates">
      <icon-code-braces slot="icon"></icon-code-braces>
      <div><div class="menu-entry__label menu-entry__label--count">{{templateCount}}</div> Templates</div>
      <span>Configure Handlebars templates for your exports.</span>
    </menu-entry>
    <menu-entry @click.native="settings">
      <icon-settings slot="icon"></icon-settings>
      <div>Settings</div>
      <span>Tweak application and keyboard shortcuts.</span>
    </menu-entry>
    <hr>
    <menu-entry @click.native="setPanel('workspaceBackups')">
      <icon-content-save slot="icon"></icon-content-save>
      Workspace backups
    </menu-entry>
    <menu-entry @click.native="reset">
      <icon-logout slot="icon"></icon-logout>
      Reset application
    </menu-entry>
    <menu-entry @click.native="about">
      <icon-help-circle slot="icon"></icon-help-circle>
      About StackEdit
    </menu-entry>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import MenuEntry from './common/MenuEntry';
import store from '../../store';

export default {
  components: {
    MenuEntry,
  },
  computed: {
    ...mapGetters('workspace', [
      'currentWorkspace',
    ]),
    templateCount() {
      return Object.keys(store.getters['data/allTemplatesById']).length;
    },
  },
  methods: {
    ...mapActions('data', {
      setPanel: 'setSideBarPanel',
    }),
    async fileProperties() {
      try {
        await store.dispatch('modal/open', 'fileProperties');
      } catch (e) {
        // Cancel
      }
    },
    print() {
      window.print();
    },
    async settings() {
      try {
        await store.dispatch('modal/open', 'settings');
      } catch (e) { /* Cancel */ }
    },
    async templates() {
      try {
        await store.dispatch('modal/open', 'templates');
      } catch (e) { /* Cancel */ }
    },
    async reset() {
      try {
        await store.dispatch('modal/open', 'reset');
        localStorage.setItem('resetStackEdit', '1');
        window.location.reload();
      } catch (e) { /* Cancel */ }
    },
    about() {
      store.dispatch('modal/open', 'about');
    },
  },
};
</script>
