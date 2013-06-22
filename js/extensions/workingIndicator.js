define([
    "jquery",
    "underscore",
    "classes/Extension",
], function($, _, Extension) {

    var workingIndicator = new Extension("workingIndicator", "Working Indicator");
    workingIndicator.settingsBlock = '<p>Displays an animated image when a network operation is running.</p>';

    workingIndicator.onAsyncRunning = function(isRunning) {
        if(isRunning === false) {
            $(".working-indicator").removeClass("show");
            $("body").removeClass("working");
        }
        else {
            $(".working-indicator").addClass("show");
            $("body").addClass("working");
        }
    };

    return workingIndicator;

});