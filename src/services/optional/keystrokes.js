import cledit from '../../libs/cledit';
import editorSvc from '../editorSvc';

const Keystroke = cledit.Keystroke;
const indentRegexp = /^ {0,3}>[ ]*|^[ \t]*[*+-][ \t]|^([ \t]*)\d+\.[ \t]|^\s+/;
let clearNewline;
let lastSelection;

function fixNumberedList(state, indent) {
  if (state.selection || indent === undefined) {
    return;
  }
  const spaceIndent = indent.replace(/\t/g, '    ');
  const indentRegex = new RegExp(`^[ \\s]*$|^${spaceIndent}(\\d+\\.[ \\t])?(( )?.*)$`);

  function getHits(lines) {
    let hits = [];
    let pendingHits = [];

    function flush() {
      if (!pendingHits.hasHit && pendingHits.hasNoIndent) {
        return false;
      }
      hits = hits.concat(pendingHits);
      pendingHits = [];
      return true;
    }

    lines.some((line) => {
      const match = line.replace(
        /^[ \t]*/, wholeMatch => wholeMatch.replace(/\t/g, '    ')).match(indentRegex);
      if (!match || line.match(/^#+ /)) { // Line not empty, not indented, or title
        flush();
        return true;
      }
      pendingHits.push({
        line,
        match,
      });
      if (match[2] !== undefined) {
        if (match[1]) {
          pendingHits.hasHit = true;
        } else if (!match[3]) {
          pendingHits.hasNoIndent = true;
        }
      } else if (!flush()) {
        return true;
      }
      return false;
    });
    return hits;
  }

  function formatHits(hits) {
    let num;
    return hits.map((hit) => {
      if (hit.match[1]) {
        if (!num) {
          num = parseInt(hit.match[1], 10);
        }
        const result = indent + num + hit.match[1].slice(-2) + hit.match[2];
        num += 1;
        return result;
      }
      return hit.line;
    });
  }

  const before = state.before.split('\n');
  before.unshift(''); // Add an extra line (fixes #184)
  const after = state.after.split('\n');
  let currentLine = before.pop() || '';
  const currentPos = currentLine.length;
  currentLine += after.shift() || '';
  let lines = before.concat(currentLine).concat(after);
  let idx = before.length - getHits(before.slice().reverse()).length; // Prevents starting from 0
  while (idx <= before.length + 1) {
    const hits = formatHits(getHits(lines.slice(idx)));
    if (!hits.length) {
      idx += 1;
    } else {
      lines = lines.slice(0, idx).concat(hits).concat(lines.slice(idx + hits.length));
      idx += hits.length;
    }
  }
  currentLine = lines[before.length];
  state.before = lines.slice(1, before.length); // As we've added an extra line
  state.before.push(currentLine.slice(0, currentPos));
  state.before = state.before.join('\n');
  state.after = [currentLine.slice(currentPos)].concat(lines.slice(before.length + 1));
  state.after = state.after.join('\n');
}

function enterKeyHandler(evt, state) {
  if (evt.which !== 13) {
    // Not enter
    clearNewline = false;
    return false;
  }

  evt.preventDefault();
  const lf = state.before.lastIndexOf('\n') + 1;
  const previousLine = state.before.slice(lf);
  const indentMatch = previousLine.match(indentRegexp) || [''];
  if (clearNewline && !state.selection && state.before.length === lastSelection) {
    state.before = state.before.substring(0, lf);
    state.selection = '';
    clearNewline = false;
    fixNumberedList(state, indentMatch[1]);
    return true;
  }
  clearNewline = false;
  const indent = indentMatch[0];
  if (indent.length) {
    clearNewline = true;
  }

  editorSvc.clEditor.undoMgr.setCurrentMode('single');

  state.before += `\n${indent}`;
  state.selection = '';
  lastSelection = state.before.length;
  fixNumberedList(state, indentMatch[1]);
  return true;
}

function tabKeyHandler(evt, state) {
  if (evt.which !== 9 || evt.metaKey || evt.ctrlKey) {
    // Not tab
    return false;
  }

  const strSplice = (str, i, remove, add) =>
    str.slice(0, i) + (add || '') + str.slice(i + (+remove || 0));

  evt.preventDefault();
  const isInverse = evt.shiftKey;
  const lf = state.before.lastIndexOf('\n') + 1;
  const previousLine = state.before.slice(lf) + state.selection + state.after;
  const indentMatch = previousLine.match(indentRegexp);
  if (isInverse) {
    const previousChar = state.before.slice(-1);
    if (/\s/.test(state.before.charAt(lf))) {
      state.before = strSplice(state.before, lf, 1);
      if (indentMatch) {
        fixNumberedList(state, indentMatch[1]);
        if (indentMatch[1]) {
          fixNumberedList(state, indentMatch[1].slice(1));
        }
      }
    }
    const selection = previousChar + state.selection;
    state.selection = selection.replace(/\n[ \t]/gm, '\n');
    if (previousChar) {
      state.selection = state.selection.slice(1);
    }
  } else if (state.selection || indentMatch) {
    state.before = strSplice(state.before, lf, 0, '\t');
    state.selection = state.selection.replace(/\n(?=.)/g, '\n\t');
    if (indentMatch) {
      fixNumberedList(state, indentMatch[1]);
      fixNumberedList(state, `\t${indentMatch[1]}`);
    }
  } else {
    state.before += '\t';
  }
  return true;
}

editorSvc.$on('inited', () => {
  editorSvc.clEditor.addKeystroke(new Keystroke(enterKeyHandler, 50));
  editorSvc.clEditor.addKeystroke(new Keystroke(tabKeyHandler, 50));
});
