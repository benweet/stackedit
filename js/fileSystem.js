// The fileSystem module is empty when created. It's filled by fileMgr when loading.
// syncLocations and publishLocations are respectively loaded by synchronizer and publisher. 
define([
    "utils",
    "classes/FileDescriptor",
    "storage",
], function(utils, FileDescriptor) {
    var fileSystem = {};

    // Retrieve file descriptors from localStorage and populate fileSystem
    _.each(utils.retrieveIndexArray("file.list"), function(fileIndex) {
        fileSystem[fileIndex] = new FileDescriptor(fileIndex, localStorage[fileIndex + ".title"]);
    });

    return fileSystem;
});