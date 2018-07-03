<template>
  <modal-inner class="modal__inner-1--workspace-management" aria-label="Manage workspaces">
    <div class="modal__content">
      <div class="modal__image">
        <icon-database></icon-database>
      </div>
      <p>The following workspaces are locally available:</p>
      <div class="workspace-entry flex flex--column" v-for="(workspace, id) in workspacesById" :key="id">
        <div class="flex flex--column">
          <div class="workspace-entry__header flex flex--row flex--align-center">
            <div class="workspace-entry__icon">
              <icon-provider :provider-id="workspace.providerId"></icon-provider>
            </div>
            <input class="text-input" type="text" v-if="editedId === id" v-focus @blur="submitEdit()" @keydown.enter="submitEdit()" @keydown.esc.stop="submitEdit(true)" v-model="editingName">
            <div class="workspace-entry__name" v-else>{{workspace.name}}</div>
            <div class="workspace-entry__buttons flex flex--row">
              <button class="workspace-entry__button button" @click="edit(id)" v-title="'Edit name'">
                <icon-pen></icon-pen>
              </button>
              <button class="workspace-entry__button button" @click="remove(id)" v-title="'Remove'">
                <icon-delete></icon-delete>
              </button>
            </div>
          </div>
          <div class="workspace-entry__row flex flex--row flex--align-center">
            <div class="workspace-entry__url">
              {{workspace.url}}
            </div>
            <div class="workspace-entry__buttons flex flex--row">
              <button class="workspace-entry__button button" v-clipboard="workspace.url" @click="info('Workspace URL copied to clipboard!')" v-title="'Copy URL'">
                <icon-content-copy></icon-content-copy>
              </button>
              <a class="workspace-entry__button button" :href="workspace.url" target="_blank" v-title="'Open workspace'">
                <icon-open-in-new></icon-open-in-new>
              </a>
            </div>
          </div>
          <div class="workspace-entry__row flex flex--row flex--align-center" v-if="workspace.locationUrl">
            <div class="workspace-entry__url">
              {{workspace.locationUrl}}
            </div>
            <div class="workspace-entry__buttons flex flex--row">
              <button class="workspace-entry__button button" v-clipboard="workspace.locationUrl" @click="info('Workspace URL copied to clipboard!')" v-title="'Copy URL'">
                <icon-content-copy></icon-content-copy>
              </button>
              <a class="workspace-entry__button button" :href="workspace.locationUrl" target="_blank" v-title="'Open workspace location'">
                <icon-open-in-new></icon-open-in-new>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="modal__info">
        <b>ProTip:</b> Workspaces are accessible <b>offline</b> after their first use.
      </div>
    </div>
    <div class="modal__button-bar">
      <button class="button button--resolve" @click="config.resolve()">Close</button>
    </div>
  </modal-inner>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ModalInner from './common/ModalInner';
import workspaceSvc from '../../services/workspaceSvc';

export default {
  components: {
    ModalInner,
  },
  data: () => ({
    editedId: null,
    editingName: '',
  }),
  computed: {
    ...mapGetters('modal', [
      'config',
    ]),
    ...mapGetters('workspace', [
      'workspacesById',
      'mainWorkspace',
      'currentWorkspace',
    ]),
  },
  methods: {
    ...mapActions('notification', [
      'info',
    ]),
    edit(id) {
      this.editedId = id;
      this.editingName = this.workspacesById[id].name;
    },
    submitEdit(cancel) {
      const workspace = this.workspacesById[this.editedId];
      if (workspace) {
        if (!cancel && this.editingName) {
          this.$store.dispatch('workspace/patchWorkspacesById', {
            [this.editedId]: {
              ...workspace,
              name: this.editingName,
            },
          });
        } else {
          this.editingName = workspace.name;
        }
      }
      this.editedId = null;
    },
    async remove(id) {
      if (id === this.mainWorkspace.id) {
        this.info('Your main workspace can not be removed.');
      } else if (id === this.currentWorkspace.id) {
        this.info('Please close the workspace before removing it.');
      } else {
        try {
          await this.$store.dispatch('modal/open', 'removeWorkspace');
          workspaceSvc.removeWorkspace(id);
        } catch (e) { /* Cancel */ }
      }
    },
  },
};
</script>

<style lang="scss">
@import '../../styles/variables.scss';

.modal__inner-1--workspace-management {
  max-width: 560px;
}

.workspace-entry {
  margin: 1.75em 0;
  height: auto;
  font-size: 17px;
  line-height: 1.5;
}

$button-size: 30px;
$small-button-size: 22px;

.workspace-entry__header {
  line-height: $button-size;

  .text-input {
    border: 1px solid $link-color;
    padding: 0 5px;
    line-height: $button-size;
    height: $button-size;
  }
}

.workspace-entry__row {
  margin-top: 1px;
  padding-top: 1px;
  border-top: 1px solid rgba(128, 128, 128, 0.15);
  line-height: $small-button-size;
}

.workspace-entry__icon {
  height: 22px;
  width: 22px;
  margin-right: 0.75rem;
  flex: none;
}

.workspace-entry__name {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: bold;
}

.workspace-entry__url {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  opacity: 0.5;
  font-size: 0.67em;
}

.workspace-entry__buttons {
  margin-left: 0.75rem;

  .workspace-entry__row & {
    margin-left: 0.5rem;
  }
}

.workspace-entry__button {
  width: $button-size;
  height: $button-size;
  padding: 4px;
  background-color: transparent;
  opacity: 0.75;

  .workspace-entry__row & {
    width: $small-button-size;
    height: $small-button-size;
    padding: 4px;
  }

  &:active,
  &:focus,
  &:hover {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.1);
  }
}
</style>
