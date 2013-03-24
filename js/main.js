function showError(msg) {
	alert(msg);
}

var fileManager = (function($) {

	var fileManager = {};

	fileManager.init = function() {
		if (localStorage.fileSystem) {
			this.fileSystem = JSON.parse(localStorage.fileSystem);
			if (localStorage.currentFile)
				this.selectFile(localStorage.currentFile);
			else
				this.selectFile(Object.keys(this.fileSystem)[0]);
		} else {
			this.fileSystem = {};
			this.createFile("New file");
		}
		window.setInterval(function() {
			fileManager.saveFile();
		}, 5000);
	};

	fileManager.createFile = function(filename) {
		this.fileSystem[filename] = "blah blah";
		this.selectFile(filename);
	};

	fileManager.selectFile = function(filename) {
		this.currentFile = filename;
		this.content = this.fileSystem[this.currentFile];
		$("#wmd-input").val(this.content);
		$("#info-filename").text(filename);
	};

	fileManager.saveFile = function() {
		this.content = $("#wmd-input").val();
		this.fileSystem[this.currentFile] = this.content;
		localStorage.fileSystem = JSON.stringify(this.fileSystem);
		localStorage.currentFile = this.currentFile;
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
		if (!callback) {
			callback = function(file) {
				console.log(file);
			};
		}
		request.execute(callback);
	};

	return gdrive;
})(jQuery);

(function($) {

	$(function() {
		var converter = Markdown.getSanitizingConverter();
		var editor = new Markdown.Editor(converter);
		editor.run();
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
