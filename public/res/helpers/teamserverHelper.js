define([
	"underscore",
	"jquery",
	"constants",
	"core",
	"utils",
	"storage",
	"logger",
	"eventMgr",
	"classes/AsyncTask"
], function(_, $, constants, core, utils, storage, logger, eventMgr, AsyncTask) {

	var connected = false;
	var authenticated = true;

	var teamserverHelper = {};

	// Listen to offline status changes
	var isOffline = false;
	eventMgr.addListener("onOfflineChanged", function(isOfflineParam) {
		isOffline = isOfflineParam;
	});

	function connect(task) {
		task.onRun(function() {
			if(isOffline === true) {
				connected = false;
				return task.error(new Error("Operation not available in offline mode.|stopPublish"));
			}
			if(connected === true) {
				return task.chain();
			}
			$.ajax({
				url: constants.TEAM_SERVER_URL + 'ping',
				timeout: constants.AJAX_TIMEOUT
			}).done(function() {
				task.chain();
			}).fail(function(jqXHR) {
				var error = {
					code: jqXHR.status,
					message: jqXHR.statusText
				};
				handleError(error, task);
			});
		});
	}

	function authenticate(task) {
		task.onRun(function() {
			if(authenticated === true) {
				return task.chain();
			}
		});
	}

	teamserverHelper.upload = function(repo, id, title, content, callback) {
		var result;
		var task = new AsyncTask();
		connect(task);
		authenticate(task);
		task.onRun(function() {
			var url = constants.TEAM_SERVER_URL + 'repo/' + repo + '/document';
			var type = 'POST';
			if(id) {
				url += '/' + id;
				type = 'PUT';
			}
			$.ajax({
				url: url,
				type: type,
				data: {
					title: title,
					content: content
				},
				dataType: "json",
				timeout: constants.AJAX_TIMEOUT
			}).done(function(data) {
				result = data;
				task.chain();
			}).fail(function(jqXHR) {
				var error = {
					code: jqXHR.status,
					message: jqXHR.statusText
				};
				// Handle error
				if(error.code === 404) {
					error = 'File ID "' + id + '" not found on the Team Server.';
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

	teamserverHelper.checkChanges = function(repo, lastChangeId, callback) {
		var changes;
		var newChangeId = lastChangeId;
		var task = new AsyncTask();
		connect(task);
		authenticate(task);
		task.onRun(function() {
			var url = constants.TEAM_SERVER_URL + 'repo/' + repo + '/changes/';
			var type = 'GET';
			if(lastChangeId) {
				url += lastChangeId;
			}
			$.ajax({
				url: url,
				type: type,
				dataType: "json",
				timeout: constants.AJAX_TIMEOUT
			}).done(function(data) {
				newChangeId = data.newChangeId;
				changes = data.changes;
				task.chain();
			}).fail(function(jqXHR) {
				var error = {
					code: jqXHR.status,
					message: jqXHR.statusText
				};
				handleError(error, task);
			});
		});
		task.onSuccess(function() {
			callback(undefined, changes, newChangeId);
		});
		task.onError(function(error) {
			callback(error);
		});
		task.enqueue();
	};

	teamserverHelper.download = function(repo, ids, callback) {
		var result = [];
		var task = new AsyncTask();
		connect(task);
		authenticate(task);
		task.onRun(function() {
			function recursiveDownloadMetadata() {
				if(ids.length === 0) {
					return task.chain();
				}
				var id = ids[0];
				var url = constants.TEAM_SERVER_URL + 'repo/' + repo + '/document/' + id;
				$.ajax({
					url: url,
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
					if(error.code === 404) {
						error = 'File ID "' + id + '" not found on the Team Server.';
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
				else if(error.code === 401 || error.code === 403) {
					authenticated = false;
					return task.retry(new Error(errorMsg), 1);
				}
				else if(error.code === 0 || error.code === -1) {
					connected = false;
					errorMsg = "|stopPublish";
				}
			}
		}
		task.error(new Error(errorMsg));
	}

	var $windowElt = $(window);
	var origin = window.location.protocol + '//' + window.location.host;
	teamserverHelper.picker = function(repo, callback) {
		var docs = [];
		var iframe;

		function hidePicker() {
			if(iframe !== undefined) {
				iframe.removeIframe();
				$windowElt.off('message.teamserver');
			}
		}

		var task = new AsyncTask();
		// Add some time for user to choose his files
		task.timeout = constants.ASYNC_TASK_LONG_TIMEOUT;
		connect(task);
		task.onRun(function() {
			iframe = utils.iframe(constants.TEAM_SERVER_URL + 'teamserver.html#/documentPicker', 550, 500);
			$windowElt.on('message.teamserver', function(evt) {
				evt = evt.originalEvent;
				if(evt.origin == origin && evt.data.status == 'DocumentPickerFinished') {
					docs = evt.data.documents;
					hidePicker();
					task.chain();
				}
			});
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

	return teamserverHelper;
});
