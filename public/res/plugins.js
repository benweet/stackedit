/**
 * NOTE: you must add plugins to arguments list inside `define[]` to get them loaded.
 * Example:
 *
 * 	"plugins/ssh/index"
 *
 */
define([
	"eventMgr",
	"classes/Plugin",
	"plugins/ssh/index"
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
