define([
    "jquery",
    "underscore",
    "classes/Extension",
    "text!html/scrollLinkSettingsBlock.html"
], function($, _, Extension, scrollLinkSettingsBlockHTML) {

    var scrollLink = new Extension("scrollLink", "Scroll Link", true, true);
    scrollLink.settingsBlock = scrollLinkSettingsBlockHTML;

    var aceEditor;
    scrollLink.onAceCreated = function(aceEditorParam) {
        aceEditor = aceEditorParam;
    };

    var sectionList;
    scrollLink.onSectionsCreated = function(sectionListParam) {
        sectionList = sectionListParam;
    };

    var offsetBegin = 0;
    scrollLink.onMarkdownTrim = function(offsetBeginParam) {
        offsetBegin = offsetBeginParam;
    };

    var $textareaElt;
    var $textareaHelperElt;
    var $previewElt;
    var mdSectionList = [];
    var htmlSectionList = [];
    var lastEditorScrollTop;
    var lastPreviewScrollTop;
    var buildSections = _.debounce(function() {

        mdSectionList = [];
        var mdTextOffset = 0;
        var mdSectionOffset = 0;
        var firstSectionOffset = offsetBegin;
        var padding = 0;
        function addTextareaSection(sectionText) {
            var sectionHeight = padding;
            if(sectionText !== undefined) {
                var textNode = document.createTextNode(sectionText);
                $textareaHelperElt.empty().append(textNode);
                sectionHeight += $textareaHelperElt.prop('scrollHeight');
            }
            var newSectionOffset = mdSectionOffset + sectionHeight;
            mdSectionList.push({
                startOffset: mdSectionOffset,
                endOffset: newSectionOffset,
                height: sectionHeight
            });
            mdSectionOffset = newSectionOffset;
        }
        if(window.lightMode) {
            // Special treatment for light mode
            $textareaHelperElt.innerWidth($textareaElt.innerWidth());
            _.each(sectionList, function(section, index) {
                var sectionText = section.text;
                if(index !== sectionList.length - 1) {
                    if(sectionText.length === 0) {
                        sectionText = undefined;
                    }
                }
                else {
                    if(/\n$/.test(sectionText)) {
                        // Need to add a line break to take into account a final empty line
                        sectionText += '\n';
                    }
                }
                addTextareaSection(sectionText);
            });

            // Apply a coef to manage divergence in some browsers
            var theoricalHeight = _.last(mdSectionList).endOffset;
            var realHeight = $textareaElt[0].scrollHeight;
            var coef = realHeight/theoricalHeight;
            mdSectionList = _.map(mdSectionList, function(mdSection) {
                return {
                    startOffset: mdSection.startOffset * coef,
                    endOffset: mdSection.endOffset * coef,
                    height: mdSection.height * coef,
                };
            });
        }
        else {
            // Everything's much simpler with ACE
            _.each(sectionList, function(section) {
                mdTextOffset += section.text.length + firstSectionOffset;
                firstSectionOffset = 0;
                var documentPosition = aceEditor.session.doc.indexToPosition(mdTextOffset);
                var screenPosition = aceEditor.session.documentToScreenPosition(documentPosition.row, documentPosition.column);
                var newSectionOffset = screenPosition.row * aceEditor.renderer.lineHeight;
                var sectionHeight = newSectionOffset - mdSectionOffset;
                mdSectionList.push({
                    startOffset: mdSectionOffset,
                    endOffset: newSectionOffset,
                    height: sectionHeight
                });
                mdSectionOffset = newSectionOffset;
            });
        }

        // Try to find corresponding sections in the preview
        htmlSectionList = [];
        var htmlSectionOffset;
        var previewScrollTop = $previewElt.scrollTop();
        $previewElt.find(".preview-content > .se-section-delimiter").each(function() {
            if(htmlSectionOffset === undefined) {
                // Force start to 0 for the first section
                htmlSectionOffset = 0;
                return;
            }
            var $delimiterElt = $(this);
            // Consider div scroll position
            var newSectionOffset = $delimiterElt.position().top + previewScrollTop;
            htmlSectionList.push({
                startOffset: htmlSectionOffset,
                endOffset: newSectionOffset,
                height: newSectionOffset - htmlSectionOffset
            });
            htmlSectionOffset = newSectionOffset;
        });
        // Last section
        var scrollHeight = $previewElt.prop('scrollHeight');
        htmlSectionList.push({
            startOffset: htmlSectionOffset,
            endOffset: scrollHeight,
            height: scrollHeight - htmlSectionOffset
        });

        // apply Scroll Link (-10 to have a gap > 9px)
        lastEditorScrollTop = -10;
        lastPreviewScrollTop = -10;
        doScrollLink();
    }, 500);

    var isScrollEditor = false;
    var isScrollPreview = false;
    var isEditorMoving = false;
    var isPreviewMoving = false;
    var scrollingHelper = $('<div>');
    var doScrollLink = _.throttle(function() {
        if(mdSectionList.length === 0 || mdSectionList.length !== htmlSectionList.length) {
            // Delay
            doScrollLink();
            return;
        }
        var editorScrollTop = window.lightMode ? $textareaElt.scrollTop() : aceEditor.renderer.getScrollTop();
        editorScrollTop < 0 && (editorScrollTop = 0);
        var previewScrollTop = $previewElt.scrollTop();
        function getDestScrollTop(srcScrollTop, srcSectionList, destSectionList) {
            // Find the section corresponding to the offset
            var sectionIndex;
            var srcSection = _.find(srcSectionList, function(section, index) {
                sectionIndex = index;
                return srcScrollTop < section.endOffset;
            });
            if(srcSection === undefined) {
                // Something wrong in the algorithm...
                return;
            }
            var posInSection = (srcScrollTop - srcSection.startOffset) / (srcSection.height || 1);
            var destSection = destSectionList[sectionIndex];
            return destSection.startOffset + destSection.height * posInSection;
        }
        var destScrollTop;
        // Perform the animation if diff > 9px
        if(isScrollEditor === true) {
            if(Math.abs(editorScrollTop - lastEditorScrollTop) <= 9) {
                return;
            }
            isScrollEditor = false;
            // Animate the preview
            lastEditorScrollTop = editorScrollTop;
            destScrollTop = getDestScrollTop(editorScrollTop, mdSectionList, htmlSectionList);
            destScrollTop = _.min([
                destScrollTop,
                $previewElt.prop('scrollHeight') - $previewElt.outerHeight()
            ]);
            if(Math.abs(destScrollTop - previewScrollTop) <= 9) {
                // Skip the animation if diff is <= 9
                lastPreviewScrollTop = previewScrollTop;
                return;
            }
            scrollingHelper.stop('scrollLinkFx', true).css('value', 0).animate({
                value: destScrollTop - previewScrollTop
            }, {
                easing: 'easeOutSine',
                duration: 200,
                queue: 'scrollLinkFx',
                step: function(now) {
                    isPreviewMoving = true;
                    lastPreviewScrollTop = previewScrollTop + now;
                    $previewElt.scrollTop(lastPreviewScrollTop);
                },
                done: function() {
                    _.defer(function() {
                        isPreviewMoving = false;
                    });
                },
            }).dequeue('scrollLinkFx');
        }
        else if(isScrollPreview === true) {
            if(Math.abs(previewScrollTop - lastPreviewScrollTop) <= 9) {
                return;
            }
            isScrollPreview = false;
            // Animate the editor
            lastPreviewScrollTop = previewScrollTop;
            destScrollTop = getDestScrollTop(previewScrollTop, htmlSectionList, mdSectionList);
            if(window.lightMode) {
                destScrollTop = _.min([
                    destScrollTop,
                    $textareaElt.prop('scrollHeight') - $textareaElt.outerHeight()
                ]);
            }
            else {
                destScrollTop = _.min([
                    destScrollTop,
                    aceEditor.session.getScreenLength() * aceEditor.renderer.lineHeight + aceEditor.renderer.scrollMargin.bottom - aceEditor.renderer.$size.scrollerHeight
                ]);
                // If negative, set it to zero
                destScrollTop < 0 && (destScrollTop = 0);
            }
            if(Math.abs(destScrollTop - editorScrollTop) <= 9) {
                // Skip the animation if diff is <= 9
                lastEditorScrollTop = editorScrollTop;
                return;
            }
            scrollingHelper.stop('scrollLinkFx', true).css('value', 0).animate({
                value: destScrollTop - editorScrollTop
            }, {
                easing: 'easeOutSine',
                duration: 200,
                queue: 'scrollLinkFx',
                step: function(now) {
                    isEditorMoving = true;
                    lastEditorScrollTop = editorScrollTop + now;
                    window.lightMode || aceEditor.session.setScrollTop(lastEditorScrollTop);
                    window.lightMode && $textareaElt.scrollTop(lastEditorScrollTop);
                },
                done: function() {
                    _.defer(function() {
                        isEditorMoving = false;
                    });
                },
            }).dequeue('scrollLinkFx');
        }
    }, 100);

    scrollLink.onLayoutResize = function() {
        isScrollEditor = true;
        buildSections();
    };

    scrollLink.onFileClosed = function() {
        mdSectionList = [];
    };

    var scrollAdjust = false;
    scrollLink.onReady = function() {
        $previewElt = $(".preview-container");
        $textareaElt = $("#wmd-input");
        // This helper is used to measure sections height in light mode
        $textareaHelperElt = $('.textarea-helper');

        $previewElt.scroll(function() {
            if(isPreviewMoving === false && scrollAdjust === false) {
                isScrollPreview = true;
                isScrollEditor = false;
                doScrollLink();
            }
            scrollAdjust = false;
        });
        var handleEditorScroll = function() {
            if(isEditorMoving === false) {
                isScrollEditor = true;
                isScrollPreview = false;
                doScrollLink();
            }
        };
        if(window.lightMode) {
            $textareaElt.scroll(handleEditorScroll);
        }
        else {
            aceEditor.session.on("changeScrollTop", handleEditorScroll);
        }
    };

    var $previewContentsElt;
    scrollLink.onPagedownConfigure = function(editor) {
        $previewContentsElt = $("#preview-contents");
        editor.getConverter().hooks.chain("postConversion", function(text) {
            // To avoid losing scrolling position before elements are fully
            // loaded
            $previewContentsElt.height($previewContentsElt.height());
            return text;
        });
    };

    scrollLink.onPreviewFinished = function() {
        // Now set the correct height
        var previousHeight = $previewContentsElt.height();
        $previewContentsElt.height("auto");
        var newHeight = $previewContentsElt.height();
        isScrollEditor = true;
        if(newHeight < previousHeight) {
            // We expect a scroll adjustment
            scrollAdjust = true;
        }
        buildSections();
    };

    return scrollLink;
});
