import { shallowMount } from '@vue/test-utils';
import ExplorerNode from '../../../../src/components/ExplorerNode';
import store from '../../../../src/store';
import workspaceSvc from '../../../../src/services/workspaceSvc';
import explorerSvc from '../../../../src/services/explorerSvc';
import specUtils from '../specUtils';

const makeFileNode = async () => {
  const file = await workspaceSvc.createFile({}, true);
  const node = store.getters['explorer/nodeMap'][file.id];
  expect(node.item.id).toEqual(file.id);
  return node;
};

const makeFolderNode = async () => {
  const folder = await workspaceSvc.storeItem({ type: 'folder' });
  const node = store.getters['explorer/nodeMap'][folder.id];
  expect(node.item.id).toEqual(folder.id);
  return node;
};

const mount = node => shallowMount(ExplorerNode, {
  store,
  propsData: { node, depth: 1 },
});
const mountAndSelect = (node) => {
  const wrapper = mount(node);
  wrapper.find('.explorer-node__item').trigger('click');
  expect(store.getters['explorer/selectedNode'].item.id).toEqual(node.item.id);
  expect(wrapper.classes()).toContain('explorer-node--selected');
  return wrapper;
};

const dragAndDrop = (sourceItem, targetItem) => {
  const sourceNode = store.getters['explorer/nodeMap'][sourceItem.id];
  mountAndSelect(sourceNode).find('.explorer-node__item').trigger('dragstart', {
    dataTransfer: { setData: () => {} },
  });
  expect(store.state.explorer.dragSourceId).toEqual(sourceItem.id);
  const targetNode = store.getters['explorer/nodeMap'][targetItem.id];
  const wrapper = mount(targetNode);
  wrapper.trigger('dragenter');
  expect(store.state.explorer.dragTargetId).toEqual(targetItem.id);
  wrapper.trigger('drop');
  const expectedParentId = targetItem.type === 'file' ? targetItem.parentId : targetItem.id;
  expect(store.getters['explorer/selectedNode'].item.parentId).toEqual(expectedParentId);
};

describe('ExplorerNode.vue', () => {
  const modifiedName = 'Name';

  it('should open file on select after a timeout', async () => {
    const node = await makeFileNode();
    mountAndSelect(node);
    expect(store.getters['file/current'].id).not.toEqual(node.item.id);
    await new Promise(resolve => setTimeout(resolve, 10));
    expect(store.getters['file/current'].id).toEqual(node.item.id);
    await specUtils.expectBadge('switchFile');
  });

  it('should not open already open file', async () => {
    const node = await makeFileNode();
    store.commit('file/setCurrentId', node.item.id);
    mountAndSelect(node);
    await new Promise(resolve => setTimeout(resolve, 10));
    expect(store.getters['file/current'].id).toEqual(node.item.id);
    await specUtils.expectBadge('switchFile', false);
  });

  it('should open folder on select after a timeout', async () => {
    const node = await makeFolderNode();
    const wrapper = mountAndSelect(node);
    expect(wrapper.classes()).not.toContain('explorer-node--open');
    await new Promise(resolve => setTimeout(resolve, 10));
    expect(wrapper.classes()).toContain('explorer-node--open');
  });

  it('should open folder on new child', async () => {
    const node = await makeFolderNode();
    const wrapper = mountAndSelect(node);
    // Close the folder
    wrapper.find('.explorer-node__item').trigger('click');
    await new Promise(resolve => setTimeout(resolve, 10));
    expect(wrapper.classes()).not.toContain('explorer-node--open');
    explorerSvc.newItem();
    expect(wrapper.classes()).toContain('explorer-node--open');
  });

  it('should create new file in a folder', async () => {
    const node = await makeFolderNode();
    const wrapper = mount(node);
    wrapper.trigger('contextmenu');
    await specUtils.resolveContextMenu('New file');
    expect(wrapper.contains('.explorer-node__new-child')).toBe(true);
    store.commit('explorer/setNewItemName', modifiedName);
    wrapper.find('.explorer-node__new-child .text-input').trigger('blur');
    await new Promise(resolve => setTimeout(resolve, 1));
    expect(store.getters['explorer/selectedNode'].item).toMatchObject({
      name: modifiedName,
      type: 'file',
      parentId: node.item.id,
    });
    expect(wrapper.contains('.explorer-node__new-child')).toBe(false);
    await specUtils.expectBadge('createFile');
  });

  it('should cancel file creation on escape', async () => {
    const node = await makeFolderNode();
    const wrapper = mount(node);
    wrapper.trigger('contextmenu');
    await specUtils.resolveContextMenu('New file');
    expect(wrapper.contains('.explorer-node__new-child')).toBe(true);
    store.commit('explorer/setNewItemName', modifiedName);
    wrapper.find('.explorer-node__new-child .text-input').trigger('keydown', {
      keyCode: 27,
    });
    await new Promise(resolve => setTimeout(resolve, 1));
    expect(store.getters['explorer/selectedNode'].item).not.toMatchObject({
      name: 'modifiedName',
      type: 'file',
      parentId: node.item.id,
    });
    expect(wrapper.contains('.explorer-node__new-child')).toBe(false);
    await specUtils.expectBadge('createFile', false);
  });

  it('should not create new file in a file', async () => {
    const node = await makeFileNode();
    mount(node).trigger('contextmenu');
    expect(specUtils.getContextMenuItem('New file').disabled).toBe(true);
  });

  it('should not create new file in the trash folder', async () => {
    const node = store.getters['explorer/nodeMap'].trash;
    mount(node).trigger('contextmenu');
    expect(specUtils.getContextMenuItem('New file').disabled).toBe(true);
  });

  it('should create new folder in folder', async () => {
    const node = await makeFolderNode();
    const wrapper = mount(node);
    wrapper.trigger('contextmenu');
    await specUtils.resolveContextMenu('New folder');
    expect(wrapper.contains('.explorer-node__new-child--folder')).toBe(true);
    store.commit('explorer/setNewItemName', modifiedName);
    wrapper.find('.explorer-node__new-child--folder .text-input').trigger('blur');
    await new Promise(resolve => setTimeout(resolve, 1));
    expect(store.getters['explorer/selectedNode'].item).toMatchObject({
      name: modifiedName,
      type: 'folder',
      parentId: node.item.id,
    });
    expect(wrapper.contains('.explorer-node__new-child--folder')).toBe(false);
    await specUtils.expectBadge('createFolder');
  });

  it('should cancel folder creation on escape', async () => {
    const node = await makeFolderNode();
    const wrapper = mount(node);
    wrapper.trigger('contextmenu');
    await specUtils.resolveContextMenu('New folder');
    expect(wrapper.contains('.explorer-node__new-child--folder')).toBe(true);
    store.commit('explorer/setNewItemName', modifiedName);
    wrapper.find('.explorer-node__new-child--folder .text-input').trigger('keydown', {
      keyCode: 27,
    });
    await new Promise(resolve => setTimeout(resolve, 1));
    expect(store.getters['explorer/selectedNode'].item).not.toMatchObject({
      name: modifiedName,
      type: 'folder',
      parentId: node.item.id,
    });
    expect(wrapper.contains('.explorer-node__new-child--folder')).toBe(false);
    await specUtils.expectBadge('createFolder', false);
  });

  it('should not create new folder in a file', async () => {
    const node = await makeFileNode();
    mount(node).trigger('contextmenu');
    expect(specUtils.getContextMenuItem('New folder').disabled).toBe(true);
  });

  it('should not create new folder in the trash folder', async () => {
    const node = store.getters['explorer/nodeMap'].trash;
    mount(node).trigger('contextmenu');
    expect(specUtils.getContextMenuItem('New folder').disabled).toBe(true);
  });

  it('should not create new folder in the temp folder', async () => {
    const node = store.getters['explorer/nodeMap'].temp;
    mount(node).trigger('contextmenu');
    expect(specUtils.getContextMenuItem('New folder').disabled).toBe(true);
  });

  it('should rename file', async () => {
    const node = await makeFileNode();
    const wrapper = mount(node);
    wrapper.trigger('contextmenu');
    await specUtils.resolveContextMenu('Rename');
    expect(wrapper.contains('.explorer-node__item-editor')).toBe(true);
    wrapper.setData({ editingValue: modifiedName });
    wrapper.find('.explorer-node__item-editor .text-input').trigger('blur');
    expect(store.getters['explorer/selectedNode'].item.name).toEqual(modifiedName);
    await specUtils.expectBadge('renameFile');
  });

  it('should cancel rename file on escape', async () => {
    const node = await makeFileNode();
    const wrapper = mount(node);
    wrapper.trigger('contextmenu');
    await specUtils.resolveContextMenu('Rename');
    expect(wrapper.contains('.explorer-node__item-editor')).toBe(true);
    wrapper.setData({ editingValue: modifiedName });
    wrapper.find('.explorer-node__item-editor .text-input').trigger('keydown', {
      keyCode: 27,
    });
    expect(store.getters['explorer/selectedNode'].item.name).not.toEqual(modifiedName);
    await specUtils.expectBadge('renameFile', false);
  });

  it('should rename folder', async () => {
    const node = await makeFolderNode();
    const wrapper = mount(node);
    wrapper.trigger('contextmenu');
    await specUtils.resolveContextMenu('Rename');
    expect(wrapper.contains('.explorer-node__item-editor')).toBe(true);
    wrapper.setData({ editingValue: modifiedName });
    wrapper.find('.explorer-node__item-editor .text-input').trigger('blur');
    expect(store.getters['explorer/selectedNode'].item.name).toEqual(modifiedName);
    await specUtils.expectBadge('renameFolder');
  });

  it('should cancel rename folder on escape', async () => {
    const node = await makeFolderNode();
    const wrapper = mount(node);
    wrapper.trigger('contextmenu');
    await specUtils.resolveContextMenu('Rename');
    expect(wrapper.contains('.explorer-node__item-editor')).toBe(true);
    wrapper.setData({ editingValue: modifiedName });
    wrapper.find('.explorer-node__item-editor .text-input').trigger('keydown', {
      keyCode: 27,
    });
    expect(store.getters['explorer/selectedNode'].item.name).not.toEqual(modifiedName);
    await specUtils.expectBadge('renameFolder', false);
  });

  it('should not rename the trash folder', async () => {
    const node = store.getters['explorer/nodeMap'].trash;
    mount(node).trigger('contextmenu');
    expect(specUtils.getContextMenuItem('Rename').disabled).toBe(true);
  });

  it('should not rename the temp folder', async () => {
    const node = store.getters['explorer/nodeMap'].temp;
    mount(node).trigger('contextmenu');
    expect(specUtils.getContextMenuItem('Rename').disabled).toBe(true);
  });

  it('should move file into a folder', async () => {
    const sourceItem = await workspaceSvc.createFile({}, true);
    const targetItem = await workspaceSvc.storeItem({ type: 'folder' });
    dragAndDrop(sourceItem, targetItem);
    await specUtils.expectBadge('moveFile');
  });

  it('should move folder into a folder', async () => {
    const sourceItem = await workspaceSvc.storeItem({ type: 'folder' });
    const targetItem = await workspaceSvc.storeItem({ type: 'folder' });
    dragAndDrop(sourceItem, targetItem);
    await specUtils.expectBadge('moveFolder');
  });

  it('should move file into a file parent folder', async () => {
    const targetItem = await workspaceSvc.storeItem({ type: 'folder' });
    const file = await workspaceSvc.createFile({ parentId: targetItem.id }, true);
    const sourceItem = await workspaceSvc.createFile({}, true);
    dragAndDrop(sourceItem, file);
    await specUtils.expectBadge('moveFile');
  });

  it('should not move the trash folder', async () => {
    const sourceNode = store.getters['explorer/nodeMap'].trash;
    mountAndSelect(sourceNode).find('.explorer-node__item').trigger('dragstart');
    expect(store.state.explorer.dragSourceId).not.toEqual('trash');
  });

  it('should not move the temp folder', async () => {
    const sourceNode = store.getters['explorer/nodeMap'].temp;
    mountAndSelect(sourceNode).find('.explorer-node__item').trigger('dragstart');
    expect(store.state.explorer.dragSourceId).not.toEqual('temp');
  });

  it('should not move file to the temp folder', async () => {
    const targetNode = store.getters['explorer/nodeMap'].temp;
    const wrapper = mount(targetNode);
    wrapper.trigger('dragenter');
    expect(store.state.explorer.dragTargetId).not.toEqual('temp');
  });

  it('should not move file to a file in the temp folder', async () => {
    const file = await workspaceSvc.createFile({ parentId: 'temp' }, true);
    const targetNode = store.getters['explorer/nodeMap'][file.id];
    const wrapper = mount(targetNode);
    wrapper.trigger('dragenter');
    expect(store.state.explorer.dragTargetId).not.toEqual(file.id);
  });
});
