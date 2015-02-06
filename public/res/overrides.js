/**
 * NOTE: you must add to arguments list inside `define[]` to get them loaded.
 * Example:
 *
 * 	"overrides/your_fancy_override" //will load overrides/your_fancy_override.js
 *
 */
define([
	// uncomment the following line to load modules:
	// "overrides/notification_override"
], function() {
	Array.prototype.slice.call(arguments).forEach(function(argument) {
		//here the file is loaded...nothing else needed
		//loaded object is referenced as 'argument'
		console.log('override loaded: %O', argument);
	});
});
