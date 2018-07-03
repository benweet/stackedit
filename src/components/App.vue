<template>
  <div class="app" :class="classes">
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
import Layout from './Layout';
import Modal from './Modal';
import Notification from './Notification';
import ContextMenu from './ContextMenu';
import SplashScreen from './SplashScreen';
import syncSvc from '../services/syncSvc';
import networkSvc from '../services/networkSvc';
import sponsorSvc from '../services/sponsorSvc';
import tempFileSvc from '../services/tempFileSvc';
import './common/vueGlobals';

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
      const result = themeClasses[this.$store.getters['data/computedSettings'].colorTheme];
      return Array.isArray(result) ? result : themeClasses.light;
    },
  },
  async created() {
    try {
      await syncSvc.init();
      await networkSvc.init();
      await sponsorSvc.init();
      this.ready = true;
      tempFileSvc.setReady();
    } catch (err) {
      if (err && err.message !== 'RELOAD') {
        console.error(err); // eslint-disable-line no-console
        this.$store.dispatch('notification/error', err);
      }
    }
  },
};
</script>
