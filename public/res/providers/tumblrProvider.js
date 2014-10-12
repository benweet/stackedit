define([
    "underscore",
    "settings",
    "utils",
    "classes/Provider",
    "helpers/tumblrHelper"
], function(_, settings, utils, Provider, tumblrHelper) {

    var tumblrProvider = new Provider("tumblr", "Tumblr");
    tumblrProvider.publishPreferencesInputIds = [
        "tumblr-hostname"
    ];

	tumblrProvider.getPublishLocationLink = function(attributes) {
		return [
			'http://',
			attributes.blogHostname,
			'/post/',
			attributes.postId
		].join('');
	};

	tumblrProvider.publish = function(publishAttributes, frontMatter, title, content, callback) {
        var labelList = publishAttributes.tags || [];
        if(frontMatter) {
            frontMatter.tags !== undefined && (labelList = frontMatter.tags);
        }
        _.isString(labelList) && (labelList = _.compact(labelList.split(/[\s,]/)));
        
        // Deduce format from publishAttributes/template
        var format = (function() {
            if(publishAttributes.format == 'html') {
                return 'html';
            }
            if(publishAttributes.format == 'template') {
                var template = publishAttributes.customTmpl || settings.template;
                if(template.indexOf("documentHTML") !== -1) {
                    return 'html';
                }
            }
            return 'markdown';
        })();
        
        var state = (frontMatter && frontMatter.published === false) ? 'draft' : 'published';
        var date = frontMatter && frontMatter.date;
        tumblrHelper.upload(publishAttributes.blogHostname, publishAttributes.postId, labelList.join(','), format, state, date, title, content, function(error, postId) {
            if(error) {
                callback(error);
                return;
            }
            publishAttributes.postId = postId;
            callback();
        });
    };

    tumblrProvider.newPublishAttributes = function(event) {
        var publishAttributes = {};
        publishAttributes.blogHostname = utils.getInputTextValue("#input-publish-tumblr-hostname", event, /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/);
        publishAttributes.postId = utils.getInputTextValue("#input-publish-postid");
        if(event.isPropagationStopped()) {
            return undefined;
        }
        return publishAttributes;
    };

    return tumblrProvider;
});