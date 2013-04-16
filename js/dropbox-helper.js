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
		if(core.isOffline === true) {
			client = undefined;
			core.showMessage("Operation not available in offline mode.");
			callback(true);
			return;
		}		
		if (client !== undefined) {
			callback();
			return;
		}
		$.ajax({
			url : "lib/dropbox.min.js",
			dataType : "script", timeout : AJAX_TIMEOUT
		}).done(function() {
			client = new Dropbox.Client({
			    key: DROPBOX_APP_KEY,
			    secret: DROPBOX_APP_SECRET
			});
			client.authDriver(new Dropbox.Drivers.Popup({
			    receiverUrl: BASE_URL + "dropbox-oauth-receiver.html",
			    rememberUser: true
			}));
			callback();
		}).fail(function() {
			core.setOffline();
			callback(true);
		});
	}

	// Try to authenticate with Oauth
	function authenticate(callback, immediate) {
		callback = callback || core.doNothing;
		if (immediate === undefined) {
			immediate = true;
		}
		connect(function(error) {
			if (error) {
				callback(error);
				return;
			}
			if (authenticated === true) {
				callback();
				return;
			}
			if (immediate === false) {
				core.showMessage("Please make sure the Dropbox authorization popup is not blocked by your browser.");
				asyncTaskRunner.setCurrentTaskTimeout(AUTH_POPUP_TIMEOUT);
			}
			client.authenticate({interactive: !immediate}, function(error, client) {
				if (client.authState === Dropbox.Client.DONE) {
					callback();
					return;
				}

				// If immediate did not work retry without immediate flag
				if (client !== undefined && immediate === true) {
					authenticate(callback, false);
					return;
				}
				// Notify error
				callback(true);
			});
		});
	}

	dropboxHelper.upload = function(path, content, callback) {
		callback = callback || core.doNothing;
		var syncIndex = undefined;
		var asyncTask = {};
		asyncTask.run = function() {
			authenticate(function(error) {
				if (error) {
					handleError(error, asyncTask, callback);
					return;
				}

				client.writeFile(path, content, function(error, stat) {
					if (!error) {
						syncIndex = SYNC_PROVIDER_DROPBOX + encodeURIComponent(stat.path.toLowerCase());
						localStorage[syncIndex + ".version"] = stat.versionTag;
						asyncTask.success();
						return;
					}
					// Handle error
					if(error.status === Dropbox.ApiError.INVALID_PARAM) {
						error = 'Could not upload document into path "' + path + '".';
					}
					handleError(error, asyncTask, callback);
				});
			});
		};
		asyncTask.onSuccess = function() {
			callback(undefined, syncIndex);
		};
		asyncTask.onError = function() {
			callback(true);
		};
		asyncTaskRunner.addTask(asyncTask);
	};

	dropboxHelper.checkUpdates = function(lastChangeId, callback) {
		callback = callback || core.doNothing;
		var changes = [];
		var newChangeId = lastChangeId || 0;
		var asyncTask = {};
		asyncTask.run = function() {
			function retrievePageOfChanges(changeId) {
				if(asyncTask.finished === true) {
					return;
				}
				authenticate(function(error) {
					if (error) {
						handleError(error, asyncTask, callback);
						return;
					}

					client.pullChanges(changeId, function(error, pullChanges) {
						if (error) {
							handleError(error, asyncTask, callback);
							return;
						}
						
						// Retrieve success
						newChangeId = pullChanges.cursor();
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
						if (pullChanges.shouldPullAgain) {
							retrievePageOfChanges(newChangeId);
						} else {
							asyncTask.success();
						}
					});
				});
			}
			retrievePageOfChanges(newChangeId);
		};
		asyncTask.onSuccess = function() {
			callback(undefined, changes, newChangeId);
		};
		asyncTask.onError = function() {
			callback(true);
		};
		asyncTaskRunner.addTask(asyncTask);
	};

	dropboxHelper.downloadMetadata = function(paths, callback) {
		callback = callback || core.doNothing;
		result = result || [];
	
		var path = paths.pop();
		var asyncTask = {};
		asyncTask.run = function() {
			function recursiveDownloadMetadata() {
				if(asyncTask.finished === true) {
					return;
				}
				if(paths.length === 0) {
					asyncTask.success();
					return;
				}
				authenticate(function(error) {
					if (error) {
						handleError(error, asyncTask, callback);
						return;
					}

					client.stat(path, function(error, stat) {
						if(stat) {
							result.push(stat);
							recursiveDownloadMetadata();
							return;
						}
						handleError(error, asyncTask, callback);
					});
				});
			}
			recursiveDownloadMetadata();
		};
		asyncTask.onSuccess = function() {
			callback(undefined, result);
		};
		asyncTask.onError = function() {
			callback(true);
		};
		asyncTaskRunner.addTask(asyncTask);
	};

	dropboxHelper.downloadContent = function(objects, callback, result) {
		callback = callback || core.doNothing;
		result = result || [];
		
		var asyncTask = {};
		asyncTask.run = function() {
			
			function recursiveDownloadContent() {
				if(asyncTask.finished === true) {
					return;
				}
				if(objects.length === 0) {
					asyncTask.success();
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
					recursiveDownloadContent();
					return;
				}
				authenticate(function(error) {
					if (error) {
						handleError(error, asyncTask, callback);
						return;
					}
					
					client.readFile(file.path, function(error, data) {
						if(data) {
							file.content = data;
							recursiveDownloadContent();
							return;
						}
						handleError(error, asyncTask, callback);
					});
				});
			}
			recursiveDownloadContent();
		};
		asyncTask.onSuccess = function() {
			callback(undefined, result);
		};
		asyncTask.onError = function() {
			callback(true);
		};
		asyncTaskRunner.addTask(asyncTask);
	};
	
	function handleError(error, asyncTask, callback) {
		var errorMsg = undefined;
		asyncTask.onError = function() {
			if (errorMsg !== undefined) {
				core.showError(errorMsg);
			}
			callback(errorMsg);
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
		if (pickerLoaded === true) {
			callback();
			return;
		}
		connect(function(error) {
			if (error) {
				pickerLoaded = false;
				callback(error);
				return;
			}

			$.ajax({
				url : "https://www.dropbox.com/static/api/1/dropbox.js",
				dataType : "script", timeout : AJAX_TIMEOUT
			}).done(function() {
				pickerLoaded = true;
				callback();
			}).fail(function() {
				callback(true);
			});
		});
	}
	
	dropboxHelper.picker = function(callback) {
		callback = callback || core.doNothing;
		var paths = [];
		
		var asyncTask = {};
		asyncTask.run = function() {
			loadPicker(function(error) {
				if (error) {
					handleError(error, asyncTask, callback);
					return;
				}
				var options = {};
				options.multiselect = true;
				options.linkType = "direct";
				options.success = function(files) {
					for(var i=0; i<files.length; i++) {
						var path = files[i].link;
						path = path.replace(/.*\/view\/[^\/]*/, "");
						paths.push(decodeURI(path));
					}
					asyncTask.success();
	            };
	            options.cancel = function() {
					asyncTask.error();
	            };
				Dropbox.choose(options);
				core.showMessage("Please make sure the Dropbox chooser popup is not blocked by your browser.");
			});
		};
		asyncTask.onSuccess = function() {
			callback(undefined, paths);
		};
		asyncTask.onError = function() {
			callback(true);
		};
		asyncTaskRunner.addTask(asyncTask);
	};

	dropboxHelper.importFiles = function(paths) {
		dropboxHelper.downloadMetadata(paths, function(error, result) {
			if(error) {
				return;
			}
			dropboxHelper.downloadContent(result, function(error, result) {
				if(error) {
					return;
				}
				for(var i=0; i<result.length; i++) {
					var file = result[i];
					syncIndex = SYNC_PROVIDER_DROPBOX + encodeURIComponent(file.path.toLowerCase());
					localStorage[syncIndex + ".version"] = file.versionTag;
					var contentCRC = core.crc32(file.content);
					localStorage[syncIndex + ".contentCRC"] = contentCRC;
					var fileIndex = fileManager.createFile(file.name, file.content, [syncIndex]);
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
