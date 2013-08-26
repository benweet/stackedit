define([
    "underscore",
    "utils",
    "fileSystem"
], function(_, utils, fileSystem) {

    function FolderDescriptor(folderIndex, name, fileList) {
        this.folderIndex = folderIndex;
        this._name = name || localStorage[folderIndex + ".name"];
        // Retrieve file list from localStorage
        this.fileList = {};
        _.each(utils.retrieveIndexArray(folderIndex + ".files"), function(fileIndex) {
            try {
                var fileDesc = fileSystem[fileIndex];
                fileDesc.folder = this;
                this.fileList[fileIndex] = fileDesc;
            }
            catch(e) {
                // localStorage can be corrupted
                // Remove file from folder
                utils.removeIndexFromArray(folderIndex + ".files", fileIndex);
            }
        }, this);
        Object.defineProperty(this, 'name', {
            get: function() {
                return this._name;
            },
            set: function(name) {
                this._name = name;
                localStorage[this.folderIndex + ".name"] = name;
            }
        });
    }

    FolderDescriptor.prototype.addFile = function(fileDesc) {
        fileDesc.folder = this;
        utils.appendIndexToArray(this.folderIndex + ".files", fileDesc.fileIndex);
        this.fileList[fileDesc.fileIndex] = fileDesc;
    };

    FolderDescriptor.prototype.removeFile = function(fileDesc) {
        fileDesc.folder = undefined;
        utils.removeIndexFromArray(this.folderIndex + ".files", fileDesc.fileIndex);
        delete this.fileList[fileDesc.fileIndex];
    };

    return FolderDescriptor;
});