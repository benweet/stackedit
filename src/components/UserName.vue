<template>
  <span class="user-name">{{name}}</span>
</template>

<script>
import userSvc from '../services/userSvc';

export default {
  props: ['userId'],
  computed: {
    name() {
      const userInfo = this.$store.state.userInfo.itemMap[this.userId];
      return userInfo ? userInfo.name : 'Someone';
    },
  },
  created() {
    userSvc.getInfo(this.userId);
  },
};
</script>
