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

	bloggerProvider.getPublishLocationLink = function(attributes) {
		return [
			'https://www.blogger.com/blogger.g?blogID=',
			attributes.blogId,
			'#editor/target=post;postID=',
			attributes.postId
		].join('');
	};

	bloggerProvider.publish = function(publishAttributes, frontMatter, title, content, callback) {
        var labelList = publishAttributes.labelList || [];
        if(frontMatter) {
            frontMatter.tags !== undefined && (labelList = frontMatter.tags);
        }
        _.isString(labelList) && (labelList = _.compact(labelList.split(/[\s,]/)));
        var isDraft = frontMatter && frontMatter.published === false;
        var publishDate = frontMatter && frontMatter.date;
        googleHelper.uploadBlogger(publishAttributes.blogUrl, publishAttributes.blogId, publishAttributes.postId, labelList, isDraft, publishDate, title, content, function(error, blogId, postId) {
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
        return publishAttributes;
    };

    return bloggerProvider;
});