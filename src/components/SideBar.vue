<template>
  <div class="side-bar flex flex--column">
    <div class="side-title flex flex--row flex--space-between">
      <div class="flex flex--row">
        <!-- <button class="side-title__button button" @click="newItem()">
          <icon-file-plus></icon-file-plus>
        </button> -->
        <div class="side-title__title">
          Menu
        </div>
      </div>
      <button class="side-title__button button" @click="toggleSideBar(false)">
        <icon-close></icon-close>
      </button>
    </div>
    <div class="side-bar__panel side-bar__panel--toc">
      <toc>
      </toc>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Toc from './Toc';

export default {
  components: {
    Toc,
  },
  methods: {
    ...mapActions('data', [
      'toggleSideBar',
    ]),
  },
};
</script>

<style lang="scss">
@import 'common/variables.scss';

.side-bar {
  overflow: hidden;
}

.side-bar__panel {
  position: absolute;
  width: 100%;
  height: 100%;
}

.side-bar__panel--toc {
  left: 1000px;
}
</style>
