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

var load = requirejs.load;
requirejs.load = function (context, moduleId, url) {
    // MathJax configuration
	if(url.indexOf("MathJax.js") !== -1) {
		url += "?config=TeX-AMS_HTML";
	}
    return load(context, moduleId, url);
};

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
