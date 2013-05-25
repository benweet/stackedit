define(["jquery", "core", "utils", "synchronizer", "publisher", "sharing", "text!../WELCOME.md", "underscore"],
	function($, core, utils, synchronizer, publisher, sharing, welcomeContent) {
	
	var TEMPORARY_FILE_INDEX = "file.tempIndex";

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
		if(fileIndex === undefined) {
			localStorage.removeItem("file.current");
		}
		else if(fileIndex != TEMPORARY_FILE_INDEX) {
			localStorage["file.current"] = fileIndex;
		}
	};
	
	// Caution: this function recreate the editor (reset undo operations)
	var fileDescList = [];
	fileManager.selectFile = function(fileIndex) {
		// If no file create one
		if (localStorage["file.list"].length === 1) {
			fileIndex = fileManager.createFile(WELCOME_DOCUMENT_TITLE, welcomeContent);
		}
		
		if(fileIndex !== undefined) {
			fileManager.setCurrentFileIndex(fileIndex);
		}

		// Update the file titles
		fileManager.updateFileTitles();
		synchronizer.refreshManageSync();
		publisher.notifyPublish();
		
		// Hide the viewer pencil button
		if(fileIndex == TEMPORARY_FILE_INDEX) {
			$(".action-edit-document").removeClass("hide");
		}
		else {
			$(".action-edit-document").addClass("hide");
		}
		
		// Recreate the editor
		fileIndex = fileManager.getCurrentFileIndex();
		$("#wmd-input").val(localStorage[fileIndex + ".content"]);
		core.createEditor(function() {
			// Callback to save content when textarea changes
			fileManager.saveFile();
		});
	};

	fileManager.createFile = function(title, content, syncIndexes, isTemporary) {
		content = content !== undefined ? content : core.settings.defaultContent;
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
		var fileIndex = TEMPORARY_FILE_INDEX;
		if(!isTemporary) {
			do {
				fileIndex = "file." + utils.randomString();
			} while(_.has(localStorage, fileIndex + ".title"));
		}
		
		// Create the file in the localStorage
		localStorage[fileIndex + ".content"] = content;
		localStorage[fileIndex + ".title"] = title;
		// Store syncIndexes associated to the file
		var sync = _.reduce(syncIndexes, function(sync, syncIndex) {
			return sync + syncIndex + ";";
		}, ";");
		localStorage[fileIndex + ".sync"] = sync;
		// Store publishIndexes associated to the file
		localStorage[fileIndex + ".publish"] = ";";
		// Add the index to the file list
		if(!isTemporary) {
			localStorage["file.list"] += fileIndex + ";";
		}
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
		
		// Remove publish locations
		var publishIndexList = _.compact(localStorage[fileIndex + ".publish"].split(";"));
		_.each(publishIndexList, function(publishIndex) {
			fileManager.removePublish(publishIndex);
		});

		// Remove the index from the file list
		localStorage["file.list"] = localStorage["file.list"].replace(";"
			+ fileIndex + ";", ";");
		localStorage.removeItem(fileIndex + ".title");
		localStorage.removeItem(fileIndex + ".content");
		localStorage.removeItem(fileIndex + ".sync");
		localStorage.removeItem(fileIndex + ".publish");
	};

	// Save current file in localStorage
	fileManager.saveFile = function() {
		var content = $("#wmd-input").val();
		var fileIndex = fileManager.getCurrentFileIndex();
		localStorage[fileIndex + ".content"] = content;
		synchronizer.notifyChange(fileIndex);
	};
	
	fileManager.updateFileTitles = function() {
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
		function composeTitle(fileIndex, refreshSharing) {
			var result = [];
			var syncAttributesList = synchronizer.getSyncAttributesFromFile(fileIndex);
			var publishAttributesList = publisher.getPublishAttributesFromFile(fileIndex);
			var attributesList = syncAttributesList.concat(publishAttributesList);
			if(refreshSharing === true) {
				sharing.refreshDocumentSharing(attributesList);
			}
			_.chain(attributesList).sortBy(function(attributes) {
				return attributes.provider;
			}).each(function(attributes) {
				result.push('<i class="icon-' + attributes.provider + '"></i>');
			});
			result.push(" ");
			result.push(localStorage[fileIndex + ".title"]);
			return result.join("");
		}

		// Update the file title
		var title = localStorage[fileIndex + ".title"];
		document.title = "StackEdit - " + title;
		$("#file-title").html(composeTitle(fileIndex, true));
		$(".file-title").text(title);
		$("#file-title-input").val(title);
		
		// Update the file selector
		$("#file-selector li:not(.stick)").empty();
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
		
		core.layoutRefresh();
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
	
	// Filter for search input in file selector
	function filterFileSelector(filter) {
		var liList = $("#file-selector li:not(.stick)");
		liList.show();
		if(filter) {
			var words = filter.toLowerCase().split(/\s+/);
			liList.each(function() {
				var fileTitle = $(this).text().toLowerCase();
				if(_.some(words, function(word) {
					return fileTitle.indexOf(word) === -1;
				})) {
					$(this).hide();
				}
			});
		}
	}
	
	core.onReady(function() {
		fileManager.selectFile();

		$(".action-create-file").click(function() {
			var fileIndex = fileManager.createFile();
			fileManager.selectFile(fileIndex);
			var wmdInput = $("#wmd-input").focus().get(0);
			if(wmdInput.setSelectionRange) {
				wmdInput.setSelectionRange(0, 0);
			}
			$("#file-title").click();
		});
		$(".action-remove-file").click(function() {
			fileManager.deleteFile();
			fileManager.selectFile();
		});
		$("#file-title").click(function() {
			if(viewerMode === true) {
				return;
			}
			$(this).hide();
			var fileTitleInput = $("#file-title-input").show();
			_.defer(function() {
				fileTitleInput.focus().get(0).select();
			});
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
			core.layoutRefresh();
			$("#wmd-input").focus();
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
		$(".action-open-file").click(function() {
			filterFileSelector();
			_.defer(function() {
				$("#file-search").val("").focus();
			});
		});
		$("#file-search").keyup(function() {
			filterFileSelector($(this).val());
		}).click(function(event) {
			event.stopPropagation();
		});
		$(".action-open-stackedit").click(function() {
			window.location.href = ".";
		});
		$(".action-edit-document").click(function() {
			var content = $("#wmd-input").val();
			var title = localStorage[fileManager.getCurrentFileIndex() + ".title"];
			var fileIndex = fileManager.createFile(title, content);
			fileManager.selectFile(fileIndex);
			window.location.href = ".";
		});
		$(".action-download-md").click(function() {
			var content = $("#wmd-input").val();
			var title = localStorage[fileManager.getCurrentFileIndex() + ".title"];
			core.saveFile(content, title + ".md");
		});
		$(".action-download-html").click(function() {
			var content = $("#wmd-preview").html();
			var title = localStorage[fileManager.getCurrentFileIndex() + ".title"];
			core.saveFile(content, title + ".html");
		});		
		$(".action-download-template").click(function() {
			var content = publisher.applyTemplate();
			var title = localStorage[fileManager.getCurrentFileIndex() + ".title"];
			core.saveFile(content, title + ".txt");
		});
		$(".action-welcome-file").click(function() {
			var fileIndex = fileManager.createFile(WELCOME_DOCUMENT_TITLE, welcomeContent);
			fileManager.selectFile(fileIndex);
		});
	});

	core.setFileManager(fileManager);
	return fileManager;
});
