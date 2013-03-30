var CLIENT_ID = '241271498917-jpto9lls9fqnem1e4h6ppds9uob8rpvu.apps.googleusercontent.com';
var SCOPES = [ 'https://www.googleapis.com/auth/drive.install',
	'https://www.googleapis.com/auth/drive.file' ];

var gdriveDelayedFunction = undefined;
function runGdriveDelayedFunction() {
	if(gdriveDelayedFunction !== undefined) {
		gdriveDelayedFunction();
	}
}

var gdrive = (function($) {

	var connected = false;
	var authenticated = false;
	var doNothing = function() {};

	var gdrive = {};
	
	// Try to connect Gdrive by downloading client.js
	function connect(callback) {
		callback = callback || doNothing;
		var asyncTask = {};
		asyncTask.run = function() {
			if(connected === true) {
				asyncTask.success();
				return;
			}
			gdriveDelayedFunction = function() {
				asyncTask.success();
			};
			$.ajax({
				url: "https://apis.google.com/js/client.js?onload=runGdriveDelayedFunction",
				dataType: "script",
				timeout: 5000
			})
			.fail(function() {
				asyncTask.error();
			});
		};
		asyncTask.onSuccess = function() {
			gdriveDelayedFunction = undefined;
			connected = true;
			callback();
		};
		asyncTask.onError = function() {
			gdriveDelayedFunction = undefined;
			onOffline();
			callback();
		};
		asyncTaskRunner.addTask(asyncTask);
	}
	
	// Try to authenticate with Oauth
	function authenticate(callback, immediate) {
		callback = callback || doNothing;
		if(immediate === undefined) {
			immediate = true;
		}
		connect(function() {
			if(connected === false) {
				callback();
				return;
			}
			
			var asyncTask = {};
			asyncTask.run = function() {
				if(authenticated === true) {
					asyncTask.success();
					return;
				}
				gapi.auth.authorize({ 'client_id' : CLIENT_ID, 'scope' : SCOPES,
					'immediate' : immediate }, function(authResult) {
					if (!authResult || authResult.error) {
						asyncTask.error();
						return;
					}
					gapi.client.load('drive', 'v2', function() {
						authenticated = true;
						asyncTask.success();
					});
				});
			};
			asyncTask.onSuccess = function() {
				callback();
			};
			asyncTask.onError = function() {
				// If immediate did not work retry without immediate flag
				if(connected === true && immediate === true) {
					authenticate(callback, false);
					return;
				}
				callback();
			};
			asyncTaskRunner.addTask(asyncTask);
		});
	}

	function upload(fileId, parentId, title, content, callback) {
		callback = callback || doNothing;
		authenticate(function() {
			if(connected === false) {
				callback();
				return;
			}
			
			var fileIndex = undefined;
			var asyncTask = {};
			asyncTask.run = function() {
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
					path += "/" + fileId;
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
					if(file.id) {
						// Upload success
						fileIndex = SYNC_PROVIDER_GDRIVE + file.id;
						localStorage[fileIndex + ".etag"] = file.etag;
						asyncTask.success();
						return
					}
					// Upload failed, try to analyse
					if(file.error.code === 401) {
						showError("Google Drive is not accessible.");
					}
					else {
						connected = false;
						authenticated = false;
						onOffline();
					}
					asyncTask.error();
				});
			};
			asyncTask.onSuccess = function() {
				callback(fileIndex);
			};
			asyncTask.onError = function() {
				callback();
			};
			asyncTaskRunner.addTask(asyncTask);
		});		
	}
	;

	gdrive.init = function() {
		try {
			var state = JSON.parse(decodeURI((/state=(.+?)(&|$)/
				.exec(location.search) || [ , null ])[1]));
			if (state.action == 'create') {
				upload(undefined, state.folderId,
					fileManager.currentFile, fileManager.content, function(
						fileIndex) {
						console.log(fileIndex);
					});
			}
		} catch (e) {
		}
	};

	gdrive.createFile = function(title, content, callback) {
		upload(undefined, undefined, title, content, callback);
	};

	gdrive.updateFile = function(id, title, content, callback) {
		upload(id, undefined, title, content, callback);
	};
	
	return gdrive;
})(jQuery);
