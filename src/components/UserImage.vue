<template>
  <div class="user-image" :style="{backgroundImage: url}">
  </div>
</template>

<script>
import userSvc from '../services/userSvc';
import store from '../store';

export default {
  props: ['userId'],
  computed: {
    url() {
      const userInfo = store.state.userInfo.itemsById[this.userId];
      return userInfo && userInfo.imageUrl && `url('${userInfo.imageUrl}')`;
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
