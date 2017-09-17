<template>
  <div v-if="ready" class="app" :class="{'app--loading': loading}">
    <layout></layout>
    <modal v-if="showModal"></modal>
  </div>
  <div v-else class="app__spash-screen"></div>
</template>

<script>
import Vue from 'vue';
import { mapState } from 'vuex';
import Layout from './Layout';
import Modal from './Modal';

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
  },
  computed: {
    ...mapState([
      'ready',
    ]),
    loading() {
      return !this.$store.getters['content/current'].id;
    },
    showModal() {
      return !!this.$store.state.modal.config;
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
