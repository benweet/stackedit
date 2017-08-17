var cledit = require('./cleditCore')

function Keystroke(handler, priority) {
  this.handler = handler
  this.priority = priority || 100
}

cledit.Keystroke = Keystroke

var clearNewline
var charTypes = Object.create(null)

// Word separators, as in Sublime Text
'./\\()"\'-:,.;<>~!@#$%^&*|+=[]{}`~?'.split('').cl_each(function (wordSeparator) {
  charTypes[wordSeparator] = 'wordSeparator'
})
charTypes[' '] = 'space'
charTypes['\t'] = 'space'
charTypes['\n'] = 'newLine'

function getNextWordOffset(text, offset, isBackward) {
  var previousType
  while ((isBackward && offset > 0) || (!isBackward && offset < text.length)) {
    var currentType = charTypes[isBackward ? text[offset - 1] : text[offset]] || 'word'
    if (previousType && currentType !== previousType) {
      if (previousType === 'word' || currentType === 'space' || previousType === 'newLine' || currentType === 'newLine') {
        break
      }
    }
    previousType = currentType
    isBackward ? offset-- : offset++
  }
  return offset
}

cledit.defaultKeystrokes = [

  new Keystroke(function (evt, state, editor) {
    if ((!evt.ctrlKey && !evt.metaKey) || evt.altKey) {
      return
    }
    var keyCode = evt.charCode || evt.keyCode
    var keyCodeChar = String.fromCharCode(keyCode).toLowerCase()
    var action
    switch (keyCodeChar) {
      case 'y':
        action = 'redo'
        break
      case 'z':
        action = evt.shiftKey ? 'redo' : 'undo'
        break
    }
    if (action) {
      evt.preventDefault()
      setTimeout(function () {
        editor.undoMgr[action]()
      }, 10)
      return true
    }
  }),

  new Keystroke(function (evt, state) {
    if (evt.which !== 9 /* tab */ || evt.metaKey || evt.ctrlKey) {
      return
    }

    function strSplice(str, i, remove, add) {
      remove = +remove || 0
      add = add || ''
      return str.slice(0, i) + add + str.slice(i + remove)
    }

    evt.preventDefault()
    var isInverse = evt.shiftKey
    var lf = state.before.lastIndexOf('\n') + 1
    if (isInverse) {
      if (/\s/.test(state.before.charAt(lf))) {
        state.before = strSplice(state.before, lf, 1)
      }
      state.selection = state.selection.replace(/^[ \t]/gm, '')
    } else {
      if (state.selection) {
        state.before = strSplice(state.before, lf, 0, '\t')
        state.selection = state.selection.replace(/\n(?=[\s\S])/g, '\n\t')
      } else {
        state.before += '\t'
      }
    }
    return true
  }),

  new Keystroke(function (evt, state, editor) {
    if (evt.which !== 13 /* enter */) {
      clearNewline = false
      return
    }

    evt.preventDefault()
    var lf = state.before.lastIndexOf('\n') + 1
    if (clearNewline) {
      state.before = state.before.substring(0, lf)
      state.selection = ''
      clearNewline = false
      return true
    }
    clearNewline = false
    var previousLine = state.before.slice(lf)
    var indent = previousLine.match(/^\s*/)[0]
    if (indent.length) {
      clearNewline = true
    }

    editor.undoMgr.setCurrentMode('single')
    state.before += '\n' + indent
    state.selection = ''
    return true
  }),

  new Keystroke(function (evt, state, editor) {
    if (evt.which !== 8 /* backspace */ && evt.which !== 46 /* delete */) {
      return
    }

    editor.undoMgr.setCurrentMode('delete')
    if (!state.selection) {
      var isJump = (cledit.Utils.isMac && evt.altKey) || (!cledit.Utils.isMac && evt.ctrlKey)
      if (isJump) {
        // Custom kill word behavior
        var text = state.before + state.after
        var offset = getNextWordOffset(text, state.before.length, evt.which === 8)
        if (evt.which === 8) {
          state.before = state.before.slice(0, offset)
        } else {
          state.after = state.after.slice(offset - text.length)
        }
        evt.preventDefault()
        return true
      } else if (evt.which === 8 && state.before.slice(-1) === '\n') {
        // Special treatment for end of lines
        state.before = state.before.slice(0, -1)
        evt.preventDefault()
        return true
      } else if (evt.which === 46 && state.after.slice(0, 1) === '\n') {
        state.after = state.after.slice(1)
        evt.preventDefault()
        return true
      }
    } else {
      state.selection = ''
      evt.preventDefault()
      return true
    }
  }),

  new Keystroke(function (evt, state, editor) {
    if (evt.which !== 37 /* left arrow */ && evt.which !== 39 /* right arrow */) {
      return
    }
    var isJump = (cledit.Utils.isMac && evt.altKey) || (!cledit.Utils.isMac && evt.ctrlKey)
    if (!isJump) {
      return
    }

    // Custom jump behavior
    var textContent = editor.getContent()
    var offset = getNextWordOffset(textContent, editor.selectionMgr.selectionEnd, evt.which === 37)
    if (evt.shiftKey) {
      // rebuild the state completely
      var min = Math.min(editor.selectionMgr.selectionStart, offset)
      var max = Math.max(editor.selectionMgr.selectionStart, offset)
      state.before = textContent.slice(0, min)
      state.after = textContent.slice(max)
      state.selection = textContent.slice(min, max)
      state.isBackwardSelection = editor.selectionMgr.selectionStart > offset
    } else {
      state.before = textContent.slice(0, offset)
      state.after = textContent.slice(offset)
      state.selection = ''
    }
    evt.preventDefault()
    return true
  })
]
