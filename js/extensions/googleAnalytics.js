define([
    "jquery",
    "underscore",
    "settings",
    "config",
], function($, _, settings) {

    var googleAnalytics = {
        extensionId: "googleAnalytics",
        extensionName: 'Google Analytics',
        optional: true,
        settingsBloc: '<p>Sends anonymous statistics about usage and errors to help improve StackEdit.</p>'
    };

    var isLoaded = false;
    var isOffline = false;
    window["_gaq"] = [];

    var init = function() {
        if(isLoaded === false && isOffline === false) {

            // First configure GA
            _gaq.push([
                '_setAccount',
                GOOGLE_ANALYTICS_ACCOUNT_ID
            ]);
            _gaq.push([
                '_trackPageview'
            ]);

            // Collect informations about user settings
            _gaq.push([
                '_trackEvent',
                "settings",
                'layoutOrientation',
                "" + settings.layoutOrientation
            ]);
            _gaq.push([
                '_trackEvent',
                "settings",
                'lazyRendering',
                "" + settings.lazyRendering
            ]);
            _gaq.push([
                '_trackEvent',
                "settings",
                'editorFontSize',
                "" + settings.editorFontSize
            ]);
            // Check if user has removed back links
            _gaq.push([
                '_trackEvent',
                "settings",
                'defaultContentBacklink',
                "" + settings.defaultContent.indexOf(MAIN_URL) >= 0
            ]);
            _gaq.push([
                '_trackEvent',
                "settings",
                'commitMsgBacklink',
                "" + settings.commitMsg.indexOf(MAIN_URL) >= 0
            ]);
            // Check if user has changed sshProxy
            _gaq.push([
                '_trackEvent',
                "settings",
                'sshProxyChanged',
                "" + settings.sshProxy != SSH_PROXY_URL
            ]);
            // Check if extensions have been disabled
            _.each(settings.extensionSettings, function(config, extensionId) {
                _gaq.push([
                    '_trackEvent',
                    "extensions",
                    extensionId + "Enabled",
                    "" + config.enabled
                ]);
            });

            // Now load GA script using jQuery
            var gaUrl = "/ga.js";
            if(location.search.match(/(\?|&)console/)) {
                gaUrl = "/u/ga_debug.js";
            }
            $.ajax({
                url: "http://www.google-analytics.com" + gaUrl,
                dataType: "script"
            }).done(function() {
                isLoaded = true;
            });
        }
    };

    googleAnalytics.onReady = init;
    googleAnalytics.onOfflineChanged = function(isOfflineParam) {
        isOffline = isOfflineParam;
        init();
    };

    var currentAction = "No action";
    googleAnalytics.onSyncRunning = function() {
        currentAction = "Sync";
    };
    googleAnalytics.onPublishRunning = function() {
        currentAction = "Publish";
    };
    googleAnalytics.onAsyncRunning = function(isRunning) {
        if(isRunning === false) {
            currentAction = "No action";
        }
    };

    // Log sync frequency
    googleAnalytics.onSyncSuccess = function() {
        _gaq.push([
            '_trackEvent',
            'Sync',
            'SyncSuccess'
        ]);
    };
    // Log import frequency and provider
    googleAnalytics.onSyncImportSuccess = function(fileDescList, provider) {
        _gaq.push([
            '_trackEvent',
            'Sync',
            'SyncImport',
        ]);
        _gaq.push([
            '_trackEvent',
            'Sync',
            'SyncImportProvider',
            provider.providerId
        ]);
    };
    // Log export frequency and provider
    googleAnalytics.onSyncExportSuccess = function(fileDesc, syncAttributes) {
        _gaq.push([
            '_trackEvent',
            'Sync',
            'SyncExport',
        ]);
        _gaq.push([
            '_trackEvent',
            'Sync',
            'SyncExportProvider',
            syncAttributes.provider.providerId
        ]);
    };
    // Log publish frequency and provider
    googleAnalytics.onPublishSuccess = function(fileDesc) {
        _gaq.push([
            '_trackEvent',
            'Publish',
            'PublishSuccess'
        ]);
        _.each(fileDesc.publishLocations, function(publishAttributes) {
            _gaq.push([
                '_trackEvent',
                'Publish',
                'PublishSuccessProvider',
                publishAttributes.provider.providerId
            ]);
        });
    };
    // Log new publication's provider
    googleAnalytics.onNewPublishSuccess = function(fileDesc, publishAttributes) {
        _gaq.push([
            '_trackEvent',
            'Publish',
            'NewPublishProvider',
            publishAttributes.provider.providerId
        ]);
    };

    // Log error messages
    googleAnalytics.onError = function(error) {
        if(_.isString(error) || !error.message) {
            return;
        }
        _gaq.push([
            '_trackEvent',
            currentAction,
            'Error',
            error.message
        ]);
    };

    return googleAnalytics;

});