/*globals Markdown, requirejs */
define([
    "jquery",
    "underscore",
    "crel",
    "editor",
    "layout",
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
    'pagedown',
], function($, _, crel, editor, layout, constants, utils, storage, settings, eventMgr, shortcutMgr, mousetrap, bodyIndexHTML, bodyViewerHTML, settingsTemplateTooltipHTML, settingsUserCustomExtensionTooltipHTML) {

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
        // Edit mode
        utils.setInputRadio("radio-settings-mode", settings.editMode);
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
        // Edit mode
        newSettings.editMode = utils.getInputRadio("radio-settings-mode");
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
            resizeWithWindow: false,
            north__spacing_open: 1,
            north__spacing_closed: 1,
            spacing_open: 32,
            spacing_closed: 32,
            togglerLength_open: 60,
            togglerLength_closed: 60,
            stateManagement__enabled: false,
            north__minSize: 49,
            center__minWidth: 250,
            center__minHeight: 180,
            east__onalert: function() {
                window.location.href = 'viewer';
            },
            south__onalert: function() {
                window.location.href = 'viewer';
            },
            fxSettings: {
                easing: "easeInOutQuad",
                duration: 350
            },
            onresize_end: function(paneName) {
                eventMgr.onLayoutResize(paneName);
            },
        };
        eventMgr.onLayoutConfigure(layoutGlobalConfig);
        if(settings.layoutOrientation == "horizontal") {
        }
        else if(settings.layoutOrientation == "vertical") {
        }

        //setPanelVisibility();
        //setPreviewButtonsVisibility();
        layout.init();
        eventMgr.onLayoutCreated(layout);
    }

    var $navbarElt;
    var $leftBtnElts;
    var $rightBtnElts;
    var $btnDropdown;
    var $titleContainer;
    var marginWidth = 18 * 2 + 25 + 25;
    var titleWidth = 18 + 348;
    var leftButtonsWidth = 18 * 5 + 80 + 160 + 160 + 40 + 80;
    var rightButtonsWidth = 18 + 80;
    var buttonsDropdownWidth = 40;
    function adjustWindow() {
        if(!window.viewerMode) {
            var maxWidth = $navbarElt.width();
            if(marginWidth + titleWidth + leftButtonsWidth + rightButtonsWidth > maxWidth) {
                $btnDropdown.show().find('.dropdown-menu').append($leftBtnElts);
                if(marginWidth + titleWidth + rightButtonsWidth + buttonsDropdownWidth > maxWidth) {
                    $btnDropdown.find('.dropdown-menu').append($rightBtnElts);
                }
                else {
                    $titleContainer.before($rightBtnElts);
                }
            }
            else {
                $btnDropdown.hide().after($leftBtnElts);
                $titleContainer.before($rightBtnElts);
            }
        }
    }

    // Create the PageDown editor
    var pagedownEditor;
    var $editorElt;
    var fileDesc;
    core.initEditor = function(fileDescParam) {
        if(fileDesc !== undefined) {
            eventMgr.onFileClosed(fileDesc);
        }
        fileDesc = fileDescParam;

        if(pagedownEditor !== undefined) {
            // If the editor is already created
            editor.undoMgr.init();
            return pagedownEditor.uiManager.setUndoRedoButtonStates();
        }

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
        pagedownEditor = new Markdown.Editor(converter, undefined, {
            undoManager: editor.undoMgr
        });

        // Custom insert link dialog
        pagedownEditor.hooks.set("insertLinkDialog", function(callback) {
            core.insertLinkCallback = callback;
            utils.resetModalInputs();
            $(".modal-insert-link").modal();
            return true;
        });
        // Custom insert image dialog
        pagedownEditor.hooks.set("insertImageDialog", function(callback) {
            core.insertLinkCallback = callback;
            if(core.catchModal) {
                return true;
            }
            utils.resetModalInputs();
            $(".modal-insert-image").modal();
            return true;
        });

        eventMgr.onPagedownConfigure(pagedownEditor);
        pagedownEditor.hooks.chain("onPreviewRefresh", eventMgr.onAsyncPreview);
        pagedownEditor.run();
        editor.undoMgr.init();

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
        $btnGroupElt = $('.wmd-button-group5');
        $("#wmd-undo-button").append($('<i class="icon-reply">')).appendTo($btnGroupElt);
        $("#wmd-redo-button").append($('<i class="icon-forward">')).appendTo($btnGroupElt);
    };

    // Initialize multiple things and then fire eventMgr.onReady
    var isDocumentPanelShown = false;
    var isMenuPanelShown = false;
    core.onReady = function() {
        // Add RTL class
        settings.editMode == 'rtl' && $(document.body).addClass('rtl');

        if(window.viewerMode === true) {
            document.body.innerHTML = bodyViewerHTML;
        }
        else {
            document.body.innerHTML = bodyIndexHTML;
        }

        $navbarElt = $('.navbar');
        $leftBtnElts = $navbarElt.find('.left-buttons');
        $rightBtnElts = $navbarElt.find('.right-buttons');
        $btnDropdown = $navbarElt.find('.buttons-dropdown');
        $titleContainer = $navbarElt.find('.title-container');
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

        // Create UI layout
        createLayout();

        // Editor
        $editorElt = $('#wmd-input');

        editor.init(document.querySelector('#wmd-input'), document.querySelector('.preview-container'));

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

        $('.modal').on('shown.bs.modal', function() {
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
            editor.focus();
            // Revert to current theme when settings modal is closed
            applyTheme(window.theme);
        }).keyup(function(e) {
            // Handle enter key in modals
            if(e.which == 13 && !$(e.target).is("textarea")) {
                $(this).find(".modal-footer a:last").click();
            }
        });

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
            var allowedKeys = /^file\.|^folder\.|^publish\.|^settings$|^sync\.|^google\.|^author\.|^themeV3$|^version$/;
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
                    utils.defer(function() {
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
