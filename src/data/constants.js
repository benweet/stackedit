const origin = `${window.location.protocol}//${window.location.host}`;

export default {
  cleanTrashAfter: 7 * 24 * 60 * 60 * 1000, // 7 days
  origin,
  types: [
    'contentState',
    'syncedContent',
    'content',
    'file',
    'folder',
    'data',
  ],
  localStorageDataIds: [
    'workspaces',
    'settings',
    'layoutSettings',
    'tokens',
    'badgeCreations',
  ],
  textMaxLength: 250000,
  defaultName: 'Untitled',
};
