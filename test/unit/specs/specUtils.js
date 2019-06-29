import { shallowMount } from '@vue/test-utils';
import store from '../../../src/store';
import utils from '../../../src/services/utils';
import '../../../src/icons';
import '../../../src/components/common/vueGlobals';

const clone = object => JSON.parse(JSON.stringify(object));

const deepAssign = (target, origin) => {
  Object.entries(origin).forEach(([key, value]) => {
    const type = Object.prototype.toString.call(value);
    if (type === '[object Object]' && Object.keys(value).length) {
      deepAssign(target[key], value);
    } else {
      target[key] = value;
    }
  });
};

const freshState = clone(store.state);

beforeEach(() => {
  // Restore store state before each test
  deepAssign(store.state, clone(freshState));
});

export default {
  async checkToggler(Component, toggler, checker, featureId) {
    const wrapper = shallowMount(Component, { store });
    const valueBefore = checker();
    toggler(wrapper);
    const valueAfter = checker();
    expect(valueAfter).toEqual(!valueBefore);
    await this.expectBadge(featureId);
  },
  async resolveModal(type) {
    const config = store.getters['modal/config'];
    expect(config).toBeTruthy();
    expect(config.type).toEqual(type);
    config.resolve();
    await new Promise(resolve => setTimeout(resolve, 1));
  },
  getContextMenuItem(name) {
    return utils.someResult(store.state.contextMenu.items, item => item.name === name && item);
  },
  async resolveContextMenu(name) {
    const item = this.getContextMenuItem(name);
    expect(item).toBeTruthy();
    store.state.contextMenu.resolve(item);
    await new Promise(resolve => setTimeout(resolve, 1));
  },
  async expectBadge(featureId, isEarned = true) {
    await new Promise(resolve => setTimeout(resolve, 1));
    expect(store.getters['data/allBadges'].filter(badge => badge.featureId === featureId)[0]).toMatchObject({
      isEarned,
    });
  },
};
