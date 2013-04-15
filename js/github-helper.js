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
			var errorMsg = "Access to GitHub is not authorized.";
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
					core.showError();
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
					if(authWindow.closed === true || code !== undefined) {
						localStorage.removeItem("githubCode");
						if(code === undefined) {
							asyncTask.error();
							return;
						}
						$.getJSON(GATEKEEPER_URL + "authenticate/" + code, function(data) {
							if(data.token !== undefined) {
								localStorage["githubToken"] = data.token;
								asyncTask.success();
							}
							else {
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
				core.showError(errorMsg);
				callback();
			};
			asyncTaskRunner.addTask(asyncTask);
		});
	}

	githubHelper.upload = function(reponame, branch, path, content, commitMsg, callback) {
		callback = callback || core.doNothing;
		authenticate(function() {
			if (github === undefined) {
				callback("error");
				return;
			}

			var error = undefined;
			var asyncTask = {};
			asyncTask.run = function() {
				var user = github.getUser();
				user.show(undefined, function(err, result) {
					if(err) {
						error = err.error;
						asyncTask.error();
						return;
					}
					var repo = github.getRepo(result.login, reponame);
					repo.write(branch, path, content, commitMsg, function(err) {
						if(err) {
							error = err.error;
							asyncTask.error();
							return;
						}
						asyncTask.success();
					});
				});
			};
			asyncTask.onSuccess = function() {
				callback(error);
			};
			asyncTask.onError = function() {
				if(error !== undefined) {
					console.error(error);
				}
				var errorMsg = "Could not publish on GitHub.";
				if(error === 401 || error === 403) {
					github = undefined;
					// Token must be renewed
					localStorage.removeItem("githubToken");
					errorMsg = "Access to GitHub is not authorized.";
				}
				else if(error === 0) {
					connected = false;
					github = undefined;
					core.setOffline();
				}
				core.showError(errorMsg);
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
