define([
    "jquery",
    "underscore",
    "classes/Extension"
], function ($, _, Extension) {

    var workingIndicator = new Extension("workingIndicator", "Working Indicator");

    var $bodyElt;
    var $workingIndicatorElt;
    workingIndicator.onAsyncRunning = function (isRunning) {
        $bodyElt.toggleClass("working", isRunning);
        $workingIndicatorElt.toggleClass("hide", !isRunning);
    };
    
    workingIndicator.onReady = function () {
        $bodyElt = $(document.body);
        $workingIndicatorElt = $('<div class="hide">');
        $('.working-indicator').append($workingIndicatorElt);
        for (var i = 0; i < 3; i++) {
            $workingIndicatorElt.append($('<div class="bar">').css({
                'animation-delay': (i*15/100).toPrecision(3) + 's',
                '-webkit-animation-delay': (i*15/100).toPrecision(3) + 's',
            }));
        }
    };

    return workingIndicator;
});