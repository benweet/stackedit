// RequireJS configuration
requirejs.config({
	waitSeconds: 0,
    shim: {
        'jquery-ui': ['jquery'],
        'bootstrap': ['jquery'],
        'jgrowl': ['jquery'],
        'layout': ['jquery-ui'],
        'Markdown.Extra': ['Markdown.Converter', 'prettify'],
        'Markdown.Editor': ['Markdown.Extra']
    }
});

require(["jquery", "file-manager", "synchronizer", "publisher"], function($) {
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
	});
});
