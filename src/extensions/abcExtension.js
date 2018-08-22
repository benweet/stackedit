import abcjs from 'abcjs';
import extensionSvc from '../services/extensionSvc';

const render = (elt) => {
  const abcContent = elt.textContent;
  abcjs.renderAbc(elt.parentNode.parentNode, abcContent, {});
};

extensionSvc.onGetOptions((options, properties) => {
  options.abc = properties.extensions.abc.enabled;
});

extensionSvc.onSectionPreview((elt) => {
  elt.querySelectorAll('.prism.language-abc')
    .cl_each(notationElt => render(notationElt));
});
