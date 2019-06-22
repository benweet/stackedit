<template>
  <modal-inner class="modal__inner-1--sync-management" aria-label="Manage synchronized locations">
    <div class="modal__content">
      <div class="modal__image">
        <icon-sync></icon-sync>
      </div>
      <p v-if="syncLocations.length"><b>{{currentFileName}}</b> is synchronized with the following location(s):</p>
      <p v-else><b>{{currentFileName}}</b> is not synchronized yet.</p>
      <div>
        <div class="sync-entry flex flex--column" v-for="location in syncLocations" :key="location.id">
          <div class="sync-entry__header flex flex--row flex--align-center">
            <div class="sync-entry__icon flex flex--column flex--center">
              <icon-provider :provider-id="location.providerId"></icon-provider>
            </div>
            <div class="sync-entry__description">
              {{location.description}}
            </div>
            <div class="sync-entry__buttons flex flex--row flex--center">
              <button class="sync-entry__button button" @click="remove(location)" v-title="'Remove location'">
                <icon-delete></icon-delete>
              </button>
            </div>
          </div>
          <div class="sync-entry__row flex flex--row flex--align-center">
            <div class="sync-entry__url">
              {{location.url || 'Google Drive app data'}}
            </div>
            <div class="sync-entry__buttons flex flex--row flex--center" v-if="location.url">
              <button class="sync-entry__button button" v-clipboard="location.url" @click="info('Location URL copied to clipboard!')" v-title="'Copy URL'">
                <icon-content-copy></icon-content-copy>
              </button>
              <a class="sync-entry__button button" v-if="location.url" :href="location.url" target="_blank" v-title="'Open location'">
                <icon-open-in-new></icon-open-in-new>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="modal__info" v-if="syncLocations.length">
        <b>Tip:</b> Removing a location won't delete any file.
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
import store from '../../store';
import badgeSvc from '../../services/badgeSvc';

export default {
  components: {
    ModalInner,
  },
  computed: {
    ...mapGetters('modal', [
      'config',
    ]),
    ...mapGetters('syncLocation', {
      syncLocations: 'currentWithWorkspaceSyncLocation',
    }),
    currentFileName() {
      return store.getters['file/current'].name;
    },
  },
  methods: {
    ...mapActions('notification', [
      'info',
    ]),
    remove(location) {
      if (location.id === 'main') {
        this.info('This location can not be removed.');
      } else {
        store.commit('syncLocation/deleteItem', location.id);
        badgeSvc.addBadge('removeSyncLocation');
      }
    },
  },
};
</script>

<style lang="scss">
@import '../../styles/variables.scss';

.sync-entry {
  margin: 1.5em 0;
  height: auto;
  font-size: 17px;
  line-height: 1.5;
}

$button-size: 30px;
$small-button-size: 22px;

.sync-entry__header {
  line-height: $button-size;
}

.sync-entry__row {
  border-top: 1px solid $hr-color;
  line-height: $small-button-size;
}

.sync-entry__icon {
  height: 22px;
  width: 22px;
  margin-right: 0.75rem;
  flex: none;
}

.sync-entry__description {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.sync-entry__url {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  opacity: 0.5;
  font-size: 0.67em;
}

.sync-entry__buttons {
  margin-left: 0.75rem;

  .sync-entry__row & {
    margin-left: 0.5rem;
  }
}

.sync-entry__button {
  width: $button-size;
  height: $button-size;
  padding: 4px;
  background-color: transparent;
  opacity: 0.75;

  .sync-entry__row & {
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
