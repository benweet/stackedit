define([
	"jquery",
	"underscore",
	"classes/Extension",
	"text!html/scrollSyncSettingsBlock.html"
], function($, _, Extension, scrollSyncSettingsBlockHTML) {

	var scrollSync = new Extension("scrollSync", "Scroll Sync", true, true);
	scrollSync.settingsBlock = scrollSyncSettingsBlockHTML;

	var sectionList;
	scrollSync.onSectionsCreated = function(sectionListParam) {
		sectionList = sectionListParam;
	};

	var editorElt;
	var previewElt;
	var mdSectionList = [];
	var htmlSectionList = [];
	var lastEditorScrollTop;
	var lastPreviewScrollTop;
	var buildSections = _.debounce(function() {
		mdSectionList = [];
		var mdSectionOffset;
		var scrollHeight;
		_.each(editorElt.querySelectorAll(".wmd-input-section"), function(delimiterElt) {
			if(mdSectionOffset === undefined) {
				// Force start to 0 for the first section
				mdSectionOffset = 0;
				return;
			}
			delimiterElt = delimiterElt.firstChild;
			// Consider div scroll position
			var newSectionOffset = delimiterElt.offsetTop;
			mdSectionList.push({
				startOffset: mdSectionOffset,
				endOffset: newSectionOffset,
				height: newSectionOffset - mdSectionOffset
			});
			mdSectionOffset = newSectionOffset;
		});
		// Last section
		scrollHeight = editorElt.scrollHeight;
		mdSectionList.push({
			startOffset: mdSectionOffset,
			endOffset: scrollHeight,
			height: scrollHeight - mdSectionOffset
		});

		// Find corresponding sections in the preview
		htmlSectionList = [];
		var htmlSectionOffset;
		_.each(previewElt.querySelectorAll(".wmd-preview-section"), function(delimiterElt) {
			if(htmlSectionOffset === undefined) {
				// Force start to 0 for the first section
				htmlSectionOffset = 0;
				return;
			}
			// Consider div scroll position
			var newSectionOffset = delimiterElt.offsetTop;
			htmlSectionList.push({
				startOffset: htmlSectionOffset,
				endOffset: newSectionOffset,
				height: newSectionOffset - htmlSectionOffset
			});
			htmlSectionOffset = newSectionOffset;
		});
		// Last section
		scrollHeight = previewElt.scrollHeight;
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

	var isPreviewVisible = true;
	var isScrollEditor = false;
	var isScrollPreview = false;
	var isEditorMoving = false;
	var isPreviewMoving = false;

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

	var timeoutId;
	var currentEndCb;

	function animate(elt, startValue, endValue, stepCb, endCb) {
		if(currentEndCb) {
			clearTimeout(timeoutId);
			currentEndCb();
		}
		currentEndCb = endCb;
		var diff = endValue - startValue;
		var startTime = Date.now();

		function tick() {
			var currentTime = Date.now();
			var progress = (currentTime - startTime) / 200;
			if(progress < 1) {
				var scrollTop = startValue + diff * Math.cos((1 - progress) * Math.PI / 2);
				elt.scrollTop = scrollTop;
				stepCb(scrollTop);
				timeoutId = setTimeout(tick, 1);
			}
			else {
				currentEndCb = undefined;
				elt.scrollTop = endValue;
				setTimeout(endCb, 100);
			}
		}

		tick();
	}

	var doScrollSync = _.throttle(function() {
		if(!isPreviewVisible || mdSectionList.length === 0 || mdSectionList.length !== htmlSectionList.length) {
			return;
		}
		var editorScrollTop = editorElt.scrollTop;
		editorScrollTop < 0 && (editorScrollTop = 0);
		var previewScrollTop = previewElt.scrollTop;
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
				previewElt.scrollHeight - previewElt.offsetHeight
			]);
			if(Math.abs(destScrollTop - previewScrollTop) <= 9) {
				// Skip the animation if diff is <= 9
				lastPreviewScrollTop = previewScrollTop;
				return;
			}
			animate(previewElt, previewScrollTop, destScrollTop, function(currentScrollTop) {
				isPreviewMoving = true;
				lastPreviewScrollTop = currentScrollTop;
			}, function() {
				isPreviewMoving = false;
			});
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
				editorElt.scrollHeight - editorElt.offsetHeight
			]);
			if(Math.abs(destScrollTop - editorScrollTop) <= 9) {
				// Skip the animation if diff is <= 9
				lastEditorScrollTop = editorScrollTop;
				return;
			}
			animate(editorElt, editorScrollTop, destScrollTop, function(currentScrollTop) {
				isEditorMoving = true;
				lastEditorScrollTop = currentScrollTop;
			}, function() {
				isEditorMoving = false;
			});
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
		previewElt = document.querySelector(".preview-container");
		editorElt = document.querySelector("#wmd-input");

		$(previewElt).scroll(function() {
			if(isPreviewMoving === false && scrollAdjust === false) {
				isScrollPreview = true;
				isScrollEditor = false;
				doScrollSync();
			}
			scrollAdjust = false;
		});
		$(editorElt).scroll(function() {
			if(isEditorMoving === false) {
				isScrollEditor = true;
				isScrollPreview = false;
				doScrollSync();
			}
		});

		$(".preview-panel").on('hide.layout.toggle', function() {
			isPreviewVisible = false;
		}).on('shown.layout.toggle', function() {
			isPreviewVisible = true;
		});

		// Reimplement anchor scrolling to work without preview
		$('.extension-preview-buttons .table-of-contents').on('click', 'a', function(evt) {
			evt.preventDefault();
			var id = this.hash;
			var anchorElt = $(id);
			if(!anchorElt.length) {
				return;
			}
			var previewScrollTop = anchorElt[0].getBoundingClientRect().top - previewElt.getBoundingClientRect().top + previewElt.scrollTop;
			previewElt.scrollTop = previewScrollTop;
			var editorScrollTop = getDestScrollTop(previewScrollTop, htmlSectionList, mdSectionList);
			editorElt.scrollTop = editorScrollTop;
		});
	};

	var previewContentsElt;
	var previousHeight;
	scrollSync.onPagedownConfigure = function(editor) {
		previewContentsElt = document.getElementById("preview-contents");
		editor.getConverter().hooks.chain("postConversion", function(text) {
			// To avoid losing scrolling position before elements are fully loaded
			previousHeight = previewContentsElt.offsetHeight;
			previewContentsElt.style.height = previousHeight + 'px';
			return text;
		});
	};

	scrollSync.onPreviewFinished = function() {
		// Now set the correct height
		previewContentsElt.style.removeProperty('height');
		var newHeight = previewContentsElt.offsetHeight;
		isScrollEditor = true;
		if(newHeight < previousHeight) {
			// We expect a scroll adjustment
			scrollAdjust = true;
		}
		buildSections();
	};

	return scrollSync;
});
