define(["jquery", "github-helper"], function($, githubHelper) {
	
	// Dependencies
	var core = undefined;
	
	var publishGithub = {
		providerType: PROVIDER_TYPE_PUBLISH_FLAG,
		providerId: PROVIDER_GITHUB,
		providerName: "GitHub"
	};
	
	publishGithub.publish = function(publishObject, title, content, callback) {
		var commitMsg = core.settings.commitMsg;
		githubHelper.upload(publishObject.repository, publishObject.branch,
			publishObject.path, content, commitMsg, callback);
	};

	publishGithub.init = function(coreModule) {
		core = coreModule;
	};

	return publishGithub;
});