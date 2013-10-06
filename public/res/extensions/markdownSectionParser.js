define([
    "classes/Extension"
], function(Extension) {

    var markdownSectionParser = new Extension("markdownSectionParser", "Markdown section parser");

    var eventMgr = undefined;
    markdownSectionParser.onEventMgrCreated = function(eventMgrParameter) {
        eventMgr = eventMgrParameter;
    };

    markdownSectionParser.onPagedownConfigure = function(editor) {
        var converter = editor.getConverter();
        converter.hooks.chain("preConversion", function(text) {
            eventMgr.previewStartTime = new Date();
            var tmpText = text + "\n\n";
            var sectionList = [], offset = 0;
            // Look for titles (excluding gfm blocs)
            tmpText.replace(/^```.*\n[\s\S]*?\n```|(^.+[ \t]*\n=+[ \t]*\n+|^.+[ \t]*\n-+[ \t]*\n+|^\#{1,6}[ \t]*.+?[ \t]*\#*\n+)/gm, function(match, title, matchOffset) {
                if(title) {
                    // We just found a title which means end of the previous
                    // section
                    // Exclude last \n of the section
                    sectionList.push(tmpText.substring(offset, matchOffset));
                    offset = matchOffset;
                }
                return "";
            });
            // Last section
            sectionList.push(tmpText.substring(offset, text.length));
            eventMgr.onSectionsCreated(sectionList);
            return text;
        });
    };

    return markdownSectionParser;
});