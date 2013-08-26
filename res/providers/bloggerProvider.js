define([
    "underscore",
    "utils",
    "classes/Provider",
    "helpers/googleHelper"
], function(_, utils, Provider, googleHelper) {

    var bloggerProvider = new Provider("blogger", "Blogger");
    bloggerProvider.defaultPublishFormat = "html";
    bloggerProvider.publishPreferencesInputIds = [
        "blogger-url"
    ];

    bloggerProvider.publish = function(publishAttributes, title, content, callback) {
        googleHelper.uploadBlogger(publishAttributes.blogUrl, publishAttributes.blogId, publishAttributes.postId, publishAttributes.labelList, title, content, function(error, blogId, postId) {
            if(error) {
                callback(error);
                return;
            }
            publishAttributes.blogId = blogId;
            publishAttributes.postId = postId;
            callback();
        });
    };

    bloggerProvider.newPublishAttributes = function(event) {
        var publishAttributes = {};
        var blogUrl = utils.getInputTextValue("#input-publish-blogger-url", event);
        if(blogUrl !== undefined) {
            publishAttributes.blogUrl = utils.checkUrl(blogUrl);
        }
        publishAttributes.postId = utils.getInputTextValue("#input-publish-postid");
        publishAttributes.labelList = [];
        var labels = utils.getInputTextValue("#input-publish-labels");
        if(labels !== undefined) {
            publishAttributes.labelList = _.chain(labels.split(",")).map(function(label) {
                return utils.trim(label);
            }).compact().value();
        }
        if(event.isPropagationStopped()) {
            return undefined;
        }
        return publishAttributes;
    };

    return bloggerProvider;
});