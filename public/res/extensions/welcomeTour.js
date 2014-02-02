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
                var tooltip = $('.button-markdown-syntax').parent().tooltip({
                    html: true,
                    container: $('.extension-preview-buttons'),
                    placement: 'bottom',
                    trigger: 'manual',
                    title: 'Need help with Markdown syntax?'
                }).tooltip('show').addClass('info-tooltip');
                tooltip.one('click', function() {
                    tooltip.tooltip('hide').removeClass('info-tooltip');
                });
                setTimeout(function() {
                    tooltip.tooltip('hide').removeClass('info-tooltip');
                }, 15000);
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
                title: 'Welcome to StackEdit!',
                content: [
                    '<i class="icon-lock pull-left"></i>',
                    '<p><strong>You are using the new secured platform.</strong> If you want to recover your documents from the old platform <a target="_blank" href="http://benweet.github.io/stackedit/recovery.html">click here</a>.</p>',
                    'Please click <code>Next</code> to take a quick tour.'
                ].join(""),
                placement: 'bottom',
            },
            {
                element: '.navbar-inner > .nav .action-create-file, .navbar .right-buttons-dropdown > .nav > .btn:not(:hidden)',
                title: 'New document',
                content: 'Click the <i class="icon-file"></i> <code>New document</code> button to create a new document.',
                placement: 'left',
                reflex: true,
            },
            {
                element: '.document-panel .collapse-button',
                title: 'Toggle document',
                content: [
                    '<p>Click the <i class="icon-folder-open"></i> <code>Select document</code> button to switch to another document.</p>',
                    'Use <code>Ctrl+[</code> and <code>Ctrl+]</code> shortcuts to toggle quickly.'
                ].join(""),
                placement: 'left',
                reflex: true,
            },
            {
                element: '.menu-panel .collapse-button',
                title: 'Menu',
                content: [
                    '<p>Use the <i class="icon-provider-stackedit"></i> menu to synchronize your document on <i class="icon-provider-gdrive"></i> <code>Google Drive</code> or <i class="icon-provider-dropbox"></i> <code>Dropbox</code>.</p>',
                    'Use also this menu to publish your document on <i class="icon-provider-github"></i> <code>GitHub</code>, <i class="icon-provider-blogger"></i> <code>Blogger</code>...'
                ].join(""),
                placement: 'right',
                reflex: true,
            },
            {
                element: '.navbar-inner > .nav .button-synchronize, .navbar .right-buttons-dropdown > .nav > .btn:not(:hidden)',
                title: 'Synchronize',
                content: '<p>Once imported or exported, use the <i class="icon-refresh"></i> <code>Synchronize</code> button to force the synchronization</p>This is done automatically every 3 minutes.',
                placement: 'left',
                reflex: true,
            },
            {
                element: '.navbar-inner > .nav .button-publish, .navbar .right-buttons-dropdown > .nav > .btn:not(:hidden)',
                title: 'Update publication',
                content: 'Once published, use the <i class="icon-share"></i> <code>Publish</code> button to update the publication.',
                placement: 'left',
                reflex: true,
            },
            {
                element: '.navbar-inner',
                title: 'Happy StackWriting!',
                content: [
                    '<p>Enjoy, and don\'t forget to rate <b>StackEdit</b> on <a target="_blank" href="https://chrome.google.com/webstore/detail/stackedit/iiooodelglhkcpgbajoejffhijaclcdg/reviews">Chrome Web Store</a>...</p>',
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