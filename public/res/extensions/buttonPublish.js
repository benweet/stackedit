define([
    "jquery",
    "underscore",
    "crel",
    "classes/Extension",
], function($, _, crel, Extension) {

    var buttonPublish = new Extension("buttonPublish", 'Button "Publish"');
    // buttonPublish.settingsBlock = '<p>Adds a "Publish document" button in the
    // navigation bar.</p>';

    var $button;
    var currentFileDesc;
    var publishRunning = false;
    var hasPublications = false;
    var isOffline = false;
    // Enable/disable the button
    function updateButtonState() {
        if($button === undefined) {
            return;
        }
        if(publishRunning === true || hasPublications === false || isOffline === true) {
            $button.addClass("disabled");
        }
        else {
            $button.removeClass("disabled");
        }
    }

    var publisher;
    buttonPublish.onPublisherCreated = function(publisherParameter) {
        publisher = publisherParameter;
    };

    buttonPublish.onCreateButton = function() {
        var button = crel('a', {
            class: 'btn btn-success button-publish',
            title: 'Update document publication'
        }, crel('i', {
            class: 'icon-upload'
        }));
        $button = $(button).click(function() {
            if(!$button.hasClass("disabled")) {
                publisher.publish();
            }
        });
        return button;
    };

    buttonPublish.onPublishRunning = function(isRunning) {
        publishRunning = isRunning;
        updateButtonState();
    };

    buttonPublish.onOfflineChanged = function(isOfflineParameter) {
        isOffline = isOfflineParameter;
        updateButtonState();
    };

    // Check that current file has publications
    var checkPublication = function() {
        if(_.size(currentFileDesc.publishLocations) === 0) {
            hasPublications = false;
        }
        else {
            hasPublications = true;
        }
        updateButtonState();
    };

    buttonPublish.onFileSelected = function(fileDesc) {
        currentFileDesc = fileDesc;
        checkPublication();
    };

    buttonPublish.onReady = function() {
        $(".action-update-publication").click(publisher.publish);
    };

    buttonPublish.onPublishRemoved = checkPublication;
    buttonPublish.onNewPublishSuccess = checkPublication;

    return buttonPublish;

});
