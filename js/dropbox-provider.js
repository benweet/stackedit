define(["jquery", "dropbox-helper"], function($, dropboxHelper) {
	
	// Dependencies
	var core = undefined;
	
	var dropboxProvider = {
		providerType: PROVIDER_TYPE_PUBLISH_FLAG,
		providerId: PROVIDER_DROPBOX,
		providerName: "Dropbox",
		defaultPublishFormat: "template"
	};
	
	dropboxProvider.publish = function(publishAttributes, title, content, callback) {
		var path = dropboxHelper.checkPath(publishAttributes.path);
		if(path === undefined) {
			callback(true);
			return;
		}
		dropboxHelper.upload(path, content, callback);
	};

	dropboxProvider.newPublishAttributes = function(event) {
		var publishAttributes = {};
		publishAttributes.path = core.getInputValue($("#input-publish-dropbox-path"), event);
		if(event.isPropagationStopped()) {
			return undefined;
		}
		return publishAttributes;
	};

	dropboxProvider.init = function(coreModule) {
		core = coreModule;
	};

	return dropboxProvider;
});