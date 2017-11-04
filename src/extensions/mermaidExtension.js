import mermaidUtils from 'mermaid/src/utils';
import flowRenderer from 'mermaid/src/diagrams/flowchart/flowRenderer';
import seq from 'mermaid/src/diagrams/sequenceDiagram/sequenceRenderer';
import info from 'mermaid/src/diagrams/example/exampleRenderer';
import gantt from 'mermaid/src/diagrams/gantt/ganttRenderer';
import classRenderer from 'mermaid/src/diagrams/classDiagram/classRenderer';
import gitGraphRenderer from 'mermaid/src/diagrams/gitGraph/gitGraphRenderer';
import extensionSvc from '../services/extensionSvc';
import utils from '../services/utils';

const config = {
  logLevel: 5,
  startOnLoad: false,
  arrowMarkerAbsolute: false,
  flowchart: {
    htmlLabels: true,
    useMaxWidth: true,
  },
  sequenceDiagram: {
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
    numberSectionStyles: 3,
    axisFormatter: [
      // Within a day
      ['%I:%M', d => d.getHours()],
      // Monday a week
      ['w. %U', d => d.getDay() === 1],
      // Day within a week (not monday)
      ['%a %d', d => d.getDay() && d.getDate() !== 1],
      // within a month
      ['%b %d', d => d.getDate() !== 1],
      // Month
      ['%m-%y', d => d.getMonth()],
    ],
  },
  classDiagram: {},
  gitGraph: {},
  info: {},
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
      case 'gitGraph':
        config.flowchart.arrowMarkerAbsolute = config.arrowMarkerAbsolute;
        gitGraphRenderer.setConf(config.gitGraph);
        gitGraphRenderer.draw(txt, svgId, false);
        break;
      case 'graph':
        config.flowchart.arrowMarkerAbsolute = config.arrowMarkerAbsolute;
        flowRenderer.setConf(config.flowchart);
        flowRenderer.draw(txt, svgId, false);
        break;
      case 'dotGraph':
        config.flowchart.arrowMarkerAbsolute = config.arrowMarkerAbsolute;
        flowRenderer.setConf(config.flowchart);
        flowRenderer.draw(txt, svgId, true);
        break;
      case 'sequenceDiagram':
        config.sequenceDiagram.arrowMarkerAbsolute = config.arrowMarkerAbsolute;
        seq.setConf(config.sequenceDiagram);
        seq.draw(txt, svgId);
        break;
      case 'gantt':
        config.gantt.arrowMarkerAbsolute = config.arrowMarkerAbsolute;
        gantt.setConf(config.gantt);
        gantt.draw(txt, svgId);
        break;
      case 'classDiagram':
        config.classDiagram.arrowMarkerAbsolute = config.arrowMarkerAbsolute;
        classRenderer.setConf(config.classDiagram);
        classRenderer.draw(txt, svgId);
        break;
      case 'info':
      default:
        config.info.arrowMarkerAbsolute = config.arrowMarkerAbsolute;
        info.draw(txt, svgId, 'Unknown');
        break;
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
  elt.querySelectorAll('.prism.language-mermaid').cl_each(
    diagramElt => render(diagramElt.parentNode));
});
