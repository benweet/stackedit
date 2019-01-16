<template>
  <video
    ref="videoPlayer"
    :controls="true"
    :playsinline="true"
    ></video>
</template>
<script>

import Hls from "Hls.js";

export default {
  name: 'video-preview',
  mounted() {

    if(Hls.isSupported()) {
      this.hls = new Hls();
      console.log("we're HLSing!");
      this.hls.loadSource(this.src);
      this.hls.attachMedia(this.$refs.videoPlayer);
    }

    this.$root.$on('play_video', (url) => {
      this.src = url;
    });
  },
  watch: {
    src: {
      handler(val) {
        this.hls.loadSource(val);
        this.hls.attachMedia(this.$refs.videoPlayer);
        this.$refs.videoPlayer.play();
      }
    }
  },
  data() {
    return {
      src: 'https://menntamalastofnun-vod.s3.amazonaws.com/assets/komdu_og_skodadu_bilinn/be500ce1-8dc9-4dbf-a2b9-7e847a718180/HLS/06_2.m3u8',
      hls: undefined,
    };
  },
};
</script>

<style lang="scss">
.drasl { display: block; }
</style>
