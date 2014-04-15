define([
    "jquery",
    "underscore",
    "utils",
    "mousetrap",
    "classes/Extension",
    "text!extensions/shortcutsDefaultMapping.js",
    "text!html/shortcutsSettingsBlock.html",
], function($, _, utils, mousetrap, Extension, shortcutsDefaultMapping, shortcutsSettingsBlockHTML) {

    var shortcuts = new Extension("shortcuts", "Shortcuts", true, true);
    shortcuts.settingsBlock = shortcutsSettingsBlockHTML;
    shortcuts.defaultConfig = {
        mapping: shortcutsDefaultMapping,
    };

    var eventMgr;
    var clickPagedownButton;
    shortcuts.onEventMgrCreated = function(eventMgrParameter) {
        eventMgr = eventMgrParameter;
        eventMgr.addListener('onPagedownConfigure', function(pagedownEditor) {
            clickPagedownButton = function(buttonName) {
                pagedownEditor.uiManager.doClick(pagedownEditor.uiManager.buttons[buttonName]);
            };
        });
    };

    shortcuts.onLoadSettings = function() {
        utils.setInputValue("#textarea-shortcuts-mapping", shortcuts.config.mapping);
    };

    shortcuts.onSaveSettings = function(newConfig, event) {
        newConfig.code = utils.getInputValue("#textarea-shortcuts-mapping");
        try {
            /*jshint evil: true */
            eval('var test = ' + newConfig.code);
        }
        catch(e) {
            eventMgr.onError(e);
            // Mark the textarea as error
            utils.getInputTextValue("#textarea-shortcuts-mapping", event, /^$/);
        }
    };

    shortcuts.onInit = function() {
        try {
            /*jshint evil: true */
            var shortcutMap;
            eval('shortcutMap = ' + shortcuts.config.mapping);
            _.each(shortcutMap, function(func, shortcut) {
                mousetrap.bind(shortcut, func);
            });
        }
        catch(e) {
            console.error(e);
        }
    };

    return shortcuts;
});
