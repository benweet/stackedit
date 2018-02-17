import cledit from './cleditCore';

const Utils = {
  isGecko: 'MozAppearance' in document.documentElement.style,
  isWebkit: 'WebkitAppearance' in document.documentElement.style,
  isMsie: 'msTransform' in document.documentElement.style,
  isMac: navigator.userAgent.indexOf('Mac OS X') !== -1,
};

// Faster than setTimeout(0). Credit: https://github.com/stefanpenner/es6-promise
Utils.defer = (() => {
  const queue = new Array(1000);
  let queueLength = 0;
  function flush() {
    for (let i = 0; i < queueLength; i += 1) {
      try {
        queue[i]();
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e.message, e.stack);
      }
      queue[i] = undefined;
    }
    queueLength = 0;
  }

  let iterations = 0;
  const observer = new window.MutationObserver(flush);
  const node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return (fn) => {
    queue[queueLength] = fn;
    queueLength += 1;
    if (queueLength === 1) {
      iterations = (iterations + 1) % 2;
      node.data = iterations;
    }
  };
})();

Utils.debounce = (func, wait) => {
  let timeoutId;
  let isExpected;
  return wait
    ? () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(func, wait);
    }
    : () => {
      if (!isExpected) {
        isExpected = true;
        Utils.defer(() => {
          isExpected = false;
          func();
        });
      }
    };
};

Utils.createEventHooks = (object) => {
  const listenerMap = Object.create(null);
  object.$trigger = (eventType, ...args) => {
    const listeners = listenerMap[eventType];
    if (listeners) {
      listeners.cl_each((listener) => {
        try {
          listener.apply(object, args);
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error(e.message, e.stack);
        }
      });
    }
  };
  object.on = (eventType, listener) => {
    let listeners = listenerMap[eventType];
    if (!listeners) {
      listeners = [];
      listenerMap[eventType] = listeners;
    }
    listeners.push(listener);
  };
  object.off = (eventType, listener) => {
    const listeners = listenerMap[eventType];
    if (listeners) {
      const index = listeners.indexOf(listener);
      if (index !== -1) {
        listeners.splice(index, 1);
      }
    }
  };
};

Utils.findContainer = (elt, offset) => {
  let containerOffset = 0;
  let container;
  let child = elt;
  do {
    container = child;
    child = child.firstChild;
    if (child) {
      do {
        const len = child.textContent.length;
        if (containerOffset <= offset && containerOffset + len > offset) {
          break;
        }
        containerOffset += len;
        child = child.nextSibling;
      } while (child);
    }
  } while (child && child.firstChild && child.nodeType !== 3);

  if (child) {
    return {
      container: child,
      offsetInContainer: offset - containerOffset,
    };
  }
  while (container.lastChild) {
    container = container.lastChild;
  }
  return {
    container,
    offsetInContainer: container.nodeType === 3 ? container.textContent.length : 0,
  };
};

cledit.Utils = Utils;
