class Feature {
  constructor(id, badgeName, description, children = null) {
    this.id = id;
    this.badgeName = badgeName;
    this.description = description;
    this.children = children;
  }

  toBadge(badgeCreations) {
    const children = this.children
      ? this.children.map(child => child.toBadge(badgeCreations))
      : null;
    return {
      featureId: this.id,
      name: this.badgeName,
      description: this.description,
      children,
      isEarned: children
        ? children.every(child => child.isEarned)
        : !!badgeCreations[this.id],
      hasSomeEarned: children && children.some(child => child.isEarned),
    };
  }
}

export default [
  new Feature(
    'navigationBar',
    'Nav bar expert',
    'Master the navigation bar by formatting some Markdown and renaming the current file.',
    [
      new Feature(
        'formatButtons',
        'Formatter',
        'Use the format buttons to change formatting in your Markdown file.',
      ),
      new Feature(
        'editCurrentFileName',
        'Renamer',
        'Use the name field in the navigation bar to rename the current file.',
      ),
      new Feature(
        'toggleExplorer',
        'Explorer toggler',
        'Use the navigation bar to toggle the explorer.',
      ),
      new Feature(
        'toggleSideBar',
        'Side bar toggler',
        'Use the navigation bar to toggle the side bar.',
      ),
    ],
  ),
  new Feature(
    'explorer',
    'Explorer',
    'Use the file explorer to manage files and folders in your workspace.',
    [
      new Feature(
        'createFile',
        'File creator',
        'Use the file explorer to create a new file in your workspace.',
      ),
      new Feature(
        'switchFile',
        'File switcher',
        'Use the file explorer to switch from one file to another in your workspace.',
      ),
      new Feature(
        'createFolder',
        'Folder creator',
        'Use the file explorer to create a new folder in your workspace.',
      ),
      new Feature(
        'moveFile',
        'File mover',
        'Drag a file in the file explorer to move it in another folder.',
      ),
      new Feature(
        'moveFolder',
        'Folder mover',
        'Drag a folder in the file explorer to move it in another folder.',
      ),
      new Feature(
        'renameFile',
        'File renamer',
        'Use the file explorer to rename a file in your workspace.',
      ),
      new Feature(
        'renameFolder',
        'Folder renamer',
        'Use the file explorer to rename a folder in your workspace.',
      ),
      new Feature(
        'removeFile',
        'File remover',
        'Use the file explorer to remove a file in your workspace.',
      ),
      new Feature(
        'removeFolder',
        'Folder remover',
        'Use the file explorer to remove a folder in your workspace.',
      ),
    ],
  ),
  new Feature(
    'buttonBar',
    'Button bar expert',
    'Use the button bar to customize the editor layout and to toggle features.',
    [
      new Feature(
        'toggleNavigationBar',
        'Navigation bar toggler',
        'Use the button bar to toggle the navigation bar.',
      ),
      new Feature(
        'toggleSidePreview',
        'Side preview toggler',
        'Use the button bar to toggle the side preview.',
      ),
      new Feature(
        'toggleEditor',
        'Editor toggler',
        'Use the button bar to toggle the editor.',
      ),
      new Feature(
        'toggleFocusMode',
        'Focused',
        'Use the button bar to toggle the focus mode. This mode keeps the caret vertically centered while typing.',
      ),
      new Feature(
        'toggleScrollSync',
        'Scroll sync toggler',
        'Use the button bar to toggle the scroll sync feature. This feature links the editor and the preview scrollbars.',
      ),
      new Feature(
        'toggleStatusBar',
        'Status bar toggler',
        'Use the button bar to toggle the status bar.',
      ),
    ],
  ),
  new Feature(
    'signIn',
    'Signed in',
    'Sign in with Google, sync your main workspace and unlock functionalities.',
    [
      new Feature(
        'syncMainWorkspace',
        'Main workspace synced',
        'Sign in with Google to sync your main workspace with your Google Drive app data folder.',
      ),
      new Feature(
        'sponsor',
        'Sponsor',
        'Sign in with Google and sponsor StackEdit to unlock PDF and Pandoc exports.',
      ),
    ],
  ),
  new Feature(
    'workspaces',
    'Workspace expert',
    'Use the workspace menu to create all kinds of workspaces and to manage them.',
    [
      new Feature(
        'addCouchdbWorkspace',
        'CouchDB workspace creator',
        'Use the workspace menu to create a CouchDB workspace.',
      ),
      new Feature(
        'addGithubWorkspace',
        'GitHub workspace creator',
        'Use the workspace menu to create a GitHub workspace.',
      ),
      new Feature(
        'addGitlabWorkspace',
        'GitLab workspace creator',
        'Use the workspace menu to create a GitLab workspace.',
      ),
      new Feature(
        'addGoogleDriveWorkspace',
        'Google Drive workspace creator',
        'Use the workspace menu to create a Google Drive workspace.',
      ),
      new Feature(
        'renameWorkspace',
        'Workspace renamer',
        'Use the "Manage workspaces" dialog to rename a workspace.',
      ),
      new Feature(
        'removeWorkspace',
        'Workspace remover',
        'Use the "Manage workspaces" dialog to remove a workspace locally.',
      ),
    ],
  ),
  new Feature(
    'manageAccounts',
    'Account manager',
    'Link all kinds of external accounts and use the "Accounts" dialog to manage them.',
    [
      new Feature(
        'addBloggerAccount',
        'Blogger user',
        'Link your Blogger account to StackEdit.',
      ),
      new Feature(
        'addDropboxAccount',
        'Dropbox user',
        'Link your Dropbox account to StackEdit.',
      ),
      new Feature(
        'addGitHubAccount',
        'GitHub user',
        'Link your GitHub account to StackEdit.',
      ),
      new Feature(
        'addGitLabAccount',
        'GitLab user',
        'Link your GitLab account to StackEdit.',
      ),
      new Feature(
        'addGoogleDriveAccount',
        'Google Drive user',
        'Link your Google Drive account to StackEdit.',
      ),
      new Feature(
        'addGooglePhotosAccount',
        'Google Photos user',
        'Link your Google Photos account to StackEdit.',
      ),
      new Feature(
        'addWordpressAccount',
        'WordPress user',
        'Link your WordPress account to StackEdit.',
      ),
      new Feature(
        'addZendeskAccount',
        'Zendesk user',
        'Link your Zendesk account to StackEdit.',
      ),
      new Feature(
        'removeAccount',
        'Revoker',
        'Use the "Accounts" dialog to remove access to an external account.',
      ),
    ],
  ),
  new Feature(
    'syncFiles',
    'File synchronizer',
    'Master the "Synchronize" menu by opening and saving files with all kinds of external accounts.',
    [
      new Feature(
        'openFromDropbox',
        'Dropbox reader',
        'Use the "Synchronize" menu to open a file from your Dropbox account.',
      ),
      new Feature(
        'saveOnDropbox',
        'Dropbox writer',
        'Use the "Synchronize" menu to save a file in your Dropbox account.',
      ),
      new Feature(
        'openFromGithub',
        'GitHub reader',
        'Use the "Synchronize" menu to open a file from a GitHub repository.',
      ),
      new Feature(
        'saveOnGithub',
        'GitHub writer',
        'Use the "Synchronize" menu to save a file in a GitHub repository.',
      ),
      new Feature(
        'saveOnGist',
        'Gist writer',
        'Use the "Synchronize" menu to save a file in a Gist.',
      ),
      new Feature(
        'openFromGitlab',
        'GitLab reader',
        'Use the "Synchronize" menu to open a file from a GitLab repository.',
      ),
      new Feature(
        'saveOnGitlab',
        'GitLab writer',
        'Use the "Synchronize" menu to save a file in a GitLab repository.',
      ),
      new Feature(
        'openFromGoogleDrive',
        'Google Drive reader',
        'Use the "Synchronize" menu to open a file from your Google Drive account.',
      ),
      new Feature(
        'saveOnGoogleDrive',
        'Google Drive writer',
        'Use the "Synchronize" menu to save a file in your Google Drive account.',
      ),
      new Feature(
        'triggerSync',
        'Sync trigger',
        'Use the "Synchronize" menu or the navigation bar to manually trigger synchronization.',
      ),
      new Feature(
        'syncMultipleLocations',
        'Multi-sync',
        'Use the "Synchronize" menu to synchronize a file with multiple external locations.',
      ),
      new Feature(
        'removeSyncLocation',
        'Desynchronizer',
        'Use the "File synchronization" dialog to remove a sync location.',
      ),
    ],
  ),
  new Feature(
    'publishFiles',
    'File publisher',
    'Master the "Publish" menu by publishing files to all kinds of external accounts.',
    [
      new Feature(
        'publishToBlogger',
        'Blogger publisher',
        'Use the "Publish" menu to publish a Blogger article.',
      ),
      new Feature(
        'publishToBloggerPage',
        'Blogger Page publisher',
        'Use the "Publish" menu to publish a Blogger page.',
      ),
      new Feature(
        'publishToDropbox',
        'Dropbox publisher',
        'Use the "Publish" menu to publish a file to your Dropbox account.',
      ),
      new Feature(
        'publishToGithub',
        'GitHub publisher',
        'Use the "Publish" menu to publish a file to a GitHub repository.',
      ),
      new Feature(
        'publishToGist',
        'Gist publisher',
        'Use the "Publish" menu to publish a file to a Gist.',
      ),
      new Feature(
        'publishToGitlab',
        'GitLab publisher',
        'Use the "Publish" menu to publish a file to a GitLab repository.',
      ),
      new Feature(
        'publishToGoogleDrive',
        'Google Drive publisher',
        'Use the "Publish" menu to publish a file to your Google Drive account.',
      ),
      new Feature(
        'publishToWordPress',
        'WordPress publisher',
        'Use the "Publish" menu to publish a WordPress article.',
      ),
      new Feature(
        'publishToZendesk',
        'Zendesk publisher',
        'Use the "Publish" menu to publish a Zendesk Help Center article.',
      ),
      new Feature(
        'triggerPublish',
        'Publication reviser',
        'Use the "Publish" menu or the navigation bar to manually update publications.',
      ),
      new Feature(
        'publishMultipleLocations',
        'Multi-publication',
        'Use the "Publish" menu to publish a file to multiple external locations.',
      ),
      new Feature(
        'removePublishLocation',
        'Unpublisher',
        'Use the "File publication" dialog to remove a publish location.',
      ),
    ],
  ),
  new Feature(
    'manageHistory',
    'Historian',
    'Use the "File history" menu to see version history and restore old versions of the current file.',
    [
      new Feature(
        'restoreVersion',
        'Restorer',
        'Use the "File history" menu to restore an old version of the current file.',
      ),
      new Feature(
        'chooseHistory',
        'History chooser',
        'Select a different history for a file that is synced with multiple external locations.',
      ),
    ],
  ),
  new Feature(
    'manageProperties',
    'Property expert',
    'Use the "File properties" dialog to change properties for the current file.',
    [
      new Feature(
        'setMetadata',
        'Metadata setter',
        'Use the "File properties" dialog to set metadata for the current file.',
      ),
      new Feature(
        'changePreset',
        'Preset changer',
        'Use the "File properties" dialog to change the Markdown engine preset.',
      ),
      new Feature(
        'changeExtension',
        'Extension expert',
        'Use the "File properties" dialog to enable, disable or configure Markdown engine extensions.',
      ),
    ],
  ),
  new Feature(
    'comment',
    'Comment expert',
    'Start and remove discussions, add and remove comments.',
    [
      new Feature(
        'createDiscussion',
        'Discussion starter',
        'Use the "comment" button to start a new discussion.',
      ),
      new Feature(
        'addComment',
        'Commenter',
        'Use the discussion gutter to add a comment to an existing discussion.',
      ),
      new Feature(
        'removeComment',
        'Moderator',
        'Use the discussion gutter to remove a comment in a discussion.',
      ),
      new Feature(
        'removeDiscussion',
        'Discussion closer',
        'Use the discussion gutter to remove a discussion.',
      ),
    ],
  ),
  new Feature(
    'importExport',
    'Import/export',
    'Use the "Import/export" menu to import and export files.',
    [
      new Feature(
        'importMarkdown',
        'Markdown importer',
        'Use the "Import/export" menu to import a Markdown file from disk.',
      ),
      new Feature(
        'exportMarkdown',
        'Markdown exporter',
        'Use the "Import/export" menu to export a Markdown file to disk.',
      ),
      new Feature(
        'importHtml',
        'HTML importer',
        'Use the "Import/export" menu to import an HTML file from disk and convert it to Markdown.',
      ),
      new Feature(
        'exportHtml',
        'HTML exporter',
        'Use the "Import/export" menu to export a file to disk as an HTML file using a Handlebars template.',
      ),
      new Feature(
        'exportPdf',
        'PDF exporter',
        'Use the "Import/export" menu to export a file to disk as a PDF file.',
      ),
      new Feature(
        'exportPandoc',
        'Pandoc exporter',
        'Use the "Import/export" menu to export a file to disk using Pandoc.',
      ),
    ],
  ),
  new Feature(
    'manageSettings',
    'Settings expert',
    'Use the "Settings" dialog to tweak the application behaviors and change keyboard shortcuts.',
    [
      new Feature(
        'changeSettings',
        'Tweaker',
        'Use the "Settings" dialog to tweak the application behaviors.',
      ),
      new Feature(
        'changeShortcuts',
        'Shortcut editor',
        'Use the "Settings" dialog to change keyboard shortcuts.',
      ),
    ],
  ),
  new Feature(
    'manageTemplates',
    'Template expert',
    'Use the "Templates" dialog to create, remove or modify Handlebars templates.',
    [
      new Feature(
        'addTemplate',
        'Template creator',
        'Use the "Templates" dialog to create a Handlebars template.',
      ),
      new Feature(
        'removeTemplate',
        'Template remover',
        'Use the "Templates" dialog to remove a Handlebars template.',
      ),
    ],
  ),
];
