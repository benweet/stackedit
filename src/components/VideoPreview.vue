<template>

</template>

<script>
import { mapGetters } from 'vuex';

import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'

export default {
  name: 'video-preview',
  props: ['videoUrl', 'time'],
  components: {
    videoPlayer,
  },
  computed: {
  },
  methods: {
    startVideoAtTime(videoUrl, time) {
      // Do nothing
    },
  },
  mounted() {
  },
};
</script>

<style lang="scss">
.drasl {}
</style>
