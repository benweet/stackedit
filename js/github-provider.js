define(["jquery", "core", "github-helper"], function($, core, githubHelper) {
	
	var githubProvider = {
		providerId: PROVIDER_GITHUB,
		providerName: "GitHub"
	};
	
	githubProvider.publish = function(publishAttributes, title, content, callback) {
		var commitMsg = core.settings.commitMsg;
		githubHelper.upload(publishAttributes.repository, publishAttributes.branch,
			publishAttributes.path, content, commitMsg, callback);
	};

	githubProvider.newPublishAttributes = function(event) {
		var publishAttributes = {};
		publishAttributes.repository = core.getInputValue($("#input-publish-github-reponame"), event);
		publishAttributes.branch = core.getInputValue($("#input-publish-github-branch"), event);
		publishAttributes.path = core.getInputValue($("#input-publish-github-path"), event);
		if(event.isPropagationStopped()) {
			return undefined;
		}
		return publishAttributes;
	};

	return githubProvider;
});