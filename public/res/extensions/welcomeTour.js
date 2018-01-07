define([
	'underscore',
	'jquery',
	'storage',
	'utils',
	'classes/Extension',
	'bootstrap-tour'
], function(_, $, storage, utils, Extension, Tour) {

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
				// storage.welcomeTour = 'done';
				// infoTooltip('.drag-me', 'Drag me!', 'left');
				// infoTooltip('.layout-toggler-preview', 'Toggle preview', 'right');
			},
			template: [
				'<div class="popover tour">',
				'   <div class="arrow"></div>',
				'   <h3 class="popover-title"></h3>',
				'   <div class="popover-content"></div>',
				'   <nav class="popover-navigation">',
				'       <button class="btn btn-primary" data-role="next">Next</button>',
				'       <button class="btn btn-default" data-role="end">OK</button>',
				'   </nav>',
				'</div>'
			].join("")
		});
		tour.addSteps([
			{
				element: '.navbar-inner',
				title: 'StackEdit 4 is deprecated',
				content: [
					'<p><b>StackEdit 5</b> is now ready for production!</p>',
					'<p>If you want to migrate, <a href="#" class="action-export-docs-tour">click here</a> to export a backup of your files.</p>',
					'<p>To import the backup in StackEdit 5, go to Menu > More > Import workspace backup.</p>',
					'<p><a href="app" target="_blank">Open StackEdit 5 now!</a></p>',
					'You can always click <b>OK</b> to continue with StackEdit 4.'
				].join(""),
				placement: 'bottom',
				onShown: function() {
					$(".action-export-docs-tour").click(function() {
						utils.saveAs(JSON.stringify(storage), "StackEdit local storage.json");
					});
				}
			},
		]);
		tour.start();
		$('.action-welcome-tour').click(function() {
			tour.restart();
		});
	};

	return welcomeTour;

});
