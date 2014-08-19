define([
	"jquery",
	"underscore",
	"constants",
	"classes/Provider",
	"core",
	"eventMgr",
	"providers/gplusProvider"
], function($, _, constants, Provider, core, eventMgr) {

	var mediaImporter = {};

	// Create a map with providerId: providerModule
	var providerMap = _.chain(arguments).map(function(argument) {
		return argument instanceof Provider && [
			argument.providerId,
			argument
		];
	}).compact().object().value();

	eventMgr.addListener("onReady", function() {
		_.each(providerMap, function(provider) {
			// Import image action links (if any)
			$(".action-import-image-" + provider.providerId).click(function() {
				// Take the insertLinkCallback from core module
				var insertLinkCallback = core.insertLinkCallback;
				// Unset it to be sure core module will not call it
				core.insertLinkCallback = undefined;
				provider.importImage(function(error, imageLink) {
					if(error) {
						insertLinkCallback(null);
						return;
					}
					insertLinkCallback(imageLink || null);
				});
			});
		});

		function handleImgImport(evt) {
			var files = (evt.dataTransfer || evt.target).files;
			var file = _.first(files);
			if(file.name.match(/.(jpe?g|png|gif)$/i)) {
				evt.stopPropagation();
				evt.preventDefault();
				var reader = new FileReader();
				reader.onload = (function(importedFile) {
					return function(e) {
						var content = new Uint8Array(e.target.result);
						providerMap.gplus.uploadImage(importedFile.name, content, function(error, imageLink) {
							if(error) {
								return;
							}
							// Generate an insertLinkCallback by clicking the
							// pagedown button but without showing the dialog
							core.catchModal = true;
							$("#wmd-image-button").click();
							core.catchModal = false;
							// Take the insertLinkCallback from core module
							var insertLinkCallback = core.insertLinkCallback;
							// Unset it to be sure core module will not call it
							core.insertLinkCallback = undefined;
							insertLinkCallback(imageLink || null);
						});
					};
				})(file);
				var blob = file.slice(0, constants.IMPORT_IMG_MAX_CONTENT_SIZE);
				reader.readAsArrayBuffer(blob);
			}
		}

		function handleDragOver(evt) {
			evt.stopPropagation();
			evt.preventDefault();
			evt.dataTransfer.dropEffect = 'copy';
		}

		!window.viewerMode && (function(dragAndDropElt) {
			dragAndDropElt.addEventListener('dragover', handleDragOver, false);
			dragAndDropElt.addEventListener('drop', handleImgImport, false);
		})(document.querySelector('.layout-wrapper-l3'));

	});

	return mediaImporter;
});