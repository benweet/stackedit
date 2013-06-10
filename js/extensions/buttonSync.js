define([
    "jquery",
    "underscore",
    "utils",
    "text!html/buttonSync.html",
    "text!html/buttonSyncSettingsBloc.html",
], function($, _, utils, buttonSyncHTML, buttonSyncSettingsBlocHTML) {

    var buttonSync = {
        extensionId: "buttonSync",
        extensionName: 'Button "Synchronize"',
        defaultConfig: {
            syncPeriod: 180000
        },
        settingsBloc: buttonSyncSettingsBlocHTML
    };

    buttonSync.onLoadSettings = function() {
        utils.setInputValue("#input-sync-period", buttonSync.config.syncPeriod);
    };

    buttonSync.onSaveSettings = function(newConfig, event) {
        newConfig.syncPeriod = utils.getInputIntValue("#input-sync-period", undefined, 0);
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

    // Check that a file has synchronized locations
    var checkSynchronization = function(fileDesc) {
        if(_.size(fileDesc.syncLocations) !== 0) {
            uploadPending = true;
            updateButtonState();
        }
    };

    buttonSync.onContentChanged = checkSynchronization;
    buttonSync.onTitleChanged = checkSynchronization;

    return buttonSync;

});