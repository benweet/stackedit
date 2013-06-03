define([
    "jquery",
    "underscore",
    "file-system"
], function($, _, fileSystem) {

    var documentSelector = {
        extensionId: "documentSelector",
        extensionName: "Document selector",
        /*
        defaultConfig: {
            keyShortcut: 223
        },
        */
        settingsBloc: '<p>Builds the "Open document" dropdown menu.</p>'
    };

    var fileMgr = undefined;
    documentSelector.onFileMgrCreated = function(fileMgrParameter) {
        fileMgr = fileMgrParameter;
    };

    var liMap = undefined;
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
        _.chain(fileSystem).sortBy(function(fileDesc) {
            return fileDesc.title.toLowerCase();
        }).each(function(fileDesc) {
            var a = $('<a href="#">').html(composeTitle(fileDesc)).click(function() {
                if(!liMap[fileDesc.fileIndex].is(".disabled")) {
                    fileMgr.selectFile(fileDesc);
                }
            });
            var li = $("<li>").append(a);
            liMap[fileDesc.fileIndex] = li;
            $("#file-selector").append(li);
        });
    };

    documentSelector.onFileSelected = function(fileDesc) {
        if(liMap === undefined) {
            buildSelector();
        }
        $("#file-selector li:not(.stick)").removeClass("disabled");
        var li = liMap[fileDesc.fileIndex];
        if(li === undefined) {
            // It means that we are showing a temporary file (not in the
            // selector)
            return;
        }
        liMap[fileDesc.fileIndex].addClass("disabled");
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
        $(".action-open-file").click(function() {
            filterFileSelector();
            _.defer(function() {
                $("#file-search").val("").focus();
            });
        });
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
        /*
        $("#wmd-input").keydown(function(event) {
            if(event.ctrlKey && event.keyCode == documentSelector.config.keyShortcut) {
                console.log(event.keyCode);
            }
        });*/
    };

    return documentSelector;

});