import cledit from '../../libs/cledit';
import editorSvc from '../../services/editorSvc';
import editorEngineSvc from '../../services/editorEngineSvc';
import utils from '../../services/utils';

let savedSelection;
const nextTickCbs = [];
const nextTickExecCbs = cledit.Utils.debounce(() => {
  while (nextTickCbs.length) {
    nextTickCbs.shift()();
  }
  if (savedSelection) {
    editorEngineSvc.clEditor.selectionMgr.setSelectionStartEnd(
      savedSelection.start, savedSelection.end);
  }
  savedSelection = null;
});

const nextTick = (cb) => {
  nextTickCbs.push(cb);
  nextTickExecCbs();
};

const nextTickRestoreSelection = () => {
  savedSelection = {
    start: editorEngineSvc.clEditor.selectionMgr.selectionStart,
    end: editorEngineSvc.clEditor.selectionMgr.selectionEnd,
  };
  nextTickExecCbs();
};

export default class EditorClassApplier {
  constructor(classGetter, offsetGetter, properties) {
    this.classGetter = typeof classGetter === 'function' ? classGetter : () => classGetter;
    this.offsetGetter = typeof offsetGetter === 'function' ? offsetGetter : () => offsetGetter;
    this.properties = properties || {};
    this.eltCollection = editorSvc.editorElt.getElementsByClassName(this.classGetter()[0]);
    this.lastEltCount = this.eltCollection.length;

    this.restoreClass = () => {
      if (!this.eltCollection.length || this.eltCollection.length !== this.lastEltCount) {
        this.removeClass();
        this.applyClass();
      }
    };

    editorEngineSvc.clEditor.on('contentChanged', this.restoreClass);
    nextTick(() => this.applyClass());
  }

  applyClass() {
    const offset = this.offsetGetter();
    if (offset && offset.start !== offset.end) {
      const range = editorEngineSvc.clEditor.selectionMgr.createRange(
        Math.min(offset.start, offset.end),
        Math.max(offset.start, offset.end),
      );
      const properties = {
        ...this.properties,
        className: this.classGetter().join(' '),
      };
      editorEngineSvc.clEditor.watcher.noWatch(() => {
        utils.wrapRange(range, properties);
      });
      if (editorEngineSvc.clEditor.selectionMgr.hasFocus()) {
        nextTickRestoreSelection();
      }
      this.lastEltCount = this.eltCollection.length;
    }
  }

  removeClass() {
    editorEngineSvc.clEditor.watcher.noWatch(() => {
      utils.unwrapRange(this.eltCollection);
    });
    if (editorEngineSvc.clEditor.selectionMgr.hasFocus()) {
      nextTickRestoreSelection();
    }
  }

  stop() {
    editorEngineSvc.clEditor.off('contentChanged', this.restoreClass);
    nextTick(() => this.removeClass());
  }
}
