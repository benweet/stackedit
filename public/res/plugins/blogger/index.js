define([
	"classes/Plugin",
	"providers/bloggerProvider",
	"providers/bloggerPageProvider"
], function(Plugin, bloggerProvider, bloggerPageProvider) {
	return new Plugin({
		providers: [bloggerProvider, bloggerPageProvider]
	});
});
