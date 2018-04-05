<template>
  <div class="side-bar flex flex--column">
    <div class="side-title flex flex--row">
      <button v-if="panel !== 'menu'" class="side-title__button button" @click="setPanel('menu')" v-title="'Main menu'">
        <icon-arrow-left></icon-arrow-left>
      </button>
      <div class="side-title__title">
        {{panelName}}
      </div>
      <button class="side-title__button button" @click="toggleSideBar(false)" v-title="'Close side bar'">
        <icon-close></icon-close>
      </button>
    </div>
    <div class="side-bar__inner">
      <main-menu v-if="panel === 'menu'"></main-menu>
      <workspaces-menu v-if="panel === 'workspaces'"></workspaces-menu>
      <sync-menu v-else-if="panel === 'sync'"></sync-menu>
      <publish-menu v-else-if="panel === 'publish'"></publish-menu>
      <history-menu v-else-if="panel === 'history'"></history-menu>
      <export-menu v-else-if="panel === 'export'"></export-menu>
      <import-menu v-else-if="panel === 'import'"></import-menu>
      <more-menu v-else-if="panel === 'more'"></more-menu>
      <div v-else-if="panel === 'help'" class="side-bar__panel side-bar__panel--help">
        <pre class="markdown-highlighting" v-html="markdownSample"></pre>
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
import MainMenu from './menus/MainMenu';
import WorkspacesMenu from './menus/WorkspacesMenu';
import SyncMenu from './menus/SyncMenu';
import PublishMenu from './menus/PublishMenu';
import HistoryMenu from './menus/HistoryMenu';
import ExportMenu from './menus/ExportMenu';
import ImportMenu from './menus/ImportMenu';
import MoreMenu from './menus/MoreMenu';
import markdownSample from '../data/markdownSample.md';
import markdownConversionSvc from '../services/markdownConversionSvc';

const panelNames = {
  menu: 'Menu',
  workspaces: 'Workspaces',
  help: 'Markdown cheat sheet',
  toc: 'Table of contents',
  sync: 'Synchronize',
  publish: 'Publish',
  history: 'File history',
  export: 'Export to disk',
  import: 'Import from disk',
  more: 'More',
};

export default {
  components: {
    Toc,
    MainMenu,
    WorkspacesMenu,
    SyncMenu,
    PublishMenu,
    HistoryMenu,
    ExportMenu,
    ImportMenu,
    MoreMenu,
  },
  data: () => ({
    markdownSample: markdownConversionSvc.highlight(markdownSample),
  }),
  computed: {
    panel() {
      return !this.$store.state.light && this.$store.getters['data/layoutSettings'].sideBarPanel;
    },
    panelName() {
      return panelNames[this.panel];
    },
  },
  methods: {
    ...mapActions('data', [
      'toggleSideBar',
    ]),
    ...mapActions('data', {
      setPanel: 'setSideBarPanel',
    }),
  },
};
</script>

<style lang="scss">
@import 'common/variables.scss';

.side-bar {
  overflow: hidden;
  height: 100%;

  hr {
    margin: 10px 40px;
    display: none;
    border-top: 1px solid $hr-color;
  }

  * + hr {
    display: block;
  }

  hr + hr {
    display: none;
  }
}

.side-bar__inner {
  position: relative;
  height: 100%;
}

.side-bar__panel {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: auto;

  &::after {
    content: '';
    display: block;
    height: 40px;
  }
}

.side-bar__panel--hidden {
  left: 1000px;
}

.side-bar__panel--menu {
  padding: 10px;
}

.side-bar__panel--help {
  padding: 0 10px 0 20px;

  pre {
    font-size: 0.9em;
    font-variant-ligatures: no-common-ligatures;
    line-height: 1.25;
    white-space: pre-wrap;
    word-break: break-word;
    word-wrap: break-word;
  }

  .code,
  .img,
  .imgref,
  .cl-toc {
    background-color: rgba(0, 0, 0, 0.05);
  }
}

.side-bar__info {
  padding: 10px;
  margin: -10px -10px 10px;
  background-color: $info-bg;

  p {
    margin: 10px;
    line-height: 1.4;
  }
}
</style>
