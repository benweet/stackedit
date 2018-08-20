import { shallowMount } from '@vue/test-utils';
import ContextMenu from '../../../../src/components/ContextMenu';
import store from '../../../../src/store';
import '../specUtils';

const mount = () => shallowMount(ContextMenu, { store });

describe('ContextMenu.vue', () => {
  const name = 'Name';
  const makeOptions = () => ({
    coordinates: {
      left: 0,
      top: 0,
    },
    items: [{ name }],
  });

  it('should open/close itself', async () => {
    const wrapper = mount();
    expect(wrapper.contains('.context-menu__item')).toEqual(false);
    setTimeout(() => wrapper.find('.context-menu__item').trigger('click'), 1);
    const item = await store.dispatch('contextMenu/open', makeOptions());
    expect(item.name).toEqual(name);
  });

  it('should cancel itself', async () => {
    const wrapper = mount();
    setTimeout(() => wrapper.trigger('click'), 1);
    const item = await store.dispatch('contextMenu/open', makeOptions());
    expect(item).toEqual(null);
  });
});
