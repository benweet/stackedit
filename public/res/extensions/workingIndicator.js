define([
    "jquery",
    "underscore",
    "classes/Extension",
    "crel"
], function ($, _, Extension, crel) {

    var workingIndicator = new Extension("workingIndicator", "Working Indicator");

    var $bodyElt;
    var $workingIndicatorElt;
    var intervalId;
    workingIndicator.onAsyncRunning = function (isRunning) {
        $bodyElt.toggleClass("working", isRunning);
        $workingIndicatorElt.toggleClass("show", isRunning);
        if(isRunning) {
            animate();
            intervalId = setInterval(animate, 200);
        }
        else {
            clearInterval(intervalId);
        }
    };
    
    var indicatorElts = [];
    var loop = 0;
    function animate() {
        indicatorElts[loop].className = '';
        loop = (loop + 1) % 3;
        indicatorElts[loop].className = 'highlighted';
    }

    workingIndicator.onReady = function () {
        $bodyElt = $(document.body);
        $workingIndicatorElt = $(".working-indicator");
        for (var i = 0; i < 3; i++) {
            indicatorElts.push(crel('div'));
        }
        $workingIndicatorElt.append(indicatorElts);
    };

    return workingIndicator;

});