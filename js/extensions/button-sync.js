define([
    "jquery",
    "underscore"
], function($, _) {

    var buttonSync = {
        extensionId: "buttonSync",
        extensionName: 'Button "Synchronize"',
        settingsBloc: '<p>Adds a "Synchronize documents" button in the navigation bar.</p>'
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

    buttonSync.onCreateButton = function() {
        button = $([
            '<button class="btn" title="Synchronize all documents">',
            '   <i class="icon-refresh"></i>',
            '</button>'
        ].join("")).click(function() {
            if(!$(this).hasClass("disabled")) {
                synchronizer.forceSync();
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