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

    var synchronizer = undefined;
    buttonSync.onSynchronizerCreated = function(synchronizerParameter) {
        synchronizer = synchronizerParameter;
    };

    var button = undefined;
    var syncRunning = false;
    var isOffline = false;
    // Enable/disable the button
    var updateButtonState = function() {
        if(button === undefined) {
            return;
        }
        if(syncRunning === true || synchronizer.hasSync() === false || isOffline) {
            button.addClass("disabled");
        }
        else {
            button.removeClass("disabled");
        }
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
        return button[0];
    };

    buttonSync.onReady = updateButtonState;
    buttonSync.onFileCreated = updateButtonState;
    buttonSync.onFileDeleted = updateButtonState;
    buttonSync.onSyncImportSuccess = updateButtonState;
    buttonSync.onSyncExportSuccess = updateButtonState;
    buttonSync.onSyncRemoved = updateButtonState;

    buttonSync.onSyncRunning = function(isRunning) {
        syncRunning = isRunning;
        updateButtonState();
    };

    buttonSync.onOfflineChanged = function(isOfflineParameter) {
        isOffline = isOfflineParameter;
        updateButtonState();
    };

    return buttonSync;

});