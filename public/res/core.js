/*globals Markdown, requirejs */
define([
    "jquery",
    "underscore",
    "crel",
    "ace",
    "constants",
    "utils",
    "storage",
    "settings",
    "eventMgr",
    "shortcutMgr",
    "mousetrap",
    "text!html/bodyIndex.html",
    "text!html/bodyViewer.html",
    "text!html/settingsTemplateTooltip.html",
    "text!html/settingsUserCustomExtensionTooltip.html",
    "storage",
    "uilayout",
    'pagedown-ace',
    'pagedown-light',
    'libs/ace_mode',
    'ace/requirejs/text!ace/css/editor.css',
    'ace/requirejs/text!ace/theme/textmate.css',
    'ace/ext/spellcheck',
    'ace/ext/searchbox'

], function($, _, crel, ace, constants, utils, storage, settings, eventMgr, shortcutMgr, mousetrap, bodyIndexHTML, bodyViewerHTML, settingsTemplateTooltipHTML, settingsUserCustomExtensionTooltipHTML) {

    var core = {};
    
    // Used for periodic tasks
    var intervalId;

    // Used to detect user activity
    var isUserReal = false;
    var userActive = false;
    var windowUnique = true;
    var userLastActivity = 0;
    function setUserActive() {
        isUserReal = true;
        userActive = true;
        var currentTime = utils.currentTime;
        if(currentTime > userLastActivity + 1000) {
            userLastActivity = currentTime;
            eventMgr.onUserActive();
        }
    }

    function isUserActive() {
        if(utils.currentTime - userLastActivity > constants.USER_IDLE_THRESHOLD) {
            userActive = false;
        }
        return userActive && windowUnique;
    }
    
    // Used to only have 1 window of the application in the same browser
    var windowId;
    function checkWindowUnique() {
        if(isUserReal === false || windowUnique === false) {
            return;
        }
        if(windowId === undefined) {
            windowId = utils.randomString();
            storage.frontWindowId = windowId;
        }
        var frontWindowId = storage.frontWindowId;
        if(frontWindowId != windowId) {
            windowUnique = false;
            if(intervalId !== undefined) {
                clearInterval(intervalId);
            }
            $(".modal").modal("hide");
            $('.modal-non-unique').modal("show");
            // Attempt to close the window
            window.close();
        }
    }

    // Offline management
    var isOffline = false;
    var offlineTime = utils.currentTime;
    core.setOffline = function() {
        offlineTime = utils.currentTime;
        if(isOffline === false) {
            isOffline = true;
            eventMgr.onOfflineChanged(true);
        }
    };
    function setOnline() {
        if(isOffline === true) {
            isOffline = false;
            eventMgr.onOfflineChanged(false);
        }
    }
    function checkOnline() {
        // Try to reconnect if we are offline but we have some network
        if(isOffline === true && navigator.onLine === true && offlineTime + constants.CHECK_ONLINE_PERIOD < utils.currentTime) {
            offlineTime = utils.currentTime;
            // Try to download anything to test the connection
            $.ajax({
                url: "//www.google.com/jsapi",
                timeout: constants.AJAX_TIMEOUT,
                dataType: "script"
            }).done(function() {
                setOnline();
            });
        }
    }

    // Load settings in settings dialog
    var $themeInputElt;
    function loadSettings() {

        // Layout orientation
        utils.setInputRadio("radio-layout-orientation", settings.layoutOrientation);
        // Theme
        utils.setInputValue($themeInputElt, window.theme);
        $themeInputElt.change();
        // Lazy rendering
        utils.setInputChecked("#input-settings-lazy-rendering", settings.lazyRendering);
        // Editor font family
        utils.setInputValue("#input-settings-editor-font-family", settings.editorFontFamily);
        // Editor font size
        utils.setInputValue("#input-settings-editor-font-size", settings.editorFontSize);
        // Max width
        utils.setInputValue("#input-settings-max-width", settings.maxWidth);
        // Default content
        utils.setInputValue("#textarea-settings-default-content", settings.defaultContent);
        // Mode
        utils.setInputRadio("radio-settings-mode", storage.mode || '_ace_');
        // Commit message
        utils.setInputValue("#input-settings-publish-commit-msg", settings.commitMsg);
        // Gdrive multi-accounts
        utils.setInputValue("#input-settings-gdrive-multiaccount", settings.gdriveMultiAccount);
        // Gdrive full access
        utils.setInputChecked("#input-settings-gdrive-full-access", settings.gdriveFullAccess);
        // Dropbox full access
        utils.setInputChecked("#input-settings-dropbox-full-access", settings.dropboxFullAccess);
        // GitHub full access
        utils.setInputChecked("#input-settings-github-full-access", settings.githubFullAccess);
        // Template
        utils.setInputValue("#textarea-settings-publish-template", settings.template);
        // PDF template
        utils.setInputValue("#textarea-settings-pdf-template", settings.pdfTemplate);
        // PDF page size
        utils.setInputValue("#input-settings-pdf-page-size", settings.pdfPageSize);
        // SSH proxy
        utils.setInputValue("#input-settings-ssh-proxy", settings.sshProxy);
        
        // Load shortcuts settings
        shortcutMgr.loadSettings();

        // Load extension settings
        eventMgr.onLoadSettings();
    }

    // Save settings from settings dialog
    function saveSettings(event) {
        var newSettings = {};

        // Layout orientation
        newSettings.layoutOrientation = utils.getInputRadio("radio-layout-orientation");
        // Theme
        var theme = utils.getInputValue($themeInputElt);
        // Lazy Rendering
        newSettings.lazyRendering = utils.getInputChecked("#input-settings-lazy-rendering");
        // Editor font family
        newSettings.editorFontFamily = utils.getInputTextValue("#input-settings-editor-font-family", event);
        // Editor font size
        newSettings.editorFontSize = utils.getInputIntValue("#input-settings-editor-font-size", event, 1, 99);
        // Max width
        newSettings.maxWidth = utils.getInputIntValue("#input-settings-max-width", event, 1);
        // Default content
        newSettings.defaultContent = utils.getInputValue("#textarea-settings-default-content");
        // Mode
        var mode = utils.getInputRadio("radio-settings-mode");
        // Commit message
        newSettings.commitMsg = utils.getInputTextValue("#input-settings-publish-commit-msg", event);
        // Gdrive multi-accounts
        newSettings.gdriveMultiAccount = utils.getInputIntValue("#input-settings-gdrive-multiaccount");
        // Gdrive full access
        newSettings.gdriveFullAccess = utils.getInputChecked("#input-settings-gdrive-full-access");
        // Drobox full access
        newSettings.dropboxFullAccess = utils.getInputChecked("#input-settings-dropbox-full-access");
        // GitHub full access
        newSettings.githubFullAccess = utils.getInputChecked("#input-settings-github-full-access");
        // Template
        newSettings.template = utils.getInputTextValue("#textarea-settings-publish-template", event);
        // PDF template
        newSettings.pdfTemplate = utils.getInputTextValue("#textarea-settings-pdf-template", event);
        // PDF page size
        newSettings.pdfPageSize = utils.getInputValue("#input-settings-pdf-page-size");
        // SSH proxy
        newSettings.sshProxy = utils.checkUrl(utils.getInputTextValue("#input-settings-ssh-proxy", event), true);

        // Save shortcuts settings
        shortcutMgr.saveSettings(newSettings);

        // Save extension settings
        newSettings.extensionSettings = {};
        eventMgr.onSaveSettings(newSettings.extensionSettings, event);

        if(!event.isPropagationStopped()) {
            if(settings.dropboxFullAccess !== newSettings.dropboxFullAccess) {
                storage.removeItem('dropbox.lastChangeId');
            }
            $.extend(settings, newSettings);
            storage.settings = JSON.stringify(settings);
            storage.themeV3 = theme;
            storage.mode = mode;
        }
    }

    // Set the panels visibility
    var layout;
    var $menuPanelElt;
    var $documentPanelElt;
    function setPanelVisibility(forceHide) {
        if(forceHide === true || layout.state.north.isClosed) {
            $menuPanelElt.hide();
            $documentPanelElt.hide();
        }
        else {
            $menuPanelElt.show();
            $documentPanelElt.show();
        }
    }

    // Set the preview button visibility
    var $previewButtonsElt;
    function setPreviewButtonsVisibility(forceHide) {
        if(forceHide === true || layout.state.east.isClosed) {
            $previewButtonsElt.hide();
        }
        else {
            $previewButtonsElt.show();
        }
    }

    // Create ACE editor
    var aceEditor;
    function createAceEditor() {
        aceEditor = ace.edit("wmd-input");
        aceEditor.setOption("spellcheck", true);
        aceEditor.renderer.setShowGutter(false);
        aceEditor.renderer.setPrintMarginColumn(false);
        aceEditor.renderer.setPadding(constants.EDITOR_DEFAULT_PADDING);
        aceEditor.session.setUseWrapMode(true);
        aceEditor.session.setNewLineMode("unix");
        aceEditor.session.setMode("libs/ace_mode");
        aceEditor.session.$selectLongWords = true;

        // Make bold titles...
        (function(self) {
            function checkLine(currentLine) {
                var line = self.lines[currentLine];
                if(line.length !== 0) {
                    if(line[0].type.indexOf("markup.heading.multi") === 0) {
                        _.each(self.lines[currentLine - 1], function(previousLineObject) {
                            previousLineObject.type = "markup.heading.prev.multi";
                        });
                    }
                }
            }
            function customWorker() {
                // Duplicate from background_tokenizer.js
                if(!self.running) {
                    return;
                }

                var workerStart = new Date();
                var currentLine = self.currentLine;
                var endLine = -1;
                var doc = self.doc;

                while (self.lines[currentLine]) {
                    currentLine++;
                }

                var startLine = currentLine;

                var len = doc.getLength();
                var processedLines = 0;
                self.running = false;
                while (currentLine < len) {
                    self.$tokenizeRow(currentLine);
                    endLine = currentLine;
                    do {
                        checkLine(currentLine); // benweet
                        currentLine++;
                    } while (self.lines[currentLine]);

                    // only check every 5 lines
                    processedLines++;
                    if((processedLines % 5 === 0) && (new Date() - workerStart) > 20) {
                        self.running = setTimeout(customWorker, 20); // benweet
                        self.currentLine = currentLine;
                        return;
                    }
                }
                self.currentLine = currentLine;

                if(startLine <= endLine) {
                    self.fireUpdateEvent(startLine, endLine);
                }
            }
            self.$worker = function() {
                self.lines.splice(0, self.lines.length);
                self.states.splice(0, self.states.length);
                self.currentLine = 0;
                customWorker();
            };

        })(aceEditor.session.bgTokenizer);

        shortcutMgr.configureAce(aceEditor);
        eventMgr.onAceCreated(aceEditor);
    }

    // Create the layout
    var $editorButtonsElt;
    function createLayout() {
        var layoutGlobalConfig = {
            closable: true,
            resizable: false,
            slidable: false,
            livePaneResizing: true,
            enableCursorHotkey: false,
            resizerDblClickToggle: false,
            resizeWithWindow: false,
            north__spacing_open: 1,
            north__spacing_closed: 1,
            spacing_open: 35,
            spacing_closed: 35,
            togglerLength_open: 60,
            togglerLength_closed: 60,
            stateManagement__enabled: false,
            north__minSize: 49,
            center__minWidth: 250,
            center__minHeight: 180,
            fxSettings: {
                easing: "easeInOutQuad",
                duration: 350
            },
            onopen: function() {
                setPanelVisibility();
                setPreviewButtonsVisibility();
            },
            onclose_start: function(paneName) {
                if(paneName == 'north') {
                    setPanelVisibility(true);
                }
                else if(paneName == 'east') {
                    setPreviewButtonsVisibility(true);
                }
            },
            onresize_end: function(paneName) {
                if(aceEditor !== undefined && paneName == 'center') {
                    aceEditor.resize();
                    var bottomMargin = (aceEditor.renderer.$size.scrollerHeight - aceEditor.renderer.lineHeight) / 2;
                    bottomMargin < 0 && (bottomMargin = 0);
                    aceEditor.renderer.setScrollMargin(0, bottomMargin, 0, 0);
                    setTimeout(function() {
                        var padding = (aceEditor.renderer.$size.scrollerWidth - settings.maxWidth) / 2;
                        if(padding < constants.EDITOR_DEFAULT_PADDING) {
                            padding = constants.EDITOR_DEFAULT_PADDING;
                        }
                        if(padding !== aceEditor.renderer.$padding) {
                            aceEditor.renderer.setPadding(padding);
                            aceEditor.resize(true);
                        }
                    }, 5);
                }
                eventMgr.onLayoutResize(paneName);
            },
        };
        eventMgr.onLayoutConfigure(layoutGlobalConfig);
        if(settings.layoutOrientation == "horizontal") {
            $(".ui-layout-south").remove();
            $(".preview-container").html('<div id="preview-contents"><div id="wmd-preview" class="preview-content"></div></div>');
            layout = $('body').layout($.extend(layoutGlobalConfig, {
                east__resizable: true,
                east__size: 0.5,
                east__minSize: 300
            }));
        }
        else if(settings.layoutOrientation == "vertical") {
            $(".ui-layout-east").remove();
            $(".preview-container").html('<div id="preview-contents"><div id="wmd-preview" class="preview-content"></div></div>');
            layout = $('body').layout($.extend(layoutGlobalConfig, {
                south__resizable: true,
                south__size: 0.5,
                south__minSize: 200
            }));
        }
        settings.maxWidth && $('#preview-contents').css('max-width', (settings.maxWidth + 30) + 'px');
        $(".navbar").click(function() {
            layout.allowOverflow('north');
        });
        $(".ui-layout-toggler-south").addClass("btn btn-info").html('<i class="icon-none"></i>');
        $(".ui-layout-toggler-east").addClass("btn btn-info").html('<i class="icon-none"></i>');
        var $northTogglerElt = $(".ui-layout-toggler-north").addClass("btn btn-info").html('<i class="icon-th"></i>');

        // We attach the preview buttons to the UI layout resizer in order to
        // have fixed position
        // We also move the north toggler to the east or south resizer as the
        // north resizer is very small
        // var $previewButtonsContainerElt = $('<div
        // class="preview-button-container">');
        var $resizerDecorator = $('<div class="resizer-decorator">');
        $previewButtonsElt = $('<div class="extension-preview-buttons">');
        $editorButtonsElt = $('<div class="extension-editor-buttons">');
        if(window.viewerMode || settings.layoutOrientation == "horizontal") {
            $('.ui-layout-resizer-north').append($previewButtonsElt);
            $('.ui-layout-resizer-east').append($resizerDecorator).append($northTogglerElt).append($editorButtonsElt);
        }
        else {
            $('.ui-layout-resizer-south').append($resizerDecorator).append($previewButtonsElt).append($editorButtonsElt).append($northTogglerElt);
        }

        setPanelVisibility();
        setPreviewButtonsVisibility();

        eventMgr.onLayoutCreated(layout);
    }

    var $navbarElt;
    var $leftBtnElts;
    var $rightBtnElts;
    var $leftBtnDropdown;
    var $rightBtnDropdown;
    var marginWidth = 36 + 25 + 25;
    var titleWidth = 18 + 348;
    var leftButtonsWidth = 72 + 83 + 166 + 167 + 83;
    var rightButtonsWidth = 36 + 84 + 83;
    var rightButtonsDropdown = 42;
    function adjustWindow() {
        if(!window.viewerMode) {
            var maxWidth = $navbarElt.width() - 5;
            if(marginWidth + titleWidth + leftButtonsWidth + rightButtonsWidth > maxWidth) {
                $rightBtnDropdown.show().find('.dropdown-menu').append($rightBtnElts);
                if(marginWidth + titleWidth + leftButtonsWidth + rightButtonsDropdown > maxWidth) {
                    $leftBtnDropdown.show().find('.dropdown-menu').append($leftBtnElts);
                }
                else {
                    $leftBtnDropdown.hide().after($leftBtnElts);
                }
            }
            else {
                $leftBtnDropdown.hide().after($leftBtnElts);
                $rightBtnDropdown.hide().after($rightBtnElts);
            }
        }
        layout.resizeAll();
    }
    
    // Create the PageDown editor
    var editor;
    var $editorElt;
    var fileDesc;
    var documentContent;
    var UndoManager = require("ace/undomanager").UndoManager;
    core.initEditor = function(fileDescParam) {
        if(fileDesc !== undefined) {
            eventMgr.onFileClosed(fileDesc);
        }
        fileDesc = fileDescParam;
        documentContent = undefined;
        var initDocumentContent = fileDesc.content;

        if(aceEditor !== undefined) {
            aceEditor.setValue(initDocumentContent, -1);
            aceEditor.getSession().setUndoManager(new UndoManager());
        }
        else {
            $editorElt.val(initDocumentContent);
        }

        if(editor !== undefined) {
            // If the editor is already created
            aceEditor && aceEditor.selection.setSelectionRange(fileDesc.editorSelectRange);
            aceEditor ? aceEditor.focus() : $editorElt.focus();
            editor.refreshPreview();
            return;
        }

        var $previewContainerElt = $(".preview-container");

        if(window.lightMode) {
            // Store editor scrollTop on scroll event
            $editorElt.scroll(function() {
                if(documentContent !== undefined) {
                    fileDesc.editorScrollTop = $(this).scrollTop();
                }
            });
            // Store editor selection on change
            $editorElt.bind("keyup mouseup", function() {
                if(documentContent !== undefined) {
                    fileDesc.editorStart = this.selectionStart;
                    fileDesc.editorEnd = this.selectionEnd;
                }
            });
        }
        else {
            // Store editor scrollTop on scroll event
            var saveScroll = _.debounce(function() {
                if(documentContent !== undefined) {
                    fileDesc.editorScrollTop = aceEditor.renderer.getScrollTop();
                }
            }, 100);
            aceEditor.session.on('changeScrollTop', saveScroll);
            // Store editor selection on change
            var saveSelection = _.debounce(function() {
                if(documentContent !== undefined) {
                    fileDesc.editorSelectRange = aceEditor.getSelectionRange();
                }
            }, 100);
            aceEditor.session.selection.on('changeSelection', saveSelection);
            aceEditor.session.selection.on('changeCursor', saveSelection);
        }
        // Store preview scrollTop on scroll event
        $previewContainerElt.scroll(function() {
            if(documentContent !== undefined) {
                fileDesc.previewScrollTop = $previewContainerElt.scrollTop();
            }
        });

        // Create the converter and the editor
        var converter = new Markdown.Converter();
        var options = {
            _DoItalicsAndBold: function(text) {
                // Restore original markdown implementation
                text = text.replace(/(\*\*|__)(?=\S)(.+?[*_]*)(?=\S)\1/g,
                "<strong>$2</strong>");
                text = text.replace(/(\*|_)(?=\S)(.+?)(?=\S)\1/g,
                "<em>$2</em>");
                return text;
            }
        };
        converter.setOptions(options);

        function checkDocumentChanges() {
            var newDocumentContent = $editorElt.val();
            if(aceEditor !== undefined) {
                newDocumentContent = aceEditor.getValue();
            }
            if(documentContent !== undefined && documentContent != newDocumentContent) {
                fileDesc.content = newDocumentContent;
                eventMgr.onContentChanged(fileDesc);
            }
            documentContent = newDocumentContent;
        }
        
        var previewWrapper;
        if(window.lightMode) {
            editor = new Markdown.EditorLight(converter);
        }
        else {
            editor = new Markdown.Editor(converter, undefined, {
                keyStrokes: shortcutMgr.getPagedownKeyStrokes()
            });
        }
        // Custom insert link dialog
        editor.hooks.set("insertLinkDialog", function(callback) {
            core.insertLinkCallback = callback;
            utils.resetModalInputs();
            $(".modal-insert-link").modal();
            return true;
        });
        // Custom insert image dialog
        editor.hooks.set("insertImageDialog", function(callback) {
            core.insertLinkCallback = callback;
            if(core.catchModal) {
                return true;
            }
            utils.resetModalInputs();
            $(".modal-insert-image").modal();
            return true;
        });
            
        if(settings.lazyRendering === true) {
            previewWrapper = function(makePreview) {
                var debouncedMakePreview = _.debounce(makePreview, 500);
                return function() {
                    if(documentContent === undefined) {
                        makePreview();
                        eventMgr.onFileOpen(fileDesc);
                        $previewContainerElt.scrollTop(fileDesc.previewScrollTop);
                        if(window.lightMode) {
                            $editorElt.scrollTop(fileDesc.editorScrollTop);
                        }
                        else {
                            _.defer(function() {
                                aceEditor.renderer.scrollToY(fileDesc.editorScrollTop);
                            });
                        }
                    }
                    else {
                        debouncedMakePreview();
                    }
                    checkDocumentChanges();
                };
            };
        }
        else {
            previewWrapper = function(makePreview) {
                return function() {
                    makePreview();
                    if(documentContent === undefined) {
                        eventMgr.onFileOpen(fileDesc);
                        $previewContainerElt.scrollTop(fileDesc.previewScrollTop);
                        if(window.lightMode) {
                            $editorElt.scrollTop(fileDesc.editorScrollTop);
                        }
                        else {
                            _.defer(function() {
                                aceEditor.renderer.scrollToY(fileDesc.editorScrollTop);
                            });
                        }
                    }
                    checkDocumentChanges();
                };
            };
        }

        eventMgr.onPagedownConfigure(editor);
        editor.hooks.chain("onPreviewRefresh", eventMgr.onAsyncPreview);
        if(window.lightMode) {
            editor.run(previewWrapper);
            editor.undoManager.reinit(initDocumentContent, fileDesc.editorStart, fileDesc.editorEnd, fileDesc.editorScrollTop);
            $editorElt.focus();
        }
        else {
            editor.run(aceEditor, previewWrapper);
            aceEditor.selection.setSelectionRange(fileDesc.editorSelectRange);
            aceEditor.focus();
        }

        // Hide default buttons
        $(".wmd-button-row li").addClass("btn btn-success").css("left", 0).find("span").hide();

        // Add customized buttons
        var $btnGroupElt = $('.wmd-button-group1');
        $("#wmd-bold-button").append($('<i class="icon-bold">')).appendTo($btnGroupElt);
        $("#wmd-italic-button").append($('<i class="icon-italic">')).appendTo($btnGroupElt);
        $btnGroupElt = $('.wmd-button-group2');
        $("#wmd-link-button").append($('<i class="icon-globe">')).appendTo($btnGroupElt);
        $("#wmd-quote-button").append($('<i class="icon-indent-right">')).appendTo($btnGroupElt);
        $("#wmd-code-button").append($('<i class="icon-code">')).appendTo($btnGroupElt);
        $("#wmd-image-button").append($('<i class="icon-picture">')).appendTo($btnGroupElt);
        $btnGroupElt = $('.wmd-button-group3');
        $("#wmd-olist-button").append($('<i class="icon-list-numbered">')).appendTo($btnGroupElt);
        $("#wmd-ulist-button").append($('<i class="icon-list-bullet">')).appendTo($btnGroupElt);
        $("#wmd-heading-button").append($('<i class="icon-text-height">')).appendTo($btnGroupElt);
        $("#wmd-hr-button").append($('<i class="icon-ellipsis">')).appendTo($btnGroupElt);
        $btnGroupElt = $('.wmd-button-group4');
        $("#wmd-undo-button").append($('<i class="icon-reply">')).appendTo($btnGroupElt);
        $("#wmd-redo-button").append($('<i class="icon-forward">')).appendTo($btnGroupElt);
    };
    
    // Initialize multiple things and then fire eventMgr.onReady
    var isDocumentPanelShown = false;
    var isMenuPanelShown = false;
    core.onReady = function() {
        if(window.viewerMode === true) {
            document.body.innerHTML = bodyViewerHTML;
        }
        else {
            document.body.innerHTML = bodyIndexHTML;
        }
        $navbarElt = $('.navbar');
        $leftBtnElts = $navbarElt.find('.left-buttons');
        $rightBtnElts = $navbarElt.find('.right-buttons');
        $leftBtnDropdown = $navbarElt.find('.left-buttons-dropdown');
        $rightBtnDropdown = $navbarElt.find('.right-buttons-dropdown');
        $(window).bind("resize", adjustWindow);
        
        // Initialize utils library
        utils.init();
        
        // Populate shortcuts in settings
        shortcutMgr.addSettingEntries();
        
        // Hide shortcuts settings if light mode
        if(window.lightMode) {
            $('.tab-settings-shortcuts').hide();
        }

        // listen to online/offline events
        $(window).on('offline', core.setOffline);
        $(window).on('online', setOnline);
        if(navigator.onLine === false) {
            core.setOffline();
        }

        // Detect user activity
        $(document).mousemove(setUserActive).keypress(setUserActive);

        // Avoid dropdown to close when clicking on submenu
        $(".dropdown-submenu > a").click(function(e) {
            e.stopPropagation();
        });

        $menuPanelElt = $('.menu-panel').collapse({
            toggle: false
        });
        var menuPanelBackdropElt;
        $menuPanelElt.on('show.bs.collapse', function(e) {
            if(e.target === $menuPanelElt[0]) {
                isMenuPanelShown = true;
                menuPanelBackdropElt = utils.createBackdrop('collapse', '.menu-panel');
                $menuPanelElt.addClass('move-to-front');
                // To avoid opening delay
                setTimeout(function() {
                    $menuPanelElt.trigger($.support.transition.end);
                }, 50);
            }
            else {
                // Close all open sub-menus when one submenu opens
                $menuPanelElt.find('.in').collapse('hide');
            }
        }).on('hide.bs.collapse', function(e) {
            if(e.target === $menuPanelElt[0]) {
                isMenuPanelShown = false;
                menuPanelBackdropElt.parentNode.removeChild(menuPanelBackdropElt);
                $menuPanelElt.removeClass('move-to-front');
                aceEditor ? aceEditor.focus() : $editorElt.focus();
            }
        }).on('hidden.bs.collapse', function(e) {
            if(e.target === $menuPanelElt[0]) {
                // Close all open sub-menus when menu panel is closed
                $menuPanelElt.find('.in').collapse('hide');
            }
        });

        $documentPanelElt = $('.document-panel').collapse({
            toggle: false
        });
        var documentPanelBackdropElt;
        $documentPanelElt.on('show.bs.collapse', function(e) {
            if(e.target === $documentPanelElt[0]) {
                isDocumentPanelShown = true;
                documentPanelBackdropElt = utils.createBackdrop('collapse', '.document-panel');
                $documentPanelElt.addClass('move-to-front');
                // To avoid opening delay
                setTimeout(function() {
                    $documentPanelElt.trigger($.support.transition.end);
                }, 50);
            }
            else {
                // Close all open sub-menus when one submenu opens
                $documentPanelElt.find('.in').collapse('hide');
            }
        }).on('hide.bs.collapse', function(e) {
            if(e.target === $documentPanelElt[0]) {
                isDocumentPanelShown = false;
                documentPanelBackdropElt.parentNode.removeChild(documentPanelBackdropElt);
                $documentPanelElt.removeClass('move-to-front');
                aceEditor ? aceEditor.focus() : $editorElt.focus();
            }
        }).on('hidden.bs.collapse', function(e) {
            if(e.target === $documentPanelElt[0]) {
                // Close all open sub-menus when menu panel is closed
                $documentPanelElt.find('.in').collapse('hide');
            }
        });

        // Editor
        if(window.lightMode) {
            // In light mode, we replace ACE with a textarea
            $('#wmd-input').replaceWith(function() {
                return $('<textarea id="wmd-input">').addClass(this.className).addClass('form-control');
            });
        }
        
        $editorElt = $("#wmd-input, .textarea-helper").css({
            // Apply editor font
            "font-family": settings.editorFontFamily,
            "font-size": settings.editorFontSize + "px",
            "line-height": Math.round(settings.editorFontSize * (20 / 12)) + "px"
        });
        
        if(!window.lightMode) {
            // ACE editor
            createAceEditor();

            // Editor's element
            $editorElt.find('.ace_content').css({
                "background-size": "64px " + Math.round(settings.editorFontSize * (20 / 12)) + "px",
            });
        }

        // UI layout
        createLayout();

        // Do periodic tasks
        intervalId = window.setInterval(function() {
            utils.updateCurrentTime();
            checkWindowUnique();
            if(isUserActive() === true || window.viewerMode === true) {
                eventMgr.onPeriodicRun();
                checkOnline();
            }
        }, 1000);

        eventMgr.onReady();
        // Adjust the layout after the dom has changed
        adjustWindow();
    };

    // Other initialization that are not prioritary
    eventMgr.addListener("onReady", function() {
        
        // In vertical mode, we have to offset the editor buttons otherwise they hide the editor buttons
        if(!window.viewerMode && settings.layoutOrientation == "vertical") {
            $previewButtonsElt.css('right', parseInt($previewButtonsElt.css('right')) + $editorButtonsElt.width());
        }

        var isModalShown = false;
        $('.modal').on('show.bs.modal', function() {
            // Close panel if open
            $menuPanelElt.collapse('hide');
            $documentPanelElt.collapse('hide');
            isModalShown = true;
        }).on('shown.bs.modal', function() {
            var $elt = $(this);
            setTimeout(function() {
                // When modal opens focus on the first button
                $elt.find('.btn:first').focus();
                // Or on the first link if any
                $elt.find('button:first').focus();
                // Or on the first input if any
                $elt.find("input:enabled:visible:first").focus();
            }, 50);
        }).on('hidden.bs.modal', function() {
            // Focus on the editor when modal is gone
            isModalShown = false;
            aceEditor ? aceEditor.focus() : $editorElt.focus();
            // Revert to current theme when settings modal is closed
            applyTheme(window.theme);
        }).keyup(function(e) {
            // Handle enter key in modals
            if(e.which == 13 && !$(e.target).is("textarea")) {
                $(this).find(".modal-footer a:last").click();
            }
        });
        
        // Hide menu panel when clicking 'Save as' button
        $('.collapse-save-as a').click(function() {
            $menuPanelElt.collapse('hide');
        });

        // Configure Mousetrap
        mousetrap.stopCallback = function(e, element) {
            return isMenuPanelShown || isDocumentPanelShown || isModalShown || $(element).is("input, select, textarea:not(.ace_text-input)");
        };

        // Click events on "insert link" and "insert image" dialog buttons
        $(".action-insert-link").click(function(e) {
            var value = utils.getInputTextValue($("#input-insert-link"), e);
            if(value !== undefined) {
                core.insertLinkCallback(value);
                core.insertLinkCallback = undefined;
            }
        });
        $(".action-insert-image").click(function(e) {
            var value = utils.getInputTextValue($("#input-insert-image"), e);
            if(value !== undefined) {
                core.insertLinkCallback(value);
                core.insertLinkCallback = undefined;
            }
        });

        // Hide events on "insert link" and "insert image" dialogs
        $(".modal-insert-link, .modal-insert-image").on('hidden.bs.modal', function() {
            if(core.insertLinkCallback !== undefined) {
                core.insertLinkCallback(null);
                core.insertLinkCallback = undefined;
            }
        });

        // Settings loading/saving
        $(".action-load-settings").click(function() {
            loadSettings();
        });
        $(".action-apply-settings").click(function(e) {
            saveSettings(e);
            if(!e.isPropagationStopped()) {
                window.location.reload();
            }
        });

        // Hot theme switcher in the settings
        var currentTheme = window.theme;
        function applyTheme(theme) {
            theme = theme || 'default';
            if(currentTheme != theme) {
                var themeModule = "less!themes/" + theme;
                if(window.baseDir.indexOf('-min') !== -1) {
                    themeModule = "css!themes/" + theme;
                }
                // Undefine the module in RequireJS
                requirejs.undef(themeModule);
                // Then reload the style
                require([
                    themeModule
                ]);
                currentTheme = theme;
            }
        }
        $themeInputElt = $("#input-settings-theme");
        $themeInputElt.on("change", function() {
            applyTheme(this.value);
        });

        // Import docs and settings
        $(".action-import-docs-settings").click(function() {
            $("#input-file-import-docs-settings").click();
        });
        var newstorage;
        $("#input-file-import-docs-settings").change(function(evt) {
            var files = (evt.dataTransfer || evt.target).files;
            $(".modal-settings").modal("hide");
            _.each(files, function(file) {
                var reader = new FileReader();
                reader.onload = (function(importedFile) {
                    return function(e) {
                        try {
                            newstorage = JSON.parse(e.target.result);
                            // Compare storage version
                            var newVersion = parseInt(newstorage.version.match(/^v(\d+)$/)[1], 10);
                            var currentVersion = parseInt(storage.version.match(/^v(\d+)$/)[1], 10);
                            if(newVersion > currentVersion) {
                                // We manage storage upgrade, not downgrade
                                eventMgr.onError("Incompatible version. Please upgrade StackEdit.");
                            } else {
                                $('.modal-import-docs-settings').modal('show');
                            }
                        }
                        catch(exc) {
                            eventMgr.onError("Wrong format: " + importedFile.name);
                        }
                        $("#input-file-import-docs-settings").val('');
                    };
                })(file);
                reader.readAsText(file);
            });
        });
        $(".action-import-docs-settings-confirm").click(function() {
            storage.clear();
            var allowedKeys = /^file\.|^focusMode$|^folder\.|^publish\.|^settings$|^sync\.|^google\.|^themeV3$|^mode$|^version$|^welcomeTour$/;
            _.each(newstorage, function(value, key) {
                if(allowedKeys.test(key)) {
                    storage[key] = value;
                }
            });
            window.location.reload();
        });
        // Export settings
        $(".action-export-docs-settings").click(function() {
            utils.saveAs(JSON.stringify(storage), "StackEdit local storage.json");
        });

        $(".action-default-settings").click(function() {
            storage.removeItem("settings");
            storage.removeItem("theme");
            if(!settings.dropboxFullAccess) {
                storage.removeItem('dropbox.lastChangeId');
            }
            window.location.reload();
        });

        $(".action-app-reset").click(function() {
            storage.clear();
            window.location.reload();
        });

        // Reset inputs
        $(".action-reset-input").click(function() {
            utils.resetModalInputs();
        });

        // Tooltips
        var openedTooltip;
        function createTooltip(selector, content) {
            _.each(document.querySelectorAll(selector), function(tooltipElt) {
                var $tooltipElt = $(tooltipElt);
                $tooltipElt.tooltip({
                    html: true,
                    container: $tooltipElt.parents('.modal-content'),
                    placement: 'right',
                    trigger: 'manual',
                    title: content
                }).click(function() {
                    var elt = this;
                    if(openedTooltip && openedTooltip[0] === elt) {
                        return;
                    }
                    _.defer(function() {
                        $(document).on("click.close-tooltip", function() {
                            openedTooltip && openedTooltip.tooltip('hide');
                            openedTooltip = undefined;
                            $(document).off("click.close-tooltip");
                        });
                        openedTooltip = $(elt).tooltip('show');
                    });
                });
            });
        }
        
        createTooltip(".tooltip-lazy-rendering", 'Disable preview rendering while typing in order to offload CPU. Refresh preview after 500 ms of inactivity.');
        createTooltip(".tooltip-default-content", [
            'Thanks for supporting StackEdit by adding a backlink in your documents!<br/><br/>',
            '<b class="text-danger">NOTE: Backlinks in Stack Exchange Q/A are not welcome.</b>'
        ].join(''));
        createTooltip(".tooltip-usercustom-extension", settingsUserCustomExtensionTooltipHTML);
        createTooltip(".tooltip-template", settingsTemplateTooltipHTML);

        // Avoid dropdown panels to close on click
        $("div.dropdown-menu").click(function(e) {
            e.stopPropagation();
        });

        // Non unique window dialog
        $('.modal-non-unique').modal({
            backdrop: "static",
            keyboard: false,
            show: false
        });
        
        // Load images
        _.each(document.querySelectorAll('img'), function(imgElt) {
            var $imgElt = $(imgElt);
            var src = $imgElt.data('stackeditSrc');
            if(src) {
                $imgElt.attr('src', window.baseDir + '/img/' + src);
            }
        });

        if(window.viewerMode === false) {
            // Load theme list
            var themeOptions = _.reduce(constants.THEME_LIST, function(themeOptions, name, value) {
                return themeOptions + '<option value="' + value + '">' + name + '</option>';
            }, '');
            document.getElementById('input-settings-theme').innerHTML = themeOptions;
        }
    });

    return core;
});
