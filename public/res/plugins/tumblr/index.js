define([
	"classes/Plugin",
	"providers/tumblrProvider"
], function(Plugin, tumblrProvider) {
	return new Plugin({
		providers: [tumblrProvider]
	});
});
