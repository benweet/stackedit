define([
    "underscore",
    "extensions/markdownExtra",
    "extensions/mathJax",
    "extensions/partialRendering",
    "classes/Extension",
    "crel",
], function(_, markdownExtra, mathJax, partialRendering, Extension, crel) {

    var markdownSectionParser = new Extension("markdownSectionParser", "Markdown section parser");

    var eventMgr;
    markdownSectionParser.onEventMgrCreated = function(eventMgrParameter) {
        eventMgr = eventMgrParameter;
    };

    var sectionList = [];
    var previewContentsElt;

    // Regexp to look for section delimiters
    var regexp = '^.+[ \\t]*\\n=+[ \\t]*\\n+|^.+[ \\t]*\\n-+[ \\t]*\\n+|^\\#{1,6}[ \\t]*.+?[ \\t]*\\#*\\n+'; // Title delimiters
    markdownSectionParser.onPagedownConfigure = function(editor) {
        if(markdownExtra.enabled) {
            if(_.some(markdownExtra.config.extensions, function(extension) {
                return extension == "fenced_code_gfm";
            })) {
                regexp = '^```[^`\\n]*\\n[\\s\\S]*?\\n```|' + regexp; // Fenced block delimiters
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
        if(!partialRendering.enabled) {
            converter.hooks.chain("preConversion", function() {
                return _.reduce(sectionList, function(result, section) {
                    return result + '\n<div class="se-preview-section-delimiter"></div>\n\n' + section.text + '\n\n';
                }, '');
            });

            editor.hooks.chain("onPreviewRefresh", function() {
                var wmdPreviewElt = document.getElementById("wmd-preview");
                var childNode = wmdPreviewElt.firstChild;
                function createSectionElt() {
                    var sectionElt = crel('div', {
                        class: 'wmd-preview-section preview-content'
                    });
                    var isNextDelimiter = false;
                    while (childNode) {
                        var nextNode = childNode.nextSibling;
                        var isDelimiter = childNode.className == 'se-preview-section-delimiter';
                        if(isNextDelimiter === true && childNode.tagName == 'DIV' && isDelimiter) {
                            // Stop when encountered the next delimiter
                            break;
                        }
                        isNextDelimiter = true;
                        isDelimiter || sectionElt.appendChild(childNode);
                        childNode = nextNode;
                    }
                    return sectionElt;
                }

                var newSectionEltList = document.createDocumentFragment();
                sectionList.forEach(function(section) {
                    newSectionEltList.appendChild(createSectionElt(section));
                });
                previewContentsElt.innerHTML = '';
                previewContentsElt.appendChild(wmdPreviewElt);
                previewContentsElt.appendChild(newSectionEltList);
            });
        }
    };

    markdownSectionParser.onReady = function() {
        previewContentsElt = document.getElementById("preview-contents");
    };

    var fileDesc;
    markdownSectionParser.onFileSelected = function(fileDescParam) {
        fileDesc = fileDescParam;
    };

    var sectionCounter = 0;
    function parseFileContent(fileDescParam, content) {
        if(fileDescParam !== fileDesc) {
            return;
        }
        var frontMatter = (fileDesc.frontMatter || {})._frontMatter || '';
        var text = content.substring(frontMatter.length);
        var tmpText = text + "\n\n";
        function addSection(startOffset, endOffset) {
            var sectionText = tmpText.substring(offset, endOffset);
            sectionList.push({
                id: ++sectionCounter,
                text: sectionText,
                textWithFrontMatter: frontMatter + sectionText
            });
            frontMatter = '';
        }
        sectionList = [];
        var offset = 0;
        // Look for delimiters
        tmpText.replace(regexp, function(match, matchOffset) {
            // Create a new section with the text preceding the delimiter
            addSection(offset, matchOffset);
            offset = matchOffset;
        });
        // Last section
        addSection(offset, text.length);
        eventMgr.onSectionsCreated(sectionList);
    }

    markdownSectionParser.onFileOpen = parseFileContent;
    markdownSectionParser.onContentChanged = parseFileContent;

    return markdownSectionParser;
});
