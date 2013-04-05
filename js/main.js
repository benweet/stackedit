// Use specific customization for sites
var configPaths = {};
if(location.hostname == "benweet.github.com") {
	paths.custo = 'custo.github';
}

// RequireJS configuration
requirejs.config({
    paths: configPaths,
    shim: {
        'jquery-ui': ['jquery'],
        'bootstrap': ['jquery'],
        'jgrowl': ['jquery'],
        'layout': ['jquery-ui'],
        'Markdown.Sanitizer': ['Markdown.Converter'],
        'Markdown.Editor': ['Markdown.Sanitizer']
    }
});

require(["jquery", "core", "file-manager", "config", "custo"], function($, core, fileManager) {
	$(function() {
		
		// If browser detected a new application cache.
	    if (window.applicationCache
				&& window.applicationCache.status == window.applicationCache.UPDATEREADY) {
			window.applicationCache.swapCache();
			window.location.reload();
			return;
		}
	    
		core.init();
		fileManager.init();
	});
});
