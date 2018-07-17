<template>
  <span class="user-name">{{name}}</span>
</template>

<script>
import userSvc from '../services/userSvc';

export default {
  props: ['userId'],
  computed: {
    name() {
      userSvc.getInfo(this.userId);
      const userInfo = this.$store.state.userInfo.itemsById[this.userId];
      return userInfo ? userInfo.name : 'Someone';
    },
  },
};
</script>
