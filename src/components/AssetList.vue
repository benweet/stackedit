<template>
  <div class="asset__list">
    <ul>
      <li v-for="item in assetList">
        <span @click="(item) => playItem(item)">{{ item.Key }}</span>
        <button class="asset__add" @click="(key) => { addReference( item ) }" v-title="'Add reference'">+</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
import editorSvc from '../services/editorSvc';

export default {
  name: 'asset-list',
  props: ['assetList'],
  components: {

  },
  computed: {
    ...mapGetters('assets', ['assetList']),
  },
  methods: {
    addReference(assetReference) {
      editorSvc.pagedownEditor.uiManager.doAssetReference(this.convertAssetUrl(assetReference.Key));
    },
    convertAssetUrl(input) {
      const urlPrefix = 'https://menntamalastofnun-vod.s3.amazonaws.com/assets/HLS/';
      const escapedSpaces = input.split(' ').join('+');
      const escapedUnderscores = escapedSpaces.split('_').join('\\_');
      const parts = escapedUnderscores.split('.');
      parts[parts.length - 1] = 'm3u8';
      const switchExtension = parts.join('.');
      return urlPrefix + switchExtension;
    },
    playItem(event) {
      const url = this.convertAssetUrl(event.target.innerHTML);
      const urlClean = url.split('\\').join('');
      this.$root.$emit('play_video', urlClean);
    },
    getAssets() {
      axios({ method: 'get', url: '/assets' })
        .then((result) => {
          this.$store.commit('assets/setAssetList', result.data);
        });
    },
  },
  mounted() {
    this.getAssets();
  },
};
</script>

<style lang="scss">
.asset__list {
  border-top: 1px solid #ccc;
  overflow-y: scroll;
  padding: 1em 0;
}

ul,
li {
  list-style: none;
  margin: 0;
  padding: 0 0.5em;
  font-size: 12px;
}

.asset__list ul li span {
  cursor: pointer;
}

li:nth-child(2n) {
  background: rgba(0, 0, 0, 0.05);
}

.asset__add {
  float: right;
  height: 1.5em;
  line-height: 1em;
  padding: 0 0.5em;
  border-radius: 0.5em;
  cursor: pointer;
  border: none;
  background: #fff;
}
</style>
