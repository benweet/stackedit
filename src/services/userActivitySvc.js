const inactiveAfter = 2 * 60 * 1000; // 2 minutes
let lastActivity;
let lastFocus;
const lastFocusKey = 'lastWindowFocus';

function setLastActivity() {
  lastActivity = Date.now();
}

function setLastFocus() {
  lastFocus = Date.now();
  localStorage[lastFocusKey] = lastFocus;
  setLastActivity();
}

setLastFocus();
window.addEventListener('focus', setLastFocus);
window.document.addEventListener('mousedown', setLastActivity);
window.document.addEventListener('keydown', setLastActivity);

export default {
  isFocused() {
    return parseInt(localStorage[lastFocusKey], 10) === lastFocus;
  },
  isActive() {
    return lastActivity > Date.now() - inactiveAfter && this.isFocused();
  },
};
