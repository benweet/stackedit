<template>
  <div class="find-replace" @keydown.esc.stop="onEscape">
    <button class="find-replace__close-button button not-tabbable" @click="close()" v-title="'Close'">
      <icon-close></icon-close>
    </button>
    <div class="find-replace__row">
      <input type="text" class="find-replace__text-input find-replace__text-input--find text-input" @keydown.enter="find('forward')" v-model="findText">
      <div class="find-replace__find-stats">
        {{findPosition}} of {{findCount}}
      </div>
      <div class="flex flex--row flex--space-between">
        <div class="flex flex--row">
          <button class="find-replace__button find-replace__button--find-option button" :class="{'find-replace__button--on': findCaseSensitive}" @click="findCaseSensitive = !findCaseSensitive" title="Case sensitive">Aa</button>
          <button class="find-replace__button find-replace__button--find-option button" :class="{'find-replace__button--on': findUseRegexp}" @click="findUseRegexp = !findUseRegexp" title="Regular expression">.<sup>⁕</sup></button>
        </div>
        <div class="flex flex--row">
          <button class="find-replace__button button" @click="find('backward')">Previous</button>
          <button class="find-replace__button button" @click="find('forward')">Next</button>
        </div>
      </div>
    </div>
    <div v-if="type === 'replace'">
      <div class="find-replace__row">
        <input type="text" class="find-replace__text-input find-replace__text-input--replace text-input" @keydown.enter="replace" v-model="replaceText">
      </div>
      <div class="find-replace__row flex flex--row flex--end">
        <button class="find-replace__button button" @click="replace">Replace</button>
        <button class="find-replace__button button" @click="replaceAll">All</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import editorSvc from '../services/editorSvc';
import cledit from '../services/editor/cledit';
import store from '../store';
import EditorClassApplier from './common/EditorClassApplier';

const accessor = (fieldName, setterName) => ({
  get() {
    return store.state.findReplace[fieldName];
  },
  set(value) {
    store.commit(`findReplace/${setterName}`, value);
  },
});

const computedLayoutSetting = key => ({
  get() {
    return store.getters['data/layoutSettings'][key];
  },
  set(value) {
    store.dispatch('data/patchLayoutSettings', {
      [key]: value,
    });
  },
});

class DynamicClassApplier {
  constructor(cssClass, offset, silent) {
    this.startMarker = new cledit.Marker(offset.start);
    this.endMarker = new cledit.Marker(offset.end);
    editorSvc.clEditor.addMarker(this.startMarker);
    editorSvc.clEditor.addMarker(this.endMarker);
    if (!silent) {
      this.classApplier = new EditorClassApplier(
        [`find-replace-${this.startMarker.id}`, cssClass],
        () => ({
          start: this.startMarker.offset,
          end: this.endMarker.offset,
        }),
      );
    }
  }

  clean = () => {
    editorSvc.clEditor.removeMarker(this.startMarker);
    editorSvc.clEditor.removeMarker(this.endMarker);
    if (this.classApplier) {
      this.classApplier.stop();
    }
  }
}

export default {
  data: () => ({
    findCount: 0,
    findPosition: 0,
  }),
  computed: {
    ...mapState('findReplace', [
      'type',
      'lastOpen',
    ]),
    findText: accessor('findText', 'setFindText'),
    replaceText: accessor('replaceText', 'setReplaceText'),
    findCaseSensitive: computedLayoutSetting('findCaseSensitive'),
    findUseRegexp: computedLayoutSetting('findUseRegexp'),
  },
  methods: {
    highlightOccurrences() {
      const oldClassAppliers = {};
      Object.entries(this.classAppliers).forEach(([, classApplier]) => {
        const newKey = `${classApplier.startMarker.offset}:${classApplier.endMarker.offset}`;
        oldClassAppliers[newKey] = classApplier;
      });
      const offsetList = [];
      this.classAppliers = {};
      if (this.state !== 'destroyed' && this.findText) {
        try {
          this.searchRegex = this.findText;
          if (!this.findUseRegexp) {
            this.searchRegex = this.searchRegex.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');
          }
          this.replaceRegex = new RegExp(this.searchRegex, this.findCaseSensitive ? 'm' : 'mi');
          this.searchRegex = new RegExp(this.searchRegex, this.findCaseSensitive ? 'gm' : 'gmi');
          editorSvc.clEditor.getContent().replace(this.searchRegex, (...params) => {
            const match = params[0];
            const offset = params[params.length - 2];
            offsetList.push({
              start: offset,
              end: offset + match.length,
            });
          });
          offsetList.forEach((offset, i) => {
            const key = `${offset.start}:${offset.end}`;
            this.classAppliers[key] = oldClassAppliers[key] || new DynamicClassApplier(
              'find-replace-highlighting',
              offset,
              i > 200,
            );
          });
        } catch (e) {
          // Ignore
        }
        if (this.state !== 'created') {
          this.find('selection');
          this.state = 'created';
        }
      }
      Object.entries(oldClassAppliers).forEach(([key, classApplier]) => {
        if (!this.classAppliers[key]) {
          classApplier.clean();
          if (classApplier === this.selectedClassApplier) {
            this.selectedClassApplier.child.clean();
            this.selectedClassApplier = null;
          }
        }
      });
      this.findCount = offsetList.length;
    },
    unselectClassApplier() {
      if (this.selectedClassApplier) {
        this.selectedClassApplier.child.clean();
        this.selectedClassApplier.child = null;
        this.selectedClassApplier = null;
      }
      this.findPosition = 0;
    },
    find(mode = 'forward') {
      const { selectedClassApplier } = this;
      this.unselectClassApplier();
      const { selectionMgr } = editorSvc.clEditor;
      const startOffset = Math.min(selectionMgr.selectionStart, selectionMgr.selectionEnd);
      const endOffset = Math.max(selectionMgr.selectionStart, selectionMgr.selectionEnd);
      const keys = Object.keys(this.classAppliers);
      const finder = checker => (key) => {
        if (checker(this.classAppliers[key]) && selectedClassApplier !== this.classAppliers[key]) {
          this.selectedClassApplier = this.classAppliers[key];
          return true;
        }
        return false;
      };
      if (mode === 'backward') {
        this.selectedClassApplier = this.classAppliers[keys[keys.length - 1]];
        keys.reverse().some(finder(classApplier => classApplier.startMarker.offset <= startOffset));
      } else if (mode === 'selection') {
        keys.some(finder(classApplier => classApplier.startMarker.offset === startOffset &&
          classApplier.endMarker.offset === endOffset));
      } else if (mode === 'forward') {
        this.selectedClassApplier = this.classAppliers[keys[0]];
        keys.some(finder(classApplier => classApplier.endMarker.offset >= endOffset));
      }
      if (this.selectedClassApplier) {
        selectionMgr.setSelectionStartEnd(
          this.selectedClassApplier.startMarker.offset,
          this.selectedClassApplier.endMarker.offset,
        );
        this.selectedClassApplier.child = new DynamicClassApplier('find-replace-selection', {
          start: this.selectedClassApplier.startMarker.offset,
          end: this.selectedClassApplier.endMarker.offset,
        });
        selectionMgr.updateCursorCoordinates(this.$el.parentNode.clientHeight);
        // Deduce the findPosition
        Object.keys(this.classAppliers).forEach((key, i) => {
          if (this.selectedClassApplier !== this.classAppliers[key]) {
            return false;
          }
          this.findPosition = i + 1;
          return true;
        });
      }
    },
    replace() {
      if (this.searchRegex) {
        if (!this.selectedClassApplier) {
          this.find();
          return;
        }
        editorSvc.clEditor.replaceAll(
          this.replaceRegex,
          this.replaceText,
          this.selectedClassApplier.startMarker.offset,
        );
        this.$nextTick(() => this.find());
      }
    },
    replaceAll() {
      if (this.searchRegex) {
        editorSvc.clEditor.replaceAll(this.searchRegex, this.replaceText);
      }
    },
    close() {
      store.commit('findReplace/setType');
    },
    onEscape() {
      editorSvc.clEditor.focus();
    },
  },
  mounted() {
    this.classAppliers = {};

    // Highlight occurences
    this.debouncedHighlightOccurrences = cledit.Utils.debounce(
      () => this.highlightOccurrences(),
      25,
    );
    // Refresh highlighting when find text changes or changing options
    this.$watch(() => this.findText, this.debouncedHighlightOccurrences);
    this.$watch(() => this.findCaseSensitive, this.debouncedHighlightOccurrences);
    this.$watch(() => this.findUseRegexp, this.debouncedHighlightOccurrences);
    // Refresh highlighting when content changes
    editorSvc.clEditor.on('contentChanged', this.debouncedHighlightOccurrences);

    // Last open changes trigger focus on text input and find occurence in selection
    this.$watch(() => this.lastOpen, () => {
      const elt = this.$el.querySelector(`.find-replace__text-input--${this.type}`);
      elt.focus();
      elt.setSelectionRange(0, this[`${this.type}Text`].length);
      // Highlight and find in selection
      this.state = null;
      this.debouncedHighlightOccurrences();
    }, {
      immediate: true,
    });

    // Close on escape
    this.onKeyup = (evt) => {
      if (evt.which === 27) {
        // Esc key
        store.commit('findReplace/setType');
      }
    };
    window.addEventListener('keyup', this.onKeyup);

    // Unselect class applier when focus is out of the panel
    this.onFocusIn = () => this.$el.contains(document.activeElement) ||
      setTimeout(() => this.unselectClassApplier(), 15);
    window.addEventListener('focusin', this.onFocusIn);
  },
  destroyed() {
    // Unregister listeners
    editorSvc.clEditor.off('contentChanged', this.debouncedHighlightOccurrences);
    window.removeEventListener('keyup', this.onKeyup);
    window.removeEventListener('focusin', this.onFocusIn);
    this.state = 'destroyed';
    this.debouncedHighlightOccurrences();
  },
};
</script>

<style lang="scss">
@import '../styles/variables.scss';

.find-replace {
  padding: 0 35px 0 25px;
}

.find-replace__row {
  margin: 10px 0;
}

.find-replace__button {
  font-size: 15px;
  padding: 0 8px;
  line-height: 28px;
  height: 28px;
}

.find-replace__button--find-option {
  padding: 0;
  width: 28px;
  font-weight: 600;
  letter-spacing: -0.025em;
  color: rgba(0, 0, 0, 0.25);
  text-transform: none;

  &:active,
  &:focus,
  &:hover {
    color: rgba(0, 0, 0, 0.25);
  }
}

.find-replace__button--on {
  color: rgba(0, 0, 0, 0.67);

  &:active,
  &:focus,
  &:hover {
    color: rgba(0, 0, 0, 0.67);
  }
}

.find-replace__text-input {
  border: 1px solid transparent;
  padding: 2px 5px;
  height: 32px;

  &:focus {
    border-color: $link-color;
  }
}

.find-replace__close-button {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 25px;
  height: 25px;
  padding: 2px;
  color: rgba(0, 0, 0, 0.5);

  &:active,
  &:focus,
  &:hover {
    color: rgba(0, 0, 0, 0.75);
  }
}

.find-replace__find-stats {
  text-align: right;
  font-size: 0.75em;
  opacity: 0.6;
}

.find-replace-highlighting {
  background-color: $highlighting-color;
  color: $editor-color-light !important;
}

.find-replace-selection {
  background-color: $selection-highlighting-color;
}
</style>
