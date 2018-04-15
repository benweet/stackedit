<template>
  <div class="app" :class="classes">
    <splash-screen v-if="!ready"></splash-screen>
    <layout v-else></layout>
    <modal v-if="showModal"></modal>
    <notification></notification>
    <context-menu></context-menu>
  </div>
</template>

<script>
import Vue from 'vue';
import Layout from './Layout';
import Modal from './Modal';
import Notification from './Notification';
import ContextMenu from './ContextMenu';
import SplashScreen from './SplashScreen';
import syncSvc from '../services/syncSvc';
import networkSvc from '../services/networkSvc';
import sponsorSvc from '../services/sponsorSvc';
import tempFileSvc from '../services/tempFileSvc';
import timeSvc from '../services/timeSvc';
import store from '../store';

// Global directives
Vue.directive('focus', {
  inserted(el) {
    el.focus();
    const value = el.value;
    if (value && el.setSelectionRange) {
      el.setSelectionRange(0, value.length);
    }
  },
});

const setVisible = (el, value) => {
  el.style.display = value ? '' : 'none';
  if (value) {
    el.removeAttribute('aria-hidden');
  } else {
    el.setAttribute('aria-hidden', 'true');
  }
};
Vue.directive('show', {
  bind(el, { value }) {
    setVisible(el, value);
  },
  update(el, { value, oldValue }) {
    if (value !== oldValue) {
      setVisible(el, value);
    }
  },
});

Vue.directive('title', {
  bind(el, { value }) {
    el.title = value;
    el.setAttribute('aria-label', value);
  },
});

// Global filters
Vue.filter('formatTime', time =>
  // Access the minute counter for reactive refresh
  timeSvc.format(time, store.state.minuteCounter));

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
    showModal() {
      return !!this.$store.getters['modal/config'];
    },
  },
  created() {
    syncSvc.init()
      .then(() => {
        networkSvc.init();
        sponsorSvc.init();
        this.ready = true;
        tempFileSvc.setReady();
      })
      .catch((err) => {
        if (err && err.message !== 'reload') {
          console.error(err); // eslint-disable-line no-console
          this.$store.dispatch('notification/error', err);
        }
      });
  },
};
</script>

<style lang="scss">
@import 'common/app';
</style>
