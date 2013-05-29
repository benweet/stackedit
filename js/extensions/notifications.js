define([
    "jquery",
    "underscore",
    "utils",
    "jgrowl"
], function($, _, utils, jGrowl) {

    var notifications = {
        extensionId: "notifications",
        extensionName: "Notifications",
        defaultConfig: {
            timeout: 8000
        },
        settingsBloc: [
            '<p>Shows notification messages in the bottom-right corner of the screen.</p>',
            '<div class="form-horizontal">',
            '   <div class="control-group">',
            '       <label class="control-label" for="input-notifications-timeout">Timeout</label>',
            '       <div class="controls">',
            '           <input type="text" id="input-notifications-timeout" class="input-mini">',
            '           <span class="help-inline">ms</span>',
            '       </div>',
            '   </div>',
            '</div>'
        ].join("")
    };

    notifications.onLoadSettings = function() {
        utils.setInputValue("#input-notifications-timeout", notifications.config.timeout);
    };

    notifications.onSaveSettings = function(newConfig, event) {
        newConfig.timeout = utils.getInputIntValue("#input-notifications-timeout", event, 1, 60000);
    };

    notifications.onReady = function() {
        // jGrowl configuration
        jGrowl.defaults.life = notifications.config.timeout;
        jGrowl.defaults.closer = false;
        jGrowl.defaults.closeTemplate = '';
        jGrowl.defaults.position = 'bottom-right';
    };

    function showMessage(message, iconClass, options) {
        logger.log(message);
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
        iconClass = iconClass || "icon-info-sign";
        jGrowl("<i class='icon-white " + iconClass + "'></i> " + _.escape(message), options);
    }

    notifications.onMessage = function(message) {
        showMessage(message);
    };

    notifications.onError = function(error) {
        logger.error(error);
        if(_.isString(error)) {
            showMessage(error, "icon-warning-sign");
        }
        else if(_.isObject(error)) {
            showMessage(error.message, "icon-warning-sign");
        }
    };

    notifications.onOfflineChanged = function(isOffline) {
        if(isOffline === true) {
            showMessage("You are offline.", "icon-exclamation-sign msg-offline", {
                sticky: true,
                close: function() {
                    showMessage("You are back online!", "icon-signal");
                }
            });
        }
        else {
            $(".msg-offline").parents(".jGrowl-notification").trigger('jGrowl.beforeClose');
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