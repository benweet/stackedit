define([
    "jquery",
    "underscore",
    "utils",
    "classes/Extension",
    "settings",
    "text!html/settingsExtensionsAccordion.html",
    "extensions/googleAnalytics",
    "extensions/dialogAbout",
    "extensions/dialogManagePublication",
    "extensions/dialogManageSynchronization",
    "extensions/dialogOpenHarddrive",
    "extensions/documentSelector",
    "extensions/documentTitle",
    "extensions/workingIndicator",
    "extensions/notifications",
    "extensions/markdownExtra",
    "extensions/toc",
    "extensions/mathJax",
    "extensions/emailConverter",
    "extensions/scrollLink",
    "extensions/buttonSync",
    "extensions/buttonPublish",
    "extensions/buttonShare",
    "extensions/buttonStat",
    "extensions/buttonHtmlCode",
    "extensions/buttonMarkdownSyntax",
    "extensions/buttonViewer",
    "extensions/userCustom",
    "libs/bootstrap",
    "libs/jquery.waitforimages"
], function($, _, utils, Extension, settings, settingsExtensionsAccordionHTML) {

    var extensionMgr = {};

    // Create a list of extensions
    var extensionList = _.chain(arguments).map(function(argument) {
        return argument instanceof Extension && argument;
    }).compact().value();

    // Returns all callbacks with the specified name that are implemented in extensions
    function getExtensionCallbackList(hookName) {
        return _.chain(extensionList).map(function(extension) {
            return extension.config.enabled && extension[hookName];
        }).compact().value();
    }

    // Return a function that calls every callbacks with the specified name from all extensions
    function createHook(hookName, noLog) {
        var callbackList = getExtensionCallbackList(hookName);
        return function() {
            if(!noLog) {
                logger.log(hookName, arguments);
            }
            var callbackArguments = arguments;
            _.each(callbackList, function(callback) {
                callback.apply(null, callbackArguments);
            });
        };
    }

    // Add a Hook to the extensionMgr
    function addHook(hookName, noLog) {
        extensionMgr[hookName] = createHook(hookName, noLog);
    }

    // Set extension config
    extensionSettings = settings.extensionSettings || {};
    _.each(extensionList, function(extension) {
        extension.config = _.extend({}, extension.defaultConfig, extensionSettings[extension.extensionId]);
        extension.config.enabled = !extension.isOptional || extension.config.enabled === undefined || extension.config.enabled === true;
    });
    
    // Call every onInit callbacks
    createHook("onInit")();

    // Load/Save extension config from/to settings
    extensionMgr["onLoadSettings"] = function() {
        logger.log("onLoadSettings");
        _.each(extensionList, function(extension) {
            utils.setInputChecked("#input-enable-extension-" + extension.extensionId, extension.config.enabled);
            var onLoadSettingsCallback = extension.onLoadSettings;
            onLoadSettingsCallback && onLoadSettingsCallback();
        });
    };
    extensionMgr["onSaveSettings"] = function(newExtensionSettings, event) {
        logger.log("onSaveSettings");
        _.each(extensionList, function(extension) {
            var newExtensionConfig = _.extend({}, extension.defaultConfig);
            newExtensionConfig.enabled = utils.getInputChecked("#input-enable-extension-" + extension.extensionId);
            var onSaveSettingsCallback = extension.onSaveSettings;
            onSaveSettingsCallback && onSaveSettingsCallback(newExtensionConfig, event);
            newExtensionSettings[extension.extensionId] = newExtensionConfig;
        });
    };

    addHook("onMessage");
    addHook("onError");
    addHook("onOfflineChanged");
    addHook("onAsyncRunning", true);
    addHook("onPeriodicRun", true);

    // To access modules that are loaded after extensions
    addHook("onFileMgrCreated");
    addHook("onSynchronizerCreated");
    addHook("onPublisherCreated");
    addHook("onExtensionMgrCreated");

    // Operations on files
    addHook("onFileCreated");
    addHook("onFileDeleted");
    addHook("onFileSelected");
    addHook("onContentChanged");
    addHook("onTitleChanged");

    // Sync events
    addHook("onSyncRunning");
    addHook("onSyncSuccess");
    addHook("onSyncImportSuccess");
    addHook("onSyncExportSuccess");
    addHook("onSyncRemoved");

    // Publish events
    addHook("onPublishRunning");
    addHook("onPublishSuccess");
    addHook("onNewPublishSuccess");
    addHook("onPublishRemoved");

    // Operations on Layout
    addHook("onLayoutConfigure");
    addHook("onLayoutCreated");

    // Operations on PageDown
    addHook("onEditorConfigure");

    var onPreviewFinished = createHook("onPreviewFinished");
    var onAsyncPreviewCallbackList = getExtensionCallbackList("onAsyncPreview");
    // The number of times we expect tryFinished to be called
    var nbAsyncPreviewCallback = onAsyncPreviewCallbackList.length + 1;
    extensionMgr["onAsyncPreview"] = function() {
        logger.log("onAsyncPreview");
        // Call onPreviewFinished callbacks when all async preview are finished
        var counter = 0;
        function tryFinished() {
            if(++counter === nbAsyncPreviewCallback) {
                onPreviewFinished();
            }
        }
        // We assume images are loading in the preview
        $("#wmd-preview").waitForImages(tryFinished);
        _.each(onAsyncPreviewCallbackList, function(asyncPreviewCallback) {
            asyncPreviewCallback(tryFinished);
        });
    };

    function createSettings(extension) {
        $("#accordion-extensions").append($(_.template(settingsExtensionsAccordionHTML, {
            extensionId: extension.extensionId,
            extensionName: extension.extensionName,
            isOptional: extension.isOptional,
            settingsBlock: extension.settingsBlock
        })));
    }

    extensionMgr["onReady"] = function() {
        // Create accordion in settings dialog
        _.chain(extensionList).sortBy(function(extension) {
            return extension.extensionName.toLowerCase();
        }).each(createSettings);

        // Create extension buttons
        logger.log("onCreateButton");
        var onCreateButtonCallbackList = getExtensionCallbackList("onCreateButton");
        _.each(onCreateButtonCallbackList, function(callback) {
            $("#extension-buttons").append($('<div class="btn-group">').append(callback()));
        });

        // Create extension preview buttons
        logger.log("onCreatePreviewButton");
        var onCreatePreviewButtonCallbackList = getExtensionCallbackList("onCreatePreviewButton");
        _.each(onCreatePreviewButtonCallbackList, function(callback) {
            $("#extension-preview-buttons").append($('<div class="btn-group">').append(callback()));
        });

        // Call extensions onReady callbacks
        var onReady = createHook("onReady");
        onReady();
    };

    // For extensions that need to call other extensions
    extensionMgr.onExtensionMgrCreated(extensionMgr);
    return extensionMgr;
});