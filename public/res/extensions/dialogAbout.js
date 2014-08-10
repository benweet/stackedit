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

	var monetize = new MonetizeJS({
		applicationID: 'iklMbzDI7dvMEScb'
	});

	dialogAbout.onReady = function() {
		utils.addModal('modal-about', _.template(dialogAboutHTML, {
			version: constants.VERSION
		}));
		$('.modal-about .sponsorship-button').click(function() {
			monetize.getPayments({
				summary: true
			}, function() {
			});
		});
	};

	return dialogAbout;

});
