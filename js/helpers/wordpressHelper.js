define([
    "jquery",
    "core",
    "utils",
    "eventMgr",
    "classes/AsyncTask"
], function($, core, utils, eventMgr, AsyncTask) {

    var token = undefined;

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
                task.error(new Error("Operation not available in offline mode.|stopPublish"));
                return;
            }
            task.chain();
        });
    }

    // Try to authenticate with OAuth
    function authenticate(task) {
        var authWindow = undefined;
        var intervalId = undefined;
        task.onRun(function() {
            token = localStorage["wordpressToken"];
            if(token !== undefined) {
                task.chain();
                return;
            }
            eventMgr.onMessage("Please make sure the Wordpress authorization popup is not blocked by your browser.");
            var errorMsg = "Failed to retrieve a token from Wordpress.";
            // We add time for user to enter his credentials
            task.timeout = ASYNC_TASK_LONG_TIMEOUT;
            var code = undefined;
            function getCode() {
                localStorage.removeItem("wordpressCode");
                authWindow = utils.popupWindow('wordpress-oauth-client.html?client_id=' + WORDPRESS_CLIENT_ID, 'stackedit-wordpress-oauth', 960, 600);
                authWindow.focus();
                intervalId = setInterval(function() {
                    if(authWindow.closed === true) {
                        clearInterval(intervalId);
                        authWindow = undefined;
                        intervalId = undefined;
                        code = localStorage["wordpressCode"];
                        if(code === undefined) {
                            task.error(new Error(errorMsg));
                            return;
                        }
                        localStorage.removeItem("wordpressCode");
                        task.chain(getToken);
                    }
                }, 500);
            }
            function getToken() {
                $.getJSON(WORDPRESS_PROXY_URL + "authenticate/" + code, function(data) {
                    if(data.token !== undefined) {
                        token = data.token;
                        localStorage["wordpressToken"] = token;
                        task.chain();
                    }
                    else {
                        task.error(new Error(errorMsg));
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

    wordpressHelper.upload = function(site, postId, tags, title, content, callback) {
        var task = new AsyncTask();
        connect(task);
        authenticate(task);
        task.onRun(function() {
            var url = WORDPRESS_PROXY_URL + "post";
            var data = {
                token: token,
                site: site,
                postId: postId,
                tags: tags,
                title: title,
                content: content
            };
            $.ajax({
                url: url,
                data: data,
                type: "POST",
                dataType: "json",
                timeout: AJAX_TIMEOUT
            }).done(function(response, textStatus, jqXHR) {
                if(response.body.ID) {
                    postId = response.body.ID;
                    task.chain();
                    return;
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
            callback(undefined, postId);
        });
        task.onError(function(error) {
            callback(error);
        });
        task.enqueue();
    };

    function handleError(error, task) {
        var errorMsg = undefined;
        if(error) {
            logger.error(error);
            // Try to analyze the error
            if(typeof error === "string") {
                errorMsg = error;
            }
            else {
                errorMsg = "Could not publish on WordPress.";
                if((error.code === 400 && error.message == "invalid_token") || error.code === 401 || error.code === 403) {
                    localStorage.removeItem("wordpressToken");
                    errorMsg = "Access to WordPress account is not authorized.";
                    task.retry(new Error(errorMsg), 1);
                    return;
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
