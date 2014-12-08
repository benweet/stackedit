define([
	"eventMgr",
	"classes/Plugin",
	"plugins/dropbox/index",
	"plugins/github/index",
	"plugins/ssh/index",
	"plugins/tumblr/index"
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
