define([
    "jquery",
    "underscore",
    "crel",
    "classes/Extension"
], function ($, _, crel, Extension) {

    var workingIndicator = new Extension("workingIndicator", "Working Indicator");

    var keyframeTemlate = [
        '@<%= prefix %>keyframes <%= name %> {',
        '    0% { opacity:<%= z %>; }',
        '    <%= start %>.01% { opacity:<%= alpha %>; }',
        '    <%= start %>.02% { opacity:1; }',
        '    <%= ((start + trail) % 100) %>.01% { opacity:<%= alpha %>; }',
        '    100% { opacity:<%= z %>; }',
        '}'
    ].join('\n');

    var $bodyElt;
    var $workingIndicatorElt;
    workingIndicator.onAsyncRunning = function (isRunning) {
        $bodyElt.toggleClass("working", isRunning);
        $workingIndicatorElt.toggleClass("hide", !isRunning);
    };

    workingIndicator.onReady = function () {
        var styleContent = '';

        function addKeyframe(params) {
            params.z = Math.max(1 - (1-params.alpha) / params.trail * (100-params.start), params.alpha);
            styleContent += _.template(keyframeTemlate, _.extend({
                prefix: ''
            }, params));
            styleContent += _.template(keyframeTemlate, _.extend({
                prefix: '-webkit-'
            }, params));
        }
        $bodyElt = $(document.body);
        $workingIndicatorElt = $('<div class="hide">');
        $('.working-indicator').append($workingIndicatorElt);
        for (var i = 0; i < 3; i++) {
            var name = 'working-indicator-bar' + i;
            addKeyframe({
                name: name,
                alpha: 0.25,
                start: 20 * i,
                trail: 50
            });
            var animation = name + ' 0.7s linear infinite';
            $workingIndicatorElt.append($('<div class="bar">').css({
                'animation': animation,
                '-webkit-animation': animation,
            }));
        }
        var styleElt = crel('style', {
            type : 'text/css'
        });
        document.head.appendChild(styleElt);
        styleElt.innerHTML = styleContent;
    };

    return workingIndicator;
});
