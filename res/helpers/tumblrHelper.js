define([
    "jquery",
    "core",
    "utils",
    "eventMgr",
    "classes/AsyncTask"
], function($, core, utils, eventMgr, AsyncTask) {

    var oauthParams = undefined;

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
        var authWindow = undefined;
        var intervalId = undefined;
        task.onRun(function() {
            if(oauthParams !== undefined) {
                task.chain();
                return;
            }
            var serializedOauthParams = localStorage["tumblrOauthParams"];
            if(serializedOauthParams !== undefined) {
                oauthParams = JSON.parse(serializedOauthParams);
                task.chain();
                return;
            }
            eventMgr.onMessage("Please make sure the Tumblr authorization popup is not blocked by your browser.");
            var errorMsg = "Failed to retrieve a token from Tumblr.";
            // We add time for user to enter his credentials
            task.timeout = ASYNC_TASK_LONG_TIMEOUT;
            var oauth_object = undefined;
            function getOauthToken() {
                $.getJSON(TUMBLR_PROXY_URL + "request_token", function(data) {
                    if(data.oauth_token !== undefined) {
                        oauth_object = data;
                        task.chain(getVerifier);
                    }
                    else {
                        task.error(new Error(errorMsg));
                    }
                });
            }
            function getVerifier() {
                localStorage.removeItem("tumblrVerifier");
                authWindow = utils.popupWindow('tumblr-oauth-client.html?oauth_token=' + oauth_object.oauth_token, 'stackedit-tumblr-oauth', 800, 600);
                authWindow.focus();
                intervalId = setInterval(function() {
                    if(authWindow.closed === true) {
                        clearInterval(intervalId);
                        authWindow = undefined;
                        intervalId = undefined;
                        oauth_object.oauth_verifier = localStorage["tumblrVerifier"];
                        if(oauth_object.oauth_verifier === undefined) {
                            task.error(new Error(errorMsg));
                            return;
                        }
                        localStorage.removeItem("tumblrVerifier");
                        task.chain(getAccessToken);
                    }
                }, 500);
            }
            function getAccessToken() {
                $.getJSON(TUMBLR_PROXY_URL + "access_token", oauth_object, function(data) {
                    if(data.access_token !== undefined && data.access_token_secret !== undefined) {
                        localStorage["tumblrOauthParams"] = JSON.stringify(data);
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

    tumblrHelper.upload = function(blogHostname, postId, tags, format, title, content, callback) {
        var task = new AsyncTask();
        connect(task);
        authenticate(task);
        task.onRun(function() {
            var data = $.extend({
                blog_hostname: blogHostname,
                post_id: postId,
                tags: tags,
                format: format,
                title: title,
                content: content
            }, oauthParams);
            $.ajax({
                url: TUMBLR_PROXY_URL + "post",
                data: data,
                type: "POST",
                dataType: "json",
                timeout: AJAX_TIMEOUT
            }).done(function(post, textStatus, jqXHR) {
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
        var errorMsg = undefined;
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
                    localStorage.removeItem("tumblrOauthParams");
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
