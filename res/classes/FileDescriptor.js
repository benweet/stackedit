define(["underscore", "utils"], function(_, utils) {

    function FileDescriptor(fileIndex, title, syncLocations, publishLocations) {
        this.fileIndex = fileIndex;
        this._title = title || localStorage[fileIndex + ".title"];
        this._editorScrollTop = parseInt(localStorage[fileIndex + ".editorScrollTop"]) || 0;
        this._editorStart = parseInt(localStorage[fileIndex + ".editorStart"]) || 0;
        this._editorEnd = parseInt(localStorage[fileIndex + ".editorEnd"]) || 0;
        this._previewScrollTop = parseInt(localStorage[fileIndex + ".previewScrollTop"]) || 0;
        this._selectTime = parseInt(localStorage[fileIndex + ".selectTime"]) || 0;
        this.syncLocations = syncLocations || {};
        this.publishLocations = publishLocations || {};
        Object.defineProperty(this, 'title', {
            get: function() {
                return this._title;
            },
            set: function(title) {
                this._title = title;
                localStorage[this.fileIndex + ".title"] = title;
            }
        });
        Object.defineProperty(this, 'content', {
            get: function() {
                return localStorage[this.fileIndex + ".content"];
            },
            set: function(content) {
                localStorage[this.fileIndex + ".content"] = content;
            }
        });
        Object.defineProperty(this, 'editorScrollTop', {
            get: function() {
                return this._editorScrollTop;
            },
            set: function(editorScrollTop) {
                this._editorScrollTop = editorScrollTop;
                localStorage[this.fileIndex + ".editorScrollTop"] = editorScrollTop;
            }
        });
        Object.defineProperty(this, 'editorStart', {
            get: function() {
                return this._editorStart;
            },
            set: function(editorStart) {
                this._editorStart = editorStart;
                localStorage[this.fileIndex + ".editorStart"] = editorStart;
            }
        });
        Object.defineProperty(this, 'editorEnd', {
            get: function() {
                return this._editorEnd;
            },
            set: function(editorEnd) {
                this._editorEnd = editorEnd;
                localStorage[this.fileIndex + ".editorEnd"] = editorEnd;
            }
        });
        Object.defineProperty(this, 'previewScrollTop', {
            get: function() {
                return this._previewScrollTop;
            },
            set: function(previewScrollTop) {
                this._previewScrollTop = previewScrollTop;
                localStorage[this.fileIndex + ".previewScrollTop"] = previewScrollTop;
            }
        });
        Object.defineProperty(this, 'selectTime', {
            get: function() {
                return this._selectTime;
            },
            set: function(selectTime) {
                this._selectTime = selectTime;
                localStorage[this.fileIndex + ".selectTime"] = selectTime;
            }
        });
    }
    
    FileDescriptor.prototype.addSyncLocation = function(syncAttributes) {
        utils.storeAttributes(syncAttributes);
        utils.appendIndexToArray(this.fileIndex + ".sync", syncAttributes.syncIndex);
        this.syncLocations[syncAttributes.syncIndex] = syncAttributes;
    };
    
    FileDescriptor.prototype.removeSyncLocation = function(syncAttributes) {
        utils.removeIndexFromArray(this.fileIndex + ".sync", syncAttributes.syncIndex);
        delete this.syncLocations[syncAttributes.syncIndex];
        localStorage.removeItem(syncAttributes.syncIndex);
    };
    
    FileDescriptor.prototype.addPublishLocation = function(publishAttributes) {
        utils.storeAttributes(publishAttributes);
        utils.appendIndexToArray(this.fileIndex + ".publish", publishAttributes.publishIndex);
        this.publishLocations[publishAttributes.publishIndex] = publishAttributes;
    };
    
    FileDescriptor.prototype.removePublishLocation = function(publishAttributes) {
        utils.removeIndexFromArray(this.fileIndex + ".publish", publishAttributes.publishIndex);
        delete this.publishLocations[publishAttributes.publishIndex];
        localStorage.removeItem(publishAttributes.publishIndex);
    };
    
    FileDescriptor.prototype.composeTitle = function() {
        var result = [];
        var syncAttributesList = _.values(this.syncLocations);
        var publishAttributesList = _.values(this.publishLocations);
        var attributesList = syncAttributesList.concat(publishAttributesList);
        _.chain(attributesList).sortBy(function(attributes) {
            return attributes.provider.providerId;
        }).each(function(attributes) {
            var classes = 'icon-provider-' + attributes.provider.providerId;
            if(attributes.isRealtime === true) {
                classes += ' realtime';
            }
            result.push('<i class="' + classes + '"></i>');
        });
        result.push(' ');
        result.push(this.title);
        return result.join('');
    };
    
    return FileDescriptor;
});