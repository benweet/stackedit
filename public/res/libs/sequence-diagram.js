// Hack to make js-sequence-diagram AMD friendly
define([
	'text!bower-libs/js-sequence-diagrams/build/sequence-diagram-min.js',
	'raphael',
	'underscore'
], function(sequenceDiagramMinJS) {
	/*jshint evil: true */
	eval(sequenceDiagramMinJS);
	return window.Diagram;
});

