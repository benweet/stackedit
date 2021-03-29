import 'mermaid';
import extensionSvc from '../services/extensionSvc';
import utils from '../services/utils';

const config = {
  logLevel: 5,
  startOnLoad: false,
  arrowMarkerAbsolute: false,
  theme: 'neutral',
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
};

const containerElt = document.createElement('div');
containerElt.className = 'hidden-rendering-container';
document.body.appendChild(containerElt);

let init = () => {
  window.mermaid.initialize(config);
  init = () => {};
};

const render = (elt) => {
  try {
    init();
    const svgId = `mermaid-svg-${utils.uid()}`;
    window.mermaid.mermaidAPI.render(svgId, elt.textContent, () => {
      while (elt.firstChild) {
        elt.removeChild(elt.lastChild);
      }
      elt.appendChild(containerElt.querySelector(`#${svgId}`));
    }, containerElt);
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
