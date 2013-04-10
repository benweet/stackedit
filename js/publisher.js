define(["jquery"], function($) {
	
	// Dependencies
	var core = undefined;
	var fileManager = undefined;

	var publisher = {};
	
	var wizardProvider = undefined;
	
	function initWizard(provider, defaultPublishFormat) {
		defaultPublishFormat = defaultPublishFormat || "markdown";
		wizardProvider = provider;
		
		// Show/hide controls depending on provider
		$('div[class*=" control-publish-"]').hide().filter(".control-publish-" + provider).show();
		
		// Reset fields
		$("#modal-publish input[type=text]").val("");
		$("input:radio[name=radio-publish-format][value=" + defaultPublishFormat + "]").prop("checked", true);
		
		// Open dialog box
		$("#modal-publish").modal();
	}
	
	publisher.init = function(coreModule, fileManagerModule) {
		core = coreModule;
		fileManager = fileManagerModule;
		$(".action-publish-github").click(function() {
			initWizard("github");
		});
		$(".action-publish-blogger").click(function() {
			initWizard("blogger", "html");
		});
		$(".action-publish-wordpress").click(function() {
			initWizard("wordpress");
		});
		$(".action-publish-tumblr").click(function() {
			initWizard("tumblr");
		});
	};
	
	return publisher;
});