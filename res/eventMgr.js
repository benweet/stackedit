define([
    "jquery",
    "underscore",
    "crel",
    "utils",
    "classes/Extension",
    "settings",
    "text!html/settingsExtensionsAccordion.html",
    "extensions/partialRendering",
    "extensions/userCustom",
    "extensions/buttonMarkdownSyntax",
    "extensions/googleAnalytics",
    "extensions/dialogAbout",
    "extensions/dialogManagePublication",
    "extensions/dialogManageSynchronization",
    "extensions/dialogOpenHarddrive",
    "extensions/documentTitle",
    "extensions/documentSelector",
    "extensions/documentPanel",
    "extensions/documentManager",
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
    "extensions/buttonViewer",
    "libs/bootstrap/bootstrap",
    "libs/jquery.waitforimages"
], function($, _, crel, utils, Extension, settings, settingsExtensionsAccordionHTML) {

    var eventMgr = {};

    // Create a list of extensions from module arguments
    var extensionList = _.chain(arguments).map(function(argument) {
        return argument instanceof Extension && argument;
    }).compact().value();

    // Configure extensions
    extensionSettings = settings.extensionSettings || {};
    _.each(extensionList, function(extension) {
        // Set the extension.config attribute from settings or default
        // configuration
        extension.config = _.extend({}, extension.defaultConfig, extensionSettings[extension.extensionId]);
        if(viewerMode === true && extension.disableInViewer === true) {
            // Skip enabling the extension if we are in the viewer and extension
            // doesn't support it
            extension.enabled = false;
        }
        else {
            // Enable the extension if it's not optional or it has not been
            // disabled by the user
            extension.enabled = !extension.isOptional || extension.config.enabled === undefined || extension.config.enabled === true;
        }
    });

    // Returns all listeners with the specified name that are implemented in the
    // enabled extensions
    function getExtensionListenerList(eventName) {
        return _.chain(extensionList).map(function(extension) {
            return extension.enabled && extension[eventName];
        }).compact().value();
    }

    // Returns a function that calls every listeners with the specified name
    // from all enabled extensions
    var eventListenerListMap = {};
    function createEventHook(eventName) {
        eventListenerListMap[eventName] = getExtensionListenerList(eventName);
        return function() {
            logger.log(eventName, arguments);
            var eventArguments = arguments;
            _.each(eventListenerListMap[eventName], function(listener) {
                // Use try/catch in case userCustom listener contains error
                try {
                    listener.apply(null, eventArguments);
                }
                catch(e) {
                    console.error(_.isObject(e) ? e.stack : e);
                }
            });
        };
    }

    // Add a Hook to the eventMgr that we can fire using eventMgr.eventName()
    function addEventHook(eventName) {
        eventMgr[eventName] = createEventHook(eventName);
    }

    // Used by external modules (not extensions) to listen to events
    eventMgr.addListener = function(eventName, listener) {
        try {
            eventListenerListMap[eventName].push(listener);
        }
        catch(e) {
            console.error('No event listener called ' + eventName);
        }
    };

    // Call every onInit listeners (extensions only)
    createEventHook("onInit")();

    // Load/Save extension config from/to settings
    eventMgr["onLoadSettings"] = function() {
        logger.log("onLoadSettings");
        _.each(extensionList, function(extension) {
            utils.setInputChecked("#input-enable-extension-" + extension.extensionId, extension.enabled === true);
            var onLoadSettingsListener = extension.onLoadSettings;
            onLoadSettingsListener && onLoadSettingsListener();
        });
    };
    eventMgr["onSaveSettings"] = function(newExtensionSettings, event) {
        logger.log("onSaveSettings");
        _.each(extensionList, function(extension) {
            var newExtensionConfig = _.extend({}, extension.defaultConfig);
            newExtensionConfig.enabled = utils.getInputChecked("#input-enable-extension-" + extension.extensionId);
            var onSaveSettingsListener = extension.onSaveSettings;
            onSaveSettingsListener && onSaveSettingsListener(newExtensionConfig, event);
            newExtensionSettings[extension.extensionId] = newExtensionConfig;
        });
    };

    addEventHook("onMessage");
    addEventHook("onError");
    addEventHook("onOfflineChanged");
    addEventHook("onUserActive");
    addEventHook("onAsyncRunning", true);
    addEventHook("onPeriodicRun", true);

    // To access modules that are loaded after extensions
    addEventHook("onFileMgrCreated");
    addEventHook("onSynchronizerCreated");
    addEventHook("onPublisherCreated");
    addEventHook("onEventMgrCreated");

    // Operations on files
    addEventHook("onFileCreated");
    addEventHook("onFileDeleted");
    addEventHook("onFileSelected");
    addEventHook("onFileOpen");
    addEventHook("onFileClosed");
    addEventHook("onContentChanged");
    addEventHook("onTitleChanged");

    // Operations on folders
    addEventHook("onFoldersChanged");

    // Sync events
    addEventHook("onSyncRunning");
    addEventHook("onSyncSuccess");
    addEventHook("onSyncImportSuccess");
    addEventHook("onSyncExportSuccess");
    addEventHook("onSyncRemoved");

    // Publish events
    addEventHook("onPublishRunning");
    addEventHook("onPublishSuccess");
    addEventHook("onNewPublishSuccess");
    addEventHook("onPublishRemoved");

    // Operations on Layout
    addEventHook("onLayoutConfigure");
    addEventHook("onLayoutCreated");

    // Operations on PageDown
    addEventHook("onEditorConfigure");
    addEventHook("onSectionsCreated");

    var onPreviewFinished = createEventHook("onPreviewFinished");
    var onAsyncPreviewListenerList = getExtensionListenerList("onAsyncPreview");
    // The number of times we expect tryFinished to be called
    var nbAsyncPreviewListener = onAsyncPreviewListenerList.length + 1;
    var previewContentsElt = undefined;
    var $previewContentsElt = undefined;
    eventMgr["onAsyncPreview"] = function() {
        logger.log("onAsyncPreview");
        logger.log("Conversion time: " + (new Date() - eventMgr.previewStartTime));
        // Call onPreviewFinished listeners when all async preview are finished
        var counter = 0;
        function tryFinished() {
            if(++counter === nbAsyncPreviewListener) {
                logger.log("Preview time: " + (new Date() - eventMgr.previewStartTime));
                _.defer(function() {
                    var html = "";
                    _.each(previewContentsElt.children, function(elt) {
                        html += elt.innerHTML;
                    });
                    onPreviewFinished(utils.trim(html));
                });
            }
        }
        // We assume images are loading in the preview
        $previewContentsElt.waitForImages(tryFinished);
        _.each(onAsyncPreviewListenerList, function(asyncPreviewListener) {
            asyncPreviewListener(tryFinished);
        });
    };

    var onReady = createEventHook("onReady");
    eventMgr["onReady"] = function() {
        previewContentsElt = document.getElementById('preview-contents');
        $previewContentsElt = $(previewContentsElt);

        if(viewerMode === false) {
            // Create accordion in settings dialog
            var accordionHtml = _.chain(extensionList).sortBy(function(extension) {
                return extension.extensionName.toLowerCase();
            }).reduce(function(html, extension) {
                return html + (extension.settingsBlock ? _.template(settingsExtensionsAccordionHTML, {
                    extensionId: extension.extensionId,
                    extensionName: extension.extensionName,
                    isOptional: extension.isOptional,
                    settingsBlock: extension.settingsBlock
                }) : "");
            }, "").value();
            document.querySelector('.accordion-extensions').innerHTML = accordionHtml;

            // Create a button from an extension listener
            function createBtn(listener) {
                var buttonGrpElt = crel('div', {
                    class: 'btn-group'
                });
                var btnElt = listener();
                if(_.isString(btnElt)) {
                    buttonGrpElt.innerHTML = btnElt;
                }
                else if(_.isElement(btnElt)) {
                    buttonGrpElt.appendChild(btnElt);
                }
                return buttonGrpElt;
            }

            // Create extension buttons
            logger.log("onCreateButton");
            var onCreateButtonListenerList = getExtensionListenerList("onCreateButton");
            var extensionButtonsFragment = document.createDocumentFragment();
            _.each(onCreateButtonListenerList, function(listener) {
                extensionButtonsFragment.appendChild(createBtn(listener));
            });
            document.getElementById('extension-buttons').appendChild(extensionButtonsFragment);

            // Create extension preview buttons
            logger.log("onCreatePreviewButton");
            var onCreatePreviewButtonListenerList = getExtensionListenerList("onCreatePreviewButton");
            var extensionPreviewButtonsFragment = document.createDocumentFragment();
            _.each(onCreatePreviewButtonListenerList, function(listener) {
                extensionPreviewButtonsFragment.appendChild(createBtn(listener));
            });
            var previewButtonsElt = document.querySelector('.extension-preview-buttons');
            previewButtonsElt.appendChild(extensionPreviewButtonsFragment);

            // A bit of jQuery...
            var $previewButtonsElt = $(previewButtonsElt);
            var previewButtonsWidth = $previewButtonsElt.width();
            $previewButtonsElt.find('.btn-group').each(function() {
                var $btnGroupElt = $(this);
                // Align dropdown to the left of the screen
                $btnGroupElt.find('.dropdown-menu').css({
                    right: -previewButtonsWidth + $btnGroupElt.width() + $btnGroupElt.position().left
                });
            });

        }

        // Call onReady listeners
        onReady();
    };

    // For extensions that need to call other extensions
    eventMgr.onEventMgrCreated(eventMgr);
    return eventMgr;
});