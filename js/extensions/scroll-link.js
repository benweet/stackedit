define( [ "jquery", "underscore" ], function($) {
	
	var scrollLink = {
		extensionId: "scrollLink",
		extensionName: "Scroll Link",
        optional: true,
		settingsBloc: [
		               	'<p>Binds together editor and preview scrollbars.</p>',
		               	'<blockquote class="muted"><b>NOTE:</b> ',
		               	'The mapping between Markdown and HTML is based on the position of the title elements (h1, h2, ...) in the page. ',
				        'Therefore, if your document does not contain any title, the mapping will be linear and consequently less accurate.',
		               	'</bloquote>'
		              ].join("")
	};
	
	var mdSectionList = [];
	var htmlSectionList = [];
	function pxToFloat(px) {
		return parseFloat(px.substring(0, px.length-2));
	}
	var buildSections = _.debounce(function() {
		
		// Try to find Markdown sections by looking for titles
		var editorElt = $("#wmd-input");
		mdSectionList = [];
		// This textarea is used to measure sections height
		var textareaElt = $("#md-section-helper");
		// It has to be the same width than wmd-input
		textareaElt.width(editorElt.width());
		// Consider wmd-input top padding
		var padding = pxToFloat(editorElt.css('padding-top'));
		var offset = 0, mdSectionOffset = 0;
		function addMdSection(sectionText) {
			var sectionHeight = padding;
			if(sectionText !== undefined) {
				textareaElt.val(sectionText);
				sectionHeight += textareaElt.prop('scrollHeight');
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
		// Create MD sections by finding title patterns (excluding gfm blocs)
		var text = editorElt.val() + "\n\n";
		text.replace(/^```.*\n[\s\S]*?\n```|(^.+[ \t]*\n=+[ \t]*\n+|^.+[ \t]*\n-+[ \t]*\n+|^\#{1,6}[ \t]*.+?[ \t]*\#*\n+)/gm,
			function(match, title, matchOffset) {
				if(title) {
					// We just found a title which means end of the previous section
					// Exclude last \n of the section
					var sectionText = undefined;
					if(matchOffset > offset) {
						sectionText = text.substring(offset, matchOffset-1);
					}
					addMdSection(sectionText);
					offset = matchOffset;
				}
				return "";
			}
		);
		// Last section
		// Consider wmd-input bottom padding and exclude \n\n previously added
		padding += pxToFloat(editorElt.css('padding-bottom'));
		addMdSection(text.substring(offset, text.length-2));
		
		// Try to find corresponding sections in the preview
		var previewElt = $("#wmd-preview");
		htmlSectionList = [];
		var htmlSectionOffset = 0;
		var previewScrollTop = previewElt.scrollTop();
		// Each title element is a section separator
		previewElt.children("h1,h2,h3,h4,h5,h6").each(function() {
			// Consider div scroll position and header element top margin
			var newSectionOffset = $(this).position().top + previewScrollTop + pxToFloat($(this).css('margin-top'));
			htmlSectionList.push({
				startOffset: htmlSectionOffset,
				endOffset: newSectionOffset,
				height: newSectionOffset - htmlSectionOffset
			});
			htmlSectionOffset = newSectionOffset; 
		});
		// Last section
		var scrollHeight = previewElt.prop('scrollHeight');
		htmlSectionList.push({
			startOffset: htmlSectionOffset,
			endOffset: scrollHeight,
			height: scrollHeight - htmlSectionOffset
		});
		
		// apply Scroll Link 
		lastEditorScrollTop = -9;
		skipScrollLink = false;
		isScrollPreview = false;
		runScrollLink();
	}, 500);
	
	// -9 is less than -5
	var lastEditorScrollTop = -9;
	var lastPreviewScrollTop = -9;
	var skipScrollLink = false;
	var isScrollPreview = false;
	var runScrollLink = _.debounce(function() {
		if(skipScrollLink === true || mdSectionList.length === 0 || mdSectionList.length !== htmlSectionList.length) {
			return;
		}
		var editorElt = $("#wmd-input");
		var editorScrollTop = editorElt.scrollTop();
		var previewElt = $("#wmd-preview");
		var previewScrollTop = previewElt.scrollTop();
		function animate(srcScrollTop, srcSectionList, destElt, destSectionList, lastDestScrollTop, callback) {
			// Find the section corresponding to the offset
			var sectionIndex = undefined;
			var srcSection = _.find(srcSectionList, function(section, index) {
				sectionIndex = index; 
				return srcScrollTop < section.endOffset;
			});
			if(srcSection === undefined) {
				// Something wrong in the algorithm...
				return -9;
			}
			var posInSection = (srcScrollTop - srcSection.startOffset) / srcSection.height;
			var destSection = destSectionList[sectionIndex];
			var destScrollTop = destSection.startOffset + destSection.height * posInSection;
			destScrollTop = _.min([destScrollTop, destElt.prop('scrollHeight') - destElt.outerHeight()]);
			if(Math.abs(destScrollTop - lastDestScrollTop) < 5) {
				// Skip the animation in case it's not necessary
				return;
			}
			destElt.animate({scrollTop: destScrollTop}, 600, function() {
				callback(destScrollTop);
			});
		}
		// Perform the animation if diff > 5px
		if(isScrollPreview === false && Math.abs(editorScrollTop - lastEditorScrollTop) > 5) {
			// Animate the preview
			lastEditorScrollTop = editorScrollTop;
			animate(editorScrollTop, mdSectionList, previewElt, htmlSectionList, lastPreviewScrollTop, function(destScrollTop) {
				lastPreviewScrollTop = destScrollTop;
			});
		}
		else if(Math.abs(previewScrollTop - lastPreviewScrollTop) > 5) {
			// Animate the editor
			lastPreviewScrollTop = previewScrollTop;
			animate(previewScrollTop, htmlSectionList, editorElt, mdSectionList, lastEditorScrollTop, function(destScrollTop) {
				lastEditorScrollTop = destScrollTop;
			});
		}
	}, 600);

	scrollLink.onLayoutConfigure = function(layoutConfig) {
		layoutConfig.onresize = buildSections;
	};
	
	scrollLink.onLayoutCreated = function() {
		$("#wmd-preview").scroll(function() {
			isScrollPreview = true;
			runScrollLink();
		});
		$("#wmd-input").scroll(function() {
			isScrollPreview = false;
			runScrollLink();
		});
	};
	
	scrollLink.onEditorConfigure = function(editor) {
		skipScrollLink = true;
		lastPreviewScrollTop = 0;
		editor.hooks.chain("onPreviewRefresh", function() {
			skipScrollLink = true;
		});
	};
	
	scrollLink.onPreviewFinished = function() {
		// MathJax may have change the scrolling position. Restore it.
		if(lastPreviewScrollTop >= 0) {
			$("#wmd-preview").scrollTop(lastPreviewScrollTop);
		}
		_.defer(function() {
			// Modify scroll position of the preview not the editor
			lastEditorScrollTop = -9;
			buildSections();
			// Preview may change if images are loading
			$("#wmd-preview img").load(function() {
				lastEditorScrollTop = -9;
				buildSections();
			});
		});
	};
	
	return scrollLink;
});