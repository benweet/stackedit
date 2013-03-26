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
			if(title) {
				var fileIndex = localStorage["file.current"];
				localStorage[fileIndex + ".title"] = title;
			}
			$(this).hide();
			$("#file-title").show();
			fileManager.updateFileDescList();
			fileManager.updateFileTitleUI();
		});
	};
	
	fileManager.selectFile = function() {
		// If file system does not exist
		if(!localStorage["file.count"]) {
			localStorage.clear();
			localStorage["file.count"] = 0;
		}
		this.updateFileDescList();
		// If no file create one
		if(this.fileDescList.length === 0) {
			this.createFile();
			this.updateFileDescList();
		}
		// If no default file take first one
		if(!localStorage["file.current"]) {
			localStorage["file.current"] = this.fileDescList[0].index;
		}
		// Update the editor and the file title
		var fileIndex = localStorage["file.current"];
		$("#wmd-input").val(localStorage[fileIndex + ".content"]);
		createEditor();
        this.updateFileTitleUI();
	};

	fileManager.createFile = function(title) {
		if(!title) {
			title = "Filename";
		}
		// Find a fileIndex
		var fileCount = parseInt(localStorage["file.count"]);
		var i;
		for(i=0; i<fileCount; i++) {
			if(!localStorage["file." + i + ".title"]) {
				break;
			}
		}
		var fileIndex = "file." + i;
		// Create the file in the localStorag
		localStorage[fileIndex + ".content"] = "";
		localStorage[fileIndex + ".title"] = title;
		localStorage["file.current"] = fileIndex;
		if(i == fileCount) {
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
		for(var i=0; i<fileCount; i++) {
			var fileIndex = "file." + i;
			var title = localStorage[fileIndex + ".title"];
			if(title) {
				lastIndex = i;
				this.fileDescList.push({"index": fileIndex, "title": title});
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
		
		for(var i=0; i<this.fileDescList.length; i++) {
			var fileDesc = this.fileDescList[i];
			var a = $("<a>").text(fileDesc.title);
			var li = $("<li>").append(a);
			if(fileDesc.index == fileIndex) {
				li.addClass("disabled");
			}
			else {
				a.attr("href", "javascript:void(0);")
                .click((function(fileIndex) {
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
		//insertFile(this.currentFile, this.content);
	};

	return fileManager;
})(jQuery);

var gdrive = (function($) {

	var CLIENT_ID = '241271498917-jpto9lls9fqnem1e4h6ppds9uob8rpvu.apps.googleusercontent.com';
	var SCOPES = [ 'https://www.googleapis.com/auth/drive.install',
		'https://www.googleapis.com/auth/drive.file' ];

	var driveEnabled = false;

	var gdrive = {};

	gdrive.init = function() {
		function start() {
			driveEnabled = true;
			try {
				var state = JSON.parse(decodeURI((/state=(.+?)(&|$)/
					.exec(location.search) || [ , null ])[1]));
				if (state.action == 'create') {
					gdrive.createFile(state.folderId, fileManager.currentFile, fileManager.content);
				}

			} catch (e) {
			}
		}
		function handleAuthResult(authResult) {
			if (authResult && !authResult.error) {
				$("#drive-link").hide();
				gapi.client.load('drive', 'v2', function() {
					start();
				});
			}
		}
		$("#drive-link").click(
			function() {
				gapi.auth.authorize({ 'client_id' : CLIENT_ID,
					'scope' : SCOPES, 'immediate' : false }, handleAuthResult);
			});
		gapi.auth.authorize({ 'client_id' : CLIENT_ID, 'scope' : SCOPES,
			'immediate' : true }, handleAuthResult);
	};

	gdrive.createFile = function(folderId, title, content) {
		var boundary = '-------314159265358979323846';
		var delimiter = "\r\n--" + boundary + "\r\n";
		var close_delim = "\r\n--" + boundary + "--";

		var contentType = 'text/x-markdown';
		var metadata = { 'title' : title, 'mimeType' : contentType, 'parents' : [ { 'kind' : 'drive#fileLink', 'id' : folderId } ] };

		var base64Data = btoa(content);
		var multipartRequestBody = delimiter
			+ 'Content-Type: application/json\r\n\r\n'
			+ JSON.stringify(metadata) + delimiter + 'Content-Type: '
			+ contentType + '\r\n' + 'Content-Transfer-Encoding: base64\r\n'
			+ '\r\n' + base64Data + close_delim;

		var request = gapi.client.request({
			'path' : '/upload/drive/v2/files',
			'method' : 'POST',
			'params' : { 'uploadType' : 'multipart', },
			'headers' : { 'Content-Type' : 'multipart/mixed; boundary="'
				+ boundary + '"', }, 'body' : multipartRequestBody, });
		request.execute(function(file) {
			console.log(file);
		});
	};

	return gdrive;
})(jQuery);

function createEditor() {
	$("#wmd-button-bar").empty();
    var converter = Markdown.getSanitizingConverter();
    var editor = new Markdown.Editor(converter);
    editor.run();
    
    $(".wmd-button-row").addClass("btn-group").find("li:not(.wmd-spacer)").addClass("btn").css("left", 0).find("span").hide();
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
}

var layoutOrientation = 0;
var layout;
function createLayout() {
	var layoutGlobalConfig = { closable : true, resizable : false,
		slidable : false, livePaneResizing : true, spacing_open : 20,
		spacing_closed : 20, togglerLength_open : 90,
		togglerLength_closed : 90, center__minWidth : 200,
		stateManagement__enabled : false, };
	if (layoutOrientation === 0) {
		layout = $('body').layout(
			$.extend(layoutGlobalConfig,
				{ east__resizable : true, east__size : .5, east__minSize : 200,
					south__closable : false, }));
	}
	$(".ui-layout-toggler-north").addClass("btn").append($("<b>").addClass("caret"));
	$(".ui-layout-toggler-east").addClass("btn").append($("<b>").addClass("caret"));
}

(function($) {

	$(function() {

		createLayout();
		if (typeof (Storage) !== "undefined") {
			fileManager.init();
		} else {
			showError("Web storage is not available");
		}
		$("#navbar").click(function() {
			layout.allowOverflow('north');
		});
	});

})(jQuery);
