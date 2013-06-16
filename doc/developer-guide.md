Developer guide
===============




Architecture
------------

![Architecture diagram][1]


StackEdit uses [RequireJS][2] for asynchronous module definition ([AMD][3]). 


----------


### core

The `core` module is responsible for:

- creating the layout (using [UI Layout][4])
- creating the editor (using [PageDown][5])
- loading/saving the settings
- running period tasks
- detecting the user activity
- checking the offline status


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
- `syncLocations`: a map containing all the associated [`syncAttributes`][7] objects with their `syncIndex` as a key
- `publishLocations`: a map containing all the associated [`publishAttributes`][8] objects with their `publishIndex` as a key

And the following methods:

- `addSyncLocation(syncAttributes)`: associates a [`syncAttributes`][9] object with the file
- `removeSyncLocation(syncAttributes)`: unassociates a [`syncAttributes`][10] object with the file
- `addPublishLocation(publishAttributes)`: associates a [`publishAttributes`][11] object with the file
- `removePublishLocation(publishAttributes)`: unassociates a [`publishAttributes`][12] object with the file

#### fileSystem

The `fileSystem` module is a map containing all the [`FileDescriptor`][6] objects with their `fileIndex` as a key


----------


### synchronizer

The `synchronizer` module is responsible for:

- creating a new local file from a sync location (import)
- creating a new sync location from a local file (export)
- running 2 ways synchronization (upload and download) for all sync locations

#### synchronizer's providers

A [`provider`][13] module can be associated with the `synchronizer` module if it implements the following functions:

- `importFiles()`: downloads one or multiple files and create local files associated with the sync locations
- `exportFile()`: uploads a local file to a new sync location
- `syncDown()`: performs a download of all the changes operated on all sync locations
- `syncUp()`: performs an upload of a change to a sync location

#### syncAttributes

A `syncAttributes` object is an object that describes a sync location. Attributes differ from one provider to another except for the following:

- `syncIndex`: the unique string index of the publish location
- `provider`: the [`provider`][14] module that handles the sync location


----------


### publisher

The `publisher` module is responsible for:

- creating new publish locations
- updating existing publish locations

#### publisher's providers

A [`provider`][15] module can be associated with the `publisher` module if it implements the following functions:

- `newPublishAttributes()`: returns a new [`publishAttributes`][16] object in order to create a new publish location
- `publish()`: performs publishing of one publish location

#### publishAttributes

A `publishAttributes` object is an object that describes a publish location. Attributes differ from one provider to another except for the following:

- `publishIndex`: the unique string index of the publish location
- `provider`: the [`provider`][17] module that handles the publish location
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
  [4]: http://layout.jquery-dev.net/ "UI Layout"
  [5]: https://code.google.com/p/pagedown/ "PageDown"
  [6]: #filedescriptor
  [7]: #syncattributes
  [8]: #publishattributes
  [9]: #syncattributes
  [10]: #syncattributes
  [11]: #publishattributes
  [12]: #publishattributes
  [13]: #provider
  [14]: #provider
  [15]: #provider
  [16]: #publishattributes
  [17]: #provider