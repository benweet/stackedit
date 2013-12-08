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

    bloggerProvider.publish = function(publishAttributes, frontMatter, title, content, callback) {
        var labelList = publishAttributes.labelList || [];
        if(frontMatter) {
            frontMatter.tags !== undefined && (labelList = frontMatter.tags);
        }
        _.isString(labelList) && (labelList = _.compact(labelList.split(/[\s,]/)));
        googleHelper.uploadBlogger(publishAttributes.blogUrl, publishAttributes.blogId, publishAttributes.postId, publishAttributes.isDraft, labelList, title, content, function(error, blogId, postId) {
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
        if(event.isPropagationStopped()) {
            return undefined;
        }
        publishAttributes.isDraft = utils.getInputChecked("#input-publish-blogger-draft");
        return publishAttributes;
    };

    return bloggerProvider;
});