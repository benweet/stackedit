<template>
  <modal-inner class="modal__inner-1--workspace-management" aria-label="Manage workspaces">
    <div class="modal__content">
      <div class="workspace-entry flex flex--row flex--align-center" v-for="(workspace, id) in sanitizedWorkspaces" :key="id">
        <div class="workspace-entry__icon flex flex--column flex--center">
          <icon-provider :provider-id="workspace.providerId"></icon-provider>
        </div>
        <div class="workspace-entry__description flex flex--column">
          <input class="text-input" type="text" v-if="editedId === id" v-focus @blur="submitEdit()" @keydown.enter="submitEdit()" @keydown.esc.stop="submitEdit(true)" v-model="editingName">
          <div class="workspace-entry__name" v-else>
            {{workspace.name}}
          </div>
          <div class="workspace-entry__url">
            {{workspace.url}}
          </div>
        </div>
        <div class="workspace-entry__buttons flex flex--row flex--center">
          <button class="workspace-entry__button button" @click="edit(id)">
            <icon-pen></icon-pen>
          </button>
          <button class="workspace-entry__button button" v-if="id !== currentWorkspace.id && id !== mainWorkspace.id" @click="remove(id)">
            <icon-delete></icon-delete>
          </button>
        </div>
      </div>
    </div>
    <div class="modal__button-bar">
      <button class="button" @click="config.resolve()">Close</button>
    </div>
  </modal-inner>
</template>

<script>
import { mapGetters } from 'vuex';
import ModalInner from './common/ModalInner';
import localDbSvc from '../../services/localDbSvc';

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
    ...mapGetters('data', [
      'workspaces',
      'sanitizedWorkspaces',
    ]),
    ...mapGetters('workspace', [
      'mainWorkspace',
      'currentWorkspace',
    ]),
  },
  methods: {
    edit(id) {
      this.editedId = id;
      this.editingName = this.workspaces[id].name;
    },
    submitEdit(cancel) {
      const workspace = this.workspaces[this.editedId];
      if (workspace && !cancel && this.editingName) {
        this.$store.dispatch('data/patchWorkspaces', {
          [this.editedId]: {
            ...workspace,
            name: this.editingName,
          },
        });
      } else {
        this.editingName = workspace.name;
      }
      this.editedId = null;
    },
    remove(id) {
      return this.$store.dispatch('modal/removeWorkspace')
        .then(
          () => localDbSvc.removeWorkspace(id),
          () => {}, // Cancel
        );
    },
  },
};
</script>

<style lang="scss">
@import '../common/variables.scss';

.modal__inner-1--workspace-management {
  max-width: 560px;
}

.workspace-entry {
  text-align: left;
  padding-left: 10px;
  margin: 15px 0;
  height: auto;
  font-size: 17px;
  line-height: 1.5;
  text-transform: none;

  &:last-child {
    border-bottom: none;
  }

  span {
    text-overflow: ellipsis;
    overflow: hidden;
  }
}

.workspace-entry__icon {
  height: 20px;
  width: 20px;
  margin-right: 12px;
  flex: none;
}

.workspace-entry__description {
  width: 100%;
  word-wrap: break-word;
  overflow: hidden;
}

.workspace-entry__name {
  overflow: hidden;
  font-weight: bold;
}

.workspace-entry__url {
  opacity: 0.5;
  font-size: 0.75em;
}

.workspace-entry__buttons {
  margin-left: 0.75rem;
}

.workspace-entry__button {
  width: 36px;
  height: 36px;
  padding: 6px;
  background-color: transparent;
  opacity: 0.75;

  &:active,
  &:focus,
  &:hover {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.1);
  }
}
</style>
