define([
	"eventMgr",
	"classes/Plugin",
	"plugins/blogger/index",
	"plugins/dropbox/index",
	"plugins/github/index",
	"plugins/google/index",
	"plugins/ssh/index",
	"plugins/tumblr/index",
	"plugins/wordpress/index"
], function(eventMgr, Plugin) {
	Array.prototype.slice.call(arguments).forEach(function(argument) {
		if (argument && argument instanceof Plugin) {
			var providers = argument.providers || [];
			providers.forEach(function(provider) {
				eventMgr.onProviderLoaded(provider);
			});
		}
	});
	eventMgr.onPluginsLoaded();
});
