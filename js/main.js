// Use specific customization for sites
var configPaths = {};
if(location.hostname.indexOf("benweet.github.") === 0) {
	configPaths.custo = 'custo.github';
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
		core.init();
		fileManager.init();
	});
});
