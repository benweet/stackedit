/*global Dropbox */
define([
    "jquery",
    "underscore",
    "constants",
    "core",
    "utils",
    "storage",
    "logger",
    "settings",
    "eventMgr",
    "classes/AsyncTask",
], function($, _, constants, core, utils, storage, logger, settings, eventMgr, AsyncTask) {

    var client;
    var authenticated = false;

    var dropboxHelper = {};
    
    // Listen to offline status changes
    var isOffline = false;
    eventMgr.addListener("onOfflineChanged", function(isOfflineParam) {
        isOffline = isOfflineParam;
    });

    // Try to connect dropbox by downloading client.js
    function connect(task) {
        task.onRun(function() {
            if(isOffline === true) {
                client = undefined;
                task.error(new Error("Operation not available in offline mode.|stopPublish"));
                return;
            }
            if(client !== undefined) {
                task.chain();
                return;
            }
            $.ajax({
                url: "libs/dropbox.min.js",
                dataType: "script",
                timeout: constants.AJAX_TIMEOUT
            }).done(function() {
                client = new Dropbox.Client({
                    key: settings.dropboxFullAccess === true ? constants.DROPBOX_APP_KEY : constants.DROPBOX_RESTRICTED_APP_KEY,
                    secret: settings.dropboxFullAccess === true ? constants.DROPBOX_APP_SECRET : constants.DROPBOX_RESTRICTED_APP_SECRET
                });
                client.authDriver(new Dropbox.AuthDriver.Popup({
                    receiverUrl: constants.BASE_URL + "html/dropbox-oauth-receiver.html",
                    rememberUser: true
                }));
                task.chain();
            }).fail(function(jqXHR) {
                var error = {
                    status: jqXHR.status,
                    responseText: jqXHR.statusText
                };
                handleError(error, task);
            });
        });
    }

    // Try to authenticate with Oauth
    function authenticate(task) {
        task.onRun(function() {
            if(authenticated === true) {
                task.chain();
                return;
            }
            var immediate = true;
            function oauthRedirect() {
                utils.redirectConfirm('You are being redirected to <strong>Dropbox</strong> authorization page.', function() {
                    task.chain(localAuthenticate);
                }, function() {
                    task.error(new Error('Operation canceled.'));
                });
            }
            function localAuthenticate() {
                if(immediate === false) {
                    // If not immediate we add time for user to enter his
                    // credentials
                    task.timeout = constants.ASYNC_TASK_LONG_TIMEOUT;
                }
                else {
                    client.reset();
                }
                client.authenticate({
                    interactive: !immediate
                }, function(error, client) {
                    // Success
                    if(client.isAuthenticated() === true) {
                        authenticated = true;
                        task.chain();
                        return;
                    }
                    // If immediate did not work retry without immediate flag
                    if(immediate === true) {
                        immediate = false;
                        task.chain(oauthRedirect);
                        return;
                    }
                    // Error
                    task.error(new Error("Access to Dropbox account is not authorized."));
                });
            }
            task.chain(localAuthenticate);
        });
    }

    dropboxHelper.upload = function(path, content, callback) {
        var result;
        var task = new AsyncTask();
        connect(task);
        authenticate(task);
        task.onRun(function() {
            client.writeFile(path, content, function(error, stat) {
                if(!error) {
                    result = stat;
                    task.chain();
                    return;
                }
                // Handle error
                if(error.status === 400) {
                    error = 'Could not upload document into path "' + path + '".';
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

    dropboxHelper.checkChanges = function(lastChangeId, callback) {
        var changes = [];
        var newChangeId = lastChangeId || 0;
        var task = new AsyncTask();
        connect(task);
        authenticate(task);
        task.onRun(function() {
            function retrievePageOfChanges() {
                client.pullChanges(newChangeId, function(error, pullChanges) {
                    if(error) {
                        handleError(error, task);
                        return;
                    }
                    // Retrieve success
                    newChangeId = pullChanges.cursor();
                    if(pullChanges.changes !== undefined) {
                        changes = changes.concat(pullChanges.changes);
                    }
                    if(pullChanges.shouldPullAgain) {
                        task.chain(retrievePageOfChanges);
                    }
                    else {
                        task.chain();
                    }
                });
            }
            task.chain(retrievePageOfChanges);
        });
        task.onSuccess(function() {
            callback(undefined, changes, newChangeId);
        });
        task.onError(function(error) {
            callback(error);
        });
        task.enqueue();
    };

    dropboxHelper.downloadMetadata = function(paths, callback) {
        var result = [];
        var task = new AsyncTask();
        connect(task);
        authenticate(task);
        task.onRun(function() {
            function recursiveDownloadMetadata() {
                if(paths.length === 0) {
                    task.chain();
                    return;
                }
                var path = paths[0];
                client.stat(path, function(error, stat) {
                    if(stat) {
                        result.push(stat);
                        paths.shift();
                        task.chain(recursiveDownloadMetadata);
                        return;
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

    dropboxHelper.downloadContent = function(objects, callback) {
        var result = [];
        var task = new AsyncTask();
        connect(task);
        authenticate(task);
        task.onRun(function() {
            function recursiveDownloadContent() {
                if(objects.length === 0) {
                    task.chain();
                    return;
                }
                var object = objects[0];
                result.push(object);
                var file;
                // object may be a file
                if(object.isFile === true) {
                    file = object;
                }
                // object may be a change
                else if(object.wasRemoved !== undefined) {
                    file = object.stat;
                }
                if(!file) {
                    objects.shift();
                    task.chain(recursiveDownloadContent);
                    return;
                }
                client.readFile(file.path, function(error, data) {
                    if(_.isString(data)) {
                        file.content = data;
                        objects.shift();
                        task.chain(recursiveDownloadContent);
                        return;
                    }
                    handleError(error, task);
                });
            }
            task.chain(recursiveDownloadContent);
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
        var errorMsg = true;
        if(error) {
            logger.error(error);
            // Try to analyze the error
            if(typeof error === "string") {
                errorMsg = error;
            }
            else {
                errorMsg = "Dropbox error (" + error.status + ": " + error.responseText + ").";

                if(error.status === 401 || error.status === 403) {
                    authenticated = false;
                    errorMsg = "Access to Dropbox account is not authorized.";
                    task.retry(new Error(errorMsg), 1);
                    return;
                }
                else if(error.status === 400 && error.responseText.indexOf("oauth_nonce") !== -1) {
                    // A bug I guess...
                    _.each(_.keys(storage), function(key) {
                        // We have to remove the Oauth cache from the
                        // storage
                        if(key.indexOf("dropbox-auth") === 0) {
                            storage.removeItem(key);
                        }
                    });
                    authenticated = false;
                    task.retry(new Error(errorMsg), 1);
                    return;
                }
                else if(error.status <= 0) {
                    client = undefined;
                    authenticated = false;
                    core.setOffline();
                    errorMsg = "|stopPublish";
                }
            }
        }
        task.error(new Error(errorMsg));
    }

    var pickerLoaded = false;
    function loadPicker(task) {
        task.onRun(function() {
            if(pickerLoaded === true) {
                task.chain();
                return;
            }
            function chooserRedirect() {
                utils.redirectConfirm('You are being redirected to <strong>Dropbox Chooser</strong> page.', function() {
                    task.chain();
                }, function() {
                    task.error(new Error('Operation canceled.'));
                });
            }
            $.ajax({
                url: "https://www.dropbox.com/static/api/1/dropbox.js",
                dataType: "script",
                timeout: constants.AJAX_TIMEOUT
            }).done(function() {
                pickerLoaded = true;
                task.chain(chooserRedirect);
            }).fail(function(jqXHR) {
                var error = {
                    status: jqXHR.status,
                    responseText: jqXHR.statusText
                };
                handleError(error, task);
            });
        });
    }

    dropboxHelper.picker = function(callback) {
        var paths = [];
        var task = new AsyncTask();
        // Add some time for user to choose his files
        task.timeout = constants.ASYNC_TASK_LONG_TIMEOUT;
        connect(task);
        loadPicker(task);
        task.onRun(function() {
            var options = {};
            options.multiselect = true;
            options.linkType = "direct";
            options.success = function(files) {
                for ( var i = 0; i < files.length; i++) {
                    var path = files[i].link;
                    path = path.replace(/.*\/view\/[^\/]*/, "");
                    paths.push(decodeURI(path));
                }
                task.chain();
            };
            options.cancel = function() {
                task.chain();
            };
            Dropbox.choose(options);
        });
        task.onSuccess(function() {
            callback(undefined, paths);
        });
        task.onError(function(error) {
            callback(error);
        });
        task.enqueue();
    };

    return dropboxHelper;
});
