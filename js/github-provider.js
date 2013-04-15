define(["jquery", "github-helper"], function($, githubHelper) {
	
	// Dependencies
	var core = undefined;
	
	var githubProvider = {
		providerType: PROVIDER_TYPE_PUBLISH_FLAG,
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

	githubProvider.init = function(coreModule) {
		core = coreModule;
	};

	return githubProvider;
});