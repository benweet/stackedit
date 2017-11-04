<template>
  <modal-inner class="modal__inner-1--file-properties" aria-label="File properties">
    <div class="modal__content">
      <div class="tabs flex flex--row">
        <tab :active="tab === 'custom'" @click="tab = 'custom'">
          Current file properties
        </tab>
        <tab :active="tab === 'default'" @click="tab = 'default'">
          Default properties
        </tab>
      </div>
      <div class="form-entry" v-if="tab === 'custom'" role="tabpanel" aria-label="Current file properties">
        <label class="form-entry__label">YAML</label>
        <div class="form-entry__field">
          <code-editor lang="yaml" :value="customProperties" key="custom-properties" @changed="setCustomProperties"></code-editor>
        </div>
      </div>
      <div class="form-entry" v-else-if="tab === 'default'" role="tabpanel" aria-label="Default properties">
        <label class="form-entry__label">YAML</label>
        <div class="form-entry__field">
          <code-editor lang="yaml" :value="defaultProperties" key="default-properties" disabled="true"></code-editor>
        </div>
      </div>
      <div class="modal__error modal__error--file-properties">{{error}}</div>
    </div>
    <div class="modal__button-bar">
      <button class="button" @click="config.reject()">Cancel</button>
      <button class="button" @click="resolve()">Ok</button>
    </div>
  </modal-inner>
</template>

<script>
import yaml from 'js-yaml';
import { mapGetters } from 'vuex';
import ModalInner from './common/ModalInner';
import Tab from './common/Tab';
import CodeEditor from '../CodeEditor';
import utils from '../../services/utils';
import defaultProperties from '../../data/defaultFileProperties.yml';

const emptyProperties = `# Add custom properties for the current file here
# to override the default properties.
`;

export default {
  components: {
    ModalInner,
    Tab,
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
          properties: utils.sanitizeText(this.strippedCustomProperties),
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
