define(["jquery", "github-helper"], function($, githubHelper) {
	
	// Dependencies
	var core = undefined;
	
	var publishGithub = {
		providerType: PROVIDER_TYPE_PUBLISH_FLAG,
		providerId: PROVIDER_GITHUB,
		providerName: "GitHub"
	};
	
	publishGithub.publish = function(publishAttributes, title, content, callback) {
		var commitMsg = core.settings.commitMsg;
		githubHelper.upload(publishAttributes.repository, publishAttributes.branch,
			publishAttributes.path, content, commitMsg, callback);
	};

	publishGithub.init = function(coreModule) {
		core = coreModule;
	};

	return publishGithub;
});