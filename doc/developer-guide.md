Developer guide
===============


----------


Architecture
------------

![Architecture diagram][1]


StackEdit uses [RequireJS][2] for asynchronous module definition ([AMD][3]). 


----------


### core

The `core` module is responsible for:

- creating the layout (using [UI Layout][4])
- creating the editor (using [PageDown][5])
- Loading/saving the settings
- detecting the offline status


----------


### fileMgr

The `fileMgr` module is responsible for:

- creating/deleting local files
- switching from one file to another
- setting/removing file's sync/publish location


----------


### synchronizer

The `synchronizer` module is responsible for:

- creating a new local file from a sync location (import)
- creating a new sync location from a local file (export)
- running 2 ways synchronization (upload and download) for all sync locations


----------


### publisher

The `publisher` module is responsible for:

- creating new publish locations
- updating existing publish locations

#### publisher's providers

A [`provider`][6] module can be associated with the `publisher` module if it implements the following functions:

- `newPublishAttributes()`: returns a new [`publishAttributes`][7] object in order to create a new publish location

- `publish()`: performs publishing of one publish location

#### publishAttributes

A `publishAttributes` object is an object that describes a publish location. Attributes list differs from one provider to another except for the following attributes:

- `publishIndex`: the unique index of the publish location
- `provider`: the [`provider`][6] module that handles the publish location
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
  [6]: #provider
  [7]: #publishattributes