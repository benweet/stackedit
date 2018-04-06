function texMath(state, silent) {
  let startMathPos = state.pos;
  if (state.src.charCodeAt(startMathPos) !== 0x24 /* $ */) {
    return false;
  }

  // Parse tex math according to http://pandoc.org/README.html#math
  let endMarker = '$';
  startMathPos += 1;
  const afterStartMarker = state.src.charCodeAt(startMathPos);
  if (afterStartMarker === 0x24 /* $ */) {
    endMarker = '$$';
    startMathPos += 1;
    if (state.src.charCodeAt(startMathPos) === 0x24 /* $ */) {
      // 3 markers are too much
      return false;
    }
  } else if (
    // Skip if opening $ is succeeded by a space character
    afterStartMarker === 0x20 /* space */
    || afterStartMarker === 0x09 /* \t */
    || afterStartMarker === 0x0a /* \n */
  ) {
    return false;
  }
  const endMarkerPos = state.src.indexOf(endMarker, startMathPos);
  if (endMarkerPos === -1) {
    return false;
  }
  if (state.src.charCodeAt(endMarkerPos - 1) === 0x5C /* \ */) {
    return false;
  }
  const nextPos = endMarkerPos + endMarker.length;
  if (endMarker.length === 1) {
    // Skip if $ is preceded by a space character
    const beforeEndMarker = state.src.charCodeAt(endMarkerPos - 1);
    if (beforeEndMarker === 0x20 /* space */
      || beforeEndMarker === 0x09 /* \t */
      || beforeEndMarker === 0x0a /* \n */) {
      return false;
    }
    // Skip if closing $ is succeeded by a digit (eg $5 $10 ...)
    const suffix = state.src.charCodeAt(nextPos);
    if (suffix >= 0x30 && suffix < 0x3A) {
      return false;
    }
  }

  if (!silent) {
    const token = state.push(endMarker.length === 1 ? 'inline_math' : 'display_math', '', 0);
    token.content = state.src.slice(startMathPos, endMarkerPos);
  }
  state.pos = nextPos;
  return true;
}

export default (md) => {
  md.inline.ruler.push('texMath', texMath);
};
