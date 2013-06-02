define([
    "utils",
    "helpers/github-helper"
], function(utils, githubHelper) {

    var PROVIDER_GIST = "gist";

    var gistProvider = {
        providerId: PROVIDER_GIST,
        providerName: "Gist",
        sharingAttributes: [
            "gistId",
            "filename"
        ]
    };

    gistProvider.publish = function(publishAttributes, title, content, callback) {
        githubHelper.uploadGist(publishAttributes.gistId, publishAttributes.filename, publishAttributes.isPublic, title, content, function(error, gistId) {
            if(error) {
                callback(error);
                return;
            }
            publishAttributes.gistId = gistId;
            callback();
        });
    };

    gistProvider.newPublishAttributes = function(event) {
        var publishAttributes = {};
        publishAttributes.gistId = utils.getInputTextValue("#input-publish-gist-id");
        publishAttributes.filename = utils.getInputTextValue("#input-publish-filename", event);
        publishAttributes.isPublic = utils.getInputChecked("#input-publish-gist-public");
        if(event.isPropagationStopped()) {
            return undefined;
        }
        return publishAttributes;
    };

    gistProvider.importPublic = function(importParameters, callback) {
        githubHelper.downloadGist(importParameters.gistId, importParameters.filename, callback);
    };

    return gistProvider;
});