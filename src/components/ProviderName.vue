<template>
  <span class="provider-name">{{name}}</span>
</template>

<script>
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
};
</script>
