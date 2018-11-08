import { shallowMount } from '@vue/test-utils';
import Notification from '../../../../src/components/Notification';
import store from '../../../../src/store';
import '../specUtils';

const mount = () => shallowMount(Notification, { store });

describe('Notification.vue', () => {
  it('should autoclose itself', async () => {
    const wrapper = mount();
    expect(wrapper.contains('.notification__item')).toBe(false);
    store.dispatch('notification/showItem', {
      type: 'info',
      content: 'Test',
      timeout: 10,
    });
    expect(wrapper.contains('.notification__item')).toBe(true);
    await new Promise(resolve => setTimeout(resolve, 10));
    expect(wrapper.contains('.notification__item')).toBe(false);
  });

  it('should show messages from top to bottom', async () => {
    const wrapper = mount();
    store.dispatch('notification/info', 'Test 1');
    store.dispatch('notification/info', 'Test 2');
    const items = wrapper.findAll('.notification__item');
    expect(items.length).toEqual(2);
    expect(items.at(0).text()).toMatch(/Test 1/);
    expect(items.at(1).text()).toMatch(/Test 2/);
  });

  it('should not open the same message twice', async () => {
    const wrapper = mount();
    store.dispatch('notification/info', 'Test');
    store.dispatch('notification/info', 'Test');
    expect(wrapper.findAll('.notification__item').length).toEqual(1);
  });
});
