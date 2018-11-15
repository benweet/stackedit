<template>
  <video-player
    ref="videoPlayer"
    :options="playerOptions"
    :playsinline="true"
    @canplay="onPlayerCanPlay($event)"
    ></video-player>
</template>
<script>
import { videoPlayer } from 'vue-video-player';

export default {
  name: 'video-preview',
  props: ['videoUrl', 'time'],
  created() {
    this.$root.$on('play_video', (url) => {
      this.videoUrl = url;
      this.time = 0;
    });
  },
  data() {
    return {
      playerOptions: {
        // videojs options
        muted: true,
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [{
          type: 'application/x-mpegurl',
        }],
        fluid: 'true',
      },
    };
  },
  watch: {
    videoUrl: {
      handler(val) {
        this.playerOptions.sources = [{
          type: 'application/x-mpegurl',
          src: val,
        }];
      },
    },
    time: {
      handler(val) {
        this.player.currentTime(val);
      },
    },
  },
  methods: {
    onPlayerCanPlay(player) {
      player.play();
    },
  },
  components: {
    videoPlayer,
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    },
  },
};
</script>

<style lang="scss">
.drasl { display: block; }
</style>
