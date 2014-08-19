define([
	"jquery",
	"constants",
	"core",
	"logger",
	"eventMgr",
	"settings",
	"classes/AsyncTask"
], function($, constants, core, logger, eventMgr, settings, AsyncTask) {

	var sshHelper = {};

	// Listen to offline status changes
	var isOffline = false;
	eventMgr.addListener("onOfflineChanged", function(isOfflineParam) {
		isOffline = isOfflineParam;
	});

	// Only used to check the offline status
	function connect(task) {
		task.onRun(function() {
			if(isOffline === true) {
				return task.error(new Error("Operation not available in offline mode.|stopPublish"));
			}
			task.chain();
		});
	}

	sshHelper.upload = function(host, port, username, password, path, title, content, callback) {
		var task = new AsyncTask();
		connect(task);
		task.onRun(function() {
			var url = constants.SSH_PUBLISH_URL + '?' + $.param({
				host: host,
				port: port,
				username: username,
				password: password,
				path: path,
				title: title
			});
			$.ajax({
				url: url,
				data: content,
				type: "POST",
				timeout: constants.AJAX_TIMEOUT
			}).done(function(response) {
				if(response.error === undefined) {
					return task.chain();
				}
				handleError(response.error, task);
			}).fail(function(jqXHR) {
				var error = {
					code: jqXHR.status,
					message: jqXHR.statusText
				};
				handleError(error, task);
			});
		});
		task.onSuccess(function() {
			callback();
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
				errorMsg = "SSH error: " + error + ".";
			}
			else {
				errorMsg = "Could not publish on SSH server.";
				if(error.code <= 0) {
					core.setOffline();
					errorMsg = "|stopPublish";
				}
			}
		}
		task.error(new Error(errorMsg));
	}

	return sshHelper;
});
