define([
    "jquery",
    "underscore",
    "crel",
    "utils",
    "settings",
    "eventMgr",
    "mousetrap",
    "text!html/bodyIndex.html",
    "text!html/bodyViewer.html",
    "text!html/settingsTemplateTooltip.html",
    "text!html/settingsUserCustomExtensionTooltip.html",
    "storage",
    "config",
    "libs/layout",
    "libs/Markdown.Editor"
], function($, _, crel, utils, settings, eventMgr, mousetrap, bodyIndexHTML, bodyViewerHTML, settingsTemplateTooltipHTML, settingsUserCustomExtensionTooltipHTML) {

    var core = {};

    // Used for periodic tasks
    var intervalId = undefined;

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
        if(userActive === true && utils.currentTime - userLastActivity > USER_IDLE_THRESHOLD) {
            userActive = false;
        }
        return userActive && windowUnique;
    }

    // Used to only have 1 window of the application in the same browser
    var windowId = undefined;
    function checkWindowUnique() {
        if(isUserReal === false || windowUnique === false) {
            return;
        }
        if(windowId === undefined) {
            windowId = utils.randomString();
            localStorage["frontWindowId"] = windowId;
        }
        var frontWindowId = localStorage["frontWindowId"];
        if(frontWindowId != windowId) {
            windowUnique = false;
            if(intervalId !== undefined) {
                clearInterval(intervalId);
            }
            $(".modal").modal("hide");
            $('.modal-non-unique').modal({
                backdrop: "static",
                keyboard: false
            });
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
        if(isOffline === true && navigator.onLine === true && offlineTime + CHECK_ONLINE_PERIOD < utils.currentTime) {
            offlineTime = utils.currentTime;
            // Try to download anything to test the connection
            $.ajax({
                url: "//www.google.com/jsapi",
                timeout: AJAX_TIMEOUT,
                dataType: "script"
            }).done(function() {
                setOnline();
            });
        }
    }

    // Load settings in settings dialog
    var $themeInputElt = undefined;
    function loadSettings() {

        // Layout orientation
        utils.setInputRadio("radio-layout-orientation", settings.layoutOrientation);
        // Theme
        utils.setInputValue($themeInputElt, theme);
        $themeInputElt.change();
        // Lazy rendering
        utils.setInputChecked("#input-settings-lazy-rendering", settings.lazyRendering);
        // Editor font family
        utils.setInputValue("#input-settings-editor-font-family", settings.editorFontFamily);
        // Editor font size
        utils.setInputValue("#input-settings-editor-font-size", settings.editorFontSize);
        // Default content
        utils.setInputValue("#textarea-settings-default-content", settings.defaultContent);
        // Commit message
        utils.setInputValue("#input-settings-publish-commit-msg", settings.commitMsg);
        // Template
        utils.setInputValue("#textarea-settings-publish-template", settings.template);
        // SSH proxy
        utils.setInputValue("#input-settings-ssh-proxy", settings.sshProxy);

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
        // Default content
        newSettings.defaultContent = utils.getInputValue("#textarea-settings-default-content");
        // Commit message
        newSettings.commitMsg = utils.getInputTextValue("#input-settings-publish-commit-msg", event);
        // Template
        newSettings.template = utils.getInputTextValue("#textarea-settings-publish-template", event);
        // SSH proxy
        newSettings.sshProxy = utils.checkUrl(utils.getInputTextValue("#input-settings-ssh-proxy", event), true);

        // Save extension settings
        newSettings.extensionSettings = {};
        eventMgr.onSaveSettings(newSettings.extensionSettings, event);

        if(!event.isPropagationStopped()) {
            $.extend(settings, newSettings);
            localStorage.settings = JSON.stringify(settings);
            localStorage.theme = theme;
        }
    }

    // Set the panels visibility
    var layout = undefined;
    var $menuPanelElt = undefined;
    var $documentPanelElt = undefined;
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
    var $previewButtonsElt = undefined;
    function setPreviewButtonsVisibility(forceHide) {
        if(forceHide === true || layout.state.east.isClosed) {
            $previewButtonsElt.hide();
        }
        else {
            $previewButtonsElt.show();
        }
    }

    // Create the layout
    function createLayout() {
        var layoutGlobalConfig = {
            closable: true,
            resizable: false,
            slidable: false,
            livePaneResizing: true,
            enableCursorHotkey: false,
            resizerDblClickToggle: false,
            north__spacing_open: 6,
            north__spacing_closed: 6,
            spacing_open: 35,
            spacing_closed: 35,
            togglerLength_open: 60,
            togglerLength_closed: 60,
            stateManagement__enabled: false,
            center__minWidth: 200,
            center__minHeight: 200,
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
        };
        eventMgr.onLayoutConfigure(layoutGlobalConfig);
        if(settings.layoutOrientation == "horizontal") {
            $(".ui-layout-south").remove();
            $(".preview-container").html('<div id="preview-contents"><div id="wmd-preview" class="preview-content"></div></div>');
            layout = $('body').layout($.extend(layoutGlobalConfig, {
                east__resizable: true,
                east__size: .5,
                east__minSize: 250
            }));
        }
        else if(settings.layoutOrientation == "vertical") {
            $(".ui-layout-east").remove();
            $(".preview-container").html('<div id="preview-contents"><div id="wmd-preview" class="preview-content"></div></div>');
            layout = $('body').layout($.extend(layoutGlobalConfig, {
                south__resizable: true,
                south__size: .5,
                south__minSize: 200
            }));
        }
        $(".navbar").click(function() {
            layout.allowOverflow('north');
        });
        $(".ui-layout-toggler-south").addClass("btn btn-info").html('<i class="icon-none"></i>');
        $(".ui-layout-toggler-east").addClass("btn btn-info").html('<i class="icon-none"></i>');
        var $northTogglerElt = $(".ui-layout-toggler-north").addClass("btn btn-info").html('<i class="icon-none"></i>');

        // We attach the preview buttons to the UI layout resizer in order to
        // have fixed position
        // We also move the north toggler to the east or south resizer as the
        // north resizer is very small
        $previewButtonsElt = $('<div class="extension-preview-buttons">');
        if(settings.layoutOrientation == "horizontal") {
            $('.ui-layout-resizer-north').append($previewButtonsElt);
            $('.ui-layout-resizer-east').append($northTogglerElt);
        }
        else {
            $('.ui-layout-resizer-south').append($previewButtonsElt).append($northTogglerElt);
        }

        setPanelVisibility();
        setPreviewButtonsVisibility();

        eventMgr.onLayoutCreated(layout);
    }

    // Create the PageDown editor
    var editor = undefined;
    var fileDesc = undefined;
    var documentContent = undefined;
    var $editorElt = undefined;
    core.initEditor = function(fileDescParam) {
        if(fileDesc !== undefined) {
            eventMgr.onFileClosed(fileDesc);
        }
        fileDesc = fileDescParam;
        documentContent = undefined;
        var initDocumentContent = fileDesc.content;
        $editorElt.val(initDocumentContent);
        if(editor !== undefined) {
            // If the editor is already created
            editor.undoManager.reinit(initDocumentContent, fileDesc.editorStart, fileDesc.editorEnd, fileDesc.editorScrollTop);
            eventMgr.onFileOpen(fileDesc);
            editor.refreshPreview();
            return;
        }
        var $previewContainerElt = $(".preview-container");

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
        // Store preview scrollTop on scroll event
        $previewContainerElt.scroll(function() {
            if(documentContent !== undefined) {
                fileDesc.previewScrollTop = $(this).scrollTop();
            }
        });

        // Create the converter and the editor
        var converter = new Markdown.Converter();
        // Parse MD sections for extensions
        converter.hooks.chain("preConversion", function(text) {
            eventMgr.previewStartTime = new Date();
            var tmpText = text + "\n\n";
            var sectionList = [], offset = 0;
            // Look for titles (excluding gfm blocs)
            tmpText.replace(/^```.*\n[\s\S]*?\n```|(^.+[ \t]*\n=+[ \t]*\n+|^.+[ \t]*\n-+[ \t]*\n+|^\#{1,6}[ \t]*.+?[ \t]*\#*\n+)/gm, function(match, title, matchOffset) {
                if(title) {
                    // We just found a title which means end of the previous
                    // section
                    // Exclude last \n of the section
                    sectionList.push(tmpText.substring(offset, matchOffset));
                    offset = matchOffset;
                }
                return "";
            });
            // Last section
            sectionList.push(tmpText.substring(offset, text.length));
            eventMgr.onSectionsCreated(sectionList);
            return text;
        });
        editor = new Markdown.Editor(converter);
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

        function checkDocumentChanges() {
            var newDocumentContent = $editorElt.val();
            if(documentContent !== undefined && documentContent != newDocumentContent) {
                fileDesc.content = newDocumentContent;
                eventMgr.onContentChanged(fileDesc);
            }
            documentContent = newDocumentContent;
        }
        var previewWrapper;
        if(settings.lazyRendering === true) {
            previewWrapper = function(makePreview) {
                var debouncedMakePreview = _.debounce(makePreview, 500);
                return function() {
                    if(documentContent === undefined) {
                        makePreview();
                        $editorElt.scrollTop(fileDesc.editorScrollTop);
                        $previewContainerElt.scrollTop(fileDesc.previewScrollTop);
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
                        $previewContainerElt.scrollTop(fileDesc.previewScrollTop);
                    }
                    checkDocumentChanges();
                };
            };
        }
        eventMgr.onEditorConfigure(editor);
        editor.hooks.chain("onPreviewRefresh", eventMgr.onAsyncPreview);
        editor.run(previewWrapper);
        editor.undoManager.reinit(initDocumentContent, fileDesc.editorStart, fileDesc.editorEnd, fileDesc.editorScrollTop);

        // Hide default buttons
        $(".wmd-button-row li").addClass("btn btn-success").css("left", 0).find("span").hide();

        // Add customized buttons
        var $btnGroupElt = $('.wmd-button-group1');
        $("#wmd-bold-button").append($('<i class="icon-bold">')).appendTo($btnGroupElt);
        $("#wmd-italic-button").append($('<i class="icon-italic">')).appendTo($btnGroupElt);
        var $btnGroupElt = $('.wmd-button-group2');
        $("#wmd-link-button").append($('<i class="icon-globe">')).appendTo($btnGroupElt);
        $("#wmd-quote-button").append($('<i class="icon-indent-right">')).appendTo($btnGroupElt);
        $("#wmd-code-button").append($('<i class="icon-code">')).appendTo($btnGroupElt);
        $("#wmd-image-button").append($('<i class="icon-picture">')).appendTo($btnGroupElt);
        var $btnGroupElt = $('.wmd-button-group3');
        $("#wmd-olist-button").append($('<i class="icon-list-numbered">')).appendTo($btnGroupElt);
        $("#wmd-ulist-button").append($('<i class="icon-list-bullet">')).appendTo($btnGroupElt);
        $("#wmd-heading-button").append($('<i class="icon-text-height">')).appendTo($btnGroupElt);
        $("#wmd-hr-button").append($('<i class="icon-ellipsis">')).appendTo($btnGroupElt);
        var $btnGroupElt = $('.wmd-button-group4');
        $("#wmd-undo-button").append($('<i class="icon-reply">')).appendTo($btnGroupElt);
        $("#wmd-redo-button").append($('<i class="icon-forward">')).appendTo($btnGroupElt);

        eventMgr.onFileOpen(fileDesc);
    };

    // Used to lock the editor from the user interaction during asynchronous
    // tasks
    var uiLocked = false;
    core.lockUI = function(param) {
        uiLocked = param;
        $editorElt.prop("disabled", uiLocked);
        $(".navbar-inner .btn").toggleClass("blocked", uiLocked);
        if(uiLocked) {
            $(".lock-ui").removeClass("hide");
        }
        else {
            $(".lock-ui").addClass("hide");
        }
    };

    // Initialize multiple things and then fire eventMgr.onReady
    var isDocumentPanelShown = false;
    var isMenuPanelShown = false;
    core.onReady = function() {
        if(viewerMode === true) {
            document.body.innerHTML = bodyViewerHTML;
        }
        else {
            document.body.innerHTML = bodyIndexHTML;
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
        var menuPanelBackdropElt = undefined;
        $menuPanelElt.on('show.bs.collapse', function(e) {
            if(e.target === $menuPanelElt[0]) {
                isMenuPanelShown = true;
                menuPanelBackdropElt = utils.createBackdrop('collapse', '.menu-panel');
                $menuPanelElt.addClass('move-to-front');
            }
            else {
                // Close all open sub-menus when one submenu opens
                $menuPanelElt.find('.in').collapse('hide');
            }
        }).on('hide.bs.collapse', function(e) {
            if(e.target === $menuPanelElt[0]) {
                isMenuPanelShown = false;
                menuPanelBackdropElt.remove();
                $menuPanelElt.removeClass('move-to-front');
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
        var documentPanelBackdropElt = undefined;
        $documentPanelElt.on('show.bs.collapse', function(e) {
            if(e.target === $documentPanelElt[0]) {
                isDocumentPanelShown = true;
                documentPanelBackdropElt = utils.createBackdrop('collapse', '.document-panel');
                $documentPanelElt.addClass('move-to-front');
            }
            else {
                // Close all open sub-menus when one submenu opens
                $documentPanelElt.find('.in').collapse('hide');
            }
        }).on('hide.bs.collapse', function(e) {
            if(e.target === $documentPanelElt[0]) {
                isDocumentPanelShown = false;
                documentPanelBackdropElt.remove();
                $documentPanelElt.removeClass('move-to-front');
            }
        }).on('hidden.bs.collapse', function(e) {
            if(e.target === $documentPanelElt[0]) {
                // Close all open sub-menus when menu panel is closed
                $documentPanelElt.find('.in').collapse('hide');
            }
        });

        // UI layout
        createLayout();
        $editorElt = $("#wmd-input");

        // Editor's textarea
        $("#wmd-input, #md-section-helper").css({
            // Apply editor font
            "font-family": settings.editorFontFamily,
            "font-size": settings.editorFontSize + "px",
            "line-height": Math.round(settings.editorFontSize * (20 / 14)) + "px"
        });

        // Handle tab key
        $editorElt.keydown(function(e) {
            if(e.keyCode === 9) {
                var value = $editorElt.val();
                var start = this.selectionStart;
                var end = this.selectionEnd;
                $(this).val(value.substring(0, start) + "\t" + value.substring(end));
                this.selectionStart = this.selectionEnd = start + 1;
                e.preventDefault();
            }
        });

        // Do periodic tasks
        intervalId = window.setInterval(function() {
            utils.updateCurrentTime();
            checkWindowUnique();
            if(isUserActive() === true || viewerMode === true) {
                eventMgr.onPeriodicRun();
                checkOnline();
            }
        }, 1000);

        eventMgr.onReady();
    };

    // Other initialization that are not prioritary
    eventMgr.addListener("onReady", function() {

        var isModalShown = false;
        $('.modal').on('show.bs.modal', function() {
            // Close panel if open
            $menuPanelElt.collapse('hide');
            $documentPanelElt.collapse('hide');
            isModalShown = true;
        }).on('shown.bs.modal', function() {
            // Focus on the first input when modal opens
            _.defer(function(elt) {
                elt.find("input:enabled:visible:first").focus();
            }, $(this));
        }).on('hidden.bs.modal', function() {
            // Focus on the editor when modal is gone
            isModalShown = false;
            $editorElt.focus();
        }).keyup(function(e) {
            // Handle enter key in modals
            if(e.which == 13 && !$(e.target).is("textarea")) {
                $(this).find(".modal-footer a:last").click();
            }
        });

        // Configure Mousetrap
        mousetrap.stopCallback = function(e, element, combo) {
            return uiLocked || isMenuPanelShown || isDocumentPanelShown || isModalShown || $(element).is("input, select, textarea:not(#wmd-input)");
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
        var currentTheme = theme;
        function applyTheme(theme) {
            theme = theme || 'default';
            if(currentTheme != theme) {
                var themeModule = "less!styles/" + theme;
                // Undefine the module in RequireJS
                requirejs.undef(themeModule);
                // Then reload the style
                require([
                    themeModule + ".less"
                ]);
                currentTheme = theme;
            }
        }
        $themeInputElt = $("#input-settings-theme");
        $themeInputElt.on("change", function() {
            applyTheme(this.value);
        });
        $(".action-apply-theme").click("change", function() {
            applyTheme(localStorage.theme);
        });

        // Import settings
        $(".action-import-settings").click(function(e) {
            $("#input-file-import-settings").click();
        });
        $("#input-file-import-settings").change(function(evt) {
            var files = (evt.dataTransfer || evt.target).files;
            $(".modal-settings").modal("hide");
            _.each(files, function(file) {
                var reader = new FileReader();
                reader.onload = (function(importedFile) {
                    return function(e) {
                        var content = e.target.result;
                        try {
                            JSON.parse(content);
                        }
                        catch(e) {
                            eventMgr.onError(importedFile.name + " is not a valid JSON file.");
                            return;
                        }
                        localStorage.settings = content;
                        window.location.reload();
                    };
                })(file);
                var blob = file.slice(0, IMPORT_FILE_MAX_CONTENT_SIZE);
                reader.readAsText(blob);
            });
        });
        // Export settings
        $(".action-export-settings").click(function(e) {
            utils.saveAs(JSON.stringify(settings), "StackEdit Settings.json");
        });

        $(".action-default-settings").click(function() {
            localStorage.removeItem("settings");
            localStorage.removeItem("theme");
            window.location.reload();
        });

        $(".action-app-reset").click(function() {
            localStorage.clear();
            window.location.reload();
        });

        // Reset inputs
        $(".action-reset-input").click(function() {
            utils.resetModalInputs();
        });

        // Tooltips
        $(".tooltip-lazy-rendering").tooltip({
            container: '.modal-settings',
            placement: 'right',
            trigger: 'hover',
            title: 'Disable preview rendering while typing in order to offload CPU. Refresh preview after 500 ms of inactivity.'
        });
        $(".tooltip-default-content").tooltip({
            html: true,
            container: '.modal-settings',
            placement: 'right',
            trigger: 'hover',
            title: 'Thanks for supporting StackEdit by adding a backlink in your documents!'
        });
        $(".tooltip-usercustom-extension").tooltip({
            html: true,
            container: '.modal-settings',
            placement: 'right',
            trigger: 'manual',
            title: settingsUserCustomExtensionTooltipHTML
        }).click(function(e) {
            $(this).tooltip('show');
            $(document).on("click.tooltip-usercustom-extension", function(e) {
                $(".tooltip-usercustom-extension").tooltip('hide');
                $(document).off("click.tooltip-usercustom-extension");
            });
            e.stopPropagation();
        });
        $(".tooltip-template").tooltip({
            html: true,
            container: '.modal-settings',
            placement: 'right',
            trigger: 'manual',
            title: settingsTemplateTooltipHTML
        }).click(function(e) {
            $(this).tooltip('show');
            $(document).on("click.tooltip-template", function(e) {
                $(".tooltip-template").tooltip('hide');
                $(document).off("click.tooltip-template");
            });
            e.stopPropagation();
        });

        // Avoid dropdown panels to close on click
        $("div.dropdown-menu").click(function(e) {
            e.stopPropagation();
        });

        if (viewerMode === false) {
            // Load theme list
            var themeOptions = _.reduce(THEME_LIST, function(themeOptions, name, value) {
                return themeOptions + '<option value="' + value + '">' + name + '</option>';
            }, '');
            document.getElementById('input-settings-theme').innerHTML = themeOptions;
        }

    });

    return core;
});
