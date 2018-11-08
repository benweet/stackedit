import renderAbc from 'abcjs/src/api/abc_tunebook_svg';
import extensionSvc from '../services/extensionSvc';

const render = (elt) => {
  const content = elt.textContent;
  // Create a div element
  const divElt = document.createElement('div');
  divElt.className = 'abc-notation-block';
  // Replace the pre element with the div
  elt.parentNode.parentNode.replaceChild(divElt, elt.parentNode);
  renderAbc(divElt, content, {});
};

extensionSvc.onGetOptions((options, properties) => {
  options.abc = properties.extensions.abc.enabled;
});

extensionSvc.onSectionPreview((elt) => {
  elt.querySelectorAll('.prism.language-abc')
    .cl_each(notationElt => render(notationElt));
});
