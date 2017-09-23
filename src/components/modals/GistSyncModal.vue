<template>
  <div class="modal__inner-1 modal__inner-1--google-drive-sync">
    <div class="modal__inner-2">
      <div class="modal__image">
        <icon-provider provider-id="gist"></icon-provider>
      </div>
      <p>This will save <b>{{currentFileName}}</b> to a <b>Gist</b> repository and keep it synchronized.</p>
      <div class="form-entry">
        <label class="form-entry__label" for="filename">Filename</label>
        <div class="form-entry__field">
          <input id="filename" type="text" class="textfield" v-model.trim="filename" @keyup.enter="resolve()">
        </div>
      </div>
      <div class="form-entry">
        <div class="form-entry__checkbox">
          <label>
            <input type="checkbox" v-model="isPublic"> Public
          </label>
        </div>
      </div>
      <div class="form-entry">
        <label class="form-entry__label" for="gistId">Gist ID (optional)</label>
        <div class="form-entry__field">
          <input id="gistId" type="text" class="textfield" v-model.trim="gistId" @keyup.enter="resolve()">
        </div>
        <div class="form-entry__info">
          If the file exists in the provided Gist, it will be replaced.
        </div>
      </div>
      <div class="modal__button-bar">
        <button class="button" @click="config.reject()">Cancel</button>
        <button class="button" @click="resolve()">Ok</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import gistProvider from '../../services/providers/gistProvider';
import store from '../../store';

const computedLocalSetting = id => ({
  get() {
    return store.getters['data/localSettings'][id];
  },
  set(value) {
    store.dispatch('data/patchLocalSettings', {
      [id]: value,
    });
  },
});

export default {
  data: () => ({
    filename: '',
    gistId: '',
  }),
  computed: {
    ...mapGetters('modal', [
      'config',
    ]),
    currentFileName() {
      return this.$store.getters['file/current'].name;
    },
    isPublic: computedLocalSetting('gistIsPublic'),
  },
  created() {
    this.filename = `${this.currentFileName}.md`;
  },
  methods: {
    resolve() {
      if (this.filename) {
        // Return new location
        const location = gistProvider.makeLocation(
          this.config.token, this.filename, this.isPublic, this.gistId);
        this.config.resolve(location);
      }
    },
  },
};
</script>
