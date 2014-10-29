define([
    "underscore",
    "utils",
    "classes/Provider",
    "helpers/wordpressHelper"
], function(_, utils, Provider, wordpressHelper) {

    var wordpressProvider = new Provider("wordpress", "WordPress");
    wordpressProvider.defaultPublishFormat = "html";
    wordpressProvider.publishPreferencesInputIds = [
        "wordpress-site"
    ];

	wordpressProvider.getPublishLocationLink = function(attributes) {
		return attributes.siteId && [
			'https://wordpress.com/post',
			attributes.siteId,
			attributes.postId
		].join('/');
	};

	wordpressProvider.publish = function(publishAttributes, frontMatter, title, content, callback) {
        var labelList = publishAttributes.tags || [];
        if(frontMatter) {
            frontMatter.tags !== undefined && (labelList = frontMatter.tags);
        }
        var status = (frontMatter && frontMatter.published === false) ? 'draft' : 'publish';
        var date = frontMatter && frontMatter.date;
        _.isString(labelList) && (labelList = _.compact(labelList.split(/[\s,]/)));
        wordpressHelper.upload(publishAttributes.site, publishAttributes.postId, labelList.join(','), status, date, title, content, function(error, siteId, postId) {
            if(error) {
                return callback(error);
            }
            publishAttributes.siteId = siteId;
            publishAttributes.postId = postId;
            callback();
        });
    };

    wordpressProvider.newPublishAttributes = function(event) {
        var publishAttributes = {};
        publishAttributes.site = utils.getInputTextValue("#input-publish-wordpress-site", event, /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/);
        publishAttributes.postId = utils.getInputTextValue("#input-publish-postid");
        if(event.isPropagationStopped()) {
            return undefined;
        }
        return publishAttributes;
    };

    return wordpressProvider;
});