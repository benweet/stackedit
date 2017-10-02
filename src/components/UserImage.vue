<template>
  <div class="user-image" :style="{'background-image': url}">
  </div>
</template>

<script>
import googleHelper from '../services/providers/helpers/googleHelper';

const promised = {};

export default {
  props: ['userId'],
  computed: {
    url() {
      const userInfo = this.$store.state.userInfo.itemMap[this.userId];
      return userInfo && `url('${userInfo.imageUrl}')`;
    },
  },
  created() {
    if (!promised[this.userId] && !this.$store.state.offline) {
      promised[this.userId] = true;
      googleHelper.getUser(this.userId)
        .catch(() => {
          promised[this.userId] = false;
        });
    }
  },
};
</script>

<style lang="scss">
.user-image {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
</style>
