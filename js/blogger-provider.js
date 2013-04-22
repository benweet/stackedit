define(["jquery", "core", "google-helper"], function($, core, googleHelper) {
	
	var bloggerProvider = {
		providerId: PROVIDER_BLOGGER,
		providerName: "Blogger",
		defaultPublishFormat: "html"
	};
	
	bloggerProvider.publish = function(publishAttributes, title, content, callback) {
		googleHelper.uploadBlogger(
			publishAttributes.blogUrl,
			publishAttributes.blogId,
			publishAttributes.postId,
			publishAttributes.labelList,
			title,
			content,
			function(error, blogId, postId) {
				if(error) {
					callback(error);
					return;
				}
				publishAttributes.blogId = blogId;
				publishAttributes.postId = postId;
				callback();
			}
		);
	};
	
	bloggerProvider.newPublishAttributes = function(event) {
		var publishAttributes = {};
		var blogUrl = core.getInputValue($("#input-publish-blogger-url"), event);
		if(blogUrl !== undefined) {
			publishAttributes.blogUrl = core.checkUrl(blogUrl);
		}
		publishAttributes.postId = $("#input-publish-blogger-postid").val() || undefined;
		publishAttributes.labelList = [];
		var labels = $("#input-publish-blogger-labels").val() || undefined;
		if(labels !== undefined) {
			publishAttributes.labelList = _.chain(labels.split(","))
				.map(function(label) {
					return core.trim(label);
				}).compact().value();
		} 
		if(event.isPropagationStopped()) {
			return undefined;
		}
		return publishAttributes;
	};

	return bloggerProvider;
});