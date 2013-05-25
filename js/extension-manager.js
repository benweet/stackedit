define( [
    "jquery",
    "utils",
    "underscore",
    "bootstrap",
    "extensions/notifications",
    "extensions/markdown-extra",
    "extensions/math-jax",
    "extensions/scroll-link"
], function($, utils) {
		
	var extensionManager = {};
	
	// Create a map with providerId: providerObject
	var extensionList = _.chain(arguments)
		.map(function(argument) {
			return _.isObject(argument) && argument.extensionId && argument;
		}).compact().value();

	// Return every named callbacks implemented in extensions
	function getExtensionCallbackList(callbackName) {
		return _.chain(extensionList)
			.map(function(extension) {
				return extension.config.enabled && extension[callbackName];
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
	
	var accordionTmpl = [
         		        '<div class="accordion-group">',
         	         		'<div class="accordion-heading">',
 		         				'<label class="checkbox pull-right">',
 		         					'<input id="input-enable-extension-<%= extensionId %>" type="checkbox" <% if(!optional) { %> disabled <% } %>> enabled',
 		         				'</label>',
         		         		'<a id="accordion-toggle-test" data-toggle="collapse" data-parent="#accordion-extensions" class="accordion-toggle" href="#collapse-<%= extensionId %>">',
         		         			'<%= extensionName %>',
         		         		'</a>',
         		         	'</div>',
                  			'<div id="collapse-<%= extensionId %>" class="accordion-body collapse">',
                  				'<div class="accordion-inner"><%= settingsBloc %></div>',
                  			'</div>',
	                  	'</div>'].join("");
	         		
	function createSettings(extension) {
		$("#accordion-extensions").append($(_.template(accordionTmpl, {
			extensionId: extension.extensionId,
			extensionName: extension.extensionName,
			optional: extension.optional,
			settingsBloc: extension.settingsBloc
		})));
	}
	
	extensionManager.init = function(extensionSettings) {
		
		// Set extension config
		extensionSettings = extensionSettings || {};
		_.each(extensionList, function(extension) {
			extension.config = _.extend({}, extension.defaultConfig, extensionSettings[extension.extensionId]);
			extension.config.enabled = !extension.optional || extension.config.enabled;
		});
		
		// Create accordion in settings dialog
		_.each(extensionList, createSettings);

		// Load/Save extension config from/to settings
		addCallback("onLoadSettings");
		extensionManager["onLoadSettings"] = function() {
			_.each(extensionList, function(extension) {
				utils.setInputChecked("#input-enable-extension-" + extension.extensionId, extension.config.enabled);
				var onLoadSettingsCallback = extension.onLoadSettings;
				onLoadSettingsCallback && onLoadSettingsCallback();
			});
		};
		extensionManager["onSaveSettings"] = function(newExtensionSettings, event) {
			_.each(extensionList, function(extension) {
				var newExtensionConfig = extension.defaultConfig || {};
				newExtensionConfig.enabled = utils.getInputChecked("#input-enable-extension-" + extension.extensionId);
				var onSaveSettingsCallback = extension.onSaveSettings;
				onSaveSettingsCallback && onSaveSettingsCallback(newExtensionConfig, event);
				newExtensionSettings[extension.extensionId] = newExtensionConfig;
			});
		};
		
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
		
		// Call onReady callbacks
		createCallback("onReady")();
	};
	
	return extensionManager;
});