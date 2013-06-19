define([
    "jquery",
    "underscore",
    "utils",
    "text!html/buttonStat.html",
    "text!html/buttonStatSettingsBloc.html",
], function($, _, utils, buttonStatHTML, buttonStatSettingsBlocHTML) {

    var buttonStat = {
        extensionId: "buttonStat",
        extensionName: 'Button "Statistics"',
        optional: true,
        defaultConfig: {
            name1: "Characters",
            value1: "\\S",
            name2: "Words",
            value2: "\\S+",
            name3: "Paragraphs",
            value3: "\\S.*",
        },
        settingsBloc: buttonStatSettingsBlocHTML
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
        return $(_.template(buttonStatHTML, buttonStat.config));
    };

    buttonStat.onPreviewFinished = function() {
        var text = $("#wmd-preview").clone().find("script").remove().end().text();
        $("#span-stat-value1").text((text.match(new RegExp(buttonStat.config.value1, "g")) || []).length);
        $("#span-stat-value2").text((text.match(new RegExp(buttonStat.config.value2, "g")) || []).length);
        $("#span-stat-value3").text((text.match(new RegExp(buttonStat.config.value3, "g")) || []).length);
    };

    return buttonStat;

});