/*globals requirejs */
define([
	'eventMgr',
	'storage',
	'settings',
	'logger'
	], function(eventMgr, storage, settings, logger) {

	var currentTheme, themeLoader;
	themeLoader = {};
	// Keep the theme in a global variable
	themeLoader.theme = storage.themeV4 || settings.defaultTheme;

	//force to load theme first time
	eventMgr.addListener('onLayoutCreated', function() {
		themeLoader.applyTheme(themeLoader.theme);
	});


	// Hot theme switcher in the settings
	themeLoader.applyTheme = function(theme) {
		logger.log('applying theme %s', theme);
		theme = theme || settings.defaultTheme;
		if(currentTheme != theme) {
			var themeModule = "less!themes/" + theme;
			if(window.baseDir.indexOf('-min') !== -1) {
				themeModule = "css!themes/" + theme;
			}
			// Undefine the module in RequireJS
			requirejs.undef(themeModule);
			// Then reload the style
			require([
				themeModule
			]);
			currentTheme = theme;
		}
	};


	return themeLoader;
});
