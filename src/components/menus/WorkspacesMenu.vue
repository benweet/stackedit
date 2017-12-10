<template>
  <div class="side-bar__panel side-bar__panel--menu">
    <div class="workspace" v-for="(workspace, id) in workspaces" :key="id">
      <menu-entry :href="workspace.url" target="_blank">
        <icon-provider slot="icon" provider-id="googleDrive"></icon-provider>
        <div class="workspace__name">{{workspace.name}}</div>
        <span>{{workspace.url}}</span>
      </menu-entry>
    </div>
    <hr>
    <menu-entry @click.native="addGoogleDriveWorkspace">
      <icon-provider slot="icon" provider-id="googleDriveWorkspace"></icon-provider>
      <span>Add Google Drive workspace</span>
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
      'workspaces',
    ]),
  },
  methods: {
    addGoogleDriveWorkspace() {
      return googleHelper.addDriveAccount()
        .then(token => this.$store.dispatch('modal/open', {
          type: 'googleDriveWorkspace',
          token,
        }))
        .catch(() => {}); // Cancel
    },
    manageWorkspaces() {
      return this.$store.dispatch('modal/open', 'workspaceManagement');
    },
  },
};
</script>

<style lang="scss">
.workspace__name {
  font-weight: bold;

  .menu-entry div & {
    text-decoration: none;
  }
}
</style>
