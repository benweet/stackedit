<template>
  <div class="modal__inner-1 modal__inner-1--publish-management" role="dialog" aria-label="Manage publication locations">
    <div class="modal__inner-2">
      <p v-if="publishLocations.length"><b>{{currentFileName}}</b> is published to the following location(s):</p>
      <p v-else><b>{{currentFileName}}</b> is not published yet.</p>
      <div>
        <div v-for="location in publishLocations" :key="location.id" class="publish-entry flex flex--row flex--align-center">
          <div class="publish-entry__icon flex flex--column flex--center">
            <icon-provider :provider-id="location.providerId"></icon-provider>
          </div>
          <div class="publish-entry__description">
            {{location.description}}
          </div>
          <div class="publish-entry__buttons flex flex--row flex--center">
            <a class="publish-entry__button button" :href="location.url" target="_blank">
              <icon-open-in-new></icon-open-in-new>
            </a>
            <button class="publish-entry__button button" @click="remove(location)">
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
    ...mapGetters('publishLocation', {
      publishLocations: 'current',
    }),
    currentFileName() {
      return this.$store.getters['file/current'].name;
    },
  },
  methods: {
    remove(location) {
      this.$store.commit('publishLocation/deleteItem', location.id);
    },
  },
};
</script>

<style lang="scss">
@import '../common/variables.scss';

.modal__inner-1--publish-management {
  max-width: 560px;
}

.publish-entry {
  padding: 0.5rem 0.25rem;
  border-bottom: 1px solid $hr-color;

  &:last-child {
    border-bottom: none;
  }
}

.publish-entry__icon {
  height: 30px;
  width: 30px;
  margin-right: 0.75rem;
  flex: none;
}

.publish-entry__description {
  opacity: 0.5;
  line-height: 1.4;
  font-size: 0.9em;
  width: 100%;
  overflow: hidden;
}

.publish-entry__buttons {
  margin-left: 0.75rem;
}

.publish-entry__button {
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
