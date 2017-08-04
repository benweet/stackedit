<template>
  <div class="side-bar flex flex--column">
    <div class="side-title flex flex--row flex--space-between">
      <div class="flex flex--row">
        <button v-if="panel !== 'menu'" class="side-title__button button" @click="panel = 'menu'">
          <icon-arrow-left></icon-arrow-left>
        </button>
        <div class="side-title__title">
          {{panelName}}
        </div>
      </div>
      <button class="side-title__button button" @click="toggleSideBar(false)">
        <icon-close></icon-close>
      </button>
    </div>
    <div class="side-bar__inner">
      <div v-if="panel === 'menu'" class="side-bar__panel side-bar__panel--menu">
        <menu-item>
          <icon-login slot="icon"></icon-login>
          <div>Sign in with Google</div>
          <span>Have all your files and settings backed up and synced.</span>
        </menu-item>
        <menu-item @click.native="panel = 'toc'">
          <icon-toc slot="icon"></icon-toc>
          Table of Contents
        </menu-item>
        <menu-item @click.native="panel = 'help'">
          <icon-help-circle slot="icon"></icon-help-circle>
          Markdown help
        </menu-item>
      </div>
      <div class="side-bar__panel side-bar__panel--toc" :class="{'side-bar__panel--hidden': panel !== 'toc'}">
        <toc>
        </toc>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Toc from './Toc';
import MenuItem from './MenuItem';

const panelNames = {
  menu: 'Menu',
  help: 'Markdown help',
  toc: 'Table of Contents',
};

export default {
  components: {
    Toc,
    MenuItem,
  },
  data: () => ({
    panel: 'menu',
    panelNames: {
      menu: 'Menu',
      toc: 'Table of Contents',
    },
  }),
  computed: {
    panelName() {
      return panelNames[this.panel];
    },
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
  height: 100%;
}

.side-bar__inner {
  overflow: auto;
  height: 100%;
  padding: 10px 0;
}

.side-bar__panel {
  position: absolute;
  width: 100%;
  height: 100%;
}

.side-bar__panel--hidden {
  left: 1000px;
}
</style>
