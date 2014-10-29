define([
    "underscore",
    "utils",
    "classes/Provider",
    "helpers/googleHelper"
], function(_, utils, Provider, googleHelper) {

    var bloggerPageProvider = new Provider("bloggerpage", "Blogger Page");
    bloggerPageProvider.defaultPublishFormat = "html";
    bloggerPageProvider.publishPreferencesInputIds = [
        "blogger-url"
    ];

	bloggerPageProvider.getPublishLocationLink = function(attributes) {
		return [
			'https://www.blogger.com/blogger.g?blogID=',
			attributes.blogId,
			'#editor/target=page;pageID=',
			attributes.pageId
		].join('');
	};

	bloggerPageProvider.publish = function(publishAttributes, frontMatter, title, content, callback) {
        var isDraft = frontMatter && frontMatter.published === false;
        var publishDate = frontMatter && frontMatter.date;
        googleHelper.uploadBloggerPage(publishAttributes.blogUrl, publishAttributes.blogId, publishAttributes.pageId, isDraft, publishDate, title, content, function(error, blogId, pageId) {
            if(error) {
                callback(error);
                return;
            }
            publishAttributes.blogId = blogId;
            publishAttributes.pageId = pageId;
            callback();
        });
    };

    bloggerPageProvider.newPublishAttributes = function(event) {
        var publishAttributes = {};
        var blogUrl = utils.getInputTextValue("#input-publish-blogger-url", event);
        if(blogUrl !== undefined) {
            publishAttributes.blogUrl = utils.checkUrl(blogUrl);
        }
        publishAttributes.pageId = utils.getInputTextValue("#input-publish-pageid");
        if(event.isPropagationStopped()) {
            return undefined;
        }
        return publishAttributes;
    };

    return bloggerPageProvider;
});