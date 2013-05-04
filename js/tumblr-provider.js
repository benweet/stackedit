define(["jquery", "core", "tumblr-helper"], function($, core, tumblrHelper) {
	
	var PROVIDER_TUMBLR = "tumblr";
	
	var tumblrProvider = {
		providerId: PROVIDER_TUMBLR,
		providerName: "Tumblr"
	};
	
	tumblrProvider.publish = function(publishAttributes, title, content, callback) {
		tumblrHelper.upload(
			publishAttributes.blogHostname,
			publishAttributes.postId,
			publishAttributes.tags,
			publishAttributes.format == "markdown" ? "markdown" : "html",
			title, 
			content,
			function(error, postId) {
				if(error) {
					callback(error);
					return;
				}
				publishAttributes.postId = postId;
				callback();
			}
		);
	};

	tumblrProvider.newPublishAttributes = function(event) {
		var publishAttributes = {};
		publishAttributes.blogHostname = core
			.getInputValue(
				$("#input-publish-tumblr-hostname"),
				event,
				/^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/);
		publishAttributes.postId = $("#input-publish-postid").val() || undefined;
		publishAttributes.tags = $("#input-publish-tags").val() || undefined;
		if(event.isPropagationStopped()) {
			return undefined;
		}
		return publishAttributes;
	};

	return tumblrProvider;
});