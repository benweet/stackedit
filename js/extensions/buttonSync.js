define([
    "jquery",
    "underscore",
    "utils",
    "classes/Extension",
    "text!html/buttonSync.html",
    "text!html/buttonSyncSettingsBlock.html",
], function($, _, utils, Extension, buttonSyncHTML, buttonSyncSettingsBlockHTML) {

    var buttonSync = new Extension("buttonSync", 'Button "Synchronize"');
    buttonSync.settingsBlock = buttonSyncSettingsBlockHTML;
    buttonSync.defaultConfig = {
        syncPeriod: 180000
    };

    buttonSync.onLoadSettings = function() {
        utils.setInputValue("#input-sync-period", buttonSync.config.syncPeriod);
    };

    buttonSync.onSaveSettings = function(newConfig, event) {
        newConfig.syncPeriod = utils.getInputIntValue("#input-sync-period", event, 0);
    };

    var button = undefined;
    var syncRunning = false;
    var uploadPending = false;
    var isOffline = false;
    // Enable/disable the button
    var updateButtonState = function() {
        if(button === undefined) {
            return;
        }
        if(syncRunning === true || uploadPending === false || isOffline) {
            button.addClass("disabled");
        }
        else {
            button.removeClass("disabled");
        }
    };

    var synchronizer = undefined;
    buttonSync.onSynchronizerCreated = function(synchronizerParameter) {
        synchronizer = synchronizerParameter;
    };

    // Run sync periodically
    var lastSync = 0;
    buttonSync.onPeriodicRun = function() {
        if(viewerMode === true || !buttonSync.config.syncPeriod || lastSync + buttonSync.config.syncPeriod > utils.currentTime) {
            return;
        }
        if(synchronizer.sync() === true) {
            lastSync = utils.currentTime;
        }
    };

    buttonSync.onCreateButton = function() {
        button = $(buttonSyncHTML).click(function() {
            if(!$(this).hasClass("disabled")) {
                synchronizer.sync();
            }
        });
        return button;
    };

    buttonSync.onReady = updateButtonState;

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

    // Check that a file has synchronized locations and no real time synchronized location
    var checkSynchronization = function(fileDesc) {
        if(_.size(fileDesc.syncLocations) !== 0 && !_.some(fileDesc.syncLocations, function(syncAttributes) {
            return syncAttributes.isRealtime;
        })) {
            uploadPending = true;
            updateButtonState();
        }
    };

    buttonSync.onContentChanged = checkSynchronization;
    buttonSync.onTitleChanged = checkSynchronization;

    return buttonSync;

});