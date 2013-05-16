define(["jquery", "core", "wordpress-helper"], function($, core, wordpressHelper) {
	
	var PROVIDER_WORDPRESS = "wordpress";
	
	var wordpressProvider = {
		providerId: PROVIDER_WORDPRESS,
		providerName: "WordPress",
		defaultPublishFormat: "html"
	};
	
	wordpressProvider.publish = function(publishAttributes, title, content, callback) {
		wordpressHelper.upload(
			publishAttributes.site,
			publishAttributes.postId,
			publishAttributes.tags,
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

	wordpressProvider.newPublishAttributes = function(event) {
		var publishAttributes = {};
		publishAttributes.site = core
			.getInputValue(
				$("#input-publish-wordpress-site"),
				event,
				/^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/);
		publishAttributes.postId = $("#input-publish-postid").val() || undefined;
		publishAttributes.tags = $("#input-publish-tags").val() || undefined;
		if(event.isPropagationStopped()) {
			return undefined;
		}
		return publishAttributes;
	};

	return wordpressProvider;
});