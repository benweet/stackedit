/* eslint-disable no-continue */
import abcjs from 'abcjs';

function abcNotation(state, startLine, endLine, silent) {
  const validateParams = params => params.trim().match(/^abc$/);
  let nextLine;
  let autoClosed = false;

  let start = state.bMarks[startLine] + state.tShift[startLine];
  let max = state.eMarks[startLine];

  // Check out the first character quickly,
  // this filters out all non-codeblocks
  const marker = state.src.charCodeAt(start);
  if (marker !== 0x7e /* ~ */ && marker !== 0x60 /* ` */) {
    return false;
  }

  // Check out the rest of the marker string
  const markerStart = start;
  start = state.skipChars(start, marker);
  const markerLength = start - markerStart;
  if (markerLength < 3) {
    return false;
  }

  const markup = state.src.slice(markerLength, start);
  const params = state.src.slice(start, max);
  if (!validateParams(params)) {
    return false;
  }

  // Since start is found, we can report success here in validation mode
  if (silent) {
    return true;
  }

  // Search for the end of the block
  nextLine = startLine;

  for (;;) {
    nextLine += 1;
    if (nextLine >= endLine) {
      // unclosed block should be autoclosed by end of document.
      // also block seems to be autoclosed by end of parent
      break;
    }

    start = state.bMarks[nextLine] + state.tShift[nextLine];
    max = state.eMarks[nextLine];

    if (start < max && state.sCount[nextLine] < state.blkIndent) {
      // non-empty line with negative indent should stop the list:
      // - ```
      //  test
      break;
    }

    if (marker !== state.src.charCodeAt(start)) {
      continue;
    }

    if (state.sCount[nextLine] - state.blkIndent >= 4) {
      // closing fence should be indented less than 4 spaces
      continue;
    }

    start = state.skipChars(start, marker);
    // closing fence must be at least as long as the opening one
    if (start - markerStart < markerLength) {
      continue;
    }

    // make sure tail has spaces only
    start = state.skipSpaces(start);
    if (start < max) {
      continue;
    }

    autoClosed = true;
    // found!
    break;
  }

  const oldParent = state.parentType;
  const oldLineMax = state.lineMax;
  state.parentType = 'container';

  // If a fence has heading spaces, they should be removed from its inner block
  // markerLength = state.sCount[startLine];

  // this will prevent lazy continuations from ever going past our end marker
  state.lineMax = nextLine;

  const token = state.push('fence_abc', 'div', 1);
  token.info = params;
  token.markup = markup;
  token.block = true;
  token.map = [startLine, nextLine];

  const abc = state.getLines(startLine + 1, nextLine, markerLength, true);
  const renderedSvg = abcjs.parseOnly(abc);
  console.error(renderedSvg);

  state.parentType = oldParent;
  state.lineMax = oldLineMax;
  state.line = nextLine + (autoClosed ? 1 : 0);

  return true;
}

export default (md) => {
  md.block.ruler.before('fence', 'fence_abc', abcNotation, {
    alt: ['paragraph', 'reference', 'blockquote', 'list'],
  });
};
