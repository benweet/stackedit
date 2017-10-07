<template>
  <div class="modal__inner-1 modal__inner-1--sync-management" role="dialog" aria-label="Manage synchronized locations">
    <div class="modal__inner-2">
      <p v-if="syncLocations.length"><b>{{currentFileName}}</b> is synchronized with the following location(s):</p>
      <p v-else><b>{{currentFileName}}</b> is not synchronized yet.</p>
      <div>
        <div v-for="location in syncLocations" :key="location.id" class="sync-entry flex flex--row flex--align-center">
          <div class="sync-entry__icon flex flex--column flex--center">
            <icon-provider :provider-id="location.providerId"></icon-provider>
          </div>
          <div class="sync-entry__description">
            {{location.description}}
          </div>
          <div class="sync-entry__buttons flex flex--row flex--center">
            <a class="sync-entry__button button" :href="location.url" target="_blank">
              <icon-open-in-new></icon-open-in-new>
            </a>
            <button class="sync-entry__button button" @click="remove(location)">
              <icon-delete></icon-delete>
            </button>
          </div>
        </div>
      </div>
      <div class="modal__button-bar">
        <button class="button" @click="config.reject()">Cancel</button>
        <button class="button" @click="config.resolve()">Ok</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('modal', [
      'config',
    ]),
    ...mapGetters('syncLocation', {
      syncLocations: 'current',
    }),
    currentFileName() {
      return this.$store.getters['file/current'].name;
    },
  },
  methods: {
    remove(location) {
      this.$store.commit('syncLocation/deleteItem', location.id);
    },
  },
};
</script>

<style lang="scss">
@import '../common/variables.scss';

.modal__inner-1--sync-management {
  max-width: 560px;
}

.sync-entry {
  padding: 0.5rem 0.25rem;
  border-bottom: 1px solid $hr-color;

  &:last-child {
    border-bottom: none;
  }
}

.sync-entry__icon {
  height: 30px;
  width: 30px;
  margin-right: 0.75rem;
  flex: none;
}

.sync-entry__description {
  opacity: 0.5;
  line-height: 1.4;
  font-size: 0.9em;
  width: 100%;
  overflow: hidden;
}

.sync-entry__buttons {
  margin-left: 0.75rem;
}

.sync-entry__button {
  width: 38px;
  height: 38px;
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
