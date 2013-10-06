define([
    "underscore",
    "utils",
    "classes/FolderDescriptor",
    "storage",
], function(_, utils, FolderDescriptor) {
    var folderList = {};

    // Retrieve folder descriptors from localStorage
    _.each(utils.retrieveIndexArray("folder.list"), function(folderIndex) {
        folderList[folderIndex] = new FolderDescriptor(folderIndex);
    });

    return folderList;
});