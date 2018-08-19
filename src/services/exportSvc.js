import FileSaver from 'file-saver';
import TemplateWorker from 'worker-loader!./templateWorker.js'; // eslint-disable-line
import localDbSvc from './localDbSvc';
import markdownConversionSvc from './markdownConversionSvc';
import extensionSvc from './extensionSvc';
import utils from './utils';
import store from '../store';
import htmlSanitizer from '../libs/htmlSanitizer';

function groupHeadings(headings, level = 1) {
  const result = [];
  let currentItem;

  function pushCurrentItem() {
    if (currentItem) {
      if (currentItem.children.length > 0) {
        currentItem.children = groupHeadings(currentItem.children, level + 1);
      }
      result.push(currentItem);
    }
  }
  headings.forEach((heading) => {
    if (heading.level !== level) {
      currentItem = currentItem || {
        children: [],
      };
      currentItem.children.push(heading);
    } else {
      pushCurrentItem();
      currentItem = heading;
    }
  });
  pushCurrentItem();
  return result;
}

const containerElt = document.createElement('div');
containerElt.className = 'hidden-rendering-container';
document.body.appendChild(containerElt);

export default {
  /**
   * Apply the template to the file content
   */
  async applyTemplate(fileId, template = {
    value: '{{{files.0.content.text}}}',
    helpers: '',
  }, pdf = false) {
    const file = store.state.file.itemsById[fileId];
    const content = await localDbSvc.loadItem(`${fileId}/content`);
    const properties = utils.computeProperties(content.properties);
    const options = extensionSvc.getOptions(properties);
    const converter = markdownConversionSvc.createConverter(options, true);
    const parsingCtx = markdownConversionSvc.parseSections(converter, content.text);
    const conversionCtx = markdownConversionSvc.convert(parsingCtx);
    const html = conversionCtx.htmlSectionList.map(htmlSanitizer.sanitizeHtml).join('');
    containerElt.innerHTML = html;
    extensionSvc.sectionPreview(containerElt, options);

    // Unwrap tables
    containerElt.querySelectorAll('.table-wrapper').cl_each((wrapperElt) => {
      while (wrapperElt.firstChild) {
        wrapperElt.parentNode.insertBefore(wrapperElt.firstChild, wrapperElt.nextSibling);
      }
      wrapperElt.parentNode.removeChild(wrapperElt);
    });

    // Make TOC
    const headings = containerElt.querySelectorAll('h1,h2,h3,h4,h5,h6').cl_map(headingElt => ({
      title: headingElt.textContent,
      anchor: headingElt.id,
      level: parseInt(headingElt.tagName.slice(1), 10),
      children: [],
    }));
    const toc = groupHeadings(headings);
    const view = {
      pdf,
      files: [{
        name: file.name,
        content: {
          text: content.text,
          properties,
          yamlProperties: content.properties,
          html: containerElt.innerHTML,
          toc,
        },
      }],
    };
    containerElt.innerHTML = '';

    // Run template conversion in a Worker to prevent attacks from helpers
    const worker = new TemplateWorker();
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        worker.terminate();
        reject(new Error('Template generation timeout.'));
      }, 10000);
      worker.addEventListener('message', (e) => {
        clearTimeout(timeoutId);
        worker.terminate();
        // e.data can contain unsafe data if helpers attempts to call postMessage
        const [err, result] = e.data;
        if (err) {
          reject(new Error(`${err}`));
        } else {
          resolve(`${result}`);
        }
      });
      worker.postMessage([template.value, view, template.helpers]);
    });
  },

  /**
   * Export a file to disk.
   */
  async exportToDisk(fileId, type, template) {
    const file = store.state.file.itemsById[fileId];
    const html = await this.applyTemplate(fileId, template);
    const blob = new Blob([html], {
      type: 'text/plain;charset=utf-8',
    });
    FileSaver.saveAs(blob, `${file.name}.${type}`);
  },
};
