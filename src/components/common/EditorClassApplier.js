import cledit from '../../services/editor/cledit';
import editorSvc from '../../services/editorSvc';
import utils from '../../services/utils';

let savedSelection = null;
const nextTickCbs = [];
const nextTickExecCbs = cledit.Utils.debounce(() => {
  while (nextTickCbs.length) {
    nextTickCbs.shift()();
  }
  if (savedSelection) {
    editorSvc.clEditor.selectionMgr.setSelectionStartEnd(
      savedSelection.start,
      savedSelection.end,
    );
  }
  savedSelection = null;
});

const nextTick = (cb) => {
  nextTickCbs.push(cb);
  nextTickExecCbs();
};

const nextTickRestoreSelection = () => {
  savedSelection = {
    start: editorSvc.clEditor.selectionMgr.selectionStart,
    end: editorSvc.clEditor.selectionMgr.selectionEnd,
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

    editorSvc.clEditor.on('contentChanged', this.restoreClass);
    nextTick(() => this.restoreClass());
  }

  applyClass() {
    if (!this.stopped) {
      const offset = this.offsetGetter();
      if (offset && offset.start !== offset.end) {
        const range = editorSvc.clEditor.selectionMgr.createRange(
          Math.min(offset.start, offset.end),
          Math.max(offset.start, offset.end),
        );
        const properties = {
          ...this.properties,
          className: this.classGetter().join(' '),
        };
        editorSvc.clEditor.watcher.noWatch(() => {
          utils.wrapRange(range, properties);
        });
        if (editorSvc.clEditor.selectionMgr.hasFocus()) {
          nextTickRestoreSelection();
        }
        this.lastEltCount = this.eltCollection.length;
      }
    }
  }

  removeClass() {
    editorSvc.clEditor.watcher.noWatch(() => {
      utils.unwrapRange(this.eltCollection);
    });
    if (editorSvc.clEditor.selectionMgr.hasFocus()) {
      nextTickRestoreSelection();
    }
  }

  stop() {
    editorSvc.clEditor.off('contentChanged', this.restoreClass);
    nextTick(() => this.removeClass());
    this.stopped = true;
  }
}
