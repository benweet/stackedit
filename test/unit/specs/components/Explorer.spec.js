import { shallowMount } from '@vue/test-utils';
import Explorer from '../../../../src/components/Explorer';
import store from '../../../../src/store';
import workspaceSvc from '../../../../src/services/workspaceSvc';
import specUtils from '../specUtils';

const mount = () => shallowMount(Explorer, { store });
const select = (id) => {
  store.commit('explorer/setSelectedId', id);
  expect(store.getters['explorer/selectedNode'].item.id).toEqual(id);
};
const ensureExists = file => expect(store.getters.allItemsById).toHaveProperty(file.id);
const ensureNotExists = file => expect(store.getters.allItemsById).not.toHaveProperty(file.id);
const refreshItem = item => store.getters.allItemsById[item.id];

describe('Explorer.vue', () => {
  it('should create new file in the root folder', async () => {
    expect(store.state.explorer.newChildNode.isNil).toBeTruthy();
    const wrapper = mount();
    wrapper.find('.side-title__button--new-file').trigger('click');
    expect(store.state.explorer.newChildNode.isNil).toBeFalsy();
    expect(store.state.explorer.newChildNode.item).toMatchObject({
      type: 'file',
      parentId: null,
    });
  });

  it('should create new file in a folder', async () => {
    const folder = await workspaceSvc.storeItem({ type: 'folder' });
    const wrapper = mount();
    select(folder.id);
    wrapper.find('.side-title__button--new-file').trigger('click');
    expect(store.state.explorer.newChildNode.item).toMatchObject({
      type: 'file',
      parentId: folder.id,
    });
  });

  it('should not create new files in the trash folder', async () => {
    const wrapper = mount();
    select('trash');
    wrapper.find('.side-title__button--new-file').trigger('click');
    expect(store.state.explorer.newChildNode.item).toMatchObject({
      type: 'file',
      parentId: null,
    });
  });

  it('should create new folders in the root folder', async () => {
    expect(store.state.explorer.newChildNode.isNil).toBeTruthy();
    const wrapper = mount();
    wrapper.find('.side-title__button--new-folder').trigger('click');
    expect(store.state.explorer.newChildNode.isNil).toBeFalsy();
    expect(store.state.explorer.newChildNode.item).toMatchObject({
      type: 'folder',
      parentId: null,
    });
  });

  it('should create new folders in a folder', async () => {
    const folder = await workspaceSvc.storeItem({ type: 'folder' });
    const wrapper = mount();
    select(folder.id);
    wrapper.find('.side-title__button--new-folder').trigger('click');
    expect(store.state.explorer.newChildNode.item).toMatchObject({
      type: 'folder',
      parentId: folder.id,
    });
  });

  it('should not create new folders in the trash folder', async () => {
    const wrapper = mount();
    select('trash');
    wrapper.find('.side-title__button--new-folder').trigger('click');
    expect(store.state.explorer.newChildNode.item).toMatchObject({
      type: 'folder',
      parentId: null,
    });
  });

  it('should not create new folders in the temp folder', async () => {
    const wrapper = mount();
    select('temp');
    wrapper.find('.side-title__button--new-folder').trigger('click');
    expect(store.state.explorer.newChildNode.item).toMatchObject({
      type: 'folder',
      parentId: null,
    });
  });

  it('should move file to the trash folder on delete', async () => {
    const file = await workspaceSvc.createFile({}, true);
    expect(file.parentId).toEqual(null);
    const wrapper = mount();
    select(file.id);
    wrapper.find('.side-title__button--delete').trigger('click');
    ensureExists(file);
    expect(refreshItem(file).parentId).toEqual('trash');
    await specUtils.expectBadge('removeFile');
  });

  it('should not delete the trash folder', async () => {
    const wrapper = mount();
    select('trash');
    wrapper.find('.side-title__button--delete').trigger('click');
    await specUtils.resolveModal('trashDeletion');
    await specUtils.expectBadge('removeFile', false);
  });

  it('should not delete file in the trash folder', async () => {
    const file = await workspaceSvc.createFile({ parentId: 'trash' }, true);
    const wrapper = mount();
    select(file.id);
    wrapper.find('.side-title__button--delete').trigger('click');
    await specUtils.resolveModal('trashDeletion');
    ensureExists(file);
    await specUtils.expectBadge('removeFile', false);
  });

  it('should delete the temp folder after confirmation', async () => {
    const file = await workspaceSvc.createFile({ parentId: 'temp' }, true);
    const wrapper = mount();
    select('temp');
    wrapper.find('.side-title__button--delete').trigger('click');
    await specUtils.resolveModal('tempFolderDeletion');
    ensureNotExists(file);
    await specUtils.expectBadge('removeFolder');
  });

  it('should delete temp file after confirmation', async () => {
    const file = await workspaceSvc.createFile({ parentId: 'temp' }, true);
    const wrapper = mount();
    select(file.id);
    wrapper.find('.side-title__button--delete').trigger('click');
    ensureExists(file);
    await specUtils.resolveModal('tempFileDeletion');
    ensureNotExists(file);
    await specUtils.expectBadge('removeFile');
  });

  it('should delete folder after confirmation', async () => {
    const folder = await workspaceSvc.storeItem({ type: 'folder' });
    const file = await workspaceSvc.createFile({ parentId: folder.id }, true);
    const wrapper = mount();
    select(folder.id);
    wrapper.find('.side-title__button--delete').trigger('click');
    await specUtils.resolveModal('folderDeletion');
    ensureNotExists(folder);
    // Make sure file has been moved to Trash
    ensureExists(file);
    expect(refreshItem(file).parentId).toEqual('trash');
    await specUtils.expectBadge('removeFolder');
  });

  it('should rename file', async () => {
    const file = await workspaceSvc.createFile({}, true);
    const wrapper = mount();
    select(file.id);
    wrapper.find('.side-title__button--rename').trigger('click');
    expect(store.getters['explorer/editingNode'].item.id).toEqual(file.id);
  });

  it('should rename folder', async () => {
    const folder = await workspaceSvc.storeItem({ type: 'folder' });
    const wrapper = mount();
    select(folder.id);
    wrapper.find('.side-title__button--rename').trigger('click');
    expect(store.getters['explorer/editingNode'].item.id).toEqual(folder.id);
  });

  it('should not rename the trash folder', async () => {
    const wrapper = mount();
    select('trash');
    wrapper.find('.side-title__button--rename').trigger('click');
    expect(store.getters['explorer/editingNode'].isNil).toBeTruthy();
  });

  it('should not rename the temp folder', async () => {
    const wrapper = mount();
    select('temp');
    wrapper.find('.side-title__button--rename').trigger('click');
    expect(store.getters['explorer/editingNode'].isNil).toBeTruthy();
  });

  it('should close itself', async () => {
    store.dispatch('data/toggleExplorer', true);
    specUtils.checkToggler(
      Explorer,
      wrapper => wrapper.find('.side-title__button--close').trigger('click'),
      () => store.getters['data/layoutSettings'].showExplorer,
      'toggleExplorer',
    );
  });
});
