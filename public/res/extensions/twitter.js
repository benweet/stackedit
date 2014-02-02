define([
    "jquery",
    "underscore",
    "constants",
    "utils",
    "classes/Extension",
], function($, _, constants, utils, Extension) {

    var twitter = new Extension("twitter", "Twitter", false, true);

    var isLoaded = false;
    var isOffline = false;

    var init = function() {
        if(isLoaded === false && isOffline === false) {
            $.ajax({
                url: 'https://platform.twitter.com/widgets.js',
                dataType: "script"
            }).done(function() {
                isLoaded = true;
            });
        }
    };

    twitter.onReady = function() {
        init();
    };
    twitter.onOfflineChanged = function(isOfflineParam) {
        isOffline = isOfflineParam;
        init();
    };
    twitter.onTweet = function() {
        isLoaded && window.twttr.widgets.load();
    };

    return twitter;
});