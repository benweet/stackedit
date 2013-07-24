define([
    "jquery",
    "underscore",
    "classes/Extension",
    "text!html/partialRenderingSettingsBlock.html",
], function($, _, Extension, partialRenderingSettingsBlockHTML) {

    var partialRendering = new Extension("partialRendering", "Partial rendering", true);
    partialRendering.settingsBlock = partialRenderingSettingsBlockHTML;

    var converter = undefined;
    var sectionIdGenerator = 0;
    var sectionList = [
        {
            text: ""
        }
    ];
    var sectionsToRemove = undefined;
    function updateSectionList(newSectionList) {

        // Find modified sections starting from left
        var leftIndex = sectionList.length;
        _.some(sectionList, function(section, index) {
            if(index >= newSectionList.length || section.text != newSectionList[index].text) {
                leftIndex = index;
                return true;
            }
        });

        // Find modified sections starting from right
        var rightIndex = -sectionList.length;
        _.some(sectionList.slice().reverse(), function(section, index) {
            if(index >= newSectionList.length || section.text != newSectionList[newSectionList.length - index - 1].text) {
                rightIndex = -index;
                return true;
            }
        });

        if(leftIndex === sectionList.length && rightIndex === -leftIndex) {
            // No modification detected...
            return;
        }

        // Create an array composed of left unmodified, modified, right
        // unmodified sections
        var leftSections = sectionList.slice(0, leftIndex);
        var modifiedSections = newSectionList.slice(leftIndex, newSectionList.length + rightIndex);
        var rightSections = sectionList.slice(sectionList.length + rightIndex, sectionList.length);
        sectionsToRemove = sectionList.slice(leftIndex, sectionList.length + rightIndex);
        sectionList = leftSections.concat(modifiedSections).concat(rightSections);
    }
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
                    newSectionList.push({
                        id: ++sectionIdGenerator,
                        text: text.substring(offset, matchOffset) + "\n" + linkDefinition
                    });
                    offset = matchOffset;
                }
            }
            return "";
        });
        // Last section
        newSectionList.push({
            id: ++sectionIdGenerator,
            text: text.substring(offset, text.length) + linkDefinition
        });

        updateSectionList(newSectionList);
    }

    var isRendering = false;
    var footnoteContainer = $('<div>');
    var footnoteContainerFirstChild = $('<div>').appendTo(footnoteContainer);
    function renderSections() {
        converter.eltList = [];
        // Remove outdated sections
        _.each(sectionsToRemove, function(section) {
            $("#wmd-preview-section-" + section.id).remove();
            footnoteContainer.find("#footnotes-section-" + section.id).remove();
        });
        var footnoteContainerElt = $("#wmd-preview-section-footnotes");
        footnoteContainerElt.empty();
        
        // Renders modified sections
        isRendering = true;
        var previousSectionElt = $("#wmd-preview");
        var previousFootnoteElt = footnoteContainerFirstChild;
        _.each(sectionList, function(section) {
            if(section.isConverted === true) {
                previousSectionElt = $("#wmd-preview-section-" + section.id);
                footnoteContainer.find("#footnotes-section-" + section.id).each(function() {
                    previousFootnoteElt = $(this);
                });
                return;
            }
            var sectionHtml = converter.makeHtml(section.text);
            var sectionElt = $('<div id="wmd-preview-section-' + section.id + '" class="preview-content">').html(sectionHtml);
            sectionElt.find("div.footnotes").each(function() {
                var footnoteElt = $(this).attr("id", "footnotes-section-" + section.id);
                previousFootnoteElt.after(footnoteElt);
                previousFootnoteElt = footnoteElt;
            });
            previousSectionElt.after(sectionElt);
            previousSectionElt = sectionElt;
            converter.eltList.push(sectionElt[0]);
            section.isConverted = true;
        });
        isRendering = false;

        // Rewrite footnotes in the footer
        if(hasFootnotes === true) {
            // Recreate a footnote list
            var footnoteElts = $("<ol>");
            footnoteContainer.find("div.footnotes > ol > li").each(function(index) {
                hasFootnotes = true;
                var elt = $(this);
                footnoteElts.append(elt.clone());
                // Restore footnotes numbers
                var refId = "#fnref\\:" + elt.attr("id").substring(3);
                $(refId).text(index + 1);
            });
            // Append the whole footnotes at the end of the document
            footnoteContainerElt.html($('<div class="footnotes">').append("<hr>").append(footnoteElts));
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
    
    partialRendering.onReady = function() {
        $("#preview-contents").append($('<div id="wmd-preview-section-footnotes" class="preview-content">'));

    };

    return partialRendering;
});