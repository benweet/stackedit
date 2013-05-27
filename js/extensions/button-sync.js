define([
    "jquery",
    "underscore"
], function($, _) {
	
	var buttonSync = {
		extensionId: "buttonSync",
		extensionName: 'Button "Synchronize"',
        optional: true,
		settingsBloc: '<p>Adds a "Synchronize documents" button in the navigation bar.</p>'
	};
	
	var syncRunning = false;
	var uploadPending = false;
	var isOffline = false;
	// Enable/disable the button
	var updateButtonState = function() {
		if(syncRunning === true || uploadPending === false || isOffline) {
			$(".action-force-sync").addClass("disabled");
		}
		else {
			$(".action-force-sync").removeClass("disabled");
		}
	};
	
	buttonSync.onSyncRunning = function(isRunning) {
		syncRunning = isRunning;
		uploadPending = true;
		updateButtonState();
	};
	
	buttonSync.onSyncSuccess = function() {
		uploadPending = false;
		updateButtonState();
	};
	
	buttonSync.onOfflineChanged = function(isOfflineParameter) {
		isOffline = isOfflineParameter;
		updateButtonState();
	};
	
	buttonSync.onReady = updateButtonState;
	
	// Check that a file has synchronized locations
	var checkSynchronization = function(fileDesc) {
		if(_.size(fileDesc.syncLocations) !== 0) {
			uploadPending = true;
			updateButtonState();
		}
	};
	
	buttonSync.onFileChanged = checkSynchronization;
	buttonSync.onTitleChanged = checkSynchronization;
	
	return buttonSync;
	
});