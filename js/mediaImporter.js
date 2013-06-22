define([
    "jquery",
    "underscore",
    "classes/Provider",
    "core",
    "providers/gplusProvider"
], function($, _, Provider, core) {

    var mediaImporter = {};

    // Create a map with providerId: providerModule
    var providerMap = _.chain(arguments).map(function(argument) {
        return argument instanceof Provider && [
            argument.providerId,
            argument
        ];
    }).compact().object().value();

    core.onReady(function() {
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
    });

    return mediaImporter;
});