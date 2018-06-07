import ButtonBar from '../../../../src/components/ButtonBar';
import store from '../../../../src/store';
import specUtils from '../specUtils';

describe('ButtonBar.vue', () => {
  it('should toggle the navigation bar', () => specUtils.checkToggler(
    ButtonBar,
    wrapper => wrapper.find('.button-bar__button--navigation-bar-toggler').trigger('click'),
    () => store.getters['data/layoutSettings'].showNavigationBar,
  ));

  it('should toggle the side preview', () => specUtils.checkToggler(
    ButtonBar,
    wrapper => wrapper.find('.button-bar__button--side-preview-toggler').trigger('click'),
    () => store.getters['data/layoutSettings'].showSidePreview,
  ));

  it('should toggle the editor', () => specUtils.checkToggler(
    ButtonBar,
    wrapper => wrapper.find('.button-bar__button--editor-toggler').trigger('click'),
    () => store.getters['data/layoutSettings'].showEditor,
  ));

  it('should toggle the focus mode', () => specUtils.checkToggler(
    ButtonBar,
    wrapper => wrapper.find('.button-bar__button--focus-mode-toggler').trigger('click'),
    () => store.getters['data/layoutSettings'].focusMode,
  ));

  it('should toggle the scroll sync', () => specUtils.checkToggler(
    ButtonBar,
    wrapper => wrapper.find('.button-bar__button--scroll-sync-toggler').trigger('click'),
    () => store.getters['data/layoutSettings'].scrollSync,
  ));

  it('should toggle the status bar', () => specUtils.checkToggler(
    ButtonBar,
    wrapper => wrapper.find('.button-bar__button--status-bar-toggler').trigger('click'),
    () => store.getters['data/layoutSettings'].showStatusBar,
  ));
});
