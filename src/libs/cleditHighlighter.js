var cledit = require('./cleditCore')

var styleElts = []

function createStyleSheet(document) {
  var styleElt = document.createElement('style')
  styleElt.type = 'text/css'
  styleElt.innerHTML = '.cledit-section * { display: inline; }'
  document.head.appendChild(styleElt)
  styleElts.push(styleElt)
}

function Highlighter(editor) {
  var self = this
  cledit.Utils.createEventHooks(this)

  styleElts.cl_some(function (styleElt) {
    return editor.$document.head.contains(styleElt)
  }) || createStyleSheet(editor.$document)

  var contentElt = editor.$contentElt
  this.isComposing = 0

  var sectionList = []
  var insertBeforeSection
  var useBr = cledit.Utils.isWebkit
  var trailingNodeTag = 'div'
  var hiddenLfInnerHtml = '<br><span class="hd-lf" style="display: none">\n</span>'

  var lfHtml = '<span class="lf">' + (useBr ? hiddenLfInnerHtml : '\n') + '</span>'

  this.fixContent = function (modifiedSections, removedSections, noContentFix) {
    modifiedSections.cl_each(function (section) {
      section.forceHighlighting = true
      if (!noContentFix) {
        if (useBr) {
          section.elt.getElementsByClassName('hd-lf').cl_each(function (lfElt) {
            lfElt.parentNode.removeChild(lfElt)
          })
          section.elt.getElementsByTagName('br').cl_each(function (brElt) {
            brElt.parentNode.replaceChild(editor.$document.createTextNode('\n'), brElt)
          })
        }
        if (section.elt.textContent.slice(-1) !== '\n') {
          section.elt.appendChild(editor.$document.createTextNode('\n'))
        }
      }
    })
  }

  this.addTrailingNode = function () {
    this.trailingNode = editor.$document.createElement(trailingNodeTag)
    contentElt.appendChild(this.trailingNode)
  }

  function Section(text) {
    this.text = text.text === undefined ? text : text.text
    this.data = text.data
  }

  Section.prototype.setElement = function (elt) {
    this.elt = elt
    elt.section = this
  }

  this.parseSections = function (content, isInit) {
    if (this.isComposing) {
      return sectionList
    }

    var newSectionList = editor.options.sectionParser ? editor.options.sectionParser(content) : [content]
    newSectionList = newSectionList.cl_map(function (sectionText) {
      return new Section(sectionText)
    })

    var modifiedSections = []
    var sectionsToRemove = []
    insertBeforeSection = undefined

    if (isInit) {
      // Render everything if isInit
      sectionsToRemove = sectionList
      sectionList = newSectionList
      modifiedSections = newSectionList
    } else {
      // Find modified section starting from top
      var leftIndex = sectionList.length
      sectionList.cl_some(function (section, index) {
        var newSection = newSectionList[index]
        if (index >= newSectionList.length ||
          section.forceHighlighting ||
          // Check text modification
          section.text !== newSection.text ||
          // Check that section has not been detached or moved
          section.elt.parentNode !== contentElt ||
          // Check also the content since nodes can be injected in sections via copy/paste
          section.elt.textContent !== newSection.text) {
          leftIndex = index
          return true
        }
      })

      // Find modified section starting from bottom
      var rightIndex = -sectionList.length
      sectionList.slice().reverse().cl_some(function (section, index) {
        var newSection = newSectionList[newSectionList.length - index - 1]
        if (index >= newSectionList.length ||
          section.forceHighlighting ||
          // Check modified
          section.text !== newSection.text ||
          // Check that section has not been detached or moved
          section.elt.parentNode !== contentElt ||
          // Check also the content since nodes can be injected in sections via copy/paste
          section.elt.textContent !== newSection.text) {
          rightIndex = -index
          return true
        }
      })

      if (leftIndex - rightIndex > sectionList.length) {
        // Prevent overlap
        rightIndex = leftIndex - sectionList.length
      }

      var leftSections = sectionList.slice(0, leftIndex)
      modifiedSections = newSectionList.slice(leftIndex, newSectionList.length + rightIndex)
      var rightSections = sectionList.slice(sectionList.length + rightIndex, sectionList.length)
      insertBeforeSection = rightSections[0]
      sectionsToRemove = sectionList.slice(leftIndex, sectionList.length + rightIndex)
      sectionList = leftSections.concat(modifiedSections).concat(rightSections)
    }

    var newSectionEltList = editor.$document.createDocumentFragment()
    modifiedSections.cl_each(function (section) {
      section.forceHighlighting = false
      highlight(section)
      newSectionEltList.appendChild(section.elt)
    })
    editor.watcher.noWatch(function () {
      if (isInit) {
        contentElt.innerHTML = ''
        contentElt.appendChild(newSectionEltList)
        return this.addTrailingNode()
      }

      // Remove outdated sections
      sectionsToRemove.cl_each(function (section) {
        // section may be already removed
        section.elt.parentNode === contentElt && contentElt.removeChild(section.elt)
        // To detect sections that come back with built-in undo
        section.elt.section = undefined
      })

      if (insertBeforeSection !== undefined) {
        contentElt.insertBefore(newSectionEltList, insertBeforeSection.elt)
      } else {
        contentElt.appendChild(newSectionEltList)
      }

      // Remove unauthorized nodes (text nodes outside of sections or duplicated sections via copy/paste)
      var childNode = contentElt.firstChild
      while (childNode) {
        var nextNode = childNode.nextSibling
        if (!childNode.section) {
          contentElt.removeChild(childNode)
        }
        childNode = nextNode
      }
      this.addTrailingNode()
      self.$trigger('highlighted')
      if (editor.selectionMgr.hasFocus()) {
        editor.selectionMgr.restoreSelection()
        editor.selectionMgr.updateCursorCoordinates()
      }
    }.cl_bind(this))

    return sectionList
  }

  function highlight(section) {
    var html = editor.options.sectionHighlighter(section).replace(/\n/g, lfHtml)
    var sectionElt = editor.$document.createElement('div')
    sectionElt.className = 'cledit-section'
    sectionElt.innerHTML = html
    section.setElement(sectionElt)
    self.$trigger('sectionHighlighted', section)
  }
}

cledit.Highlighter = Highlighter

