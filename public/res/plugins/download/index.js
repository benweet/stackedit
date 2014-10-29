define([
	"classes/Plugin",
	"providers/downloadProvider"
], function(Plugin, downloadProvider) {
	return new Plugin({
		providers: [downloadProvider]
	});
});
