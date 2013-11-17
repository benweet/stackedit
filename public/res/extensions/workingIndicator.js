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
        $workingIndicatorElt.toggleClass("show", isRunning);
    };
    
    workingIndicator.onReady = function () {
        $bodyElt = $(document.body);
        $workingIndicatorElt = $(".working-indicator");
        for (var i = 0; i < 4; i++) {
            $workingIndicatorElt.append($('<div class="bar">').css({
                'animation-delay': (i*2/10).toPrecision(3) + 's',
                '-webkit-animation-delay': (i*2/10).toPrecision(3) + 's',
            }));
        }
    };

    return workingIndicator;

});