define([
	"jquery",
	"underscore",
	"constants",
	"classes/Extension",
	"text!html/dialogManageSharingLocation.html"
], function($, _, constants, Extension, dialogManageSharingLocationHTML) {

	var dialogManageSharing = new Extension("dialogManageSharing", 'Button "Share"', false, true);

	var eventMgr;
	dialogManageSharing.onEventMgrCreated = function(eventMgrParam) {
		eventMgr = eventMgrParam;
	};
	var sharing;
	dialogManageSharing.onSharingCreated = function(sharingParam) {
		sharing = sharingParam;
	};

	var fileDesc;
	var shareListElt;
	var $msgShareListElt;
	var $msgNoShareElt;
	var refreshDocumentSharing = function(fileDescParameter) {
		if(fileDescParameter !== undefined && fileDescParameter !== fileDesc) {
			return;
		}

		var linkListHtml = _.reduce(fileDesc.publishLocations, function(result, attributes) {
			var params = sharing.getViewerParams(attributes);
			if(params) {
				var link = constants.MAIN_URL + 'viewer?' + $.param(params);
				result += _.template(dialogManageSharingLocationHTML, {
					link: link,
					title: fileDesc.title
				});
			}
			return result;
		}, '');
		shareListElt.innerHTML = linkListHtml;

		$msgShareListElt.toggleClass('hide', linkListHtml.length === 0);
		$msgNoShareElt.toggleClass('hide', linkListHtml.length !== 0);
	};

	dialogManageSharing.onFileSelected = function(fileDescParameter) {
		fileDesc = fileDescParameter;
		refreshDocumentSharing(fileDescParameter);
	};

	dialogManageSharing.onNewPublishSuccess = function(fileDescParameter, publishAttributes) {
		refreshDocumentSharing(fileDescParameter);
		if(sharing.getViewerParams(publishAttributes)) {
			$('.modal').modal('hide');
			$('.modal-manage-sharing').modal('show');
		}
	};

	dialogManageSharing.onPublishRemoved = refreshDocumentSharing;

	dialogManageSharing.onReady = function() {
		var modalElt = document.querySelector('.modal-manage-sharing');
		shareListElt = modalElt.querySelector('.share-list');
		$msgShareListElt = $(modalElt.querySelectorAll('.msg-share-list'));
		$msgNoShareElt = $(modalElt.querySelectorAll('.msg-no-share'));
	};

	return dialogManageSharing;

});