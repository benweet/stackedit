define([
    "underscore",
    "utils",
    "storage",
    "ace/range"
], function(_, utils, storage, range) {
    var Range = range.Range;

    function FileDescriptor(fileIndex, title, syncLocations, publishLocations) {
        this.fileIndex = fileIndex;
        this._title = title || storage[fileIndex + ".title"];
        this._editorScrollTop = parseInt(storage[fileIndex + ".editorScrollTop"]) || 0;
        this._editorSelectRange = (function() {
            try {
                var rangeComponents = storage[fileIndex + ".editorSelectRange"].split(';');
                rangeComponents = _.map(rangeComponents, function(component) {
                    return parseInt(component);
                });
                return new Range(rangeComponents[0], rangeComponents[1], rangeComponents[2], rangeComponents[3]);
            }
            catch(e) {
                return new Range(0, 0, 0, 0);
            }
        })();
        this._editorEnd = parseInt(storage[fileIndex + ".editorEnd"]) || 0;
        this._previewScrollTop = parseInt(storage[fileIndex + ".previewScrollTop"]) || 0;
        this._selectTime = parseInt(storage[fileIndex + ".selectTime"]) || 0;
        this.syncLocations = syncLocations || {};
        this.publishLocations = publishLocations || {};
        Object.defineProperty(this, 'title', {
            get: function() {
                return this._title;
            },
            set: function(title) {
                this._title = title;
                storage[this.fileIndex + ".title"] = title;
            }
        });
        Object.defineProperty(this, 'content', {
            get: function() {
                return storage[this.fileIndex + ".content"];
            },
            set: function(content) {
                storage[this.fileIndex + ".content"] = content;
            }
        });
        Object.defineProperty(this, 'editorScrollTop', {
            get: function() {
                return this._editorScrollTop;
            },
            set: function(editorScrollTop) {
                this._editorScrollTop = editorScrollTop;
                storage[this.fileIndex + ".editorScrollTop"] = editorScrollTop;
            }
        });
        Object.defineProperty(this, 'editorSelectRange', {
            get: function() {
                return this._editorSelectRange;
            },
            set: function(range) {
                this._editorSelectRange = range;
                storage[this.fileIndex + ".editorSelectRange"] = [
                    range.start.row,
                    range.start.column,
                    range.end.row,
                    range.end.column
                ].join(';');
            }
        });
        Object.defineProperty(this, 'previewScrollTop', {
            get: function() {
                return this._previewScrollTop;
            },
            set: function(previewScrollTop) {
                this._previewScrollTop = previewScrollTop;
                storage[this.fileIndex + ".previewScrollTop"] = previewScrollTop;
            }
        });
        Object.defineProperty(this, 'selectTime', {
            get: function() {
                return this._selectTime;
            },
            set: function(selectTime) {
                this._selectTime = selectTime;
                storage[this.fileIndex + ".selectTime"] = selectTime;
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
        storage.removeItem(syncAttributes.syncIndex);
    };

    FileDescriptor.prototype.addPublishLocation = function(publishAttributes) {
        utils.storeAttributes(publishAttributes);
        utils.appendIndexToArray(this.fileIndex + ".publish", publishAttributes.publishIndex);
        this.publishLocations[publishAttributes.publishIndex] = publishAttributes;
    };

    FileDescriptor.prototype.removePublishLocation = function(publishAttributes) {
        utils.removeIndexFromArray(this.fileIndex + ".publish", publishAttributes.publishIndex);
        delete this.publishLocations[publishAttributes.publishIndex];
        storage.removeItem(publishAttributes.publishIndex);
    };

    FileDescriptor.prototype.composeTitle = function() {
        var result = [];
        _.chain(this.syncLocations).sortBy(function(attributes) {
            return attributes.provider.providerId;
        }).each(function(attributes) {
            var classes = 'icon-provider-' + attributes.provider.providerId;
            attributes.isRealtime === true && (classes += ' realtime');
            result.push('<i class="' + classes + '"></i>');
        });
        if(_.size(this.syncLocations) !== 0) {
            result.push('<i class="icon-refresh title-icon-category"></i>');
        }
        _.chain(this.publishLocations).sortBy(function(attributes) {
            return attributes.provider.providerId;
        }).each(function(attributes) {
            var classes = 'icon-provider-' + attributes.provider.providerId;
            attributes.isRealtime === true && (classes += ' realtime');
            result.push('<i class="' + classes + '"></i>');
        });
        if(_.size(this.publishLocations) !== 0) {
            result.push('<i class="icon-upload title-icon-category"></i>');
        }
        result.push(_.escape(this.title));
        return result.join('');
    };

    return FileDescriptor;
});