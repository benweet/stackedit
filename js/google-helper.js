define(["jquery", "async-runner"], function($, asyncTaskRunner) {

	// Dependencies
	var core = undefined;
	var fileManager = undefined;

	var connected = false;
	var authenticated = false;

	var googleHelper = {};

	// Try to connect Gdrive by downloading client.js
	function connect(callback) {
		callback = callback || core.doNothing;
		var asyncTask = {};
		asyncTask.run = function() {
			if(core.isOffline === true) {
				connected = false;
				core.showMessage("Operation not available in offline mode.");
				asyncTask.error();
				return;
			}
			if (connected === true) {
				asyncTask.success();
				return;
			}
			delayedFunction = function() {
				asyncTask.success();
			};
			$.ajax({
				url : "https://apis.google.com/js/client.js?onload=runDelayedFunction",
				dataType : "script", timeout : AJAX_TIMEOUT
			}).fail(function() {
				asyncTask.error();
			});
		};
		asyncTask.onSuccess = function() {
			connected = true;
			callback();
		};
		asyncTask.onError = function() {
			core.setOffline();
			callback();
		};
		asyncTaskRunner.addTask(asyncTask);
	}

	// Try to authenticate with Oauth
	function authenticate(callback, immediate) {
		callback = callback || core.doNothing;
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
					core.showMessage("Please make sure the Google authorization popup is not blocked by your browser.");
				}
				gapi.auth.authorize({ 'client_id' : GOOGLE_CLIENT_ID,
					'scope' : GOOGLE_SCOPES, 'immediate' : immediate }, function(
					authResult) {
					gapi.client.load('drive', 'v2', function() {
						if (!authResult || authResult.error) {
							asyncTask.error();
							return;
						}
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

	googleHelper.upload = function(fileId, parentId, title, content, callback) {
		callback = callback || core.doNothing;
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
				var etag = undefined;
				if (fileId !== undefined) {
					// If it's an update
					path += "/" + fileId;
					method = 'PUT';
					etag = localStorage[SYNC_PROVIDER_GDRIVE
											+ fileId + ".etag"];
				}
				var headers = { 'Content-Type' : 'multipart/mixed; boundary="'
					+ boundary + '"', };
				if(etag !== undefined) {
					headers["If-Match"] = etag;
				}

				var base64Data = core.encodeBase64(content);
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
						'headers' : headers,
						'body' : multipartRequestBody, });
				request.execute(function(response) {
					if (response && response.id) {
						// Upload success
						fileSyncIndex = SYNC_PROVIDER_GDRIVE + response.id;
						localStorage[fileSyncIndex + ".etag"] = response.etag;
						asyncTask.success();
						return;
					}
					var error = response.error;
					// Handle error
					if(error !== undefined && fileId !== undefined) {
						if(error.code === 404) {
							error = 'File ID "' + fileId + '" does not exist on Google Drive.';
						}
						else if(error.code === 412) {
							// We may have missed a file update
							localStorage.removeItem("sync.gdrive.lastChangeId");
							error = 'Conflict on file ID "' + fileId + '". Please restart the synchronization.';
						}
					}
					handleError(error, asyncTask, callback);
				});
			};
			asyncTask.onSuccess = function() {
				callback(fileSyncIndex);
			};
			asyncTask.onError = function() {
				callback();
			};
			asyncTaskRunner.addTask(asyncTask);
		});
	};

	googleHelper.checkUpdates = function(lastChangeId, callback) {
		callback = callback || core.doNothing;
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
				asyncTask.onError = function() {
					callback();
				};
				asyncTaskRunner.addTask(asyncTask);
			}
			var initialRequest = gapi.client.drive.changes
				.list({ 'startChangeId' : newChangeId + 1 });
			retrievePageOfChanges(initialRequest);
		});
	};

	googleHelper.downloadMetadata = function(ids, callback, result) {
		callback = callback || core.doNothing;
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
				var token = gapi.auth.getToken();
				var headers = {
					Authorization : token ? "Bearer " + token.access_token: null
				};
				$.ajax({
					url : "https://www.googleapis.com/drive/v2/files/" + id,
					headers : headers,
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
					if(error.code === 404) {
						error = 'File ID "' + id + '" does not exist on Google Drive.';
					}
					handleError(error, asyncTask, callback);
				});
			};
			asyncTask.onSuccess = function() {
				googleHelper.downloadMetadata(ids, callback, result);
			};
			asyncTask.onError = function() {
				callback();
			};
			asyncTaskRunner.addTask(asyncTask);
		});
	};

	googleHelper.downloadContent = function(objects, callback, result) {
		callback = callback || core.doNothing;
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
		if(!file) {
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
				var token = gapi.auth.getToken();
				var headers = {
					Authorization : token ? "Bearer " + token.access_token: null
				};
				$.ajax({
					url : file.downloadUrl,
					headers : headers,
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
				googleHelper.downloadContent(objects, callback, result);
			};
			asyncTask.onError = function() {
				callback();
			};
			asyncTaskRunner.addTask(asyncTask);
		});
	};
	
	function handleError(error, asyncTask, callback) {
		var errorMsg = undefined;
		asyncTask.onError = function() {
			if (errorMsg !== undefined) {
				core.showError(errorMsg);
			}
			callback();
		};
		if (error) {
			// Try to analyze the error
			if (typeof error === "string") {
				errorMsg = error;
			}
			else if (error.code >= 500 && error.code < 600) {
				errorMsg = "Google Drive is not accessible.";
				// Retry as described in Google's best practices
				asyncTask.retry();
				return;
			} else if (error.code === 401 || error.code === 403) {
				authenticated = false;
				errorMsg = "Access to Google Drive is not authorized.";
			} else if (error.code <= 0) {
				connected = false;
				authenticated = false;
				core.setOffline();
			} else {
				errorMsg = "Google Drive error (" + error.code + ": "
					+ error.message + ").";
			}
		}
		asyncTask.error();
	}

	var pickerLoaded = false;
	function loadPicker(callback) {
		connect(function() {
			if (connected === false) {
				pickerLoaded = false;
				callback();
				return;
			}
				
			var asyncTask = {};
			asyncTask.run = function() {
				if (pickerLoaded === true) {
					asyncTask.success();
					return;
				}
				$.ajax({
					url : "//www.google.com/jsapi",
					data : {key: GOOGLE_KEY},
					dataType : "script", timeout : AJAX_TIMEOUT
				}).done(function() {
					asyncTask.success();
				}).fail(function() {
					asyncTask.error();
				});
			};
			asyncTask.onSuccess = function() {
			    google.load('picker', '1', {callback: callback});
				pickerLoaded = true;
			};
			asyncTask.onError = function() {
				core.setOffline();
				callback();
			};
			asyncTaskRunner.addTask(asyncTask);
		});
	}
	
	googleHelper.picker = function(callback) {
		callback = callback || core.doNothing;
		loadPicker(function() {
			if (pickerLoaded === false) {
				callback();
				return;
			}
			var view = new google.picker.View(google.picker.ViewId.DOCS);
			view.setMimeTypes("text/x-markdown,text/plain");
			var pickerBuilder = new google.picker.PickerBuilder();
			pickerBuilder.enableFeature(google.picker.Feature.NAV_HIDDEN);
			pickerBuilder.enableFeature(google.picker.Feature.MULTISELECT_ENABLED);
			pickerBuilder.setAppId(GOOGLE_DRIVE_APP_ID);
			var token = gapi.auth.getToken();
			if(token) {
				pickerBuilder.setOAuthToken(token.access_token);
			}
			pickerBuilder.addView(view);
			pickerBuilder.addView(new google.picker.DocsUploadView());
			pickerBuilder.setCallback(function(data) {
				if (data.action == google.picker.Action.PICKED ||
					data.action == google.picker.Action.CANCEL) {
					var ids = [];
					if(data.action == google.picker.Action.PICKED) {
						for(var i=0; i<data.docs.length; i++) {
					        ids.push(data.docs[i].id);							
						}
					}
					$(".modal-backdrop, .picker").remove();
					callback(ids);
			    }
			});
			var picker = pickerBuilder.build();
			$("body").append($("<div>").addClass("modal-backdrop").click(function() {
				picker.setVisible(false);
				$(".modal-backdrop, .picker").remove();
				callback();
			}));
			picker.setVisible(true);
		});
	};

	googleHelper.importFiles = function(ids) {
		googleHelper.downloadMetadata(ids, function(result) {
			if(result === undefined) {
				return;
			}
			googleHelper.downloadContent(result, function(result) {
				if(result === undefined) {
					return;
				}
				for(var i=0; i<result.length; i++) {
					var file = result[i];
					fileSyncIndex = SYNC_PROVIDER_GDRIVE + file.id;
					localStorage[fileSyncIndex + ".etag"] = file.etag;
					var contentCRC = core.crc32(file.content);
					localStorage[fileSyncIndex + ".contentCRC"] = contentCRC;
					var titleCRC = core.crc32(file.title);
					localStorage[fileSyncIndex + ".titleCRC"] = titleCRC;
					var fileIndex = fileManager.createFile(file.title, file.content, [fileSyncIndex]);
					fileManager.selectFile(fileIndex);
					core.showMessage('"' + file.title + '" imported successfully from Google Drive.');
				}
			});
		});
	};

	googleHelper.getBlogByUrl = function(url, callback) {
		authenticate(function() {
			if (connected === false) {
				callback();
				return;
			}
			
			var result = undefined;
			var asyncTask = {};
			asyncTask.run = function() {
				var token = gapi.auth.getToken();
				var headers = {
					Authorization : token ? "Bearer " + token.access_token: null
				};
				$.ajax({
					url : "https://www.googleapis.com/blogger/v3/blogs/byurl",
					data: { url: url },
					headers : headers,
					dataType : "json",
					timeout : AJAX_TIMEOUT
				}).done(function(blog, textStatus, jqXHR) {
					result = blog;
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
				callback(result);
			};
			asyncTask.onError = function() {
				callback();
			};
			asyncTaskRunner.addTask(asyncTask);
		});
	};

	googleHelper.init = function(coreModule, fileManagerModule) {
		core = coreModule;
		fileManager = fileManagerModule;
		var state = localStorage["sync.gdrive.state"];
		if(state === undefined) {
			return;
		}
		localStorage.removeItem("sync.gdrive.state");
		state = JSON.parse(state);
		if (state.action == "create") {
			googleHelper.upload(undefined, state.folderId, GDRIVE_DEFAULT_FILE_TITLE,
				"", function(fileSyncIndex) {
				if(fileSyncIndex === undefined) {
					return;
				}
				var contentCRC = core.crc32("");
				localStorage[fileSyncIndex + ".contentCRC"] = contentCRC;
				var titleCRC = core.crc32(GDRIVE_DEFAULT_FILE_TITLE);
				localStorage[fileSyncIndex + ".titleCRC"] = titleCRC;
				var fileIndex = fileManager.createFile(GDRIVE_DEFAULT_FILE_TITLE, "", [fileSyncIndex]);
				fileManager.selectFile(fileIndex);
				core.showMessage('"' + GDRIVE_DEFAULT_FILE_TITLE + '" created successfully on Google Drive.');
			});
		}
		else if (state.action == "open") {
			var ids = [];
			for(var i=0; i<state.ids.length; i++) {
				var id = state.ids[i];
				var fileSyncIndex = SYNC_PROVIDER_GDRIVE + id;
				var fileIndex = fileManager.getFileIndexFromSync(fileSyncIndex);
				if(fileIndex !== undefined) {
					fileManager.selectFile(fileIndex);
				} else {
					ids.push(id);
				}
			}
			googleHelper.importFiles(ids);
		}
	};
	
	return googleHelper;
});
