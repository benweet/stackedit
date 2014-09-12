define([
	'jquery',
	'underscore',
	'utils',
	'constants',
	'settings',
	'eventMgr',
	'crel',
	'mousetrap',
	'hammerjs'
], function($, _, utils, constants, settings, eventMgr, crel, mousetrap, hammer) {
	var layout = {};

	var resizerSize = 32;
	var togglerSize = 60;
	var navbarHeight = 50;
	var editorMinSize = {
		width: 250,
		height: 140
	};
	var previewMinSize = {
		width: 330,
		height: 160
	};
	var menuPanelWidth = 280;
	var documentPanelWidth = 320;
	var titleMinWidth = 200;
	var previewButtonsClosedOffset = 18;
	var previewButtonsDropdownMargin = 130;
	var previewButtonsOffset = {
		x: -45,
		y: -6
	};
	var windowSize;

	var wrapperL1, wrapperL2, wrapperL3;
	var navbar, menuPanel, documentPanel, editor, previewPanel, previewContainer, navbarToggler, previewToggler, previewResizer, previewButtons;

	var animate = false;

	function startAnimation() {
		animate = true;
		wrapperL1.$elt.addClass('layout-animate');
	}

	function endAnimation() {
		animate = false;
		wrapperL1.$elt.removeClass('layout-animate');
	}

	function DomObject(selector) {
		this.selector = selector;
		this.elt = document.querySelector(selector);
		this.$elt = $(this.elt);
	}

	var transitionEndTimeoutId;
	var transitionEndCallbacks = [];

	function onTransitionEnd(evt) {
		if(!evt ||
			evt.target === wrapperL1.elt ||
			evt.target === wrapperL2.elt ||
			evt.target === previewPanel.elt
			) {
			transitionEndCallbacks.forEach(function(callback) {
				callback();
			});
			endAnimation();
			transitionEndCallbacks.length !== 0 && onResize();
			transitionEndCallbacks = [];
		}
	}

	DomObject.prototype.applyCss = function() {

		// Top/left/Bottom/Right
		this.top !== undefined && (this.elt.style.top = this.top + 'px');
		this.left !== undefined && (this.elt.style.left = this.left + 'px');
		this.bottom !== undefined && (this.elt.style.bottom = this.bottom + 'px');
		this.right !== undefined && (this.elt.style.right = this.right + 'px');

		// Translate
		if(this.x !== undefined || this.y !== undefined) {
			this.x = this.x || 0;
			this.y = this.y || 0;
			this.elt.style['-webkit-transform'] = 'translate(' + this.x + 'px, ' + this.y + 'px)';
			this.elt.style['-ms-transform'] = 'translate(' + this.x + 'px, ' + this.y + 'px)';
			this.elt.style.transform = 'translate(' + this.x + 'px, ' + this.y + 'px)';
		}

		// Width (deferred when animate if new width is smaller)
		if(animate && this.width < this.oldWidth) {
			transitionEndCallbacks.push(_.bind(function() {
				this.elt.style.width = this.width + 'px';
			}, this));
		}
		else {
			this.width !== undefined && (this.elt.style.width = this.width + 'px');
		}
		this.oldWidth = this.width;

		// Height (deferred when animate if new height is smaller)
		if(animate && this.height < this.oldHeight) {
			transitionEndCallbacks.push(_.bind(function() {
				this.elt.style.height = this.height + 'px';
			}, this));
		}
		else {
			this.height !== undefined && (this.elt.style.height = this.height + 'px');
		}
		this.oldHeight = this.height;

		// Just in case transitionEnd event doesn't happen
		clearTimeout(transitionEndTimeoutId);
		animate && (transitionEndTimeoutId = setTimeout(onTransitionEnd, 800));
	};

	DomObject.prototype.createToggler = function(backdrop) {
		var $backdropElt;
		var pushedEvents = 0;
		this.toggle = function(show) {
			if(show === this.isOpen) {
				return;
			}
			this.isOpen = _.isBoolean(show) ? show : !this.isOpen;
			if(this.isOpen) {
				this.isShown = true;
				this.$elt.addClass('panel-open').trigger('show.layout.toggle');
				if(backdrop) {
					$backdropElt = $(utils.createBackdrop(wrapperL1.elt)).on('click.backdrop', _.bind(function() {
						this.toggle(false);
					}, this));
					this.$elt.addClass('bring-to-front');
				}
				transitionEndCallbacks.push(_.bind(function() {
					if(--pushedEvents === 0) {
						if(this.isOpen) {
							this.$elt.trigger('shown.layout.toggle');
						}
					}
				}, this));
			}
			else {
				this.$elt.trigger('hide.layout.toggle');
				if($backdropElt) {
					$backdropElt.off('click.backdrop');
					$backdropElt[0].removeBackdrop();
					$backdropElt = undefined;
				}
				transitionEndCallbacks.push(_.bind(function() {
					if(--pushedEvents === 0) {
						if(!this.isOpen) {
							this.isShown = false;
							this.$elt.removeClass('panel-open bring-to-front').trigger('hidden.layout.toggle');
						}
					}
				}, this));
			}
			pushedEvents++;
			startAnimation();
			resizeAll();
		};
	};
	DomObject.prototype.initHammer = function(drag) {
		this.hammer = hammer(this.elt, {
			drag: drag ? true : false,
			drag_max_touches: 0,
			gesture: false,
			hold: false,
			release: false,
			swipe: drag ? false : true,
			tap: false,
			touch: false,
			transform: false
		});
	};

	var maxWidthMap = [
		{ screenWidth: 0, maxWidth: 600 * settings.maxWidthRatio },
		{ screenWidth: 1000, maxWidth: 700 * settings.maxWidthRatio },
		{ screenWidth: 1200, maxWidth: 800 * settings.maxWidthRatio },
		{ screenWidth: 1400, maxWidth: 900 * settings.maxWidthRatio }
	];
	var maxWidthMapReversed = maxWidthMap.slice(0).reverse();

	function getMaxWidth() {
		return _.find(maxWidthMapReversed, function(value) {
			return windowSize.width > value.screenWidth;
		}).maxWidth;
	}

	var editorContentElt;
	var previewContentElt;
	var editorMarginElt;
	var navbarInnerElt;
	var navbarDropdownElt;
	var $navbarDropdownBtnElt;
	var navbarTitleContainerElt;
	var $navbarTitleElt;
	var navbarBtnGroups = [];
	var navbarBtnGroupsWidth = [
		80,
		80,
		160,
		160,
		80,
		40
	].map(function(width) {
			return width + 18; // Add margin
		});
	var navbarMarginWidth = 18 * 2 + 25 + 25;
	var buttonsDropdownWidth = 40;
	var viewerButtonGroupWidth = 100;
	var workingIndicatorWidth = 18 + 70;

	function onResize() {
		var paddingBottom = wrapperL3.height - 60;

		var editorPadding = (editor.elt.offsetWidth - getMaxWidth()) / 2;
		if(editorPadding < constants.EDITOR_DEFAULT_PADDING) {
			editorPadding = constants.EDITOR_DEFAULT_PADDING;
		}
		editorContentElt.style.paddingLeft = editorPadding + 'px';
		editorContentElt.style.paddingRight = editorPadding + 'px';
		editorContentElt.style.paddingBottom = paddingBottom + 'px';
		editorMarginElt.style.width = editorPadding + 'px';

		var previewPadding = (previewContainer.elt.offsetWidth - getMaxWidth()) / 2;
		if(previewPadding < constants.EDITOR_DEFAULT_PADDING) {
			previewPadding = constants.EDITOR_DEFAULT_PADDING;
		}
		previewContentElt.style.paddingLeft = previewPadding + 'px';
		previewContentElt.style.paddingRight = previewPadding + 'px';
		previewContentElt.style.paddingBottom = paddingBottom + 'px';

		var maxWidth = navbarMarginWidth + workingIndicatorWidth + titleMinWidth + buttonsDropdownWidth;
		if(window.viewerMode) {
			maxWidth = navbarMarginWidth + workingIndicatorWidth + titleMinWidth + viewerButtonGroupWidth;
		}
		var titleWidth = windowSize.width - maxWidth + titleMinWidth;
		navbarBtnGroups.forEach(function(group, index) {
			maxWidth += group.width;
			index === navbarBtnGroups.length - 1 && (maxWidth -= buttonsDropdownWidth);
			if(windowSize.width < maxWidth) {
				navbarDropdownElt.appendChild(group.elt);
			}
			else {
				navbarInnerElt.insertBefore(group.elt, navbarTitleContainerElt);
				titleWidth = windowSize.width - maxWidth + titleMinWidth;
			}
		});
		$navbarTitleElt.css({
			maxWidth: titleWidth
		});
		$navbarDropdownBtnElt.toggleClass('hide', navbarDropdownElt.children.length === 0);

		eventMgr.onLayoutResize();
	}

	var isVertical = settings.layoutOrientation == "vertical";

	function fixViewportScrolling() {
		// Fix a weird viewport behavior using pageup/pagedown in Webkit
		wrapperL1.width = windowSize.width + menuPanelWidth + (documentPanel.isShown ? documentPanelWidth : 0);
		wrapperL1.elt.style.width = wrapperL1.width + 'px';
		documentPanel.right = documentPanel.isShown ? 0 : -documentPanelWidth;
		documentPanel.elt.style.right = documentPanel.right + 'px';
	}

	function resizeAll() {
		windowSize = {
			width: window.innerWidth,
			height: window.innerHeight
		};

		while(true) {
			// Layout wrapper level 1
			wrapperL1.y = navbar.isOpen ? 0 : -navbarHeight;
			wrapperL1.x = menuPanel.isOpen ? 0 : documentPanel.isOpen ? -(menuPanelWidth + documentPanelWidth) : -menuPanelWidth;
			wrapperL1.width = windowSize.width + menuPanelWidth + documentPanelWidth;
			wrapperL1.height = windowSize.height - wrapperL1.y;

			// Layout wrapper level 2
			wrapperL2.left = menuPanelWidth;
			wrapperL2.width = windowSize.width;
			wrapperL2.height = wrapperL1.height;

			// Layout wrapper level 3
			wrapperL3.top = navbarHeight;
			wrapperL3.width = windowSize.width;
			wrapperL3.height = wrapperL1.height - navbarHeight;

			wrapperL1.applyCss();
			wrapperL2.applyCss();
			wrapperL3.applyCss();

			if(window.viewerMode) {
				previewPanel.width = wrapperL3.width;
				previewPanel.height = wrapperL3.height;
				previewContainer.width = wrapperL3.width;
				previewContainer.height = wrapperL3.height;

				previewPanel.applyCss();
				previewContainer.applyCss();
				return onResize();
			}

			if(navbar.isOpen && wrapperL3.height < editorMinSize.height + resizerSize) {
				navbar.isOpen = false;
				navbar.$elt.trigger('hide.layout.toggle').trigger('hidden.layout.toggle');
				continue;
			}

			if(isVertical) {
				if(!previewPanel.isOpen) {
					previewPanel.y = wrapperL3.height - resizerSize;
				}
				else {
					if(previewPanel.halfSize) {
						previewPanel.height = (wrapperL3.height + resizerSize) / 2;
					}
					if(previewPanel.height < previewMinSize.height) {
						previewPanel.height = previewMinSize.height;
					}
					previewPanel.y = wrapperL3.height - previewPanel.height;
					if(previewPanel.y < editorMinSize.height) {
						var previewPanelHeight = wrapperL3.height - editorMinSize.height;
						if(previewPanelHeight < previewMinSize.height) {
							previewPanel.isOpen = false;
							previewPanel.$elt.trigger('hide.layout.toggle').trigger('hidden.layout.toggle');
							continue;
						}
						previewPanel.height = previewPanelHeight;
						previewPanel.y = wrapperL3.height - previewPanel.height;
					}
				}
				previewPanel.width = wrapperL3.width;
				editor.height = previewPanel.y;
				editor.width = wrapperL3.width;
				previewContainer.top = resizerSize;
				previewContainer.height = previewPanel.height - resizerSize;
				previewContainer.width = previewPanel.width;
				navbarToggler.width = togglerSize;
				previewToggler.width = togglerSize;
				previewToggler.x = (previewPanel.width - togglerSize) / 2;
				previewResizer.width = previewContainer.width;
			}
			else {
				if(!previewPanel.isOpen) {
					previewPanel.x = wrapperL3.width - resizerSize;
				}
				else {
					if(previewPanel.halfSize) {
						previewPanel.width = (wrapperL3.width + resizerSize) / 2;
					}
					if(previewPanel.width < previewMinSize.width) {
						previewPanel.width = previewMinSize.width;
					}
					previewPanel.x = wrapperL3.width - previewPanel.width;
					if(previewPanel.x < editorMinSize.width) {
						var previewPanelWidth = wrapperL3.width - editorMinSize.width;
						if(previewPanelWidth < previewMinSize.width) {
							previewPanel.isOpen = false;
							previewPanel.$elt.trigger('hide.layout.toggle').trigger('hidden.layout.toggle');
							continue;
						}
						previewPanel.width = previewPanelWidth;
						previewPanel.x = wrapperL3.width - previewPanel.width;
					}
				}
				previewPanel.height = wrapperL3.height;
				editor.width = previewPanel.x;
				editor.height = wrapperL3.height;
				previewContainer.left = resizerSize;
				previewContainer.width = previewPanel.width - resizerSize;
				previewContainer.height = previewPanel.height;
				navbarToggler.height = togglerSize;
				previewToggler.height = togglerSize;
				previewToggler.y = (previewPanel.height - togglerSize) / 2;
				previewResizer.height = previewContainer.height;
			}
			break;
		}

		navbarToggler.$elt.toggleClass('open', navbar.isOpen);
		previewToggler.$elt.toggleClass('open', previewPanel.isOpen);
		previewResizer.$elt.toggleClass('open', previewPanel.isOpen);

		editor.applyCss();
		previewPanel.applyCss();
		previewContainer.applyCss();
		previewToggler.applyCss();
		previewResizer.applyCss();
		navbarToggler.applyCss();

		fixViewportScrolling();
		previewButtons.adjustPosition();

		onResize();
	}

	layout.init = function() {

		var isModalShown = 0;
		$(document.body).on('show.bs.modal', '.modal', function() {
			// Close panel if open
			menuPanel.toggle(false);
			documentPanel.toggle(false);
			isModalShown++;
		}).on('hidden.bs.modal', '.modal', function() {
			isModalShown--;
		});

		// Tweak the body element
		(function(bodyStyle) {
			bodyStyle.position = 'absolute';
			bodyStyle.top = 0;
			bodyStyle.left = 0;
			bodyStyle.bottom = 0;
			bodyStyle.right = 0;
			bodyStyle.overflow = 'hidden';
		})(document.body.style);
		document.documentElement.style.overflow = 'hidden';

		wrapperL1 = new DomObject('.layout-wrapper-l1');
		wrapperL2 = new DomObject('.layout-wrapper-l2');
		wrapperL3 = new DomObject('.layout-wrapper-l3');
		navbar = new DomObject('.navbar');
		menuPanel = new DomObject('.menu-panel');
		documentPanel = new DomObject('.document-panel');
		editor = new DomObject('#wmd-input');
		previewPanel = new DomObject('.preview-panel');
		previewContainer = new DomObject('.preview-container');
		navbarToggler = new DomObject('.layout-toggler-navbar');
		previewToggler = new DomObject('.layout-toggler-preview');
		previewResizer = new DomObject('.layout-resizer-preview');
		previewButtons = new DomObject('.extension-preview-buttons');

		editorContentElt = editor.elt.querySelector('.editor-content');
		previewContentElt = document.getElementById('preview-contents');
		editorMarginElt = editor.elt.querySelector('.editor-margin');
		navbarInnerElt = navbar.elt.querySelector('.navbar-inner');
		navbarDropdownElt = navbar.elt.querySelector('.buttons-dropdown .dropdown-menu');
		$navbarDropdownBtnElt = navbar.$elt.find('.buttons-dropdown');
		navbarTitleContainerElt = navbar.elt.querySelector('.title-container');
		$navbarTitleElt = navbar.$elt.find('.file-title-navbar, .input-file-title');

		// Fix a weird viewport behavior using pageup/pagedown in Webkit
		$([
			wrapperL1.elt,
			wrapperL2.elt,
			wrapperL3.elt
		]).on('scroll', function() {
			this.scrollLeft = 0;
		});

		_.each(navbar.elt.querySelectorAll('.right-buttons'), function(btnGroupElt) {
			navbarBtnGroups.push({
				elt: btnGroupElt,
				width: navbarBtnGroupsWidth.shift()
			});
		});
		_.each(navbar.elt.querySelectorAll('.left-buttons'), function(btnGroupElt) {
			navbarBtnGroups.push({
				elt: btnGroupElt,
				width: navbarBtnGroupsWidth.shift()
			});
		});

		wrapperL1.$elt.toggleClass('layout-vertical', isVertical);
		wrapperL1.$elt.on("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", onTransitionEnd);

		navbar.isOpen = true;
		navbar.createToggler();
		navbarToggler.$elt.click(_.bind(navbar.toggle, navbar));

		previewPanel.isOpen = true;
		previewPanel.createToggler();
		previewPanel.halfSize = true;
		previewToggler.$elt.click(_.bind(previewPanel.toggle, previewPanel));

		// Open StackEdit Viewer if failing to open the preview
		previewPanel.$elt.on('show.layout.toggle', function() {
			_.defer(function() {
				if(!previewPanel.isOpen) {
					window.location.href = 'viewer';
				}
			});
		});

		documentPanel.isOpen = false;
		documentPanel.createToggler(true);
		documentPanel.$elt.find('.toggle-button').click(_.bind(documentPanel.toggle, documentPanel));

		// Hide panels when clicking on a non collapse element
		documentPanel.$elt.on('click', 'a[data-toggle!=collapse]', _.bind(documentPanel.toggle, documentPanel, false));

		// Focus on editor when document panel is closed
		documentPanel.$elt.on('hidden.layout.toggle', function() {
			fixViewportScrolling();
			isModalShown || editor.elt.focus();
		});

		menuPanel.isOpen = false;
		if(!window.viewerMode) {
			menuPanel.createToggler(true);
			menuPanel.$elt.find('.toggle-button').click(_.bind(menuPanel.toggle, menuPanel));

			// Hide panels when clicking on a non collapse element
			menuPanel.$elt.on('click', 'a[data-toggle!=collapse]', _.bind(menuPanel.toggle, menuPanel, false));

			// Close all open sub-menus when one submenu opens and when panel is closed
			menuPanel.$elt.on('show.bs.collapse hidden.layout.toggle', function() {
				menuPanel.$elt.find('.in').collapse('hide');
			});

			// Focus on editor when menu panel is closed
			menuPanel.$elt.on('hidden.layout.toggle', function() {
				isModalShown || editor.elt.focus();
			});

			// Gesture

			/*
			navbar.initHammer();
			menuPanel.initHammer();
			documentPanel.initHammer();
			previewButtons.initHammer();

			navbar.hammer.on('swiperight', _.bind(menuPanel.toggle, menuPanel, true));
			navbar.hammer.on('swipeleft', _.bind(documentPanel.toggle, documentPanel, true));
			navbar.hammer.on('swipeup', _.bind(navbar.toggle, navbar, false));

			menuPanel.hammer.on('swiperight', _.bind(menuPanel.toggle, menuPanel, true));
			menuPanel.hammer.on('swipeleft', _.bind(menuPanel.toggle, menuPanel, false));

			documentPanel.hammer.on('swipeleft', _.bind(documentPanel.toggle, documentPanel, true));
			documentPanel.hammer.on('swiperight', _.bind(documentPanel.toggle, documentPanel, false));
			*/

			previewResizer.initHammer(true);
			var resizerInitialSize;
			previewResizer.hammer.on('dragstart', function() {
				resizerInitialSize = {
					width: previewPanel.width,
					height: previewPanel.height
				};
			}).on('drag', function(evt) {
				if(isVertical) {
					previewPanel.height = resizerInitialSize.height - evt.gesture.deltaY;
				}
				else {
					previewPanel.width = resizerInitialSize.width - evt.gesture.deltaX;
				}
				evt.gesture.preventDefault();
				previewPanel.halfSize = false;
				resizeAll();
			});
		}

		previewButtons.initHammer(true);
		previewButtons.adjustPosition = function() {
			if(!previewButtons.isDragged) {
				return;
			}
			var minX = -windowSize.width + previewButtons.elt.offsetWidth;
			var minY = -windowSize.height + previewButtons.elt.offsetHeight;
			this.x < minX && (this.x = minX);
			this.y < minY && (this.y = minY);
			this.x > 0 && (this.x = 0);
			this.y > 0 && (this.y = 0);
			this.applyCss();
		};


		var buttonsInitialCoord;
		previewButtons.hammer.on('dragstart', function() {
			previewButtons.isOpen = true;
			previewButtons.isDragged = true;
			previewButtons.$elt.removeClass('closed animate');
			wrapperL2.$elt.addClass('dragging');
			buttonsInitialCoord = {
				x: previewButtons.x,
				y: previewButtons.y
			};
		}).on('drag', function(evt) {
			previewButtons.x = buttonsInitialCoord.x + evt.gesture.deltaX;
			previewButtons.y = buttonsInitialCoord.y + evt.gesture.deltaY;
			previewButtons.adjustPosition();
			evt.gesture.preventDefault();
		}).on('dragend', function() {
			wrapperL2.$elt.removeClass('dragging');
			previewButtons.$elt.find('.btn-group').toggleClass('dropup', windowSize.height / 2 > -previewButtons.y);
		});

		// Configure Mousetrap
		mousetrap.stopCallback = function() {
			return menuPanel.isOpen || documentPanel.isOpen || isModalShown;
		};

		$(window).resize(resizeAll).focus(function() {
			if(!menuPanel.isOpen && !documentPanel.isOpen && !isModalShown) {
				editor.elt.focus();
			}
		});

		var styleContent = '';

		// Apply font
		function applyFont(size, screenWidth) {
			screenWidth = screenWidth || 0;
			styleContent += [
				'@media (min-width: ' + screenWidth + 'px) {',
				'#wmd-input {',
				'   font-size: ' + size + 'px;',
				'}',
				'#preview-contents {',
				'   font-size: ' + size + 'px;',
				'}',
				'}'
			].join('\n');
		}

		applyFont(16 * settings.fontSizeRatio);
		applyFont(17 * settings.fontSizeRatio, 600);
		applyFont(18 * settings.fontSizeRatio, 1200);

		// Apply dynamic stylesheet
		var style = crel('style', {
			type: 'text/css'
		});
		style.innerHTML = styleContent;
		document.head.appendChild(style);

		resizeAll();
	};

	eventMgr.addListener('onReady', function() {
		previewButtons.x = previewButtonsOffset.x;
		previewButtons.y = previewButtonsOffset.y;
		previewButtons.applyCss();
        setTimeout(function() {
            previewButtons.$elt.addClass('animate');
        }, 0);

		function openPreviewButtons() {
			clearTimeout(closeTimeoutId);
			if(!previewButtons.isDragged) {
                previewButtons.isOpen = true;
				previewButtons.x = previewButtonsOffset.x;
				previewButtons.applyCss();
				previewButtons.$elt.removeClass('closed');
			}
		}

		var closeTimeoutId;
		var dropdownOpen = false;

		function closePreviewButtons() {
			clearTimeout(closeTimeoutId);
			closeTimeoutId = setTimeout(function() {
				if(!previewButtons.isDragged && !dropdownOpen) {
                    previewButtons.isOpen = false;
					previewButtons.x = previewButtonsOffset.x + previewButtons.elt.offsetWidth + previewButtonsClosedOffset;
					previewButtons.applyCss();
					previewButtons.$elt.addClass('closed');
				}
			}, 3000);
		}

        openPreviewButtons();
		closePreviewButtons();
		previewButtons.$elt.hover(openPreviewButtons, closePreviewButtons).on('show.bs.dropdown', function() {
			dropdownOpen = true;
		}).on('hidden.bs.dropdown', function() {
			dropdownOpen = false;
			closePreviewButtons();
		});

		_.each(previewButtons.elt.querySelectorAll('.btn-group'), function(btnGroupElt) {
			var $btnGroupElt = $(btnGroupElt);
			$btnGroupElt.on('shown.bs.dropdown', function() {
				// Align dropdown to the left of the screen
				$btnGroupElt.find('.dropdown-menu').css({
					right: -previewButtons.elt.offsetWidth + $btnGroupElt.width() + $btnGroupElt.position().left
				});
				var maxHeight = -previewButtons.y - previewButtonsDropdownMargin;
				// If it's a dropup
				if(windowSize.height / 2 > -previewButtons.y) {
					maxHeight = windowSize.height + previewButtons.y - previewButtons.elt.offsetHeight - previewButtonsDropdownMargin;
				}
				$btnGroupElt.find('.markdown-syntax, .table-of-contents').css({
					'maxHeight': maxHeight
				});
			}).addClass('dropup');
		});
	});

    eventMgr.addListener('onExtensionButtonResize', function() {
        if(!previewButtons.isDragged) {
            if(!previewButtons.isOpen) {
                previewButtons.$elt.removeClass('animate');
                previewButtons.x = previewButtonsOffset.x + previewButtons.elt.offsetWidth + previewButtonsClosedOffset;
                previewButtons.applyCss();
                setTimeout(function() {
                    previewButtons.$elt.addClass('animate');
                }, 0);
            }
        }
        else {
            previewButtons.adjustPosition();
        }
    });

	eventMgr.onLayoutCreated(layout);
	return layout;
});
