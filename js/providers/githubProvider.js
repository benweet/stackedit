define([
    "utils",
    "classes/Provider",
    "settings",
    "helpers/githubHelper"
], function(utils, Provider, settings, githubHelper) {

    var githubProvider = new Provider("github", "GitHub");
    githubProvider.publishPreferencesInputIds = [
        "github-reponame",
        "github-username",
        "github-branch"
    ];

    githubProvider.publish = function(publishAttributes, title, content, callback) {
        var commitMsg = settings.commitMsg;
        githubHelper.upload(publishAttributes.repository, publishAttributes.username, publishAttributes.branch, publishAttributes.path, content, commitMsg, callback);
    };

    githubProvider.newPublishAttributes = function(event) {
        var publishAttributes = {};
        publishAttributes.repository = utils.getInputTextValue("#input-publish-github-reponame", event);
        publishAttributes.username = utils.getInputTextValue("#input-publish-github-username");
        publishAttributes.branch = utils.getInputTextValue("#input-publish-github-branch", event);
        publishAttributes.path = utils.getInputTextValue("#input-publish-file-path", event);
        if(event.isPropagationStopped()) {
            return undefined;
        }
        return publishAttributes;
    };

    return githubProvider;
});