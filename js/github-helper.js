define(["jquery", "async-runner"], function($, asyncTaskRunner) {

	// Dependencies
	var core = undefined;

	var connected = undefined;
	var github = undefined;

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
		connect(function() {
			if (connected === false) {
				callback();
				return;
			}

			var intervalId = undefined;
			var authWindow = undefined;
			var token = localStorage["githubToken"];
			var asyncTask = {};
			asyncTask.run = function() {
				if (github !== undefined) {
					asyncTask.success();
					return;
				}
				
				if (token !== undefined) {
					 github = new Github({
						  token: token,
						  auth: "oauth"
						});
					 asyncTask.success();
					 return;
				}
				if(immediate === true) {
					core.showError("Unable to perform GitHub authenticate.");
					asyncTask.error();
					return;
				}
				// We add time for user to enter his credentials
				asyncTask.timeout = AUTH_POPUP_TIMEOUT;
				core.showMessage("Please make sure the Github authorization popup is not blocked by your browser.");
				localStorage.removeItem("githubCode");
				authWindow = core.popupWindow(
					'github-oauth-client.html?client_id=' + GITHUB_CLIENT_ID,
					'stackedit-github-oauth', 960, 600);
				authWindow.focus();
				intervalId = setInterval(function() {
					var code = localStorage["githubCode"];
					if(code !== undefined) {
						localStorage.removeItem("githubCode");
						$.getJSON(GATEKEEPER_URL + "authenticate/" + code, function(data) {
							if(data.token !== undefined) {
								localStorage["githubToken"] = data.token;
								asyncTask.success();
							}
							else {
								core.showError("Error retrieving GitHub Oauth token.");
								asyncTask.error();
							}
						});
					}
				}, 500);
			};
			asyncTask.onSuccess = function() {
				if(intervalId !== undefined) {
					clearInterval(intervalId);
				}
				if (github !== undefined) {
					callback();
					return;
				}
				authenticate(callback, true);
			};
			asyncTask.onError = function() {
				if(intervalId !== undefined) {
					clearInterval(intervalId);
				}
				if(authWindow !== undefined) {
					authWindow.close();
				}
				callback();
			};
			asyncTaskRunner.addTask(asyncTask);
		});
	}

	githubHelper.upload = function(username, reponame, branch, path, content, commitMsg, callback) {
		callback = callback || core.doNothing;
		authenticate(function() {
			if (github === undefined) {
				callback();
				return;
			}

			var error = undefined;
			var asyncTask = {};
			asyncTask.run = function() {
				var repo = github.getRepo(username, reponame);
				repo.write(branch, path, content, commitMsg, function(err) {
					if(!err) {
						asyncTask.success();
						return;
					}
					error = err.error;
					asyncTask.error();
				});
			};
			asyncTask.onSuccess = function() {
				callback(error);
			};
			asyncTask.onError = function() {
				if(error === 401) {
					github = undefined;
					// Token must be renewed
					localStorage.removeItem("githubToken");
					githubHelper.upload(username, reponame, branch, path, content, commitMsg, callback);
					return;
				}
				if(error === 0) {
					connected = false;
					github = undefined;
					core.setOffline();
				}
				core.showError("Could not publish on GitHub");
				callback(error);
			};
			asyncTaskRunner.addTask(asyncTask);
		});
	};
	
	githubHelper.init = function(coreModule) {
		core = coreModule;
	};
	
	return githubHelper;
});
