define( [
    "underscore",
    "extensions/notifications",
    "extensions/markdown-extra",
    "extensions/math-jax",
    "extensions/scroll-link"
], function() {
		
	var extensionManager = {};
	
	// Create a map with providerId: providerObject
	var extensionList = _.chain(arguments)
		.map(function(argument) {
			return argument && argument.extensionId && argument;
		}).compact().value();

	// Return every named callbacks implemented in extensions
	function getExtensionCallbackList(callbackName) {
		return _.chain(extensionList)
			.map(function(extension) {
				return extension[callbackName];
			}).compact().value();
	}
	
	// Return a function that calls every callbacks from extensions 
	function createCallback(callbackName) {
		var callbackList = getExtensionCallbackList(callbackName);
		return function() {
			var callbackArguments = arguments;
			_.each(callbackList, function(callback) {
				callback.apply(null, callbackArguments);
			});
		};
	}
	
	// Add a callback to the extensionManager
	function addCallback(callbackName) {
		extensionManager[callbackName] = createCallback(callbackName);
	}
	
	extensionManager.init = function(extensionConfigMap) {
		// Set the extension configuration
		extensionConfigMap = extensionConfigMap || {};
		_.each(extensionList, function(extension) {
			extension.config = _.extend({}, extension.defaultConfig, extensionConfigMap[extension.extensionId]); 
		});
	};

	addCallback("onReady");
	addCallback("onMessage");
	addCallback("onError");
	addCallback("onOfflineChanged");
	addCallback("onLayoutConfigure");
	addCallback("onLayoutCreated");
	addCallback("onEditorConfigure");
	
	var onPreviewFinished = createCallback("onPreviewFinished");
	var onAsyncPreviewCallbackList = getExtensionCallbackList("onAsyncPreview"); 
	extensionManager["onAsyncPreview"] = function() {
		// Call onPreviewFinished callbacks when all async preview are finished
		var counter = 0;
		function tryFinished() {
			if(counter === onAsyncPreviewCallbackList.length) {
				onPreviewFinished();
			}
		}
		_.each(onAsyncPreviewCallbackList, function(asyncPreviewCallback) {
			asyncPreviewCallback(function() {
				counter++;
				tryFinished();
			});
		});
		tryFinished();
	};
	
	return extensionManager;
});