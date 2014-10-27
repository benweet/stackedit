define([
	"classes/Plugin",
	"providers/gistProvider",
	"providers/githubProvider"
], function(Plugin, gistProvider, githubProvider) {
	return new Plugin({
		providers: [gistProvider, githubProvider]
	};
});
