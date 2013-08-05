define([
    "jquery",
    "underscore",
    "classes/Extension",
], function($, _, Extension) {

    var documentTitle = new Extension("documentTitle", "Document Title");

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