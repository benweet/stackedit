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

  methods: {
    startVideoAtTime(videoUrl, time) {
      alert(videoUrl, time);
    },
  },

};
</script>

<style lang="scss">
.drasl { display: block; }
</style>
