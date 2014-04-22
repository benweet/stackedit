define([
    'underscore',
    'jquery',
    'storage',
    'classes/Extension',
    'bootstrap-tour'
], function(_, $, storage, Extension, Tour) {

    var welcomeTour = new Extension('welcomeTour', 'Welcome tour', false, true);

    var eventMgr;
    welcomeTour.onEventMgrCreated = function(eventMgrParam) {
        eventMgr = eventMgrParam;
    };

    welcomeTour.onReady = function() {
        function infoTooltip(btnSelector, title, placement) {
            var tooltip = $(btnSelector).tooltip({
                html: true,
                //container: $('.extension-preview-buttons'),
                placement: placement,
                trigger: 'manual',
                title: title
            }).tooltip('show').addClass('info-tooltip');
            tooltip.one('click', function() {
                tooltip.tooltip('hide').removeClass('info-tooltip');
            });
            setTimeout(function() {
                tooltip.tooltip('hide').removeClass('info-tooltip');
            }, 20000);
        }
        var tour = new Tour({
            keyboard: false,
            storage: {
                getItem: function() {
                },
                setItem: function() {
                },
                removeItem: function() {
                }
            },
            onEnd: function() {
                storage.welcomeTour = 'done';
                infoTooltip('.menu-panel .toggle-button *', 'Synchronize, publish...', 'right');
                infoTooltip('.document-panel .toggle-button *', 'Create, manage documents', 'left');
                infoTooltip('.drag-me', 'Drag me!', 'left');
                infoTooltip('.layout-toggler-preview', 'Toggle preview', 'right');
            },
            template: [
                '<div class="popover tour">',
                '   <div class="arrow"></div>',
                '   <h3 class="popover-title"></h3>',
                '   <div class="popover-content"></div>',
                '   <nav class="popover-navigation">',
                '       <button class="btn btn-primary" data-role="next">Next</button>',
                '       <button class="btn btn-default" data-role="end">Got it!</button>',
                '   </nav>',
                '</div>'
            ].join(""),
        });
        tour.addSteps([
            {
                element: '.navbar-inner',
                title: 'StackEdit 4 beta preview!',
                content: [
                    '<p><strong>What\'s new?</strong></p>',
                    '<ul>',
                    '    <li>New contenteditable based editor (credit to Dabblet, Editorially...)</li>',
                    '    <li>New layout with CSS3 transitions (lighter supposedly)</li>',
                    '    <li>Comments/discussions support (see the new icon in the navigation bar)</li>',
                    '    <li>Auto-merge and conflict detection using standard synchronization</li>',
                    '    <li>Dropped real time sync support :( since you can collaborate simultaneously using standard synchronization</li>',
                    '</ul>',
                    '<p>Please <a target="_blank" href="https://github.com/benweet/stackedit/issues/385">provide your feedback here</a>... Thanks!</p>',
                    '<a href="https://twitter.com/share" class="twitter-share-button" data-url="https://stackedit.io" data-text="Great #markdown editor!" data-via="stackedit" data-size="large"></a>',
                ].join(""),
                placement: 'bottom',
                onShown: function() {
                    eventMgr.onTweet();
                }
            },
        ]);
        if(!_.has(storage, 'welcomeTour')) {
            tour.start();
        }
        $('.action-welcome-tour').click(function() {
            tour.restart();
        });
    };

    return welcomeTour;

});
