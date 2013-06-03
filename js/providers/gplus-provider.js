define([
    "underscore",
    "core",
    "utils",
    "extension-manager",
    "helpers/google-helper"
], function(_, core, utils, extensionMgr, googleHelper) {

    var PROVIDER_GPLUS = "gplus";

    var gplusProvider = {
        providerId: PROVIDER_GPLUS,
        providerName: "Google+"
    };

    function getThumbnailUrl(doc, size) {
        var result = undefined;
        _.find(doc.thumbnails, function(thumbnail) {
            var found = false;
            thumbnail.url.replace(/(.*\/s)\d.*?(\/[^\/]+)/, function(match, sub1, sub2) {
                result = sub1 + size + sub2;
                found = true;
            });
            return found;
        });
        return result;
    }

    var importImageCallback = undefined;
    var imageDoc = undefined;
    var importImagePreferences = utils.retrieveIgnoreError(PROVIDER_GPLUS + ".importImagePreferences");
    gplusProvider.importImage = function(callback) {
        importImageCallback = callback;
        googleHelper.picker(function(error, docs) {
            if(error || docs.length === 0) {
                callback(error);
                return;
            }
            imageDoc = docs[0];
            if(!imageDoc.thumbnails) {
                extensionMgr.onError("Image " + imageDoc.title + " is not accessible.");
                callback(true);
                return;
            }
            utils.resetModalInputs();
            $("#modal-import-image img").prop("src", getThumbnailUrl(imageDoc, 128));
            utils.setInputValue("#input-import-image-title", imageDoc.name);

            // Load preferences
            if(importImagePreferences) {
                utils.setInputValue("#input-import-image-size", importImagePreferences.size);
            }

            $("#modal-import-image").modal();
        }, true);
    };

    core.onReady(function() {
        $(".action-import-image").click(function(e) {
            var size = utils.getInputIntValue("#input-import-image-size", undefined, 0) || 0;
            var title = utils.getInputTextValue("#input-import-image-title");
            var image = getThumbnailUrl(imageDoc, size);
            if(title) {
                image += ' \"' + title + '"';
            }
            importImageCallback(undefined, image);

            // Store import preferences for next time
            importImagePreferences = {};
            if(size) {
                importImagePreferences.size = size;
            }
            localStorage[PROVIDER_GPLUS + ".importImagePreferences"] = JSON.stringify(importImagePreferences);
        });
    });

    return gplusProvider;
});
