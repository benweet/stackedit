StackEdit
=========

StackEdit is a full-featured, open-source Markdown editor based on PageDown, the Markdown library used by Stack Overflow and the other Stack Exchange sites.

Main showcase: https://stackedit.io/.

This version
============

Minimal client-side part of Stackedit.

This branch removes all server-side parts, and special code for handling www.stackedit.io, google analytics, and more.

The goal is that this should provide a clean split-panel editor without extra bells and whistles.

* [ ] Remove server-side part
* [x] Remove chrome extension/app
* [x] Remove google analytics
* [ ] remove special edge-case syntax handling of markdown
  - [x] remove mathjax
  - [ ] remove flowchart/uml
* [ ] Remove extra css stylesheets, there is only need for one stylesheet here
* [ ] Remove all settings and provide some decent defaults.
* [x] Remove monetizeJs
* [ ] Remove all third-party integration points:
  - [x] twitter
  - [x] google drive
  - [x] picasa
  - [ ] github
  - [x] couchdb
  - [x] dropbox
  - [x] blogger
  - [x] google+
  - [x] tumblr
  - [x] wordpress


All of this functionality is provided in the full version of Stackedit. This branch can easily be extended to provide just the features you need for a specific project.

If you want the full version of stackedit, with all the functionality listed above, please go to https://stackedit.io



Support StackEdit:

[![](https://cdn.monetizejs.com/resources/button-32.png)](https://monetizejs.com/authorize?client_id=ESTHdCYOi18iLhhO&summary=true)

> **Note:**
>
> - Documents are stored in the [browser's local storage][1], which means they are not shared between different browsers/computers. Clearing your browser's data may delete all your local documents.
> - Full access to Dropbox or Google Drive is required to be able to import any document in StackEdit. Imported documents are downloaded in your browser and are not transmitted to a server.

### StackEdit can:

 - Manage multiple Markdown documents online or offline
 - Export your documents in Markdown, HTML or PDF and format it using a template
 - Synchronize your Markdown documents in the Cloud
 - Edit existing Markdown documents from Google Drive, Dropbox and your local hard drive
 - Share a link to a Markdown document that renders it in a nice viewer
 - Show statistics about your document
 - Convert HTML to Markdown

### Features:

 - Real-time HTML preview with Scroll Link feature to bind editor and preview scrollbars
 - Markdown Extra/GitHub Flavored Markdown support and Prettify/Highlight.js syntax highlighting
 - LaTeX mathematical expressions using MathJax
 - WYSIWYG control buttons
 - Configurable layout
 - Theming support with different themes available
 - A la carte extensions
 - Offline editing

### Documentation:

 - [Hello! document][2]
 - [Developer guide][3]
 - [Theming guide][4]

> **NOTE:** This page has been written and published with [StackEdit][5].


  [1]: https://developer.mozilla.org/en-US/docs/Web/Guide/DOM/Storage#localStorage
  [2]: https://github.com/benweet/stackedit/blob/master/public/res/WELCOME.md#welcome-to-stackedit---welcome "Welcome document"
  [3]: https://github.com/benweet/stackedit/blob/master/doc/developer-guide.md#developer-guide "Developer guide"
  [4]: https://github.com/benweet/stackedit/blob/master/doc/theming.md#stackedit-theming-guide "Theming guide"
  [5]: https://stackedit.io/ "StackEdit"
