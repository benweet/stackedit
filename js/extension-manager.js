define( [
    "jquery",
    "underscore",
    "utils",
    "settings",
    "extensions/button-publish",
    "extensions/button-share",
    "extensions/button-sync",
    "extensions/document-selector",
    "extensions/document-title",
    "extensions/manage-publication",
    "extensions/manage-synchronization",
    "extensions/working-indicator",
    "extensions/notifications",
    "extensions/markdown-extra",
    "extensions/toc",
    "extensions/math-jax",
    "extensions/scroll-link",
    "lib/bootstrap"
], function($, _, utils, settings) {
		
	var extensionMgr = {};
	
	// Create a list of extensions
	var extensionList = _.chain(
		arguments
	).map(function(argument) {
		return _.isObject(argument) && argument.extensionId && argument;
	}).compact().value();

	// Return every named callbacks implemented in extensions
	function getExtensionCallbackList(hookName) {
		return _.chain(
			extensionList
		).map(function(extension) {
			return extension.config.enabled && extension[hookName];
		}).compact().value();
	}
	
	// Return a function that calls every callbacks from extensions 
	function createHook(hookName) {
		var callbackList = getExtensionCallbackList(hookName);
		return function() {
			console.debug(hookName);
			var callbackArguments = arguments;
			_.each(callbackList, function(callback) {
				callback.apply(null, callbackArguments);
			});
		};
	}
	
	// Add a Hook to the extensionMgr
	function addHook(hookName) {
		extensionMgr[hookName] = createHook(hookName);
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

	// Set extension config
	extensionSettings = settings.extensionSettings || {};
	_.each(extensionList, function(extension) {
		extension.config = _.extend({}, extension.defaultConfig, extensionSettings[extension.extensionId]);
		extension.config.enabled = !extension.optional || extension.config.enabled === undefined || extension.config.enabled === true;
	});
	
	// Load/Save extension config from/to settings
	extensionMgr["onLoadSettings"] = function() {
		console.debug("onLoadSettings");
		_.each(extensionList, function(extension) {
			utils.setInputChecked("#input-enable-extension-" + extension.extensionId, extension.config.enabled);
			var onLoadSettingsCallback = extension.onLoadSettings;
			onLoadSettingsCallback && onLoadSettingsCallback();
		});
	};
	extensionMgr["onSaveSettings"] = function(newExtensionSettings, event) {
		console.debug("onSaveSettings");
		_.each(extensionList, function(extension) {
			var newExtensionConfig = extension.defaultConfig || {};
			newExtensionConfig.enabled = utils.getInputChecked("#input-enable-extension-" + extension.extensionId);
			var onSaveSettingsCallback = extension.onSaveSettings;
			onSaveSettingsCallback && onSaveSettingsCallback(newExtensionConfig, event);
			newExtensionSettings[extension.extensionId] = newExtensionConfig;
		});
	};
	
	addHook("onReady");
	addHook("onMessage");
	addHook("onError");
	addHook("onOfflineChanged");
	addHook("onAsyncRunning");
	
	// To store reference to modules that are accessible from extensions
	addHook("onFileMgrCreated");
	addHook("onSynchronizerCreated");
	addHook("onPublisherCreated");
	
	// Operations on files
	addHook("onFileSystemCreated");
	addHook("onFileCreated");
	addHook("onFileDeleted");
	addHook("onFileChanged");
	addHook("onFileSelected");
	addHook("onTitleChanged");
	
	// Sync events
	addHook("onSyncRunning");
	addHook("onSyncSuccess");
	addHook("onSyncImportSuccess");
	addHook("onSyncExportSuccess");
	addHook("onSyncRemoved");
	
	// Publish events
	addHook("onPublishRunning");
	addHook("onPublishSuccess");
	addHook("onNewPublishSuccess");
	addHook("onPublishRemoved");
	
	// Operations on Layout
	addHook("onLayoutConfigure");
	addHook("onLayoutCreated");
	
	// Operations on PageDown
	addHook("onEditorConfigure");
	
	var onPreviewFinished = createHook("onPreviewFinished");
	var onAsyncPreviewCallbackList = getExtensionCallbackList("onAsyncPreview"); 
	extensionMgr["onAsyncPreview"] = function() {
		console.debug("onAsyncPreview");
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
	
	$(function() {
		// Create accordion in settings dialog
		_.each(extensionList, createSettings);
	});
	
	return extensionMgr;
});