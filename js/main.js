requirejs.config({
    paths: {
        custo: [
            'dev/custo',
            'prod/custo'
        ]
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
		core.init();
		fileManager.init();
	});
});
