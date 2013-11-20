define([
    "jquery",
    "underscore",
    "utils",
    "storage",
    "classes/Provider",
    "eventMgr",
    "helpers/googleHelper"
], function($, _, utils, storage, Provider, eventMgr, googleHelper) {

    var PROVIDER_GPLUS = "gplus";

    var gplusProvider = new Provider(PROVIDER_GPLUS, "Google+");

    function getThumbnailUrl(doc, size) {
        var result;
        _.find(doc.thumbnails, function(thumbnail) {
            var found = false;
            thumbnail.url.replace(/^(.*[\/=]s)\d.*?(\/[^\/]+)?$/, function(match, sub1, sub2) {
                result = sub1 + size + (sub2 || '');
                found = true;
            });
            return found;
        });
        return result;
    }
    
    var imageDoc;
    var importImagePreferences = utils.retrieveIgnoreError(PROVIDER_GPLUS + ".importImagePreferences");
    var importImageCallback;
    function showImportImgDialog() {
        if(!imageDoc.thumbnails) {
            eventMgr.onError("Image " + imageDoc.name + " is not accessible.");
            importImageCallback(true);
            return;
        }
        utils.resetModalInputs();
        $(".modal-import-image img").prop("src", getThumbnailUrl(imageDoc, 128));
        utils.setInputValue("#input-import-image-title", imageDoc.name);

        // Load preferences
        if(importImagePreferences) {
            utils.setInputValue("#input-import-image-size", importImagePreferences.size);
        }

        $(".modal-import-image").modal();
    }

    gplusProvider.importImage = function(callback) {
        importImageCallback = callback;
        googleHelper.picker(function(error, docs) {
            if(error || docs.length === 0) {
                callback(error);
                return;
            }
            imageDoc = docs[0];
            showImportImgDialog();
        }, 'img');
    };
    
    gplusProvider.uploadImage = function(imgName, imgContent, callback) {
        importImageCallback = callback;
        googleHelper.uploadImg(imgName, imgContent, "default", function(error, image) {
            if(error || !image) {
                callback(error);
                return;
            }
            imageDoc = {
                name: imgName,
                thumbnails: []
            };
            $(image).find("thumbnail").each(function() {
                imageDoc.thumbnails.push({
                    url: $(this).attr("url")
                });
            });            
            showImportImgDialog();
        });
    };

    eventMgr.addListener("onReady", function() {
        $(".action-import-image").click(function() {
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
            storage[PROVIDER_GPLUS + ".importImagePreferences"] = JSON.stringify(importImagePreferences);
        });
    });

    return gplusProvider;
});
