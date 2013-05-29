define([
    "jquery",
    "underscore",
    "utils"
], function($, _, utils) {

    var buttonStat = {
        extensionId: "buttonStat",
        extensionName: 'Button "Statistics"',
        optional: true,
        defaultConfig: {
            name1: "Words",
            value1: "\\S+",
            name2: "Characters",
            value2: "\\S",
            name3: "Paragraphs",
            value3: ".+",
        },
        settingsBloc: [
            '<p>Adds a "Document statistics" button in the navigation bar.</p>',
            '<p><div class="form-inline">',
            '   <label class="label-text" for="input-stat-name1">Title</label>',
            '   <input id="input-stat-name1" type="text" class="input-small">',
            '   <label class="label-text" for="input-stat-value1">RegExp</label>',
            '   <input id="input-stat-value1" type="text" class="span2">',
            '</div></p>',
            '<p><div class="form-inline">',
            '   <label class="label-text" for="input-stat-name2">Title</label>',
            '   <input id="input-stat-name2" type="text" class="input-small">',
            '   <label class="label-text" for="input-stat-value2">RegExp</label>',
            '   <input id="input-stat-value2" type="text" class="span2">',
            '</div></p>',
            '<p><div class="form-inline">',
            '   <label class="label-text" for="input-stat-name3">Title</label>',
            '   <input id="input-stat-name3" type="text" class="input-small">',
            '   <label class="label-text" for="input-stat-value3">RegExp</label>',
            '   <input id="input-stat-value3" type="text" class="span2">',
            '</div></p>'].join("")
    };

    buttonStat.onLoadSettings = function() {
        _.each(buttonStat.defaultConfig, function(value, key) {
            utils.setInputValue("#input-stat-" + key, buttonStat.config[key]);
        });
    };

    buttonStat.onSaveSettings = function(newConfig, event) {
        _.each(buttonStat.defaultConfig, function(value, key) {
            newConfig[key] = utils.getInputTextValue("#input-stat-" + key, event);
        });
    };

    buttonStat.onCreateButton = function() {
        return $([
            '<button class="btn dropdown-toggle" data-toggle="dropdown" title="Document statistics">',
            '   <i class="icon-stat"></i>',
            '</button>',
            '<div id="statistics-container" class="dropdown-menu pull-right">',
            '   <h3 class="muted">Statistics</h3>',
            '   <div class="stat">',
            '       <div>' + buttonStat.config.name1 + ': <span id="span-stat-value1"></span></div>',
            '       <div>' + buttonStat.config.name2 + ': <span id="span-stat-value2"></span></div>',
            '       <div>' + buttonStat.config.name3 + ': <span id="span-stat-value3"></span></div>',
            '   </div>',
            '</div>'
        ].join(""));
    };

    buttonStat.onPreviewFinished = function() {
        var text = $("#wmd-preview").text();
        $("#span-stat-value1").text(text.match(new RegExp(buttonStat.config.value1, "g")).length);
        $("#span-stat-value2").text(text.match(new RegExp(buttonStat.config.value2, "g")).length);
        $("#span-stat-value3").text(text.match(new RegExp(buttonStat.config.value3, "g")).length);
    };

    return buttonStat;

});