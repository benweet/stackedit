define([
    "jquery",
    "underscore",
    "classes/Extension",
    "text!html/scrollLinkSettingsBlock.html",
    "libs/css_browser_selector",
    "libs/jquery.mousewheel"
], function($, _, Extension, scrollLinkSettingsBlockHTML) {

    var scrollLink = new Extension("scrollLink", "Scroll Link", true, true);
    scrollLink.settingsBlock = scrollLinkSettingsBlockHTML;

    var sectionList = undefined;
    scrollLink.onSectionsCreated = function(sectionListParam) {
        sectionList = sectionListParam;
    };

    var $editorElt = undefined;
    var $previewElt = undefined;
    var $textareaElt = undefined;
    var mdSectionList = [];
    var htmlSectionList = [];
    function pxToFloat(px) {
        return parseFloat(px.substring(0, px.length - 2));
    }
    var lastEditorScrollTop = undefined;
    var lastPreviewScrollTop = undefined;
    var buildSections = _.debounce(function() {

        // Try to find Markdown sections by looking for titles
        mdSectionList = [];
        // It has to be the same width as wmd-input
        $textareaElt.width($editorElt.width());
        // Consider wmd-input top padding (will be used for 1st and last
        // section)
        var padding = pxToFloat($editorElt.css('padding-top'));
        var mdSectionOffset = 0;
        function addMdSection(sectionText) {
            var sectionHeight = padding;
            if(sectionText !== undefined) {
                $textareaElt.val(sectionText);
                sectionHeight += $textareaElt.prop('scrollHeight');
            }
            var newSectionOffset = mdSectionOffset + sectionHeight;
            mdSectionList.push({
                startOffset: mdSectionOffset,
                endOffset: newSectionOffset,
                height: sectionHeight
            });
            mdSectionOffset = newSectionOffset;
            padding = 0;
        }
        _.each(sectionList, function(sectionText, index) {
            if(index !== sectionList.length - 1) {
                if(sectionText.length === 0) {
                    sectionText = undefined;
                }
                else {
                    // Remove the last \n preceding the next title
                    sectionText = sectionText.substring(0, sectionText.length - 1);
                }
            }
            else {
                // Last section
                // Consider wmd-input bottom padding and keep last empty line
                padding += pxToFloat($editorElt.css('padding-bottom'));
            }
            addMdSection(sectionText);
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
            return;
        }
        var editorScrollTop = $editorElt.scrollTop();
        var previewScrollTop = $previewElt.scrollTop();
        function animate(srcScrollTop, srcSectionList, destElt, destSectionList, currentDestScrollTop, callback) {
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
            var destScrollTop = destSection.startOffset + destSection.height * posInSection;
            destScrollTop = _.min([
                destScrollTop,
                destElt.prop('scrollHeight') - destElt.outerHeight()
            ]);
            if(Math.abs(destScrollTop - currentDestScrollTop) <= 9) {
                // Skip the animation if diff is <= 9
                callback(currentDestScrollTop);
                return;
            }
            destElt.animate({
                scrollTop: destScrollTop
            }, 500, function() {
                callback(destScrollTop);
            });
        }
        // Perform the animation if diff > 9px
        if(isScrollEditor === true && Math.abs(editorScrollTop - lastEditorScrollTop) > 9) {
            isScrollEditor = false;
            // Animate the preview
            lastEditorScrollTop = editorScrollTop;
            animate(editorScrollTop, mdSectionList, $previewElt, htmlSectionList, previewScrollTop, function(destScrollTop) {
                lastPreviewScrollTop = destScrollTop;
            });
        }
        else if(isScrollPreview === true && Math.abs(previewScrollTop - lastPreviewScrollTop) > 9) {
            isScrollPreview = false;
            // Animate the editor
            lastPreviewScrollTop = previewScrollTop;
            animate(previewScrollTop, htmlSectionList, $editorElt, mdSectionList, editorScrollTop, function(destScrollTop) {
                lastEditorScrollTop = destScrollTop;
            });
        }
    }, 500);

    scrollLink.onLayoutConfigure = function(layoutConfig) {
        layoutConfig.onresize = function() {
            isScrollEditor = true;
            buildSections();
        };
    };

    scrollLink.onReady = function() {
        $editorElt = $("#wmd-input");
        $previewElt = $(".preview-container");
        
        // This textarea is used to measure sections height
        $textareaElt = $("#md-section-helper");
        
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
        $editorElt.bind("keyup mouseup mousewheel", function() {
            isScrollEditor = true;
            isScrollPreview = false;
            doScrollLink();
        });
    };

    var $previewContentsElt = undefined;
    scrollLink.onEditorConfigure = function(editor) {
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