/* override functionality
 *
 * This is an example of how to override specific behaviour inside of Stackedit
 * You can require the module, and override specific methods like this
 *
 */
require([
	"extensions/notifications"
], function(notifications) {
	console.log(notifications);


	/* Override the notifications message which
	 * was originally `file successfully published`
	 * has an optional parameter fileDesc */
	notifications.onPublishSuccess = function() {
		notifications.message('"Draft saved.');
	};

});
