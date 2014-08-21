define([
    "underscore",
    "utils",
    "classes/FileDescriptor",
    "storage",
], function(_, utils, FileDescriptor, storage) {
    var fileSystem = {};

    // Retrieve file descriptors from localStorage
    utils.retrieveIndexArray("file.list").forEach(function(fileIndex) {
        fileSystem[fileIndex] = new FileDescriptor(fileIndex);
    });

    // Clean fields from deleted files in local storage
    Object.keys(storage).forEach(function(key) {
        var match = key.match(/(file\.\S+?)\.\S+/);
        if(match && !fileSystem.hasOwnProperty(match[1])) {
            storage.removeItem(key);
        }
    });

    return fileSystem;
});
