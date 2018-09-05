<template>
  <div class="asset__list">
    <ul>
      <li v-for="item in assetList">
        {{ item.Key }}
        <button class="asset__add" @click="(key) => { addReference( item.Key ) }" v-title="'Add reference'">+</button>
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
    addReference(referenceKey) {
      editorSvc.pagedownEditor.uiManager.doAssetReference(referenceKey);
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
