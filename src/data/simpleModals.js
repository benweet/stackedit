const simpleModal = (contentHtml, rejectText, resolveText) => ({
  contentHtml: typeof contentHtml === 'function' ? contentHtml : () => contentHtml,
  rejectText,
  resolveText,
});

/* eslint sort-keys: "error" */
export default {
  commentDeletion: simpleModal(
    '<p>You are about to delete a comment. Are you sure?</p>',
    'No',
    'Yes, delete',
  ),
  discussionDeletion: simpleModal(
    '<p>You are about to delete a discussion. Are you sure?</p>',
    'No',
    'Yes, delete',
  ),
  fileRestoration: simpleModal(
    '<p>You are about to revert some changes. Are you sure?</p>',
    'No',
    'Yes, revert',
  ),
  folderDeletion: simpleModal(
    config => `<p>You are about to delete the folder <b>${config.item.name}</b>. Its files will be moved to Trash. Are you sure?</p>`,
    'No',
    'Yes, delete',
  ),
  pathConflict: simpleModal(
    config => `<p><b>${config.item.name}</b> already exists. Do you want to add a suffix?</p>`,
    'No',
    'Yes, add suffix',
  ),
  removeWorkspace: simpleModal(
    '<p>You are about to remove a workspace locally. Are you sure?</p>',
    'No',
    'Yes, remove',
  ),
  reset: simpleModal(
    '<p>This will clean all your workspaces locally. Are you sure?</p>',
    'No',
    'Yes, clean',
  ),
  stripName: simpleModal(
    config => `<p><b>${config.item.name}</b> contains illegal characters. Do you want to strip them?</p>`,
    'No',
    'Yes, strip',
  ),
  tempFileDeletion: simpleModal(
    config => `<p>You are about to permanently delete the temporary file <b>${config.item.name}</b>. Are you sure?</p>`,
    'No',
    'Yes, delete',
  ),
  tempFolderDeletion: simpleModal(
    '<p>You are about to permanently delete all the temporary files. Are you sure?</p>',
    'No',
    'Yes, delete all',
  ),
  trashDeletion: simpleModal(
    '<p>Files in the trash are automatically deleted after 7 days of inactivity.</p>',
    'Ok',
  ),
  unauthorizedName: simpleModal(
    config => `<p><b>${config.item.name}</b> is an unauthorized name.</p>`,
    'Ok',
  ),
};
