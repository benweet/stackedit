define( [ "jquery", "jgrowl", "underscore" ], function($) {
	
	var notifications = {
		extensionId: "notifications",
		extensionName: "Notifications",
		defaultConfig: {
			showingTime: 5000
		}
	};
	
	notifications.onReady = function() {
		// jGrowl configuration
		$.jGrowl.defaults.life = notifications.config.showingTime;
		$.jGrowl.defaults.closer = false;
		$.jGrowl.defaults.closeTemplate = '';
		$.jGrowl.defaults.position = 'bottom-right';
	};
	
	function showMessage(msg, iconClass, options) {
		if(!msg) {
			return;
		}
		var endOfMsg = msg.indexOf("|");
		if(endOfMsg !== -1) {
			msg = msg.substring(0, endOfMsg);
			if(!msg) {
				return;
			}
		}
		options = options || {};
		iconClass = iconClass || "icon-info-sign";
		$.jGrowl("<i class='icon-white " + iconClass + "'></i> " + _.escape(msg), options);
	}
	
	notifications.onMessage = function(message) {
		showMessage(message);
	};
	
	notifications.onError = function(error) {
		showMessage(error, "icon-warning-sign");
	};
	
	notifications.onOfflineChanged = function(isOffline) {
		if(isOffline === true) {
			showMessage("You are offline.", "icon-exclamation-sign msg-offline", {
				sticky : true,
				close : function() {
					showMessage("You are back online!", "icon-signal");
				}
			});
		} else {
			$(".msg-offline").parents(".jGrowl-notification").trigger(
			'jGrowl.beforeClose');
		}
	};
	
	return notifications;
});