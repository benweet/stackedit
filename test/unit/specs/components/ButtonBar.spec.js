import ButtonBar from '../../../../src/components/ButtonBar';
import store from '../../../../src/store';
import specUtils from '../specUtils';

describe('ButtonBar.vue', () => {
  it('should toggle the navigation bar', async () => specUtils.checkToggler(
    ButtonBar,
    wrapper => wrapper.find('.button-bar__button--navigation-bar-toggler').trigger('click'),
    () => store.getters['data/layoutSettings'].showNavigationBar,
    'toggleNavigationBar',
  ));

  it('should toggle the side preview', async () => specUtils.checkToggler(
    ButtonBar,
    wrapper => wrapper.find('.button-bar__button--side-preview-toggler').trigger('click'),
    () => store.getters['data/layoutSettings'].showSidePreview,
    'toggleSidePreview',
  ));

  it('should toggle the editor', async () => specUtils.checkToggler(
    ButtonBar,
    wrapper => wrapper.find('.button-bar__button--editor-toggler').trigger('click'),
    () => store.getters['data/layoutSettings'].showEditor,
    'toggleEditor',
  ));

  it('should toggle the focus mode', async () => specUtils.checkToggler(
    ButtonBar,
    wrapper => wrapper.find('.button-bar__button--focus-mode-toggler').trigger('click'),
    () => store.getters['data/layoutSettings'].focusMode,
    'toggleFocusMode',
  ));

  it('should toggle the scroll sync', async () => specUtils.checkToggler(
    ButtonBar,
    wrapper => wrapper.find('.button-bar__button--scroll-sync-toggler').trigger('click'),
    () => store.getters['data/layoutSettings'].scrollSync,
    'toggleScrollSync',
  ));

  it('should toggle the status bar', async () => specUtils.checkToggler(
    ButtonBar,
    wrapper => wrapper.find('.button-bar__button--status-bar-toggler').trigger('click'),
    () => store.getters['data/layoutSettings'].showStatusBar,
    'toggleStatusBar',
  ));
});
