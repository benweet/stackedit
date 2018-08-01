// import abcjs from 'abcjs';
import markdownItNotesSheet from './libs/markdownItNotesSheet';
import extensionSvc from '../services/extensionSvc';

extensionSvc.onGetOptions((options, properties) => {
  options.abc = properties.extensions.abc.enabled;
});

extensionSvc.onInitConverter(2, (markdown, options) => {
  if (options.abc) {
    markdown.use(markdownItNotesSheet);
  }
});
