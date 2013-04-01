var GOOGLE_CLIENT_ID = '241271498917-jpto9lls9fqnem1e4h6ppds9uob8rpvu.apps.googleusercontent.com';
var SCOPES = [ 'https://www.googleapis.com/auth/drive.install',
	'https://www.googleapis.com/auth/drive.file' ];
var AUTH_POPUP_TIMEOUT = 90000;
var DEFAULT_GDRIVE_FILE_TITLE = "New Markdown document";

var gdriveDelayedFunction = undefined;
function runGdriveDelayedFunction() {
	if (gdriveDelayedFunction !== undefined) {
		gdriveDelayedFunction();
	}
}

var gdrive = (function($) {

	var connected = false;
	var authenticated = false;
	var doNothing = function() {
	};

	var gdrive = {};

	// Try to connect Gdrive by downloading client.js
	function connect(callback) {
		callback = callback || doNothing;
		var asyncTask = {};
		asyncTask.run = function() {
			if (connected === true) {
				asyncTask.success();
				return;
			}
			gdriveDelayedFunction = function() {
				asyncTask.success();
			};
			$.ajax({
				url : "https://apis.google.com/js/client.js?onload=runGdriveDelayedFunction",
				dataType : "script", timeout : AJAX_TIMEOUT
			}).fail(function() {
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
		if (immediate === undefined) {
			immediate = true;
		}
		connect(function() {
			if (connected === false) {
				callback();
				return;
			}

			var asyncTask = {};
			// If not immediate we add time for user to enter his credentials
			if (immediate === false) {
				asyncTask.timeout = AUTH_POPUP_TIMEOUT;
			}
			asyncTask.run = function() {
				if (authenticated === true) {
					asyncTask.success();
					return;
				}
				if (immediate === false) {
					showMessage("Please make sure the Google authorization popup is not blocked by your browser.");
				}
				gapi.auth.authorize({ 'client_id' : GOOGLE_CLIENT_ID,
					'scope' : SCOPES, 'immediate' : immediate }, function(
					authResult) {
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
				if (connected === true && immediate === true) {
					authenticate(callback, false);
					return;
				}
				callback();
			};
			asyncTaskRunner.addTask(asyncTask);
		});
	}

	function handleError(error, asyncTask, callback) {
		var errorMsg = undefined;
		if (error) {
			// Try to analyze the error
			if (error.code >= 500 && error.code < 600) {
				errorMsg = "Google Drive is not accessible.";
				// Retry as described in Google's best practices
				asyncTask.retry();
				return;
			} else if (error.code === 401) {
				authenticated = false;
				errorMsg = "Access to Google Drive is not authorized.";
			} else if (error.code <= 0) {
				connected = false;
				authenticated = false;
				onOffline();
			} else {
				errorMsg = "Google Drive error (" + error.code + ": "
					+ error.message + ").";
			}
		}
		asyncTask.onError = function() {
			if (errorMsg !== undefined) {
				showError(errorMsg);
			}
			callback();
		};
		asyncTask.error();
	}

	function upload(fileId, parentId, title, content, callback) {
		callback = callback || doNothing;
		authenticate(function() {
			if (connected === false) {
				callback();
				return;
			}

			var fileSyncIndex = undefined;
			var asyncTask = {};
			asyncTask.run = function() {
				var boundary = '-------314159265358979323846';
				var delimiter = "\r\n--" + boundary + "\r\n";
				var close_delim = "\r\n--" + boundary + "--";

				var contentType = 'text/x-markdown';
				var metadata = { title : title, mimeType : contentType };
				if (parentId !== undefined) {
					// Specify the directory
					metadata.parents = [ { kind : 'drive#fileLink',
						id : parentId } ];
				}
				var path = '/upload/drive/v2/files';
				var method = 'POST';
				if (fileId !== undefined) {
					// If it's an update
					path += "/" + fileId;
					method = 'PUT';
				}

				var base64Data = base64.encode(content);
				var multipartRequestBody = delimiter
					+ 'Content-Type: application/json\r\n\r\n'
					+ JSON.stringify(metadata) + delimiter + 'Content-Type: '
					+ contentType + '\r\n'
					+ 'Content-Transfer-Encoding: base64\r\n' + '\r\n'
					+ base64Data + close_delim;

				var request = gapi.client
					.request({
						'path' : path,
						'method' : method,
						'params' : { 'uploadType' : 'multipart', },
						'headers' : { 'Content-Type' : 'multipart/mixed; boundary="'
							+ boundary + '"', }, 'body' : multipartRequestBody, });
				request.execute(function(response) {
					if (response && response.id) {
						// Upload success
						fileSyncIndex = SYNC_PROVIDER_GDRIVE + response.id;
						localStorage[fileSyncIndex + ".etag"] = response.etag;
						asyncTask.success();
						return;
					}
					var error = response.error;
					// If file has been removed from Google Drive
					if(error !== undefined && fileId !== undefined && error.code === 404) {
						showMessage('"' + title + '" has been removed from Google Drive.');
						fileManager.removeSync(SYNC_PROVIDER_GDRIVE + fileId);
						fileManager.updateFileTitles();
						// Avoid error analyzed by handleError
						error = undefined;
					}
					// Handle error
					handleError(error, asyncTask, callback);
				});
			};
			asyncTask.onSuccess = function() {
				callback(fileSyncIndex);
			};
			asyncTaskRunner.addTask(asyncTask);
		});
	}

	gdrive.checkUpdates = function(lastChangeId, callback) {
		callback = callback || doNothing;
		authenticate(function() {
			if (connected === false) {
				callback();
				return;
			}

			var changes = [];
			var newChangeId = lastChangeId || 0;
			function retrievePageOfChanges(request) {
				var nextPageToken = undefined;
				var asyncTask = {};
				asyncTask.run = function() {
					request.execute(function(response) {
						if (response && response.largestChangeId) {
							// Retrieve success
							newChangeId = response.largestChangeId;
							nextPageToken = response.nextPageToken;
							if (response.items !== undefined) {
								for ( var i = 0; i < response.items.length; i++) {
									var item = response.items[i];
									var etag = localStorage[SYNC_PROVIDER_GDRIVE
										+ item.fileId + ".etag"];
									if (etag
										&& (item.deleted === true || item.file.etag != etag)) {
										changes.push(item);
									}
								}
							}
							asyncTask.success();
							return;
						}
						// Handle error
						handleError(response.error, asyncTask, callback);
					});
				};
				asyncTask.onSuccess = function() {
					if (nextPageToken !== undefined) {
						request = gapi.client.drive.changes
							.list({ 'pageToken' : nextPageToken });
						retrievePageOfChanges(request);
					} else {
						callback(changes, newChangeId);
					}
				};
				asyncTaskRunner.addTask(asyncTask);
			}
			var initialRequest = gapi.client.drive.changes
				.list({ 'startChangeId' : newChangeId + 1 });
			retrievePageOfChanges(initialRequest);
		});
	};

	gdrive.downloadMetadata = function(ids, callback, result) {
		callback = callback || doNothing;
		result = result || [];
		if(ids.length === 0) {
			callback(result);
			return;
		}
		
		authenticate(function() {
			if (connected === false) {
				callback();
				return;
			}

			var id = ids.pop();
			var asyncTask = {};
			asyncTask.run = function() {
				var accessToken = gapi.auth.getToken().access_token;
				$.ajax({
					url : "https://www.googleapis.com/drive/v2/files/" + id,
					headers : { "Authorization" : "Bearer " + accessToken },
					dataType : "json",
					timeout : AJAX_TIMEOUT
				}).done(function(data, textStatus, jqXHR) {
					result.push(data);
					asyncTask.success();
				}).fail(function(jqXHR) {
					var error = {
						code: jqXHR.status,
						message: jqXHR.statusText
					};
					// Handle error
					handleError(error, asyncTask, callback);
				});
			};
			asyncTask.onSuccess = function() {
				gdrive.downloadMetadata(ids, callback, result);
			};
			asyncTaskRunner.addTask(asyncTask);
		});
	};

	gdrive.downloadContent = function(objects, callback, result) {
		callback = callback || doNothing;
		result = result || [];
		if(objects.length === 0) {
			callback(result);
			return;
		}
		
		var object = objects.pop();
		result.push(object);
		var file = undefined;
		// object may be a file
		if(object.kind == "drive#file") {
			file = object;
		}
		// object may be a change
		else if(object.kind == "drive#change") {
			file = object.file;
		}
		if(file === undefined) {
			this.downloadContent(objects, callback, result);
			return;
		}
		
		authenticate(function() {
			if (connected === false) {
				callback();
				return;
			}
			
			var asyncTask = {};
			asyncTask.run = function() {
				var accessToken = gapi.auth.getToken().access_token;
				$.ajax({
					url : file.downloadUrl,
					headers : { "Authorization" : "Bearer " + accessToken },
					dataType : "text",
					timeout : AJAX_TIMEOUT
				}).done(function(data, textStatus, jqXHR) {
					file.content = data;
					asyncTask.success();
				}).fail(function(jqXHR) {
					var error = {
						code: jqXHR.status,
						message: jqXHR.statusText
					};
					// Handle error
					handleError(error, asyncTask, callback);
				});
			};
			asyncTask.onSuccess = function() {
				gdrive.downloadContent(objects, callback, result);
			};
			asyncTaskRunner.addTask(asyncTask);
		});
	};
	
	gdrive.createFile = function(title, content, callback) {
		upload(undefined, undefined, title, content, callback);
	};

	gdrive.updateFile = function(id, title, content, callback) {
		upload(id, undefined, title, content, callback);
	};

	gdrive.init = function() {
		var state = localStorage["sync.gdrive.state"];
		if(state === undefined) {
			return;
		}
		localStorage.removeItem("sync.gdrive.state");
		state = JSON.parse(state);
		if (state.action == "create") {
			upload(undefined, state.folderId, DEFAULT_GDRIVE_FILE_TITLE,
				"", function(fileSyncIndex) {
				if(fileSyncIndex === undefined) {
					return;
				}
				var fileIndex = fileManager.createFile(DEFAULT_GDRIVE_FILE_TITLE, "", [fileSyncIndex]);
				fileManager.selectFile(fileIndex);
				showMessage('"' + DEFAULT_GDRIVE_FILE_TITLE + '" created successfully on Google Drive.');
			});
		}
		else if (state.action == "open") {
			var importIds = [];
			for(var i=0; i<state.ids.length; i++) {
				var id = state.ids[i];
				var fileSyncIndex = SYNC_PROVIDER_GDRIVE + id;
				var fileIndex = fileManager.getFileIndexFromSync(fileSyncIndex);
				if(fileIndex !== undefined) {
					fileManager.selectFile(fileIndex);
				} else {
					importIds.push(id);
				}
			}
			gdrive.downloadMetadata(importIds, function(result) {
				if(result === undefined) {
					return;
				}
				gdrive.downloadContent(result, function(result) {
					if(result === undefined) {
						return;
					}
					for(var i=0; i<result.length; i++) {
						var file = result[i];
						fileSyncIndex = SYNC_PROVIDER_GDRIVE + file.id;
						localStorage[fileSyncIndex + ".etag"] = file.etag;
						var fileIndex = fileManager.createFile(file.title, file.content, [fileSyncIndex]);
						fileManager.selectFile(fileIndex);
						showMessage('"' + file.title + '" imported successfully from Google Drive.');
					}
				});
			});
		}
	};

	return gdrive;
})(jQuery);
