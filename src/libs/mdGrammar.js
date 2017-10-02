var charInsideUrl = '(&|[-A-Z0-9+@#/%?=~_|[\\]()!:,.;])'
var charEndingUrl = '(&|[-A-Z0-9+@#/%=~_|[\\])])'
var urlPattern = new RegExp('(https?|ftp)(://' + charInsideUrl + '*' + charEndingUrl + ')(?=$|\\W)', 'gi')
var emailPattern = /(?:mailto:)?([-.\w]+\@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)/gi

var markup = {
  'comment': /<!--[\w\W]*?-->/g,
  'tag': {
    pattern: /<\/?[\w:-]+\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+))?\s*)*\/?>/gi,
    inside: {
      'tag': {
        pattern: /^<\/?[\w:-]+/i,
        inside: {
          'punctuation': /^<\/?/,
          'namespace': /^[\w-]+?:/
        }
      },
      'attr-value': {
        pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/gi,
        inside: {
          'punctuation': /=|>|"/g
        }
      },
      'punctuation': /\/?>/g,
      'attr-name': {
        pattern: /[\w:-]+/g,
        inside: {
          'namespace': /^[\w-]+?:/
        }
      }
    }
  },
  'entity': /&#?[\da-z]{1,8};/gi
}

var latex = {
  // A tex command e.g. \foo
  'keyword': /\\(?:[^a-zA-Z]|[a-zA-Z]+)/g,
  // Curly and square braces
  'lparen': /[[({]/g,
  // Curly and square braces
  'rparen': /[\])}]/g,
  // A comment. Tex comments start with % and go to
  // the end of the line
  'comment': /%.*/g
}

module.exports = function (options) {
  options = options || {}
  var grammar = {}
  var insideFences = options.insideFences || {}
  insideFences['cl cl-pre'] = /`{3}|~{3}/
  if (options.fences) {
    grammar['pre gfm'] = {
      pattern: /^(`{3}|~{3}).*\n(?:[\s\S]*?)\n\1 *$/gm,
      inside: insideFences
    }
  }
  grammar.li = {
    pattern: new RegExp(
      [
        '^ {0,3}(?:[*+\\-]|\\d+\\.)[ \\t].+\\n', // Item line
        '(?:',
        '(?:',
        '.*\\S.*\\n', // Non-empty line
        '|',
        '[ \\t]*\\n(?! ?\\S)', // Or empty line not followed by unindented line
        ')',
        ')*'
      ].join(''),
      'gm'
    ),
    inside: {
      'cl cl-li': /^[ \t]*([*+\-]|\d+\.)[ \t]/gm
    }
  }
  if (options.fences) {
    grammar.li.inside['pre gfm'] = {
      pattern: /^((?: {4}|\t)+)(`{3}|~{3}).*\n(?:[\s\S]*?)\n\1\2\s*$/gm,
      inside: insideFences
    }
  }
  grammar.blockquote = {
    pattern: /^ {0,3}>.+(?:\n[ \t]*\S.*)*/gm,
    inside: {
      'cl cl-gt': /^\s*>/gm,
      'li': grammar.li
    }
  }
  grammar['h1 alt'] = {
    pattern: /^.+\n=+[ \t]*$/gm,
    inside: {
      'cl cl-hash': /=+[ \t]*$/
    }
  }
  grammar['h2 alt'] = {
    pattern: /^.+\n-+[ \t]*$/gm,
    inside: {
      'cl cl-hash': /-+[ \t]*$/
    }
  }
  for (var i = 6; i >= 1; i--) {
    grammar['h' + i] = {
      pattern: new RegExp('^#{' + i + '}[ \t].+$', 'gm'),
      inside: {
        'cl cl-hash': new RegExp('^#{' + i + '}')
      }
    }
  }
  if (options.tables) {
    grammar.table = {
      pattern: new RegExp(
        [
          '^',
          '[ ]{0,3}',
          '[|]', // Initial pipe
          '.+\\n', // Header Row
          '[ ]{0,3}',
          '[|][ ]*[-:]+[-| :]*\\n', // Separator
          '(?:[ \t]*[|].*\\n?)*', // Table rows
          '$'
        ].join(''),
        'gm'
      ),
      inside: {}
    }
    grammar['table alt'] = {
      pattern: new RegExp(
        [
          '^',
          '[ ]{0,3}',
          '\\S.*[|].*\\n', // Header Row
          '[ ]{0,3}',
          '[-:]+[ ]*[|][-| :]*\\n', // Separator
          '(?:.*[|].*\\n?)*', // Table rows
          '$' // Stop at final newline
        ].join(''),
        'gm'
      ),
      inside: {}
    }
  }
  if (options.deflists) {
    grammar.deflist = {
      pattern: new RegExp(
        [
          '^ {0,3}\\S.*\\n', // Description line
          '(?:[ \\t]*\\n)?', // Optional empty line
          '(?:',
          '[ \\t]*:[ \\t].*\\n', // Colon line
          '(?:',
          '(?:',
          '.*\\S.*\\n', // Non-empty line
          '|',
          '[ \\t]*\\n(?! ?\\S)', // Or empty line not followed by unindented line
          ')',
          ')*',
          '(?:[ \\t]*\\n)*', // Empty lines
          ')+'
        ].join(''),
        'gm'
      ),
      inside: {
        'deflist-desc': {
          pattern: /( {0,3}\S.*\n(?:[ \t]*\n)?)[\s\S]*/,
          lookbehind: true,
          inside: {
            'cl': /^[ \t]*:[ \t]/gm
          }
        },
        'term': /.+/g
      }
    }
    if (options.fences) {
      grammar.deflist.inside['deflist-desc'].inside['pre gfm'] = {
        pattern: /^((?: {4}|\t)+)(`{3}|~{3}).*\n(?:[\s\S]*?)\n\1\2\s*$/gm,
        inside: insideFences
      }
    }
  }
  grammar.hr = {
    pattern: /^ {0,3}([*\-_] *){3,}$/gm
  }
  if (options.footnotes) {
    grammar.fndef = {
      pattern: /^ {0,3}\[\^.*?\]:.*$/gm,
      inside: {
        'ref-id': {
          pattern: /^ {0,3}\[\^.*?\]/,
          inside: {
            cl: /(\[\^|\])/
          }
        }
      }
    }
  }
  if (options.abbrs) {
    grammar.abbrdef = {
      pattern: /^ {0,3}\*\[.*?\]:.*$/gm,
      inside: {
        'abbr-id': {
          pattern: /^ {0,3}\*\[.*?\]/,
          inside: {
            cl: /(\*\[|\])/
          }
        }
      }
    }
  }
  grammar.linkdef = {
    pattern: /^ {0,3}\[.*?\]:.*$/gm,
    inside: {
      'link-id': {
        pattern: /^ {0,3}\[.*?\]/,
        inside: {
          cl: /[\[\]]/
        }
      },
      url: urlPattern
    }
  }
  grammar.p = {
    pattern: /^ {0,3}\S.*$(\n.*\S.*)*/gm,
    inside: {}
  }
  if (options.tocs) {
    grammar.p.inside['cl cl-toc'] = /^[ \t]*\[toc\]$/mi
  }
  grammar.pre = {
    pattern: /(?: {4}|\t).*\S.*\n((?: {4}|\t).*\n)*/g
  }

  var rest = {}
  if (options.maths) {
    rest['math block'] = {
      pattern: /\\\\\[[\s\S]*?\\\\\]/g,
      inside: {
        'cl cl-bracket-start': /^\\\\\[/,
        'cl cl-bracket-end': /\\\\\]$/,
        rest: latex
      }
    }
    rest['math inline'] = {
      pattern: /\\\\\([\s\S]*?\\\\\)/g,
      inside: {
        'cl cl-bracket-start': /^\\\\\(/,
        'cl cl-bracket-end': /\\\\\)$/,
        rest: latex
      }
    }
    rest['math expr block'] = {
      pattern: /(\$\$)[\s\S]*?\1/g,
      inside: {
        'cl cl-bracket-start': /^\$\$/,
        'cl cl-bracket-end': /\$\$$/,
        rest: latex
      }
    }
    rest['math expr inline'] = {
      pattern: /\$(?!\s)[\s\S]*?\S\$(?!\d)/g,
      inside: {
        'cl cl-bracket-start': /^\$/,
        'cl cl-bracket-end': /\$$/,
        rest: latex
      }
    }
    rest['latex block'] = {
      pattern: /\\begin\{([a-z]*\*?)\}[\s\S]*?\\?\\end\{\1\}/g,
      inside: {
        'keyword': /\\(begin|end)/,
        rest: latex
      }
    }
  }
  rest.code = {
    pattern: /(`+)[\s\S]*?\1/g,
    inside: {
      'cl cl-code': /`/
    }
  }
  if (options.footnotes) {
    rest.inlinefn = {
      pattern: /\^\[.+?\]/g,
      inside: {
        'cl': /(\^\[|\])/
      }
    }
    rest.fn = {
      pattern: /\[\^.+?\]/g,
      inside: {
        'cl': /(\[\^|\])/
      }
    }
  }
  rest.img = {
    pattern: /!\[.*?\]\(.+?\)/g,
    inside: {
      'cl cl-title': /['‘][^'’]*['’]|["“][^"”]*["”](?=\)$)/,
      'cl cl-src': {
        pattern: /(\]\()[^\('" \t]+(?=[\)'" \t])/,
        lookbehind: true
      }
    }
  }
  rest.link = {
    pattern: /\[.*?\]\(.+?\)/gm,
    inside: {
      'cl cl-underlined-text': {
        pattern: /(\[)[^\]]*/,
        lookbehind: true
      },
      'cl cl-title': /['‘][^'’]*['’]|["“][^"”]*["”](?=\)$)/
    }
  }
  rest.imgref = {
    pattern: /!\[.*?\][ \t]*\[.*?\]/g
  }
  rest.linkref = {
    pattern: /\[.*?\][ \t]*\[.*?\]/g,
    inside: {
      'cl cl-underlined-text': {
        pattern: /^(\[)[^\]]*(?=\][ \t]*\[)/,
        lookbehind: true
      }
    }
  }
  rest.comment = markup.comment
  rest.tag = markup.tag
  rest.url = urlPattern
  rest.email = emailPattern
  rest.strong = {
    pattern: /(^|[^\w*])([_\*])\2(?![_\*])[\s\S]*?\2{2}(?=([^\w*]|$))/gm,
    lookbehind: true,
    inside: {
      'cl cl-strong cl-start': /^([_\*])\1/,
      'cl cl-strong cl-close': /([_\*])\1$/
    }
  }
  rest.em = {
    pattern: /(^|[^\w*])([_\*])(?![_\*])[\s\S]*?\2(?=([^\w*]|$))/gm,
    lookbehind: true,
    inside: {
      'cl cl-em cl-start': /^[_\*]/,
      'cl cl-em cl-close': /[_\*]$/
    }
  }
  if (options.dels) {
    rest.del = {
      pattern: /(^|[^\w*])(~~)[\s\S]*?\2(?=([^\w*]|$))/gm,
      lookbehind: true,
      inside: {
        'cl': /~~/,
        'cl-del-text': /[^~]+/
      }
    }
  }
  if (options.subs) {
    rest.sub = {
      pattern: /(~)(?=\S)(.*?\S)\1/gm,
      inside: {
        'cl': /~/
      }
    }
  }
  if (options.sups) {
    rest.sup = {
      pattern: /(\^)(?=\S)(.*?\S)\1/gm,
      inside: {
        'cl': /\^/
      }
    }
  }
  rest.entity = markup.entity

  for (var c = 6; c >= 1; c--) {
    grammar['h' + c].inside.rest = rest
  }
  grammar['h1 alt'].inside.rest = rest
  grammar['h2 alt'].inside.rest = rest
  if (options.tables) {
    grammar.table.inside.rest = rest
    grammar['table alt'].inside.rest = rest
  }
  grammar.p.inside.rest = rest
  grammar.blockquote.inside.rest = rest
  grammar.li.inside.rest = rest
  if (options.footnotes) {
    grammar.fndef.inside.rest = rest
  }
  if (options.deflists) {
    grammar.deflist.inside['deflist-desc'].inside.rest = rest
  }

  var restLight = {
    code: rest.code,
    inlinefn: rest.inlinefn,
    fn: rest.fn,
    link: rest.link,
    linkref: rest.linkref
  }
  rest.strong.inside.rest = restLight
  rest.em.inside.rest = restLight
  if (options.dels) {
    rest.del.inside.rest = restLight
  }

  var inside = {
    code: rest.code,
    comment: rest.comment,
    tag: rest.tag,
    strong: rest.strong,
    em: rest.em,
    del: rest.del,
    sub: rest.sub,
    sup: rest.sup,
    entity: markup.entity
  }
  rest.link.inside['cl cl-underlined-text'].inside = inside
  rest.linkref.inside['cl cl-underlined-text'].inside = inside

  return grammar
}
