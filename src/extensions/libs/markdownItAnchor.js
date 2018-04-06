export default (md) => {
  md.core.ruler.before('replacements', 'anchors', (state) => {
    const anchorHash = {};
    let headingOpenToken;
    let headingContent;
    state.tokens.forEach((token) => {
      if (token.type === 'heading_open') {
        headingContent = '';
        headingOpenToken = token;
      } else if (token.type === 'heading_close') {
        headingOpenToken.headingContent = headingContent;

        // According to http://pandoc.org/README.html#extension-auto_identifiers
        let slug = headingContent
          .replace(/\s/g, '-') // Replace all spaces and newlines with hyphens
          .replace(/[\0-,/:-@[-^`{-~]/g, '') // Remove all punctuation, except underscores, hyphens, and periods
          .toLowerCase(); // Convert all alphabetic characters to lowercase

        // Remove everything up to the first letter
        let i;
        for (i = 0; i < slug.length; i += 1) {
          const charCode = slug.charCodeAt(i);
          if ((charCode >= 0x61 && charCode <= 0x7A) || charCode > 0x7E) {
            break;
          }
        }

        // If nothing left after this, use `section`
        slug = slug.slice(i) || 'section';

        let anchor = slug;
        let index = 1;
        while (Object.prototype.hasOwnProperty.call(anchorHash, anchor)) {
          anchor = `${slug}-${index}`;
          index += 1;
        }
        anchorHash[anchor] = true;
        headingOpenToken.headingAnchor = anchor;
        headingOpenToken.attrs = [
          ['id', anchor],
        ];
        headingOpenToken = undefined;
      } else if (headingOpenToken) {
        headingContent += token.children.reduce((result, child) => {
          if (child.type !== 'footnote_ref') {
            return result + child.content;
          }
          return result;
        }, '');
      }
    });
  });
};
