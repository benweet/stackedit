define([
    "underscore",
    "extension-manager"
], function(_, extensionMgr) {
	
	var fileSystem = {};
	
	// Load file descriptors from localStorage
	_.chain(
		localStorage["file.list"].split(";")
	).compact().each(function(fileIndex) {
		fileSystem[fileIndex] = {
			fileIndex : fileIndex,
			title : localStorage[fileIndex + ".title"],
			syncLocations: {},
			publishLocations: {}
		};
	});
	extensionMgr.onFileSystemCreated(fileSystem);
	
	return fileSystem;
});