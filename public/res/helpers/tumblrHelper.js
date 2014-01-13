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

    var oauthParams;

    var tumblrHelper = {};

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
        var authWindow;
        var intervalId;
        task.onRun(function() {
            if(oauthParams !== undefined) {
                task.chain();
                return;
            }
            var serializedOauthParams = storage.tumblrOauthParams;
            if(serializedOauthParams !== undefined) {
                oauthParams = JSON.parse(serializedOauthParams);
                task.chain();
                return;
            }
            var errorMsg = "Failed to retrieve a token from Tumblr.";
            // We add time for user to enter his credentials
            task.timeout = constants.ASYNC_TASK_LONG_TIMEOUT;
            var oauth_object;
            function getOauthToken() {
                $.getJSON(constants.TUMBLR_PROXY_URL + "request_token", function(data) {
                    if(data.oauth_token !== undefined) {
                        oauth_object = data;
                        task.chain(oauthRedirect);
                    }
                    else {
                        task.error(new Error(errorMsg));
                    }
                });
            }
            function oauthRedirect() {
                utils.redirectConfirm('You are being redirected to <strong>Tumblr</strong> authorization page.', function() {
                    task.chain(getVerifier);
                }, function() {
                    task.error(new Error('Operation canceled.'));
                });
            }
            function getVerifier() {
                storage.removeItem("tumblrVerifier");
                authWindow = utils.popupWindow('html/tumblr-oauth-client.html?oauth_token=' + oauth_object.oauth_token, 'stackedit-tumblr-oauth', 800, 600);
                authWindow.focus();
                intervalId = setInterval(function() {
                    if(authWindow.closed === true) {
                        clearInterval(intervalId);
                        authWindow = undefined;
                        intervalId = undefined;
                        oauth_object.oauth_verifier = storage.tumblrVerifier;
                        if(oauth_object.oauth_verifier === undefined) {
                            task.error(new Error(errorMsg));
                            return;
                        }
                        storage.removeItem("tumblrVerifier");
                        task.chain(getAccessToken);
                    }
                }, 500);
            }
            function getAccessToken() {
                $.getJSON(constants.TUMBLR_PROXY_URL + "access_token", oauth_object, function(data) {
                    if(data.access_token !== undefined && data.access_token_secret !== undefined) {
                        storage.tumblrOauthParams = JSON.stringify(data);
                        oauthParams = data;
                        task.chain();
                    }
                    else {
                        task.error(new Error(errorMsg));
                    }
                });
            }
            task.chain(getOauthToken);
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

    tumblrHelper.upload = function(blogHostname, postId, tags, format, state, date, title, content, callback) {
        var task = new AsyncTask();
        connect(task);
        authenticate(task);
        task.onRun(function() {
            var data = $.extend({
                blog_hostname: blogHostname,
                post_id: postId,
                tags: tags,
                format: format,
                state: state,
                date: date,
                title: title,
                content: content
            }, oauthParams);
            $.ajax({
                url: constants.TUMBLR_PROXY_URL + "post",
                data: data,
                type: "POST",
                dataType: "json",
                timeout: constants.AJAX_TIMEOUT
            }).done(function(post) {
                postId = post.id;
                task.chain();
            }).fail(function(jqXHR) {
                var error = {
                    code: jqXHR.status,
                    message: jqXHR.statusText
                };
                // Handle error
                if(error.code === 404 && postId !== undefined) {
                    error = 'Post ' + postId + ' not found on Tumblr.|removePublish';
                }
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
        var errorMsg;
        if(error) {
            logger.error(error);
            // Try to analyze the error
            if(typeof error === "string") {
                errorMsg = error;
            }
            else {
                errorMsg = "Could not publish on Tumblr.";
                if(error.code === 401 || error.code === 403) {
                    oauthParams = undefined;
                    storage.removeItem("tumblrOauthParams");
                    errorMsg = "Access to Tumblr account is not authorized.";
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

    return tumblrHelper;
});
