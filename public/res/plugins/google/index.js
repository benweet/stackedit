define([
	"classes/Plugin",
	"providers/gdriveProvider",
	"providers/gdrivesecProvider",
	"providers/gdriveterProvider"
], function(Plugin, gdriveProvider, gdrivesecProvider, gdriveterProvider) {
	return new Plugin({
		providers: [gdriveProvider, gdrivesecProvider, gdriveterProvider]
	});
});
