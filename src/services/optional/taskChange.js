import editorSvc from '../editorSvc';
import store from '../../store';

editorSvc.$on('inited', () => {
  const getPreviewOffset = (elt) => {
    let offset = 0;
    if (!elt || elt === editorSvc.previewElt) {
      return offset;
    }
    let { previousSibling } = elt;
    while (previousSibling) {
      offset += previousSibling.textContent.length;
      ({ previousSibling } = previousSibling);
    }
    return offset + getPreviewOffset(elt.parentNode);
  };

  editorSvc.previewElt.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('task-list-item-checkbox')) {
      evt.preventDefault();
      if (store.getters['content/isCurrentEditable']) {
        const editorContent = editorSvc.clEditor.getContent();
        // Use setTimeout to ensure evt.target.checked has the old value
        setTimeout(() => {
          // Make sure content has not changed
          if (editorContent === editorSvc.clEditor.getContent()) {
            const previewOffset = getPreviewOffset(evt.target);
            const endOffset = editorSvc.getEditorOffset(previewOffset + 1);
            if (endOffset != null) {
              const startOffset = editorContent.lastIndexOf('\n', endOffset) + 1;
              const line = editorContent.slice(startOffset, endOffset);
              const match = line.match(/^([ \t]*(?:[*+-]|\d+\.)[ \t]+\[)[ xX](\] .*)/);
              if (match) {
                let newContent = editorContent.slice(0, startOffset);
                newContent += match[1];
                newContent += evt.target.checked ? ' ' : 'x';
                newContent += match[2];
                newContent += editorContent.slice(endOffset);
                editorSvc.clEditor.setContent(newContent, true);
              }
            }
          }
        }, 10);
      }
    }
  });
});
