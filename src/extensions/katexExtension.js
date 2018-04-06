import katex from 'katex';
import markdownItMath from './libs/markdownItMath';
import extensionSvc from '../services/extensionSvc';

extensionSvc.onGetOptions((options, properties) => {
  options.math = properties.extensions.katex.enabled;
});

extensionSvc.onInitConverter(2, (markdown, options) => {
  if (options.math) {
    markdown.use(markdownItMath);
    markdown.renderer.rules.inline_math = (tokens, idx) =>
      `<span class="katex--inline">${markdown.utils.escapeHtml(tokens[idx].content)}</span>`;
    markdown.renderer.rules.display_math = (tokens, idx) =>
      `<span class="katex--display">${markdown.utils.escapeHtml(tokens[idx].content)}</span>`;
  }
});

extensionSvc.onSectionPreview((elt) => {
  const highlighter = displayMode => (katexElt) => {
    if (!katexElt.highlighted) {
      try {
        katex.render(katexElt.textContent, katexElt, { displayMode });
      } catch (e) {
        katexElt.textContent = `${e.message}`;
      }
    }
    katexElt.highlighted = true;
  };
  elt.querySelectorAll('.katex--inline').cl_each(highlighter(false));
  elt.querySelectorAll('.katex--display').cl_each(highlighter(true));
});
