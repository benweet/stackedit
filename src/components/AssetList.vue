<template>
  <div class="asset__list">
    <ul>
      <li v-for="item in assetList">
        {{ item.Key }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
  name: 'asset-list',
  props: ['assetList'],
  components: {

  },
  computed: {
    ...mapGetters('assets', ['assetList']),
  },
  methods: {
    getAssets() {
      axios({ method: 'get', url: '/assets' })
      .then((result) => {
        this.$store.commit('assets/setAssetList', result.data);
      }, (error) => {
        console.error(error);
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
}

ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 12px;
}

li {
  padding: 0 1em;
}

</style>
