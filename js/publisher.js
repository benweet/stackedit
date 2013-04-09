define(["jquery", "core", "async-runner"], function($, core, asyncTaskRunner) {
	
	// Dependencies
	var fileManager = undefined;

	var publisher = {};
	
	var wizardProvider = undefined;
	
	function initWizard(provider) {
		wizardProvider = provider;
		$("input:radio[name=radio-publish-existing][value=new]").prop("checked", true);
		$("input:radio[name=radio-publish-format][value=markdown]").prop("checked", true);
	}
	
	publisher.init = function(fileManagerModule) {
		fileManager = fileManagerModule;
		$("#action-publish-github").click(function() {
			initWizard("github");
		});
		$("#action-publish-blogger").click(function() {
			initWizard("blogger");
		});
		$("#action-publish-wordpress").click(function() {
			initWizard("wordpress");
		});
		$("#action-publish-tumblr").click(function() {
			initWizard("tumblr");
		});
	};
	
	publisher.initWizard = function() {
		
	};
	
	return publisher;
});