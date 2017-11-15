import cledit from '../../libs/cledit';
import editorSvc from '../../services/editorSvc';
import utils from '../../services/utils';

const nextTickCbs = [];
const nextTickExecCbs = cledit.Utils.debounce(() => {
  while (nextTickCbs.length) {
    nextTickCbs.shift()();
  }
});

const nextTick = (cb) => {
  nextTickCbs.push(cb);
  nextTickExecCbs();
};

export default class PreviewClassApplier {
  constructor(classGetter, offsetGetter, properties) {
    this.classGetter = typeof classGetter === 'function' ? classGetter : () => classGetter;
    this.offsetGetter = typeof offsetGetter === 'function' ? offsetGetter : () => offsetGetter;
    this.properties = properties || {};
    this.eltCollection = editorSvc.previewElt.getElementsByClassName(this.classGetter()[0]);
    this.lastEltCount = this.eltCollection.length;

    this.restoreClass = () => {
      if (!editorSvc.sectionDescWithDiffsList) {
        this.removeClass();
      } else if (!this.eltCollection.length || this.eltCollection.length !== this.lastEltCount) {
        this.removeClass();
        this.applyClass();
      }
    };

    editorSvc.$on('previewHtml', this.restoreClass);
    editorSvc.$on('sectionDescWithDiffsList', this.restoreClass);
    nextTick(() => this.applyClass());
  }

  applyClass() {
    const offset = this.offsetGetter();
    if (offset && offset.start !== offset.end) {
      const start = cledit.Utils.findContainer(
        editorSvc.previewElt, Math.min(offset.start, offset.end));
      const end = cledit.Utils.findContainer(
        editorSvc.previewElt, Math.max(offset.start, offset.end));
      const range = document.createRange();
      range.setStart(start.container, start.offsetInContainer);
      range.setEnd(end.container, end.offsetInContainer);
      const properties = {
        ...this.properties,
        className: this.classGetter().join(' '),
      };
      utils.wrapRange(range, properties);
      this.lastEltCount = this.eltCollection.length;
    }
  }

  removeClass() {
    utils.unwrapRange(this.eltCollection);
  }

  stop() {
    editorSvc.$off('previewHtml', this.restoreClass);
    editorSvc.$off('sectionDescWithDiffsList', this.restoreClass);
    nextTick(() => this.removeClass());
  }
}
