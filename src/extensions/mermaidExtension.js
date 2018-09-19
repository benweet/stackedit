import mermaidUtils from 'mermaid/src/utils';
import flowRenderer from 'mermaid/src/diagrams/flowchart/flowRenderer';
import sequenceRenderer from 'mermaid/src/diagrams/sequence/sequenceRenderer';
import ganttRenderer from 'mermaid/src/diagrams/gantt/ganttRenderer';
import classRenderer from 'mermaid/src/diagrams/class/classRenderer';
import gitGraphRenderer from 'mermaid/src/diagrams/git/gitGraphRenderer';
import extensionSvc from '../services/extensionSvc';
import utils from '../services/utils';

const config = {
  logLevel: 5,
  startOnLoad: false,
  arrowMarkerAbsolute: false,
  flowchart: {
    htmlLabels: true,
    curve: 'linear',
  },
  sequence: {
    diagramMarginX: 50,
    diagramMarginY: 10,
    actorMargin: 50,
    width: 150,
    height: 65,
    boxMargin: 10,
    boxTextMargin: 5,
    noteMargin: 10,
    messageMargin: 35,
    mirrorActors: true,
    bottomMarginAdj: 1,
    useMaxWidth: true,
  },
  gantt: {
    titleTopMargin: 25,
    barHeight: 20,
    barGap: 4,
    topPadding: 50,
    leftPadding: 75,
    gridLineStartPadding: 35,
    fontSize: 11,
    fontFamily: '"Open-Sans", "sans-serif"',
    numberSectionStyles: 4,
    axisFormat: '%Y-%m-%d',
  },
  class: {},
  git: {},
};

const containerElt = document.createElement('div');
containerElt.className = 'hidden-rendering-container';
document.body.appendChild(containerElt);

const render = (elt) => {
  const svgId = `mermaid-svg-${utils.uid()}`;
  const txt = elt.textContent;
  containerElt.innerHTML = `<div class="mermaid"><svg xmlns="http://www.w3.org/2000/svg" id="${svgId}"><g></g></svg></div>`;

  try {
    const graphType = mermaidUtils.detectType(txt);
    switch (graphType) {
      case 'git':
        config.flowchart.arrowMarkerAbsolute = config.arrowMarkerAbsolute;
        gitGraphRenderer.setConf(config.git);
        gitGraphRenderer.draw(txt, svgId, false);
        break;
      case 'flowchart':
        config.flowchart.arrowMarkerAbsolute = config.arrowMarkerAbsolute;
        flowRenderer.setConf(config.flowchart);
        flowRenderer.draw(txt, svgId, false);
        break;
      case 'sequence':
        config.sequence.arrowMarkerAbsolute = config.arrowMarkerAbsolute;
        sequenceRenderer.setConf(config.sequence);
        sequenceRenderer.draw(txt, svgId);
        break;
      case 'gantt':
        config.gantt.arrowMarkerAbsolute = config.arrowMarkerAbsolute;
        ganttRenderer.setConf(config.gantt);
        ganttRenderer.draw(txt, svgId);
        break;
      case 'class':
        config.class.arrowMarkerAbsolute = config.arrowMarkerAbsolute;
        classRenderer.setConf(config.class);
        classRenderer.draw(txt, svgId);
        break;
      default:
        throw new Error('Invalid graph type.');
    }
    elt.parentNode.replaceChild(containerElt.firstChild, elt);
  } catch (e) {
    console.error(e); // eslint-disable-line no-console
  }
};

extensionSvc.onGetOptions((options, properties) => {
  options.mermaid = properties.extensions.mermaid.enabled;
});

extensionSvc.onSectionPreview((elt) => {
  elt.querySelectorAll('.prism.language-mermaid')
    .cl_each(diagramElt => render(diagramElt.parentNode));
});
