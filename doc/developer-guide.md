Developer guide
===============

Getting started
---------------

### Pre-requisites

- [Git][1]
- [node.js/npm][2]
- [Gulp][3]
- [Bower][4]

### Before debugging

- Download development tools:

		npm install

- Download dependencies:

		bower install

- Serve **StackEdit** at `http://localhost/`: 

		(export PORT=80 && node server.js)
  If on Windows, use
  
  		(set PORT=80 && node server.js)

- Run **StackEdit** in debug mode (no application cache, serve original files instead of minified):

		http://localhost/?debug

### Add new dependencies

> **NOTE:** StackEdit uses [RequireJS][5] for asynchronous module definition ([AMD][6]).

- Install new dependencies using [Bower][7]:

		bower install <library> --save

- Add the new dependency to [RequireJS][8] configuration file (`main.js`):

		gulp bower-requirejs

### Build/minify

	gulp
	
### Deploy

- on Heroku:

        heroku create my-stackedit-instance
        git push heroku master

- in a Docker container:

        docker build -t my-stackedit-image .
        docker run -p 3000 my-stackedit-image

> **NOTE:** OAuth authorizations work out of the box for address `http://localhost/` except for WordPress. To allow another address, you have to add specific keys at the end of `constants.js` and eventually to set up specific proxies with the corresponding key/secret pairs ([WordPress Proxy][9], [Tumblr Proxy][10] and [Gatekeeper][11]).


Architecture
------------

![Architecture diagram][12]

The modules are loaded by RequireJS in the following order:

1. The 3rd party libraries (jQuery, underscore.js...)
2. The `Extension` modules
3. The `eventMgr` module
4. The `core` module
5. The `fileMgr` module and the helpers modules
6. The `Provider` modules
7. The `publisher` and `synchronizer` modules

This is important to notice in order to avoid circular dependencies. For instance, if an `Extension` is declared with the `core` module as a dependency, RequireJS will inject `undefined` instead of the actual module.

Any module though can access any dependencies by implementing the proper [injection listener][13] provided by the `eventMgr`.

----------


### core

The `core` module is responsible for:

- creating the [UI Layout][14], the [ACE][15] editor and the [PageDown][16] editor,
- loading/saving the settings,
- running periodic tasks,
- detecting the user activity,
- checking the offline status.

**Attributes:**

- `isOffline`: indicates the offline status of the application.

**Methods:**

- `onReady(callback)`: sets a callback to be called when all modules have been loaded and the DOM is ready.
> **NOTE:** This is preferred over [jQuery's `.ready()`][17] because it ensures that all AMD modules are loaded by [RequireJS][18].

- `runPeriodically(callback)`: sets a callback to be called every second.
> **NOTE:** The callback will not run if the user is inactive or in StackEdit Viewer. User is considered inactive after 5 minutes of inactivity (mouse or keyboard).

- `setOffline()`: can be called by any other modules when a network timeout occurs for instance.
> **NOTE:** the offline status is also set by detecting the window `offline` event. `core.isOffline` is automatically set to `false` when the network is recovered.

- `initEditor(fileDesc)`: creates or refreshes the [PageDown][19] editor with a given [`FileDescriptor`][20] object.


----------


### fileMgr

The `fileMgr` module is responsible for:

- creating and deleting local files,
- switching from one file to another.

**Attributes:**

- `currentFile`: the [`FileDescriptor`][21] object that is currently edited.

**Methods:**

- `createFile(title, content)`: creates a [`FileDescriptor`][22] object, add it in the [`fileSystem`][23] map and returns it.
- `deleteFile(fileDesc)`: deletes a [`FileDescriptor`][24] object from the [`fileSystem`][25] map.
- `selectFile(fileDesc)`: selects a [`FileDescriptor`][26] object for editing.


#### FileDescriptor

The `FileDescriptor` class represents a local file. A `FileDescriptor` object has the following properties:

- `fileIndex`: the unique string index of the file in the file system.
- `title`: the title of the document.
- `content`: the content of the document.
- `syncLocations`: a map containing all the associated [`syncAttributes`][27] objects with their `syncIndex` as a key.
- `publishLocations`: a map containing all the associated [`publishAttributes`][28] objects with their `publishIndex` as a key.

And the following methods:

- `addSyncLocation(syncAttributes)`: associates a [`syncAttributes`][29] object with the file.
- `removeSyncLocation(syncAttributes)`: unassociates a [`syncAttributes`][30] object with the file.
- `addPublishLocation(publishAttributes)`: associates a [`publishAttributes`][31] object with the file.
- `removePublishLocation(publishAttributes)`: unassociates a [`publishAttributes`][32] object with the file.

#### fileSystem

The `fileSystem` module is a map containing all the [`FileDescriptor`][33] objects with their `fileIndex` as a key.


----------


### synchronizer

The `synchronizer` module is responsible for:

- creating a new local file from a sync location (import).
- creating a new sync location from a local file (export).
- running 2 ways synchronization (upload and download) for all sync locations.

#### synchronizer's providers

A [`provider`][34] module can be associated with the `synchronizer` module if it implements the following functions:

- `importFiles()`: downloads one or multiple files and create local files associated with the sync locations.
- `exportFile()`: uploads a local file to a new sync location.
- `syncDown()`: performs a download of all the changes operated on all sync locations.
- `syncUp()`: performs an upload of a change to a sync location.

#### syncAttributes

A `syncAttributes` object is an object that describes a sync location. Attributes differ from one provider to another except for the following:

- `syncIndex`: the unique string index of the publish location.
- `provider`: the [`provider`][35] module that handles the sync location.


----------


### publisher

The `publisher` module is responsible for:

- creating new publish locations,
- updating existing publish locations.

#### publisher's providers

A [`provider`][36] module can be associated with the `publisher` module if it implements the following functions:

- `newPublishAttributes()`: returns a new [`publishAttributes`][37] object in order to create a new publish location.
- `publish()`: performs publishing of one publish location.

#### publishAttributes

A `publishAttributes` object is an object that describes a publish location. Attributes differ from one provider to another except for the following:

- `publishIndex`: the unique string index of the publish location.
- `provider`: the [`provider`][38] module that handles the publish location.
- `format`: the publishing format for the publish location. It can be:
	- `markdown` for Markdown format.
	- `html` for HTML format.
	- `template` for template format.


----------


### eventMgr

The `eventMgr` module is responsible for receiving and dispatching events. Below is the list of all events signatures.

Most events (those that are not triggered by the `eventMgr` module) can be triggered by calling methods of the same name in the `eventMgr` module. For example:

```js
eventMgr.onMessage('StackEdit is awesome!');
```

The method `addListener(eventName, callback)` of the `eventMgr` module can be used to listen to these events (except those that can only be handled by `Extension` modules). For example:

```js
eventMgr.addListener('onMessage', function(message) {
    alert(message);
});
```

`Extension` modules have the possibility to listen to those events by implementing methods of the same name. For example:

```js
myExtension.onMessage = function(message) {
    alert(message);
};
```


----------

#### Core events

- **`onReady()`**

    All the modules are loaded and the DOM is ready.
    
    > Triggered by the `core` module.
    
    > This is preferred over [jQuery's `.ready()`][39] because it ensures that all modules have been loaded by RequireJS.

- **`onMessage(message)`**

    A message destined to the user has been produced.
    - `message`: the text string of the message.

- **`onError(error)`**

    An error has been thrown.
    - `error`: an error object or a string.

- **`onOfflineChanged(isOffline)`**

    The off-line status has changed.
    - `isOffline`: the off-line status.
    
    >  Triggered by the `core` module.

- **`onUserActive()`**

    The user has just moved the mouse or pressed the keyboard.
    
    > Triggered by the `core` module.

- **`onAsyncRunning(isRunning)`**

    Some asynchronous tasks have just started or stopped.
    - `isRunning`: true if started, false if stopped.
    
    > Triggered by the `AsyncTask` module.

- **`onPeriodicRun()`**

    A hook that is called periodically (every 1 second if user is active).
    
    > Triggered by the `core` module.

- **`onLoadSettings()`**

    A hook that is called when the settings dialog has to be refreshed. Every `Extension` module that has configuration inputs in the settings dialog has to implement a listener for this event.
    
    > Triggered by the `core` module. Only `Extension` modules can handle this event.

- **`onSaveSettings(newConfig, event)`**

    A hook that is called when the settings dialog has to be validated. Every `Extension` module that has configuration inputs in the settings dialog has to implement a listener for this event.
    - `newConfig`: the new configuration object, deduced from the settings dialog inputs.
    - `event`: the submit event object. `stopPropagation` has to be called in case of an error when parsing settings dialog inputs.
    
    > Triggered by the `core` module. Only `Extension` modules can handle this event.

- **`onInit()`**

    A hook allowing enabled extensions to initialize.
    
    > Triggered by the `eventMgr` module. Only `Extension` modules can handle this event.
    
    > This event is triggered before `onReady` event and just after the `config` and `enabled` extensions properties have been set by the `eventMgr`.


----------

#### Module injection events

- **`onFileMgrCreated(fileMgr)`**

    The `fileMgr` module has been created.
    - `fileMgr`: the `fileMgr` module.
    
    > Triggered by the `fileMgr` module.


- **`onSynchronizerCreated(synchronizer)`**

    The `synchronizer` module has been created.
    - `synchronizer`: the `synchronizer` module.
    
    > Triggered by the `synchronizer` module.

- **`onPublisherCreated(publisher)`**

    The `publisher` module has been created.
    - `publisher`: the `publisher` module.
    
    > Triggered by the `publisher` module.

- **`onEventMgrCreated()`**

    The `eventMgr` module has been created.
    - `eventMgr`: the `eventMgr` module.
    
    > Triggered by the `eventMgr` module.


----------

#### file operation events

- **`onFileCreated(fileDesc)`**

    A [`FileDescriptor`][41] object has been created.
    - `fileDesc`: the [`FileDescriptor`][42] object.
    
    > Triggered by the `fileMgr` module.

- **`onFileDeleted(fileDesc)`**

    A [`FileDescriptor`][43] object has been removed from the `fileSystem` module.
    - `fileDesc`: the [`FileDescriptor`][44] object.
    
    > Triggered by the `fileMgr` module.

- **`onFileSelected(fileDesc)`**

    A [`FileDescriptor`][45] object has been selected.
    - `fileDesc`: the [`FileDescriptor`][46] object.
    
    > Triggered by the `fileMgr` module. This event is triggered before `onFileClosed` (if another document is open) and `onFileOpen` events.

- **`onFileClosed(fileDesc)`**

    The current [`FileDescriptor`][47] object is about to be detached from the editor.
    - `fileDesc`: the [`FileDescriptor`][48] object.
    
    > Triggered by the `fileMgr` module. This event is triggered after `onFileSelected` event and before `onFileClosed` event.

- **`onFileOpen(fileDesc)`**

    The selected [`FileDescriptor`][49] object has been attached to the editor.
    - `fileDesc`: the [`FileDescriptor`][50] object.
    
    > Triggered by the `fileMgr` module. This event is triggered after `onFileSelected` and `onFileClosed` (if another document is open) events.

- **`onContentChanged(fileDesc)`**

    The content of a [`FileDescriptor`][51] object has been modified.
    - `fileDesc`: the [`FileDescriptor`][52] object.
    
- **`onTitleChanged(fileDesc)`**

    The content of a [`FileDescriptor`][53] object has been modified.
    - `fileDesc`: the [`FileDescriptor`][54] object.

- **`onFoldersChanged()`**

    The folders structure has changed.


----------

#### Sync events

- **`onSyncRunning(isRunning)`**

    A synchronization job has just started or stopped.
    - `isRunning`: true if started, false if stopped.
    
    > Triggered by the `synchronizer` module.
    
    > A synchronization job is the action to download and upload all detected changes for all sync locations of all documents.

- **`onSyncSuccess()`**

    A synchronization job has successfully finished.
    
    > Triggered by the `synchronizer` module.
    
    > A synchronization job is the action to download and upload all detected changes for all sync locations of all documents.
    
- **`onSyncImportSuccess(fileDescList, provider)`**

    The import of documents has successfully finished.
    - `fileDescList`: the list of [`FileDescriptor`][55] objects that have been created.
    - `provider`: the [`provider`][56] module that handled the import.
    
    > Triggered by the [`provider`][57] module that handled the import.
    
    > An import is the action to download multiple files and to create, for each, one [`FileDescriptor`][55] objects with one sync location.

- **`onSyncExportSuccess(fileDesc, syncAttributes)`**

    The export of one document has successfully finished.
    - `fileDesc`: the [`FileDescriptor`][58] object that has been exported.
    - `syncAttributes`: the descriptor object of the new sync location.
    
    > Triggered by the `synchronizer` module.
    
    > An export is the action to upload one file and to create one new sync location associated with one existing `FileDescriptor`][55] object.

- **`onSyncRemoved(fileDesc, syncAttributes)`**

    A sync location has been removed from a [`FileDescriptor`][59] object.
    - `fileDesc`: the [`FileDescriptor`][60] object.
    - `syncAttributes`: the descriptor object of the removed sync location.
    

----------

#### Publish events

- **`onPublishRunning(isRunning)`**

    A document publication job has just started or stopped.
    - `isRunning`: true if started, false if stopped.
    
    > Triggered by the `publisher` module.
    
    > A publication job is the action to upload changes on multiple publish locations associated with one `FileDescriptor`][55] object.

- **`onPublishSuccess(fileDesc)`**

    A document publication job has successfully finished.
    - `fileDesc`: the [`FileDescriptor`][60] object that has been published.
    
    > Triggered by the `publisher` module.
    
    > A publication job is the action to upload changes on multiple publish locations associated with one `FileDescriptor`][55] object.
    
- **`onNewPublishSuccess(fileDesc, publishAttributes)`**

    A new publish location has been successfully created.
    - `fileDesc`: the [`FileDescriptor`][60] object that has been published.
    - `publishAttributes`: the descriptor object of the new publish location.
    
    > Triggered by the `publisher` module.

- **`onPublishRemoved(fileDesc, publishAttributes)`**

    A publish location has been removed from a [`FileDescriptor`][59] object.
    - `fileDesc`: the [`FileDescriptor`][60] object.
    - `publishAttributes`: the descriptor object of the removed publish location.
    
    > Triggered by the `publisher` module.


----------

#### UI Layout events

- **`onLayoutConfigure(layoutConfig)`**

    The layout is about to be configured.
    - `layoutConfig`: the configuration object of the UI Layout library.
    
    > Triggered by the `core` module.

- **`onLayoutCreated(layout)`**

    The layout has just been created.
    - `layout`: the layout object of the UI Layout library.
    
    > Triggered by the `core` module.

- **`onLayoutResize(paneName)`**

    One pane of the layout has been resized.
    - `paneName`: the name of the resized layout pane.
    
    > Triggered by the `core` module.
    
- **`onCreateButton()`**

    Allows extensions to add their own buttons in the navigation bar. Implemented listeners have to return an HTML button element. For example:

        myExtension.onCreateButton = function() {
            var button = $('<button class="btn btn-success"><i class="icon-rocket"></i></button>');
            button.click(function() {
                eventMgr.onMessage('Booom!');
            });
            return button[0];
        };
    
    > Triggered by the `eventMgr` module. Only `Extension` modules can handle this event.

- **`onCreateEditorButton()`**

    Allows extensions to add their own buttons in the side bar. Implemented listeners have to return an HTML button element. See `onCreateButton` for a concrete example.
    
    > Triggered by the `eventMgr` module. Only `Extension` modules can handle this event.

- **`onCreatePreviewButton()`**

    Allows extensions to add their own buttons over the preview. Implemented listeners have to return an HTML button element. See `onCreateButton` for a concrete example.
    
    > Triggered by the `eventMgr` module. Only `Extension` modules can handle this event.


----------

#### PageDown events

- **`onPagedownConfigure(editor)`**

    The Pagedown editor is about to be created.
    - `editor`: the Pagedown editor object before `run` has been called.
    
    > Triggered by the `core` module.
    
- **`onAsyncPreview(callback)`**

    Called after Pagedown's synchronous rendering to trigger extra asynchronous rendering (such as MathJax). Implemented listeners have to call the callback parameter after processing in order other `onAsyncPreview` listeners to run.
    - `callback`: the callback to call at the end of the asynchronous processing.
    
    > Triggered by the `eventMgr` module. Only `Extension` modules can handle this event.
    
- **`onPreviewFinished(html)`**

    Called after every `onAsyncPreview` listeners have been called.
    - `html`: the finally rendered HTML.

- **`onSectionsCreated(sectionList)`**

    The Markdown has been split into sections before rendering.
    - `sectionList`: the list of section objects. Each section object contains:
        - `text`: the markdown substring contained in the section.
        - `textWithDelimiter`: the text with an added delimiter.
    
    > Triggered by the `markdownSectionParser` extension.

- **`onMarkdownTrim(offset)`**

    The Markdown has been left trimmed by a certain number of character.
    - `offset`: the number of characters that have been removed.
    
    > Triggered by the `yamlFrontMatterParser` extension.


----------

#### ACE events

- **`onAceCreated(aceEditor)`**

    The ACE editor has just been created.
    - `aceEditor`: the ACE editor object.
    
    > Triggered by the `core` module.



> Written with [StackEdit](https://stackedit.io/).


  [1]: http://git-scm.com/
  [2]: http://nodejs.org/
  [3]: http://gulpjs.com/
  [4]: http://bower.io/
  [5]: http://requirejs.org/ "RequireJS"
  [6]: http://en.wikipedia.org/wiki/Asynchronous_module_definition "Asynchronous module definition"
  [7]: http://bower.io/
  [8]: http://requirejs.org/ "RequireJS"
  [9]: https://github.com/benweet/stackedit-wordpress-proxy
  [10]: https://github.com/benweet/stackedit-tumblr-proxy
  [11]: https://github.com/prose/gatekeeper
  [12]: https://lh6.googleusercontent.com/-sr6zRtyaoUk/Un5qSakOzPI/AAAAAAAAFC0/oI5If5fI9Gw/s0/StackEdit%252520architecture%252520-%252520New%252520Page%252520%2525283%252529.png "StackEdit architecture"
  [13]: #module-injection
  [14]: http://layout.jquery-dev.net/ "UI Layout"
  [15]: http://ace.c9.io
  [16]: https://code.google.com/p/pagedown/ "PageDown"
  [17]: http://api.jquery.com/ready/
  [18]: http://requirejs.org/ "RequireJS"
  [19]: https://code.google.com/p/pagedown/ "PageDown"
  [20]: #filedescriptor
  [21]: #filedescriptor
  [22]: #filedescriptor
  [23]: #filesystem
  [24]: #filedescriptor
  [25]: #filesystem
  [26]: #filedescriptor
  [27]: #syncattributes
  [28]: #publishattributes
  [29]: #syncattributes
  [30]: #syncattributes
  [31]: #publishattributes
  [32]: #publishattributes
  [33]: #filedescriptor
  [34]: #provider
  [35]: #provider
  [36]: #provider
  [37]: #publishattributes
  [38]: #provider
  [39]: http://api.jquery.com/ready/
  [40]: http://requirejs.org/ "RequireJS"
  [41]: #filedescriptor
  [42]: #filedescriptor
  [43]: #filedescriptor
  [44]: #filedescriptor
  [45]: #filedescriptor
  [46]: #filedescriptor
  [47]: #filedescriptor
  [48]: #filedescriptor
  [49]: #filedescriptor
  [50]: #filedescriptor
  [51]: #filedescriptor
  [52]: #filedescriptor
  [53]: #filedescriptor
  [54]: #filedescriptor
  [55]: #filedescriptor
  [56]: #provider
  [57]: #provider
  [58]: #filedescriptor
  [59]: #filedescriptor
  [60]: #filedescriptor
