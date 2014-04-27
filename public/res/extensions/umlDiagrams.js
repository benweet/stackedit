define([
	"jquery",
	"underscore",
	"utils",
	"logger",
	"classes/Extension",
	"text!html/umlDiagramsSettingsBlock.html",
	'crel',
	'sequence-diagram',
	'flow-chart'
], function($, _, utils, logger, Extension, umlDiagramsSettingsBlockHTML, crel, sequenceDiagram, flowChart) {

	var umlDiagrams = new Extension("umlDiagrams", "UML Diagrams", true);
	umlDiagrams.settingsBlock = umlDiagramsSettingsBlockHTML;

	var eventMgr;
	umlDiagrams.onEventMgrCreated = function(eventMgrParameter) {
		eventMgr = eventMgrParameter;
	};

	var previewContentsElt;
	umlDiagrams.onReady = function() {
		previewContentsElt = document.getElementById('preview-contents');
	};

	var onAsyncPreview = function(cb) {
		cb();
	};
	umlDiagrams.onAsyncPreview = function(cb) {
		onAsyncPreview(cb);
	};

	umlDiagrams.onInit = function() {
		var sequenceDiagramEltList, flowChartEltList;
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

	};

	return umlDiagrams;
});
