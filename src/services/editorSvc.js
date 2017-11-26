import Vue from 'vue';
import DiffMatchPatch from 'diff-match-patch';
import Prism from 'prismjs';
import markdownItPandocRenderer from 'markdown-it-pandoc-renderer';
import cledit from '../libs/cledit';
import pagedown from '../libs/pagedown';
import htmlSanitizer from '../libs/htmlSanitizer';
import markdownConversionSvc from './markdownConversionSvc';
import markdownGrammarSvc from './markdownGrammarSvc';
import sectionUtils from './sectionUtils';
import extensionSvc from './extensionSvc';
import editorSvcDiscussions from './editorSvcDiscussions';
import editorSvcUtils from './editorSvcUtils';
import utils from './utils';
import store from '../store';

const debounce = cledit.Utils.debounce;

const allowDebounce = (action, wait) => {
  let timeoutId;
  return (doDebounce = false, ...params) => {
    clearTimeout(timeoutId);
    if (doDebounce) {
      timeoutId = setTimeout(() => action(...params), wait);
    } else {
      action(...params);
    }
  };
};

const diffMatchPatch = new DiffMatchPatch();
let instantPreview = true;
let tokens;

// Use a vue instance as an event bus
const editorSvc = Object.assign(new Vue(), editorSvcDiscussions, editorSvcUtils, {
  // Elements
  editorElt: null,
  previewElt: null,
  tocElt: null,
  // Other objects
  clEditor: null,
  pagedownEditor: null,
  options: null,
  prismGrammars: null,
  converter: null,
  parsingCtx: null,
  conversionCtx: null,
  sectionList: null,
  sectionDescList: [],
  sectionDescMeasuredList: null,
  sectionDescWithDiffsList: null,
  selectionRange: null,
  previewSelectionRange: null,
  previewSelectionStartOffset: null,
  previewHtml: null,
  previewText: null,

  /**
   * Initialize the Prism grammar with the options
   */
  initPrism() {
    const options = {
      ...this.options,
      insideFences: markdownConversionSvc.defaultOptions.insideFences,
    };
    this.prismGrammars = markdownGrammarSvc.makeGrammars(options);
  },

  /**
   * Initialize the markdown-it converter with the options
   */
  initConverter() {
    this.converter = markdownConversionSvc.createConverter(this.options, true);
  },

  /**
   * Initialize the cledit editor with markdown-it section parser and Prism highlighter
   */
  initClEditor() {
    this.sectionDescMeasuredList = null;
    this.sectionDescWithDiffsList = null;
    const options = {
      sectionHighlighter: section => Prism.highlight(
        section.text, this.prismGrammars[section.data]),
      sectionParser: (text) => {
        this.parsingCtx = markdownConversionSvc.parseSections(this.converter, text);
        return this.parsingCtx.sections;
      },
      getCursorFocusRatio: () => {
        if (store.getters['data/localSettings'].focusMode) {
          return 1;
        }
        return 0.15;
      },
    };
    this.initClEditorInternal(options);
    this.restoreScrollPosition();
  },

  /**
   * Finish the conversion initiated by the section parser
   */
  convert() {
    this.conversionCtx = markdownConversionSvc.convert(this.parsingCtx, this.conversionCtx);
    this.$emit('conversionCtx', this.conversionCtx);
    tokens = this.parsingCtx.markdownState.tokens;
  },

  /**
   * Refresh the preview with the result of `convert()`
   */
  refreshPreview() {
    const newSectionDescList = [];
    let sectionPreviewElt;
    let sectionTocElt;
    let sectionIdx = 0;
    let sectionDescIdx = 0;
    let insertBeforePreviewElt = this.previewElt.firstChild;
    let insertBeforeTocElt = this.tocElt.firstChild;
    let previewHtml = '';
    let loadingImages = [];
    this.conversionCtx.htmlSectionDiff.forEach((item) => {
      for (let i = 0; i < item[1].length; i += 1) {
        const section = this.conversionCtx.sectionList[sectionIdx];
        if (item[0] === 0) {
          let sectionDesc = this.sectionDescList[sectionDescIdx];
          sectionDescIdx += 1;
          if (sectionDesc.editorElt !== section.elt) {
            // Force textToPreviewDiffs computation
            sectionDesc = {
              ...sectionDesc,
              section,
              editorElt: section.elt,
              textToPreviewDiffs: null,
            };
          }
          newSectionDescList.push(sectionDesc);
          previewHtml += sectionDesc.html;
          sectionIdx += 1;
          insertBeforePreviewElt = insertBeforePreviewElt.nextSibling;
          insertBeforeTocElt = insertBeforeTocElt.nextSibling;
        } else if (item[0] === -1) {
          sectionDescIdx += 1;
          sectionPreviewElt = insertBeforePreviewElt;
          insertBeforePreviewElt = insertBeforePreviewElt.nextSibling;
          this.previewElt.removeChild(sectionPreviewElt);
          sectionTocElt = insertBeforeTocElt;
          insertBeforeTocElt = insertBeforeTocElt.nextSibling;
          this.tocElt.removeChild(sectionTocElt);
        } else if (item[0] === 1) {
          const html = htmlSanitizer.sanitizeHtml(this.conversionCtx.htmlSectionList[sectionIdx]);
          sectionIdx += 1;

          // Create preview section element
          sectionPreviewElt = document.createElement('div');
          sectionPreviewElt.className = 'cl-preview-section';
          sectionPreviewElt.innerHTML = html;
          if (insertBeforePreviewElt) {
            this.previewElt.insertBefore(sectionPreviewElt, insertBeforePreviewElt);
          } else {
            this.previewElt.appendChild(sectionPreviewElt);
          }
          extensionSvc.sectionPreview(sectionPreviewElt, this.options);
          loadingImages = [
            ...loadingImages,
            ...Array.prototype.slice.call(sectionPreviewElt.getElementsByTagName('img')),
          ];

          // Create TOC section element
          sectionTocElt = document.createElement('div');
          sectionTocElt.className = 'cl-toc-section';
          const headingElt = sectionPreviewElt.querySelector('h1, h2, h3, h4, h5, h6');
          if (headingElt) {
            const clonedElt = headingElt.cloneNode(true);
            clonedElt.removeAttribute('id');
            sectionTocElt.appendChild(clonedElt);
          }
          if (insertBeforeTocElt) {
            this.tocElt.insertBefore(sectionTocElt, insertBeforeTocElt);
          } else {
            this.tocElt.appendChild(sectionTocElt);
          }

          previewHtml += html;
          newSectionDescList.push({
            section,
            editorElt: section.elt,
            previewElt: sectionPreviewElt,
            tocElt: sectionTocElt,
            html,
          });
        }
      }
    });
    this.sectionDescList = newSectionDescList;
    this.previewHtml = previewHtml.replace(/^\s+|\s+$/g, '');
    this.$emit('previewHtml', this.previewHtml);
    this.tocElt.classList[
      this.tocElt.querySelector('.cl-toc-section *') ? 'remove' : 'add'
    ]('toc-tab--empty');

    this.previewText = this.previewElt.textContent;
    this.$emit('previewText', this.previewText);
    this.makeTextToPreviewDiffs();

    // Wait for images to load
    const loadedPromises = loadingImages.map(imgElt => new Promise((resolve) => {
      if (!imgElt.src) {
        resolve();
        return;
      }
      const img = new window.Image();
      img.onload = resolve;
      img.onerror = resolve;
      img.src = imgElt.src;
    }));

    Promise.all(loadedPromises)
      // Debounce if sections have already been measured
      .then(() => this.measureSectionDimensions(!!this.sectionDescMeasuredList));
  },

  /**
   * Measure the height of each section in editor, preview and toc.
   */
  measureSectionDimensions: allowDebounce((restoreScrollPosition) => {
    if (editorSvc.sectionDescList &&
      this.sectionDescList !== editorSvc.sectionDescMeasuredList
    ) {
      sectionUtils.measureSectionDimensions(editorSvc);
      editorSvc.sectionDescMeasuredList = editorSvc.sectionDescList;
      if (restoreScrollPosition) {
        editorSvc.restoreScrollPosition();
      }
      editorSvc.$emit('sectionDescMeasuredList', editorSvc.sectionDescMeasuredList);
    }
  }, 500),

  /**
   * Compute the diffs between editor's markdown and preview's html
   * asynchronously unless there is only one section to compute.
   */
  makeTextToPreviewDiffs() {
    if (editorSvc.sectionDescList &&
      editorSvc.sectionDescList !== editorSvc.sectionDescWithDiffsList
    ) {
      const makeOne = () => {
        let hasOne = false;
        const hasMore = editorSvc.sectionDescList
          .some((sectionDesc) => {
            if (!sectionDesc.textToPreviewDiffs) {
              if (hasOne) {
                return true;
              }
              if (!sectionDesc.previewText) {
                sectionDesc.previewText = sectionDesc.previewElt.textContent;
              }
              sectionDesc.textToPreviewDiffs = diffMatchPatch.diff_main(
                sectionDesc.section.text, sectionDesc.previewText);
              hasOne = true;
            }
            return false;
          });
        if (hasMore) {
          setTimeout(() => makeOne(), 10);
        } else {
          editorSvc.previewTextWithDiffsList = editorSvc.previewText;
          editorSvc.sectionDescWithDiffsList = editorSvc.sectionDescList;
          editorSvc.$emit('sectionDescWithDiffsList', editorSvc.sectionDescWithDiffsList);
        }
      };
      makeOne();
    }
  },

  /**
   * Save editor selection/scroll state into the current file content.
   */
  saveContentState: allowDebounce(() => {
    const scrollPosition = editorSvc.getScrollPosition() ||
      store.getters['contentState/current'].scrollPosition;
    store.dispatch('contentState/patchCurrent', {
      selectionStart: editorSvc.clEditor.selectionMgr.selectionStart,
      selectionEnd: editorSvc.clEditor.selectionMgr.selectionEnd,
      scrollPosition,
    });
  }, 100),

  /**
   * Report selection from the preview to the editor.
   */
  saveSelection: allowDebounce(() => {
    const selection = window.getSelection();
    let range = selection.rangeCount && selection.getRangeAt(0);
    if (range) {
      if (
        /* eslint-disable no-bitwise */
        !(editorSvc.previewElt.compareDocumentPosition(range.startContainer) &
          window.Node.DOCUMENT_POSITION_CONTAINED_BY) ||
        !(editorSvc.previewElt.compareDocumentPosition(range.endContainer) &
          window.Node.DOCUMENT_POSITION_CONTAINED_BY)
        /* eslint-enable no-bitwise */
      ) {
        range = null;
      }
    }
    if (editorSvc.previewSelectionRange !== range) {
      let previewSelectionStartOffset;
      let previewSelectionEndOffset;
      if (range) {
        const startRange = document.createRange();
        startRange.setStart(editorSvc.previewElt, 0);
        startRange.setEnd(range.startContainer, range.startOffset);
        previewSelectionStartOffset = `${startRange}`.length;
        previewSelectionEndOffset = previewSelectionStartOffset + `${range}`.length;
        const editorStartOffset = editorSvc.getEditorOffset(previewSelectionStartOffset);
        const editorEndOffset = editorSvc.getEditorOffset(previewSelectionEndOffset);
        if (editorStartOffset != null && editorEndOffset != null) {
          editorSvc.clEditor.selectionMgr.setSelectionStartEnd(
            editorStartOffset, editorEndOffset);
        }
      }
      editorSvc.previewSelectionRange = range;
      editorSvc.$emit('previewSelectionRange', editorSvc.previewSelectionRange);
    }
  }, 50),

  /**
   * Returns the pandoc AST generated from the file tokens and the converter options
   */
  getPandocAst() {
    return tokens && markdownItPandocRenderer(tokens, this.converter.options);
  },

  /**
   * Pass the elements to the store and initialize the editor.
   */
  init(editorElt, previewElt, tocElt) {
    this.editorElt = editorElt;
    this.previewElt = previewElt;
    this.tocElt = tocElt;

    this.createClEditor(editorElt);
    this.clEditor.on('contentChanged', (content, diffs, sectionList) => {
      const parsingCtx = {
        ...this.parsingCtx,
        sectionList,
      };
      this.parsingCtx = parsingCtx;
    });
    this.clEditor.undoMgr.on('undoStateChange', () => {
      const canUndo = this.clEditor.undoMgr.canUndo();
      if (canUndo !== store.state.layout.canUndo) {
        store.commit('layout/setCanUndo', canUndo);
      }
      const canRedo = this.clEditor.undoMgr.canRedo();
      if (canRedo !== store.state.layout.canRedo) {
        store.commit('layout/setCanRedo', canRedo);
      }
    });
    this.pagedownEditor = pagedown({
      input: Object.create(this.clEditor),
    });
    this.pagedownEditor.run();
    this.pagedownEditor.hooks.set('insertLinkDialog', (callback) => {
      store.dispatch('modal/open', {
        type: 'link',
        callback,
      });
      return true;
    });
    this.pagedownEditor.hooks.set('insertImageDialog', (callback) => {
      store.dispatch('modal/open', {
        type: 'image',
        callback,
      });
      return true;
    });

    this.editorElt.parentNode.addEventListener('scroll', () => this.saveContentState(true));
    this.previewElt.parentNode.addEventListener('scroll', () => this.saveContentState(true));

    const refreshPreview = () => {
      this.convert();
      if (instantPreview) {
        this.refreshPreview();
        this.measureSectionDimensions(false, true);
      } else {
        setTimeout(() => this.refreshPreview(), 10);
      }
      instantPreview = false;
    };

    const debouncedRefreshPreview = debounce(refreshPreview, 20);

    const onEditorChanged =
      (sectionList = this.sectionList, selectionRange = this.selectionRange) => {
        if (this.sectionList !== sectionList) {
          this.sectionList = sectionList;
          this.$emit('sectionList', this.sectionList);
          if (instantPreview) {
            refreshPreview();
          } else {
            debouncedRefreshPreview();
          }
        }
        if (this.selectionRange !== selectionRange) {
          this.selectionRange = selectionRange;
          this.$emit('selectionRange', this.selectionRange);
        }
        this.saveContentState();
      };

    this.clEditor.selectionMgr.on('selectionChanged',
      (start, end, selectionRange) => onEditorChanged(undefined, selectionRange));

    /* -----------------------------
     * Inline images
     */

    const imgCache = Object.create(null);

    const addToImgCache = (imgElt) => {
      let entries = imgCache[imgElt.src];
      if (!entries) {
        entries = [];
        imgCache[imgElt.src] = entries;
      }
      entries.push(imgElt);
    };

    const getFromImgCache = (src) => {
      const entries = imgCache[src];
      if (!entries) {
        return null;
      }
      let imgElt;
      return entries
        .some((entry) => {
          if (this.editorElt.contains(entry)) {
            return false;
          }
          imgElt = entry;
          return true;
        }) && imgElt;
    };

    const triggerImgCacheGc = debounce(() => {
      Object.keys(imgCache).forEach((src) => {
        const entries = imgCache[src]
          .filter(imgElt => this.editorElt.contains(imgElt));
        if (entries.length) {
          imgCache[src] = entries;
        } else {
          delete imgCache[src];
        }
      });
    }, 100);

    let imgEltsToCache = [];
    if (store.getters['data/computedSettings'].editor.inlineImages) {
      this.clEditor.highlighter.on('sectionHighlighted', (section) => {
        section.elt.getElementsByClassName('token img').cl_each((imgTokenElt) => {
          const srcElt = imgTokenElt.querySelector('.token.cl-src');
          if (srcElt) {
            // Create an img element before the .img.token and wrap both elements
            // into a .token.img-wrapper
            const imgElt = document.createElement('img');
            imgElt.style.display = 'none';
            const uri = srcElt.textContent;
            if (!/^unsafe/.test(htmlSanitizer.sanitizeUri(uri, true))) {
              imgElt.onload = () => {
                imgElt.style.display = '';
              };
              imgElt.src = uri;
              imgEltsToCache.push(imgElt);
            }
            const imgTokenWrapper = document.createElement('span');
            imgTokenWrapper.className = 'token img-wrapper';
            imgTokenElt.parentNode.insertBefore(imgTokenWrapper, imgTokenElt);
            imgTokenWrapper.appendChild(imgElt);
            imgTokenWrapper.appendChild(imgTokenElt);
          }
        });
      });
    }

    this.clEditor.highlighter.on('highlighted', () => {
      imgEltsToCache.forEach((imgElt) => {
        const cachedImgElt = getFromImgCache(imgElt.src);
        if (cachedImgElt) {
          // Found a previously loaded image that has just been released
          imgElt.parentNode.replaceChild(cachedImgElt, imgElt);
        } else {
          addToImgCache(imgElt);
        }
      });
      imgEltsToCache = [];
      // Eject released images from cache
      triggerImgCacheGc();
    });

    this.clEditor.on('contentChanged',
      (content, diffs, sectionList) => onEditorChanged(sectionList));

    // clEditorSvc.setPreviewElt(element[0].querySelector('.preview__inner-2'))
    // var previewElt = element[0].querySelector('.preview')
    // clEditorSvc.isPreviewTop = previewElt.scrollTop < 10
    // previewElt.addEventListener('scroll', function () {
    //   var isPreviewTop = previewElt.scrollTop < 10
    //   if (isPreviewTop !== clEditorSvc.isPreviewTop) {
    //     clEditorSvc.isPreviewTop = isPreviewTop
    //     scope.$apply()
    //   }
    // })

    // Watch file content changes
    let lastContentId = null;
    let lastProperties;
    store.watch(
      () => store.getters['content/current'].hash,
      () => {
        const content = store.getters['content/current'];
        // Track ID changes
        let initClEditor = false;
        if (content.id !== lastContentId) {
          instantPreview = true;
          lastContentId = content.id;
          initClEditor = true;
        }
        // Track properties changes
        if (content.properties !== lastProperties) {
          lastProperties = content.properties;
          const options = extensionSvc.getOptions(store.getters['content/currentProperties']);
          if (utils.serializeObject(options) !== utils.serializeObject(this.options)) {
            this.options = options;
            this.initPrism();
            this.initConverter();
            initClEditor = true;
          }
        }
        if (initClEditor) {
          this.initClEditor();
        }
        // Apply possible text and discussion changes
        this.applyContent();
      }, {
        immediate: true,
      });

    // Disable editor if hidden or if no content is loaded
    store.watch(
      () => store.getters['content/isCurrentEditable'],
      editable => this.clEditor.toggleEditable(!!editable), {
        immediate: true,
      });

    store.watch(() => utils.serializeObject(store.getters['layout/styles']),
      () => this.measureSectionDimensions(false, true));

    this.initHighlighters();
    this.$emit('inited');
  },
});

export default editorSvc;
