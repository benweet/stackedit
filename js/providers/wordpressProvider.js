define([
    "utils",
    "classes/Provider",
    "helpers/wordpressHelper"
], function(utils, Provider, wordpressHelper) {

    var wordpressProvider = new Provider("wordpress", "WordPress");
    wordpressProvider.defaultPublishFormat = "html";
    wordpressProvider.publishPreferencesInputIds = [
        "wordpress-site"
    ];

    wordpressProvider.publish = function(publishAttributes, title, content, callback) {
        wordpressHelper.upload(publishAttributes.site, publishAttributes.postId, publishAttributes.tags, title, content, function(error, postId) {
            if(error) {
                callback(error);
                return;
            }
            publishAttributes.postId = postId;
            callback();
        });
    };

    wordpressProvider.newPublishAttributes = function(event) {
        var publishAttributes = {};
        publishAttributes.site = utils.getInputTextValue("#input-publish-wordpress-site", event, /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/);
        publishAttributes.postId = utils.getInputTextValue("#input-publish-postid");
        publishAttributes.tags = utils.getInputTextValue("#input-publish-tags");
        if(event.isPropagationStopped()) {
            return undefined;
        }
        return publishAttributes;
    };

    return wordpressProvider;
});