define([
    "jquery",
    "underscore",
    "crel",
    "utils",
    "classes/Extension",
    "xregexp",
    "text!bower-libs/Typo.js/typo/typo.js",
    "text!bower-libs/lz-string/libs/lz-string-1.3.3.js",
    "text!workers/spellCheckWorker.js",
    "text!html/spellCheckSettingsBlock.html",
], function($, _, crel, utils, Extension, XRegExp, typoJS, LZStringJS, spellCheckWorkerJS, spellCheckSettingsBlockHTML) {

    var spellCheck = new Extension("spellCheck", "Spell Check", true, true, true);
    spellCheck.settingsBlock = spellCheckSettingsBlockHTML;
    spellCheck.defaultConfig = {
        locale: "en_US",
    };

    spellCheck.onLoadSettings = function() {
        utils.setInputValue("#select-spell-check-locale", spellCheck.config.locale);
    };

    spellCheck.onSaveSettings = function(newConfig) {
        newConfig.locale = utils.getInputValue("#select-spell-check-locale");
    };

    var worker;
    var isInited = false;
    spellCheck.onInit = function() {
        // Create a web worker
        worker = new Worker('res/worker.js');
        worker.postMessage(spellCheckWorkerJS);
        require([
            'text!../libs/dictionaries/' + spellCheck.config.locale + '.dic.lz',
            'text!../libs/dictionaries/' + spellCheck.config.locale + '.aff.lz',
        ], function(dic, aff) {
            worker.postMessage(JSON.stringify(['init', typoJS, LZStringJS, spellCheck.config.locale, aff, dic]));
            isInited = true;
            start();
        });
    };

    var aceEditor;
    var wordRegExp = XRegExp('\\p{L}+(?:\'\\p{L}+)*', 'g');
    var markers = [];
    var timeoutId;

    var currentRowCheck;

    function rowCheck(rowIndex) {
        var tokens = aceEditor.session.getTokens(rowIndex).slice();
        var tokenOffset = 0;
        var self = this;
        self.checkToken = function() {
            if (tokens.length === 0) {
                !timeoutId && (timeoutId = setTimeout(check, 5));
                return;
            }
            var token = tokens.shift();
            var words = [];
            if (!/code|code_block|link|reference|string|keyword|tag|markup\.underline/.test(token.type)) {
                token.value.replace(wordRegExp, function(word, offset) {
                    words.push({
                        value: word,
                        offset: offset + tokenOffset
                    });
                });
            }
            tokenOffset += token.value.length;
            if (words.length === 0) {
                self.checkToken();
                return;
            }
            worker.onmessage = function(e) {
                var message = JSON.parse(e.data);
                if (message[0] != 'check') {
                    return;
                }
                var checkedWords = message[1];
                if (self.stopped) {
                    return;
                }
                var Range = require('ace/range').Range;
                _.each(checkedWords, function(word) {
                    if (!word.check) {
                        var range = new Range(rowIndex, word.offset, rowIndex, word.offset + word.value.length);
                        var markerId = aceEditor.session.addMarker(range, "misspelled", "typo", true);
                        var marker = aceEditor.session.getMarkers(true)[markerId];
                        markers.push(marker);
                    }
                });
                self.checkToken();
            };
            worker.postMessage(JSON.stringify(['check', words]));
        };
    }

    var rowIndex = 0;

    function check() {
        timeoutId = undefined;
        currentRowCheck && (currentRowCheck.stopped = true);
        currentRowCheck = new rowCheck(rowIndex++);
        currentRowCheck.checkToken();
    }

    function stop() {
        currentRowCheck && (currentRowCheck.stopped = true);
        timeoutId && clearTimeout(timeoutId);
        timeoutId = undefined;
    }

    function start() {
        if(isInited === false || aceEditor === undefined) {
            return;
        }
        var savedMarkers = [];
        _.each(markers, function(marker) {
            if (marker.range.start.row < rowIndex) {
                savedMarkers.push(marker);
            }
            else {
                aceEditor.session.removeMarker(marker.id);
            }
        });
        markers = savedMarkers;
        timeoutId = setTimeout(check, 2000);
    }

/*
    var dropdownElt;
    var $dropdownElt;
    var liEltTmpl = [
        '<li>',
        '   <a href="#">',
        '       <%= suggestion %>',
        '   </a>',
        '</li>'
        ].join('');

    var currentWordSuggest = undefined;

    function wordSuggest(marker) {
        var word = aceEditor.session.getTextRange(marker.range);
        var self = this;
        self.run = function() {
            worker.onmessage = function(e) {
                var message = JSON.parse(e.data);
                if (message[0] != 'suggest') {
                    return;
                }
                var suggestions = message[1];
                if (self.stopped) {
                    return;
                }
                console.log(suggestions);
                var liListHtml = _.reduce(suggestions, function(result, suggestion) {
                    return result + _.template(liEltTmpl, {
                        suggestion: suggestion,
                    });
                }, '');
                dropdownElt.innerHTML = liListHtml;
                $(dropdownElt).dropdown('toggle');
            };
            worker.postMessage(JSON.stringify(['suggest', word]));
        };
    }
*/

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

        // Suggestions are disabled. Too much CPU consumption.
        /*
        aceEditor.on("click", function(ev) {
            var screenCoordinates = aceEditor.renderer.pixelToScreenCoordinates(ev.x, ev.y);
            var documentPosition = aceEditor.session.screenToDocumentPosition(screenCoordinates.row, screenCoordinates.column);
            _.each(markers, function(marker) {
                if (marker.range.contains(documentPosition.row, documentPosition.column)) {
                    currentWordSuggest && (currentWordSuggest.stopped = true);
                    currentWordSuggest = new wordSuggest(marker);
                    currentWordSuggest.run();
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