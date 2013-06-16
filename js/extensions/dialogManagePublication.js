define([
    "jquery",
    "underscore",
    "text!html/dialogManagePublicationLocation.html",
], function($, _, dialogManagePublicationLocationHTML) {

    var dialogManagePublication = {
        extensionId: "dialogManagePublication",
        extensionName: 'Dialog "Manage publication"',
        settingsBloc: '<p>Populates the "Manage publication" dialog box.</p>'
    };

    var extensionMgr = undefined;
    dialogManagePublication.onExtensionMgrCreated = function(extensionMgrParameter) {
        extensionMgr = extensionMgrParameter;
    };

    var fileDesc = undefined;
    var removeButtonTemplate = '<a class="btn" title="Remove this location"><i class="icon-trash"></i></a>';
    var refreshDialog = function(fileDescParameter) {
        if(fileDescParameter !== undefined && fileDescParameter !== fileDesc) {
            return;
        }

        var publishAttributesList = _.values(fileDesc.publishLocations);
        $(".msg-no-publish, .msg-publish-list").addClass("hide");
        var publishList = $("#manage-publish-list").empty();
        if(publishAttributesList.length > 0) {
            $(".msg-publish-list").removeClass("hide");
        }
        else {
            $(".msg-no-publish").removeClass("hide");
        }
        _.each(publishAttributesList, function(publishAttributes) {
            formattedAttributes = _.omit(publishAttributes, "provider", "publishIndex", "sharingLink");
            if(formattedAttributes.password) {
                formattedAttributes.password = "********";
            }
            var publishDesc = JSON.stringify(formattedAttributes).replace(/{|}|"/g, "").replace(/,/g, ", ");
            var lineElement = $(_.template(dialogManagePublicationLocationHTML, {
                provider: publishAttributes.provider,
                publishDesc: publishDesc
            }));
            lineElement.append($(removeButtonTemplate).click(function() {
                fileDesc.removePublishLocation(publishAttributes);
                extensionMgr.onPublishRemoved(publishFileDesc, publishAttributes);
            }));
            publishList.append(lineElement);
        });
    };

    dialogManagePublication.onFileSelected = function(fileDescParameter) {
        fileDesc = fileDescParameter;
        refreshDialog(fileDescParameter);
    };

    dialogManagePublication.onNewPublishSuccess = refreshDialog;
    dialogManagePublication.onPublishRemoved = refreshDialog;

    return dialogManagePublication;

});