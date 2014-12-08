define([
	"classes/Plugin",
	"providers/wordpressProvider"
], function(Plugin, wordpressProvider) {
	return new Plugin({
		providers: [wordpressProvider]
	});
});
