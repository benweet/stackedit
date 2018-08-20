import DiffMatchPatch from 'diff-match-patch';
import cledit from './cleditCore';

function UndoMgr(editor) {
  cledit.Utils.createEventHooks(this);

  /* eslint-disable new-cap */
  const diffMatchPatch = new DiffMatchPatch();
  /* eslint-enable new-cap */

  const self = this;
  let selectionMgr;
  const undoStack = [];
  const redoStack = [];
  let currentState;
  let previousPatches = [];
  let currentPatches = [];
  const { debounce } = cledit.Utils;

  this.options = {
    undoStackMaxSize: 200,
    bufferStateUntilIdle: 1000,
    patchHandler: {
      makePatches(oldContent, newContent, diffs) {
        return diffMatchPatch.patch_make(oldContent, diffs);
      },
      applyPatches(patches, content) {
        return diffMatchPatch.patch_apply(patches, content)[0];
      },
      reversePatches(patches) {
        const reversedPatches = diffMatchPatch.patch_deepCopy(patches).reverse();
        reversedPatches.cl_each((patch) => {
          patch.diffs.cl_each((diff) => {
            diff[0] = -diff[0];
          });
        });
        return reversedPatches;
      },
    },
  };

  let stateMgr;
  function StateMgr() {
    let currentTime;
    let lastTime;
    let lastMode;

    this.isBufferState = () => {
      currentTime = Date.now();
      return this.currentMode !== 'single' &&
        this.currentMode === lastMode &&
        currentTime - lastTime < self.options.bufferStateUntilIdle;
    };

    this.setDefaultMode = (mode) => {
      this.currentMode = this.currentMode || mode;
    };

    this.resetMode = () => {
      stateMgr.currentMode = undefined;
      lastMode = undefined;
    };

    this.saveMode = () => {
      lastMode = this.currentMode;
      this.currentMode = undefined;
      lastTime = currentTime;
    };
  }

  class State {
    addToUndoStack() {
      undoStack.push(this);
      this.patches = previousPatches;
      previousPatches = [];
    }
    addToRedoStack() {
      redoStack.push(this);
      this.patches = previousPatches;
      previousPatches = [];
    }
  }

  stateMgr = new StateMgr();
  this.setCurrentMode = (mode) => {
    stateMgr.currentMode = mode;
  };
  this.setDefaultMode = stateMgr.setDefaultMode.cl_bind(stateMgr);

  this.addDiffs = (oldContent, newContent, diffs) => {
    const patches = this.options.patchHandler.makePatches(oldContent, newContent, diffs);
    patches.cl_each(patch => currentPatches.push(patch));
  };

  function saveCurrentPatches() {
    // Move currentPatches into previousPatches
    Array.prototype.push.apply(previousPatches, currentPatches);
    currentPatches = [];
  }

  this.saveState = debounce(() => {
    redoStack.length = 0;
    if (!stateMgr.isBufferState()) {
      currentState.addToUndoStack();

      // Limit the size of the stack
      while (undoStack.length > this.options.undoStackMaxSize) {
        undoStack.shift();
      }
    }
    saveCurrentPatches();
    currentState = new State();
    stateMgr.saveMode();
    this.$trigger('undoStateChange');
  });

  this.canUndo = () => !!undoStack.length;
  this.canRedo = () => !!redoStack.length;

  const restoreState = (patchesParam, isForward) => {
    let patches = patchesParam;
    // Update editor
    const content = editor.getContent();
    if (!isForward) {
      patches = this.options.patchHandler.reversePatches(patches);
    }

    const newContent = this.options.patchHandler.applyPatches(patches, content);
    const newContentText = newContent.text || newContent;
    const range = editor.setContent(newContentText, true);
    const selection = newContent.selection || {
      start: range.end,
      end: range.end,
    };

    selectionMgr.setSelectionStartEnd(selection.start, selection.end);
    selectionMgr.updateCursorCoordinates(true);

    stateMgr.resetMode();
    this.$trigger('undoStateChange');
    editor.adjustCursorPosition();
  };

  this.undo = () => {
    const state = undoStack.pop();
    if (!state) {
      return;
    }
    saveCurrentPatches();
    currentState.addToRedoStack();
    restoreState(currentState.patches);
    previousPatches = state.patches;
    currentState = state;
  };

  this.redo = () => {
    const state = redoStack.pop();
    if (!state) {
      return;
    }
    currentState.addToUndoStack();
    restoreState(state.patches, true);
    previousPatches = state.patches;
    currentState = state;
  };

  this.init = (options) => {
    this.options.cl_extend(options || {});
    ({ selectionMgr } = editor);
    if (!currentState) {
      currentState = new State();
    }
  };
}

cledit.UndoMgr = UndoMgr;
