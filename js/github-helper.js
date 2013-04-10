define(["jquery", "async-runner"], function($, asyncTaskRunner) {

	// Dependencies
	var core = undefined;
	var fileManager = undefined;

	var connected = undefined;
	var client = undefined;

	var githubHelper = {};

	// Try to connect github by downloading js file
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
			$.ajax({
				url : "lib/github.js",
				dataType : "script", timeout : AJAX_TIMEOUT
			}).done(function() {
				connected = true;
				asyncTask.success();
			}).fail(function() {
				asyncTask.error();
			});
		};
		asyncTask.onSuccess = function() {
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
			asyncTask.run = function() {
				if (client !== undefined) {
					asyncTask.success();
					return;
				}
				if (immediate !== false) {
				}
				core.showMessage("Please make sure the Github authorization popup is not blocked by your browser.");
				myWindow=core.popupWindow('github-oauth-client.html?client_id=test','stackedit-github-oauth',500,400);
				myWindow.focus();
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

	githubHelper.upload = function(path, content, callback) {
		callback = callback || core.doNothing;
		authenticate(function() {
			if (client === undefined) {
				callback();
				return;
			}

			var fileSyncIndex = undefined;
			var asyncTask = {};
			asyncTask.run = function() {
				client.writeFile(path, content, function(error, stat) {
					if (!error) {
						fileSyncIndex = SYNC_PROVIDER_GITHUB + encodeURIComponent(stat.path.toLowerCase());
						localStorage[fileSyncIndex + ".version"] = stat.versionTag;
						asyncTask.success();
						return;
					}
					// Handle error
					if(error.status === Github.ApiError.INVALID_PARAM) {
						error = 'Could not upload document into path "' + path + '".';
					}
					handleError(error, asyncTask, callback);
				});
			};
			asyncTask.onSuccess = function() {
				callback(fileSyncIndex);
			};
			asyncTaskRunner.addTask(asyncTask);
		});
	};

	githubHelper.checkUpdates = function(lastChangeId, callback) {
		callback = callback || core.doNothing;
		authenticate(function() {
			if (client === undefined) {
				callback();
				return;
			}

			var changes = [];
			var newChangeId = lastChangeId || 0;
			function retrievePageOfChanges(changeId) {
				var shouldPullAgain = false;
				var asyncTask = {};
				asyncTask.run = function() {
					client.pullChanges(changeId, function(error, pullChanges) {
						if (pullChanges && pullChanges.cursorTag) {
							// Retrieve success
							newChangeId = pullChanges.cursor();
							shouldPullAgain = pullChanges.shouldPullAgain;
							if(pullChanges.changes !== undefined) {
								for(var i=0; i<pullChanges.changes.length; i++) {
									var item = pullChanges.changes[i];
									var version = localStorage[SYNC_PROVIDER_GITHUB
									    + encodeURIComponent(item.path.toLowerCase()) + ".version"];
									if(version && (item.wasRemoved || item.stat.versionTag != version)) {
										changes.push(item);
									}
								}
							}
							asyncTask.success();
							return;
						}
						// Handle error
						handleError(error, asyncTask, callback);
					});
				};
				asyncTask.onSuccess = function() {
					if (shouldPullAgain === true) {
						retrievePageOfChanges(newChangeId);
					} else {
						callback(changes, newChangeId);
					}
				};
				asyncTaskRunner.addTask(asyncTask);
			}
			retrievePageOfChanges(newChangeId);
		});
	};

	githubHelper.downloadMetadata = function(paths, callback, result) {
		callback = callback || core.doNothing;
		result = result || [];
		if(paths.length === 0) {
			callback(result);
			return;
		}
		
		authenticate(function() {
			if (client === undefined) {
				callback();
				return;
			}

			var path = paths.pop();
			var asyncTask = {};
			asyncTask.run = function() {
				client.stat(path, function(error, stat) {
					if(stat) {
						result.push(stat);
						asyncTask.success();
						return;
					}
					handleError(error, asyncTask, callback);
				});
			};
			asyncTask.onSuccess = function() {
				githubHelper.downloadMetadata(paths, callback, result);
			};
			asyncTaskRunner.addTask(asyncTask);
		});
	};

	githubHelper.downloadContent = function(objects, callback, result) {
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
		if(object.isFile === true) {
			file = object;
		}
		// object may be a change
		else if(object.wasRemoved !== undefined) {
			file = object.stat;
		}
		if(!file) {
			this.downloadContent(objects, callback, result);
			return;
		}
		
		authenticate(function() {
			if (client === undefined) {
				callback();
				return;
			}
			
			var asyncTask = {};
			asyncTask.run = function() {
				client.readFile(file.path, function(error, data) {
					if(data) {
						file.content = data;
						asyncTask.success();
						return;
					}
					handleError(error, asyncTask, callback);
				});
			};
			asyncTask.onSuccess = function() {
				githubHelper.downloadContent(objects, callback, result);
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
			} else if (error.status === Github.ApiError.INVALID_TOKEN
				|| error.status === Github.ApiError.OAUTH_ERROR) {
				client = undefined;
				errorMsg = "Access to Github is not authorized.";
			} else if (error.status === Github.ApiError.NETWORK_ERROR) {
				connected = false;
				client = undefined;
				core.setOffline();
			} else {
				errorMsg = "Github error ("
					+ error.status + ").";
			}
		}
		asyncTask.error();
	}

	githubHelper.init = function(coreModule, fileManagerModule) {
		core = coreModule;
		fileManager = fileManagerModule;
		authenticate();
	};
	
	return githubHelper;
});
