<template>
  <splash-screen v-if="!ready"></splash-screen>
  <div v-else class="app">
    <layout></layout>
    <modal v-if="showModal"></modal>
    <notification></notification>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapState } from 'vuex';
import Layout from './Layout';
import Modal from './Modal';
import Notification from './Notification';
import SplashScreen from './SplashScreen';

// Global directives
Vue.directive('focus', {
  inserted(el) {
    el.focus();
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

export default {
  components: {
    Layout,
    Modal,
    Notification,
    SplashScreen,
  },
  computed: {
    ...mapState([
      'ready',
    ]),
    showModal() {
      return !!this.$store.getters['modal/config'];
    },
  },
};
</script>

<style lang="scss">
@import 'common/app';
</style>
