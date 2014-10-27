define([
], function() {
	function Plugin(properties) {
		for (var prop in properties) {
			if (properties.hasOwnProperty(prop)) {
				this[prop] = properties[prop];
			}
		}
	}
	return Plugin;
});
