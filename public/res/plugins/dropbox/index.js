define([
	"classes/Plugin",
	"providers/dropboxProvider"
], function(Plugin, dropboxProvider) {
	return new Plugin({
		providers: [dropboxProvider]
	});
});
