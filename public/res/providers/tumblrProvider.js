define([
    "underscore",
    "utils",
    "classes/Provider",
    "helpers/tumblrHelper"
], function(_, utils, Provider, tumblrHelper) {

    var tumblrProvider = new Provider("tumblr", "Tumblr");
    tumblrProvider.publishPreferencesInputIds = [
        "tumblr-hostname"
    ];

    tumblrProvider.publish = function(publishAttributes, frontMatter, title, content, callback) {
        var labelList = publishAttributes.tags || [];
        if(frontMatter) {
            frontMatter.tags !== undefined && (labelList = frontMatter.tags);
        }
        _.isString(labelList) && (labelList = _.compact(labelList.split(/[\s,]/)));
        tumblrHelper.upload(publishAttributes.blogHostname, publishAttributes.postId, labelList.join(','), publishAttributes.format == "markdown" ? "markdown" : "html", title, content, function(error, postId) {
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