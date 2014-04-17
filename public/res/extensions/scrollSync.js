define([
    "jquery",
    "underscore",
    "classes/Extension",
    "text!html/scrollSyncSettingsBlock.html"
], function($, _, Extension, scrollSyncSettingsBlockHTML) {

    var scrollSync = new Extension("scrollSync", "Scroll Link", true, true);
    scrollSync.settingsBlock = scrollSyncSettingsBlockHTML;

    $.easing.easeOutSine = function( p ) {
        return Math.cos((1 - p) * Math.PI / 2 );
    };

    var sectionList;
    scrollSync.onSectionsCreated = function(sectionListParam) {
        sectionList = sectionListParam;
    };

    var isPreviewVisible = true;
    scrollSync.onPreviewToggle = function(isOpen) {
        isPreviewVisible = isOpen;
    };

    var $editorElt;
    var $previewElt;
    var mdSectionList = [];
    var htmlSectionList = [];
    var lastEditorScrollTop;
    var lastPreviewScrollTop;
    var buildSections = _.debounce(function() {
        if(!isPreviewVisible) {
            return;
        }
        mdSectionList = [];
        var mdSectionOffset;
        var scrollHeight;
        var editorScrollTop = $editorElt.scrollTop();
        $editorElt.find(".wmd-input-section").each(function() {
            if(mdSectionOffset === undefined) {
                // Force start to 0 for the first section
                mdSectionOffset = 0;
                return;
            }
            var $delimiterElt = $(this.firstChild);
            // Consider div scroll position
            var newSectionOffset = $delimiterElt.position().top + editorScrollTop;
            mdSectionList.push({
                startOffset: mdSectionOffset,
                endOffset: newSectionOffset,
                height: newSectionOffset - mdSectionOffset
            });
            mdSectionOffset = newSectionOffset;
        });
        // Last section
        scrollHeight = $editorElt.prop('scrollHeight');
        mdSectionList.push({
            startOffset: mdSectionOffset,
            endOffset: scrollHeight,
            height: scrollHeight - mdSectionOffset
        });

        // Find corresponding sections in the preview
        htmlSectionList = [];
        var htmlSectionOffset;
        var previewScrollTop = $previewElt.scrollTop();
        $previewElt.find(".wmd-preview-section").each(function() {
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
        scrollHeight = $previewElt.prop('scrollHeight');
        htmlSectionList.push({
            startOffset: htmlSectionOffset,
            endOffset: scrollHeight,
            height: scrollHeight - htmlSectionOffset
        });

        // apply Scroll Link (-10 to have a gap > 9px)
        lastEditorScrollTop = -10;
        lastPreviewScrollTop = -10;
        doScrollSync();
    }, 500);

    var isScrollEditor = false;
    var isScrollPreview = false;
    var isEditorMoving = false;
    var isPreviewMoving = false;
    var scrollingHelper = $('<div>');
    var doScrollSync = _.throttle(function() {
        if(!isPreviewVisible || mdSectionList.length === 0 || mdSectionList.length !== htmlSectionList.length) {
            return;
        }
        var editorScrollTop = $editorElt.scrollTop();
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
                // Something very bad happened
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
            scrollingHelper.stop('scrollSyncFx', true).css('value', 0).animate({
                value: destScrollTop - previewScrollTop
            }, {
                easing: 'easeOutSine',
                duration: 200,
                queue: 'scrollSyncFx',
                step: function(now) {
                    isPreviewMoving = true;
                    lastPreviewScrollTop = previewScrollTop + now;
                    $previewElt.scrollTop(lastPreviewScrollTop);
                },
                done: function() {
                    setTimeout(function() {
                        isPreviewMoving = false;
                    }, 10);
                },
            }).dequeue('scrollSyncFx');

        }
        else if(isScrollPreview === true) {
            if(Math.abs(previewScrollTop - lastPreviewScrollTop) <= 9) {
                return;
            }
            isScrollPreview = false;
            // Animate the editor
            lastPreviewScrollTop = previewScrollTop;
            destScrollTop = getDestScrollTop(previewScrollTop, htmlSectionList, mdSectionList);
            destScrollTop = _.min([
                destScrollTop,
                $editorElt.prop('scrollHeight') - $editorElt.outerHeight()
            ]);
            if(Math.abs(destScrollTop - editorScrollTop) <= 9) {
                // Skip the animation if diff is <= 9
                lastEditorScrollTop = editorScrollTop;
                return;
            }
            scrollingHelper.stop('scrollSyncFx', true).css('value', 0).animate({
                value: destScrollTop - editorScrollTop
            }, {
                easing: 'easeOutSine',
                duration: 200,
                queue: 'scrollSyncFx',
                step: function(now) {
                    isEditorMoving = true;
                    lastEditorScrollTop = editorScrollTop + now;
                    $editorElt.scrollTop(lastEditorScrollTop);
                },
                done: function() {
                    setTimeout(function() {
                        isEditorMoving = false;
                    }, 10);
                },
            }).dequeue('scrollSyncFx');
        }
    }, 100);

    scrollSync.onLayoutResize = function() {
        isScrollEditor = true;
        buildSections();
    };

    scrollSync.onFileClosed = function() {
        mdSectionList = [];
    };

    var scrollAdjust = false;
    scrollSync.onReady = function() {
        $previewElt = $(".preview-container");
        $editorElt = $("#wmd-input");

        $previewElt.scroll(function() {
            if(isPreviewMoving === false && scrollAdjust === false) {
                isScrollPreview = true;
                isScrollEditor = false;
                doScrollSync();
            }
            scrollAdjust = false;
        });
        $editorElt.scroll(function() {
            if(isEditorMoving === false) {
                isScrollEditor = true;
                isScrollPreview = false;
                doScrollSync();
            }
        });
    };

    var $previewContentsElt;
    scrollSync.onPagedownConfigure = function(editor) {
        $previewContentsElt = $("#preview-contents");
        editor.getConverter().hooks.chain("postConversion", function(text) {
            // To avoid losing scrolling position before elements are fully loaded
            $previewContentsElt.height($previewContentsElt.height());
            return text;
        });
    };

    scrollSync.onPreviewFinished = function() {
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

    return scrollSync;
});
