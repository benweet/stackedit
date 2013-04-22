define(["jquery", "core", "synchronizer", "publisher", "underscore"],
	function($, core, synchronizer, publisher) {

	var fileManager = {};

	// Defines the current file
	var currentFileIndex = localStorage["file.current"];
	fileManager.getCurrentFileIndex = function() {
		return currentFileIndex;
	};
	fileManager.isCurrentFileIndex = function(fileIndex) {
		return fileIndex == currentFileIndex;
	};
	fileManager.setCurrentFileIndex = function(fileIndex) {
		currentFileIndex = fileIndex;
		// Sanity check since we are going to modify current file in localStorage
		core.checkWindowUnique();
		if(fileIndex === undefined) {
			localStorage.removeItem("file.current");
		}
		else {
			localStorage["file.current"] = fileIndex;
		}
	};
	
	// Caution: this function recreate the editor (reset undo operations)
	var fileDescList = [];
	fileManager.selectFile = function(fileIndex) {
		// If no file create one
		if (localStorage["file.list"].length === 1) {
			fileIndex = this.createFile();
		}
		
		if(fileIndex !== undefined) {
			fileManager.setCurrentFileIndex(fileIndex);
		}

		// Update the file titles
		fileManager.updateFileTitles();
		synchronizer.refreshManageSync();
		publisher.notifyPublish();
		
		// Recreate the editor
		fileIndex = fileManager.getCurrentFileIndex();
		$("#wmd-input").val(localStorage[fileIndex + ".content"]);
		core.createEditor(function() {
			fileManager.saveFile();
		});
	};

	fileManager.createFile = function(title, content, syncIndexes) {
		content = content || "";
		syncIndexes = syncIndexes || [];
		if (!title) {
			// Create a file title 
			title = DEFAULT_FILE_TITLE;
			var indicator = 2;
			while(_.some(fileDescList, function(fileDesc) {
				return fileDesc.title == title;
			})) {
				title = DEFAULT_FILE_TITLE + indicator++;
			}
		}
		
		// Generate a unique fileIndex
		var fileIndex = undefined;
		do {
			fileIndex = "file." + core.randomString();
		} while(_.has(localStorage, fileIndex + ".title"));
		
		// Create the file in the localStorage
		localStorage[fileIndex + ".content"] = content;
		localStorage[fileIndex + ".title"] = title;
		var sync = _.reduce(syncIndexes, function(sync, syncIndex) {
			return sync + syncIndex + ";";
		}, ";");
		localStorage[fileIndex + ".sync"] = sync;
		localStorage[fileIndex + ".publish"] = ";";
		localStorage["file.list"] += fileIndex + ";";
		return fileIndex;
	};

	fileManager.deleteFile = function(fileIndex) {
		fileIndex = fileIndex || fileManager.getCurrentFileIndex();
		if(fileManager.isCurrentFileIndex(fileIndex)) {
			// Unset the current fileIndex
			fileManager.setCurrentFileIndex();
		}

		// Remove synchronized locations
		var syncIndexList = _.compact(localStorage[fileIndex + ".sync"].split(";"));
		_.each(syncIndexList, function(syncIndex) {
			fileManager.removeSync(syncIndex);
		});
		localStorage.removeItem(fileIndex + ".sync");
		
		// Remove publish locations
		var publishIndexList = _.compact(localStorage[fileIndex + ".publish"].split(";"));
		_.each(publishIndexList, function(publishIndex) {
			fileManager.removePublish(publishIndex);
		});
		localStorage.removeItem(fileIndex + ".publish");

		localStorage["file.list"] = localStorage["file.list"].replace(";"
			+ fileIndex + ";", ";");
		localStorage.removeItem(fileIndex + ".title");
		localStorage.removeItem(fileIndex + ".content");
	};

	fileManager.saveFile = function() {
		var content = $("#wmd-input").val();
		var fileIndex = fileManager.getCurrentFileIndex();
		localStorage[fileIndex + ".content"] = content;
		synchronizer.notifyChange(fileIndex);
	};
	
	fileManager.updateFileTitles = function() {
		$("#file-selector").empty();
		fileDescList = _.chain(localStorage["file.list"].split(";")).compact()
			.reduce(function(fileDescList, fileIndex) {
				var title = localStorage[fileIndex + ".title"];
				fileDescList.push({ index : fileIndex, title : title });
				return fileDescList;
			}, [])
			.sortBy(function(fileDesc) {
				return fileDesc.title.toLowerCase();
			}).value();

		var fileIndex = fileManager.getCurrentFileIndex();
		// If no default file take first one
		if (fileIndex === undefined) {
			fileIndex = fileDescList[0].index;
			fileManager.setCurrentFileIndex(fileIndex);
		}
		
		synchronizer.resetSyncFlags();
		function composeTitle(fileIndex) {
			var result = " " + localStorage[fileIndex + ".title"];
			var providerIdList = synchronizer.getSyncProvidersFromFile(fileIndex);
			_.each(providerIdList, function(providerId) {
				result = '<i class="icon-' + providerId + '"></i>' + result;
			});
			return result;
		}

		// Update the file title
		var title = localStorage[fileIndex + ".title"];
		document.title = "StackEdit - " + title;
		$("#file-title").html(composeTitle(fileIndex));
		$(".file-title").text(title);
		$("#file-title-input").val(title);
		
		// Update the file selector
		$("#file-selector").empty();
		_.each(fileDescList, function(fileDesc) {
			var a = $("<a>").html(composeTitle(fileDesc.index));
			var li = $("<li>").append(a);
			if (fileDesc.index == fileIndex) {
				li.addClass("disabled");
			} else {
				a.prop("href", "#").click((function(fileIndex) {
					return function() {
						fileManager.selectFile(fileIndex);
					};
				})(fileDesc.index));
			}
			$("#file-selector").append(li);			
		});
	};

	// Remove a syncIndex (synchronized location)
	fileManager.removeSync = function(syncIndex) {
		var fileIndex = fileManager.getFileIndexFromSync(syncIndex);
		if(fileIndex !== undefined) {
			localStorage[fileIndex + ".sync"] = localStorage[fileIndex + ".sync"].replace(";"
				+ syncIndex + ";", ";");
			if(fileManager.isCurrentFileIndex(fileIndex)) {
				synchronizer.refreshManageSync();
			}
		}
		// Remove sync attributes
		localStorage.removeItem(syncIndex);
	};
	
	// Get the fileIndex associated to a syncIndex
	fileManager.getFileIndexFromSync = function(syncIndex) {
		return _.chain(localStorage["file.list"].split(";")).compact()
			.find(function(fileIndex) {
				var sync = localStorage[fileIndex + ".sync"];
				return sync.indexOf(";" + syncIndex + ";") !== -1;
			}).value();
	};

	// Remove a publishIndex (publish location)
	fileManager.removePublish = function(publishIndex) {
		var fileIndex = fileManager.getFileIndexFromPublish(publishIndex);
		if(fileIndex !== undefined) {
			localStorage[fileIndex + ".publish"] = localStorage[fileIndex + ".publish"].replace(";"
				+ publishIndex + ";", ";");
			if(fileManager.isCurrentFileIndex(fileIndex)) {
				publisher.notifyPublish();
			}
		}
		// Remove publish attributes
		localStorage.removeItem(publishIndex);
	};
	
	// Get the fileIndex associated to a publishIndex
	fileManager.getFileIndexFromPublish = function(publishIndex) {
		return _.chain(localStorage["file.list"].split(";")).compact()
			.find(function(fileIndex) {
				var sync = localStorage[fileIndex + ".publish"];
				return sync.indexOf(";" + publishIndex + ";") !== -1;
			}).value();
	};
	
	core.onReady(function() {
		fileManager.selectFile();

		$(".action-create-file").click(function() {
			var fileIndex = fileManager.createFile();
			fileManager.selectFile(fileIndex);
			$("#file-title").click();
		});
		$(".action-remove-file").click(function() {
			fileManager.deleteFile();
			fileManager.selectFile();
		});
		$("#file-title").click(function() {
			$(this).hide();
			$("#file-title-input").show().focus();
		});
		function applyTitle(input) {
			var title = $.trim(input.val());
			var fileIndexTitle = fileManager.getCurrentFileIndex() + ".title";
			if (title) {
				if (title != localStorage[fileIndexTitle]) {
					localStorage[fileIndexTitle] = title;
					fileManager.updateFileTitles();
					fileManager.saveFile();
				}
			}
			input.hide().val(localStorage[fileIndexTitle]);
			$("#file-title").show();
		}
		$("#file-title-input").blur(function() {
			applyTitle($(this));
		}).keyup(function(e) {
			if (e.keyCode == 13) {
				applyTitle($(this));
			}
			if (e.keyCode == 27) {
				$(this).val("");
				applyTitle($(this));
			}
		});
		$(".action-download-md").click(
			function() {
				var content = $("#wmd-input").val();
				var uriContent = "data:application/octet-stream;base64,"
					+ core.encodeBase64(content);
				window.open(uriContent, 'file');
			});
		$(".action-download-html").click(
			function() {
				var content = $("#wmd-preview").html();
				var uriContent = "data:application/octet-stream;base64,"
					+ core.encodeBase64(content);
				window.open(uriContent, 'file');
			});		
		$(".action-download-template").click(
			function() {
				var content = publisher.applyTemplate();
				var uriContent = "data:application/octet-stream;base64,"
					+ core.encodeBase64(content);
				window.open(uriContent, 'file');
			});
	});

	core.setFileManager(fileManager);
	return fileManager;
});
