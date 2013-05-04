define(["jquery", "core", "async-runner"], function($, core, asyncRunner) {

	var connected = false;
	var authenticated = false;

	var googleHelper = {};

	// Try to connect Gdrive by downloading client.js
	function connect(task) {
		task.onRun(function() {
			if(core.isOffline === true) {
				connected = false;
				task.error(new Error("Operation not available in offline mode."));
				return;
			}
			if (connected === true) {
				task.chain();
				return;
			}
			delayedFunction = function() {
				connected = true;
				task.chain();
			};
			$.ajax({
				url : "https://apis.google.com/js/client.js?onload=runDelayedFunction",
				dataType : "script", timeout : AJAX_TIMEOUT
			}).fail(function(jqXHR) {
				var error = {
					code: jqXHR.status,
					message: jqXHR.statusText
				};
				handleError(error, task);
			});
		});
	}

	// Try to authenticate with Oauth
	function authenticate(task) {
		task.onRun(function() {
			if (authenticated === true) {
				task.chain();
				return;
			}
			var immediate = true;
			function localAuthenticate() {
				if (immediate === false) {
					core.showMessage("Please make sure the Google authorization popup is not blocked by your browser.");
					// If not immediate we add time for user to enter his credentials
					task.timeout = ASYNC_TASK_LONG_TIMEOUT;
				}
				gapi.auth.authorize({ 'client_id' : GOOGLE_CLIENT_ID,
					'scope' : GOOGLE_SCOPES, 'immediate' : immediate }, function(
					authResult) {
					gapi.client.load('drive', 'v2', function() {
						if (!authResult || authResult.error) {
							// If immediate did not work retry without immediate flag
							if (connected === true && immediate === true) {
								immediate = false;
								task.chain(localAuthenticate);
								return;
							}
							// Error
							task.error(new Error("Access to Google account is not authorized."));
							return;
						}
						// Success
						authenticated = true;
						task.chain();
					});
				});
			}
			task.chain(localAuthenticate);
		});
	}

	googleHelper.upload = function(fileId, parentId, title, content, etag, callback) {
		callback = callback || core.doNothing;
		var result = undefined;
		var task = asyncRunner.createTask();
		connect(task);
		authenticate(task);
		task.onRun(function() {
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
					result = response;
					task.chain();
					return;
				}
				var error = response.error;
				// Handle error
				if(error !== undefined && fileId !== undefined) {
					if(error.code === 404) {
						error = 'File ID "' + fileId + '" not found on Google Drive.|removePublish';
					}
					else if(error.code === 412) {
						// We may have missed a file update
						localStorage.removeItem("gdrive.lastChangeId");
						error = 'Conflict on file ID "' + fileId + '". Please restart the synchronization.';
					}
				}
				handleError(error, task);
			});
		});
		task.onSuccess(function() {
			callback(undefined, result);
		});
		task.onError(function(error) {
			callback(error);
		});
		asyncRunner.addTask(task);
	};

	googleHelper.checkChanges = function(lastChangeId, callback) {
		callback = callback || core.doNothing;
		var changes = [];
		var newChangeId = lastChangeId || 0;
		var task = asyncRunner.createTask();
		connect(task);
		authenticate(task);
		task.onRun(function() {
			var nextPageToken = undefined;
			function retrievePageOfChanges() {
				var request = undefined;
				if(nextPageToken === undefined) {
					request = gapi.client.drive.changes
						.list({ 'startChangeId' : newChangeId + 1 });
				}
				else {
					request = gapi.client.drive.changes
						.list({ 'pageToken' : nextPageToken });
				}

				request.execute(function(response) {
					if (!response || !response.largestChangeId) {
						// Handle error
						handleError(response.error, task);
						return;
					}
					// Retrieve success
					newChangeId = response.largestChangeId;
					nextPageToken = response.nextPageToken;
					if (response.items !== undefined) {
						changes = changes.concat(response.items);
					}
					if (nextPageToken !== undefined) {
						task.chain(retrievePageOfChanges);
					}
					else {
						task.chain();
					}
				});
			}
			task.chain(retrievePageOfChanges);
		});
		task.onSuccess(function() {
			callback(undefined, changes, newChangeId);
		});
		task.onError(function(error) {
			callback(error);
		});
		asyncRunner.addTask(task);
	};

	googleHelper.downloadMetadata = function(ids, callback, skipAuth) {
		callback = callback || core.doNothing;
		var result = [];
		var task = asyncRunner.createTask();
		connect(task);
		if(!skipAuth) {
			authenticate(task);
		}
		task.onRun(function() {
			function recursiveDownloadMetadata() {
				if(ids.length === 0) {
					task.chain();
					return;
				}
				var id = ids[0];
				var headers = {};
				var token = gapi.auth.getToken();
				if(token) {
					headers.Authorization = "Bearer " + token.access_token;
				}
				$.ajax({
					url : "https://www.googleapis.com/drive/v2/files/" + id,
					headers : headers,
					data : {key: GOOGLE_API_KEY},
					dataType : "json",
					timeout : AJAX_TIMEOUT
				}).done(function(data, textStatus, jqXHR) {
					result.push(data);
					ids.shift();
					task.chain(recursiveDownloadMetadata);
				}).fail(function(jqXHR) {
					var error = {
						code: jqXHR.status,
						message: jqXHR.statusText
					};
					// Handle error
					if(error.code === 404) {
						error = 'File ID "' + id + '" not found on Google Drive.';
					}
					handleError(error, task);
				});
			}
			task.chain(recursiveDownloadMetadata);
		});
		task.onSuccess(function() {
			callback(undefined, result);
		});
		task.onError(function(error) {
			callback(error);
		});
		asyncRunner.addTask(task);
	};

	googleHelper.downloadContent = function(objects, callback, skipAuth) {
		callback = callback || core.doNothing;
		var result = [];
		var task = asyncRunner.createTask();
		// Add some time for user to choose his files
		task.timeout = ASYNC_TASK_LONG_TIMEOUT;
		connect(task);
		if(!skipAuth) {
			authenticate(task);
		}
		task.onRun(function() {
			function recursiveDownloadContent() {
				if(objects.length === 0) {
					task.chain();
					return;
				}				
				var object = objects[0];
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
					objects.shift();
					task.chain(recursiveDownloadContent);
					return;
				}
				var headers = {};
				var token = gapi.auth.getToken();
				if(token) {
					headers.Authorization = "Bearer " + token.access_token;
				}
				$.ajax({
					url : file.downloadUrl,
					headers : headers,
					data : {key: GOOGLE_API_KEY},
					dataType : "text",
					timeout : AJAX_TIMEOUT
				}).done(function(data, textStatus, jqXHR) {
					file.content = data;
					objects.shift();
					task.chain(recursiveDownloadContent);
				}).fail(function(jqXHR) {
					var error = {
						code: jqXHR.status,
						message: jqXHR.statusText
					};
					// Handle error
					handleError(error, task);
				});
			}
			task.chain(recursiveDownloadContent);
		});
		task.onSuccess(function() {
			callback(undefined, result);
		});
		task.onError(function(error) {
			callback(error);
		});
		asyncRunner.addTask(task);
	};
	
	function handleError(error, task) {
		var errorMsg = undefined;
		if (error) {
			console.error(error);
			// Try to analyze the error
			if (typeof error === "string") {
				errorMsg = error;
			}
			else {
				errorMsg = "Google error (" + error.code + ": "
					+ error.message + ").";
				if (error.code >= 500 && error.code < 600) {
					// Retry as described in Google's best practices
					task.retry(new Error(errorMsg));
					return;
				} else if (error.code === 401 || error.code === 403) {
					authenticated = false;
					errorMsg = "Access to Google account is not authorized.";
					task.retry(new Error(errorMsg), 1);
					return;
				} else if (error.code <= 0) {
					connected = false;
					authenticated = false;
					core.setOffline();
					errorMsg = "|stopPublish";
				}
			}
		}
		task.error(new Error(errorMsg));
	}

	var pickerLoaded = false;
	function loadPicker(task) {
		task.onRun(function() {
			if (pickerLoaded === true) {
				task.chain();
				return;
			}				
			$.ajax({
				url : "//www.google.com/jsapi",
				data : {key: GOOGLE_API_KEY},
				dataType : "script",
				timeout : AJAX_TIMEOUT
			}).done(function() {
			    google.load('picker', '1', {callback: task.chain});
				pickerLoaded = true;
			}).fail(function(jqXHR) {
				var error = {
					code: jqXHR.status,
					message: jqXHR.statusText
				};
				handleError(error, task);
			});
		});
	}
	
	googleHelper.picker = function(callback) {
		callback = callback || core.doNothing;
		var ids = [];
		var picker = undefined;
		function hidePicker() {
			if(picker !== undefined) {
				picker.setVisible(false);
				$(".modal-backdrop, .picker").remove();
			}
		}
		var task = asyncRunner.createTask();
		connect(task);
		loadPicker(task);
		task.onRun(function() {			
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
					if(data.action == google.picker.Action.PICKED) {
						for(var i=0; i<data.docs.length; i++) {
					        ids.push(data.docs[i].id);							
						}
					}
					hidePicker();
					task.chain();
			    }
			});
			picker = pickerBuilder.build();
			$("body").append($("<div>").addClass("modal-backdrop").click(function() {
				hidePicker();
				task.chain();
			}));
			picker.setVisible(true);
		});
		task.onSuccess(function() {
			callback(undefined, ids);
		});
		task.onError(function(error) {
			hidePicker();
			callback(error);
		});
		asyncRunner.addTask(task);
	};

	googleHelper.uploadBlogger = function(blogUrl, blogId, postId, labelList, title, content, callback) {
		var task = asyncRunner.createTask();
		connect(task);
		authenticate(task);
		task.onRun(function() {
			var headers = {};
			var token = gapi.auth.getToken();
			if(token) {
				headers.Authorization = "Bearer " + token.access_token;
			}
			function publish() {
				var url = "https://www.googleapis.com/blogger/v3/blogs/" + blogId + "/posts/";
				var data = {
					kind: "blogger#post",
					blog: { id: blogId },
					labels: labelList,
					title: title,
					content: content
				};
				var type = "POST";
				// If it's an update
				if(postId !== undefined) {
					url += postId;
					data.id = postId;
					type = "PUT";
				}
				$.ajax({
					url : url,
					data: JSON.stringify(data),
					headers : headers,
					type: type,
					contentType: "application/json",
					dataType : "json",
					timeout : AJAX_TIMEOUT
				}).done(function(post, textStatus, jqXHR) {
					postId = post.id;
					task.chain();
				}).fail(function(jqXHR) {
					var error = {
						code: jqXHR.status,
						message: jqXHR.statusText
					};
					// Handle error
					if(error.code === 404 && postId !== undefined) {
						error = 'Post ' + postId + ' not found on Blogger.|removePublish';
					}
					handleError(error, task);
				});
			}
			function getBlogId() {
				if(blogId !== undefined) {
					task.chain(publish);
					return;
				}
				$.ajax({
					url : "https://www.googleapis.com/blogger/v3/blogs/byurl",
					data: { url: blogUrl },
					headers : headers,
					dataType : "json",
					timeout : AJAX_TIMEOUT
				}).done(function(blog, textStatus, jqXHR) {
					blogId = blog.id;
					task.chain(publish);
				}).fail(function(jqXHR) {
					var error = {
						code: jqXHR.status,
						message: jqXHR.statusText
					};
					// Handle error
					if(error.code === 404) {
						error = 'Blog "' + blogUrl + '" not found on Blogger.|removePublish';
					}
					handleError(error, task);
				});
			}
			task.chain(getBlogId);
		});
		task.onSuccess(function() {
			callback(undefined, blogId, postId);
		});
		task.onError(function(error) {
			callback(error);
		});
		asyncRunner.addTask(task);
	};

	return googleHelper;
});
