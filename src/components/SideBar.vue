<template>
  <div class="side-bar flex flex--column">
    <div class="side-title flex flex--row">
      <button v-if="panel !== 'menu'" class="side-title__button button" @click="panel = 'menu'">
        <icon-arrow-left></icon-arrow-left>
      </button>
      <div class="side-title__title">
        {{panelName}}
      </div>
      <button class="side-title__button button" @click="toggleSideBar(false)">
        <icon-close></icon-close>
      </button>
    </div>
    <div class="side-bar__inner">
      <div v-if="panel === 'menu'" class="side-bar__panel side-bar__panel--menu">
        <side-bar-item @click.native="signin">
          <icon-login slot="icon"></icon-login>
          <div>Sign in with Google</div>
          <span>Have all your files and settings backed up and synced.</span>
        </side-bar-item>
        <side-bar-item @click.native="signin">
          <icon-login slot="icon"></icon-login>
          <div>Sign in on CouchDB</div>
          <span>Save and collaborate on a CouchDB hosted by you.</span>
        </side-bar-item>
        <side-bar-item @click.native="panel = 'toc'">
          <icon-toc slot="icon"></icon-toc>
          Table of contents
        </side-bar-item>
        <side-bar-item @click.native="panel = 'help'">
          <icon-help-circle slot="icon"></icon-help-circle>
          Markdown cheat sheet
        </side-bar-item>
      </div>
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
import SideBarItem from './SideBarItem';
import markdownSample from '../data/markdownSample.md';
import markdownConversionSvc from '../services/markdownConversionSvc';
import userSvc from '../services/userSvc';

const panelNames = {
  menu: 'Menu',
  help: 'Markdown cheat sheet',
  toc: 'Table of contents',
};

export default {
  components: {
    Toc,
    SideBarItem,
  },
  data: () => ({
    panel: 'menu',
    panelNames: {
      menu: 'Menu',
      toc: 'Table of Contents',
      help: 'Markdown cheat sheet',
    },
    markdownSample: markdownConversionSvc.highlight(markdownSample),
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
    signin() {
      userSvc.signinWithGoogle();
    },
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
  position: relative;
  height: 100%;
}

.side-bar__panel {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.side-bar__panel--hidden {
  left: 1000px;
}

.side-bar__panel--help {
  padding: 0 10px 40px 20px;

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
</style>
