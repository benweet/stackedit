define([
	"classes/Plugin",
	"providers/sshProvider"
], function(Plugin, sshProvider) {
	return new Plugin({
		providers: [sshProvider]
	};
});
