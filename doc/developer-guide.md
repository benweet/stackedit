Developer guide
===============

Getting started
---------------

#### Pre-requisites

- [Git][1]
- [node.js/npm][2]
- [Grunt][3]
- [Bower][4]

#### Before debugging

- Download development tools:

		npm install

- Download dependencies:

		bower install

- To serve **StackEdit** in http://localhost/stackedit, add something like this in `httpd.conf`:

		Alias /stackedit /Users/benweet/workspace/stackedit 

		<Directory /Users/benweet/workspace/stackedit>
		    Options Indexes FollowSymLinks MultiViews
		    AllowOverride None
		    Order allow,deny
		    Allow from all
		</Directory>

- Open Chrome without application cache:

		chrome --disable-application-cache

- Run **StackEdit** in debug mode (serve original files instead of minified):

		http://localhost/stackedit/?debug

#### Add new dependencies

**NOTE:** StackEdit uses [RequireJS][6] for asynchronous module definition ([AMD][7]).

- Install new dependencies using [Bower][4]:

		bower install <library> --save

- Add the new dependency to [RequireJS][6] configuration file (`main.js`):

		grunt bower

#### Build/minify

	grunt


Architecture
------------

![Architecture diagram][5]


----------


### core

The `core` module is responsible for:

- creating the [UI Layout][10],
- creating the [PageDown][11] editor,
- loading/saving the settings,
- running periodic tasks,
- detecting the user activity,
- checking the offline status.

**Attributes:**

- `isOffline`: indicates the offline status of the application.

**Methods:**

- `onReady(callback)`: sets a callback to be called when all modules have been loaded and the DOM is ready.
> **NOTE:** This is preferred over [jQuery's `.ready()`][12] because it ensures that all AMD modules are loaded by [RequireJS][13]).

- `runPeriodically(callback)`: sets a callback to be called every second.
> **NOTE:** The callback will not run if the user is inactive or in StackEdit Viewer. User is considered inactive after 5 minutes of inactivity (mouse or keyboard).

- `setOffline()`: can be called by any other modules when a network timeout occurs for instance.
> **NOTE:** the offline status is also set by detecting the window `offline` event. `core.isOffline` is automatically set to `false` when the network is recovered.

- `initEditor(fileDesc)`: creates or refreshes the [PageDown][14] editor with a given [`FileDescriptor`][15] object.


----------


### fileMgr

The `fileMgr` module is responsible for:

- creating and deleting local files
- switching from one file to another

**Attributes:**

- `currentFile`: the [`FileDescriptor`][16] object that is currently edited.

**Methods:**

- `createFile(title, content)`: creates a [`FileDescriptor`][17] object, add it in the [`fileSystem`][18] map and returns it.
- `deleteFile(fileDesc)`: deletes a [`FileDescriptor`][19] object from the [`fileSystem`][20] map.
- `selectFile(fileDesc)`: selects a [`FileDescriptor`][21] object for editing.


#### FileDescriptor

The `FileDescriptor` class represents a local file. A `FileDescriptor` object has the following properties:

- `fileIndex`: the unique string index of the file in the file system
- `title`: the title of the document
- `content`: the content of the document
- `syncLocations`: a map containing all the associated [`syncAttributes`][22] objects with their `syncIndex` as a key
- `publishLocations`: a map containing all the associated [`publishAttributes`][23] objects with their `publishIndex` as a key

And the following methods:

- `addSyncLocation(syncAttributes)`: associates a [`syncAttributes`][24] object with the file
- `removeSyncLocation(syncAttributes)`: unassociates a [`syncAttributes`][25] object with the file
- `addPublishLocation(publishAttributes)`: associates a [`publishAttributes`][26] object with the file
- `removePublishLocation(publishAttributes)`: unassociates a [`publishAttributes`][27] object with the file

#### fileSystem

The `fileSystem` module is a map containing all the [`FileDescriptor`][28] objects with their `fileIndex` as a key.


----------


### synchronizer

The `synchronizer` module is responsible for:

- creating a new local file from a sync location (import)
- creating a new sync location from a local file (export)
- running 2 ways synchronization (upload and download) for all sync locations

#### synchronizer's providers

A [`provider`][29] module can be associated with the `synchronizer` module if it implements the following functions:

- `importFiles()`: downloads one or multiple files and create local files associated with the sync locations
- `exportFile()`: uploads a local file to a new sync location
- `syncDown()`: performs a download of all the changes operated on all sync locations
- `syncUp()`: performs an upload of a change to a sync location

#### syncAttributes

A `syncAttributes` object is an object that describes a sync location. Attributes differ from one provider to another except for the following:

- `syncIndex`: the unique string index of the publish location
- `provider`: the [`provider`][30] module that handles the sync location


----------


### publisher

The `publisher` module is responsible for:

- creating new publish locations
- updating existing publish locations

#### publisher's providers

A [`provider`][31] module can be associated with the `publisher` module if it implements the following functions:

- `newPublishAttributes()`: returns a new [`publishAttributes`][32] object in order to create a new publish location
- `publish()`: performs publishing of one publish location

#### publishAttributes

A `publishAttributes` object is an object that describes a publish location. Attributes differ from one provider to another except for the following:

- `publishIndex`: the unique string index of the publish location
- `provider`: the [`provider`][33] module that handles the publish location
- `format`: the publishing format for the publish location. It can be:
	- `markdown` for Markdown format
	- `html` for HTML format
	- `template` for template format


----------


### provider






> Written with [StackEdit](http://benweet.github.io/stackedit/).


  [1]: http://git-scm.com/
  [2]: http://nodejs.org/
  [3]: http://gruntjs.com/
  [4]: http://bower.io/
  [5]: http://benweet.github.io/stackedit/doc/img/architecture.png "Architecture diagram"
  [6]: http://requirejs.org/ "RequireJS"
  [7]: http://en.wikipedia.org/wiki/Asynchronous_module_definition "Asynchronous module definition"
  [8]: http://jquery.com/
  [9]: http://underscorejs.org/
  [10]: http://layout.jquery-dev.net/ "UI Layout"
  [11]: https://code.google.com/p/pagedown/ "PageDown"
  [12]: http://api.jquery.com/ready/
  [13]: http://requirejs.org/ "RequireJS"
  [14]: https://code.google.com/p/pagedown/ "PageDown"
  [15]: #filedescriptor
  [16]: #filedescriptor
  [17]: #filedescriptor
  [18]: #filesystem
  [19]: #filedescriptor
  [20]: #filesystem
  [21]: #filedescriptor
  [22]: #syncattributes
  [23]: #publishattributes
  [24]: #syncattributes
  [25]: #syncattributes
  [26]: #publishattributes
  [27]: #publishattributes
  [28]: #filedescriptor
  [29]: #provider
  [30]: #provider
  [31]: #provider
  [32]: #publishattributes
  [33]: #provider