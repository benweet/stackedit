var gdrive = (function() {

	var CLIENT_ID = '241271498917-jpto9lls9fqnem1e4h6ppds9uob8rpvu.apps.googleusercontent.com';
	var SCOPES = [ 'https://www.googleapis.com/auth/drive.install',
		'https://www.googleapis.com/auth/drive.file' ];

	var driveEnabled = false;

	var gdrive = {};

	function askAuth(immediate, callback) {
		gapi.auth.authorize({ 'client_id' : CLIENT_ID, 'scope' : SCOPES,
			'immediate' : immediate }, function(authResult) {
			if (authResult && !authResult.error) {
				// $("#drive-link").hide();
				gapi.client.load('drive', 'v2', function() {
					driveEnabled = true;
					callback();
				});
			}
		});
	}

	function createFile(title, content, folderId, callback) {
		var boundary = '-------314159265358979323846';
		var delimiter = "\r\n--" + boundary + "\r\n";
		var close_delim = "\r\n--" + boundary + "--";

		var contentType = 'text/x-markdown';
		var metadata = { title : title, mimeType : contentType };
		if (folderId) {
			metadata.parents = [ { kind : 'drive#fileLink', id : folderId } ];
		}

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
			if (callback) {
				callback(file);
			}
		});
	}
	;

	gdrive.init = function() {
		askAuth(true, function() {
			try {
				var state = JSON.parse(decodeURI((/state=(.+?)(&|$)/
					.exec(location.search) || [ , null ])[1]));
				if (state.action == 'create') {
					createFile(fileManager.currentFile, fileManager.content,
						state.folderId, function() {
							console.log(file);
						});
				}
			} catch (e) {
			}
		});
	};

	gdrive.createFile = function(title, content) {
		askAuth(false, function() {
			createFile(title, content, undefined, function() {
				console.log(file);
			});
		});
	};

	return gdrive;
})();
