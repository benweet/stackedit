define([
    "jquery",
    "underscore",
    "utils",
    "logger",
    "classes/Extension",
    "jgrowl",
    "text!html/notificationsSettingsBlock.html",
], function($, _, utils, logger, Extension, jGrowl, notificationsSettingsBlockHTML) {

    var notifications = new Extension("notifications", "Notifications");
    notifications.settingsBlock = notificationsSettingsBlockHTML;
    notifications.defaultConfig = {
        timeout: 8000
    };

    notifications.onLoadSettings = function() {
        utils.setInputValue("#input-notifications-timeout", notifications.config.timeout);
    };

    notifications.onSaveSettings = function(newConfig, event) {
        newConfig.timeout = utils.getInputIntValue("#input-notifications-timeout", event, 1, 60000);
    };

    var isInit = false;
    function init() {
        if(isInit === false) {
            // jGrowl configuration
            jGrowl.defaults.life = notifications.config.timeout;
            jGrowl.defaults.closer = false;
            jGrowl.defaults.closeTemplate = '';
            jGrowl.defaults.position = 'bottom-right';
            isInit = true;
        }
    }

    function showMessage(message, iconClass, options) {
        logger.info(message);
        init();
        if(!message) {
            return;
        }
        var endOfMsg = message.indexOf("|");
        if(endOfMsg !== -1) {
            message = message.substring(0, endOfMsg);
            if(!message) {
                return;
            }
        }
        options = options || {};
        iconClass = iconClass || "icon-info-circled";
        jGrowl("<i class='icon-white " + iconClass + "'></i> " + _.escape(message).replace(/\n/g, '<br/>'), options);
    }

    var isReady = false;
    var $offlineStatusElt;
    var $extensionButtonsElt;
    notifications.onReady = function() {
        isReady = true;
        $offlineStatusElt = $('.navbar .offline-status');
        $extensionButtonsElt = $('.navbar .extension-buttons');
        updateOnlineStatus();
    };

    notifications.onMessage = function(message) {
        showMessage(message);
    };

    notifications.onError = function(error) {
        logger.error(error);
        if(_.isString(error)) {
            showMessage(error, "icon-attention");
        }
        else if(_.isObject(error)) {
            showMessage(error.message, "icon-attention");
        }
    };

    var isOffline = false;
    function updateOnlineStatus() {
        if(isReady === false) {
            return;
        }
        $offlineStatusElt.toggleClass('hide', !isOffline);
        $extensionButtonsElt.toggleClass('hide', isOffline);
    }
    notifications.onOfflineChanged = function(isOfflineParam) {
        isOffline = isOfflineParam;
        updateOnlineStatus();
        if(isOffline === true) {
            showMessage("You are offline.", "icon-attention-circled msg-offline");
        }
        else {
            showMessage("You are back online!", "icon-signal");
        }
    };

    notifications.onSyncImportSuccess = function(fileDescList, provider) {
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

    notifications.onNewPublishSuccess = function(fileDesc, publishAttributes) {
        showMessage('"' + fileDesc.title + '" is now published on ' + publishAttributes.provider.providerName + '.');
    };

    notifications.onPublishRemoved = function(fileDesc, publishAttributes) {
        showMessage(publishAttributes.provider.providerName + " publish location has been removed.");
    };

    return notifications;
});