// RequireJS configuration
requirejs.config({
	waitSeconds: 0,
    shim: {
        'jquery-ui': ['jquery'],
        'bootstrap': ['jquery'],
        'jgrowl': ['jquery'],
        'layout': ['jquery-ui'],
        'Markdown.Extra': ['Markdown.Converter', 'prettify'],
        'Markdown.Sanitizer': ['Markdown.Extra'],
        'Markdown.Editor': ['Markdown.Sanitizer']
    }
});

require(["jquery", "core"], function($, core) {
	$(function() {
		
		// If browser has detected a new application cache.
	    if (window.applicationCache) {
	    	window.applicationCache.addEventListener('updateready', function(e) {
	    		if(window.applicationCache.status === window.applicationCache.UPDATEREADY) {
	    			window.applicationCache.swapCache();
	    			window.location.reload();
	    		}
	    	}, false);
	    }
	    
		core.init();
	});
});
