/* eslint-disable */
import abcjs from 'abcjs';
import markdownItNotesSheet from './libs/markdownItNotesSheet';
import extensionSvc from '../services/extensionSvc';

const render = (elt) => {
  const abcContent = elt.textContent;
  elt.parentNode.parentNode.id = 'abcSheetPaper';
  abcjs.renderAbc('abcSheetPaper', abcContent, {});
}

extensionSvc.onGetOptions((options, properties) => {
  options.abc = properties.extensions.abc.enabled;
});

extensionSvc.onSectionPreview((elt) => {
  elt.querySelectorAll('.prism.language-abc')
    .cl_each(notationElt => render(notationElt));
});
