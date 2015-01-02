// RequireJS configuration
/*global requirejs */
requirejs.config({
	waitSeconds: 0,
	packages: [
		{
			name: 'css',
			location: 'bower-libs/require-css',
			main: 'css'
		},
		{
			name: 'less',
			location: 'bower-libs/require-less',
			main: 'less'
		}
	],
	paths: {
		jquery: 'bower-libs/jquery/dist/jquery',
		underscore: 'bower-libs/underscore/underscore',
		crel: 'bower-libs/crel/crel',
		jgrowl: 'bower-libs/jgrowl/jquery.jgrowl',
		mousetrap: 'bower-libs/mousetrap/mousetrap',
		'mousetrap-record': 'bower-libs/mousetrap/plugins/record/mousetrap-record',
		toMarkdown: 'bower-libs/to-markdown/src/to-markdown',
		text: 'bower-libs/requirejs-text/text',
		bootstrap: 'bower-libs/bootstrap/dist/js/bootstrap',
		requirejs: 'bower-libs/requirejs/require',
		'jquery-waitforimages': 'bower-libs/waitForImages/src/jquery.waitforimages',
		FileSaver: 'bower-libs/FileSaver/FileSaver',
		stacktrace: 'bower-libs/stacktrace/stacktrace',
		'requirejs-text': 'bower-libs/requirejs-text/text',
		css_browser_selector: 'bower-libs/css_browser_selector/css_browser_selector',
		'pagedown-extra': 'bower-libs/pagedown-extra/node-pagedown-extra',
		pagedownExtra: 'bower-libs/pagedown-extra/Markdown.Extra',
		pagedown: 'libs/Markdown.Editor',
		'require-css': 'bower-libs/require-css/css',
		xregexp: 'bower-libs/xregexp/xregexp-all',
		yaml: 'bower-libs/yaml.js/dist/yaml',
		'yaml.js': 'bower-libs/yaml.js',
		'yaml-js': 'bower-libs/yaml.js/dist/yaml',
		css: 'bower-libs/require-css/css',
		'css-builder': 'bower-libs/require-css/css-builder',
		normalize: 'bower-libs/require-css/normalize',
		prism: 'bower-libs/prism/prism',
		'prism-core': 'bower-libs/prism/components/prism-core',
		MutationObservers: 'bower-libs/MutationObservers/MutationObserver',
		WeakMap: 'bower-libs/WeakMap/weakmap',
		rangy: 'bower-libs/rangy/rangy-core',
		'rangy-cssclassapplier': 'bower-libs/rangy/rangy-cssclassapplier',
		diff_match_patch: 'bower-libs/google-diff-match-patch-js/diff_match_patch',
		diff_match_patch_uncompressed: 'bower-libs/google-diff-match-patch-js/diff_match_patch_uncompressed',
		jsondiffpatch: 'bower-libs/jsondiffpatch/build/bundle',
		hammerjs: 'bower-libs/hammerjs/hammer',
		'to-markdown': 'bower-libs/to-markdown/src/to-markdown',
		waitForImages: 'bower-libs/waitForImages/dist/jquery.waitforimages',
		alertify: 'bower-libs/alertify.js/lib/alertify'
	},
	shim: {
		underscore: {
			exports: '_'
		},
		jgrowl: {
			deps: [
				'jquery'
			],
			exports: 'jQuery.jGrowl'
		},
		diff_match_patch_uncompressed: {
			exports: 'diff_match_patch'
		},
		jsondiffpatch: [
			'diff_match_patch_uncompressed'
		],
		rangy: {
			exports: 'rangy'
		},
		'rangy-cssclassapplier': [
			'rangy'
		],
		mousetrap: {
			exports: 'Mousetrap'
		},
		'yaml-js': {
			exports: 'YAML'
		},
		'prism-core': {
			exports: 'Prism'
		},
		'bower-libs/prism/components/prism-markup': [
			'prism-core'
		],
		'libs/prism-latex': [
			'prism-core'
		],
		'libs/prism-markdown': [
			'bower-libs/prism/components/prism-markup',
			'libs/prism-latex'
		],
		'bootstrap-record': [
			'mousetrap'
		],
		toMarkdown: {
			deps: [
				'jquery'
			],
			exports: 'toMarkdown'
		},
		stacktrace: {
			exports: 'printStackTrace'
		},
		FileSaver: {
			exports: 'saveAs'
		},
		MutationObservers: [
			'WeakMap'
		],
		bootstrap: [
			'jquery'
		],
		'jquery-waitforimages': [
			'jquery'
		],
		pagedown: [
			'libs/Markdown.Converter'
		],
		pagedownExtra: [
			'libs/Markdown.Converter'
		]
	}
});

// Check browser compatibility
try {
	var test = 'seLocalStorageCheck';
	localStorage.setItem(test, test);
	localStorage.removeItem(test);
	var obj = {};
	Object.defineProperty(obj, 'prop', {
		get: function() {
		},
		set: function() {
		}
	});
}
catch(e) {
	alert('Your browser is not supported, sorry!');
	throw e;
}

// Viewer mode is deduced from the body class
window.viewerMode = /(^| )viewer($| )/.test(document.body.className);


// RequireJS entry point. By requiring synchronizer, publisher, sharing and
// media-importer, we are actually loading all the modules
require([
	"jquery",
	"rangy",
	"core",
	"eventMgr",
	"synchronizer",
	"publisher",
	"sharing",
	"plugins",
	"css",
	"rangy-cssclassapplier"
], function($, rangy, core, eventMgr) {

	if(window.noStart) {
		return;
	}

	$(function() {
		rangy.init();

		// Here, all the modules are loaded and the DOM is ready
		core.onReady();

		// If browser has detected a new application cache.
		if(window.applicationCache) {
			window.applicationCache.addEventListener('updateready', function() {
				if(window.applicationCache.status === window.applicationCache.UPDATEREADY) {
					window.applicationCache.swapCache();
					eventMgr.onMessage('New version available!\nJust refresh the page to upgrade.');
				}
			}, false);
		}
	});

});
