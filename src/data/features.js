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
        'Use the button bar to toggle the focus mode.',
      ),
      new Feature(
        'toggleScrollSync',
        'Scroll sync toggler',
        'Use the button bar to toggle the scroll sync feature.',
      ),
      new Feature(
        'toggleStatusBar',
        'Status bar toggler',
        'Use the button bar to toggle the status bar.',
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
