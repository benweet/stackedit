function showError(msg) {
	alert(msg);
}

var fileManager = (function($) {

	var fileManager = {};

	fileManager.init = function() {
		fileManager.selectFile();
		window.setInterval(function() {
			fileManager.saveFile();
		}, 5000);
		$(".action-create-file").click(function() {
			fileManager.saveFile();
			fileManager.createFile();
			fileManager.selectFile();
		});
		$(".action-remove-file").click(function() {
			fileManager.deleteFile();
			fileManager.selectFile();
		});
		$("#file-title").click(function() {
			$(this).hide();
			$("#file-title-input").show().focus();
		});
		$("#file-title-input").blur(function() {
			var title = $.trim($(this).val());
			if (title) {
				var fileIndex = localStorage["file.current"];
				localStorage[fileIndex + ".title"] = title;
			}
			$(this).hide();
			$("#file-title").show();
			fileManager.updateFileDescList();
			fileManager.updateFileTitleUI();
		});
		$(".action-upload-gdrive").click(function() {
			var fileIndex = localStorage["file.current"];
			var content = localStorage[fileIndex + ".content"];
			var title = localStorage[fileIndex + ".title"];
			gdrive.createFile(title, content);
		});
	};

	fileManager.selectFile = function() {
		// If file system does not exist
		if (!localStorage["file.count"]) {
			localStorage.clear();
			localStorage["file.count"] = 0;
		}
		this.updateFileDescList();
		// If no file create one
		if (this.fileDescList.length === 0) {
			this.createFile();
			this.updateFileDescList();
		}
		// If no default file take first one
		if (!localStorage["file.current"]) {
			localStorage["file.current"] = this.fileDescList[0].index;
		}
		// Update the editor and the file title
		var fileIndex = localStorage["file.current"];
		$("#wmd-input").val(localStorage[fileIndex + ".content"]);
		core.createEditor();
		this.updateFileTitleUI();
	};

	fileManager.createFile = function(title) {
		if (!title) {
			title = "Filename";
		}
		// Find a fileIndex
		var fileCount = parseInt(localStorage["file.count"]);
		var i;
		for (i = 0; i < fileCount; i++) {
			if (!localStorage["file." + i + ".title"]) {
				break;
			}
		}
		var fileIndex = "file." + i;
		// Create the file in the localStorag
		localStorage[fileIndex + ".content"] = "";
		localStorage[fileIndex + ".title"] = title;
		localStorage["file.current"] = fileIndex;
		if (i == fileCount) {
			localStorage["file.count"] = fileCount + 1;
		}
	};

	fileManager.deleteFile = function() {
		var fileIndex = localStorage["file.current"];
		localStorage.removeItem("file.current");
		localStorage.removeItem(fileIndex + ".title");
		localStorage.removeItem(fileIndex + ".content");
	};

	fileManager.updateFileDescList = function() {
		var fileCount = parseInt(localStorage["file.count"]);
		var lastIndex = -1;
		this.fileDescList = [];
		$("#file-selector").empty();
		for ( var i = 0; i < fileCount; i++) {
			var fileIndex = "file." + i;
			var title = localStorage[fileIndex + ".title"];
			if (title) {
				lastIndex = i;
				this.fileDescList
					.push({ "index" : fileIndex, "title" : title });
			}
		}
		localStorage["file.count"] = lastIndex + 1;
		this.fileDescList.sort(function(a, b) {
			if (a.title.toLowerCase() < b.title.toLowerCase())
				return -1;
			if (a.title.toLowerCase() > b.title.toLowerCase())
				return 1;
			return 0;
		});
	};

	fileManager.updateFileTitleUI = function() {
		// Update the editor and the file title
		var fileIndex = localStorage["file.current"];
		var title = localStorage[fileIndex + ".title"];
		document.title = "StackEdit - " + title;
		$(".file-title").text(title);
		$("#file-title-input").val(title);
		$("#file-selector").empty();

		for ( var i = 0; i < this.fileDescList.length; i++) {
			var fileDesc = this.fileDescList[i];
			var a = $("<a>").text(fileDesc.title);
			var li = $("<li>").append(a);
			if (fileDesc.index == fileIndex) {
				li.addClass("disabled");
			} else {
				a.attr("href", "javascript:void(0);").click(
					(function(fileIndex) {
						return function() {
							localStorage["file.current"] = fileIndex;
							fileManager.selectFile();
						};
					})(fileDesc.index));
			}
			$("#file-selector").append(li);
		}
	};

	fileManager.saveFile = function() {
		var content = $("#wmd-input").val();
		var fileIndex = localStorage["file.current"];
		localStorage[fileIndex + ".content"] = content;
		// insertFile(this.currentFile, this.content);
	};

	return fileManager;
})(jQuery);

var core = (function($) {
	var core = {};
	
	core.init = function() {
		this.loadSettings();
		this.saveSettings();
		this.createLayout();
		
		$(".action-apply-settings").click(function() {
			core.saveSettings();
			fileManager.saveFile();
			location.reload();
		});
	};
	
	var settings = {};
	core.loadSettings = function() {
		if(localStorage.settings) {
			settings = JSON.parse(localStorage.settings);
		}
		
		// Layout orientation
		$("#radio-layout-orientation-horizontal").attr('checked', true);
		if(settings.layoutOrientation == "vertical") {
			$("#radio-layout-orientation-vertical").attr('checked', true);
		}
	};

	core.saveSettings = function() {
		
		// Layout orientation
		settings.layoutOrientation = "horizontal"; 
		if($("#radio-layout-orientation-vertical").is(":checked")) {
			settings.layoutOrientation = "vertical";
		}
		
		localStorage.settings = JSON.stringify(settings);
	};

	core.createLayout = function() {
		var layout = undefined;
		var layoutGlobalConfig = { closable : true, resizable : false,
			slidable : false, livePaneResizing : true, spacing_open : 20,
			spacing_closed : 20, togglerLength_open : 90,
			togglerLength_closed : 90, center__minWidth : 100, center__minHeight : 100,
			stateManagement__enabled : false, };
		if (settings.layoutOrientation == "horizontal") {
			$(".ui-layout-east").addClass("well").attr("id", "wmd-preview");
			layout = $('body').layout(
				$.extend(layoutGlobalConfig,
					{ east__resizable : true, east__size : .5, east__minSize : 200,
						south__closable : false, }));
		} else if (settings.layoutOrientation == "vertical") {
			$(".ui-layout-east").remove();
			$(".ui-layout-south").addClass("well").attr("id", "wmd-preview");
			layout = $('body').layout(
				$.extend(layoutGlobalConfig, { south__resizable : true,
					south__size : .5, south__minSize : 200, }));
		}
		$(".ui-layout-toggler-north").addClass("btn").append(
			$("<b>").addClass("caret"));
		$(".ui-layout-toggler-south").addClass("btn").append(
			$("<b>").addClass("caret"));
		$(".ui-layout-toggler-east").addClass("btn").append(
			$("<b>").addClass("caret"));
		$("#navbar").click(function() {
			layout.allowOverflow('north');
		});
	};

	core.createEditor = function() {
		$("#wmd-button-bar").empty();
		var converter = Markdown.getSanitizingConverter();
		var editor = new Markdown.Editor(converter);
		editor.run();

		$(".wmd-button-row").addClass("btn-group").find("li:not(.wmd-spacer)")
			.addClass("btn").css("left", 0).find("span").hide();
		$("#wmd-bold-button").append($("<i>").addClass("icon-bold"));
		$("#wmd-italic-button").append($("<i>").addClass("icon-italic"));
		$("#wmd-link-button").append($("<i>").addClass("icon-globe"));
		$("#wmd-quote-button").append($("<i>").addClass("icon-indent-left"));
		$("#wmd-code-button").append($("<i>").addClass("icon-code"));
		$("#wmd-image-button").append($("<i>").addClass("icon-picture"));
		$("#wmd-olist-button").append($("<i>").addClass("icon-numbered-list"));
		$("#wmd-ulist-button").append($("<i>").addClass("icon-list"));
		$("#wmd-heading-button").append($("<i>").addClass("icon-text-height"));
		$("#wmd-hr-button").append($("<i>").addClass("icon-hr"));
		$("#wmd-undo-button").append($("<i>").addClass("icon-undo"));
		$("#wmd-redo-button").append($("<i>").addClass("icon-share-alt"));
	};
	
	return core;
})(jQuery);

(function($) {

	$(function() {

		core.init();
		if (typeof (Storage) !== "undefined") {
			fileManager.init();
		} else {
			showError("Web storage is not available");
		}
	});

})(jQuery);
