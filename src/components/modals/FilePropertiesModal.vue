<template>
  <modal-inner class="modal__inner-1--file-properties" aria-label="File properties">
    <div class="modal__content">
      <div class="tabs flex flex--row">
        <tab :active="tab === 'simple'" @click="setSimpleTab()">
          Simple properties
        </tab>
        <tab :active="tab === 'yaml'" @click="setYamlTab()">
          YAML properties
        </tab>
      </div>
      <div v-if="tab === 'simple'">
        <div class="modal__title">Extensions</div>
        <div class="modal__sub-title">Configure the Markdown engine.</div>
        <form-entry label="Preset">
          <select slot="field" class="textfield" v-model="preset" @keydown.enter="resolve()">
            <option v-for="(preset, id) in presets" :key="id" :value="preset">
              {{ preset }}
            </option>
          </select>
        </form-entry>
        <div class="modal__title">Metadata</div>
        <div class="modal__sub-title">Add info to your publications (Wordpress, Blogger...).</div>
        <form-entry label="Title">
          <input slot="field" class="textfield" type="text" v-model.trim="title" @keydown.enter="resolve()">
        </form-entry>
        <form-entry label="Author">
          <input slot="field" class="textfield" type="text" v-model.trim="author" @keydown.enter="resolve()">
        </form-entry>
        <form-entry label="Tags" info="comma-separated">
          <input slot="field" class="textfield" type="text" v-model.trim="tags" @keydown.enter="resolve()">
        </form-entry>
        <form-entry label="Categories" info="comma-separated">
          <input slot="field" class="textfield" type="text" v-model.trim="categories" @keydown.enter="resolve()">
        </form-entry>
        <form-entry label="Excerpt">
          <input slot="field" class="textfield" type="text" v-model.trim="excerpt" @keydown.enter="resolve()">
        </form-entry>
        <form-entry label="Featured image">
          <input slot="field" class="textfield" type="text" v-model.trim="featuredImage" @keydown.enter="resolve()">
        </form-entry>
        <form-entry label="Status">
          <input slot="field" class="textfield" type="text" v-model.trim="status" @keydown.enter="resolve()">
          <div class="form-entry__info">
            <b>Example:</b> draft
          </div>
        </form-entry>
        <form-entry label="Date" info="YYYY-MM-DD">
          <input slot="field" class="textfield" type="text" v-model.trim="date" @keydown.enter="resolve()">
        </form-entry>
      </div>
      <div v-if="tab === 'yaml'">
        <div class="form-entry" role="tabpanel" aria-label="YAML properties">
          <label class="form-entry__label">YAML</label>
          <div class="form-entry__field">
            <code-editor lang="yaml" :value="yamlProperties" key="custom-properties" @changed="setYamlProperties"></code-editor>
          </div>
        </div>
        <div class="modal__error modal__error--file-properties">{{error}}</div>
        <div class="modal__info modal__info--multiline">
          <p><strong>ProTip:</strong> You can manually toggle extensions:</p>
          <pre class=" language-yaml"><code class="prism  language-yaml"><span class="token key atrule">extensions</span><span class="token punctuation">:</span>
  <span class="token key atrule">emoji</span><span class="token punctuation">:</span>
    <span class="token comment"># Enable emoji shortcuts like :) :-(</span>
    <span class="token key atrule">shortcuts</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
</code></pre>
          <p>Use preset <code>zero</code> to make your own configuration:</p>
          <pre class=" language-yaml"><code class="prism  language-yaml"><span class="token key atrule">extensions</span><span class="token punctuation">:</span>
  <span class="token key atrule">preset</span><span class="token punctuation">:</span> zero
  <span class="token key atrule">markdown</span><span class="token punctuation">:</span>
    <span class="token key atrule">table</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token key atrule">katex</span><span class="token punctuation">:</span>
    <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
</code></pre>
          <p>For the full list of options, see <a href="https://github.com/benweet/stackedit/blob/master/src/data/presets.js" target="_blank">here</a>.</p>
        </div>
      </div>
    </div>
    <div class="modal__button-bar">
      <button class="button" @click="config.reject()">Cancel</button>
      <button class="button button--resolve" @click="resolve()">Ok</button>
    </div>
  </modal-inner>
</template>

<script>
import yaml from 'js-yaml';
import { mapGetters } from 'vuex';
import ModalInner from './common/ModalInner';
import Tab from './common/Tab';
import FormEntry from './common/FormEntry';
import CodeEditor from '../CodeEditor';
import utils from '../../services/utils';
import presets from '../../data/presets';
import store from '../../store';
import badgeSvc from '../../services/badgeSvc';

const metadataProperties = {
  title: '',
  author: '',
  tags: '',
  categories: '',
  excerpt: '',
  featuredImage: '',
  status: '',
  date: '',
};

export default {
  components: {
    ModalInner,
    Tab,
    FormEntry,
    CodeEditor,
  },
  data: () => ({
    contentId: null,
    yamlProperties: null,
    preset: '',
    error: null,
    ...metadataProperties,
  }),
  computed: {
    ...mapGetters('modal', [
      'config',
    ]),
    presets: () => Object.keys(presets).sort(),
    tab: {
      get() {
        return store.getters['data/localSettings'].filePropertiesTab;
      },
      set(value) {
        store.dispatch('data/patchLocalSettings', {
          filePropertiesTab: value,
        });
      },
    },
  },
  created() {
    const content = store.getters['content/current'];
    this.contentId = content.id;
    this.setYamlProperties(content.properties);
    if (this.tab !== 'yaml') {
      this.setSimpleTab();
    }
  },
  methods: {
    yamlToSimple() {
      const properties = this.properties || {};
      const extensions = properties.extensions || {};
      this.preset = extensions.preset;
      if (!this.presets.includes(this.preset)) {
        this.preset = 'default';
      }
      Object.keys(metadataProperties).forEach((name) => {
        this[name] = `${properties[name] || ''}`;
      });
    },
    simpleToYaml() {
      let hasChanged = false;
      const properties = this.properties || {};
      const extensions = properties.extensions || {};
      if (this.preset !== extensions.preset) {
        if (this.preset !== 'default') {
          extensions.preset = this.preset;
          hasChanged = true;
        } else if (extensions.preset) {
          delete extensions.preset;
          hasChanged = true;
        }
      }
      Object.keys(metadataProperties).forEach((name) => {
        if (this[name] !== properties[name]) {
          if (this[name]) {
            properties[name] = this[name];
            hasChanged = true;
          } else if (properties[name]) {
            delete properties[name];
            hasChanged = true;
          }
        }
      });
      if (hasChanged) {
        if (Object.keys(extensions).length) {
          properties.extensions = extensions;
        } else {
          delete properties.extensions;
        }
        this.setYamlProperties(Object.keys(properties).length
          ? yaml.safeDump(properties)
          : '\n');
      }
    },
    setSimpleTab() {
      this.tab = 'simple';
      this.yamlToSimple();
    },
    setYamlTab() {
      this.tab = 'yaml';
      this.simpleToYaml();
    },
    setYamlProperties(value) {
      this.yamlProperties = value;
      try {
        this.properties = yaml.safeLoad(value);
        this.error = null;
      } catch (e) {
        this.error = e.message;
      }
    },
    resolve() {
      if (this.tab === 'simple') {
        // Compute YAML properties
        this.simpleToYaml();
      }
      if (this.error) {
        this.setYamlTab();
      } else {
        const properties = this.properties || {};
        if (Object.keys(metadataProperties).some(key => properties[key])) {
          badgeSvc.addBadge('setMetadata');
        }
        const extensions = properties.extensions || {};
        if (extensions.preset) {
          badgeSvc.addBadge('changePreset');
        }
        if (Object.keys(extensions).filter(key => key !== 'preset').length) {
          badgeSvc.addBadge('changeExtension');
        }
        store.commit('content/patchItem', {
          id: this.contentId,
          properties: utils.sanitizeText(this.yamlProperties),
        });
        this.config.resolve();
      }
    },
  },
};
</script>

<style lang="scss">
@import '../../styles/variables.scss';

.modal__inner-1.modal__inner-1--file-properties {
  max-width: 520px;
}

.modal__error--file-properties {
  white-space: pre-wrap;
  font-family: $font-family-monospace;
  font-size: $font-size-monospace;
}
</style>
