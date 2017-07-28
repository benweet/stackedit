<template>
  <div id="app" class="app" v-bind:class="{'app--loading': loading}">
    <layout></layout>
  </div>
</template>

<script>
import Layout from './Layout';

export default {
  components: {
    Layout,
  },
  computed: {
    loading() {
      return !this.$store.getters['contents/current'].id;
    },
  },
};
</script>

<style lang="scss">
@import 'common/app';
</style>
