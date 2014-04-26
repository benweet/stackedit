/*globals Markdown */
define([
	"jquery",
	"underscore",
	"utils",
	"logger",
	"classes/Extension",
	"text!html/markdownExtraSettingsBlock.html",
	'google-code-prettify',
	'highlightjs',
	'crel',
	'sequence-diagram',
	'flow-chart',
	'text!html/tooltipMarkdownExtraDiagrams.html',
	'pagedown-extra'
], function($, _, utils, logger, Extension, markdownExtraSettingsBlockHTML, prettify, hljs, crel, sequenceDiagram, flowChart, tooltipMarkdownExtraDiagramsHTML) {

	var markdownExtra = new Extension("markdownExtra", "Markdown Extra", true);
	markdownExtra.settingsBlock = markdownExtraSettingsBlockHTML;
	markdownExtra.defaultConfig = {
		extensions: [
			"fenced_code_gfm",
			"tables",
			"def_list",
			"attr_list",
			"footnotes",
			"smartypants",
			"strikethrough",
			"newlines"
		],
		intraword: true,
		comments: true,
		highlighter: "prettify"
	};

	markdownExtra.onLoadSettings = function() {
		function hasExtension(extensionName) {
			return _.some(markdownExtra.config.extensions, function(extension) {
				return extension == extensionName;
			});
		}

		utils.setInputChecked("#input-markdownextra-fencedcodegfm", hasExtension("fenced_code_gfm"));
		utils.setInputChecked("#input-markdownextra-tables", hasExtension("tables"));
		utils.setInputChecked("#input-markdownextra-deflist", hasExtension("def_list"));
		utils.setInputChecked("#input-markdownextra-attrlist", hasExtension("attr_list"));
		utils.setInputChecked("#input-markdownextra-footnotes", hasExtension("footnotes"));
		utils.setInputChecked("#input-markdownextra-smartypants", hasExtension("smartypants"));
		utils.setInputChecked("#input-markdownextra-strikethrough", hasExtension("strikethrough"));
		utils.setInputChecked("#input-markdownextra-newlines", hasExtension("newlines"));
		utils.setInputChecked("#input-markdownextra-intraword", markdownExtra.config.intraword);
		utils.setInputChecked("#input-markdownextra-comments", markdownExtra.config.comments);
		utils.setInputValue("#input-markdownextra-highlighter", markdownExtra.config.highlighter);
		utils.setInputChecked("#input-markdownextra-diagrams", markdownExtra.config.diagrams);
	};

	markdownExtra.onSaveSettings = function(newConfig) {
		newConfig.extensions = [];
		utils.getInputChecked("#input-markdownextra-fencedcodegfm") && newConfig.extensions.push("fenced_code_gfm");
		utils.getInputChecked("#input-markdownextra-tables") && newConfig.extensions.push("tables");
		utils.getInputChecked("#input-markdownextra-deflist") && newConfig.extensions.push("def_list");
		utils.getInputChecked("#input-markdownextra-attrlist") && newConfig.extensions.push("attr_list");
		utils.getInputChecked("#input-markdownextra-footnotes") && newConfig.extensions.push("footnotes");
		utils.getInputChecked("#input-markdownextra-smartypants") && newConfig.extensions.push("smartypants");
		utils.getInputChecked("#input-markdownextra-strikethrough") && newConfig.extensions.push("strikethrough");
		utils.getInputChecked("#input-markdownextra-newlines") && newConfig.extensions.push("newlines");
		newConfig.intraword = utils.getInputChecked("#input-markdownextra-intraword");
		newConfig.comments = utils.getInputChecked("#input-markdownextra-comments");
		newConfig.highlighter = utils.getInputValue("#input-markdownextra-highlighter");
		newConfig.diagrams = utils.getInputChecked("#input-markdownextra-diagrams");
	};

	var eventMgr;
	markdownExtra.onEventMgrCreated = function(eventMgrParameter) {
		eventMgr = eventMgrParameter;
	};

	var previewContentsElt;
	markdownExtra.onReady = function() {
		previewContentsElt = document.getElementById('preview-contents');
		utils.createTooltip(".tooltip-markdown-extra-diagrams", tooltipMarkdownExtraDiagramsHTML);
	};

	var onAsyncPreview = function(cb) {
		cb();
	};
	markdownExtra.onAsyncPreview = function(cb) {
		onAsyncPreview(cb);
	};

	var extraOptions;
	markdownExtra.onInit = function() {
		var sequenceDiagramEltList, flowChartEltList, highlightEltList, prettifyEltList;
		extraOptions = {
			extensions: markdownExtra.config.extensions
		};

		function doSequenceDiagram(cb) {
			if(sequenceDiagramEltList.length === 0) {
				return cb();
			}
			var sequenceDiagramElt = sequenceDiagramEltList.pop();
			try {
				var diagram = sequenceDiagram.parse(sequenceDiagramElt.textContent);
				var preElt = sequenceDiagramElt.parentNode;
				var containerElt = crel('div', {
					class: 'sequence-diagram'
				});
				preElt.parentNode.replaceChild(containerElt, preElt);
				diagram.drawSVG(containerElt, {
					theme: 'simple'
				});
			}
			catch(e) {
			}
			_.delay(doSequenceDiagram, 0, cb);
		}

		function doFlowChart(cb) {
			if(flowChartEltList.length === 0) {
				return cb();
			}
			var flowChartElt = flowChartEltList.pop();
			try {
				var chart = flowChart.parse(flowChartElt.textContent);
				var preElt = flowChartElt.parentNode;
				var containerElt = crel('div', {
					class: 'flow-chart'
				});
				preElt.parentNode.replaceChild(containerElt, preElt);
				chart.drawSVG(containerElt, {
					'line-width': 2
				});
			}
			catch(e) {
			}
			_.delay(doFlowChart, 0, cb);
		}

		function doHighlight(cb) {
			if(highlightEltList.length === 0) {
				return cb();
			}
			var highlightElt = highlightEltList.pop();
			hljs.highlightBlock(highlightElt);
			highlightElt.highlighted = true;
			_.delay(doHighlight, 0, cb);
		}

		function doPrettify(cb) {
			if(prettifyEltList.length === 0) {
				return cb();
			}
			var prettifyElt = prettifyEltList.pop();
			var html = prettify.prettyPrintOne(prettifyElt.innerHTML);
			prettifyElt.innerHTML = html;
			prettifyElt.highlighted = true;
			_.delay(doPrettify, 0, cb);
		}

		if(markdownExtra.config.highlighter == "highlight") {
			extraOptions.highlighter = "prettify";
			var afterHighlight = onAsyncPreview;
			onAsyncPreview = function(cb) {
				highlightEltList = _.filter(previewContentsElt.querySelectorAll('.prettyprint > code'), function(elt) {
					return !elt.highlighted;
				});
				_.delay(doHighlight, 0, function() {
					afterHighlight(cb);
				});
			};
		}

		if(markdownExtra.config.highlighter == "prettify") {
			extraOptions.highlighter = "prettify";
			var afterPrettify = onAsyncPreview;
			onAsyncPreview = function(cb) {
				prettifyEltList = _.filter(previewContentsElt.querySelectorAll('.prettyprint > code'), function(elt) {
					return !elt.highlighted;
				});
				_.delay(doPrettify, 0, function() {
					afterPrettify(cb);
				});
			};
		}

		if(markdownExtra.config.diagrams) {
			extraOptions.highlighter = "prettify";
			var afterDiagrams = onAsyncPreview;
			onAsyncPreview = function(cb) {
				sequenceDiagramEltList = Array.prototype.slice.call(previewContentsElt.querySelectorAll('.prettyprint > .language-sequence'));
				flowChartEltList = Array.prototype.slice.call(previewContentsElt.querySelectorAll('.prettyprint > .language-flow'));
				_.delay(doSequenceDiagram, 0, function() {
					_.delay(doFlowChart, 0, function() {
						afterDiagrams(cb);
					});
				});
			};
		}

	};

	markdownExtra.onPagedownConfigure = function(editor) {
		var converter = editor.getConverter();
		if(markdownExtra.config.intraword === true) {
			var converterOptions = {
				_DoItalicsAndBold: function(text) {
					text = text.replace(/([^\w*]|^)(\*\*|__)(?=\S)(.+?[*_]*)(?=\S)\2(?=[^\w*]|$)/g, "$1<strong>$3</strong>");
					text = text.replace(/([^\w*]|^)(\*|_)(?=\S)(.+?)(?=\S)\2(?=[^\w*]|$)/g, "$1<em>$3</em>");
					return text;
				}
			};
			converter.setOptions(converterOptions);
		}
		if(markdownExtra.config.comments === true) {
			converter.hooks.chain("postConversion", function(text) {
				return text.replace(/<!--.*?-->/g, function(wholeMatch) {
					return wholeMatch.replace(/^<!---(.+?)-?-->$/, ' <span class="comment label label-danger">$1</span> ');
				});
			});
		}
		Markdown.Extra.init(converter, extraOptions);
	};

	return markdownExtra;
});
