define([
    "jquery",
    "core",
    "async-runner"
], function($, core, asyncRunner) {

    var PROVIDER_DOWNLOAD = "download";

    var downloadProvider = {
        providerId: PROVIDER_DOWNLOAD,
        sharingAttributes: [
            "url"
        ]
    };

    downloadProvider.importPublic = function(importParameters, callback) {
        var task = asyncRunner.createTask();
        var title = undefined;
        var content = undefined;
        task.onRun(function() {
            var url = importParameters.url;
            var slashUrl = url.lastIndexOf("/");
            if(slashUrl === -1) {
                task.error(new Error("Invalid URL parameter."));
                return;
            }
            title = url.substring(slashUrl + 1);
            $.ajax({
                url: DOWNLOAD_PROXY_URL + "download?url=" + url,
                type: "GET",
                dataType: "text",
                timeout: AJAX_TIMEOUT
            }).done(function(result, textStatus, jqXHR) {
                content = result;
                task.chain();
            }).fail(function(jqXHR) {
                task.error(new Error("Unable to access URL " + url));
            });
        });
        task.onSuccess(function() {
            callback(undefined, title, content);
        });
        task.onError(function(error) {
            callback(error);
        });
        asyncRunner.addTask(task);
    };

    return downloadProvider;
});