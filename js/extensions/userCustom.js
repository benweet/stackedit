define([
    "jquery",
    "underscore",
    "utils",
    "classes/Extension",
    "fileSystem",
    "settings",
    "text!html/userCustomSettingsBlock.html",
], function($, _, utils, Extension, fileSystem, settings, userCustomSettingsBlockHTML) {

    var userCustom = new Extension("userCustom", "UserCustom extension", true);
    userCustom.settingsBlock = userCustomSettingsBlockHTML;
    userCustom.defaultConfig = {
        code: "",
    };

    var fileMgr = undefined;
    userCustom.onFileMgrCreated = function(fileMgrParameter) {
        fileMgr = fileMgrParameter;
    };

    var synchronizer = undefined;
    userCustom.onSynchronizerCreated = function(synchronizerParameter) {
        synchronizer = synchronizerParameter;
    };

    var publisher = undefined;
    userCustom.onPublisherCreated = function(publisherParameter) {
        publisher = publisherParameter;
    };

    var eventMgr = undefined;
    userCustom.onEventMgrCreated = function(eventMgrParameter) {
        eventMgr = eventMgrParameter;
    };

    userCustom.onLoadSettings = function() {
        utils.setInputValue("#textarea-usercustom-code", userCustom.config.code);
    };

    userCustom.onSaveSettings = function(newConfig, event) {
        newConfig.code = utils.getInputValue("#textarea-usercustom-code");
        try {
            eval(newConfig.code);
        }
        catch(e) {
            eventMgr.onError(e);
            // Mark the textarea as error
            utils.getInputTextValue("#textarea-usercustom-code", event, /^$/);
        }
    };

    userCustom.onInit = function() {
        try {
            eval(userCustom.config.code);
        }
        catch(e) {
            console.error(e);
        }
    };

    return userCustom;
});