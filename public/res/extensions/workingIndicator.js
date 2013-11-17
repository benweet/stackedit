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
                'animation-delay': '0.' + (i*2) + 's',
                '-webkit-animation-delay': '0.' + (i*2) + 's',
            }));
        }
    };

    return workingIndicator;

});