define([
    "utils",
    "settings",
    "helpers/github-helper"
], function(utils, settings, githubHelper) {

    var PROVIDER_GITHUB = "github";

    var githubProvider = {
        providerId: PROVIDER_GITHUB,
        providerName: "GitHub",
        publishPreferencesInputIds: [
            "github-reponame",
            "github-branch"
        ]
    };

    githubProvider.publish = function(publishAttributes, title, content, callback) {
        var commitMsg = settings.commitMsg;
        githubHelper.upload(publishAttributes.repository, publishAttributes.branch, publishAttributes.path, content, commitMsg, callback);
    };

    githubProvider.newPublishAttributes = function(event) {
        var publishAttributes = {};
        publishAttributes.repository = utils.getInputTextValue("#input-publish-github-reponame", event);
        publishAttributes.branch = utils.getInputTextValue("#input-publish-github-branch", event);
        publishAttributes.path = utils.getInputTextValue("#input-publish-file-path", event);
        if(event.isPropagationStopped()) {
            return undefined;
        }
        return publishAttributes;
    };

    return githubProvider;
});