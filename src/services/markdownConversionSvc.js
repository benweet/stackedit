import DiffMatchPatch from 'diff-match-patch';
import Prism from 'prismjs';
import MarkdownIt from 'markdown-it';
import markdownGrammarSvc from './markdownGrammarSvc';
import extensionSvc from './extensionSvc';
import utils from './utils';

const htmlSectionMarker = '\uF111\uF222\uF333\uF444';
const diffMatchPatch = new DiffMatchPatch();

// Create aliases for syntax highlighting
const languageAliases = ({
  js: 'javascript',
  json: 'javascript',
  html: 'markup',
  svg: 'markup',
  xml: 'markup',
  py: 'python',
  rb: 'ruby',
  yml: 'yaml',
  ps1: 'powershell',
  psm1: 'powershell',
});
Object.entries(languageAliases).forEach(([alias, language]) => {
  Prism.languages[alias] = Prism.languages[language];
});

// Add programming language parsing capability to markdown fences
const insideFences = {};
Object.entries(Prism.languages).forEach(([name, language]) => {
  if (Prism.util.type(language) === 'Object') {
    insideFences[`language-${name}`] = {
      pattern: new RegExp(`(\`\`\`|~~~)${name}\\W[\\s\\S]*`),
      inside: {
        'cl cl-pre': /(```|~~~).*/,
        rest: language,
      },
    };
  }
});

// Disable spell checking in specific tokens
const noSpellcheckTokens = Object.create(null);
[
  'code',
  'pre',
  'pre gfm',
  'math block',
  'math inline',
  'math expr block',
  'math expr inline',
  'latex block',
]
  .forEach((key) => {
    noSpellcheckTokens[key] = true;
  });
Prism.hooks.add('wrap', (env) => {
  if (noSpellcheckTokens[env.type]) {
    env.attributes.spellcheck = 'false';
  }
});

function createFlagMap(arr) {
  return arr.reduce((map, type) => ({ ...map, [type]: true }), {});
}
const startSectionBlockTypeMap = createFlagMap([
  'paragraph_open',
  'blockquote_open',
  'heading_open',
  'code',
  'fence',
  'table_open',
  'html_block',
  'bullet_list_open',
  'ordered_list_open',
  'hr',
  'dl_open',
]);
const listBlockTypeMap = createFlagMap([
  'bullet_list_open',
  'ordered_list_open',
]);
const blockquoteBlockTypeMap = createFlagMap([
  'blockquote_open',
]);
const tableBlockTypeMap = createFlagMap([
  'table_open',
]);
const deflistBlockTypeMap = createFlagMap([
  'dl_open',
]);

function hashArray(arr, valueHash, valueArray) {
  const hash = [];
  arr.forEach((str) => {
    let strHash = valueHash[str];
    if (strHash === undefined) {
      strHash = valueArray.length;
      valueArray.push(str);
      valueHash[str] = strHash;
    }
    hash.push(strHash);
  });
  return String.fromCharCode.apply(null, hash);
}

export default {
  defaultOptions: null,
  defaultConverter: null,
  defaultPrismGrammars: null,

  init() {
    const defaultProperties = { extensions: utils.computedPresets.default };

    // Default options for the markdown converter and the grammar
    this.defaultOptions = {
      ...extensionSvc.getOptions(defaultProperties),
      insideFences,
    };

    this.defaultConverter = this.createConverter(this.defaultOptions);
    this.defaultPrismGrammars = markdownGrammarSvc.makeGrammars(this.defaultOptions);
  },

  /**
   * Creates a converter and init it with extensions.
   * @returns {Object} A converter.
   */
  createConverter(options) {
    // Let the listeners add the rules
    const converter = new MarkdownIt('zero');
    converter.core.ruler.enable([], true);
    converter.block.ruler.enable([], true);
    converter.inline.ruler.enable([], true);
    extensionSvc.initConverter(converter, options);
    Object.keys(startSectionBlockTypeMap).forEach((type) => {
      const rule = converter.renderer.rules[type] || converter.renderer.renderToken;
      converter.renderer.rules[type] = (tokens, idx, opts, env, self) => {
        if (tokens[idx].sectionDelimiter) {
          // Add section delimiter
          return htmlSectionMarker + rule.call(converter.renderer, tokens, idx, opts, env, self);
        }
        return rule.call(converter.renderer, tokens, idx, opts, env, self);
      };
    });
    return converter;
  },

  /**
   * Parse markdown sections by passing the 2 first block rules of the markdown-it converter.
   * @param {Object} converter The markdown-it converter.
   * @param {String} text The text to be parsed.
   * @returns {Object} A parsing context to be passed to `convert`.
   */
  parseSections(converter, text) {
    const markdownState = new converter.core.State(text, converter, {});
    const markdownCoreRules = converter.core.ruler.getRules('');
    markdownCoreRules[0](markdownState); // Pass the normalize rule
    markdownCoreRules[1](markdownState); // Pass the block rule
    const lines = text.split('\n');
    if (!lines[lines.length - 1]) {
      // In cledit, last char is always '\n'.
      // Remove it as one will be added by addSection
      lines.pop();
    }
    const parsingCtx = {
      text,
      sections: [],
      converter,
      markdownState,
      markdownCoreRules,
    };
    let data = 'main';
    let i = 0;

    function addSection(maxLine) {
      const section = {
        text: '',
        data,
      };
      for (; i < maxLine; i += 1) {
        section.text += `${lines[i]}\n`;
      }
      if (section) {
        parsingCtx.sections.push(section);
      }
    }
    markdownState.tokens.forEach((token, index) => {
      // index === 0 means there are empty lines at the begining of the file
      if (token.level === 0 && startSectionBlockTypeMap[token.type] === true) {
        if (index > 0) {
          token.sectionDelimiter = true;
          addSection(token.map[0]);
        }
        if (listBlockTypeMap[token.type] === true) {
          data = 'list';
        } else if (blockquoteBlockTypeMap[token.type] === true) {
          data = 'blockquote';
        } else if (tableBlockTypeMap[token.type] === true) {
          data = 'table';
        } else if (deflistBlockTypeMap[token.type] === true) {
          data = 'deflist';
        } else {
          data = 'main';
        }
      }
    });
    addSection(lines.length);
    return parsingCtx;
  },

  /**
   * Convert markdown sections previously parsed with `parseSections`.
   * @param {Object} parsingCtx The parsing context returned by `parseSections`.
   * @param {Object} previousConversionCtx The conversion context returned by a previous call
   * to `convert`, in order to calculate the `htmlSectionDiff` of the returned conversion context.
   * @returns {Object} A conversion context.
   */
  convert(parsingCtx, previousConversionCtx) {
    // This function can be called twice without editor modification
    // so prevent from converting it again.
    if (!parsingCtx.markdownState.isConverted) {
      // Skip 2 first rules previously passed in parseSections
      parsingCtx.markdownCoreRules.slice(2).forEach(rule => rule(parsingCtx.markdownState));
      parsingCtx.markdownState.isConverted = true;
    }
    const { tokens } = parsingCtx.markdownState;
    const html = parsingCtx.converter.renderer.render(
      tokens,
      parsingCtx.converter.options,
      parsingCtx.markdownState.env,
    );
    const htmlSectionList = html.split(htmlSectionMarker);
    if (htmlSectionList[0] === '') {
      htmlSectionList.shift();
    }
    const valueHash = Object.create(null);
    const valueArray = [];
    const newSectionHash = hashArray(htmlSectionList, valueHash, valueArray);
    let htmlSectionDiff;
    if (previousConversionCtx) {
      const oldSectionHash = hashArray(
        previousConversionCtx.htmlSectionList,
        valueHash,
        valueArray,
      );
      htmlSectionDiff = diffMatchPatch.diff_main(oldSectionHash, newSectionHash, false);
    } else {
      htmlSectionDiff = [
        [1, newSectionHash],
      ];
    }
    return {
      text: parsingCtx.text,
      sectionList: parsingCtx.sectionList,
      htmlSectionList,
      htmlSectionDiff,
    };
  },

  /**
   * Helper to highlight arbitrary markdown
   * @param {Object} markdown The markdown content to highlight.
   * @param {Object} converter An optional converter.
   * @param {Object} grammars Optional grammars.
   * @returns {Object} The highlighted markdown in HTML format.
   */
  highlight(markdown, converter = this.defaultConverter, grammars = this.defaultPrismGrammars) {
    const parsingCtx = this.parseSections(converter, markdown);
    return parsingCtx.sections
      .map(section => Prism.highlight(section.text, grammars[section.data])).join('');
  },
};
