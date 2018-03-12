<template>
  <div class="modal__inner-1" role="dialog">
    <div class="modal__inner-2">
      <button class="modal__close-button button not-tabbable" @click="config.reject()" v-title="'Close modal'">
        <icon-close></icon-close>
      </button>
      <div class="modal__sponsor-button" v-if="showSponsorButton">
        StackEdit is <a class="not-tabbable" target="_blank" href="https://github.com/benweet/stackedit/">open source</a>. Please consider
        <a class="not-tabbable" href="javascript:void(0)" @click="sponsor">sponsoring</a> for just $5.
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import googleHelper from '../../../services/providers/helpers/googleHelper';
import syncSvc from '../../../services/syncSvc';

export default {
  computed: {
    ...mapGetters('modal', [
      'config',
    ]),
    showSponsorButton() {
      const type = this.$store.getters['modal/config'].type;
      return !this.$store.getters.isSponsor && type !== 'sponsor' && type !== 'signInForSponsorship';
    },
  },
  methods: {
    sponsor() {
      Promise.resolve()
        .then(() => !this.$store.getters['workspace/sponsorToken'] &&
          // If user has to sign in
          this.$store.dispatch('modal/signInForSponsorship', {
            onResolve: () => googleHelper.signin()
              .then(() => syncSvc.requestSync()),
          }))
        .then(() => {
          if (!this.$store.getters.isSponsor) {
            this.$store.dispatch('modal/open', 'sponsor');
          }
        })
        .catch(() => {}); // Cancel
    },
  },
};
</script>

<style lang="scss">
@import '../../common/variables.scss';

.modal__close-button {
  position: absolute;
  top: 8px;
  right: 8px;
  color: rgba(0, 0, 0, 0.5);
  width: 30px;
  height: 30px;
  padding: 2px;

  &:active,
  &:focus,
  &:hover {
    color: rgba(0, 0, 0, 0.67);
  }
}

.modal__sponsor-button {
  display: inline-block;
  color: darken($error-color, 10%);
  background-color: transparentize($error-color, 0.85);
  border-radius: $border-radius-base;
  font-size: 0.9em;
  padding: 0.75em 1.5em;
  margin-bottom: 1.2em;
  line-height: 1.55;
}
</style>
