define(["jquery", "core", "async-runner"], function($, core, asyncRunner) {

	var connected = undefined;
	var github = undefined;

	var githubHelper = {};

	// Try to connect github by downloading js file
	function connect(task) {
		task.onRun(function() {
			if(core.isOffline === true) {
				connected = false;
				core.showMessage("Operation not available in offline mode.");
				task.error();
				return;
			}
			if (connected === true) {
				task.chain();
				return;
			}
			$.ajax({
				url : "lib/github.js",
				dataType : "script", timeout : AJAX_TIMEOUT
			}).done(function() {
				connected = true;
				task.chain();
			}).fail(function() {
				core.setOffline();
				task.error(new Error("Network timeout|stopPublish"));
			});
		});
	}

	// Try to authenticate with Oauth
	function authenticate(task) {
		var authWindow = undefined;
		var intervalId = undefined;
		task.onRun(function() {
			if (github !== undefined) {
				task.chain();
				return;
			}
			var token = localStorage["githubToken"];
			if(token !== undefined) {
				github = new Github({
					  token: token,
					  auth: "oauth"
					});
				task.chain();
				return;
			}
			core.showMessage("Please make sure the Github authorization popup is not blocked by your browser.");
			// We add time for user to enter his credentials
			task.timeout = ASYNC_TASK_LONG_TIMEOUT;
			var code = undefined;
			function getCode() {
				localStorage.removeItem("githubCode");
				authWindow = core.popupWindow(
					'github-oauth-client.html?client_id=' + GITHUB_CLIENT_ID,
					'stackedit-github-oauth', 960, 600);
				authWindow.focus();
				intervalId = setInterval(function() {
					if(authWindow.closed === true) {
						clearInterval(intervalId);
						authWindow = undefined;
						intervalId = undefined;
						code = localStorage["githubCode"];
						if(code === undefined) {
							task.error();
							return;
						}
						localStorage.removeItem("githubCode");
						task.chain(getToken);
					}
				});
			}
			function getToken() {
				$.getJSON(GATEKEEPER_URL + "authenticate/" + code, function(data) {
					if(data.token !== undefined) {
						token = data.token;
						localStorage["githubToken"] = token;
						github = new Github({
							  token: token,
							  auth: "oauth"
							});
						task.chain();
					}
					else {
						task.error();
					}
				});
			}
			task.chain(getCode);
		});
		task.onError(function() {
			if(intervalId !== undefined) {
				clearInterval(intervalId);
			}
			if(authWindow !== undefined) {
				authWindow.close();
			}
		});
	}

	githubHelper.upload = function(reponame, branch, path, content, commitMsg, callback) {
		callback = callback || core.doNothing;
		var task = asyncRunner.createTask();
		connect(task);
		authenticate(task);
		task.onRun(function() {
			var userLogin = undefined;
			function getUserLogin() {
				var user = github.getUser();
				user.show(undefined, function(err, result) {
					if(err) {
						task.error(err);
						return;
					}
					userLogin = result.login;
					task.chain(write);
				});
			}
			function write() {
				var repo = github.getRepo(userLogin, reponame);
				repo.write(branch, path, content, commitMsg, function(err) {
					if(err) {
						task.error(err);
						return;
					}
					task.chain();
				});
			}
			task.chain(getUserLogin);
		});
		task.onSuccess(function() {
			callback();
		});
		task.onError(function(err) {
			var errorMsg = "Could not publish on GitHub.";
			if(err !== undefined) {
				console.error(err);
				if(err.error === 401 || err.error === 403) {
					github = undefined;
					// Token must be renewed
					localStorage.removeItem("githubToken");
					errorMsg = "Access to GitHub is not authorized.";
				}
				else if(err.error === 0) {
					connected = false;
					github = undefined;
					core.setOffline();
				}
			}
			core.showError(errorMsg);
			callback(errorMsg);
		});
		asyncRunner.addTask(task);
	};
	
	return githubHelper;
});
