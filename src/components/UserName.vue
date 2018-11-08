<template>
  <span class="user-name">{{name}}</span>
</template>

<script>
import userSvc from '../services/userSvc';
import store from '../store';

export default {
  props: ['userId'],
  computed: {
    name() {
      const userInfo = store.state.userInfo.itemsById[this.userId];
      return userInfo ? userInfo.name : 'Someone';
    },
  },
  watch: {
    userId: {
      handler: userId => userSvc.getInfo(userId),
      immediate: true,
    },
  },
};
</script>
