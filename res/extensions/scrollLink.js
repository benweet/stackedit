define([
    "jquery",
    "underscore",
    "classes/Extension",
    "text!html/scrollLinkSettingsBlock.html",
    "css_browser_selector",
    'jquery-mousewheel',
], function($, _, Extension, scrollLinkSettingsBlockHTML) {

    var scrollLink = new Extension("scrollLink", "Scroll Link", true, true);
    scrollLink.settingsBlock = scrollLinkSettingsBlockHTML;

    var aceEditor = undefined;
    scrollLink.onAceCreated = function(aceEditorParam) {
        aceEditor = aceEditorParam;
    };

    var sectionList = undefined;
    scrollLink.onSectionsCreated = function(sectionListParam) {
        sectionList = sectionListParam;
    };

    var $previewElt = undefined;
    var mdSectionList = [];
    var htmlSectionList = [];
    function pxToFloat(px) {
        return parseFloat(px.substring(0, px.length - 2));
    }
    var lastEditorScrollTop = undefined;
    var lastPreviewScrollTop = undefined;
    var buildSections = _.debounce(function() {

        mdSectionList = [];
        var mdTextOffset = 0;
        var mdSectionOffset = 0;
        _.each(sectionList, function(sectionText) {
            mdTextOffset += sectionText.length;
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

        // Try to find corresponding sections in the preview
        htmlSectionList = [];
        var htmlSectionOffset = 0;
        var previewScrollTop = $previewElt.scrollTop();
        // Each title element is a section separator
        $previewElt.find(".preview-content > .wmd-title").each(function() {
            var $titleElt = $(this);
            // Consider div scroll position and header element top margin
            var newSectionOffset = $titleElt.position().top + previewScrollTop + pxToFloat($titleElt.css('margin-top'));
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

        // apply Scroll Link (-10 to have a gap > 9 px)
        lastEditorScrollTop = -10;
        lastPreviewScrollTop = -10;
        doScrollLink();
    }, 500);

    var isScrollEditor = false;
    var isScrollPreview = false;
    var doScrollLink = _.debounce(function() {
        if(mdSectionList.length === 0 || mdSectionList.length !== htmlSectionList.length) {
            // Delay
            doScrollLink();
            return;
        }
        var editorScrollTop = aceEditor.renderer.getScrollTop();
        var previewScrollTop = $previewElt.scrollTop();
        function getDestScrollTop(srcScrollTop, srcSectionList, destSectionList) {
            // Find the section corresponding to the offset
            var sectionIndex = undefined;
            var srcSection = _.find(srcSectionList, function(section, index) {
                sectionIndex = index;
                return srcScrollTop < section.endOffset;
            });
            if(srcSection === undefined) {
                // Something wrong in the algorithm...
                return;
            }
            var posInSection = (srcScrollTop - srcSection.startOffset) / srcSection.height;
            var destSection = destSectionList[sectionIndex];
            return destSection.startOffset + destSection.height * posInSection;
        }
        // Perform the animation if diff > 9px
        if(isScrollEditor === true && Math.abs(editorScrollTop - lastEditorScrollTop) > 9) {
            isScrollEditor = false;
            // Animate the preview
            lastEditorScrollTop = editorScrollTop;
            var destScrollTop = getDestScrollTop(editorScrollTop, mdSectionList, htmlSectionList);
            destScrollTop = _.min([
                destScrollTop,
                $previewElt.prop('scrollHeight') - $previewElt.outerHeight()
            ]);
            if(Math.abs(destScrollTop - previewScrollTop) <= 9) {
                // Skip the animation if diff is <= 9
                lastPreviewScrollTop = previewScrollTop;
            }
            else {
                $previewElt.animate({
                    scrollTop: destScrollTop
                }, 'easeOutQuad', function() {
                    lastPreviewScrollTop = destScrollTop;
                });
            }
        }
        else if(isScrollPreview === true && Math.abs(previewScrollTop - lastPreviewScrollTop) > 9) {
            isScrollPreview = false;
            // Animate the editor
            lastPreviewScrollTop = previewScrollTop;
            var destScrollTop = getDestScrollTop(previewScrollTop, htmlSectionList, mdSectionList);
            destScrollTop = _.min([
                destScrollTop,
                aceEditor.session.getScreenLength() * aceEditor.renderer.lineHeight - aceEditor.renderer.$size.scrollerHeight
            ]);
            if(Math.abs(destScrollTop - editorScrollTop) <= 9) {
                // Skip the animation if diff is <= 9
                lastEditorScrollTop = editorScrollTop;
            }
            else {
                $("<div>").animate({
                    value: destScrollTop - editorScrollTop
                }, {
                    easing: 'easeOutQuad',
                    step: function(now) {
                        aceEditor.session.setScrollTop(editorScrollTop + now);
                    },
                    complete: function() {
                        lastEditorScrollTop = destScrollTop;
                    }
                });
            }
        }
    }, 500);

    scrollLink.onLayoutResize = function() {
        isScrollEditor = true;
        buildSections();
    };

    scrollLink.onFileClosed = function() {
        mdSectionList = [];
    };

    scrollLink.onReady = function() {
        $previewElt = $(".preview-container");

        $previewElt.bind("keyup mouseup mousewheel", function() {
            isScrollPreview = true;
            isScrollEditor = false;
            doScrollLink();
        });
        $('.table-of-contents').click(function() {
            isScrollPreview = true;
            isScrollEditor = false;
            doScrollLink();
        });
        aceEditor.session.on("changeScrollTop", function(e) {
            isScrollEditor = true;
            isScrollPreview = false;
            doScrollLink();
        });
    };
    
    var $previewContentsElt = undefined;
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
        $previewContentsElt.height("auto");
        isScrollEditor = true;
        buildSections();
    };

    return scrollLink;
});