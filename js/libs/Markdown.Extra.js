(function () {
  // A quick way to make sure we're only keeping span-level tags when we need to.
  // This isn't supposed to be foolproof. It's just a quick way to make sure we
  // keep all span-level tags returned by a pagedown converter. It should allow
  // all span-level tags through, with or without attributes.
  var inlineTags = new RegExp(['^(<\\/?(a|abbr|acronym|applet|area|b|basefont|',
                               'bdo|big|button|cite|code|del|dfn|em|figcaption|',
                               'font|i|iframe|img|input|ins|kbd|label|map|',
                               'mark|meter|object|param|progress|q|ruby|rp|rt|s|',
                               'samp|script|select|small|span|strike|strong|',
                               'sub|sup|textarea|time|tt|u|var|wbr)[^>]*>|',
                               '<(br)\\s?\\/?>)$'].join(''), 'i');

  /******************************************************************
   * Utility Functions                                              *
   *****************************************************************/

  // patch for ie7
  if (!Array.indexOf) {
    Array.prototype.indexOf = function(obj) {
      for (var i = 0; i < this.length; i++) {
        if (this[i] == obj) {
          return i;
        }
      }
      return -1;
    };
  }

  function trim(str) {
    return str.replace(/^\s+|\s+$/g, '');
  }

  function rtrim(str) {
    return str.replace(/\s+$/g, '');
  }

  // Remove one level of indentation from text. Indent is 4 spaces.
  function outdent(text) {
    return text.replace(new RegExp('^(\\t|[ ]{1,4})', 'gm'), '');
  }

  function contains(str, substr) {
    return str.indexOf(substr) != -1;
  }

  // Sanitize html, removing tags that aren't in the whitelist
  function sanitizeHtml(html, whitelist) {
    return html.replace(/<[^>]*>?/gi, function(tag) {
      return tag.match(whitelist) ? tag : '';
    });
  }

  // Merge two arrays, keeping only unique elements.
  function union(x, y) {
    var obj = {};
    for (var i = 0; i < x.length; i++)
       obj[x[i]] = x[i];
    for (i = 0; i < y.length; i++)
       obj[y[i]] = y[i];
    var res = [];
    for (var k in obj) {
      if (obj.hasOwnProperty(k))
        res.push(obj[k]);
    }
    return res;
  }

  // JS regexes don't support \A or \Z, so we add sentinels, as Pagedown
  // does. In this case, we add the ascii codes for start of text (STX) and
  // end of text (ETX), an idea borrowed from:
  // https://github.com/tanakahisateru/js-markdown-extra
  function addAnchors(text) {
    if(text.charAt(0) != '\x02')
      text = '\x02' + text;
    if(text.charAt(text.length - 1) != '\x03')
      text = text + '\x03';
    return text;
  }

  // Remove STX and ETX sentinels.
  function removeAnchors(text) {
    if(text.charAt(0) == '\x02')
      text = text.substr(1);
    if(text.charAt(text.length - 1) == '\x03')
      text = text.substr(0, text.length - 1);
    return text;
  }

  // Convert markdown within an element, retaining only span-level tags
  function convertSpans(text, extra) {
    return sanitizeHtml(convertAll(text, extra), inlineTags);
  }

  // Convert internal markdown using the stock pagedown converter
  function convertAll(text, extra) {
    var result = extra.blockGamutHookCallback(text);
    // We need to perform these operations since we skip the steps in the converter
    result = unescapeSpecialChars(result);
    result = result.replace(/~D/g, "$$").replace(/~T/g, "~");
    result = extra.previousPostConversion(result);
    return result;
  }

  // Convert escaped special characters to HTML decimal entity codes.
  function processEscapes(text) {
    // Markdown extra adds two escapable characters, `:` and `|`
    // If escaped, we convert them to html entities so our
    // regexes don't recognize them. Markdown doesn't support escaping
    // the escape character, e.g. `\\`, which make this even simpler.
    return text.replace(/\\\|/g, '&#124;').replace(/\\:/g, '&#58;');
  }

  // Duplicated from PageDown converter
  function unescapeSpecialChars(text) {
    // Swap back in all the special characters we've hidden.
    text = text.replace(/~E(\d+)E/g, function(wholeMatch, m1) {
      var charCodeToReplace = parseInt(m1);
      return String.fromCharCode(charCodeToReplace);
    });
    return text;
  }

  /*****************************************************************************
   * Markdown.Extra *
   ****************************************************************************/

  Markdown.Extra = function() {
    // For converting internal markdown (in tables for instance).
    // This is necessary since these methods are meant to be called as
    // preConversion hooks, and the Markdown converter passed to init()
    // won't convert any markdown contained in the html tags we return.
    this.converter = null;

    // Stores html blocks we generate in hooks so that
    // they're not destroyed if the user is using a sanitizing converter
    this.hashBlocks = [];

    // Special attribute blocks for fenced code blocks and headers enabled.
    this.attributeBlocks = false;

    // Fenced code block options
    this.googleCodePrettify = false;
    this.highlightJs = false;

    // Table options
    this.tableClass = '';

    this.tabWidth = 4;
  };

  Markdown.Extra.init = function(converter, options) {
    // Each call to init creates a new instance of Markdown.Extra so it's
    // safe to have multiple converters, with different options, on a single page
    var extra = new Markdown.Extra();
    var postNormalizationTransformations = [];
    var preBlockGamutTransformations = [];
    var postConversionTransformations = ["unHashExtraBlocks"];

    options = options || {};
    options.extensions = options.extensions || ["all"];
    if (contains(options.extensions, "all")) {
      options.extensions = ["tables", "fenced_code_gfm", "def_list", "attr_list"];
    }
    if (contains(options.extensions, "attr_list")) {
      postNormalizationTransformations.push("hashFcbAttributeBlocks");
      preBlockGamutTransformations.push("hashHeaderAttributeBlocks");
      postConversionTransformations.push("applyAttributeBlocks");
      extra.attributeBlocks = true;
    }
    if (contains(options.extensions, "tables")) {
      preBlockGamutTransformations.push("tables");
    }
    if (contains(options.extensions, "fenced_code_gfm")) {
      postNormalizationTransformations.push("fencedCodeBlocks");
    }
    if (contains(options.extensions, "def_list")) {
      preBlockGamutTransformations.push("definitionLists");
    }
    
    converter.hooks.chain("postNormalization", function(text) {
      return extra.doTransform(postNormalizationTransformations, text) + '\n';
    });

    converter.hooks.chain("preBlockGamut", function(text, blockGamutHookCallback) {
      // Keep a reference to the block gamut callback to run recursively
      extra.blockGamutHookCallback = blockGamutHookCallback;
      text = processEscapes(text);
      return extra.doTransform(preBlockGamutTransformations, text) + '\n';
    });

    // Keep a reference to the hook chain running before doPostConversion to apply on hashed extra blocks
    extra.previousPostConversion = converter.hooks.postConversion;
    converter.hooks.chain("postConversion", function(text) {
      text = extra.doTransform(postConversionTransformations, text);
      // Clear state vars that may use unnecessary memory
      this.hashBlocks = [];
      return text;
    });

    if ("highlighter" in options) {
      extra.googleCodePrettify = options.highlighter === 'prettify';
      extra.highlightJs = options.highlighter === 'highlight';
    }

    if ("table_class" in options) {
      extra.tableClass = options.table_class;
    }

    extra.converter = converter;

    // Caller usually won't need this, but it's handy for testing.
    return extra;
  };

  // Do transformations
  Markdown.Extra.prototype.doTransform = function(transformations, text) {
    for(var i = 0; i < transformations.length; i++)
      text = this[transformations[i]](text);
    return text;
  };

  // Return a placeholder containing a key, which is the block's index in the
  // hashBlocks array. We wrap our output in a <p> tag here so Pagedown won't.
  Markdown.Extra.prototype.hashExtraBlock = function(block) {
    return '\n<p>~X' + (this.hashBlocks.push(block) - 1) + 'X</p>\n';
  };

  // Replace placeholder blocks in `text` with their corresponding
  // html blocks in the hashBlocks array.
  Markdown.Extra.prototype.unHashExtraBlocks = function(text) {
    var self = this;
    function recursiveUnHash() {
      var hasHash = false;
      text = text.replace(/<p>~X(\d+)X<\/p>/g, function(wholeMatch, m1) {
        hasHash = true;
        var key = parseInt(m1, 10);
        return self.hashBlocks[key];
      });
      if(hasHash === true) {
        recursiveUnHash();
      }
    }
    recursiveUnHash();
    return text;
  };


  /******************************************************************
   * Attribute Blocks                                               *
   *****************************************************************/

  // Extract headers attribute blocks, move them above the element they will be
  // applied to, and hash them for later.
  Markdown.Extra.prototype.hashHeaderAttributeBlocks = function(text) {
    // TODO: use sentinels. Should we just add/remove them in doConversion?
    // TODO: better matches for id / class attributes
    var attrBlock = "\\{\\s*[.|#][^}]+\\}";
    var hdrAttributesA = new RegExp("^(#{1,6}.*#{0,6})\\s+(" + attrBlock + ")[ \\t]*(\\n|0x03)", "gm");
    var hdrAttributesB = new RegExp("^(.*)\\s+(" + attrBlock + ")[ \\t]*\\n" +
      "(?=[\\-|=]+\\s*(\\n|0x03))", "gm"); // underline lookahead
    
    var self = this;
    function attributeCallback(wholeMatch, pre, attr) {
      return '<p>~XX' + (self.hashBlocks.push(attr) - 1) + 'XX</p>\n' + pre + "\n";
    }

    text = text.replace(hdrAttributesA, attributeCallback);  // ## headers
    text = text.replace(hdrAttributesB, attributeCallback);  // underline headers
    return text;
  };
  
  // Extract FCB attribute blocks, move them above the element they will be
  // applied to, and hash them for later.
  Markdown.Extra.prototype.hashFcbAttributeBlocks = function(text) {
    // TODO: use sentinels. Should we just add/remove them in doConversion?
    // TODO: better matches for id / class attributes
    var attrBlock = "\\{\\s*[.|#][^}]+\\}";
    var fcbAttributes =  new RegExp("^(```[^{]*)\\s+(" + attrBlock + ")[ \\t]*\\n" +
                                    "(?=([\\s\\S]*?)\\n```\\s*(\\n|0x03))", "gm");

    var self = this;
    function attributeCallback(wholeMatch, pre, attr) {
      return '<p>~XX' + (self.hashBlocks.push(attr) - 1) + 'XX</p>\n' + pre + "\n";
    }

    return text.replace(fcbAttributes, attributeCallback);
  };

  Markdown.Extra.prototype.applyAttributeBlocks = function(text) {
    var self = this;
    var blockRe = new RegExp('<p>~XX(\\d+)XX</p>[\\s]*' +
                             '(?:<(h[1-6]|pre)(?: +class="(\\S+)")?(>[\\s\\S]*?</\\2>))', "gm");
    text = text.replace(blockRe, function(wholeMatch, k, tag, cls, rest) {
      if (!tag) // no following header or fenced code block.
        return '';

      // get attributes list from hash
      var key = parseInt(k, 10);
      var attributes = self.hashBlocks[key];

      // get id
      var id = attributes.match(/#[^\s{}]+/g) || [];
      var idStr = id[0] ? ' id="' + id[0].substr(1, id[0].length - 1) + '"' : '';

      // get classes and merge with existing classes
      var classes = attributes.match(/\.[^\s{}]+/g) || [];
      for (var i = 0; i < classes.length; i++) // Remove leading dot
        classes[i] = classes[i].substr(1, classes[i].length - 1);

      var classStr = '';
      if (cls)
        classes = union(classes, [cls]);

      if (classes.length > 0)
        classStr = ' class="' + classes.join(' ') + '"';

      return "<" + tag + idStr + classStr + rest;
    });

    return text;
  };

  /******************************************************************
   * Tables                                                         *
   *****************************************************************/

  // Find and convert Markdown Extra tables into html.
  Markdown.Extra.prototype.tables = function(text) {
    var self = this;

    var leadingPipe = new RegExp(
      ['^'                         ,
       '[ ]{0,3}'                  , // Allowed whitespace
       '[|]'                       , // Initial pipe
       '(.+)\\n'                   , // $1: Header Row

       '[ ]{0,3}'                  , // Allowed whitespace
       '[|]([ ]*[-:]+[-| :]*)\\n'  , // $2: Separator

       '('                         , // $3: Table Body
         '(?:[ ]*[|].*\\n?)*'      , // Table rows
       ')',
       '(?:\\n|$)'                   // Stop at final newline
      ].join(''),
      'gm'
    );

    var noLeadingPipe = new RegExp(
      ['^'                         ,
       '[ ]{0,3}'                  , // Allowed whitespace
       '(\\S.*[|].*)\\n'           , // $1: Header Row

       '[ ]{0,3}'                  , // Allowed whitespace
       '([-:]+[ ]*[|][-| :]*)\\n'  , // $2: Separator

       '('                         , // $3: Table Body
         '(?:.*[|].*\\n?)*'        , // Table rows
       ')'                         ,
       '(?:\\n|$)'                   // Stop at final newline
      ].join(''),
      'gm'
    );

    text = text.replace(leadingPipe, doTable);
    text = text.replace(noLeadingPipe, doTable);

    // $1 = header, $2 = separator, $3 = body
    function doTable(match, header, separator, body, offset, string) {
      // remove any leading pipes and whitespace
      header = header.replace(/^ *[|]/m, '');
      separator = separator.replace(/^ *[|]/m, '');
      body = body.replace(/^ *[|]/gm, '');

      // remove trailing pipes and whitespace
      header = header.replace(/[|] *$/m, '');
      separator = separator.replace(/[|] *$/m, '');
      body = body.replace(/[|] *$/gm, '');

      // determine column alignments
      alignspecs = separator.split(/ *[|] */);
      align = [];
      for (var i = 0; i < alignspecs.length; i++) {
        var spec = alignspecs[i];
        if (spec.match(/^ *-+: *$/m))
          align[i] = ' style="text-align:right;"';
        else if (spec.match(/^ *:-+: *$/m))
          align[i] = ' style="text-align:center;"';
        else if (spec.match(/^ *:-+ *$/m))
          align[i] = ' style="text-align:left;"';
        else align[i] = '';
      }

      // TODO: parse spans in header and rows before splitting, so that pipes
      // inside of tags are not interpreted as separators
      var headers = header.split(/ *[|] */);
      var colCount = headers.length;

      // build html
      var cls = self.tableClass ? ' class="' + self.tableClass + '"' : '';
      var html = ['<table', cls, '>\n', '<thead>\n', '<tr>\n'].join('');

      // build column headers.
      for (i = 0; i < colCount; i++) {
        var headerHtml = convertSpans(trim(headers[i]), self);
        html += ["  <th", align[i], ">", headerHtml, "</th>\n"].join('');
      }
      html += "</tr>\n</thead>\n";

      // build rows
      var rows = body.split('\n');
      for (i = 0; i < rows.length; i++) {
        if (rows[i].match(/^\s*$/)) // can apply to final row
          continue;

        // ensure number of rowCells matches colCount
        var rowCells = rows[i].split(/ *[|] */);
        var lenDiff = colCount - rowCells.length;
        for (var j = 0; j < lenDiff; j++)
          rowCells.push('');

        html += "<tr>\n";
        for (j = 0; j < colCount; j++) {
          var colHtml = convertSpans(trim(rowCells[j]), self);
          html += ["  <td", align[j], ">", colHtml, "</td>\n"].join('');
        }
        html += "</tr>\n";
      }

      html += "</table>\n";

      // replace html with placeholder until postConversion step
      return self.hashExtraBlock(html);
    }

    return text;
  };


  /******************************************************************
  * Fenced Code Blocks  (gfm)                                       *
  ******************************************************************/

  // Find and convert gfm-inspired fenced code blocks into html.
  Markdown.Extra.prototype.fencedCodeBlocks = function(text) {
    function encodeCode(code) {
      code = code.replace(/&/g, "&amp;");
      code = code.replace(/</g, "&lt;");
      code = code.replace(/>/g, "&gt;");
      // These were escaped by PageDown before postNormalization 
      code = code.replace(/~D/g, "$$");
      code = code.replace(/~T/g, "~");
      return code;
    }

    var self = this;
    text = text.replace(/(?:^|\n)```(.*)\n([\s\S]*?)\n```/g, function(match, m1, m2) {
      var language = m1, codeblock = m2;

      // adhere to specified options
      var preclass = self.googleCodePrettify ? ' class="prettyprint"' : '';
      var codeclass = '';
      if (language) {
        if (self.googleCodePrettify || self.highlightJs) {
          // use html5 language- class names. supported by both prettify and highlight.js
          codeclass = ' class="language-' + language + '"';
        } else {
          codeclass = ' class="' + language + '"';
        }
      }

      var html = ['<pre', preclass, '><code', codeclass, '>',
                  encodeCode(codeblock), '</code></pre>'].join('');

      // replace codeblock with placeholder until postConversion step
      return self.hashExtraBlock(html);
    });

    return text;
  };


  /******************************************************************
  * Definition Lists                                                *
  ******************************************************************/

  // Find and convert markdown extra definition lists into html.
  Markdown.Extra.prototype.definitionLists = function(text) {
    var wholeList = new RegExp(
      ['(\\x02\\n?|\\n\\n)'          ,
       '(?:'                         ,
         '('                         , // $1 = whole list
           '('                       , // $2
             '[ ]{0,3}'              ,
             '((?:[ \\t]*\\S.*\\n)+)', // $3 = defined term
             '\\n?'                  ,
             '[ ]{0,3}:[ ]+'         , // colon starting definition
           ')'                       ,
           '([\\s\\S]+?)'            ,
           '('                       , // $4
               '(?=\\0x03)'          , // \z
             '|'                     ,
               '(?='                 ,
                 '\\n{2,}'           ,
                 '(?=\\S)'           ,
                 '(?!'               , // Negative lookahead for another term
                   '[ ]{0,3}'        ,
                   '(?:\\S.*\\n)+?'  , // defined term
                   '\\n?'            ,
                   '[ ]{0,3}:[ ]+'   , // colon starting definition
                 ')'                 ,
                 '(?!'               , // Negative lookahead for another definition
                   '[ ]{0,3}:[ ]+'   , // colon starting definition
                 ')'                 ,
               ')'                   ,
           ')'                       ,
         ')'                         ,
       ')'
      ].join(''),
      'gm'
    );

    var self = this;
    text = addAnchors(text);

    text = text.replace(wholeList, function(match, pre, list) {
      var result = trim(self.processDefListItems(list));
      result = "<dl>\n" + result + "\n</dl>";
      return pre + self.hashExtraBlock(result) + "\n\n";
    });

    return removeAnchors(text);
  };

  // Process the contents of a single definition list, splitting it
  // into individual term and definition list items.
  Markdown.Extra.prototype.processDefListItems = function(listStr) {
    var self = this;

    var dt = new RegExp(
      ['(\\x02\\n?|\\n\\n+)'    , // leading line
       '('                      , // definition terms = $1
         '[ ]{0,3}'             , // leading whitespace
         '(?![:][ ]|[ ])'       , // negative lookahead for a definition
                                  //   mark (colon) or more whitespace
         '(?:\\S.*\\n)+?'       , // actual term (not whitespace)
       ')'                      ,
       '(?=\\n?[ ]{0,3}:[ ])'     // lookahead for following line feed
      ].join(''),                 //   with a definition mark
      'gm'
    );

    var dd = new RegExp(
      ['\\n(\\n+)?'              , // leading line = $1
       '('                       , // marker space = $2
         '[ ]{0,3}'              , // whitespace before colon
         '[:][ ]+'               , // definition mark (colon)
       ')'                       ,
       '([\\s\\S]+?)'            , // definition text = $3
       '(?=\\n*'                 , // stop at next definition mark,
         '(?:'                   , // next term or end of text
           '\\n[ ]{0,3}[:][ ]|'  ,
           '<dt>|\\x03'          , // \z
         ')'                     ,
       ')'
      ].join(''),
      'gm'
    );

    listStr = addAnchors(listStr);
    // trim trailing blank lines:
    listStr = listStr.replace(/\n{2,}(?=\\x03)/, "\n");

    // Process definition terms.
    listStr = listStr.replace(dt, function(match, pre, termsStr) {
      var terms = trim(termsStr).split("\n");
      var text = '';
      for (var i = 0; i < terms.length; i++) {
        var term = terms[i];
        // process spans inside dt
        term = convertSpans(trim(term), self);
        text += "\n<dt>" + term + "</dt>";
      }
      return text + "\n";
    });

    // Process actual definitions.
    listStr = listStr.replace(dd, function(match, leadingLine, markerSpace, def) {
      if (leadingLine || def.match(/\n{2,}/)) {
        // replace marker with the appropriate whitespace indentation
        def = Array(markerSpace.length + 1).join(' ') + def;
        // process markdown inside definition
        // TODO?: currently doesn't apply extensions
        def = outdent(def) + "\n\n";
        def = "\n" + convertAll(def, self) + "\n";
      } else {
        // convert span-level markdown inside definition
        def = rtrim(def);
        def = convertSpans(outdent(def), self);
      }

      return "\n<dd>" + def + "</dd>\n";
    });

    return removeAnchors(listStr);
  };

})();

