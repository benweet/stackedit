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
		$("#new-file").click(function() {
			fileManager.saveFile();
			fileManager.createFile();
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
			fileManager.updateFileTitleUI();
		});
	};
	
	fileManager.selectFile = function() {
		// If file system does not exist
		if(!localStorage["file.count"]) {
			localStorage.clear();
			localStorage["file.count"] = 0;
		}
		this.updateFileTitleList();
		// If no file create one
		if(this.fileTitleList.length === 0) {
			this.createFile();
			this.updateFileTitleList();
		}
		// If no default file take first one
		if(!localStorage["file.current"]) {
			var fileCount = parseInt(localStorage["file.count"]);
			for(var i=0; i<fileCount; i++) {
				var fileIndex = "file." + i;
				if(localStorage[fileIndex + ".title"]) {
					localStorage["file.current"] = fileIndex;
					break;
				}
			}
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
		var fileIndex = "file." + parseInt(localStorage["file.count"]);
		localStorage[fileIndex + ".title"] = title;
		localStorage[fileIndex + ".content"] = "";
		localStorage["file.count"] = parseInt(localStorage["file.count"]) + 1;
		localStorage["file.current"] = fileIndex;
	};
	
	fileManager.updateFileTitleList = function() {
		var fileCount = parseInt(localStorage["file.count"]);
		this.fileTitleList = [];
		$("#file-selector").empty();
		for(var i=0; i<fileCount; i++) {
			var fileIndex = "file." + i;
			var title = localStorage[fileIndex + ".title"];
			if(title) {
				this.fileTitleList[i] = title;
			}
		}
	};
    
    fileManager.updateFileTitleUI = function() {
        // Update the editor and the file title
		var fileIndex = localStorage["file.current"];
		var title = localStorage[fileIndex + ".title"];
		$("#file-title > span").text(title);
		$("#file-title-input").val(title);
		$("#file-selector").empty();
		for(var i=0; i<this.fileTitleList.length; i++) {
			title = this.fileTitleList[i];
			if(title) {
        		var fileIndex1 = "file." + i;
				var a = $("<a>").text(title);
				var li = $("<li>").append(a);
				if(fileIndex1 == fileIndex) {
					li.addClass("disabled");
				}
				else {
					a.attr("href", "javascript:void(0);")
                    .click((function(fileIndex) {
						return function() {
							localStorage["file.current"] = fileIndex;
							fileManager.selectFile();
						};
					})(fileIndex1));
				}
				$("#file-selector").append(li);
			}
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
		const boundary = '-------314159265358979323846';
		const delimiter = "\r\n--" + boundary + "\r\n";
		const close_delim = "\r\n--" + boundary + "--";

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
    
    $(".wmd-button-row").addClass("btn-group").find("li:not(.wmd-spacer)").addClass("btn").css({"left": 0,}).find("span").hide();
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

(function($) {

	$(function() {

		$(window).resize(resize);
		resize();

		if (typeof (Storage) !== "undefined") {
			fileManager.init();
		} else {
			showError("Web storage is not available");
		};
	});

	function resize() {
		$("#wmd-input").width($(window).width() / 2 - 60).height(
			$(window).height() - 70);
		$("#wmd-preview").width($(window).width() / 2 - 60).height(
			$(window).height() - 100);
	};

})(jQuery);
