define([
    "jquery",
    "underscore",
    "classes/Extension",
    "text!html/partialRenderingSettingsBlock.html",
], function($, _, Extension, partialRenderingSettingsBlockHTML) {

    var partialRendering = new Extension("partialRendering", "Partial rendering", true);
    partialRendering.settingsBlock = partialRenderingSettingsBlockHTML;

    var converter = undefined;
    var sectionList = [];
    var convertedSectionsList = [];
    var hasFootnotes = false;
    function extractSections(text) {

        text += "\n\n";

        // Strip link definitions
        var linkDefinition = "";
        text = text.replace(/^[ ]{0,3}\[(.+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?(?=\s|$)[ \t]*\n?[ \t]*((\n*)["(](.+?)[")][ \t]*)?(?:\n+)/gm, function(wholeMatch) {
            linkDefinition += wholeMatch;
            return "";
        });

        // And eventually footnotes...
        hasFootnotes = false;
        var doFootnotes = _.some(converter.extraExtensions, function(extension) {
            return extension == "footnotes";
        });
        if(doFootnotes) {
            text = text.replace(/\n[ ]{0,3}\[\^(.+?)\]\:[ \t]*\n?([\s\S]*?)\n{1,2}((?=\n[ ]{0,3}\S)|$)/g, function(wholeMatch) {
                hasFootnotes = true;
                linkDefinition += wholeMatch;
                return "";
            });
        }

        // Look for titles
        var newSectionList = [];
        var offset = 0;
        text.replace(/^```.*\n[\s\S]*?\n```|(^.+[ \t]*\n=+[ \t]*\n+|^.+[ \t]*\n-+[ \t]*\n+|^\#{1,6}[ \t]*.+?[ \t]*\#*\n+)/gm, function(match, title, matchOffset) {
            if(title) {
                // We just found a title which means end of the previous section
                if(matchOffset > offset) {
                    newSectionList.push(text.substring(offset, matchOffset) + "\n" + linkDefinition);
                    offset = matchOffset;
                }
            }
            return "";
        });
        // Last section
        newSectionList.push(text.substring(offset, text.length) + linkDefinition);

        sectionList = newSectionList;
    }

    var isRendering = false;
    function renderSections() {
        // Renders sections
        isRendering = true;
        convertedSectionsList = _.map(sectionList, converter.makeHtml);
        isRendering = false;

        $("#wmd-preview").html(convertedSectionsList.join(""));

        // Move footnotes in the footer...
        if(hasFootnotes === true) {
            // Recreate a footnote list
            var footnoteElts = $("<ol>");
            $("#wmd-preview > div.footnotes > ol > li").each(function(index) {
                hasFootnotes = true;
                var elt = $(this);
                footnoteElts.append(elt);
                // Restore footnotes numbers
                var refId = "#fnref\\:" + elt.attr("id").substring(3);
                $(refId).text(index + 1);
            });
            // Append the whole footnotes at the end of the document
            $("#wmd-preview > div.footnotes").remove();
            $("#wmd-preview").append($('<div class="footnotes">').append("<hr>").append(footnoteElts));
        }

    }

    partialRendering.onEditorConfigure = function(editor) {
        converter = editor.getConverter();
        converter.hooks.chain("preConversion", function(text) {
            if(isRendering === true) {
                return text;
            }
            extractSections(text);
            return "";
        });
        editor.hooks.chain("onPreviewRefresh", function() {
            $("#wmd-preview").html(renderSections());
        });
    };

    return partialRendering;
});