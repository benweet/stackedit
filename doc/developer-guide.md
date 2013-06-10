Developer guide
===============


Architecture
------------

![Architecture diagram][1]


StackEdit uses [RequireJS][2] for asynchronous module definition (AMD). 

core
----

fileMgr
-------

synchronizer
------------

The `synchronizer` module is responsible for:

- creating a new local file from a sync location (import)
- creating a new sync location from a local file (export)
- running 2 ways synchronization (upload and download) for all sync locations

publisher
---------

The `publisher` module is responsible for:

- creating new publish locations
- updating existing publish locations

#### publishAttributes

A `publishAttributes` object is an object that describes a publish location
















> Written with [StackEdit](http://benweet.github.io/stackedit/).


  [1]: http://benweet.github.io/stackedit/doc/img/architecture.png "Architecture diagram"
  [2]: http://requirejs.org/