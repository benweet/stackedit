// Credit to https://editorially.com/
Prism.languages.md = (function() {

    var urlPattern = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>\[\]'"]+|\([^\s()<>\[\]'"]*\))+(?:\([^\s()<>\[\]'"]*\)|[^\s`!()\[\]{}:'".,<>?«»“”‘’]))/gi;
    var emailPattern = /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)\b/gi;

    var latex = Prism.languages.latex;

    var md = {};
    md.pre = {
        pattern: /(^|(?:^|(?:^|\n)(?![ \t]*([*+\-]|\d+\.)[ \t]).*\n)\s*?\n)(\s*(?: {4}|\t).*(?:\n|$))+/g,
        lookbehind: true,
        inside: {
        }
    };
    md['pre gfm'] = {
        pattern: /^ {0,3}`{3}.*?\n(.*?\n)*? {0,3}`{3} *$/gm,
        inside: {
            "md md-pre": /`{3}/,
            lf: /\n/gm,
        }
    };
    md['h1 alt'] = {
        pattern: /^(.+)[ \t]*\n=+[ \t]*$/gm,
        inside: {
        }
    };
    md['h2 alt'] = {
        pattern: /^(.+)[ \t]*\n-+[ \t]*$/gm,
        inside: {
        }
    };
    md.hr = {
        pattern: /^([*\-_] *){3,}$/gm,
    };
    md.li = {
        pattern: /^[ \t]*([*+\-]|\d+\.)[ \t].+$/gm,
        inside: {
            "md md-li": /^ ?([*+\-]|\d+\.)[ \t]/m,
            "md md-li2": /^ ?(?: {2}|\t{1})([*+\-]|\d+\.)[ \t]/m,
            "md md-li3": /^ ?(?: {4}|\t{2})([*+\-]|\d+\.)[ \t]/m,
            "md md-li4": /^ ?(?: {6}|\t{3})([*+\-]|\d+\.)[ \t]/m,
            "md md-li5": /^ ?(?: {8}|\t{4})([*+\-]|\d+\.)[ \t]/m,
            "md md-li6": /^ ?(?: {10}|\t{5})([*+\-]|\d+\.)[ \t]/m,
            "md md-li7": /^ ?(?: {12}|\t{6})([*+\-]|\d+\.)[ \t]/m,
            "md md-li8": /^ ?(?: {14}|\t{7})([*+\-]|\d+\.)[ \t]/m,
            "md md-li9": /^ ?(?: {16}|\t{8})([*+\-]|\d+\.)[ \t]/m,
            "md md-li10": /^ ?(?: {18}|\t{9})([*+\-]|\d+\.)[ \t]/m,
            "md md-li11": /^ ?(?: {20}|\t{10})([*+\-]|\d+\.)[ \t]/m
        }
    };
    for (var i = 6; i >= 1; i--) {
        md["h" + i] = {
            pattern: new RegExp("^#{" + i + "}.+$", "gm"),
            inside: {
                "md md-hash": new RegExp("^#{" + i + "} ")
            }
        };
    }
    md.blockquote = {
        pattern: /^ {0,3}> *[^\n]+$/gm,
        inside: {
            "md md-gt": /^ {0,3}> */,
            "li": md.li
        }
    };
    md['math block'] = {
        pattern: /(\$\$|\\\\\[|\\\\\\\\\()[\s\S]*?(\$\$|\\\\\]|\\\\\\\\\))/g,
        inside: {
            "md md-bracket-start": /^(\$\$|\\\\\[|\\\\\\\\\()/,
            "md md-bracket-end": /(\$\$|\\\\\]|\\\\\\\\\))/,
            lf: /\n/gm,
            rest: latex
        }
    };
    md['latex block'] = {
        pattern: /\\?\\begin\{[a-z]*\*?\}[\s\S]*?\\?\\end\{[a-z]*\*?\}/g,
        inside: {
            "keyword": /\\?\\(begin|end)/,
            lf: /\n/gm,
            rest: latex
        }
    };
    md.fndef = {
        pattern: /^ {0,3}\[\^.*?\]:[ \t]+.*$/gm,
        inside: {
            "ref-id": {
                pattern: /\[\^.*?\]/,
                inside: {
                    "md md-bracket-start": /\[/,
                    "md md-bracket-end": /\]/
                }
            }
        }
    };
    md.linkdef = {
        pattern: /^ {0,3}\[.*?\]:[ \t]+.*$/gm,
        inside: {
            "link-id": {
                pattern: /\[.*?\]/,
                inside: {
                    "md md-bracket-start": /\[/,
                    "md md-bracket-end": /\]/
                }
            },
            url: urlPattern,
            linktitle: /['\"\(][^\'\"\)]*['\"\)]/
        }
    };
    md.p = {
        pattern: /.+/g,
        inside: {
            'md md-toc': /^\s*\[(toc|TOC)\]\s*$/g
        }
    };
    md.lf = /^\n$/gm;
    md.img = {
        pattern: /!\[[^\]]*\]\([^\)]+\)/g,
        inside: {
            "md md-bang": /^!/,
            "md md-bracket-start": /\[/,
            "md md-alt": /[^\[]+(?=\])/,
            "md md-bracket-end": /\](?=\()/,
            "md img-parens": {
                pattern: /\([^\)]+\)/,
                inside: {
                    "md md-paren-start": /^\(/,
                    "md md-title": /(['‘][^'’]*['’]|["“][^"”]*["”])(?=\)$)/,
                    "md md-src": /[^\('" \t]+(?=[\)'" \t])/,
                    "md md-paren-end": /\)$/
                }
            }
        }
    };
    md.link = {
        pattern: /\[(?:(\\.)|[^\[\]])*\]\([^\(\)\s]+(\(\S*?\))??[^\(\)\s]*?(\s(['‘][^'’]*['’]|["“][^"”]*["”]))?\)/gm,
        inside: {
            "md md-bracket-start": {
                pattern: /(^|[^\\])\[/,
                lookbehind: true
            },
            "md md-underlined-text": {
                pattern: /(?:(\\.)|[^\[\]])+(?=\])/
            },
            "md md-bracket-end": /\]\s?\(/,
            "md md-paren-end": /\)$/,
            "md md-href": /.*/
        }
    };
    md.fn = {
        pattern: /\[\^(.*?)\]/g,
        inside: {
            "ref": {
                pattern: /^\[[^\[\]]+\] ?/,
                inside: {
                    "md md-bracket-start": /\[/,
                    "md md-ref": /^[^\[\]]+/,
                    "md md-bracket-end": /\]/
                }
            }
        }
    };
    md.imgref = {
        pattern: /!\[(.*?)\] ?\[(.*?)\]/g,
        inside: {
            "md md-bang": /^!/,
            "ref-end": {
                pattern: /\[[^\[\]]+\]$/,
                inside: {
                    "md md-bracket-start": /\[/,
                    "md md-href": /[^\[\]]+(?=]$)/,
                    "md md-bracket-end": /\]/
                }
            },
            "ref-start": {
                pattern: /^\[[^\[\]]+\] ?/,
                inside: {
                    "md md-bracket-start": /\[/,
                    "md md-alt": /^[^\[\]]+/,
                    "md md-bracket-end": /\]/
                }
            }
        }
    };
    md.linkref = {
        pattern: /\[(.*?)\] ?\[(.*?)\]/g,
        inside: {
            "ref-end": {
                pattern: /\[[^\[\]]+\]$/,
                inside: {
                    "md md-bracket-start": /\[/,
                    "md md-href": /[^\[\]]+(?=]$)/,
                    "md md-bracket-end": /\]/
                }
            },
            "ref-start": {
                pattern: /^\[[^\[\]]+\] ?/,
                inside: {
                    "md md-bracket-start": /\[/,
                    "md md-underlined-text": /^[^\[\]]+/,
                    "md md-bracket-end": /\]/
                }
            }
        }
    };
    md.email = {
        pattern: emailPattern
    };
    md.code = {
        pattern: /(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/g,
        lookbehind: true,
        inside: {
            "md md-code": /`/
        }
    };
    md.math = {
        pattern: /\$.*?\$/g,
        inside: {
            "md md-bracket-start": /^\$/,
            "md md-bracket-end": /\$$/,
            rest: latex
        }
    };
    md.strong = {
        pattern: /([_\*])\1((?!\1{2}).)*\1{2}/g,
        inside: {
            "md md-strong": /([_\*])\1/g
        }
    };
    md.em = {
        pattern: /(^|[^\\])(\*|_)(\S[^\2]*?)??[^\s\\]+?\2/g,
        lookbehind: true,
        inside: {
            "md md-em md-start": /^(\*|_)/,
            "md md-em md-close": /(\*|_)$/
        }
    };
    md.strike = {
        pattern: /(^|\n|\W)(~~)(?=\S)([^\r]*?\S)\2/gm,
        lookbehind: true,
        inside: {
            "md md-s": /(~~)/,
            "md-strike-text": /[^~]+/
        }
    };
    var rest = {
        code: md.code,
        math: md.math,
        fn: md.fn,
        img: md.img,
        link: md.link,
        imgref: md.imgref,
        linkref: md.linkref,
        url: md.url,
        email: md.email,
        strong: md.strong,
        em: md.em,
        strike: md.strike,
        conflict: /⧸⧸/g,
        comment: Prism.languages.markup.comment,
        tag: Prism.languages.markup.tag,
        entity: Prism.languages.markup.entity
    };
    for (var c = 6; c >= 1; c--) {
        md["h" + c].inside.rest = rest;
    }
    md["h1 alt"].inside.rest = rest;
    md["h2 alt"].inside.rest = rest;
    md.p.inside.rest = rest;
    md.blockquote.inside.rest = rest;
    md.li.inside.rest = rest;
    md.fndef.inside.rest = rest;

    rest = {
        code: md.code,
        fn: md.fn,
        link: md.link,
        linkref: md.linkref,
        conflict: /⧸⧸/g,
    };
    md.strong.inside.rest = rest;
    md.em.inside.rest = rest;
    md.strike.inside.rest = rest;

    var inside = {
        code: md.code,
        strong: md.strong,
        em: md.em,
        strike: md.strike,
        conflict: /⧸⧸/g,
        comment: Prism.languages.markup.comment,
        tag: Prism.languages.markup.tag,
        entity: Prism.languages.markup.entity
    };
    md.link.inside["md md-underlined-text"].inside = inside;
    md.linkref.inside["ref-start"].inside["md md-underlined-text"].inside = inside;

    return md;
})();
