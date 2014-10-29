define([
	"underscore",
	"utils",
	"storage",
], function(_, utils, storage) {

	function FileDescriptor(fileIndex, title, syncLocations, publishLocations) {
		this.fileIndex = fileIndex;
		this._title = title || storage[fileIndex + ".title"];
		this._editorScrollTop = parseInt(storage[fileIndex + ".editorScrollTop"]) || 0;
		this._editorStart = parseInt(storage[fileIndex + ".editorEnd"]) || 0;
		this._editorEnd = parseInt(storage[fileIndex + ".editorEnd"]) || 0;
		this._previewScrollTop = parseInt(storage[fileIndex + ".previewScrollTop"]) || 0;
		this._selectTime = parseInt(storage[fileIndex + ".selectTime"]) || 0;
		this._discussionList = JSON.parse(storage[fileIndex + ".discussionList"] || '{}');
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
		Object.defineProperty(this, 'editorStart', {
			get: function() {
				return this._editorStart;
			},
			set: function(editorStart) {
				this._editorStart = editorStart;
				storage[this.fileIndex + ".editorStart"] = editorStart;
			}
		});
		Object.defineProperty(this, 'editorEnd', {
			get: function() {
				return this._editorEnd;
			},
			set: function(editorEnd) {
				this._editorEnd = editorEnd;
				storage[this.fileIndex + ".editorEnd"] = editorEnd;
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
		Object.defineProperty(this, 'discussionList', {
			get: function() {
				return this._discussionList;
			},
			set: function(discussionList) {
				this._discussionList = discussionList;
				storage[this.fileIndex + ".discussionList"] = JSON.stringify(discussionList);
			}
		});
		Object.defineProperty(this, 'discussionListJSON', {
			get: function() {
				return storage[this.fileIndex + ".discussionList"] || '{}';
			},
			set: function(discussionList) {
				this._discussionList = JSON.parse(discussionList);
				storage[this.fileIndex + ".discussionList"] = discussionList;
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
	};

	FileDescriptor.prototype.addPublishLocation = function(publishAttributes) {
		utils.storeAttributes(publishAttributes);
		utils.appendIndexToArray(this.fileIndex + ".publish", publishAttributes.publishIndex);
		this.publishLocations[publishAttributes.publishIndex] = publishAttributes;
	};

	FileDescriptor.prototype.removePublishLocation = function(publishAttributes) {
		utils.removeIndexFromArray(this.fileIndex + ".publish", publishAttributes.publishIndex);
		delete this.publishLocations[publishAttributes.publishIndex];
	};

	function addIcon(result, attributes) {
		result.push('<i class="icon-provider-' + attributes.provider.providerId + '"></i>');
	}

	function addSyncIconWithLink(result, attributes) {
		if(attributes.provider.getSyncLocationLink) {
			var syncLocationLink = attributes.provider.getSyncLocationLink(attributes);
			result.push([
				'<a href="',
				syncLocationLink,
				'" target="_blank" title="Open in ',
				attributes.provider.providerName,
				'"><i class="icon-provider-',
				attributes.provider.providerId,
				'"></i><i class="icon-link-ext-alt"></i></a>'
			].join(''));
		}
		else {
			addIcon(result, attributes);
		}
	}

	function addPublishIconWithLink(result, attributes) {
		if(attributes.provider.getPublishLocationLink) {
			var publishLocationLink = attributes.provider.getPublishLocationLink(attributes);
			result.push([
				'<a href="',
				publishLocationLink,
				'" target="_blank" title="Open in ',
				attributes.provider.providerName,
				'"><i class="icon-provider-',
				attributes.provider.providerId,
				'"></i><i class="icon-link-ext-alt"></i></a>'
			].join(''));
		}
		else {
			addIcon(result, attributes);
		}
	}

	FileDescriptor.prototype.composeTitle = function(createLinks) {
		var result = [];
		var addSyncIcon = createLinks ? addSyncIconWithLink : addIcon;
		var addPublishIcon = createLinks ? addPublishIconWithLink : addIcon;
		_.chain(this.syncLocations).sortBy(function(attributes) {
			return attributes.provider.providerId;
		}).each(function(attributes) {
			addSyncIcon(result, attributes);
		});
		if(_.size(this.syncLocations) !== 0) {
			result.push('<i class="icon-refresh title-icon-category"></i>');
		}
		_.chain(this.publishLocations).sortBy(function(attributes) {
			return attributes.provider.providerId;
		}).each(function(attributes) {
			addPublishIcon(result, attributes);
		});
		if(_.size(this.publishLocations) !== 0) {
			result.push('<i class="icon-upload title-icon-category"></i>');
		}
		result.push(_.escape(this.title));
		return result.join('');
	};

	return FileDescriptor;
});
