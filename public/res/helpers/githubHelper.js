/*global Github */
define([
    "jquery",
    "constants",
    "core",
    "utils",
    "storage",
    "logger",
    "settings",
    "eventMgr",
    "classes/AsyncTask"
], function($, constants, core, utils, storage, logger, settings, eventMgr, AsyncTask) {

    var connected;
    var github;

    var githubHelper = {};

    // Listen to offline status changes
    var isOffline = false;
    eventMgr.addListener("onOfflineChanged", function(isOfflineParam) {
        isOffline = isOfflineParam;
    });

    // Try to connect github by downloading js file
    function connect(task) {
        task.onRun(function() {
            if(isOffline === true) {
                connected = false;
                task.error(new Error("Operation not available in offline mode.|stopPublish"));
                return;
            }
            if(connected === true) {
                task.chain();
                return;
            }
            $.ajax({
                url: "libs/github.js",
                dataType: "script",
                timeout: constants.AJAX_TIMEOUT
            }).done(function() {
                connected = true;
                task.chain();
            }).fail(function(jqXHR) {
                var error = {
                    error: jqXHR.status,
                    message: jqXHR.statusText
                };
                handleError(error, task);
            });
        });
    }

    // Try to authenticate with Oauth
    function authenticate(task) {
        var authWindow;
        var intervalId;
        task.onRun(function() {
            if(github !== undefined) {
                task.chain();
                return;
            }
            var token = storage.githubToken;
            if(token !== undefined) {
                github = new Github({
                    token: token,
                    auth: "oauth"
                });
                task.chain();
                return;
            }
            var errorMsg = "Failed to retrieve a token from GitHub.";
            // We add time for user to enter his credentials
            task.timeout = constants.ASYNC_TASK_LONG_TIMEOUT;
            var code;
            function oauthRedirect() {
                utils.redirectConfirm('You are being redirected to <strong>GitHub</strong> authorization page.', function() {
                    task.chain(getCode);
                }, function() {
                    task.error(new Error('Operation canceled.'));
                });
            }
            function getCode() {
                storage.removeItem("githubCode");
                var scope = settings.githubFullAccess ? 'repo,gist' : 'public_repo,gist';
                authWindow = utils.popupWindow('html/github-oauth-client.html?client_id=' + constants.GITHUB_CLIENT_ID + '&scope=' + scope, 'stackedit-github-oauth', 960, 600);
                authWindow.focus();
                intervalId = setInterval(function() {
                    if(authWindow.closed === true) {
                        clearInterval(intervalId);
                        authWindow = undefined;
                        intervalId = undefined;
                        code = storage.githubCode;
                        if(code === undefined) {
                            task.error(new Error(errorMsg));
                            return;
                        }
                        storage.removeItem("githubCode");
                        task.chain(getToken);
                    }
                }, 500);
            }
            function getToken() {
                $.getJSON(constants.GATEKEEPER_URL + "authenticate/" + code, function(data) {
                    if(data.token !== undefined) {
                        token = data.token;
                        storage.githubToken = token;
                        github = new Github({
                            token: token,
                            auth: "oauth"
                        });
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

    githubHelper.upload = function(reponame, username, branch, path, content, commitMsg, callback) {
        var task = new AsyncTask();
        connect(task);
        authenticate(task);
        task.onRun(function() {
            function getUsername() {
                var user = github.getUser();
                user.show(undefined, function(err, result) {
                    if(err) {
                        handleError(err, task);
                        return;
                    }
                    username = result.login;
                    task.chain(write);
                });
            }
            function write() {
                var repo = github.getRepo(username, reponame);
                repo.write(branch, path, content, commitMsg, function(err) {
                    if(err) {
                        handleError(err, task);
                        return;
                    }
                    task.chain();
                });
            }
            if(username) {
                task.chain(write);
            }
            else {
                task.chain(getUsername);
            }
        });
        task.onSuccess(function() {
            callback(undefined, username);
        });
        task.onError(function(error) {
            callback(error);
        });
        task.enqueue();
    };

    githubHelper.uploadGist = function(gistId, filename, isPublic, title, content, callback) {
        var task = new AsyncTask();
        connect(task);
        authenticate(task);
        task.onRun(function() {
            var gist = github.getGist(gistId);
            var files = {};
            files[filename] = {
                content: content
            };
            var githubFunction = gist.update;
            if(gistId === undefined) {
                githubFunction = gist.create;
            }
            githubFunction({
                description: title,
                "public": isPublic,
                files: files
            }, function(err, gist) {
                if(err) {
                    // Handle error
                    if(err.error === 404 && gistId !== undefined) {
                        err = 'Gist ' + gistId + ' not found on GitHub.|removePublish';
                    }
                    handleError(err, task);
                    return;
                }
                gistId = gist.id;
                task.chain();
            });
        });
        task.onSuccess(function() {
            callback(undefined, gistId);
        });
        task.onError(function(error) {
            callback(error);
        });
        task.enqueue();
    };

    githubHelper.downloadGist = function(gistId, filename, callback) {
        var task = new AsyncTask(true);
        connect(task);
        // No need for authentication
        var title;
        var content;
        task.onRun(function() {
            var github = new Github({});
            var gist = github.getGist(gistId);
            gist.read(function(err, gist) {
                if(err) {
                    // Handle error
                    task.error(new Error('Error trying to access Gist ' + gistId + '.'));
                    return;
                }
                title = gist.description;
                var file = gist.files[filename];
                if(file === undefined) {
                    task.error(new Error('Gist ' + gistId + ' does not contain "' + filename + '".'));
                    return;
                }
                content = file.content;
                task.chain();
            });
        });
        task.onSuccess(function() {
            callback(undefined, title, content);
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
                errorMsg = "Could not publish on GitHub.";
                if(error.error === 401 || error.error === 403) {
                    github = undefined;
                    storage.removeItem("githubToken");
                    errorMsg = "Access to GitHub account is not authorized.";
                    task.retry(new Error(errorMsg), 1);
                    return;
                }
                else if(error.error <= 0) {
                    connected = false;
                    github = undefined;
                    core.setOffline();
                    errorMsg = "|stopPublish";
                }
            }
        }
        task.error(new Error(errorMsg));
    }

    return githubHelper;
});
