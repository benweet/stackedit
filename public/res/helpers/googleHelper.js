/*global gapi, google */
define([
	"underscore",
	"jquery",
	"constants",
	"core",
	"utils",
	"storage",
	"logger",
	"settings",
	"eventMgr",
	"classes/AsyncTask"
], function(_, $, constants, core, utils, storage, logger, settings, eventMgr, AsyncTask) {

	var connected = false;
	var authorizationMgrMap = {};

	function AuthorizationMgr(accountId) {
		var permissionList = {
			profile: true
		};
		var refreshFlag = true;
		_.each((storage[accountId + '.permissions'] || '').split(';'), function(permission) {
			permission && (permissionList[permission] = true);
		});
		this.setRefreshFlag = function() {
			refreshFlag = true;
		};
		this.isAuthorized = function(permission) {
			return refreshFlag === false && _.has(permissionList, permission);
		};
		this.add = function(permission) {
			permissionList[permission] = true;
			storage[accountId + '.permissions'] = _.keys(permissionList).join(';');
			refreshFlag = false;
		};
		this.getListWithNew = function(permission) {
			var result = _.keys(permissionList);
			if(!_.has(permissionList, permission)) {
				result.push(permission);
			}
			return result;
		};
		var userId = storage[accountId + '.userId'];
		this.setUserId = function(value) {
			userId = value;
			storage[accountId + '.userId'] = userId;
		};
		this.getUserId = function() {
			return userId;
		};
		var authUser = parseInt(storage[accountId + '.authUser'] || 0);
		this.setAuthUser = function(value) {
			authUser = value;
			storage[accountId + '.authUser'] = authUser;
		};
		this.getAuthUser = function() {
			return authUser;
		};
	}

	var googleHelper = {};

	// Listen to offline status changes
	var isOffline = false;
	eventMgr.addListener("onOfflineChanged", function(isOfflineParam) {
		isOffline = isOfflineParam;
	});

	// Try to connect by downloading client.js
	function connect(task) {
		task.onRun(function() {
			if(isOffline === true) {
				connected = false;
				return task.error(new Error("Operation not available in offline mode.|stopPublish"));
			}
			if(connected === true) {
				return task.chain();
			}
			window.delayedFunction = function() {
				gapi.load("client", function() {
					gapi.client.load('drive', 'v2', function() {
						connected = true;
						task.chain();
					});
				});
			};
			$.ajax({
				url: "https://apis.google.com/js/api.js?onload=runDelayedFunction",
				dataType: "script",
				timeout: constants.AJAX_TIMEOUT
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
	var scopeMap = {
		profile: [
			'https://www.googleapis.com/auth/userinfo.profile'
		],
		gdrive: [
			'https://www.googleapis.com/auth/drive.install',
			settings.gdriveFullAccess === true ? 'https://www.googleapis.com/auth/drive' : 'https://www.googleapis.com/auth/drive.file'
		],
		blogger: [
			'https://www.googleapis.com/auth/blogger'
		],
		picasa: [
			'https://www.googleapis.com/auth/photos'
		]
	};

	googleHelper.getAuthorizationMgr = function(accountId) {
		var authorizationMgr = authorizationMgrMap[accountId];
		if(!authorizationMgr) {
			authorizationMgr = new AuthorizationMgr(accountId);
			authorizationMgrMap[accountId] = authorizationMgr;
		}
		return authorizationMgr;
	};

	function authenticate(task, permission, accountId) {
		var authorizationMgr = googleHelper.getAuthorizationMgr(accountId);
		task.onRun(function() {
			var currentToken = gapi.auth.getToken();
			var newToken;

			function getTokenInfo() {
				$.ajax({
					url: 'https://www.googleapis.com/oauth2/v1/tokeninfo',
					data: {
						access_token: newToken.access_token
					},
					timeout: constants.AJAX_TIMEOUT,
					type: "GET"
				}).done(function(data) {
					if(authorizationMgr.getUserId() && authorizationMgr.getUserId() != data.user_id) {
						// Wrong user id, try again
						startAuthenticate();
					}
					else {
						authorizationMgr.setUserId(data.user_id);
						authorizationMgr.add(permission);
						authorizationMgr.token = newToken;
						task.chain();
					}
				}).fail(function(jqXHR) {
					var error = {
						code: jqXHR.status,
						message: jqXHR.statusText
					};
					handleError(error, task);
				});
			}

			var authuser = 0;
			var immediate;

			function localAuthenticate() {
				if(authuser > 5) {
					return task.error(new Error('Unable to authenticate user ' + authorizationMgr.getUserId() + ', please sign in with Google.'));
				}
				if(immediate === false) {
					task.timeout = constants.ASYNC_TASK_LONG_TIMEOUT;
				}
				var scopeList = _.chain(scopeMap).pick(authorizationMgr.getListWithNew(permission)).flatten().value();
				gapi.auth.authorize({
					client_id: constants.GOOGLE_CLIENT_ID,
					scope: scopeList,
					immediate: immediate,
					authuser: immediate === false ? '' : authuser
				}, function(authResult) {
					newToken = gapi.auth.getToken();
					gapi.auth.setToken(currentToken);
					if(!authResult || authResult.error) {
						if(connected === true && immediate === true) {
							// If immediate did not work
							if(authuser < 5 && authorizationMgr.getUserId()) {
								// Try immediate with next authuser
								authuser++;
							}
							else {
								// retry without immediate flag
								immediate = false;
							}
							task.chain(oauthRedirect);
						}
						else {
							// Error
							task.error(new Error("Access to Google account is not authorized."));
						}
					}
					else {
						// Success but we need to check the user id
						authorizationMgr.setAuthUser(authuser);
						immediate === true && authuser++;
						task.chain(getTokenInfo);
					}
				});
			}

			function oauthRedirect() {
				if(immediate === true) {
					return task.chain(localAuthenticate);
				}
				utils.redirectConfirm('You are being redirected to <strong>Google</strong> authorization page.', function() {
					task.chain(localAuthenticate);
				}, function() {
					task.error(new Error('Operation canceled.'));
				});
			}

			function startAuthenticate() {
				immediate = true;
				if(authorizationMgr.token && authorizationMgr.isAuthorized(permission)) {
					return task.chain();
				}
				if(!authorizationMgr.getUserId()) {
					immediate = false;
				}
				task.chain(oauthRedirect);
			}

			startAuthenticate();
		});
	}

	googleHelper.refreshGdriveToken = function(accountId) {
		var task = new AsyncTask();
		connect(task);
		var authorizationMgr = authorizationMgrMap[accountId];
		authorizationMgr && authorizationMgr.setRefreshFlag();
		authenticate(task, 'gdrive', accountId);
		task.enqueue();
	};

	function runWithToken(accountId, functionToRun) {
		var currentToken = gapi.auth.getToken();
		var authorizationMgr = authorizationMgrMap[accountId];
		gapi.auth.setToken(authorizationMgr.token);
		functionToRun();
		gapi.auth.setToken(currentToken);
	}

	googleHelper.upload = function(fileId, parentId, title, content, contentType, etag, accountId, callback) {
		var result;
		var task = new AsyncTask();
		connect(task);
		authenticate(task, 'gdrive', accountId);
		task.onRun(function() {
			var boundary = '-------314159265358979323846';
			var delimiter = "\r\n--" + boundary + "\r\n";
			var close_delim = "\r\n--" + boundary + "--";
			contentType = contentType || settings.markdownMimeType;
			var metadata = {
				title: title,
				mimeType: contentType
			};
			if(parentId) {
				// Specify the directory
				metadata.parents = [
					{
						kind: 'drive#fileLink',
						id: parentId
					}
				];
			}
			var path = '/upload/drive/v2/files';
			var method = 'POST';
			if(fileId) {
				// If it's an update
				path += "/" + fileId;
				method = 'PUT';
			}
			var headers = {
				'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
			};

			var base64Data = utils.encodeBase64(content);
			var multipartRequestBody = [
				delimiter,
				'Content-Type: application/json\r\n\r\n',
				JSON.stringify(metadata),
				delimiter,
				'Content-Type: ',
				contentType,
				'\r\n',
				'Content-Transfer-Encoding: base64\r\n',
				'\r\n',
				base64Data,
				close_delim
			].join("");

			runWithToken(accountId, function() {
				var request = gapi.client.request({
					'path': path,
					'method': method,
					'params': {
						'uploadType': 'multipart'
					},
					'headers': headers,
					'body': multipartRequestBody
				});
				request.execute(function(response) {
					if(response && response.id) {
						// Upload success
						result = response;
						result.content = content;
						return task.chain();
					}
					var error = response.error;
					// Handle error
					if(error !== undefined && fileId !== undefined) {
						if(error.code === 404) {
							error = 'File ID "' + fileId + '" not found on Google Drive.|removePublish';
						}
						else if(error.code === 412) {
							// We may have missed a file update
							storage.removeItem(accountId + ".gdrive.lastChangeId");
							error = 'Conflict on file ID "' + fileId + '". Please restart the synchronization.';
						}
					}
					handleError(error, task);
				});
			});
		});
		task.onSuccess(function() {
			callback(undefined, result);
		});
		task.onError(function(error) {
			callback(error);
		});
		task.enqueue();
	};

	googleHelper.rename = function(fileId, title, accountId, callback) {
		var result;
		var task = new AsyncTask();
		connect(task);
		authenticate(task, 'gdrive', accountId);
		task.onRun(function() {
			var body = {'title': title};
			runWithToken(accountId, function() {
				var request = gapi.client.drive.files.patch({
					'fileId': fileId,
					'resource': body
				});
				request.execute(function(response) {
					if(response && response.id) {
						// Rename success
						result = response;
						return task.chain();
					}
					var error = response.error;
					// Handle error
					if(error !== undefined && fileId !== undefined) {
						if(error.code === 404) {
							error = 'File ID "' + fileId + '" not found on Google Drive.|removePublish';
						}
					}
					handleError(error, task);
				});
			});
		});
		task.onSuccess(function() {
			callback(undefined, result);
		});
		task.onError(function(error) {
			callback(error);
		});
		task.enqueue();
	};

	googleHelper.checkChanges = function(lastChangeId, accountId, callback) {
		var changes = [];
		var newChangeId = lastChangeId || 0;
		var task = new AsyncTask();
		connect(task);
		authenticate(task, 'gdrive', accountId);
		task.onRun(function() {
			var nextPageToken;

			function retrievePageOfChanges() {
				runWithToken(accountId, function() {
					var request;
					if(nextPageToken === undefined) {
						request = gapi.client.drive.changes.list({
							'startChangeId': newChangeId + 1
						});
					}
					else {
						request = gapi.client.drive.changes.list({
							'pageToken': nextPageToken
						});
					}

					request.execute(function(response) {
						if(!response || !response.largestChangeId) {
							// Handle error
							return handleError(response.error, task);
						}
						// Retrieve success
						newChangeId = response.largestChangeId;
						nextPageToken = response.nextPageToken;
						if(response.items !== undefined) {
							changes = changes.concat(response.items);
						}
						if(nextPageToken !== undefined) {
							task.chain(retrievePageOfChanges);
						}
						else {
							task.chain();
						}
					});
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
		task.enqueue();
	};

	googleHelper.downloadMetadata = function(ids, accountId, callback, skipAuth) {
		var result = [];
		var task = new AsyncTask();
		connect(task);
		if(!skipAuth) {
			authenticate(task, 'gdrive', accountId);
		}
		task.onRun(function() {
			function recursiveDownloadMetadata() {
				if(ids.length === 0) {
					return task.chain();
				}
				var id = ids[0];
				var headers = {};
				var authorizationMgr = authorizationMgrMap[accountId];
				if(authorizationMgr && authorizationMgr.token) {
					headers.Authorization = "Bearer " + authorizationMgr.token.access_token;
				}
				$.ajax({
					url: "https://www.googleapis.com/drive/v2/files/" + id,
					headers: headers,
					data: {
						key: constants.GOOGLE_API_KEY
					},
					dataType: "json",
					timeout: constants.AJAX_TIMEOUT
				}).done(function(data) {
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
		task.enqueue();
	};

	googleHelper.downloadContent = function(objects, accountId, callback, skipAuth) {
		var result = [];
		var task = new AsyncTask();
		// Add some time for user to choose his files
		task.timeout = constants.ASYNC_TASK_LONG_TIMEOUT;
		connect(task);
		if(!skipAuth) {
			authenticate(task, 'gdrive', accountId);
		}
		task.onRun(function() {
			function recursiveDownloadContent() {
				if(objects.length === 0) {
					return task.chain();
				}
				var object = objects[0];
				result.push(object);
				var file;
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
					return task.chain(recursiveDownloadContent);
				}
				var url = file.downloadUrl;
				// if file is a real time document
				if(file.mimeType.indexOf("application/vnd.google-apps.drive-sdk") === 0) {
					file.isRealtime = true;
					url = 'https://www.googleapis.com/drive/v2/files/' + file.id + '/realtime';
				}
				var headers = {};
				var authorizationMgr = authorizationMgrMap[accountId];
				if(authorizationMgr && authorizationMgr.token) {
					headers.Authorization = "Bearer " + authorizationMgr.token.access_token;
				}
				$.ajax({
					url: url,
					headers: headers,
					data: {
						key: constants.GOOGLE_API_KEY
					},
					dataType: file.isRealtime ? 'json' : 'text',
					timeout: constants.AJAX_TIMEOUT
				}).done(function(data) {
					file.content = file.isRealtime ? data.data.value.content.value : data;
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
		task.enqueue();
	};

	googleHelper.uploadImg = function(name, content, albumId, callback) {
		var accountId = 'google.picasa0';
		var result;
		var task = new AsyncTask();
		connect(task);
		authenticate(task, 'picasa', accountId);
		task.onRun(function() {
			var headers = {
				"Slug": name
			};
			if(name.match(/.jpe?g$/i)) {
				headers["Content-Type"] = "image/jpeg";
			}
			else if(name.match(/.png$/i)) {
				headers["Content-Type"] = "image/png";
			}
			else if(name.match(/.gif$/i)) {
				headers["Content-Type"] = "image/gif";
			}
			var authorizationMgr = authorizationMgrMap[accountId];
			if(authorizationMgr && authorizationMgr.token) {
				headers.Authorization = "Bearer " + authorizationMgr.token.access_token;
			}

			$.ajax({
				url: constants.PICASA_IMPORT_IMG_URL + '?' + $.param({
					albumId: albumId
				}),
				headers: headers,
				data: content,
				processData: false,
				dataType: "xml",
				timeout: constants.AJAX_TIMEOUT,
				type: "POST"
			}).done(function(data) {
				result = data;
				task.chain();
			}).fail(function(jqXHR) {
				var error = {
					code: jqXHR.status,
					message: jqXHR.statusText
				};
				if(error.code == 200) {
					error.message = jqXHR.responseText;
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
		task.enqueue();
	};

	function handleError(error, task) {
		var errorMsg;
		if(error) {
			logger.error(error);
			// Try to analyze the error
			if(typeof error === "string") {
				errorMsg = error;
			}
			else {
				errorMsg = "Google error (" + error.code + ": " + error.message + ").";
				if(error.code >= 500 && error.code < 600) {
					// Retry as described in Google's best practices
					return task.retry(new Error(errorMsg));
				}
				else if(error.code === 401 || error.code === 403 || error.code == "token_refresh_required") {
					_.each(authorizationMgrMap, function(authorizationMgr) {
						authorizationMgr.setRefreshFlag();
					});
					errorMsg = "Access to Google account is not authorized.";
					return task.retry(new Error(errorMsg), 1);
				}
				else if(error.code === 0 || error.code === -1) {
					connected = false;
					_.each(authorizationMgrMap, function(authorizationMgr) {
						authorizationMgr.setRefreshFlag();
					});
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
			if(pickerLoaded === true) {
				return task.chain();
			}
			$.ajax({
				url: "//www.google.com/jsapi",
				data: {
					key: constants.GOOGLE_API_KEY
				},
				dataType: "script",
				timeout: constants.AJAX_TIMEOUT
			}).done(function() {
				google.load('picker', '1', {
					callback: function() {
						task.chain();
					}
				});
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

	googleHelper.picker = function(callback, pickerType, accountId) {
		var docs = [];
		var picker;

		function hidePicker() {
			if(picker !== undefined) {
				picker.setVisible(false);
				$(".modal-backdrop, .picker").remove();
			}
		}

		var task = new AsyncTask();
		// Add some time for user to choose his files
		task.timeout = constants.ASYNC_TASK_LONG_TIMEOUT;
		connect(task);
		if(pickerType == 'doc' || pickerType == 'folder') {
			authenticate(task, 'gdrive', accountId);
		}
		else {
			accountId = 'google.picasa0';
			authenticate(task, 'picasa', accountId);
		}
		loadPicker(task);
		task.onRun(function() {
			var authorizationMgr = authorizationMgrMap[accountId];
			var pickerBuilder = new google.picker.PickerBuilder();
			pickerBuilder.setAppId(constants.GOOGLE_DRIVE_APP_ID);
			var view;
			if(pickerType == 'doc') {
				view = new google.picker.DocsView(google.picker.ViewId.DOCS);
				view.setParent('root');
				view.setIncludeFolders(true);
				view.setMimeTypes([
					"text/x-markdown",
					"text/plain",
					"application/octet-stream",
					"application/vnd.google-apps.drive-sdk." + constants.GOOGLE_DRIVE_APP_ID
				].join(","));
				pickerBuilder.enableFeature(google.picker.Feature.NAV_HIDDEN);
				pickerBuilder.enableFeature(google.picker.Feature.MULTISELECT_ENABLED);
				pickerBuilder.addView(view);
				authorizationMgr && authorizationMgr.token && pickerBuilder.setOAuthToken(authorizationMgr.token.access_token);
			}
			else if(pickerType == 'folder') {
				view = new google.picker.DocsView(google.picker.ViewId.FOLDERS);
				view.setParent('root');
				view.setIncludeFolders(true);
				view.setSelectFolderEnabled(true);
				view.setMimeTypes('application/vnd.google-apps.folder');
				pickerBuilder.enableFeature(google.picker.Feature.NAV_HIDDEN);
				pickerBuilder.addView(view);
				authorizationMgr && authorizationMgr.token && pickerBuilder.setOAuthToken(authorizationMgr.token.access_token);
			}
			else if(pickerType == 'img') {
				view = new google.picker.PhotosView();
				view.setType('flat');
				pickerBuilder.addView(view);
				view = new google.picker.PhotosView();
				view.setType('ofuser');
				pickerBuilder.addView(view);
				pickerBuilder.addView(google.picker.ViewId.PHOTO_UPLOAD);
				authorizationMgr && authorizationMgr.token && pickerBuilder.setOAuthToken(authorizationMgr.token.access_token);
			}
			pickerBuilder.setCallback(function(data) {
				if(data.action == google.picker.Action.PICKED || data.action == google.picker.Action.CANCEL) {
					if(data.action == google.picker.Action.PICKED) {
						docs = data.docs;
					}
					hidePicker();
					task.chain();
				}
			});
			picker = pickerBuilder.build();
			$(utils.createBackdrop()).on('click.backdrop', function() {
				hidePicker();
				task.chain();
			});
			picker.setVisible(true);
		});
		task.onSuccess(function() {
			callback(undefined, docs);
		});
		task.onError(function(error) {
			hidePicker();
			callback(error);
		});
		task.enqueue();
	};

	googleHelper.uploadBlogger = function(blogUrl, blogId, postId, labelList, isDraft, publishDate, title, content, callback) {
		var accountId = 'google.blogger0';
		var task = new AsyncTask();
		connect(task);
		authenticate(task, 'blogger', accountId);
		task.onRun(function() {
			var headers = {};
			var authorizationMgr = authorizationMgrMap[accountId];
			if(authorizationMgr && authorizationMgr.token) {
				headers.Authorization = "Bearer " + authorizationMgr.token.access_token;
			}
			function uploadPost() {
				var url = "https://www.googleapis.com/blogger/v3/blogs/" + blogId + "/posts/";
				var data = {
					kind: "blogger#post",
					blog: {
						id: blogId
					},
					labels: labelList,
					title: title,
					content: content
				};
				if(publishDate) {
					data.published = publishDate.toISOString();
				}
				var type = "POST";
				// If it's an update
				if(postId !== undefined) {
					url += postId;
					data.id = postId;
					type = "PUT";
				}
				$.ajax({
					url: url,
					data: JSON.stringify(data),
					headers: headers,
					type: type,
					contentType: "application/json",
					dataType: "json",
					timeout: constants.AJAX_TIMEOUT
				}).done(function(post) {
					postId = post.id;
					task.chain(publish);
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

			function publish() {
				var url = "https://www.googleapis.com/blogger/v3/blogs/" + blogId + "/posts/" + postId;
				if(isDraft) {
					url += "/revert";
				}
				else {
					url += "/publish";
					if(publishDate) {
						url += '?publishDate=' + publishDate.toISOString();
					}
				}
				$.ajax({
					url: url,
					headers: headers,
					type: 'POST',
					dataType: "json",
					timeout: constants.AJAX_TIMEOUT
				}).done(function() {
					task.chain();
				}).fail(function(jqXHR) {
					var error = {
						code: jqXHR.status,
						message: jqXHR.statusText
					};
					// Handle error
					if(error.code === 404) {
						error = 'Post ' + postId + ' not found on Blogger.|removePublish';
					}
					handleError(error, task);
				});
			}

			function getBlogId() {
				if(blogId !== undefined) {
					task.chain(uploadPost);
					return;
				}
				$.ajax({
					url: "https://www.googleapis.com/blogger/v3/blogs/byurl",
					data: {
						url: blogUrl
					},
					headers: headers,
					dataType: "json",
					timeout: constants.AJAX_TIMEOUT
				}).done(function(blog) {
					blogId = blog.id;
					task.chain(uploadPost);
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
		task.enqueue();
	};

	googleHelper.uploadBloggerPage = function(blogUrl, blogId, pageId, isDraft, publishDate, title, content, callback) {
		var accountId = 'google.blogger0';
		var task = new AsyncTask();
		connect(task);
		authenticate(task, 'blogger', accountId);
		task.onRun(function() {
			var headers = {};
			var authorizationMgr = authorizationMgrMap[accountId];
			if(authorizationMgr && authorizationMgr.token) {
				headers.Authorization = "Bearer " + authorizationMgr.token.access_token;
			}
			function uploadPage() {
				var url = "https://www.googleapis.com/blogger/v3/blogs/" + blogId + "/pages/";
				var data = {
					kind: "blogger#page",
					blog: {
						id: blogId
					},
					title: title,
					content: content
				};
				var type = "POST";
				// If it's an update
				if(pageId !== undefined) {
					url += pageId;
					data.id = pageId;
					type = "PUT";
				}
				$.ajax({
					url: url,
					data: JSON.stringify(data),
					headers: headers,
					type: type,
					contentType: "application/json",
					dataType: "json",
					timeout: constants.AJAX_TIMEOUT
				}).done(function(page) {
					pageId = page.id;
					task.chain();
				}).fail(function(jqXHR) {
					var error = {
						code: jqXHR.status,
						message: jqXHR.statusText
					};
					// Handle error
					if(error.code === 404 && pageId !== undefined) {
						error = 'Page ' + pageId + ' not found on Blogger.|removePublish';
					}
					handleError(error, task);
				});
			}

			function getBlogId() {
				if(blogId !== undefined) {
					task.chain(uploadPage);
					return;
				}
				$.ajax({
					url: "https://www.googleapis.com/blogger/v3/blogs/byurl",
					data: {
						url: blogUrl
					},
					headers: headers,
					dataType: "json",
					timeout: constants.AJAX_TIMEOUT
				}).done(function(blog) {
					blogId = blog.id;
					task.chain(uploadPage);
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
			callback(undefined, blogId, pageId);
		});
		task.onError(function(error) {
			callback(error);
		});
		task.enqueue();
	};

	// Use by Google's client.js
	window.delayedFunction = undefined;
	window.runDelayedFunction = function() {
		if(window.delayedFunction !== undefined) {
			window.delayedFunction();
		}
	};

	return googleHelper;
});
