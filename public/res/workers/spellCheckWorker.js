/*jshint worker:true */
var dictionary;

/*jshint evil:true, unused:false */
self.init = function(typoJS, LZString, lang, aff, dic) {
    eval([
        typoJS,
        LZString,
        'aff = LZString.decompressFromUTF16(aff);',
        'dic = LZString.decompressFromUTF16(dic);',
        'dictionary = new Typo(lang, aff, dic);'
    ].join('\n'));
};
/*jshint evil:false, unused:true */

var timeoutId;
self.check = function(words) {
    // Check function has priority over Suggest function
    // This prevents Suggest to run if called just before Check
    timeoutId && clearTimeout(timeoutId);
    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        word.check = dictionary.check(word.value);
    }
    postMessage(JSON.stringify(['check', words]));
};

var word;

function delayedSuggest() {
    timeoutId = undefined;
    var suggestions = dictionary.suggest(word);
    postMessage(JSON.stringify(['suggest', suggestions]));
}

self.suggest = function(wordParam) {
    word = wordParam;
    timeoutId = setTimeout(delayedSuggest, 50);
};
