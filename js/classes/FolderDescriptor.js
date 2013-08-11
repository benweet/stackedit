define(["utils"], function(utils) {

    function FolderDescriptor(folderIndex, name, fileList) {
        this.folderIndex = folderIndex;
        this._name = name || localStorage[folderIndex + ".name"];
        this.fileList = fileList || {};
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
        utils.appendIndexToArray(this.folderIndex + ".files", fileDesc.fileIndex);
        this.fileList[fileDesc.fileIndex] = fileDesc;
    };
    
    FolderDescriptor.prototype.removeFile = function(fileDesc) {
        utils.removeIndexFromArray(this.folderIndex + ".files", fileDesc.fileIndex);
        delete this.fileList[fileDesc.fileIndex];
    };
    
    return FolderDescriptor;
});