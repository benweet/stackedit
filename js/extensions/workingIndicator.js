define([
    "jquery",
    "underscore",
    "classes/Extension",
], function($, _, Extension) {

    var workingIndicator = new Extension("workingIndicator", "Working Indicator");

    var $bodyElt = undefined;
    var $workingIndicatorElt = undefined;
    workingIndicator.onAsyncRunning = function(isRunning) {
        $bodyElt.toggleClass("working", isRunning);
        $workingIndicatorElt.toggleClass("show", isRunning);
    };
    
    workingIndicator.onReady = function() {
        $bodyElt = $(document.body);
        $workingIndicatorElt = $(".working-indicator");
    };

    return workingIndicator;

});