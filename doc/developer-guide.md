Developer guide
===============




Architecture
------------

![Architecture diagram][1]

> **NOTE:**

> - StackEdit uses [RequireJS][2] for asynchronous module definition ([AMD][3]). 
> - [jQuery][4], [Underscore.js][5] or any other 3rd party libraries can be called from anywhere as long as they have been declared as module dependencies.


----------


### core

The `core` module is responsible for:

- creating the [UI Layout][6],
- creating the [PageDown][7] editor,
- loading/saving the settings,
- running periodic tasks,
- detecting the user activity,
- checking the offline status.

**Attributes:**

- `core.isOffline`: indicates the offline status of the application.

**Methods:**

- `core.onReady(callback)`: sets a callback to be called when all modules have been loaded and the DOM is ready.
> **NOTE:** This is preferred over [jQuery's `.ready()`][8] because it ensures that all AMD modules are loaded by [RequireJS][9]).

- `core.runPeriodically(callback)`: sets a callback to be called every second.
> **NOTE:** The callback will not run if the user is inactive or in StackEdit Viewer. User is considered inactive after 5 minutes of inactivity (mouse or keyboard).

- `core.setOffline()`: can be called by any other modules when a network timeout occurs for instance.
> **NOTE:** the offline status is also set by detecting the window `offline` event. `core.isOffline` is automatically set to `false` when the network is recovered.

- `core.initEditor(fileDesc)`: creates or refreshes the [PageDown][10] editor with a given [`FileDescriptor`][11] object.


----------


### fileMgr

The `fileMgr` module is responsible for:

- creating and deleting local files
- switching from one file to another

#### FileDescriptor

The `FileDescriptor` class represents a local file. A `FileDescriptor` object has the following properties:

- `fileIndex`: the unique string index of the file in the file system
- `title`: the title of the document
- `content`: the content of the document
- `syncLocations`: a map containing all the associated [`syncAttributes`][12] objects with their `syncIndex` as a key
- `publishLocations`: a map containing all the associated [`publishAttributes`][13] objects with their `publishIndex` as a key

And the following methods:

- `addSyncLocation(syncAttributes)`: associates a [`syncAttributes`][14] object with the file
- `removeSyncLocation(syncAttributes)`: unassociates a [`syncAttributes`][15] object with the file
- `addPublishLocation(publishAttributes)`: associates a [`publishAttributes`][16] object with the file
- `removePublishLocation(publishAttributes)`: unassociates a [`publishAttributes`][17] object with the file

#### fileSystem

The `fileSystem` module is a map containing all the [`FileDescriptor`][18] objects with their `fileIndex` as a key


----------


### synchronizer

The `synchronizer` module is responsible for:

- creating a new local file from a sync location (import)
- creating a new sync location from a local file (export)
- running 2 ways synchronization (upload and download) for all sync locations

#### synchronizer's providers

A [`provider`][19] module can be associated with the `synchronizer` module if it implements the following functions:

- `importFiles()`: downloads one or multiple files and create local files associated with the sync locations
- `exportFile()`: uploads a local file to a new sync location
- `syncDown()`: performs a download of all the changes operated on all sync locations
- `syncUp()`: performs an upload of a change to a sync location

#### syncAttributes

A `syncAttributes` object is an object that describes a sync location. Attributes differ from one provider to another except for the following:

- `syncIndex`: the unique string index of the publish location
- `provider`: the [`provider`][20] module that handles the sync location


----------


### publisher

The `publisher` module is responsible for:

- creating new publish locations
- updating existing publish locations

#### publisher's providers

A [`provider`][21] module can be associated with the `publisher` module if it implements the following functions:

- `newPublishAttributes()`: returns a new [`publishAttributes`][22] object in order to create a new publish location
- `publish()`: performs publishing of one publish location

#### publishAttributes

A `publishAttributes` object is an object that describes a publish location. Attributes differ from one provider to another except for the following:

- `publishIndex`: the unique string index of the publish location
- `provider`: the [`provider`][23] module that handles the publish location
- `format`: the publishing format for the publish location. It can be:
	- `markdown` for Markdown format
	- `html` for HTML format
	- `template` for template format


----------


### provider






> Written with [StackEdit](http://benweet.github.io/stackedit/).


  [1]: http://benweet.github.io/stackedit/doc/img/architecture.png "Architecture diagram"
  [2]: http://requirejs.org/ "RequireJS"
  [3]: http://en.wikipedia.org/wiki/Asynchronous_module_definition "Asynchronous module definition"
  [4]: http://jquery.com/
  [5]: http://underscorejs.org/
  [6]: http://layout.jquery-dev.net/ "UI Layout"
  [7]: https://code.google.com/p/pagedown/ "PageDown"
  [8]: http://api.jquery.com/ready/
  [9]: http://requirejs.org/ "RequireJS"
  [10]: https://code.google.com/p/pagedown/ "PageDown"
  [11]: #filedescriptor
  [12]: #syncattributes
  [13]: #publishattributes
  [14]: #syncattributes
  [15]: #syncattributes
  [16]: #publishattributes
  [17]: #publishattributes
  [18]: #filedescriptor
  [19]: #provider
  [20]: #provider
  [21]: #provider
  [22]: #publishattributes
  [23]: #provider