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
	'pagedownExtra'
], function($, _, utils, logger, Extension, markdownExtraSettingsBlockHTML, prettify, hljs) {

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
		highlighter: "highlight"
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
	};

	var eventMgr;
	markdownExtra.onEventMgrCreated = function(eventMgrParameter) {
		eventMgr = eventMgrParameter;
	};

	var previewContentsElt;
	markdownExtra.onReady = function() {
		previewContentsElt = document.getElementById('preview-contents');
	};

	markdownExtra.onPagedownConfigure = function(editor) {
		var converter = editor.getConverter();
		var extraOptions = {
			extensions: markdownExtra.config.extensions,
			highlighter: "prettify"
		};

		if(markdownExtra.config.intraword === true) {
			var converterOptions = {
				_DoItalicsAndBold: function(text) {
					text = text.replace(/([^\w*]|^)(\*\*|__)(?=\S)(.+?[*_]*)(?=\S)\2(?=[^\w*]|$)/g, "$1<strong>$3</strong>");
					text = text.replace(/([^\w*]|^)(\*|_)(?=\S)(.+?)(?=\S)\2(?=[^\w*]|$)/g, "$1<em>$3</em>");
					// Redo bold to handle _**word**_
					text = text.replace(/([^\w*]|^)(\*\*|__)(?=\S)(.+?[*_]*)(?=\S)\2(?=[^\w*]|$)/g, "$1<strong>$3</strong>");
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
		if(markdownExtra.config.highlighter == "highlight") {
			var previewContentsElt = document.getElementById('preview-contents');
			editor.hooks.chain("onPreviewRefresh", function() {
				_.each(previewContentsElt.querySelectorAll('.prettyprint > code'), function(elt) {
					!elt.highlighted && hljs.highlightBlock(elt);
					elt.highlighted = true;
				});
			});
		}
		else if(markdownExtra.config.highlighter == "prettify") {
			editor.hooks.chain("onPreviewRefresh", prettify.prettyPrint);
		}
		Markdown.Extra.init(converter, extraOptions);
	};

	return markdownExtra;
});
