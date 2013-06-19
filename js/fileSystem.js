// The fileSystem module is empty when created. It's filled by fileMgr when loading.
// syncLocations and publishLocations are respectively loaded by synchronizer and publisher. 
define([
    "underscore",
    "utils",
    "classes/FileDescriptor",
    "storage",
], function(_, utils, FileDescriptor) {
    var fileSystem = {};

    // Retrieve file descriptors from localStorage
    _.each(utils.retrieveIndexArray("file.list"), function(fileIndex) {
        fileSystem[fileIndex] = new FileDescriptor(fileIndex);
    });

    return fileSystem;
});