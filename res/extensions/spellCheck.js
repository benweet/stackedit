define([
    "jquery",
    "underscore",
    "crel",
    "utils",
    "classes/Extension",
    "typo-js",
    "xregexp",
    "text!dictionaries/en_US.dic",
    "text!dictionaries/en_US.aff",
    "text!html/tocSettingsBlock.html",
    ], function($, _, crel, utils, Extension, Typo, XRegExp, dic, aff, tocSettingsBlockHTML) {

    var spellCheck = new Extension("spellCheck", "Spell Check", true);
    spellCheck.settingsBlock = tocSettingsBlockHTML;

    var aceEditor = undefined;
    var timeoutId = undefined;
    var dictionary = new Typo('en_US', aff, dic);
    var wordRegExp = XRegExp('\\p{L}+', 'g');
    var markers = [];
    var rowIndex = 0;

    function check() {
        var tokenOffset = 0,
            processedTokens = 0;
        var Range = require('ace/range').Range;

        function checkToken(token) {
            if (token.checked === undefined && !/code|code_block|reference|markup\.underline/.test(token.type)) {
                token.value.replace(wordRegExp, function(word, offset) {
                    if (!dictionary.check(word)) {
                        offset += tokenOffset;
                        var range = new Range(rowIndex, offset, rowIndex, offset + word.length);
                        var markerId = aceEditor.session.addMarker(range, "misspelled", "typo", true);
                        var marker = aceEditor.session.getMarkers(true)[markerId];
                        console.log(marker);
                        markers.push(marker);
                    }
                });
                processedTokens++;
            }
            token.checked = true;
            tokenOffset += token.value.length;
        }
        var rowCount = aceEditor.session.getDocument().getLength();
        for (; rowIndex < rowCount; rowIndex++) {
            var tokens = aceEditor.session.getTokens(rowIndex);
            tokenOffset = 0;
            _.each(tokens, checkToken);
            if (processedTokens > 5) {
                timeoutId = setTimeout(check, 20);
                return;
            }
        }
    }

    function stop() {
        timeoutId && clearTimeout(timeoutId);
        timeoutId = undefined;
    }

    function start() {
        var savedMarkers = [];
        console.log(rowIndex);
        _.each(markers, function(marker) {
            if (marker.range.start.row < rowIndex) {
                savedMarkers.push(marker);
            }
            else {
                aceEditor.session.removeMarker(marker.id);
            }
        });
        markers = savedMarkers;
        timeoutId = setTimeout(check, 700);
    }

    var fileOpen = false;
    spellCheck.onFileClose = function() {
        stop();
        fileOpen = false;
    };

    spellCheck.onFileOpen = function() {
        fileOpen = true;
        rowIndex = 0;
        stop();
        start();
    };

/*
    var dropdownElt = undefined;
    var $dropdownElt = undefined;
    var liEltTmpl = [
        '<li>',
        '   <a href="#">',
        '       <%= suggestion %>',
        '   </a>',
        '</li>'
    ].join('');
    */
    spellCheck.onAceCreated = function(aceEditorParam) {
        aceEditor = aceEditorParam;
        aceEditor.session.on('change', function(e) {
            if (fileOpen === true) {
                var modifiedRowIndex = e.data.range.start.row;
                if (modifiedRowIndex < rowIndex) {
                    rowIndex = modifiedRowIndex;
                }
                stop();
                start();
            }
        });
        /*
        aceEditor.on("click", function(ev) {
            var screenCoordinates = aceEditor.renderer.pixelToScreenCoordinates(ev.x, ev.y);
            var documentPosition = aceEditor.session.screenToDocumentPosition(screenCoordinates.row, screenCoordinates.column);
            _.each(markers, function(marker) {
                if (marker.range.contains(documentPosition.row, documentPosition.column)) {
                    var word = aceEditor.session.getTextRange(marker.range);
                    var suggestions = dictionary.suggest(word.toLowerCase());
                    console.log(word, suggestions);
                    var liListHtml = _.reduce(suggestions, function(result, suggestion) {
                        return result + _.template(liEltTmpl, {
                            suggestion: suggestion,
                        });
                    }, '');
                    dropdownElt.innerHTML = liListHtml;
                    $(dropdownElt).dropdown('toggle');
                }
            });
        });
    };

    spellCheck.onReady = function() {
        dropdownElt = crel('ul', {
            class: 'dropdown-menu dropdown-spell-checker'
        });
        document.querySelector('.ui-layout-resizer-north').appendChild(crel('div', crel('div', {
            'data-toggle': 'dropdown'
        }), dropdownElt));
        $dropdownElt = $(dropdownElt).dropdown();
        */
    };

    return spellCheck;
});