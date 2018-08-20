import NavigationBar from '../../../../src/components/NavigationBar';
import store from '../../../../src/store';
import specUtils from '../specUtils';

describe('NavigationBar.vue', () => {
  it('should toggle the explorer', () => specUtils.checkToggler(
    NavigationBar,
    wrapper => wrapper.find('.navigation-bar__button--explorer-toggler').trigger('click'),
    () => store.getters['data/layoutSettings'].showExplorer,
  ));

  it('should toggle the side bar', () => specUtils.checkToggler(
    NavigationBar,
    wrapper => wrapper.find('.navigation-bar__button--stackedit').trigger('click'),
    () => store.getters['data/layoutSettings'].showSideBar,
  ));
});
