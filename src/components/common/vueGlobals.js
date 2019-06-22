import Vue from 'vue';
import Clipboard from 'clipboard';
import timeSvc from '../../services/timeSvc';
import store from '../../store';

// Global directives
Vue.directive('focus', {
  inserted(el) {
    el.focus();
    const { value } = el;
    if (value && el.setSelectionRange) {
      el.setSelectionRange(0, value.length);
    }
  },
});

const setVisible = (el, value) => {
  el.style.display = value ? '' : 'none';
  if (value) {
    el.removeAttribute('aria-hidden');
  } else {
    el.setAttribute('aria-hidden', 'true');
  }
};
Vue.directive('show', {
  bind(el, { value }) {
    setVisible(el, value);
  },
  update(el, { value, oldValue }) {
    if (value !== oldValue) {
      setVisible(el, value);
    }
  },
});

const setElTitle = (el, title) => {
  el.title = title;
  el.setAttribute('aria-label', title);
};
Vue.directive('title', {
  bind(el, { value }) {
    setElTitle(el, value);
  },
  update(el, { value, oldValue }) {
    if (value !== oldValue) {
      setElTitle(el, value);
    }
  },
});

// Clipboard directive
const createClipboard = (el, value) => {
  el.seClipboard = new Clipboard(el, { text: () => value });
};
const destroyClipboard = (el) => {
  if (el.seClipboard) {
    el.seClipboard.destroy();
    el.seClipboard = null;
  }
};
Vue.directive('clipboard', {
  bind(el, { value }) {
    createClipboard(el, value);
  },
  update(el, { value, oldValue }) {
    if (value !== oldValue) {
      destroyClipboard(el);
      createClipboard(el, value);
    }
  },
  unbind(el) {
    destroyClipboard(el);
  },
});

// Global filters
Vue.filter('formatTime', time =>
  // Access the time counter for reactive refresh
  timeSvc.format(time, store.state.timeCounter));

