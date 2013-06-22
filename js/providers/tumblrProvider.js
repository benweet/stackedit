define([
    "utils",
    "classes/Provider",
    "helpers/tumblrHelper"
], function(utils, Provider, tumblrHelper) {

    var tumblrProvider = new Provider("tumblr", "Tumblr");
    tumblrProvider.publishPreferencesInputIds = [
        "tumblr-hostname"
    ];

    tumblrProvider.publish = function(publishAttributes, title, content, callback) {
        tumblrHelper.upload(publishAttributes.blogHostname, publishAttributes.postId, publishAttributes.tags, publishAttributes.format == "markdown" ? "markdown" : "html", title, content, function(error, postId) {
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
        publishAttributes.tags = utils.getInputTextValue("#input-publish-tags");
        if(event.isPropagationStopped()) {
            return undefined;
        }
        return publishAttributes;
    };

    return tumblrProvider;
});