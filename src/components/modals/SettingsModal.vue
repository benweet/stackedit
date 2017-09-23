<template>
  <div class="modal__inner-1 modal__inner-1--settings">
    <div class="modal__inner-2">
      <div class="tabs flex flex--row">
        <div class="tabs__tab flex flex--column flex--center" :class="{'tabs__tab--active': tab === 'custom'}" @click="tab = 'custom'">
          Custom settings
        </div>
        <div class="tabs__tab flex flex--column flex--center" :class="{'tabs__tab--active': tab === 'default'}" @click="tab = 'default'">
          Default settings
        </div>
      </div>
      <div class="form-entry">
        <label class="form-entry__label">YAML</label>
        <div class="form-entry__field">
          <code-editor v-if="tab === 'custom'" lang="yaml" :value="customSettings" key="custom-settings" @changed="setCustomSettings"></code-editor>
          <code-editor v-else lang="yaml" :value="defaultSettings" disabled="true" key="default-settings"></code-editor>
        </div>
      </div>
      <div class="modal__error modal__error--settings">{{error}}</div>
      <div class="modal__button-bar">
        <button class="button" @click="config.reject()">Cancel</button>
        <button class="button" @click="!error && config.resolve(strippedCustomSettings)">Ok</button>
      </div>
    </div>
  </div>
</template>

<script>
import yaml from 'js-yaml';
import { mapGetters } from 'vuex';
import CodeEditor from '../CodeEditor';
import defaultSettings from '../../data/defaultSettings.yml';

const emptySettings = '# Add your custom settings here to override the default settings.\n';

export default {
  components: {
    CodeEditor,
  },
  data: () => ({
    tab: 'custom',
    defaultSettings,
    customSettings: null,
    error: null,
  }),
  computed: {
    ...mapGetters('modal', [
      'config',
    ]),
    strippedCustomSettings() {
      return this.customSettings === emptySettings ? '\n' : this.customSettings.replace(/\t/g, '  ');
    },
  },
  created() {
    const settings = this.$store.getters['data/settings'];
    this.setCustomSettings(settings === '\n' ? emptySettings : settings);
  },
  methods: {
    setCustomSettings(value) {
      this.customSettings = value;
      try {
        yaml.safeLoad(this.strippedCustomSettings);
        this.error = null;
      } catch (e) {
        this.error = e.message;
      }
    },
  },
};
</script>

<style lang="scss">
@import '../common/variables.scss';

.modal__inner-1--settings {
  max-width: 600px;
}

.modal__error--settings {
  white-space: pre-wrap;
  font-family: $font-family-monospace;
  font-size: $font-size-monospace;
}
</style>
