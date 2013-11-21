Developer guide
===============

Getting started
---------------

### Pre-requisites

- [Git][1]
- [node.js/npm][2]
- [Grunt][3]
- [Bower][4]

### Before debugging

- Download development tools:

		npm install

- Download dependencies:

		bower install

- Serve **StackEdit** at `http://localhost/`:

		(export PORT=80 && node server.js)

- Run Chrome without application cache:

		chrome --disable-application-cache

- Run **StackEdit** in debug mode (serve original files instead of minified):

		http://localhost/?debug

### Add new dependencies

> **NOTE:** StackEdit uses [RequireJS][5] for asynchronous module definition ([AMD][6]).

- Install new dependencies using [Bower][7]:

		bower install <library> --save

- Add the new dependency to [RequireJS][8] configuration file (`main.js`):

		grunt bower

### Build/minify

	grunt
	
### Deploy

- on Heroku:

        heroku create
        heroku rename my-stackedit-instance
        git push heroku master

- in a Docker container:

        docker build -t my-stackedit-image .
        docker run -p 3000 my-stackedit-image

> **NOTE:** OAuth authorizations work out of the box for address http://localhost/ except for WordPress. To allow an other address, you have to add specific keys at the end of `constants.js` and eventually to set up specific proxies with the corresponding key/secret pairs ([WordPress Proxy][9], [Tumblr Proxy][10] and [Gatekeeper][11]).


Architecture
------------

![Architecture diagram][13]

The modules are loaded in the following order:

1. 3rd party libraries (jQuery, underscore.js...)
2. `Extension` class and objects
3. 

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
> **NOTE:** This is preferred over [jQuery's `.ready()`][17] because it ensures that all AMD modules are loaded by [RequireJS][18]).

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

The `eventMgr` module is responsible for receiving and dispatching events in **StackEdit**. The following functions of the `eventMgr` module will trigger events of the same name. Extensions can listen to these events by implementing functions with the same name. The function `addListener(eventName, callback)` of the `eventMgr` module can be used by any other module to listen to these events.


#### Core events:

- **`onReady()`**

    All the modules are loaded and the DOM is ready.
    
    > Triggered by the `core` module.
    
    > This is preferred over [jQuery's `.ready()`][39] because it ensures that all modules are loaded by [RequireJS][40].

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

- **`onAsyncRunning()`**

    Some asynchronous tasks have just started or stopped.
    - `isRunning`: true if started, false if stopped.
    
    >  Triggered by the `AsyncTask` module.

- **`onPeriodicRun()`**

    A hook that is called periodically (every 1 second if user is active).
    
    > Triggered by the `core` module.

- **`onLoadSettings()`**

    A hook that is called when the settings dialog has to be refreshed. Each extension that has configuration inputs in the settings dialog has to implement a listener for this event.
    
    > Triggered by the `core` module. Only `Extension` objects can handle this event.

- **`onSaveSettings(newConfig, event)`**

    A hook that is called when the settings dialog has to be validated. Each extension that has configuration is the settings dialog has to implement a listener for this event.
    - `newConfig`: the new configuration object, deduced from the settings dialog inputs.
    - `event`: the submit event object. `stopPropagation` has to be called in case of an error when parsing settings dialog inputs.
    
    > Triggered by the `core` module. Only `Extension` objects can handle this event.

- **`onInit()`**

    A hook allowing enabled extensions to initialize.
    
    > Triggered by the `eventMgr` module. Only `Extension` objects can handle this event.


#### Module creation events:

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


#### Operations on files:

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
    
- **`onTitleChanged()`**

    The content of a [`FileDescriptor`][52] object has been modified.
    


#### Operations on folders:
- `onFoldersChanged()`: 

#### Sync events:
- `onSyncRunning()`: 
- `onSyncSuccess()`: 
- `onSyncImportSuccess()`: 
- `onSyncExportSuccess()`: 
- `onSyncRemoved()`: 

#### Publish events:
- `onPublishRunning()`: 
- `onPublishSuccess()`: 
- `onNewPublishSuccess()`: 
- `onPublishRemoved()`: 

#### Operations on Layout:
- `onLayoutConfigure()`: 
- `onLayoutCreated()`: 
- `onLayoutResize()`: 
- `onCreateButton()`: 
- `onCreateEditorButton()`: 
- `onCreatePreviewButton()`: 

#### Operations on PageDown:
- `onPagedownConfigure()`: 
- `onSectionsCreated()`: 
- `onMarkdownTrim()`: 

#### Operation on ACE:
- `onAceCreated()`:





> Written with [StackEdit](https://stackedit.io/).


  [1]: http://git-scm.com/
  [2]: http://nodejs.org/
  [3]: http://gruntjs.com/
  [4]: http://bower.io/
  [5]: http://requirejs.org/ "RequireJS"
  [6]: http://en.wikipedia.org/wiki/Asynchronous_module_definition "Asynchronous module definition"
  [7]: http://bower.io/
  [8]: http://requirejs.org/ "RequireJS"
  [9]: https://github.com/benweet/stackedit-wordpress-proxy
  [10]: https://github.com/benweet/stackedit-tumblr-proxy
  [11]: https://github.com/prose/gatekeeper
  [12]: http://benweet.github.io/stackedit/doc/img/architecture.png "Architecture diagram"
  [13]: https://lh6.googleusercontent.com/-sr6zRtyaoUk/Un5qSakOzPI/AAAAAAAAFC0/oI5If5fI9Gw/s0/StackEdit%252520architecture%252520-%252520New%252520Page%252520%2525283%252529.png "StackEdit architecture"
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