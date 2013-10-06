define([
    "underscore",
    "utils",
    "ace/range"
], function(_, utils, range) {
    var Range = range.Range;

    function FileDescriptor(fileIndex, title, syncLocations, publishLocations) {
        this.fileIndex = fileIndex;
        this._title = title || localStorage[fileIndex + ".title"];
        this._editorScrollTop = parseInt(localStorage[fileIndex + ".editorScrollTop"]) || 0;
        this._editorSelectRange = (function() {
            try {
                var rangeComponents = localStorage[fileIndex + ".editorSelectRange"].split(';');
                rangeComponents = _.map(rangeComponents, function(component) {
                    return parseInt(component);
                });
                return new Range(rangeComponents[0], rangeComponents[1], rangeComponents[2], rangeComponents[3]);
            }
            catch(e) {
                return new Range(0, 0, 0, 0);
            }
        })();
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
        Object.defineProperty(this, 'editorSelectRange', {
            get: function() {
                return this._editorSelectRange;
            },
            set: function(range) {
                this._editorSelectRange = range;
                localStorage[this.fileIndex + ".editorSelectRange"] = [
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