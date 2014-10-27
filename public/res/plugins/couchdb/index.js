define([
	"classes/Plugin",
	"providers/couchdbProvider"
], function(Plugin, couchdbProvider) {
	return new Plugin({
		providers: [couchdbProvider]
	};
});
