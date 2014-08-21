define([
    "jquery",
    "underscore",
    "crel",
    "utils",
    "classes/Extension",
    "mousetrap",
    "fileSystem",
    "text!html/documentSelectorSettingsBlock.html",
], function($, _, crel, utils, Extension, mousetrap, fileSystem, documentSelectorSettingsBlockHTML) {

    var documentSelector = new Extension("documentSelector", 'Document Selector', true);
    documentSelector.settingsBlock = documentSelectorSettingsBlockHTML;
    documentSelector.defaultConfig = {
        orderBy: "mru",
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

    var fileMgr;
    documentSelector.onFileMgrCreated = function(fileMgrParameter) {
        fileMgr = fileMgrParameter;
    };

    var liEltTmpl = [
        '<li class="<%= isCurrent ? "disabled" : "" %>" data-file-index="<%= fileDesc.fileIndex %>">',
        '   <a href="#">',
        '       <%= fileDesc.composeTitle() %>',
        '   </a>',
        '</li>'
    ].join('');
    var dropdownElt;
    var liEltMap;
    var liEltList;
    var sortFunction;
    var selectFileDesc;
    var selectedLi;
    var $editorElt;
    var buildSelector = _.debounce(function() {
        var liListHtml = _.chain(fileSystem).sortBy(sortFunction).reduce(function(result, fileDesc) {
            return result + _.template(liEltTmpl, {
                fileDesc: fileDesc,
                isCurrent: fileDesc === selectFileDesc
            });
        }, '').value();
        dropdownElt.innerHTML = liListHtml;

        liEltList = [];
        liEltMap = {};
        _.each(dropdownElt.querySelectorAll('li'), function(liElt) {
            var $liElt = $(liElt);
            liEltList.push($liElt);
            var fileDesc = fileSystem[$liElt.data('fileIndex')];
            liEltMap[fileDesc.fileIndex] = $liElt;
        });
    }, 50);

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

    documentSelector.onReady = function() {
        $editorElt = $('#wmd-input');

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

        dropdownElt = crel('ul', {
            class: 'dropdown-menu dropdown-file-selector'
        });
        document.querySelector('.navbar').appendChild(crel('div', crel('div', {
            'data-toggle': 'dropdown'
        }), dropdownElt));
        var $dropdownElt = $(dropdownElt).dropdown();

        var $documentPanelTogglerElt = $('.document-panel .collapse-button');
        $documentPanelTogglerElt.prop("title", _.template("<%= title %>  <%= shortcutPrevious %>  <%= shortcutNext %>", {
            title: $documentPanelTogglerElt.prop("title"),
            shortcutPrevious: documentSelector.config.shortcutPrevious,
            shortcutNext: documentSelector.config.shortcutNext
        }));

        // Handle key shortcut
        var shortcutPrevious = documentSelector.config.shortcutPrevious.toLowerCase();
        mousetrap.bind(shortcutPrevious, function() {
            if(selectedLi === undefined) {
                $dropdownElt.dropdown('toggle');
                selectedLi = liEltMap[selectFileDesc.fileIndex];
            }
            var liIndex = _.indexOf(liEltList, selectedLi) - 1;
            if(liIndex === -2) {
                liIndex = -1;
            }
            selectedLi = liEltList[(liIndex + liEltList.length) % liEltList.length];
            setTimeout(function() {
                selectedLi.find("a").focus();
            }, 10);
            return false;
        });
        var shortcutNext = documentSelector.config.shortcutNext.toLowerCase();
        mousetrap.bind(documentSelector.config.shortcutNext.toLowerCase(), function() {
            if(selectedLi === undefined) {
                $dropdownElt.dropdown('toggle');
                selectedLi = liEltMap[selectFileDesc.fileIndex];
            }
            var liIndex = _.indexOf(liEltList, selectedLi) + 1;
            selectedLi = liEltList[liIndex % liEltList.length];
            setTimeout(function() {
                selectedLi.find("a").focus();
            }, 10);
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
            if(selectedLi !== undefined) {
                selectedLi.find("a").click();
            }
        }, "keyup");

        $dropdownElt.on('click', 'a', function() {
            selectedLi = undefined;
            var $liElt = $(this.parentNode);
            var fileDesc = fileSystem[$liElt.data('fileIndex')];
            if(!$liElt.hasClass("disabled")) {
                fileMgr.selectFile(fileDesc);
            }
            else {
                $editorElt.focus();
            }
        });
    };

    return documentSelector;

});
