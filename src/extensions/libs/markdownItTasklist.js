function attrSet(token, name, value) {
  const index = token.attrIndex(name);
  const attr = [name, value];

  if (index < 0) {
    token.attrPush(attr);
  } else {
    token.attrs[index] = attr;
  }
}

export default (md) => {
  md.core.ruler.after('inline', 'tasklist', ({ tokens, Token }) => {
    for (let i = 2; i < tokens.length; i += 1) {
      const token = tokens[i];
      if (token.content
        && token.content.charCodeAt(0) === 0x5b /* [ */
        && token.content.charCodeAt(2) === 0x5d /* ] */
        && token.content.charCodeAt(3) === 0x20 /* space */
        && token.type === 'inline'
        && tokens[i - 1].type === 'paragraph_open'
        && tokens[i - 2].type === 'list_item_open'
      ) {
        const cross = token.content[1].toLowerCase();
        if (cross === ' ' || cross === 'x') {
          const checkbox = new Token('html_inline', '', 0);
          if (cross === ' ') {
            checkbox.content = '<span class="task-list-item-checkbox" type="checkbox">&#9744;</span>';
          } else {
            checkbox.content = '<span class="task-list-item-checkbox checked" type="checkbox">&#9745;</span>';
          }
          token.children.unshift(checkbox);
          token.children[1].content = token.children[1].content.slice(3);
          token.content = token.content.slice(3);
          attrSet(tokens[i - 2], 'class', 'task-list-item');
        }
      }
    }
  });
};
