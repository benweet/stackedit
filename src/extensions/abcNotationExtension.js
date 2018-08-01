import abcjs from 'abcjs';
import markdownItNotesSheet from './libs/markdownItNotesSheet';
import extensionSvc from '../services/extensionSvc';

let abc;

extensionSvc.onGetOptions((options, properties) => {
  options.abc = properties.extensions.abc.enabled;
});

extensionSvc.onInitConverter(2, (markdown, options) => {
  if (options.abc) {
    markdown.use(markdownItNotesSheet, (val) => {
      abc = val;
    });
  }
});

extensionSvc.onSectionPreview(() => {
  if (document.querySelector('#abcSheetPaper') != null && abc != null) {
    abcjs.renderAbc('abcSheetPaper', abc, {});
  }
});
