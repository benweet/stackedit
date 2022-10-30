<template>
  <div class="app" :class="classes" @keydown.esc="close">
    <splash-screen v-if="!ready"></splash-screen>
    <layout v-else></layout>
    <modal></modal>
    <notification></notification>
    <context-menu></context-menu>
  </div>
</template>

<script>
import '../styles';
import '../styles/markdownHighlighting.scss';
import '../styles/app.scss';
import Layout from './Layout.vue';
import Modal from './Modal.vue';
import Notification from './Notification.vue';
import ContextMenu from './ContextMenu.vue';
import SplashScreen from './SplashScreen.vue';
import syncSvc from '../services/syncSvc.js';
import networkSvc from '../services/networkSvc.js';
import tempFileSvc from '../services/tempFileSvc.js';
import store from '../store/index.js';
import './common/vueGlobals.js';

const themeClasses = {
  light: ['app--light'],
  dark: ['app--dark'],
};

export default {
  components: {
    Layout,
    Modal,
    Notification,
    ContextMenu,
    SplashScreen,
  },
  data: () => ({
    ready: false,
  }),
  computed: {
    classes() {
      const result = themeClasses[store.getters['data/computedSettings'].colorTheme];
      return Array.isArray(result) ? result : themeClasses.light;
    },
  },
  methods: {
    close() {
      tempFileSvc.close();
    },
  },
  async created() {
    try {
      await syncSvc.init();
      await networkSvc.init();
      this.ready = true;
      tempFileSvc.setReady();
    } catch (err) {
      if (err && err.message === 'RELOAD') {
        window.location.reload();
      } else if (err && err.message !== 'RELOAD') {
        console.error(err); // eslint-disable-line no-console
        store.dispatch('notification/error', err);
      }
    }
  },
};
</script>
