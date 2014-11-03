define([
	"jquery",
	"underscore",
	"utils",
	"logger",
	"classes/Extension",
	"text!html/umlDiagramsSettingsBlock.html",
	'crel',
	'Diagram',
	'flow-chart'
], function($, _, utils, logger, Extension, umlDiagramsSettingsBlockHTML, crel, Diagram, flowChart) {

	var umlDiagrams = new Extension("umlDiagrams", "UML Diagrams", true);
	umlDiagrams.settingsBlock = umlDiagramsSettingsBlockHTML;
	umlDiagrams.defaultConfig = {
		flowchartOptions: [
			'{',
			'   "line-width": 2,',
			'   "font-family": "sans-serif",',
			'   "font-weight": "normal"',
			'}'
		].join('\n')
	};

	umlDiagrams.onLoadSettings = function() {
		utils.setInputValue("#textarea-umldiagram-flowchart-options", umlDiagrams.config.flowchartOptions);
	};

	umlDiagrams.onSaveSettings = function(newConfig, event) {
		newConfig.flowchartOptions = utils.getInputJSONValue("#textarea-umldiagram-flowchart-options", event);
	};

	umlDiagrams.onPagedownConfigure = function(editor) {
		var previewContentsElt = document.getElementById('preview-contents');
		editor.hooks.chain("onPreviewRefresh", function() {
			_.each(previewContentsElt.querySelectorAll('.prettyprint > .language-sequence'), function(elt) {
				try {
					var diagram = Diagram.parse(elt.textContent);
					var preElt = elt.parentNode;
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
			});
			_.each(previewContentsElt.querySelectorAll('.prettyprint > .language-flow'), function(elt) {
				try {
					var chart = flowChart.parse(elt.textContent);
					var preElt = elt.parentNode;
					var containerElt = crel('div', {
						class: 'flow-chart'
					});
					preElt.parentNode.replaceChild(containerElt, preElt);
					chart.drawSVG(containerElt, JSON.parse(umlDiagrams.config.flowchartOptions));
				}
				catch(e) {
				}
			});
		});
	};

	return umlDiagrams;
});
