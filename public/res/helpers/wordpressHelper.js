define([
	"jquery",
	"constants",
	"core",
	"utils",
	"storage",
	"logger",
	"eventMgr",
	"classes/AsyncTask"
], function($, constants, core, utils, storage, logger, eventMgr, AsyncTask) {

	var token;

	var wordpressHelper = {};

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

	// Try to authenticate with OAuth
	function authenticate(task) {
		var authWindow;
		var intervalId;
		task.onRun(function() {
			token = storage.wordpressToken;
			if(token !== undefined) {
				return task.chain();
			}
			var errorMsg = "Failed to retrieve a token from Wordpress.";
			// We add time for user to enter his credentials
			task.timeout = constants.ASYNC_TASK_LONG_TIMEOUT;
			var code;

			function oauthRedirect() {
				utils.redirectConfirm('You are being redirected to <strong>WordPress</strong> authorization page.', function() {
					task.chain(getCode);
				}, function() {
					task.error(new Error('Operation canceled.'));
				});
			}

			function getCode() {
				storage.removeItem("wordpressCode");
				authWindow = utils.popupWindow('html/wordpress-oauth-client.html?client_id=' + constants.WORDPRESS_CLIENT_ID, 'stackedit-wordpress-oauth', 960, 600);
				authWindow.focus();
				intervalId = setInterval(function() {
					if(authWindow.closed === true) {
						clearInterval(intervalId);
						authWindow = undefined;
						intervalId = undefined;
						code = storage.wordpressCode;
						if(code === undefined) {
							return task.error(new Error(errorMsg));
						}
						storage.removeItem("wordpressCode");
						task.chain(getToken);
					}
				}, 500);
			}

			function getToken() {
				$.getJSON(constants.WORDPRESS_PROXY_URL + "authenticate/" + code, function(data) {
					if(data.token !== undefined) {
						token = data.token;
						storage.wordpressToken = token;
						task.chain();
					}
					else {
						task.error(new Error(errorMsg));
					}
				});
			}

			task.chain(oauthRedirect);
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

	wordpressHelper.upload = function(site, postId, tags, status, date, title, content, callback) {
		var task = new AsyncTask();
		connect(task);
		authenticate(task);
		var siteId;
		task.onRun(function() {
			var url = constants.WORDPRESS_PROXY_URL + "post";
			var data = {
				token: token,
				site: site,
				postId: postId,
				tags: tags,
				status: status,
				date: date,
				title: title,
				content: content
			};
			$.ajax({
				url: url,
				data: data,
				type: "POST",
				dataType: "json",
				timeout: constants.AJAX_TIMEOUT
			}).done(function(response) {
				if(response.body.ID) {
					postId = response.body.ID;
					siteId = response.body.site_ID;
					return task.chain();
				}
				var error = {
					code: response.code,
					message: response.body.error
				};
				// Handle error
				if(error.code === 404) {
					if(error.message == "unknown_blog") {
						error = 'Site "' + site + '" not found on WordPress.|removePublish';
					}
					else if(error.message == "unknown_post") {
						error = 'Post ' + postId + ' not found on WordPress.|removePublish';
					}
				}
				handleError(error, task);
			}).fail(function(jqXHR) {
				var error = {
					code: jqXHR.status,
					message: jqXHR.statusText
				};
				handleError(error, task);
			});
		});
		task.onSuccess(function() {
			callback(undefined, siteId, postId);
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
				errorMsg = "Could not publish on WordPress.";
				if((error.code === 400 && error.message == "invalid_token") || error.code === 401 || error.code === 403) {
					storage.removeItem("wordpressToken");
					errorMsg = "Access to WordPress account is not authorized.";
					return task.retry(new Error(errorMsg), 1);
				}
				else if(error.code <= 0) {
					core.setOffline();
					errorMsg = "|stopPublish";
				}
			}
		}
		task.error(new Error(errorMsg));
	}

	return wordpressHelper;
});
