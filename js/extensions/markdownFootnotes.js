define([
    "underscore",
    "utils",
    "classes/Extension",
], function(_, utils, Extension) {

    var markdownFootnotes = new Extension("markdownFootnotes", "Markdown Footnotes", true);
    markdownFootnotes.settingsBlock = '<p>Adds support for Markdown footnotes.</p>';

    var inlineTags = new RegExp([
        '^(<\\/?(a|abbr|acronym|applet|area|b|basefont|',
        'bdo|big|button|cite|code|del|dfn|em|figcaption|',
        'font|i|iframe|img|input|ins|kbd|label|map|',
        'mark|meter|object|param|progress|q|ruby|rp|rt|s|',
        'samp|script|select|small|span|strike|strong|',
        'sub|sup|textarea|time|tt|u|var|wbr)[^>]*>|',
        '<(br)\\s?\\/?>)$'
    ].join(''), 'i');

    var previousPostConversion = undefined;
    markdownFootnotes.onEditorConfigure = function(editor) {
        var converter = editor.getConverter();
        previousPostConversion = converter.hooks.postConversion;
        converter.hooks.chain("postNormalization", _StripFootnoteDefinitions);
        converter.hooks.chain("postBlockGamut", _DoFootnotes);
        converter.hooks.chain("postConversion", _PrintFootnotes);
    };

    var footnotes = undefined;
    var usedFootnotes = undefined;
    function _StripFootnoteDefinitions(text) {
        footnotes = {};
        usedFootnotes = [];

        text = text.replace(/\n[ ]{0,3}\[\^(.+?)\]\:[ \t]*\n?([\s\S]*?)\n{1,2}((?=\n[ ]{0,3}\S)|\Z)/g, function(wholeMatch, m1, m2) {
            m1 = utils.slugify(m1);
            m2 += "\n";
            m2 = m2.replace(/^[ ]{0,3}/g, "");
            footnotes[m1] = m2;
            return "\n";
        });

        return text;
    }

    var blockGamutHookCallback = undefined;
    function _DoFootnotes(text, blockGamutHookCallbackParam) {
        blockGamutHookCallback = blockGamutHookCallbackParam;
        var footnoteCounter = 0;
        text = text.replace(/\[\^(.+?)\]/g, function(wholeMatch, m1) {
            var id = utils.slugify(m1);
            var footnote = footnotes[id];
            if(footnote === undefined) {
                return "";
            }
            footnoteCounter++;
            usedFootnotes.push(id);
            return '<a href="#fn:' + id + '" id="fnref:' + id + '" title="See footnote" class="footnote">' + footnoteCounter + '</a>';
        });

        return text;
    }

    function _PrintFootnotes(text) {
        if(usedFootnotes.length === 0) {
            return text;
        }

        _.each(footnotes, function(footnote, id) {
            var formattedfootnote = blockGamutHookCallback(footnote);
            formattedfootnote = unescapeSpecialChars(formattedfootnote);
            formattedfootnote = formattedfootnote.replace(/~D/g, "$$").replace(/~T/g, "~");
            formattedfootnote = previousPostConversion(formattedfootnote);
            formattedfootnote = formattedfootnote.replace(/<[^>]*>?/gi, function(tag) {
                return tag.match(inlineTags) ? tag : '';
            });
            footnotes[id] = formattedfootnote;
        });

        text += '\n\n<div class="footnotes">\n<hr>\n<ol>\n\n';
        _.each(usedFootnotes, function(id) {
            var footnote = footnotes[id];
            text += '<li id="fn:' + id + '">' + footnote + ' <a href="#fnref:' + id + '" title="Return to article" class="reversefootnote">&#8617;</a></li>\n\n';
        });
        text += '</ol>\n</div>';
        return text;
    }

    // Duplicated from PageDown converter
    function unescapeSpecialChars(text) {
        // Swap back in all the special characters we've hidden.
        text = text.replace(/~E(\d+)E/g, function(wholeMatch, m1) {
            var charCodeToReplace = parseInt(m1);
            return String.fromCharCode(charCodeToReplace);
        });
        return text;
    }

    return markdownFootnotes;
});