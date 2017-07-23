<template>
  <div class="stat-panel panel no-overflow">
    <div class="stat-panel__block stat-panel__block--left">
      <span class="stat-panel__block-name">
        Text
        <small v-show="textSelection">(selection)</small>
      </span>
      <span v-for="stat in textStats" :key="stat.id">
        <span class="stat-panel__value">{{stat.value}}</span> {{stat.name}}
      </span>
    </div>
    <div class="stat-panel__block stat-panel__block--right">
      <span class="stat-panel__block-name">
        HTML
        <small v-show="htmlSelection">(selection)</small>
      </span>
      <span v-for="stat in htmlStats" :key="stat.id">
        <span class="stat-panel__value">{{stat.value}}</span> {{stat.name}}
      </span>
    </div>
  </div>
</template>

<script>
import editorSvc from '../services/editorSvc';
import editorEngineSvc from '../services/editorEngineSvc';
import utils from '../services/utils';

class Stat {
  constructor(name, regex) {
    this.id = utils.uid();
    this.name = name;
    this.regex = new RegExp(regex, 'gm');
    this.value = null;
  }
}

export default {
  data: () => ({
    textSelection: false,
    htmlSelection: false,
    textStats: [
      new Stat('bytes', '[\\s\\S]'),
      new Stat('words', '\\S+'),
      new Stat('lines', '\n'),
    ],
    htmlStats: [
      new Stat('characters', '\\S'),
      new Stat('words', '\\S+'),
      new Stat('paragraphs', '\\S.*'),
    ],
  }),
  created() {
    editorSvc.$on('sectionList', () => this.computeText());
    editorSvc.$on('selectionRange', () => this.computeText());
    editorSvc.$on('previewText', () => this.computeHtml());
    editorSvc.$on('previewSelectionRange', () => this.computeHtml());
  },

  methods: {
    computeText() {
      this.textSelection = false;
      let text = editorEngineSvc.clEditor.getContent();
      const selectedText = editorEngineSvc.clEditor.selectionMgr.getSelectedText();
      if (selectedText) {
        this.textSelection = true;
        text = selectedText;
      }
      this.textStats.forEach((stat) => {
        stat.value = (text.match(stat.regex) || []).length;
      });
    },
    computeHtml() {
      let text;
      if (editorSvc.previewSelectionRange) {
        text = editorSvc.previewSelectionRange.toString();
      }
      this.htmlSelection = true;
      if (!text) {
        this.htmlSelection = false;
        text = editorSvc.previewText;
      }
      if (text !== undefined) {
        this.htmlStats.cl_each((stat) => {
          stat.value = (text.match(stat.regex) || []).length;
        });
      }
    },
  },
};
</script>

<style lang="scss">
.stat-panel {
  position: absolute;
  width: 100%;
  height: 100%;
  color: rgba(0, 0, 0, 0.75);
  font-size: 12.5px;
}

.stat-panel__block {
  margin: 2px;
}

.stat-panel__block--left {
  float: left;
}

.stat-panel__block--right {
  float: right;
}

.stat-panel__block-name {
  font-weight: 500;
  margin: 0 10px;
}

.stat-panel__value {
  font-weight: 500;
}
</style>
