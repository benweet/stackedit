define( [ "jquery", "jgrowl", "underscore" ], function($) {
	
	var notifications = {
		extensionId: "notifications",
		extensionName: "Notifications",
		defaultConfig: {
			showingTime: 5000
		},
		settingsBloc: "<p>Shows notification messages in the bottom-right corner of the screen.</p>"
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
	
	notifications.onSyncImportSuccess = function(fileDescList, provider) {
		if(!fileDescList) {
			return;
		}
		var titles = _.map(fileDescList, function(fileDesc) {
			return fileDesc.title;
		}).join(", ");
		showMessage(titles + ' imported successfully from ' + provider.providerName + '.');
	};
	
	notifications.onSyncExportSuccess = function(fileDesc, syncAttributes) {
		showMessage('"' + fileDesc.title + '" will now be synchronized on ' + syncAttributes.provider.providerName + '.');
	};
	
	notifications.onSyncRemoved = function(fileDesc, syncAttributes) {
		showMessage(syncAttributes.provider.providerName + " synchronized location has been removed.");
	};
	
	notifications.onPublishSuccess = function(fileDesc) {
		showMessage('"' + fileDesc.title + '" successfully published.');
	};
	
	notifications.onNewPublishSuccess = function(fileDesc, publishIndex, publishAttributes) {
		showMessage('"' + fileDesc.title + '" is now published on ' + publishAttributes.provider.providerName + '.');
	};
	
	notifications.onPublishRemoved = function(fileDesc, publishAttributes) {
		showMessage(publishAttributes.provider.providerName + " publish location has been removed.");
	};
	
	return notifications;
});