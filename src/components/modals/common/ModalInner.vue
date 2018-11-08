<template>
  <div class="modal__inner-1" role="dialog">
    <div class="modal__inner-2">
      <button class="modal__close-button button not-tabbable" @click="config.reject()" v-title="'Close modal'">
        <icon-close></icon-close>
      </button>
      <slot></slot>
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
  },
};
</script>

<style lang="scss">
@import '../../../styles/variables.scss';

.modal__close-button {
  position: absolute;
  top: 8px;
  right: 8px;
  color: rgba(0, 0, 0, 0.5);
  width: 32px;
  height: 32px;
  padding: 2px;

  &:active,
  &:focus,
  &:hover {
    color: rgba(0, 0, 0, 0.67);
  }
}
</style>
