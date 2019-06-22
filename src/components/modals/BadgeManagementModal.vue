<template>
  <modal-inner class="modal__inner-1--badge-management" aria-label="Manage badges">
    <div class="modal__content">
      <div class="modal__image">
        <icon-seal></icon-seal>
      </div>
      <p v-if="badgeCount > 1">{{badgeCount}} badges earned</p>
      <p v-else>{{badgeCount}} badge earned</p>
      <div class="badge-entry" :class="{'badge-entry--earned': badge.isEarned}" v-for="badge in badgeTree" :key="badge.featureId">
        <div class="flex flex--row">
          <icon-seal></icon-seal>
          <div>
            <span class="badge-entry__name">{{badge.name}}</span>
            <span class="badge-entry__description">&mdash; {{badge.description}}</span>
            <div class="badge-entry" :class="{'badge-entry--earned': child.isEarned}" v-for="child in badge.children" :key="child.featureId">
              <div class="flex flex--row">
                <icon-seal></icon-seal>
                <div>
                  <span class="badge-entry__name">{{child.name}}</span>
                  <span class="badge-entry__description">&mdash; {{child.description}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal__button-bar">
      <button class="button button--resolve" @click="config.resolve()">Close</button>
    </div>
  </modal-inner>
</template>

<script>
import { mapGetters } from 'vuex';
import ModalInner from './common/ModalInner';
import store from '../../store';

export default {
  components: {
    ModalInner,
  },
  computed: {
    ...mapGetters('modal', [
      'config',
    ]),
    ...mapGetters('data', [
      'badgeTree',
    ]),
    badgeCount() {
      return store.getters['data/allBadges'].filter(badge => badge.isEarned).length;
    },
    featureCount() {
      return store.getters['data/allBadges'].length;
    },
  },
};
</script>

<style lang="scss">
@import '../../styles/variables.scss';

.modal__inner-1.modal__inner-1--badge-management {
  max-width: 520px;

  p {
    font-size: 1.8rem;
    font-weight: bold;
  }
}

.badge-entry {
  line-height: 1.4;
  margin: 2rem 0;
  font-size: 0.9em;

  .badge-entry {
    font-size: 0.8em;
    margin: 0.75rem 0 0;
  }

  svg {
    width: 1.67em;
    height: 1.67em;
    margin-right: 0.25em;
    opacity: 0.33;
    flex: none;
  }
}

.badge-entry--earned svg {
  opacity: 1;
  color: goldenrod;
}

.badge-entry__description {
  opacity: 0.6;
}

.badge-entry__name {
  font-size: 1.2em;
  font-weight: bold;
  opacity: 0.5;

  .badge-entry--earned & {
    opacity: 1;
  }
}
</style>
