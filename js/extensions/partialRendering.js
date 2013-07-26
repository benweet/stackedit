define([
    "jquery",
    "underscore",
    "classes/Extension",
    "text!html/partialRenderingSettingsBlock.html",
], function($, _, Extension, partialRenderingSettingsBlockHTML) {

    var partialRendering = new Extension("partialRendering", "Partial rendering", true);
    partialRendering.settingsBlock = partialRenderingSettingsBlockHTML;

    var converter = undefined;
    var sectionCounter = 0;
    var sectionList = [];
    var linkDefinition = "";
    var sectionsToRemove = [];
    var modifiedSections = [];
    var insertAfterSection = undefined;
    var fileChanged = true;
    function updateSectionList(newSectionList, newLinkDefinition) {
        modifiedSections = [];
        sectionsToRemove = [];
        insertAfterSection = undefined;

        // Render everything if file changed or linkDefinition changed
        if(fileChanged === true || linkDefinition != newLinkDefinition) {
            fileChanged = false;
            linkDefinition = newLinkDefinition;
            sectionsToRemove = sectionList;
            sectionList = newSectionList;
            modifiedSections = newSectionList;
            return;
        }

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
        modifiedSections = newSectionList.slice(leftIndex, newSectionList.length + rightIndex);
        var rightSections = sectionList.slice(sectionList.length + rightIndex, sectionList.length);
        insertAfterSection = _.last(leftSections);
        sectionsToRemove = sectionList.slice(leftIndex, sectionList.length + rightIndex);
        sectionList = leftSections.concat(modifiedSections).concat(rightSections);
    }
    var doFootnotes = false;
    var hasFootnotes = false;
    partialRendering.onSectionsCreated = function(sectionListParam) {

        var newSectionList = [];
        var newLinkDefinition = "";
        hasFootnotes = false;
        _.each(sectionListParam, function(text) {
            text += "\n\n";
            
            // Strip link definitions
            text = text.replace(/^```.*\n[\s\S]*?\n```|^[ ]{0,3}\[(.+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?(?=\s|$)[ \t]*\n?[ \t]*((\n*)["(](.+?)[")][ \t]*)?(?:\n+)/gm, function(wholeMatch, link) {
                if(link) {
                    newLinkDefinition += wholeMatch;
                    return "";
                }
                return wholeMatch;
            });

            // And eventually footnotes...
            if(doFootnotes) {
                text = text.replace(/^```.*\n[\s\S]*?\n```|\n[ ]{0,3}\[\^(.+?)\]\:[ \t]*\n?([\s\S]*?)\n{1,2}((?=\n[ ]{0,3}\S)|$)/g, function(wholeMatch, footnote) {
                    if(footnote) {
                        hasFootnotes = true;
                        newLinkDefinition += wholeMatch;
                        return "";
                    }
                    return wholeMatch;
                });
            }

            // Skip space only sections
            if(/\S/.test(text)) {
                // Add section to the newSectionList
                newSectionList.push({
                    id: ++sectionCounter,
                    text: text
                });
            }
        });

        updateSectionList(newSectionList, newLinkDefinition);
    };

    var footnoteContainerElt = $('<div id="wmd-preview-section-footnotes" class="preview-content">');
    var footnoteList = {};
    function refreshSections() {

        // Remove outdated sections
        _.each(sectionsToRemove, function(section) {
            $("#wmd-preview-section-" + section.id).remove();
        });

        var wmdPreviewElt = $("#wmd-preview");
        var insertAfterSectionElt = insertAfterSection === undefined ? wmdPreviewElt : $("#wmd-preview-section-" + insertAfterSection.id);
        _.each(modifiedSections, function(section) {
            var sectionElt = $('<div id="wmd-preview-section-' + section.id + '" class="wmd-preview-section preview-content">');
            _.some(wmdPreviewElt.children(), function(elt, index) {
                elt = $(elt);
                if(index !== 0 && elt.is(".wmd-title")) {
                    return true;
                }
                else if(elt.is("div.footnotes")) {
                    elt.find("ol > li").each(function() {
                        var footnoteElt = $(this).clone();
                        var id = footnoteElt.attr("id").substring(3);
                        footnoteList[id] = footnoteElt;
                    });
                    elt.remove();
                }
                else {
                    sectionElt.append(elt);
                }
            });
            insertAfterSectionElt.after(sectionElt);
            insertAfterSectionElt = sectionElt;
        });

        // Rewrite footnotes in the footer and update footnote numbers
        footnoteContainerElt.empty();
        var usedFootnoteIds = [];
        if(hasFootnotes === true) {
            var footnoteElts = $("<ol>");
            $("#preview-contents a.footnote").each(function(index) {
                var id=$(this).text(index + 1).attr("id").substring(6);
                usedFootnoteIds.push(id);
                footnoteElts.append(footnoteList[id].clone());
            });
            if(usedFootnoteIds.length > 0) {
                // Append the whole footnotes at the end of the document
                footnoteContainerElt.html($('<div class="footnotes">').append("<hr>").append(footnoteElts));
            }
            // Keep only used footnotes in our map
            footnoteList = _.pick(footnoteList, usedFootnoteIds);
        }
    }

    partialRendering.onEditorConfigure = function(editor) {
        converter = editor.getConverter();
        converter.hooks.chain("preConversion", function(text) {
            var result = _.map(modifiedSections, function(section) {
                return section.text;
            });
            result.push(linkDefinition + "\n\n");
            return result.join("");
        });
        editor.hooks.chain("onPreviewRefresh", function() {
            refreshSections();
        });
    };

    partialRendering.onPreviewFinished = function() {
        $('script[type="math/tex; mode=display"]').remove();
    };

    partialRendering.onReady = function() {
        $("#preview-contents").append(footnoteContainerElt);
        $("#wmd-preview").hide();
    };
    partialRendering.onFileClose = function() {
        fileChanged = true;
    };
    partialRendering.onFileOpen = function() {
        if(converter.extraExtensions) {
            doFootnotes = _.some(converter.extraExtensions, function(extension) {
                return extension == "footnotes";
            });
        }
    };

    return partialRendering;
});