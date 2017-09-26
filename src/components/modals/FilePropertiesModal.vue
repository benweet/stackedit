<template>
  <div class="modal__inner-1 modal__inner-1--file-properties">
    <div class="modal__inner-2">
      <div class="tabs flex flex--row">
        <div class="tabs__tab flex flex--column flex--center" :class="{'tabs__tab--active': tab === 'custom'}" @click="tab = 'custom'">
          Current file properties
        </div>
        <div class="tabs__tab flex flex--column flex--center" :class="{'tabs__tab--active': tab === 'default'}" @click="tab = 'default'">
          Default properties
        </div>
      </div>
      <div class="form-entry">
        <label class="form-entry__label">YAML</label>
        <div class="form-entry__field">
          <code-editor v-if="tab === 'custom'" lang="yaml" :value="customProperties" key="custom-properties" @changed="setCustomProperties"></code-editor>
          <code-editor v-else lang="yaml" :value="defaultProperties" disabled="true" key="default-properties"></code-editor>
        </div>
      </div>
      <div class="modal__error modal__error--file-properties">{{error}}</div>
      <div class="modal__button-bar">
        <button class="button" @click="config.reject()">Cancel</button>
        <button class="button" @click="resolve()">Ok</button>
      </div>
    </div>
  </div>
</template>

<script>
import yaml from 'js-yaml';
import { mapGetters } from 'vuex';
import CodeEditor from '../CodeEditor';
import defaultProperties from '../../data/defaultFileProperties.yml';

const emptyProperties = '# Add custom properties for the current file here to override the default properties.\n';

export default {
  components: {
    CodeEditor,
  },
  data: () => ({
    contentId: null,
    tab: 'custom',
    defaultProperties,
    customProperties: null,
    error: null,
  }),
  computed: {
    ...mapGetters('modal', [
      'config',
    ]),
    strippedCustomProperties() {
      return this.customProperties === emptyProperties ? '\n' : this.customProperties.replace(/\t/g, '  ');
    },
  },
  created() {
    const content = this.$store.getters['content/current'];
    this.contentId = content.id;
    const properties = content.properties;
    this.setCustomProperties(properties === '\n' ? emptyProperties : properties);
  },
  methods: {
    setCustomProperties(value) {
      this.customProperties = value;
      try {
        yaml.safeLoad(this.strippedCustomProperties);
        this.error = null;
      } catch (e) {
        this.error = e.message;
      }
    },
    resolve() {
      if (!this.error) {
        this.$store.commit('content/patchItem', {
          id: this.contentId,
          properties: this.strippedCustomProperties,
        });
        this.config.resolve();
      }
    },
  },
};
</script>

<style lang="scss">
@import '../common/variables.scss';

.modal__inner-1--file-properties {
  max-width: 600px;
}

.modal__error--file-properties {
  white-space: pre-wrap;
  font-family: $font-family-monospace;
  font-size: $font-size-monospace;
}
</style>
