define(["jquery", "google-helper"], function($, googleHelper) {
	
	// Dependencies
	var core = undefined;
	
	var bloggerProvider = {
		providerType: PROVIDER_TYPE_PUBLISH_FLAG,
		providerId: PROVIDER_BLOGGER,
		providerName: "Blogger",
		defaultPublishFormat: "html"
	};
	
	bloggerProvider.publish = function(publishAttributes, title, content, callback) {
		googleHelper.uploadBlogger(publishAttributes.blogUrl,
			publishAttributes.blogId, publishAttributes.postId, title, content,
			function(blogId, postId) {
			if(blogId === undefined || postId === undefined) {
				callback(true);
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
		var postId = $("#input-publish-blogger-postid").val();
		if(postId) {
			publishAttributes.postId = postId;
		}
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