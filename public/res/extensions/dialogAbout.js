define([
	"jquery",
	"underscore",
	"constants",
	"utils",
	"classes/Extension",
	"monetizejs",
	"text!html/dialogAbout.html"
], function($, _, constants, utils, Extension, MonetizeJS, dialogAboutHTML) {

	var dialogAbout = new Extension("dialogAbout", 'Dialog "About"');

	var eventMgr;
	dialogAbout.onEventMgrCreated = function(eventMgrParameter) {
		eventMgr = eventMgrParameter;
	};

	var monetize = new MonetizeJS({
		applicationID: 'ESTHdCYOi18iLhhO'
	});

	dialogAbout.onReady = function() {
		utils.addModal('modal-about', _.template(dialogAboutHTML, {
			version: constants.VERSION
		}));
		$('.modal-about .sponsorship-button').click(function() {
			monetize.getPayments({
				summary: true
			}, function() {
				eventMgr.onMessage('Please refresh the page for your sponsorship to take effect.');
			});
		});
	};

	return dialogAbout;

});
