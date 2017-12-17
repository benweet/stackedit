<template>
  <span class="provider-name">{{name}}</span>
</template>

<script>
import userSvc from '../services/userSvc';

export default {
  props: ['providerId'],
  computed: {
    name() {
      switch (this.userId) {
        default:
          return 'Google Drive';
      }
    },
  },
  created() {
    userSvc.getInfo(this.userId);
  },
};
</script>
