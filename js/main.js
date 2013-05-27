// RequireJS configuration
requirejs.config({
	waitSeconds: 0,
	paths: {
		"jquery": "lib/jquery",
		"underscore": "lib/underscore",
		"jgrowl": "lib/jgrowl",
		"lib/MathJax": '../lib/MathJax/MathJax.js?config=TeX-AMS_HTML'
    },
    shim: {
    	'underscore': {
            exports: '_'
        },
        'jgrowl': {
            deps: ['jquery'],
            exports: 'jQuery.jGrowl'
        },
        'lib/jquery-ui': ['jquery'],
        'lib/bootstrap': ['jquery'],
        'lib/layout': ['lib/jquery-ui'],
        'lib/Markdown.Extra': ['lib/Markdown.Converter', 'lib/prettify'],
        'lib/Markdown.Editor': ['lib/Markdown.Converter']
    }
});

require([
	"jquery",
	"core",
	"synchronizer",
	"publisher"
], function($, core) {
	
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
	    
	    core.setReady();
	});
	
});
