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
                task.error(new Error("Operation not available in offline mode.|stopPublish"));
                return;
            }
            task.chain();
        });
    }

    sshHelper.upload = function(host, port, username, password, path, title, content, callback) {
        var task = new AsyncTask();
        connect(task);
        task.onRun(function() {
            var url = settings.sshProxy + "upload";
            var data = {
                host: host,
                port: port,
                username: username,
                password: password,
                path: path,
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
                if(response.error === undefined) {
                    task.chain();
                    return;
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
