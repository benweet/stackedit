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
			tooltip.parent().addClass('info-tooltip-container');
			tooltip.one('click', function() {
				tooltip.tooltip('hide').removeClass('info-tooltip').parent().removeClass('info-tooltip-container');
			});
			setTimeout(function() {
				tooltip.tooltip('hide').removeClass('info-tooltip').parent().removeClass('info-tooltip-container');
			}, 30000);
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
			].join("")
		});
		tour.addSteps([
			{
				element: '.navbar-inner',
				title: 'StackEdit 4 is out!',
				content: [
					'<p>I\'m very pleased to welcome you here! StackEdit keeps getting better and I hope you appreciate it.</p>',
					'Please click <b>Next</b> to take a quick tour.'
				].join(""),
				placement: 'bottom'
			},
			{
				element: '.document-panel .toggle-button',
				title: 'Documents',
				content: [
					'<p>The <i class="icon-folder-open"></i> <b>document panel</b> allows you to manage your local documents.</p>',
					'<b>Tip:</b> Use <kbd>Ctrl+[</kbd> and <kbd>Ctrl+]</kbd> to toggle documents.'
				].join(""),
				placement: 'left',
				reflex: true
			},
			{
				element: '.menu-panel .toggle-button',
				title: 'Menu',
				content: [
					'<p>The <i class="icon-provider-stackedit"></i> <b>menu panel</b> allows you to synchronize your documents on <i class="icon-provider-gdrive"></i> Google Drive, <i class="icon-provider-dropbox"></i> Dropbox or to publish them on <i class="icon-provider-github"></i> GitHub, <i class="icon-provider-blogger"></i> Blogger...</p>',
					'<b>Tip:</b> Use the <i class="icon-provider-stackedit"></i> <b>menu panel</b> to access the settings.'
				].join(""),
				placement: 'right',
				reflex: true
			},
			{
				element: '.navbar-inner > .nav .button-open-discussion, .navbar .buttons-dropdown > .nav > .btn:not(:hidden)',
				title: 'Comments/discussions',
				content: [
					'<p>New in StackEdit 4: the <i class="icon-comment-alt"></i> <b>comments</b> button lets you create inline discussions!</p>',
					'<b>Tip:</b> Reopen the Hello! document from Settings>Utils to discover other new features.'
				].join(""),
				placement: 'right',
				reflex: true
			},
			{
				element: '.navbar-inner',
				title: 'Happy StackWriting!',
				content: [
					'<p>Enjoy, and don\'t forget to rate 5 stars on the <a target="_blank" href="https://chrome.google.com/webstore/detail/stackedit/iiooodelglhkcpgbajoejffhijaclcdg/reviews">Chrome Web Store</a>...</p>',
					'<a href="https://twitter.com/share" class="twitter-share-button" data-url="https://stackedit.io" data-text="Great #markdown editor!" data-via="stackedit" data-size="large"></a>'
				].join(""),
				placement: 'bottom',
				onShown: function() {
					eventMgr.onTweet();
				}
			}
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
