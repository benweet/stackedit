define([
    "underscore",
    "extensions/markdownExtra",
    "extensions/mathJax",
    "classes/Extension",
], function(_, markdownExtra, mathJax, Extension) {

    var markdownSectionParser = new Extension("markdownSectionParser", "Markdown section parser");

    var eventMgr;
    markdownSectionParser.onEventMgrCreated = function(eventMgrParameter) {
        eventMgr = eventMgrParameter;
    };

    markdownSectionParser.onPagedownConfigure = function(editor) {
        
        // Build a regexp to look for section delimiters
        var regexp = '^.+[ \\t]*\\n=+[ \\t]*\\n+|^.+[ \\t]*\\n-+[ \\t]*\\n+|^\\#{1,6}[ \\t]*.+?[ \\t]*\\#*\\n+'; // Title delimiters
        if(markdownExtra.enabled) {
            if(_.some(markdownExtra.config.extensions, function(extension) {
                return extension == "fenced_code_gfm";
            })) {
                regexp = '^```.*\\n[\\s\\S]*?\\n```|' + regexp; // Fenced block delimiters
            }
        }
        if(mathJax.enabled) {
            // Math delimiter has to follow 1 empty line to be considered as a section delimiter
            regexp = '^[ \\t]*\\n\\$\\$[\\s\\S]*?\\$\\$|' + regexp; // $$ math block delimiters
            regexp = '^[ \\t]*\\n\\\\\\\\[[\\s\\S]*?\\\\\\\\]|' + regexp; // \\[ \\] math block delimiters
            regexp = '^[ \\t]*\\n\\\\?\\\\begin\\{[a-z]*\\*?\\}[\\s\\S]*?\\\\end\\{[a-z]*\\*?\\}|' + regexp; // \\begin{...} \\end{...} math block delimiters
        }
        regexp = new RegExp(regexp, 'gm');
        
        var converter = editor.getConverter();
        converter.hooks.chain("preConversion", function(text) {
            eventMgr.previewStartTime = new Date();
            var tmpText = text + "\n\n";
            function addSection(startOffset, endOffset) {
                var sectionText = tmpText.substring(offset, endOffset);
                sectionList.push({
                    text: sectionText,
                    textWithDelimiter: '\n<div class="se-section-delimiter"></div>\n\n' + sectionText + '\n'
                });
            }
            var sectionList = [], offset = 0;
            // Look for delimiters
            tmpText.replace(regexp, function(match, matchOffset) {
                // Create a new section with the text preceding the delimiter
                addSection(offset, matchOffset);
                offset = matchOffset;
            });
            // Last section
            addSection(offset, text.length);
            eventMgr.onSectionsCreated(sectionList);
            return _.reduce(sectionList, function(result, section) {
                return result + section.textWithDelimiter;
            }, '');
        });
    };

    return markdownSectionParser;
});