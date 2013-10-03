define([
    "jquery",
    "underscore",
    "utils",
    "classes/Extension",
    "typo-js",
    "xregexp",
    "text!dictionaries/en_US.dic",
    "text!dictionaries/en_US.aff",
    "text!html/tocSettingsBlock.html",
    ], function($, _, utils, Extension, Typo, XRegExp, dic, aff, tocSettingsBlockHTML) {

    var spellCheck = new Extension("spellCheck", "Spell Check", true);
    spellCheck.settingsBlock = tocSettingsBlockHTML;

    var aceEditor = undefined;
    spellCheck.onAceCreated = function(aceEditorParam) {
        aceEditor = aceEditorParam;
    };

    var context = undefined;
    spellCheck.onFileClose = function() {
        if (context !== undefined) {
            _.each(context.markers, function(marker) {
                aceEditor.session.removeMarker(marker);
            });
        }
        context = undefined;
    };

    var dictionary = new Typo('en_US', aff, dic);
    spellCheck.onFileOpen = function() {
        context = {
            markers: []
        };
        var Range = require('ace/range').Range;
        var lines = aceEditor.session.getDocument().getAllLines();
        _.each(lines, function(line, index) {
            line.replace(XRegExp('\\p{L}+', 'g'), function(word, offset) {
                if (!dictionary.check(word)) {
                    console.log(word);
                    var range = new Range(index, offset, index, offset + word.length);
                    context.markers[index] = aceEditor.session.addMarker(range, "misspelled", "typo", true);
                }
            });
        });
    };

    return spellCheck;
});