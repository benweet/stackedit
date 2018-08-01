/* eslint-disable */
function abcNotation(state, startLine, endLine, silent) {
  const validateParams = params => params.trim().match(/^abc$/);

  let pos,
    nextLine,
    markup,
    params,
    token,
    oldParent,
    oldLineMax,
    markerLength,
    autoClosed = false,
    start = state.bMarks[startLine] + state.tShift[startLine],
    max = state.eMarks[startLine];

  // Check out the first character quickly,
  // this filters out all non-codeblocks
  const marker = state.src.charCodeAt(start);
  if (marker !== 0x7e /* ~ */ && marker !== 0x60 /* ` */) {
    return false;
  }

  // Check out the rest of the marker string
  const markerStart = pos;
  pos = state.skipChars(pos, marker);
  markerLength = pos - markerStart;
  if (markerLength < 3) {
    return false;
  }

  markup = state.src.slice(start, pos);
  params = state.src.slice(pos, max);
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

    pos = state.skipChars(pos, marker);
    // closing fence must be at least as long as the opening one
    if (pos - markerStart < markerLength) {
      continue;
    }

    // make sure tail has spaces only
    pos = state.skipSpaces(pos);

    if (pos < max) {
      continue;
    }

    autoClosed = true;
    // found!
    break;
  }

  old_parent = state.parentType;
  old_line_max = state.lineMax;
  state.parentType = 'container';

  // If a fence has heading spaces, they should be removed from its inner block
  // markerLength = state.sCount[startLine];

  // this will prevent lazy continuations from ever going past our end marker
  state.lineMax = nextLine;

  token = state.push('fence_abc', 'div', 1);
  token.info = params;
  // token.content = state.getLines(startLine + 1, nextLine, markerLength, true);
  token.markup = markup;
  token.block = true;
  token.map = [startLine, nextLine];

  state.parentType = old_parent;
  state.lineMax = old_line_max;
  state.line = nextLine + (autoClosed ? 1 : 0);

  return true;
}

export default md => {
  md.block.ruler.before('fence', 'fence_abc', abcNotation, {
    alt: ['paragraph', 'reference', 'blockquote', 'list'],
  });
};
