define([
    'jquery',
    'underscore',
    'utils',
    'constants',
    'eventMgr',
    'crel',
    'mousetrap',
], function($, _, utils, constants, eventMgr, crel, mousetrap) {
    var layout = {};

    var resizerSize = 32;
    var togglerSize = 60;
    var navbarHeight = 50;
    var editorMaxWidth = 250;
    var previewMaxWidth = 330;
    var menuPanelWidth = 280;
    var documentPanelWidth = 320;
    var windowSize;

    function DomObject(selector) {
        this.selector = selector;
        this.elt = document.querySelector(selector);
        this.$elt = $(this.elt);
    }

    var laterCssTimeoutId;
    var laterCssQueue = [];

    var outerWrapper, innerWrapper, navbar, menuPanel, documentPanel, editor, previewPanel, previewContainer, navbarToggler, previewToggler, previewResizer;

    var animate = false;

    function applyCssLater() {
        if(laterCssQueue.length === 0) {
            outerWrapper.$elt.removeClass('layout-animate');
            animate = false;
            return onResize();
        }
        laterCssQueue.shift()();
        applyCssLater();
    }

    DomObject.prototype.applyCss = function() {

        // Top/left
        this.top !== undefined && (this.elt.style.top = this.top + 'px');
        this.left !== undefined && (this.elt.style.left = this.left + 'px');

        // Translate
        if(this.x !== undefined || this.y !== undefined) {
            this.x = this.x || 0;
            this.y = this.y || 0;
            this.elt.style['-webkit-transform'] = 'translate(' + this.x + 'px, ' + this.y + 'px)';
            this.elt.style['-ms-transform'] = 'translate(' + this.x + 'px, ' + this.y + 'px)';
            this.elt.style.transform = 'translate(' + this.x + 'px, ' + this.y + 'px)';
        }

        // Width (defer if new width is smaller)
        if(animate && this.width < this.oldWidth) {
            laterCssQueue.push(_.bind(function() {
                this.elt.style.width = this.width + 'px';
            }, this));
        }
        else {
            this.width !== undefined && (this.elt.style.width = this.width + 'px');
        }
        this.oldWidth = this.width;

        // Height (defer if new height is smaller)
        if(animate && this.height < this.oldHeight) {
            laterCssQueue.push(_.bind(function() {
                this.elt.style.height = this.height + 'px';
            }, this));
        }
        else {
            this.height !== undefined && (this.elt.style.height = this.height + 'px');
        }
        this.oldHeight = this.height;

        clearTimeout(laterCssTimeoutId);
        laterCssTimeoutId = setTimeout(applyCssLater, 350);
    };

    DomObject.prototype.createToggler = function(backdrop) {
        var backdropElt;
        this.toggle = function(show) {
            if(show === this.isOpen) {
                return;
            }
            this.isOpen = _.isBoolean(show) ? show : !this.isOpen;
            if(this.isOpen) {
                this.$elt.addClass('panel-open');
                if(backdrop) {
                    $(backdropElt = utils.createBackdrop(outerWrapper.elt)).click(_.bind(function() {
                        this.toggle(false);
                    }, this));
                    this.$elt.addClass('bring-to-front');
                }
            }
            else {
                backdropElt && backdropElt.removeBackdrop();
                backdropElt = undefined;
                laterCssQueue.push(_.bind(function() {
                    !this.isOpen && this.$elt.find('.in').collapse('hide');
                    this.$elt.toggleClass('panel-open', this.isOpen).toggleClass('bring-to-front', (!!backdrop && this.isOpen));
                }, this));
            }
            animate = true;
            outerWrapper.$elt.addClass('layout-animate');
            resizeAll();
        };
    };

    var maxWidthMap = [
        { screenWidth: 0, maxWidth: 600 },
        { screenWidth: 1000, maxWidth: 700 },
        { screenWidth: 1200, maxWidth: 800 },
        { screenWidth: 1400, maxWidth: 900 },
    ];
    var maxWidthMapReversed = maxWidthMap.slice(0).reverse();
    function getMaxWidth() {
        return _.find(maxWidthMapReversed, function(value) {
            return windowSize.width > value.screenWidth;
        }).maxWidth;
    }

    function onResize() {
        var padding = (editor.elt.offsetWidth - getMaxWidth()) / 2;
        if(padding < constants.EDITOR_DEFAULT_PADDING) {
            padding = constants.EDITOR_DEFAULT_PADDING;
        }
        editorContentElt.style.paddingLeft = padding + 'px';
        editorContentElt.style.paddingRight = padding + 'px';
        editorMarginElt.style.width = padding + 'px',

        eventMgr.onLayoutResize();
    }

    var editorContentElt;
    var editorMarginElt;
    function resizeAll() {
        windowSize = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        // Layout outer wrapper
        outerWrapper.y = navbar.isOpen ? 0 : -navbarHeight;
        outerWrapper.x = menuPanel.isOpen ? 0 : documentPanel.isOpen ? -(menuPanelWidth + documentPanelWidth) : -menuPanelWidth;
        outerWrapper.width = windowSize.width + menuPanelWidth + documentPanelWidth;
        outerWrapper.height = windowSize.height - outerWrapper.y;
        outerWrapper.applyCss();

        // Layout inner wrapper
        innerWrapper.left = menuPanelWidth;
        innerWrapper.width = windowSize.width;
        innerWrapper.height = outerWrapper.height;
        innerWrapper.applyCss();

        // Preview panel
        if(!previewPanel.isOpen) {
            previewPanel.x = innerWrapper.width - resizerSize;
        }
        else {
            if(previewPanel.halfSize) {
                previewPanel.width = (windowSize.width + resizerSize) / 2;
            }
            if(previewPanel.width < previewMaxWidth) {
                previewPanel.halfSize = false;
                previewPanel.width = previewMaxWidth;
            }
            previewPanel.x = innerWrapper.width - previewPanel.width;
            if(previewPanel.x < editorMaxWidth) {
                previewPanel.halfSize = false;
                previewPanel.x = editorMaxWidth;
                previewPanel.width = innerWrapper.width - previewPanel.x;
                if(previewPanel.width < previewMaxWidth) {
                    previewPanel.isOpen = false;
                    previewPanel.width = previewMaxWidth;
                    previewPanel.x = innerWrapper.width - resizerSize;
                }
            }
        }

        previewPanel.top = navbarHeight;
        previewPanel.height = innerWrapper.height - previewPanel.top;
        previewPanel.applyCss();

        // Editor
        editor.top = navbarHeight;
        editor.width = previewPanel.x;
        editor.height = innerWrapper.height - editor.top;
        editor.applyCss();

        // Preview container
        previewContainer.left = resizerSize;
        previewContainer.width = previewPanel.width - resizerSize;
        previewContainer.height = previewPanel.height;
        previewContainer.applyCss();

        // Navbar toggler
        navbarToggler.applyCss();
        navbarToggler.$elt.toggleClass('open', navbar.isOpen);

        // Preview toggler
        previewToggler.y = (previewPanel.height - togglerSize) / 2;
        previewToggler.applyCss();
        previewToggler.$elt.toggleClass('open', previewPanel.isOpen);

        // Preview resizer
        previewResizer.height = previewContainer.height;
        previewResizer.applyCss();
        previewResizer.$elt.toggleClass('open', previewPanel.isOpen);

        onResize();
    }
    layout.resizeAll = resizeAll;

    layout.init = function() {
        outerWrapper = new DomObject('.layout-outer-wrapper');
        innerWrapper = new DomObject('.layout-inner-wrapper');
        navbar = new DomObject('.navbar');
        menuPanel = new DomObject('.menu-panel');
        documentPanel = new DomObject('.document-panel');
        editor = new DomObject('#wmd-input');
        previewPanel = new DomObject('.preview-panel');
        previewContainer = new DomObject('.preview-container');
        navbarToggler = new DomObject('.layout-toggler-navbar');
        previewToggler = new DomObject('.layout-toggler-preview');
        previewResizer = new DomObject('.layout-resizer-preview');

        editorContentElt = editor.elt.querySelector('.editor-content');
        editorMarginElt = editor.elt.querySelector('.editor-margin');

        navbar.isOpen = true;
        navbar.createToggler();
        navbarToggler.$elt.click(_.bind(navbar.toggle, navbar));

        previewPanel.isOpen = true;
        previewPanel.createToggler();
        previewPanel.halfSize = true;
        previewToggler.$elt.click(_.bind(previewPanel.toggle, previewPanel));

        menuPanel.isOpen = false;
        menuPanel.createToggler(true);
        menuPanel.$elt.find('.toggle-button').click(_.bind(menuPanel.toggle, menuPanel));

        documentPanel.isOpen = false;
        documentPanel.createToggler(true);
        documentPanel.$elt.find('.toggle-button').click(_.bind(documentPanel.toggle, documentPanel));



        // Hide menu panel when clicking 'Save as' button
        $('.collapse-save-as a').click(function() {
            menuPanel.toggle(false);
        });

        menuPanel.$elt.on('show.bs.collapse', function() {
            // Close all open sub-menus when one submenu opens
            menuPanel.$elt.find('.in').collapse('hide');
        });

        var isDragging = false;
        var desiredWidth;
        var lastCoord;
        outerWrapper.$elt.on('mousemove', function(evt) {
            if(!isDragging) {
                return;
            }
            if(evt.which !== 1) {
                isDragging = false;
            }
            else {
                var newCoord = {
                    x: evt.pageX,
                    y: evt.pageY,
                };
                if(lastCoord.x !== newCoord.x) {
                    desiredWidth += lastCoord.x - newCoord.x;
                    previewPanel.width = desiredWidth;
                    previewPanel.halfSize = false;
                    resizeAll();
                }
                lastCoord = newCoord;
                evt.preventDefault();
            }
        });

        previewResizer.$elt.on('mousedown', function(evt) {
            if(evt.which === 1) {
                isDragging = true;
                desiredWidth = previewPanel.width;
                lastCoord = {
                    x: evt.pageX,
                    y: evt.pageY,
                };
            }
        });

        var isModalShown = false;
        $('.modal').on('show.bs.modal', function() {
            // Close panel if open
            menuPanel.toggle(false);
            documentPanel.toggle(false);
            isModalShown = true;
        }).on('hidden.bs.modal', function() {
            isModalShown = false;
        });

        // Configure Mousetrap
        mousetrap.stopCallback = function(e, element) {
            return menuPanel.isOpen || documentPanel.isOpen || isModalShown || $(element).is("input, select, textarea:not(.ace_text-input)");
        };


        $(window).resize(resizeAll);
        $(document.body).on('touchmove', function(evt) {
            evt.preventDefault();
        });

        var styleContent = '';

        // Apply font
        function applyFont(size, screenWidth) {
            screenWidth = screenWidth || 0;
            //var codeFontSize = settings.editorFontSize;
            //var codeLineHeight = Math.round(codeFontSize * 20 / 12);
            var previewFontSize = size; // * 13 / 12;
            styleContent += [
                '@media (min-width: ' + screenWidth + 'px) {',
                '#wmd-input {',
                '   font-size: ' + size + 'px;',
                //'   font-family: ' + settings.editorFontFamily + ';',
                '}',
                '#preview-contents {',
                '   font-size: ' + previewFontSize + 'px;',
                '}',
                '}',
            ].join('\n');
        }
        applyFont(16);
        applyFont(17, 600);
        applyFont(18, 1200);

        function applyMaxWidth(maxWidth, screenWidth) {
            styleContent += [
                '@media (min-width: ' + screenWidth + 'px) {',
                '#preview-contents {',
                '   max-width: ' + (maxWidth + 30) + 'px;',
                '}',
                '}',
            ].join('\n');
        }
        _.each(maxWidthMap, function(entry) {
            applyMaxWidth(entry.maxWidth, entry.screenWidth);
        });

        // Apply dynamic stylesheet
        var style = crel('style', {
            type : 'text/css'
        });
        style.innerHTML = styleContent;
        document.head.appendChild(style);



        resizeAll();
    };

    return layout;
});
