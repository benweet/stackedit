var gdrive = (function() {

	var CLIENT_ID = '241271498917-jpto9lls9fqnem1e4h6ppds9uob8rpvu.apps.googleusercontent.com';
	var SCOPES = [ 'https://www.googleapis.com/auth/drive.install',
		'https://www.googleapis.com/auth/drive.file' ];

	var driveEnabled = false;

	var gdrive = {};

	function askAuth(immediate, callback) {
		if (!driveEnabled) {
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
		} else {
			callback();
		}
	}

	function uploadFile(fileId, parentId, title, content, callback) {
		setWorkingIndicator(FLAG_GDRIVE_UPLOAD);
		var boundary = '-------314159265358979323846';
		var delimiter = "\r\n--" + boundary + "\r\n";
		var close_delim = "\r\n--" + boundary + "--";

		var contentType = 'text/x-markdown';
		var metadata = { title : title, mimeType : contentType };
		if (parentId) {
			// Specify the directory
			metadata.parents = [ { kind : 'drive#fileLink', id : parentId } ];
		}
		var path = '/upload/drive/v2/files';
		var method = 'POST';
		if (fileId) {
			// If it's an update
			path += fileId;
			method = 'PUT';
		}

		var base64Data = btoa(content);
		var multipartRequestBody = delimiter
			+ 'Content-Type: application/json\r\n\r\n'
			+ JSON.stringify(metadata) + delimiter + 'Content-Type: '
			+ contentType + '\r\n' + 'Content-Transfer-Encoding: base64\r\n'
			+ '\r\n' + base64Data + close_delim;

		var request = gapi.client.request({
			'path' : path,
			'method' : method,
			'params' : { 'uploadType' : 'multipart', },
			'headers' : { 'Content-Type' : 'multipart/mixed; boundary="'
				+ boundary + '"', }, 'body' : multipartRequestBody, });
		request.execute(function(file) {
			unsetWorkingIndicator(FLAG_GDRIVE_UPLOAD);
			var fileSyncIndex = "sync.gdrive." + file.id;
			localStorage[fileSyncIndex + ".etag"] = file.etag;
			if (callback) {
				callback(fileSyncIndex);
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
					uploadFile(undefined, state.folderId,
						fileManager.currentFile, fileManager.content, function(
							file) {
							console.log(file);
						});
				}
			} catch (e) {
			}
		});
	};

	gdrive.createFile = function(title, content, callback) {
		askAuth(false, function() {
			uploadFile(undefined, undefined, title, content, callback);
		});
	};

	gdrive.updateFile = function(id, title, content, callback) {
		askAuth(false, function() {
			uploadFile(id, undefined, title, content, callback);
		});
	};
	
	return gdrive;
})();
