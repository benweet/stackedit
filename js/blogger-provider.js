define(["jquery", "google-helper"], function($, googleHelper) {
	
	// Dependencies
	var core = undefined;
	
	var bloggerProvider = {
		providerId: PROVIDER_BLOGGER,
		providerName: "Blogger",
		defaultPublishFormat: "html"
	};
	
	bloggerProvider.publish = function(publishAttributes, title, content, callback) {
		googleHelper.uploadBlogger(publishAttributes.blogUrl,
			publishAttributes.blogId, publishAttributes.postId, title, content,
			function(error, blogId, postId) {
			if(error) {
				callback(error);
				return;
			}
			publishAttributes.blogId = blogId;
			publishAttributes.postId = postId;
			callback();
		});
	};
	
	bloggerProvider.newPublishAttributes = function(event) {
		var publishAttributes = {};
		publishAttributes.blogUrl = core.getInputValue($("#input-publish-blogger-url"), event);
		publishAttributes.postId = $("#input-publish-blogger-postid").val() || undefined;
		if(event.isPropagationStopped()) {
			return undefined;
		}
		return publishAttributes;
	};

	bloggerProvider.init = function(coreModule) {
		core = coreModule;
	};

	return bloggerProvider;
});