define([
    "jquery",
    "underscore",
    "utils",
    "classes/Extension",
    "text!html/buttonStat.html",
    "text!html/buttonStatSettingsBlock.html"
], function($, _, utils, Extension, buttonStatHTML, buttonStatSettingsBlockHTML) {

    var buttonStat = new Extension("buttonStat", 'Button "Statistics"', true);
    buttonStat.settingsBlock = buttonStatSettingsBlockHTML;
    buttonStat.defaultConfig = {
        name1: "Characters",
        value1: "\\S",
        name2: "Words",
        value2: "\\S+",
        name3: "Paragraphs",
        value3: "\\S.*"
    };

    var eventMgr;
    buttonStat.onEventMgrCreated = function(eventMgrParam) {
        eventMgr = eventMgrParam;
    };

    buttonStat.onLoadSettings = function() {
        _.each([
            1,
            2,
            3
        ], function(index) {
            utils.setInputValue("#input-stat-name" + index, buttonStat.config["name" + index]);
            utils.setInputValue("#input-stat-value" + index, buttonStat.config["value" + index]);
        });
    };

    buttonStat.onSaveSettings = function(newConfig, event) {
        _.each([
            1,
            2,
            3
        ], function(index) {
            newConfig["name" + index] = utils.getInputTextValue("#input-stat-name" + index, event);
            newConfig["value" + index] = utils.getInputRegExpValue("#input-stat-value" + index, event);
        });
    };

    buttonStat.onCreatePreviewButton = function() {
        return _.template(buttonStatHTML, buttonStat.config);
    };

    var previewContentsElt;
    var valueElt, value1Elt, value2Elt, value3Elt;
    buttonStat.onReady = function() {
        previewContentsElt = document.getElementById('preview-contents');
        valueElt = document.querySelector('.stat-button .value');
        value1Elt = document.querySelector('.stat-button-dropdown .value1');
        value2Elt = document.querySelector('.stat-button-dropdown .value2');
        value3Elt = document.querySelector('.stat-button-dropdown .value3');
    };

    var regex1, regex2, regex3;
    buttonStat.onInit = function() {
        regex1 = new RegExp(buttonStat.config.value1, "g");
        regex2 = new RegExp(buttonStat.config.value2, "g");
        regex3 = new RegExp(buttonStat.config.value3, "g");
    };

    buttonStat.onPreviewFinished = function() {
        var previewContentsEltClone = previewContentsElt.cloneNode(true);
        var scriptEltList = previewContentsEltClone.getElementsByTagName('script');
        for(var i = scriptEltList.length-1; i >= 0; i--) {
            var scriptElt = scriptEltList[i];
            scriptElt.parentNode.removeChild(scriptElt);
        }
        var text = previewContentsEltClone.textContent;
        valueElt.textContent = value1Elt.textContent = (text.match(regex1) || []).length;
        value2Elt.textContent = (text.match(regex2) || []).length;
        value3Elt.textContent = (text.match(regex3) || []).length;
        eventMgr.onExtensionButtonResize();
    };

    return buttonStat;

});
