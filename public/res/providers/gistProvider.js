define([
    "utils",
    "classes/Provider",
    "helpers/githubHelper"
], function(utils, Provider, githubHelper) {

    var gistProvider = new Provider("gist", "Gist");
    gistProvider.publishPreferencesInputIds = [
        "gist-public"
    ];
    gistProvider.viewerSharingAttributes = [
        "gistId",
        "filename"
    ];

	gistProvider.getPublishLocationLink = function(attributes) {
		return [
			'https://gist.github.com/',
			attributes.gistId
		].join('');
	};

    gistProvider.publish = function(publishAttributes, frontMatter, title, content, callback) {
        githubHelper.uploadGist(publishAttributes.gistId, publishAttributes.filename, publishAttributes.isPublic, title, content, function(error, gistId) {
            if(error) {
                callback(error);
                return;
            }
            publishAttributes.gistId = gistId;
            callback();
        });
    };

    gistProvider.newPublishAttributes = function(event) {
        var publishAttributes = {};
        publishAttributes.gistId = utils.getInputTextValue("#input-publish-gist-id");
        publishAttributes.filename = utils.getInputTextValue("#input-publish-filename", event);
        publishAttributes.isPublic = utils.getInputChecked("#input-publish-gist-public");
        if(event.isPropagationStopped()) {
            return undefined;
        }
        return publishAttributes;
    };

    gistProvider.importPublic = function(importParameters, callback) {
        githubHelper.downloadGist(importParameters.gistId, importParameters.filename, callback);
    };

    return gistProvider;
});