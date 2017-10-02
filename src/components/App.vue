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

.app__spash-screen {
  margin: 0 auto;
  max-width: 600px;
  height: 100%;
  background: no-repeat center url('../assets/logo.svg');
  background-size: contain;
}
</style>
