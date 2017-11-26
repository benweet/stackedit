<template>
  <div class="user-image" :style="{backgroundImage: url}">
  </div>
</template>

<script>
import userSvc from '../services/userSvc';

export default {
  props: ['userId'],
  computed: {
    url() {
      const userInfo = this.$store.state.userInfo.itemMap[this.userId];
      return userInfo && userInfo.imageUrl && `url('${userInfo.imageUrl}')`;
    },
  },
  created() {
    userSvc.getInfo(this.userId);
  },
};
</script>

<style lang="scss">
.user-image {
  width: 100%;
  height: 100%;
  background-color: #fff;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
</style>
