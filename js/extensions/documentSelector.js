define([
    "jquery",
    "underscore",
    "utils",
    "classes/Extension",
    "mousetrap",
    "fileSystem",
    "text!html/documentSelectorSettingsBlock.html",
], function($, _, utils, Extension, mousetrap, fileSystem, documentSelectorSettingsBlockHTML) {

    var documentSelector = new Extension("documentSelector", 'Document Selector');
    documentSelector.settingsBlock = documentSelectorSettingsBlockHTML;
    documentSelector.defaultConfig = {
        orderBy: "title",
        shortcutPrevious: "Ctrl+[",
        shortcutNext: "Ctrl+]"
    };

    documentSelector.onLoadSettings = function() {
        utils.setInputValue("#select-document-selector-orderby", documentSelector.config.orderBy);
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
    var selectFileDesc = undefined;
    var buildSelector = function() {

        function composeTitle(fileDesc) {
            var result = [];
            var syncAttributesList = _.values(fileDesc.syncLocations);
            var publishAttributesList = _.values(fileDesc.publishLocations);
            var attributesList = syncAttributesList.concat(publishAttributesList);
            _.chain(attributesList).sortBy(function(attributes) {
                return attributes.provider.providerId;
            }).each(function(attributes) {
                var classes = 'icon-provider-' + attributes.provider.providerId;
                if(attributes.isRealtime === true) {
                    classes += " realtime";
                }
                result.push('<i class="' + classes + '"></i>');
            });
            result.push(" ");
            result.push(fileDesc.title);
            return result.join("");
        }

        liMap = {};
        var fileSelectorElt = $(".file-selector");
        fileSelectorElt.empty();
        var documentPanelSelectorElt = $(".document-panel > .panel-content > .list-group");
        documentPanelSelectorElt.empty();
        _.chain(fileSystem).sortBy(sortFunction).each(function(fileDesc) {
            var a = $('<a href="#">').html(composeTitle(fileDesc));
            var documentPanelItemElt = a.clone().addClass('list-group-item');
            documentPanelItemElt.add(a).click(function() {
                if(!liMap[fileDesc.fileIndex].is(".disabled")) {
                    fileMgr.selectFile(fileDesc);
                }
                else {
                    $("#wmd-input").focus();
                }
            });
            var li = $("<li>").append(a);
            liMap[fileDesc.fileIndex] = li;
            if(fileDesc === selectFileDesc) {
                li.addClass("disabled");
                documentPanelItemElt.addClass("active");
            }
            fileSelectorElt.append(li);
            documentPanelSelectorElt.append(documentPanelItemElt);
        });
        liArray = _.values(liMap);
    };

    documentSelector.onFileSelected = function(fileDesc) {
        selectFileDesc = fileDesc;
        buildSelector();
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
        var liList = $(".file-selector > li");
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
            if($(".file-selector").parent().is(".open")) {
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
        var shortcutPrevious = documentSelector.config.shortcutPrevious.toLowerCase();
        mousetrap.bind(shortcutPrevious, function() {
            if(shortcutLi === undefined) {
                $(".file-selector").parent().is(".open") || $(".action-open-file").click();
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
        var shortcutNext = documentSelector.config.shortcutNext.toLowerCase();
        mousetrap.bind(documentSelector.config.shortcutNext.toLowerCase(), function() {
            if(shortcutLi === undefined) {
                $(".file-selector").parent().is(".open") || $(".action-open-file").click();
                shortcutLi = liMap[selectFileDesc.fileIndex];
            }
            var liIndex = _.indexOf(liArray, shortcutLi) + 1;
            shortcutLi = liArray[liIndex % liArray.length];
            _.defer(function() {
                shortcutLi.find("a").focus();
            });
            return false;
        });
        var delimiter1 = shortcutPrevious.indexOf("+");
        var shortcutSelect1 = delimiter1 === -1 ? shortcutPrevious : shortcutPrevious.substring(0, delimiter1);
        var delimiter2 = shortcutNext.indexOf("+");
        var shortcutSelect2 = delimiter2 === -1 ? shortcutNext : shortcutNext.substring(0, delimiter2);
        mousetrap.bind([
            shortcutSelect1,
            shortcutSelect2
        ], function() {
            if(shortcutLi !== undefined) {
                shortcutLi.find("a").click();
                shortcutLi = undefined;
            }
        }, "keyup");
    };

    return documentSelector;

});