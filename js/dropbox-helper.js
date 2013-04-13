define(["jquery", "async-runner"], function($, asyncTaskRunner) {

	// Dependencies
	var core = undefined;
	var fileManager = undefined;

	var client = undefined;
	var authenticated = false;

	var dropboxHelper = {};

	// Try to connect dropbox by downloading client.js
	function connect(callback) {
		callback = callback || core.doNothing;
		var asyncTask = {};
		asyncTask.run = function() {
			if(core.isOffline === true) {
				client = undefined;
				core.showMessage("Operation not available in offline mode.");
				asyncTask.error();
				return;
			}
			if (client !== undefined) {
				asyncTask.success();
				return;
			}
			$.ajax({
				url : "lib/dropbox.min.js",
				dataType : "script", timeout : AJAX_TIMEOUT
			}).done(function() {
				asyncTask.success();
			}).fail(function() {
				asyncTask.error();
			});
		};
		asyncTask.onSuccess = function() {
			client = new Dropbox.Client({
			    key: DROPBOX_APP_KEY,
			    secret: DROPBOX_APP_SECRET
			});
			client.authDriver(new Dropbox.Drivers.Popup({
			    receiverUrl: BASE_URL + "dropbox-oauth-receiver.html",
			    rememberUser: true
			}));
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
			if (client === undefined) {
				callback();
				return;
			}

			var asyncTask = {};
			asyncTask.run = function() {
				if (authenticated === true) {
					asyncTask.success();
					return;
				}
				if (immediate === false) {
					core.showMessage("Please make sure the Dropbox authorization popup is not blocked by your browser.");
				}
				client.authenticate({interactive: !immediate}, function(error, client) {
					if (client.authState !== Dropbox.Client.DONE) {
						// Handle error
						asyncTask.error();
						return;
					}

					asyncTask.success();
				});
			};
			asyncTask.onSuccess = function() {
				callback();
			};
			asyncTask.onError = function() {
				// If immediate did not work retry without immediate flag
				if (client !== undefined && immediate === true) {
					authenticate(callback, false);
					return;
				}
				callback();
			};
			asyncTaskRunner.addTask(asyncTask);
		});
	}

	dropboxHelper.upload = function(path, content, callback) {
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
						fileSyncIndex = SYNC_PROVIDER_DROPBOX + encodeURIComponent(stat.path.toLowerCase());
						localStorage[fileSyncIndex + ".version"] = stat.versionTag;
						asyncTask.success();
						return;
					}
					// Handle error
					if(error.status === Dropbox.ApiError.INVALID_PARAM) {
						error = 'Could not upload document into path "' + path + '".';
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

	dropboxHelper.checkUpdates = function(lastChangeId, callback) {
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
									var version = localStorage[SYNC_PROVIDER_DROPBOX
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
				asyncTask.onError = function() {
					callback();
				};
				asyncTaskRunner.addTask(asyncTask);
			}
			retrievePageOfChanges(newChangeId);
		});
	};

	dropboxHelper.downloadMetadata = function(paths, callback, result) {
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
				dropboxHelper.downloadMetadata(paths, callback, result);
			};
			asyncTask.onError = function() {
				callback();
			};
			asyncTaskRunner.addTask(asyncTask);
		});
	};

	dropboxHelper.downloadContent = function(objects, callback, result) {
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
				dropboxHelper.downloadContent(objects, callback, result);
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
			console.error(error);
			// Try to analyze the error
			if (typeof error === "string") {
				errorMsg = error;
			} else if (error.status === Dropbox.ApiError.INVALID_TOKEN
				|| error.status === Dropbox.ApiError.OAUTH_ERROR) {
				authenticated = false;
				errorMsg = "Access to Dropbox is not authorized.";
			} else if (error.status === Dropbox.ApiError.NETWORK_ERROR) {
				client = undefined;
				authenticated = false;
				core.setOffline();
			} else {
				errorMsg = "Dropbox error ("
					+ error.status + ").";
			}
		}
		asyncTask.error();
	}

	var pickerLoaded = false;
	function loadPicker(callback) {
		connect(function() {
			if (client === undefined) {
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
					url : "https://www.dropbox.com/static/api/1/dropbox.js",
					dataType : "script", timeout : AJAX_TIMEOUT
				}).done(function() {
					asyncTask.success();
				}).fail(function() {
					asyncTask.error();
				});
			};
			asyncTask.onSuccess = function() {
				pickerLoaded = true;
				callback();
			};
			asyncTask.onError = function() {
				core.setOffline();
				callback();
			};
			asyncTaskRunner.addTask(asyncTask);
		});
	}
	
	dropboxHelper.picker = function(callback) {
		callback = callback || core.doNothing;
		loadPicker(function() {
			if (pickerLoaded === false) {
				callback();
				return;
			}
			var options = {};
			options.multiselect = true;
			options.linkType = "direct";
			options.success = function(files) {
				var paths = [];
				for(var i=0; i<files.length; i++) {
					var path = files[i].link;
					path = path.replace(/.*\/view\/[^\/]*/, "");
					paths.push(decodeURI(path));
				}
				callback(paths);
            };
            options.cancel = function() {
            	callback();
            };
			Dropbox.choose(options);
			core.showMessage("Please make sure the Dropbox chooser popup is not blocked by your browser.");
		});
	};

	dropboxHelper.importFiles = function(paths) {
		dropboxHelper.downloadMetadata(paths, function(result) {
			if(result === undefined) {
				return;
			}
			dropboxHelper.downloadContent(result, function(result) {
				if(result === undefined) {
					return;
				}
				for(var i=0; i<result.length; i++) {
					var file = result[i];
					fileSyncIndex = SYNC_PROVIDER_DROPBOX + encodeURIComponent(file.path.toLowerCase());
					localStorage[fileSyncIndex + ".version"] = file.versionTag;
					var contentCRC = core.crc32(file.content);
					localStorage[fileSyncIndex + ".contentCRC"] = contentCRC;
					var fileIndex = fileManager.createFile(file.name, file.content, [fileSyncIndex]);
					fileManager.selectFile(fileIndex);
					core.showMessage('"' + file.name + '" imported successfully from Dropbox.');
				}
			});
		});
	};

	dropboxHelper.init = function(coreModule, fileManagerModule) {
		core = coreModule;
		fileManager = fileManagerModule;
	};
	
	dropboxHelper.checkPath = function(path) {
		if(!path.match(/^[^\\<>:"\|?\*]+$/)) {
			core.showError('"' + path + '" contains invalid characters.');
			return undefined;
		}
		if(path.indexOf("/") !== 0) {
			return "/" + path;
		}
		return path;
	};
	
	return dropboxHelper;
});
