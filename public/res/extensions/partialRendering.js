define([
    "underscore",
    "crel",
    "extensions/markdownExtra",
    "classes/Extension",
    "text!html/partialRenderingSettingsBlock.html",
], function(_, crel, markdownExtra, Extension, partialRenderingSettingsBlockHTML) {

    var partialRendering = new Extension("partialRendering", "Partial Rendering", true);
    partialRendering.settingsBlock = partialRenderingSettingsBlockHTML;

    var converter;
    var sectionCounter = 0;
    var sectionList = [];
    var linkDefinition;
    var sectionsToRemove = [];
    var modifiedSections = [];
    var insertBeforeSection;
    var fileChanged = false;
    function updateSectionList(newSectionList, newLinkDefinition) {
        modifiedSections = [];
        sectionsToRemove = [];
        insertBeforeSection = undefined;

        // Render everything if file or linkDefinition changed
        if(fileChanged === true || linkDefinition != newLinkDefinition) {
            fileChanged = false;
            linkDefinition = newLinkDefinition;
            sectionsToRemove = sectionList;
            sectionList = newSectionList;
            modifiedSections = newSectionList;
            return;
        }

        // Find modified section starting from top
        var leftIndex = sectionList.length;
        _.some(sectionList, function(section, index) {
            if(index >= newSectionList.length || section.text != newSectionList[index].text) {
                leftIndex = index;
                return true;
            }
        });
        
        // Find modified section starting from bottom
        var rightIndex = -sectionList.length;
        _.some(sectionList.slice().reverse(), function(section, index) {
            if(index >= newSectionList.length || section.text != newSectionList[newSectionList.length - index - 1].text) {
                rightIndex = -index;
                return true;
            }
        });
        
        if(leftIndex - rightIndex > sectionList.length) {
            // Prevent overlap
            rightIndex = leftIndex - sectionList.length;
        }

        // Create an array composed of left unmodified, modified, right
        // unmodified sections
        var leftSections = sectionList.slice(0, leftIndex);
        modifiedSections = newSectionList.slice(leftIndex, newSectionList.length + rightIndex);
        var rightSections = sectionList.slice(sectionList.length + rightIndex, sectionList.length);
        insertBeforeSection = _.first(rightSections);
        sectionsToRemove = sectionList.slice(leftIndex, sectionList.length + rightIndex);
        sectionList = leftSections.concat(modifiedSections).concat(rightSections);
    }
    
    var doFootnotes = false;
    var hasFootnotes = false;
    partialRendering.onSectionsCreated = function(sectionListParam) {

        var newSectionList = [];
        var newLinkDefinition = '\n';
        hasFootnotes = false;
        _.each(sectionListParam, function(section) {
            var text = section.textWithDelimiter + '\n';

            // Strip footnotes
            if(doFootnotes) {
                text = text.replace(/^```.*\n[\s\S]*?\n```|\n[ ]{0,3}\[\^(.+?)\]\:[ \t]*\n?([\s\S]*?)\n{1,2}((?=\n[ ]{0,3}\S)|$)/gm, function(wholeMatch, footnote) {
                    if(footnote) {
                        hasFootnotes = true;
                        newLinkDefinition += wholeMatch.replace(/^\s*\n/gm, '') + '\n';
                        return "";
                    }
                    return wholeMatch;
                });
            }

            // Strip link definitions
            text = text.replace(/^```.*\n[\s\S]*?\n```|^[ ]{0,3}\[(.+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?(?=\s|$)[ \t]*\n?[ \t]*((\n*)["(](.+?)[")][ \t]*)?(?:\n+)/gm, function(wholeMatch, link) {
                if(link) {
                    newLinkDefinition += wholeMatch.replace(/^\s*\n/gm, '') + '\n';
                    return "";
                }
                return wholeMatch;
            });

            // Add section to the newSectionList
            newSectionList.push({
                id: ++sectionCounter,
                text: text + '\n'
            });
        });

        updateSectionList(newSectionList, newLinkDefinition);
    };

    var footnoteMap = {};
    // Store one footnote elt in the footnote map
    function storeFootnote(footnoteElt) {
        var id = footnoteElt.id.substring(3);
        footnoteMap[id] = footnoteElt;
    }
    
    var footnoteContainerElt;
    var previewContentsElt;
    function refreshSections() {

        // Remove outdated sections
        _.each(sectionsToRemove, function(section) {
            var sectionElt = document.getElementById("wmd-preview-section-" + section.id);
            previewContentsElt.removeChild(sectionElt);
        });
        
        var wmdPreviewElt = document.getElementById("wmd-preview");
        var childNode = wmdPreviewElt.firstChild;
        function createSectionElt(section) {
            var sectionElt = crel('div', {
                id: 'wmd-preview-section-' + section.id,
                class: 'wmd-preview-section preview-content'
            });
            var isNextDelimiter = false;
            while (childNode) {
                var nextNode = childNode.nextSibling;
                if(isNextDelimiter === true && childNode.tagName == 'DIV' && childNode.className == 'se-section-delimiter') {
                    // Stop when encountered the next delimiter
                    break;
                }
                isNextDelimiter = true;
                if(childNode.tagName == 'DIV' && childNode.className == 'footnotes') {
                    _.each(childNode.querySelectorAll("ol > li"), storeFootnote);
                }
                else {
                    sectionElt.appendChild(childNode);
                }
                childNode = nextNode;
            }
            return sectionElt;
        }

        var newSectionEltList = document.createDocumentFragment();
        _.each(modifiedSections, function(section) {
            newSectionEltList.appendChild(createSectionElt(section));
        });
        wmdPreviewElt.innerHTML = '';
        var insertBeforeElt = footnoteContainerElt;
        if(insertBeforeSection !== undefined) {
            insertBeforeElt = document.getElementById("wmd-preview-section-" + insertBeforeSection.id);
        }
        previewContentsElt.insertBefore(newSectionEltList, insertBeforeElt);

        // Rewrite footnotes in the footer and update footnote numbers
        footnoteContainerElt.innerHTML = '';
        var usedFootnoteIds = [];
        if(hasFootnotes === true) {
            var footnoteElts = crel('ol');
            _.each(previewContentsElt.querySelectorAll('a.footnote'), function(elt, index) {
                elt.textContent = index + 1;
                var id = elt.id.substring(6);
                usedFootnoteIds.push(id);
                footnoteElts.appendChild(footnoteMap[id].cloneNode(true));
            });
            if(usedFootnoteIds.length > 0) {
                // Append the whole footnotes at the end of the document
                footnoteContainerElt.appendChild(crel('div', {
                    class: 'footnotes'
                }, crel('hr'), footnoteElts));
            }
            // Keep used footnotes only in our map
            footnoteMap = _.pick(footnoteMap, usedFootnoteIds);
        }
    }

    partialRendering.onPagedownConfigure = function(editor) {
        converter = editor.getConverter();
        converter.hooks.chain("preConversion", function() {
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

    partialRendering.onInit = function() {
        if(markdownExtra.enabled) {
            if(_.some(markdownExtra.config.extensions, function(extension) {
                return extension == "footnotes";
            })) {
                doFootnotes = true;
            }
        }
    };
    
    partialRendering.onReady = function() {
        footnoteContainerElt = crel('div', {
            id: 'wmd-preview-section-footnotes',
            class: 'preview-content'
        });
        previewContentsElt = document.getElementById("preview-contents");
        previewContentsElt.appendChild(footnoteContainerElt);
    };

    partialRendering.onFileSelected = function() {
        fileChanged = true;
    };

    return partialRendering;
});