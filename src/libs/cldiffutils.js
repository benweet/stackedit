import 'clunderscore';
import DiffMatchPatch from 'diff-match-patch';

var clDiffUtils = {
  cloneObject: cloneObject,
  offsetToPatch: offsetToPatch,
  patchToOffset: patchToOffset,
  serializeObject: serializeObject,
  flattenContent: flattenContent,
  makePatchableText: makePatchableText,
  restoreDiscussionOffsets: restoreDiscussionOffsets,
  makeContentChange: makeContentChange,
  applyContentChanges: applyContentChanges,
  getTextPatches: getTextPatches,
  getObjectPatches: getObjectPatches,
  quickPatch: quickPatch,
  mergeObjects: mergeObjects,
  mergeFlattenContent: mergeFlattenContent
}

var marker = '\uF111\uF222\uF333\uF444'
var DIFF_DELETE = -1
var DIFF_INSERT = 1
var DIFF_EQUAL = 0
var diffMatchPatch = new DiffMatchPatch() // eslint-disable-line new-cap
var diffMatchPatchStrict = new DiffMatchPatch() // eslint-disable-line new-cap
diffMatchPatchStrict.Match_Threshold = 0
diffMatchPatchStrict.Patch_DeleteThreshold = 0
var diffMatchPatchPermissive = new DiffMatchPatch() // eslint-disable-line new-cap
diffMatchPatchPermissive.Match_Distance = 999999999

function cloneObject (obj) {
  return JSON.parse(JSON.stringify(obj))
}

function offsetToPatch (text, offset) {
  var patch = diffMatchPatchPermissive.patch_make(text, [
    [0, text.slice(0, offset)],
    [1, marker],
    [0, text.slice(offset)]
  ])[0]
  var diffs = patch.diffs.cl_map(function (diff) {
    if (!diff[0]) {
      return diff[1]
    } else if (diff[1] === marker) {
      return ''
    }
  })
  return {
    diffs: diffs,
    length: patch.length1,
    start: patch.start1
  }
}

function patchToOffset (text, patch) {
  var markersLength = 0
  var diffs = patch.diffs.cl_map(function (diff) {
    if (!diff) {
      markersLength += marker.length
      return [1, marker]
    } else {
      return [0, diff]
    }
  })
  return diffMatchPatchPermissive.patch_apply([{
    diffs: diffs,
    length1: patch.length,
    length2: patch.length + markersLength,
    start1: patch.start,
    start2: patch.start
  }], text)[0].indexOf(marker)
}

function flattenObject (obj) {
  return obj.cl_reduce(function (result, value, key) {
    result[key] = value[1]
    return result
  }, {})
}

function flattenContent (content) {
  var result = ({}).cl_extend(content)
  result.properties = flattenObject(content.properties)
  result.discussions = flattenObject(content.discussions)
  result.comments = flattenObject(content.comments)
  result.text = content.text.cl_reduce(function (text, item) {
    switch (item.type) {
      case 'discussion':
        if (result.discussions[item.id]) {
          result.discussions[item.id][item.name] = text.length
        }
        return text
      default:
        return text + item[1]
    }
  }, '')
  return result
}

function getTextPatches (oldText, newText) {
  var diffs = diffMatchPatch.diff_main(oldText, newText)
  diffMatchPatch.diff_cleanupEfficiency(diffs)
  var patches = []
  var startOffset = 0
  diffs.cl_each(function (change) {
    var changeType = change[0]
    var changeText = change[1]
    switch (changeType) {
      case DIFF_EQUAL:
        startOffset += changeText.length
        break
      case DIFF_DELETE:
        changeText && patches.push({
          o: startOffset,
          d: changeText
        })
        break
      case DIFF_INSERT:
        changeText && patches.push({
          o: startOffset,
          a: changeText
        })
        startOffset += changeText.length
        break
    }
  })
  return patches.length ? patches : undefined
}

function getObjectPatches (oldObject, newObjects) {
  var valueHash = Object.create(null)
  var valueArray = []
  oldObject = hashObject(oldObject, valueHash, valueArray)
  newObjects = hashObject(newObjects, valueHash, valueArray)
  var diffs = diffMatchPatch.diff_main(oldObject, newObjects)
  var patches = []
  diffs.cl_each(function (change) {
    var changeType = change[0]
    var changeHash = change[1]
    if (changeType === DIFF_EQUAL) {
      return
    }
    changeHash.split('').cl_each(function (objHash) {
      var obj = valueArray[objHash.charCodeAt(0)]
      var patch = {
        k: obj[0]
      }
      patch[changeType === DIFF_DELETE ? 'd' : 'a'] = obj[1]
      patches.push(patch)
    })
  })
  return patches.length ? patches : undefined
}

function makePatchableText (content, markerKeys, markerIdxMap) {
  var markers = []
  // Sort keys to have predictable marker positions, in case of same offset
  var discussionKeys = Object.keys(content.discussions).sort()
  discussionKeys.cl_each(function (discussionId) {
    function addMarker (offsetName) {
      var markerKey = discussionId + offsetName
      if (discussion[offsetName] !== undefined) {
        var idx = markerIdxMap[markerKey]
        if (idx === undefined) {
          idx = markerKeys.length
          markerIdxMap[markerKey] = idx
          markerKeys.push({
            id: discussionId,
            offsetName: offsetName
          })
        }
        markers.push({
          idx: idx,
          offset: discussion[offsetName]
        })
      }
    }

    var discussion = content.discussions[discussionId]
    if (discussion.offset0 === discussion.offset1) {
      // Remove discussion offsets if markers are at the same position
      discussion.offset0 = discussion.offset1 = undefined
    } else {
      addMarker('offset0')
      addMarker('offset1')
    }
  })

  var lastOffset = 0
  var result = ''
  markers
    .sort(function (marker1, marker2) {
      return marker1.offset - marker2.offset
    })
    .cl_each(function (marker) {
      result +=
        content.text.slice(lastOffset, marker.offset) +
        String.fromCharCode(0xe000 + marker.idx) // Use a character from the private use area
      lastOffset = marker.offset
    })
  return result + content.text.slice(lastOffset)
}

function stripDiscussionOffsets (objectMap) {
  return objectMap.cl_reduce(function (result, object, id) {
    result[id] = {
      text: object.text
    }
    return result
  }, {})
}

function restoreDiscussionOffsets (content, markerKeys) {
  var len = content.text.length
  var maxIdx = markerKeys.length
  for (var i = 0; i < len; i++) {
    var idx = content.text.charCodeAt(i) - 0xe000
    if (idx >= 0 && idx < maxIdx) {
      var markerKey = markerKeys[idx]
      content.text = content.text.slice(0, i) + content.text.slice(i + 1)
      var discussion = content.discussions[markerKey.id]
      if (discussion) {
        discussion[markerKey.offsetName] = i
      }
      i-- // We just removed the current character, we may have multiple markers with same offset
    }
  }
}

function makeContentChange (oldContent, newContent) {
  var markerKeys = []
  var markerIdxMap = Object.create(null)
  var oldText = makePatchableText(oldContent, markerKeys, markerIdxMap)
  var newText = makePatchableText(newContent, markerKeys, markerIdxMap)
  var textPatches = getTextPatches(oldText, newText)
  textPatches && textPatches.cl_each(function (patch) {
    // If markers are present, replace changeText with an array of text and markers
    var changeText = patch.a || patch.d
    var textItems = []
    var lastItem = ''
    var len = changeText.length
    var maxIdx = markerKeys.length
    for (var i = 0; i < len; i++) {
      var idx = changeText.charCodeAt(i) - 0xe000
      if (idx >= 0 && idx < maxIdx) {
        var markerKey = markerKeys[idx]
        lastItem.length && textItems.push(lastItem)
        textItems.push({
          type: 'discussion',
          name: markerKey.offsetName,
          id: markerKey.id
        })
        lastItem = ''
      } else {
        lastItem += changeText[i]
      }
    }
    if (textItems.length) {
      lastItem.length && textItems.push(lastItem)
      if (patch.a) {
        patch.a = textItems
      } else {
        patch.d = textItems
      }
    }
  })
  var propertiesPatches = getObjectPatches(oldContent.properties, newContent.properties)
  var discussionsPatches = getObjectPatches(
    stripDiscussionOffsets(oldContent.discussions),
    stripDiscussionOffsets(newContent.discussions)
  )
  var commentsPatches = getObjectPatches(oldContent.comments, newContent.comments)
  if (textPatches || propertiesPatches || discussionsPatches || commentsPatches) {
    return {
      text: textPatches,
      properties: propertiesPatches,
      discussions: discussionsPatches,
      comments: commentsPatches
    }
  }
}

function applyContentChanges (content, contentChanges, isBackward) {
  function applyObjectPatches (obj, patches) {
    if (patches) {
      patches.cl_each(function (patch) {
        if (!patch.a ^ !isBackward) {
          obj[patch.k] = patch.a || patch.d
        } else {
          delete obj[patch.k]
        }
      })
    }
  }

  var markerKeys = []
  var markerIdxMap = Object.create(null)
  var result = {
    text: makePatchableText(content, markerKeys, markerIdxMap),
    properties: cloneObject(content.properties),
    discussions: stripDiscussionOffsets(content.discussions),
    comments: cloneObject(content.comments)
  }

  contentChanges.cl_each(function (contentChange) {
    var textPatches = contentChange.text || []
    if (isBackward) {
      textPatches = textPatches.slice().reverse()
    }
    result.text = textPatches.cl_reduce(function (text, patch) {
      var isAdd = !patch.a ^ !isBackward
      var textChanges = patch.a || patch.d || ''
      // When no marker is present, textChanges is a string
      if (typeof textChanges === 'string') {
        textChanges = [textChanges]
      }
      var textChange = textChanges.cl_map(function (textChange) {
        if (!textChange.type) {
          // textChange is a string
          return textChange
        }
        // textChange is a marker
        var markerKey = textChange.id + textChange.name
        var idx = markerIdxMap[markerKey]
        if (idx === undefined) {
          idx = markerKeys.length
          markerIdxMap[markerKey] = idx
          markerKeys.push({
            id: textChange.id,
            offsetName: textChange.name
          })
        }
        return String.fromCharCode(0xe000 + idx)
      }).join('')
      if (!textChange) {
        return text
      } else if (isAdd) {
        return text.slice(0, patch.o).concat(textChange).concat(text.slice(patch.o))
      } else {
        return text.slice(0, patch.o).concat(text.slice(patch.o + textChange.length))
      }
    }, result.text)

    applyObjectPatches(result.properties, contentChange.properties)
    applyObjectPatches(result.discussions, contentChange.discussions)
    applyObjectPatches(result.comments, contentChange.comments)
  })

  restoreDiscussionOffsets(result, markerKeys)
  return result
}

function serializeObject (obj) {
  return JSON.stringify(obj, function (key, value) {
    return Object.prototype.toString.call(value) === '[object Object]'
      ? Object.keys(value).sort().cl_reduce(function (sorted, key) {
        sorted[key] = value[key]
        return sorted
      }, {})
      : value
  })
}

function hashArray (arr, valueHash, valueArray) {
  var hash = []
  arr.cl_each(function (obj) {
    var serializedObj = serializeObject(obj)
    var objHash = valueHash[serializedObj]
    if (objHash === undefined) {
      objHash = valueArray.length
      valueArray.push(obj)
      valueHash[serializedObj] = objHash
    }
    hash.push(objHash)
  })
  return String.fromCharCode.apply(null, hash)
}

function hashObject (obj, valueHash, valueArray) {
  return hashArray(Object.keys(obj || {}).sort().cl_map(function (key) {
    return [key, obj[key]]
  }), valueHash, valueArray)
}

function mergeText (oldText, newText, serverText) {
  var diffs = diffMatchPatch.diff_main(oldText, newText)
  diffMatchPatch.diff_cleanupSemantic(diffs)
  var patches = diffMatchPatch.patch_make(oldText, diffs)
  var patchResult = diffMatchPatch.patch_apply(patches, serverText)
  if (!patchResult[1]
      .cl_some(function (changeApplied) {
        return !changeApplied
      })) {
    return patchResult[0]
  }

  diffs = diffMatchPatchStrict.diff_main(patchResult[0], newText)
  diffMatchPatch.diff_cleanupSemantic(diffs)
  return diffs.cl_map(function (diff) {
    return diff[1]
  }).join('')
}

function quickPatch (oldStr, newStr, destStr, strict) {
  var dmp = strict ? diffMatchPatchStrict : diffMatchPatch
  var diffs = dmp.diff_main(oldStr, newStr)
  var patches = dmp.patch_make(oldStr, diffs)
  var patchResult = dmp.patch_apply(patches, destStr)
  return patchResult[0]
}

function mergeObjects (oldObject, newObject, serverObject) {
  var mergedObject = ({}).cl_extend(newObject).cl_extend(serverObject)
  mergedObject.cl_each(function (value, key) {
    if (!oldObject[key]) {
      return // There might be conflict, keep the server value
    }
    var newValue = newObject[key] && serializeObject(newObject[key])
    var serverValue = serverObject[key] && serializeObject(serverObject[key])
    if (newValue === serverValue) {
      return // no conflict
    }
    var oldValue = serializeObject(oldObject[key])
    if (oldValue !== newValue && !serverValue) {
      return // Removed on server but changed on client
    }
    if (oldValue !== serverValue && !newValue) {
      return // Removed on client but changed on server
    }
    if (oldValue !== newValue && oldValue === serverValue) {
      // Take the client value
      if (!newValue) {
        delete mergedObject[key]
      } else {
        mergedObject[key] = newObject[key]
      }
    } else if (oldValue !== serverValue && oldValue === newValue) {
      // Take the server value
      if (!serverValue) {
        delete mergedObject[key]
      }
    }
  // Take the server value otherwise
  })
  return cloneObject(mergedObject)
}

function mergeFlattenContent (oldContent, newContent, serverContent) {
  var markerKeys = []
  var markerIdxMap = Object.create(null)
  var oldText = makePatchableText(oldContent, markerKeys, markerIdxMap)
  var serverText = makePatchableText(serverContent, markerKeys, markerIdxMap)
  var localText = makePatchableText(newContent, markerKeys, markerIdxMap)
  var isServerTextChanges = oldText !== serverText
  var isTextSynchronized = serverText === localText

  var result = {
    text: isTextSynchronized || !isServerTextChanges
      ? localText
      : mergeText(oldText, serverText, localText),
    properties: mergeObjects(
      oldContent.properties,
      newContent.properties,
      serverContent.properties
    ),
    discussions: mergeObjects(
      stripDiscussionOffsets(oldContent.discussions),
      stripDiscussionOffsets(newContent.discussions),
      stripDiscussionOffsets(serverContent.discussions)
    ),
    comments: mergeObjects(
      oldContent.comments,
      newContent.comments,
      serverContent.comments
    )
  }
  restoreDiscussionOffsets(result, markerKeys)
  return result
}

export default clDiffUtils;
