<template>
  <video-player
    ref="videoPlayer"></video-player>
</template>
<script>
import { videoPlayer } from 'vue-video-player';

export default {
  name: 'video-preview',
  props: ['videoUrl', 'time'],
  components: {
    videoPlayer,
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    },
  },
  methods: {
    startVideoAtTime(videoUrl, time) {
      this.playerOptions.sources = [{
        type: 'application/x-mpegurl',
        src: videoUrl,
      },
      ];
      if (time) {
        this.player.seconds(time);
      }
    },
  },
};
</script>

<style lang="scss">
.drasl { display: block; }
</style>
