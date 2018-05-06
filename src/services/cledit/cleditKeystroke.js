import cledit from './cleditCore';

function Keystroke(handler, priority) {
  this.handler = handler;
  this.priority = priority || 100;
}

cledit.Keystroke = Keystroke;

let clearNewline;
const charTypes = Object.create(null);

// Word separators, as in Sublime Text
'./\\()"\'-:,.;<>~!@#$%^&*|+=[]{}`~?'.split('').cl_each((wordSeparator) => {
  charTypes[wordSeparator] = 'wordSeparator';
});
charTypes[' '] = 'space';
charTypes['\t'] = 'space';
charTypes['\n'] = 'newLine';

function getNextWordOffset(text, offset, isBackward) {
  let previousType;
  let result = offset;
  while ((isBackward && result > 0) || (!isBackward && result < text.length)) {
    const currentType = charTypes[isBackward ? text[result - 1] : text[result]] || 'word';
    if (previousType && currentType !== previousType) {
      if (previousType === 'word' || currentType === 'space' || previousType === 'newLine' || currentType === 'newLine') {
        break;
      }
    }
    previousType = currentType;
    if (isBackward) {
      result -= 1;
    } else {
      result += 1;
    }
  }
  return result;
}

cledit.defaultKeystrokes = [

  new Keystroke((evt, state, editor) => {
    if ((!evt.ctrlKey && !evt.metaKey) || evt.altKey) {
      return false;
    }
    const keyCode = evt.charCode || evt.keyCode;
    const keyCodeChar = String.fromCharCode(keyCode).toLowerCase();
    let action;
    switch (keyCodeChar) {
      case 'y':
        action = 'redo';
        break;
      case 'z':
        action = evt.shiftKey ? 'redo' : 'undo';
        break;
      default:
    }
    if (action) {
      evt.preventDefault();
      setTimeout(() => editor.undoMgr[action](), 10);
      return true;
    }
    return false;
  }),

  new Keystroke((evt, state) => {
    if (evt.which !== 9 /* tab */ || evt.metaKey || evt.ctrlKey) {
      return false;
    }

    const strSplice = (str, i, remove, add = '') =>
      str.slice(0, i) + add + str.slice(i + (+remove || 0));

    evt.preventDefault();
    const isInverse = evt.shiftKey;
    const lf = state.before.lastIndexOf('\n') + 1;
    if (isInverse) {
      if (/\s/.test(state.before.charAt(lf))) {
        state.before = strSplice(state.before, lf, 1);
      }
      state.selection = state.selection.replace(/^[ \t]/gm, '');
    } else if (state.selection) {
      state.before = strSplice(state.before, lf, 0, '\t');
      state.selection = state.selection.replace(/\n(?=[\s\S])/g, '\n\t');
    } else {
      state.before += '\t';
    }
    return true;
  }),

  new Keystroke((evt, state, editor) => {
    if (evt.which !== 13 /* enter */) {
      clearNewline = false;
      return false;
    }

    evt.preventDefault();
    const lf = state.before.lastIndexOf('\n') + 1;
    if (clearNewline) {
      state.before = state.before.substring(0, lf);
      state.selection = '';
      clearNewline = false;
      return true;
    }
    clearNewline = false;
    const previousLine = state.before.slice(lf);
    const indent = previousLine.match(/^\s*/)[0];
    if (indent.length) {
      clearNewline = true;
    }

    editor.undoMgr.setCurrentMode('single');
    state.before += `\n${indent}`;
    state.selection = '';
    return true;
  }),

  new Keystroke((evt, state, editor) => {
    if (evt.which !== 8 /* backspace */ && evt.which !== 46 /* delete */) {
      return false;
    }

    editor.undoMgr.setCurrentMode('delete');
    if (!state.selection) {
      const isJump = (cledit.Utils.isMac && evt.altKey) || (!cledit.Utils.isMac && evt.ctrlKey);
      if (isJump) {
        // Custom kill word behavior
        const text = state.before + state.after;
        const offset = getNextWordOffset(text, state.before.length, evt.which === 8);
        if (evt.which === 8) {
          state.before = state.before.slice(0, offset);
        } else {
          state.after = state.after.slice(offset - text.length);
        }
        evt.preventDefault();
        return true;
      } else if (evt.which === 8 && state.before.slice(-1) === '\n') {
        // Special treatment for end of lines
        state.before = state.before.slice(0, -1);
        evt.preventDefault();
        return true;
      } else if (evt.which === 46 && state.after.slice(0, 1) === '\n') {
        state.after = state.after.slice(1);
        evt.preventDefault();
        return true;
      }
    } else {
      state.selection = '';
      evt.preventDefault();
      return true;
    }
    return false;
  }),

  new Keystroke((evt, state, editor) => {
    if (evt.which !== 37 /* left arrow */ && evt.which !== 39 /* right arrow */) {
      return false;
    }
    const isJump = (cledit.Utils.isMac && evt.altKey) || (!cledit.Utils.isMac && evt.ctrlKey);
    if (!isJump) {
      return false;
    }

    // Custom jump behavior
    const textContent = editor.getContent();
    const offset = getNextWordOffset(
      textContent,
      editor.selectionMgr.selectionEnd,
      evt.which === 37,
    );
    if (evt.shiftKey) {
      // rebuild the state completely
      const min = Math.min(editor.selectionMgr.selectionStart, offset);
      const max = Math.max(editor.selectionMgr.selectionStart, offset);
      state.before = textContent.slice(0, min);
      state.after = textContent.slice(max);
      state.selection = textContent.slice(min, max);
      state.isBackwardSelection = editor.selectionMgr.selectionStart > offset;
    } else {
      state.before = textContent.slice(0, offset);
      state.after = textContent.slice(offset);
      state.selection = '';
    }
    evt.preventDefault();
    return true;
  }),
];
