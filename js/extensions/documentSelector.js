define([
    "jquery",
    "underscore",
    "utils",
    "mousetrap",
    "fileSystem",
    "text!html/documentSelectorSettingsBloc.html",
], function($, _, utils, mousetrap, fileSystem, documentSelectorSettingsBlocHTML) {

    var documentSelector = {
        extensionId: "documentSelector",
        extensionName: "Document Selector",
        defaultConfig: {
            orderBy: "title",
            shortcutPrevious: "Ctrl+[",
            shortcutNext: "Ctrl+]"
        },
        settingsBloc: documentSelectorSettingsBlocHTML
    };

    documentSelector.onLoadSettings = function() {
        utils.setInputValue("#select-document-selector-orderby", documentSelector.config.sortBy);
        utils.setInputValue("#input-document-selector-shortcut-previous", documentSelector.config.shortcutPrevious);
        utils.setInputValue("#input-document-selector-shortcut-next", documentSelector.config.shortcutNext);
    };

    documentSelector.onSaveSettings = function(newConfig, event) {
        newConfig.orderBy = utils.getInputValue("#select-document-selector-orderby");
        newConfig.shortcutPrevious = utils.getInputTextValue("#input-document-selector-shortcut-previous", event);
        newConfig.shortcutNext = utils.getInputTextValue("#input-document-selector-shortcut-next", event);
    };

    var fileMgr = undefined;
    documentSelector.onFileMgrCreated = function(fileMgrParameter) {
        fileMgr = fileMgrParameter;
    };

    var liMap = undefined;
    var liArray = undefined;
    var sortFunction = undefined;
    var buildSelector = function() {

        function composeTitle(fileDesc) {
            var result = [];
            var syncAttributesList = _.values(fileDesc.syncLocations);
            var publishAttributesList = _.values(fileDesc.publishLocations);
            var attributesList = syncAttributesList.concat(publishAttributesList);
            _.chain(attributesList).sortBy(function(attributes) {
                return attributes.provider.providerId;
            }).each(function(attributes) {
                result.push('<i class="icon-' + attributes.provider.providerId + '"></i>');
            });
            result.push(" ");
            result.push(fileDesc.title);
            return result.join("");
        }

        liMap = {};
        $("#file-selector li:not(.stick)").empty();
        _.chain(fileSystem).sortBy(sortFunction).each(function(fileDesc) {
            var a = $('<a href="#">').html(composeTitle(fileDesc)).click(function() {
                if(!liMap[fileDesc.fileIndex].is(".disabled")) {
                    fileMgr.selectFile(fileDesc);
                }
                else {
                    $("#wmd-input").focus();
                }
            });
            var li = $("<li>").append(a);
            liMap[fileDesc.fileIndex] = li;
            $("#file-selector").append(li);
        });
        liArray = _.values(liMap);
    };

    var selectFileDesc = undefined;
    documentSelector.onFileSelected = function(fileDesc) {
        selectFileDesc = fileDesc;
        buildSelector();
        $("#file-selector li:not(.stick)").removeClass("disabled");
        var li = liMap[fileDesc.fileIndex];
        if(li === undefined) {
            // It means that we are showing a temporary file (not in the
            // selector)
            return;
        }
        li.addClass("disabled");
    };

    documentSelector.onFileCreated = buildSelector;
    documentSelector.onFileDeleted = buildSelector;
    documentSelector.onTitleChanged = buildSelector;
    documentSelector.onSyncExportSuccess = buildSelector;
    documentSelector.onSyncRemoved = buildSelector;
    documentSelector.onNewPublishSuccess = buildSelector;
    documentSelector.onPublishRemoved = buildSelector;

    // Filter for search input in file selector
    function filterFileSelector(filter) {
        var liList = $("#file-selector li:not(.stick)");
        liList.show();
        if(filter) {
            var words = filter.toLowerCase().split(/\s+/);
            liList.each(function() {
                var fileTitle = $(this).text().toLowerCase();
                if(_.some(words, function(word) {
                    return fileTitle.indexOf(word) === -1;
                })) {
                    $(this).hide();
                }
            });
        }
    }

    documentSelector.onReady = function() {
        if(documentSelector.config.orderBy == "title") {
            sortFunction = function(fileDesc) {
                return fileDesc.title.toLowerCase();
            };
        }
        else if(documentSelector.config.orderBy == "mru") {
            sortFunction = function(fileDesc) {
                return -fileDesc.selectTime;
            };
        }

        var shortcutLi = undefined;
        $(".action-open-file").click(function() {
            if($("#file-selector").parent().is(".open")) {
                return;
            }
            filterFileSelector();
            if(shortcutLi !== undefined) {
                return;
            }
            _.defer(function() {
                $("#file-search").val("").focus();
            });
        }).prop("title", _.template("<%= title %>  <%= shortcutPrevious %>  <%= shortcutNext %>", {
            title: $(".action-open-file").prop("title"),
            shortcutPrevious: documentSelector.config.shortcutPrevious,
            shortcutNext: documentSelector.config.shortcutNext
        }));
        $("#file-search").keyup(function(e) {
            if(e.which == 13 || e.which == 27) {
                $(this).parent().click();
            }
            else {
                filterFileSelector($(this).val());
            }
        }).click(function(event) {
            event.stopPropagation();
        });

        // Handle key shortcut
        mousetrap.bind(documentSelector.config.shortcutPrevious.toLowerCase(), function() {
            if(shortcutLi === undefined) {
                $("#file-selector").parent().is(".open") || $(".action-open-file").click();
                shortcutLi = liMap[selectFileDesc.fileIndex];
            }
            var liIndex = _.indexOf(liArray, shortcutLi) - 1;
            if(liIndex === -2) {
                liIndex = -1;
            }
            shortcutLi = liArray[(liIndex + liArray.length) % liArray.length];
            _.defer(function() {
                shortcutLi.find("a").focus();
            });
            return false;
        });
        mousetrap.bind(documentSelector.config.shortcutNext.toLowerCase(), function() {
            if(shortcutLi === undefined) {
                $("#file-selector").parent().is(".open") || $(".action-open-file").click();
                shortcutLi = liMap[selectFileDesc.fileIndex];
            }
            var liIndex = _.indexOf(liArray, shortcutLi) + 1;
            shortcutLi = liArray[liIndex % liArray.length];
            _.defer(function() {
                shortcutLi.find("a").focus();
            });
            return false;
        });
        mousetrap.bind('ctrl', function() {
            if(shortcutLi !== undefined) {
                shortcutLi.find("a").click();
                shortcutLi = undefined;
            }
        }, "keyup");
    };

    return documentSelector;

});