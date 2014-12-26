define([
	"jquery",
	"underscore",
	"crel",
	"utils",
	"classes/Extension",
	"mousetrap",
	"rangy",
	"text!html/findReplace.html",
	"text!html/findReplaceSettingsBlock.html"
], function($, _, crel, utils, Extension, mousetrap, rangy, findReplaceHTML, findReplaceSettingsBlockHTML) {

	var findReplace = new Extension("findReplace", 'Find and Replace', true, true);
	findReplace.settingsBlock = findReplaceSettingsBlockHTML;
	findReplace.defaultConfig = {
		findReplaceShortcut: 'mod+f'
	};

	findReplace.onLoadSettings = function() {
		utils.setInputValue("#input-find-replace-shortcut", findReplace.config.findReplaceShortcut);
	};

	findReplace.onSaveSettings = function(newConfig, event) {
		newConfig.findReplaceShortcut = utils.getInputTextValue("#input-find-replace-shortcut", event);
	};

	var editor;
	findReplace.onEditorCreated = function(editorParam) {
		editor = editorParam;
	};

	var eventMgr;
	findReplace.onEventMgrCreated = function(eventMgrParam) {
		eventMgr = eventMgrParam;
	};

	var rangeList = [];
	var offsetList = [];
	var highlightCssApplier, selectCssApplier;
	var selectRange;
	function resetHighlight() {
		resetSelect();
		rangeList.forEach(function(rangyRange) {
			try {
				highlightCssApplier.undoToRange(rangyRange);
			}
			catch(e) {
			}
		});
		rangeList = [];
	}

	function resetSelect() {
		if(selectRange) {
			try {
				selectRange && selectCssApplier.undoToRange(selectRange);
			}
			catch(e) {}
			selectRange = undefined;
		}
	}

	var contentElt;
	var $findReplaceElt, $searchForInputElt, $replaceWithInputElt;
	var foundCounterElt, $caseSensitiveElt, $regexpElt;

	var previousText = '';
	var previousCaseSensitive = false;
	var previousUseRegexp = false;
	var shown = false;
	var regex;

	function highlight(force) {
		if(!shown) {
			return;
		}
		var text = $searchForInputElt.val();
		var caseSensitive = $caseSensitiveElt.prop('checked');
		var useRegexp = $regexpElt.prop('checked');
		if(!force && text == previousText && caseSensitive == previousCaseSensitive && useRegexp == previousUseRegexp) {
			return;
		}
		previousText = text;
		previousCaseSensitive = caseSensitive;
		previousUseRegexp = useRegexp;

		resetHighlight();
		var lastOffset = {};
		var lastRange;

		function adjustOffset(offset) {
			if(offset.container === lastOffset.container) {
				// adjust the offset after rangy has modified the text node
				return {
					container: lastRange.endContainer.parentElement.nextSibling,
					offsetInContainer: offset.offsetInContainer - lastOffset.offsetInContainer,
					offset: offset.offset
				};
			}
			return offset;
		}

		offsetList = [];
		var found = 0;
		var textLength = text.length;
		if(textLength) {
			try {
				var flags = caseSensitive ? 'gm' : 'gmi';
				text = useRegexp ? text : text.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
				regex = new RegExp(text, flags);
				editor.getValue().replace(regex, function(match, offset) {
					offsetList.push({
						start: offset,
						end: offset + match.length
					});
				});
				found = offsetList.length;
				// Highly CPU consuming, so add a limit
				if(offsetList.length < 200) {
					var rangeOffsets = [];
					offsetList.forEach(function(offset) {
						rangeOffsets.push(offset.start);
						rangeOffsets.push(offset.end);
					});
					rangeOffsets = editor.selectionMgr.findOffsets(rangeOffsets);
					for(var i = 0; i < rangeOffsets.length; i += 2) {
						var offsetStart = rangeOffsets[i];
						var offsetEnd = rangeOffsets[i + 1];
						var adjustedOffsetStart = adjustOffset(offsetStart);
						var adjustedOffsetEnd = adjustOffset(offsetEnd);
						var rangyRange = rangy.createRange();
						rangyRange.setStart(adjustedOffsetStart.container, adjustedOffsetStart.offsetInContainer);
						rangyRange.setEnd(adjustedOffsetEnd.container, adjustedOffsetEnd.offsetInContainer);
						lastOffset = offsetEnd;
						lastRange = rangyRange;
						highlightCssApplier.applyToRange(rangyRange);
						rangeList[offsetStart.offset] = rangyRange;
					}
					editor.selectionMgr.hasFocus && editor.selectionMgr.updateSelectionRange();
				}
			}
			catch(e) {
			}
		}
		foundCounterElt.innerHTML = found;
	}

	function show() {
		eventMgr.onEditorPopover();
		shown = true;
		$findReplaceElt.show();
		$searchForInputElt.focus()[0].setSelectionRange(0, $searchForInputElt.val().length);
		editor.selectionMgr.adjustTop = 50;
		editor.selectionMgr.adjustBottom = 220;
		highlight(true);
	}

	function hide() {
		shown = false;
		$findReplaceElt.hide();
		resetHighlight();
		editor.selectionMgr.adjustTop = 0;
		editor.selectionMgr.adjustBottom = 0;
		editor.focus();
	}

	findReplace.onEditorPopover = function() {
		hide();
	};

	function find() {
		resetSelect();
		var position = Math.min(editor.selectionMgr.selectionStart, editor.selectionMgr.selectionEnd);
		var offset = _.find(offsetList, function(offset) {
			return offset.start > position;
		});
		if(!offset) {
			offset = _.first(offsetList);
		}
		if(!offset) {
			return;
		}
		selectRange = rangeList[offset.start];
		if(!selectRange) {
			var range = editor.selectionMgr.createRange(offset.start, offset.end);
			selectRange = rangy.createRange();
			selectRange.setStart(range.startContainer, range.startOffset);
			selectRange.setEnd(range.endContainer, range.endOffset);
		}
		selectCssApplier.applyToRange(selectRange);
		selectRange.start = offset.start;
		selectRange.end = offset.end;
		editor.selectionMgr.setSelectionStartEnd(offset.start, offset.end);
		editor.selectionMgr.updateCursorCoordinates(true);
	}

	function replace() {
		if(!selectRange) {
			return find();
		}
		var replacement = $replaceWithInputElt.val();
		editor.replace(selectRange.start, selectRange.end, replacement);
		setTimeout(function() {
			find();
			$replaceWithInputElt.focus();
		}, 1);
	}

	function replaceAll() {
		var replacement = $replaceWithInputElt.val();
		editor.replaceAll(regex, replacement);
	}

	findReplace.onContentChanged = _.bind(highlight, null, true);
	findReplace.onFileOpen = _.bind(highlight, null, true);

	findReplace.onReady = function() {
		highlightCssApplier = rangy.createCssClassApplier('find-replace-highlight', {
			normalize: false
		});
		selectCssApplier = rangy.createCssClassApplier('find-replace-select', {
			normalize: false
		});
		contentElt = document.querySelector('#wmd-input .editor-content');

		var elt = crel('div', {
			class: 'find-replace'
		});
		$findReplaceElt = $(elt).hide();
		elt.innerHTML = findReplaceHTML;
		document.querySelector('.layout-wrapper-l2').appendChild(elt);
		$('.button-find-replace-dismiss').click(function() {
			hide();
		});
		foundCounterElt = elt.querySelector('.found-counter');
		$caseSensitiveElt = $findReplaceElt.find('.checkbox-case-sensitive').change(_.bind(highlight, null, false));
		$regexpElt = $findReplaceElt.find('.checkbox-regexp').change(_.bind(highlight, null, false));
		$findReplaceElt.find('.search-button').click(find);
		$searchForInputElt = $('#input-find-replace-search-for').keyup(_.bind(highlight, null, false));
		$findReplaceElt.find('.replace-button').click(replace);
		$replaceWithInputElt = $('#input-find-replace-replace-with');
		$findReplaceElt.find('.replace-all-button').click(replaceAll);

		// Key bindings
		$().add($searchForInputElt).add($replaceWithInputElt).keydown(function(evt) {
			if(evt.which === 13) {
				// Enter key
				evt.preventDefault();
				find();
			}
		});

		mousetrap.bind(findReplace.config.findReplaceShortcut, function(e) {
			var newSearch = editor.selectionMgr.getSelectedText();
			if(newSearch) {
				$searchForInputElt.val(newSearch);
			}
			show();
			e.preventDefault();
		});
	};

	return findReplace;
});
