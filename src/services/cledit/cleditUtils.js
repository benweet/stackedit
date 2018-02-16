var cledit = require('./cleditCore')

var Utils = {
  isGecko: 'MozAppearance' in document.documentElement.style,
  isWebkit: 'WebkitAppearance' in document.documentElement.style,
  isMsie: 'msTransform' in document.documentElement.style,
  isMac: navigator.userAgent.indexOf('Mac OS X') !== -1
}

// Faster than setTimeout(0). Credit: https://github.com/stefanpenner/es6-promise
Utils.defer = (function () {
  var queue = new Array(1000)
  var queueLength = 0
  function flush() {
    for (var i = 0; i < queueLength; i++) {
      try {
        queue[i]()
      } catch (e) {
        console.error(e.message, e.stack)
      }
      queue[i] = undefined
    }
    queueLength = 0
  }

  var iterations = 0
  var observer = new window.MutationObserver(flush)
  var node = document.createTextNode('')
  observer.observe(node, { characterData: true })

  return function (fn) {
    queue[queueLength++] = fn
    if (queueLength === 1) {
      node.data = (iterations = ++iterations % 2)
    }
  }
})()

Utils.debounce = function (func, wait) {
  var timeoutId, isExpected
  return wait
    ? function () {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(func, wait)
    }
    : function () {
      if (!isExpected) {
        isExpected = true
        Utils.defer(function () {
          isExpected = false
          func()
        })
      }
    }
}

Utils.createEventHooks = function (object) {
  var listenerMap = Object.create(null)
  object.$trigger = function (eventType) {
    var listeners = listenerMap[eventType]
    if (listeners) {
      var args = Array.prototype.slice.call(arguments, 1)
      listeners.cl_each(function (listener) {
        try {
          listener.apply(object, args)
        } catch (e) {
          console.error(e.message, e.stack)
        }
      })
    }
  }
  object.on = function (eventType, listener) {
    var listeners = listenerMap[eventType]
    if (!listeners) {
      listeners = []
      listenerMap[eventType] = listeners
    }
    listeners.push(listener)
  }
  object.off = function (eventType, listener) {
    var listeners = listenerMap[eventType]
    if (listeners) {
      var index = listeners.indexOf(listener)
      if (~index) {
        listeners.splice(index, 1)
      }
    }
  }
}

Utils.findContainer = function (elt, offset) {
  var containerOffset = 0
  var container
  do {
    container = elt
    elt = elt.firstChild
    if (elt) {
      do {
        var len = elt.textContent.length
        if (containerOffset <= offset && containerOffset + len > offset) {
          break
        }
        containerOffset += len
      } while ((elt = elt.nextSibling))
    }
  } while (elt && elt.firstChild && elt.nodeType !== 3)

  if (elt) {
    return {
      container: elt,
      offsetInContainer: offset - containerOffset
    }
  }
  while (container.lastChild) {
    container = container.lastChild
  }
  return {
    container: container,
    offsetInContainer: container.nodeType === 3 ? container.textContent.length : 0
  }
}

cledit.Utils = Utils
