<template>
  <div class="context-menu" v-if="items.length" @click="close()" @contextmenu.prevent="close()">
    <div class="context-menu__inner flex flex--column" :style="{ left: coordinates.left + 'px', top: coordinates.top + 'px' }" @click.stop>
      <div v-for="(item, idx) in items" :key="idx">
        <div class="context-menu__separator" v-if="item.type === 'separator'"></div>
        <div class="context-menu__item context-menu__item--disabled" v-else-if="item.disabled">{{item.name}}</div>
        <a class="context-menu__item" href="javascript:void(0)" v-else @click="close(item)">{{item.name}}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import store from '../store';

export default {
  computed: {
    ...mapState('contextMenu', [
      'coordinates',
      'items',
      'resolve',
    ]),
  },
  methods: {
    close(item = null) {
      this.resolve(item);
      store.dispatch('contextMenu/close');
    },
  },
};
</script>

<style lang="scss">
.context-menu {
  position: absolute;
  width: 100%;
  height: 100%;
  font-size: 14px;
  line-height: 18px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  user-select: none;
}

$padding: 5px;

.context-menu__inner {
  position: absolute;
  background-color: #ebebeb;
  border-radius: $padding;
  padding: $padding 0;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.16), 0 3px 10px 1px rgba(0, 0, 0, 0.12);
}

.context-menu__item {
  display: block;
  color: #333;
  text-decoration: none;
  padding: 0 25px;
}

a.context-menu__item {
  &:active,
  &:focus,
  &:hover {
    background-color: #338dfc;
    color: #fff;
  }
}

.context-menu__item--disabled {
  color: #aaa;
}

.context-menu__separator {
  border-top: 2px solid #dcdcdd;
  margin: $padding 0;
}
</style>
