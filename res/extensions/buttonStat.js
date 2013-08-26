define([
    "jquery",
    "underscore",
    "utils",
    "classes/Extension",
    "text!html/buttonStat.html",
    "text!html/buttonStatSettingsBlock.html",
], function($, _, utils, Extension, buttonStatHTML, buttonStatSettingsBlockHTML) {

    var buttonStat = new Extension("buttonStat", 'Button "Statistics"', true, true);
    buttonStat.settingsBlock = buttonStatSettingsBlockHTML;
    buttonStat.defaultConfig = {
        name1: "Characters",
        value1: "\\S",
        name2: "Words",
        value2: "\\S+",
        name3: "Paragraphs",
        value3: "\\S.*",
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
    
    var previewContentsElt = undefined;
    var value1Elt = undefined;
    var value2Elt = undefined;
    var value3Elt = undefined;
    buttonStat.onReady = function() {
        previewContentsElt = document.getElementById('preview-contents');
        value1Elt = document.getElementById('span-stat-value1');
        value2Elt = document.getElementById('span-stat-value2');
        value3Elt = document.getElementById('span-stat-value3');
    };

    buttonStat.onPreviewFinished = function() {
        var previewContentsEltClone = previewContentsElt.cloneNode(true);
        var scriptEltList = previewContentsEltClone.getElementsByTagName('script');
        for(var i = scriptEltList.length-1; i >= 0; i--) {
            var scriptElt = scriptEltList[i];
            scriptElt.parentNode.removeChild(scriptElt);
        }
        var text = previewContentsEltClone.textContent;
        value1Elt.textContent = (text.match(new RegExp(buttonStat.config.value1, "g")) || []).length;
        value2Elt.textContent = (text.match(new RegExp(buttonStat.config.value2, "g")) || []).length;
        value3Elt.textContent = (text.match(new RegExp(buttonStat.config.value3, "g")) || []).length;
    };

    return buttonStat;

});