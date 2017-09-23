<template>
  <div class="notification">
    <div class="notification__item flex flex--row flex--align-center" v-for="(item, idx) in items" :key="idx">
      <div class="notification__icon flex flex--column flex--center">
        <icon-information v-if="item.type === 'info'"></icon-information>
        <icon-alert v-else-if="item.type === 'error'"></icon-alert>
      </div>
      <div class="notification__content">
        {{item.content}}
      </div>
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
@import 'common/variables.scss';

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
</style>
