define([
    "jquery",
    "core",
    "async-runner"
], function($, core, asyncRunner) {

    var sshHelper = {};

    // Only used to check the offline status
    function connect(task) {
        task.onRun(function() {
            if(core.isOffline === true) {
                task.error(new Error("Operation not available in offline mode.|stopPublish"));
                return;
            }
            task.chain();
        });
    }

    sshHelper.upload = function(host, port, username, password, path, title, content, callback) {
        var task = asyncRunner.createTask();
        connect(task);
        task.onRun(function() {
            var url = SSH_PROXY_URL + "upload";
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
                timeout: AJAX_TIMEOUT
            }).done(function(response, textStatus, jqXHR) {
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
        asyncRunner.addTask(task);
    };

    function handleError(error, task) {
        var errorMsg = undefined;
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
