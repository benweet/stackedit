define([
    "jquery",
    "underscore",
    "crel",
    "utils",
    "classes/Extension",
    "typo-js",
    "xregexp",
    "text!bower-libs/Typo.js/typo/typo.js",
    "text!workers/spellCheckWorker.js",
    "text!dictionaries/en_US.dic",
    "text!dictionaries/en_US.aff",
    "text!html/tocSettingsBlock.html",
    ], function($, _, crel, utils, Extension, Typo, XRegExp, typoJS, spellCheckWorkerJS, dic, aff, tocSettingsBlockHTML) {

    var spellCheck = new Extension("spellCheck", "Spell Check", true, true, true);
    spellCheck.settingsBlock = tocSettingsBlockHTML;

    // Create a web worker
    var worker = new Worker('res/worker.js');
    worker.postMessage(spellCheckWorkerJS);
    worker.postMessage(JSON.stringify(['init', typoJS, 'en_US', aff, dic]));

    var aceEditor = undefined;
    var wordRegExp = XRegExp('\\p{L}+', 'g');
    var markers = [];
    var timeoutId = undefined;
    
    var currentRowCheck = undefined;
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
            if (!/code|code_block|reference|markup\.underline/.test(token.type)) {
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
                if(message[0] != 'check') {
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
        timeoutId = setTimeout(check, 700);
    }
    
    var dropdownElt = undefined;
    var $dropdownElt = undefined;
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
                if(message[0] != 'suggest') {
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