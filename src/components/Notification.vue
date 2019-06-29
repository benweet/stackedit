<template>
  <div class="notification">
    <div class="notification__item flex flex--row flex--align-center" v-for="(item, idx) in items" :key="idx">
      <div class="notification__icon flex flex--column flex--center">
        <icon-alert v-if="item.type === 'error'"></icon-alert>
        <icon-check-circle v-else-if="item.type === 'badge'"></icon-check-circle>
        <icon-information v-else></icon-information>
      </div>
      <div class="notification__content">
        {{item.content}}
      </div>
      <button class="notification__button button" v-if="item.type === 'confirm'" @click="item.reject">
        No
      </button>
      <button class="notification__button button" v-if="item.type === 'confirm'" @click="item.resolve">
        Yes
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: mapState('notification', [
    'items',
  ]),
};
</script>

<style lang="scss">
@import '../styles/variables.scss';

.notification {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  max-width: 340px;
}

.notification__item {
  margin: 10px;
  padding: 10px 15px;
  line-height: 1.4;
  background-color: #000;
  color: #fff;
  font-size: 0.9em;
  border-radius: $border-radius-base;
}

.notification__icon {
  height: 20px;
  width: 20px;
  margin-right: 12px;
  flex: none;
}

.notification__button {
  color: $navbar-color;
  padding: 8px;
  flex: none;

  &:active,
  &:focus,
  &:hover {
    color: $navbar-hover-color;
    background-color: $navbar-hover-background;
  }
}
</style>
