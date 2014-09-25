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

	sharing.getViewerLink = function(attributes) {
		var provider = providerMap[attributes.provider.providerId];
		// Don't create link if provider is not compatible for sharing
		if(provider === undefined ||
			// Or document is not published in markdown format
			attributes.format != "markdown") {
			return;
		}
		var url = [
			constants.MAIN_URL,
			'viewer#!provider=',
			provider.providerId
		];
		_.each(provider.sharingAttributes, function(attributeName) {
			url.push('&');
			url.push(attributeName);
			url.push('=');
			url.push(encodeURIComponent(attributes[attributeName]));
		});
		attributes.sharingLink = url.join('');
		callback();
	};

	eventMgr.addListener("onReady", function() {
		if(window.viewerMode === false) {
			return;
		}
		// Check parameters to see if we have to download a shared document
		var providerId = utils.getURLParameter("provider");
		if(providerId === undefined) {
			providerId = "download";
		}
		var provider = providerMap[providerId];
		if(provider === undefined) {
			return;
		}
		var importParameters = {};
		_.each(provider.sharingAttributes, function(attributeName) {
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
	});

	return sharing;
});
