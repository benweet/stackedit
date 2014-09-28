define([
	"jquery",
	"underscore",
	"constants",
	"utils",
	"eventMgr",
	"fileMgr",
	"classes/AsyncTask",
	"classes/Provider",
	"providers/downloadProvider",
	"providers/gistProvider"
], function($, _, constants, utils, eventMgr, fileMgr, AsyncTask, Provider) {

	var sharing = {};

	// Create a map with providerId: providerModule
	var providerMap = _.chain(arguments).map(function(argument) {
		return argument instanceof Provider && [
			argument.providerId,
			argument
		];
	}).compact().object().value();

	// Listen to offline status changes
	var isOffline = false;
	eventMgr.addListener("onOfflineChanged", function(isOfflineParam) {
		isOffline = isOfflineParam;
	});

	sharing.getEditorParams = function(attributes) {
		var provider = providerMap[attributes.provider.providerId];
		if(provider === undefined) {
			return;
		}
		var params = {
			provider: provider.providerId
		};
		if(!provider.editorSharingAttributes) {
			return;
		}
		_.each(provider.editorSharingAttributes, function(attributeName) {
			params[attributeName] = attributes[attributeName];
		});
		return params;
	};

	sharing.getViewerParams = function(attributes) {
		var provider = providerMap[attributes.provider.providerId];
		if(provider === undefined ||
			// Or document is not published in markdown format
			attributes.format != "markdown") {
			return;
		}
		var params = {
			provider: provider.providerId
		};
		if(!provider.viewerSharingAttributes) {
			return;
		}
		_.each(provider.viewerSharingAttributes, function(attributeName) {
			params[attributeName] = attributes[attributeName];
		});
		return params;
	};

	eventMgr.addListener("onReady", function() {
		// Check parameters to see if we have to download a shared document
		var providerId = utils.getURLParameter("provider");
		if(window.viewerMode) {
			if(providerId === undefined) {
				providerId = "download";
			}
			var provider = providerMap[providerId];
			if(provider === undefined) {
				return;
			}
			var importParameters = {};
			_.each(provider.viewerSharingAttributes, function(attributeName) {
				var parameter = utils.getURLParameter(attributeName);
				if(!parameter) {
					importParameters = undefined;
					return;
				}
				importParameters[attributeName] = parameter;
			});
			if(importParameters === undefined) {
				return;
			}
			$("#preview-contents, .navbar .file-title-navbar").hide();
			provider.importPublic(importParameters, function(error, title, content) {
				$("#preview-contents, .navbar .file-title-navbar").show();
				if(error) {
					return;
				}
				var fileDesc = fileMgr.createFile(title, content, undefined, undefined, true);
				fileMgr.selectFile(fileDesc);
			});
		}
	});

	return sharing;
});
