<template>
  <div class="side-bar__panel side-bar__panel--menu">
    <div class="workspace" v-for="(workspace, id) in sanitizedWorkspaces" :key="id">
      <menu-entry :href="workspace.url" target="_blank">
        <icon-provider slot="icon" :provider-id="workspace.providerId"></icon-provider>
        <div class="workspace__name"><div class="menu-entry__label" v-if="currentWorkspace === workspace">current</div>{{workspace.name}}</div>
      </menu-entry>
    </div>
    <hr>
    <menu-entry @click.native="addGoogleDriveWorkspace">
      <icon-provider slot="icon" provider-id="googleDriveWorkspace"></icon-provider>
      <span>Add Google Drive workspace</span>
    </menu-entry>
    <menu-entry @click.native="addCouchdbWorkspace">
      <icon-provider slot="icon" provider-id="couchdbWorkspace"></icon-provider>
      <span>Add CouchDB workspace</span>
    </menu-entry>
    <menu-entry @click.native="manageWorkspaces">
      <icon-database slot="icon"></icon-database>
      <span>Manage workspaces</span>
    </menu-entry>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import MenuEntry from './common/MenuEntry';
import googleHelper from '../../services/providers/helpers/googleHelper';

export default {
  components: {
    MenuEntry,
  },
  computed: {
    ...mapGetters('data', [
      'sanitizedWorkspaces',
    ]),
    ...mapGetters('workspace', [
      'currentWorkspace',
    ]),
  },
  methods: {
    addGoogleDriveWorkspace() {
      return googleHelper.addDriveAccount(true)
        .then(token => this.$store.dispatch('modal/open', {
          type: 'googleDriveWorkspace',
          token,
        }))
        .catch(() => {}); // Cancel
    },
    addCouchdbWorkspace() {
      return this.$store.dispatch('modal/open', {
        type: 'couchdbWorkspace',
      })
        .catch(() => {}); // Cancel
    },
    manageWorkspaces() {
      return this.$store.dispatch('modal/open', 'workspaceManagement');
    },
  },
};
</script>

<style lang="scss">
@import '../common/variables.scss';

.workspace .menu-entry {
  padding-top: 12px;
  padding-bottom: 12px;
}

.workspace__name {
  font-weight: bold;
  line-height: 1.2;
}
</style>
