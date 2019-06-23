import Prism from 'prismjs';
import markdownitAbbr from 'markdown-it-abbr';
import markdownitDeflist from 'markdown-it-deflist';
import markdownitFootnote from 'markdown-it-footnote';
import markdownitMark from 'markdown-it-mark';
import markdownitImgsize from 'markdown-it-imsize';
import markdownitSub from 'markdown-it-sub';
import markdownitSup from 'markdown-it-sup';
import markdownitTasklist from './libs/markdownItTasklist';
import markdownitAnchor from './libs/markdownItAnchor';
import extensionSvc from '../services/extensionSvc';

const coreBaseRules = [
  'normalize',
  'block',
  'inline',
  'linkify',
  'replacements',
  'smartquotes',
];
const blockBaseRules = [
  'code',
  'fence',
  'blockquote',
  'hr',
  'list',
  'reference',
  'heading',
  'lheading',
  'html_block',
  'table',
  'paragraph',
];
const inlineBaseRules = [
  'text',
  'newline',
  'escape',
  'backticks',
  'strikethrough',
  'emphasis',
  'link',
  'image',
  'autolink',
  'html_inline',
  'entity',
];
const inlineBaseRules2 = [
  'balance_pairs',
  'strikethrough',
  'emphasis',
  'text_collapse',
];

extensionSvc.onGetOptions((options, properties) => Object
  .assign(options, properties.extensions.markdown));

extensionSvc.onInitConverter(0, (markdown, options) => {
  markdown.set({
    html: true,
    breaks: !!options.breaks,
    linkify: !!options.linkify,
    typographer: !!options.typographer,
    langPrefix: 'prism language-',
  });

  markdown.core.ruler.enable(coreBaseRules);

  const blockRules = blockBaseRules.slice();
  if (!options.fence) {
    blockRules.splice(blockRules.indexOf('fence'), 1);
  }
  if (!options.table) {
    blockRules.splice(blockRules.indexOf('table'), 1);
  }
  markdown.block.ruler.enable(blockRules);

  const inlineRules = inlineBaseRules.slice();
  const inlineRules2 = inlineBaseRules2.slice();
  if (!options.del) {
    inlineRules.splice(blockRules.indexOf('strikethrough'), 1);
    inlineRules2.splice(blockRules.indexOf('strikethrough'), 1);
  }
  markdown.inline.ruler.enable(inlineRules);
  markdown.inline.ruler2.enable(inlineRules2);

  if (options.abbr) {
    markdown.use(markdownitAbbr);
  }
  if (options.deflist) {
    markdown.use(markdownitDeflist);
  }
  if (options.footnote) {
    markdown.use(markdownitFootnote);
  }
  if (options.imgsize) {
    markdown.use(markdownitImgsize);
  }
  if (options.mark) {
    markdown.use(markdownitMark);
  }
  if (options.sub) {
    markdown.use(markdownitSub);
  }
  if (options.sup) {
    markdown.use(markdownitSup);
  }
  if (options.tasklist) {
    markdown.use(markdownitTasklist);
  }
  markdown.use(markdownitAnchor);

  // Wrap tables into a div for scrolling
  markdown.renderer.rules.table_open = (tokens, idx, opts) =>
    `<div class="table-wrapper">${markdown.renderer.renderToken(tokens, idx, opts)}`;
  markdown.renderer.rules.table_close = (tokens, idx, opts) =>
    `${markdown.renderer.renderToken(tokens, idx, opts)}</div>`;

  // Transform style into align attribute to pass the HTML sanitizer
  const textAlignLength = 'text-align:'.length;
  markdown.renderer.rules.td_open = (tokens, idx, opts) => {
    const token = tokens[idx];
    if (token.attrs && token.attrs.length && token.attrs[0][0] === 'style') {
      token.attrs = [
        ['align', token.attrs[0][1].slice(textAlignLength)],
      ];
    }
    return markdown.renderer.renderToken(tokens, idx, opts);
  };
  markdown.renderer.rules.th_open = markdown.renderer.rules.td_open;

  markdown.renderer.rules.footnote_ref = (tokens, idx) => {
    const n = `${Number(tokens[idx].meta.id + 1)}`;
    let id = `fnref${n}`;
    if (tokens[idx].meta.subId > 0) {
      id += `:${tokens[idx].meta.subId}`;
    }
    return `<sup class="footnote-ref"><a href="#fn${n}" id="${id}">${n}</a></sup>`;
  };
});

extensionSvc.onSectionPreview((elt, options, isEditor) => {
  // Highlight with Prism
  elt.querySelectorAll('.prism').cl_each((prismElt) => {
    if (!prismElt.$highlightedWithPrism) {
      Prism.highlightElement(prismElt);
      prismElt.$highlightedWithPrism = true;
    }
  });

  // Transform task spans into checkboxes
  elt.querySelectorAll('span.task-list-item-checkbox').cl_each((spanElt) => {
    const checkboxElt = document.createElement('input');
    checkboxElt.type = 'checkbox';
    checkboxElt.className = 'task-list-item-checkbox';
    if (spanElt.classList.contains('checked')) {
      checkboxElt.setAttribute('checked', true);
    }
    if (!isEditor) {
      checkboxElt.disabled = 'disabled';
    }
    spanElt.parentNode.replaceChild(checkboxElt, spanElt);
  });
});
