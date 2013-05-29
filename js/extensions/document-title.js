define([
    "jquery",
    "underscore"
], function($, _) {

    var documentTitle = {
        extensionId: "documentTitle",
        extensionName: "Document title",
        settingsBloc: '<p>Responsible for showing the document title in the navigation bar.</p>'
    };

    var layout = undefined;
    documentTitle.onLayoutCreated = function(layoutParameter) {
        layout = layoutParameter;
    };

    var fileDesc = undefined;
    var updateTitle = function(fileDescParameter) {
        if(fileDescParameter !== fileDesc) {
            return;
        }

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

        var title = fileDesc.title;
        document.title = "StackEdit - " + title;
        $("#file-title").html(composeTitle(fileDesc));
        $(".file-title").text(title);
        $("#file-title-input").val(title);

        if(layout !== undefined) {
            // Use defer to make sure UI has been updated
            _.defer(layout.resizeAll);
        }
    };

    documentTitle.onFileSelected = function(fileDescParameter) {
        fileDesc = fileDescParameter;
        updateTitle(fileDescParameter);
    };

    documentTitle.onTitleChanged = updateTitle;
    documentTitle.onSyncExportSuccess = updateTitle;
    documentTitle.onSyncRemoved = updateTitle;
    documentTitle.onNewPublishSuccess = updateTitle;
    documentTitle.onPublishRemoved = updateTitle;

    return documentTitle;

});