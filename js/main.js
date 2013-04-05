// Use specific customization for production
var custoPath = 'dev/custo';
if(location.hostname == "benweet.github.com") {
	custoPath = 'prod/custo';
}

// RequireJS configuration
requirejs.config({
    paths: {
        'custo': custoPath
    },
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
