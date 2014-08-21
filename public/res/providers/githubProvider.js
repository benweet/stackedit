define([
    "utils",
    "classes/Provider",
    "settings",
    "helpers/githubHelper"
], function(utils, Provider, settings, githubHelper) {

    var githubProvider = new Provider("github", "GitHub");
    githubProvider.publishPreferencesInputIds = [
        "github-repo",
        "github-branch"
    ];

    githubProvider.publish = function(publishAttributes, frontMatter, title, content, callback) {
        var commitMsg = settings.commitMsg;
        githubHelper.upload(publishAttributes.repository, publishAttributes.username, publishAttributes.branch, publishAttributes.path, content, commitMsg, callback);
    };

    githubProvider.newPublishAttributes = function(event) {
        var publishAttributes = {};
        publishAttributes.repository = utils.getInputTextValue("#input-publish-github-repo", event);
        publishAttributes.branch = utils.getInputTextValue("#input-publish-github-branch", event);
        publishAttributes.path = utils.getInputTextValue("#input-publish-file-path", event);
        if(event.isPropagationStopped()) {
            return undefined;
        }
		var parsedRepository = publishAttributes.repository.match(/[\/:]?([^\/:]+)\/([^\/]+?)(?:\.git)?$/);
		if(parsedRepository) {
			publishAttributes.repository = parsedRepository[2];
			publishAttributes.username = parsedRepository[1];
		}
        return publishAttributes;
    };

    return githubProvider;
});