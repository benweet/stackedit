var util = {},
  re = window.RegExp,
  SETTINGS = {
    lineLength: 72
  };

var defaultsStrings = {
  bold: "Strong <strong> Ctrl/Cmd+B",
  boldexample: "strong text",

  italic: "Emphasis <em> Ctrl/Cmd+I",
  italicexample: "emphasized text",

  strikethrough: "Strikethrough <s> Ctrl/Cmd+I",
  strikethroughexample: "strikethrough text",

  link: "Hyperlink <a> Ctrl/Cmd+L",
  linkdescription: "enter link description here",
  linkdialog: "<p><b>Insert Hyperlink</b></p><p>http://example.com/ \"optional title\"</p>",

  quote: "Blockquote <blockquote> Ctrl/Cmd+Q",
  quoteexample: "Blockquote",

  code: "Code Sample <pre><code> Ctrl/Cmd+K",
  codeexample: "enter code here",

  image: "Image <img> Ctrl/Cmd+G",
  imagedescription: "enter image description here",
  imagedialog: "<p><b>Insert Image</b></p><p>http://example.com/images/diagram.jpg \"optional title\"<br><br>Need <a href='http://www.google.com/search?q=free+image+hosting' target='_blank'>free image hosting?</a></p>",

  olist: "Numbered List <ol> Ctrl/Cmd+O",
  ulist: "Bulleted List <ul> Ctrl/Cmd+U",
  litem: "List item",

  heading: "Heading <h1>/<h2> Ctrl/Cmd+H",
  headingexample: "Heading",

  hr: "Horizontal Rule <hr> Ctrl/Cmd+R",

  undo: "Undo - Ctrl/Cmd+Z",
  redo: "Redo - Ctrl/Cmd+Y",

  help: "Markdown Editing Help"
};

// options, if given, can have the following properties:
//   options.helpButton = { handler: yourEventHandler }
//   options.strings = { italicexample: "slanted text" }
// `yourEventHandler` is the click handler for the help button.
// If `options.helpButton` isn't given, not help button is created.
// `options.strings` can have any or all of the same properties as
// `defaultStrings` above, so you can just override some string displayed
// to the user on a case-by-case basis, or translate all strings to
// a different language.
//
// For backwards compatibility reasons, the `options` argument can also
// be just the `helpButton` object, and `strings.help` can also be set via
// `helpButton.title`. This should be considered legacy.
//
// The constructed editor object has the methods:
// - getConverter() returns the markdown converter object that was passed to the constructor
// - run() actually starts the editor; should be called after all necessary plugins are registered. Calling this more than once is a no-op.
// - refreshPreview() forces the preview to be updated. This method is only available after run() was called.
function Pagedown(options) {

  options = options || {};

  if (typeof options.handler === "function") { //backwards compatible behavior
    options = {
      helpButton: options
    };
  }
  options.strings = options.strings || {};
  var getString = function (identifier) {
    return options.strings[identifier] || defaultsStrings[identifier];
  };

  function identity(x) {
    return x;
  }

  function returnFalse() {
    return false;
  }

  function HookCollection() { }
  HookCollection.prototype = {

    chain: function (hookname, func) {
      var original = this[hookname];
      if (!original) {
        throw new Error("unknown hook " + hookname);
      }

      if (original === identity) {
        this[hookname] = func;
      } else {
        this[hookname] = function () {
          var args = Array.prototype.slice.call(arguments, 0);
          args[0] = original.apply(null, args);
          return func.apply(null, args);
        };
      }
    },
    set: function (hookname, func) {
      if (!this[hookname]) {
        throw new Error("unknown hook " + hookname);
      }
      this[hookname] = func;
    },
    addNoop: function (hookname) {
      this[hookname] = identity;
    },
    addFalse: function (hookname) {
      this[hookname] = returnFalse;
    }
  };

  var hooks = this.hooks = new HookCollection();
  hooks.addNoop("onPreviewRefresh"); // called with no arguments after the preview has been refreshed
  hooks.addNoop("postBlockquoteCreation"); // called with the user's selection *after* the blockquote was created; should return the actual to-be-inserted text
  hooks.addFalse("insertImageDialog");
  /* called with one parameter: a callback to be called with the URL of the image. If the application creates
   * its own image insertion dialog, this hook should return true, and the callback should be called with the chosen
   * image url (or null if the user cancelled). If this hook returns false, the default dialog will be used.
   */
  hooks.addFalse("insertLinkDialog");

  var that = this,
    input;

  this.run = function () {
    if (input)
      return; // already initialized

    input = options.input;
    var commandManager = new CommandManager(hooks, getString);
    var uiManager;

    uiManager = new UIManager(input, commandManager);

    that.uiManager = uiManager;
  };

}

// before: contains all the text in the input box BEFORE the selection.
// after: contains all the text in the input box AFTER the selection.
function Chunks() { }

// startRegex: a regular expression to find the start tag
// endRegex: a regular expresssion to find the end tag
Chunks.prototype.findTags = function (startRegex, endRegex) {

  var chunkObj = this;
  var regex;

  if (startRegex) {

    regex = util.extendRegExp(startRegex, "", "$");

    this.before = this.before.replace(regex,
      function (match) {
        chunkObj.startTag = chunkObj.startTag + match;
        return "";
      });

    regex = util.extendRegExp(startRegex, "^", "");

    this.selection = this.selection.replace(regex,
      function (match) {
        chunkObj.startTag = chunkObj.startTag + match;
        return "";
      });
  }

  if (endRegex) {

    regex = util.extendRegExp(endRegex, "", "$");

    this.selection = this.selection.replace(regex,
      function (match) {
        chunkObj.endTag = match + chunkObj.endTag;
        return "";
      });

    regex = util.extendRegExp(endRegex, "^", "");

    this.after = this.after.replace(regex,
      function (match) {
        chunkObj.endTag = match + chunkObj.endTag;
        return "";
      });
  }
};

// If remove is false, the whitespace is transferred
// to the before/after regions.
//
// If remove is true, the whitespace disappears.
Chunks.prototype.trimWhitespace = function (remove) {
  var beforeReplacer, afterReplacer, that = this;
  if (remove) {
    beforeReplacer = afterReplacer = "";
  } else {
    beforeReplacer = function (s) {
      that.before += s;
      return "";
    };
    afterReplacer = function (s) {
      that.after = s + that.after;
      return "";
    };
  }

  this.selection = this.selection.replace(/^(\s*)/, beforeReplacer).replace(/(\s*)$/, afterReplacer);
};


Chunks.prototype.skipLines = function (nLinesBefore, nLinesAfter, findExtraNewlines) {

  if (nLinesBefore === undefined) {
    nLinesBefore = 1;
  }

  if (nLinesAfter === undefined) {
    nLinesAfter = 1;
  }

  nLinesBefore++;
  nLinesAfter++;

  var regexText;
  var replacementText;

  // chrome bug ... documented at: http://meta.stackoverflow.com/questions/63307/blockquote-glitch-in-editor-in-chrome-6-and-7/65985#65985
  if (navigator.userAgent.match(/Chrome/)) {
    "X".match(/()./);
  }

  this.selection = this.selection.replace(/(^\n*)/, "");

  this.startTag = this.startTag + re.$1;

  this.selection = this.selection.replace(/(\n*$)/, "");
  this.endTag = this.endTag + re.$1;
  this.startTag = this.startTag.replace(/(^\n*)/, "");
  this.before = this.before + re.$1;
  this.endTag = this.endTag.replace(/(\n*$)/, "");
  this.after = this.after + re.$1;

  if (this.before) {

    regexText = replacementText = "";

    while (nLinesBefore--) {
      regexText += "\\n?";
      replacementText += "\n";
    }

    if (findExtraNewlines) {
      regexText = "\\n*";
    }
    this.before = this.before.replace(new re(regexText + "$", ""), replacementText);
  }

  if (this.after) {

    regexText = replacementText = "";

    while (nLinesAfter--) {
      regexText += "\\n?";
      replacementText += "\n";
    }
    if (findExtraNewlines) {
      regexText = "\\n*";
    }

    this.after = this.after.replace(new re(regexText, ""), replacementText);
  }
};

// end of Chunks

// Converts \r\n and \r to \n.
util.fixEolChars = function (text) {
  text = text.replace(/\r\n/g, "\n");
  text = text.replace(/\r/g, "\n");
  return text;
};

// Extends a regular expression.  Returns a new RegExp
// using pre + regex + post as the expression.
// Used in a few functions where we have a base
// expression and we want to pre- or append some
// conditions to it (e.g. adding "$" to the end).
// The flags are unchanged.
//
// regex is a RegExp, pre and post are strings.
util.extendRegExp = function (regex, pre, post) {

  if (pre === null || pre === undefined) {
    pre = "";
  }
  if (post === null || post === undefined) {
    post = "";
  }

  var pattern = regex.toString();
  var flags;

  // Replace the flags with empty space and store them.
  pattern = pattern.replace(/\/([gim]*)$/, function (wholeMatch, flagsPart) {
    flags = flagsPart;
    return "";
  });

  // Remove the slash delimiters on the regular expression.
  pattern = pattern.replace(/(^\/|\/$)/g, "");
  pattern = pre + pattern + post;

  return new re(pattern, flags);
};

// The input textarea state/contents.
// This is used to implement undo/redo by the undo manager.
function TextareaState(input) {

  // Aliases
  var stateObj = this;
  var inputArea = input;
  this.init = function () {
    this.setInputAreaSelectionStartEnd();
    this.text = inputArea.getContent();
  };

  // Sets the selected text in the input box after we've performed an
  // operation.
  this.setInputAreaSelection = function () {
    inputArea.focus();
    inputArea.setSelection(stateObj.start, stateObj.end);
  };

  this.setInputAreaSelectionStartEnd = function () {
    stateObj.start = Math.min(
      inputArea.selectionMgr.selectionStart,
      inputArea.selectionMgr.selectionEnd
    );
    stateObj.end = Math.max(
      inputArea.selectionMgr.selectionStart,
      inputArea.selectionMgr.selectionEnd
    );
  };

  // Restore this state into the input area.
  this.restore = function () {

    if (stateObj.text !== undefined && stateObj.text != inputArea.getContent()) {
      inputArea.setContent(stateObj.text);
    }
    this.setInputAreaSelection();
  };

  // Gets a collection of HTML chunks from the inptut textarea.
  this.getChunks = function () {

    var chunk = new Chunks();
    chunk.before = util.fixEolChars(stateObj.text.substring(0, stateObj.start));
    chunk.startTag = "";
    chunk.selection = util.fixEolChars(stateObj.text.substring(stateObj.start, stateObj.end));
    chunk.endTag = "";
    chunk.after = util.fixEolChars(stateObj.text.substring(stateObj.end));

    return chunk;
  };

  // Sets the TextareaState properties given a chunk of markdown.
  this.setChunks = function (chunk) {

    chunk.before = chunk.before + chunk.startTag;
    chunk.after = chunk.endTag + chunk.after;

    this.start = chunk.before.length;
    this.end = chunk.before.length + chunk.selection.length;
    this.text = chunk.before + chunk.selection + chunk.after;
  };
  this.init();
}

function UIManager(input, commandManager) {

  var inputBox = input,
    buttons = {}; // buttons.undo, buttons.link, etc. The actual DOM elements.

  makeSpritedButtonRow();

  // Perform the button's action.
  function doClick(buttonName) {
    var button = buttons[buttonName];
    if (!button) {
      return;
    }

    inputBox.focus();
    var linkOrImage = button === buttons.link || button.id === buttons.image;

    var state = new TextareaState(input);

    if (!state) {
      return;
    }

    var chunks = state.getChunks();

    // Some commands launch a "modal" prompt dialog.  Javascript
    // can't really make a modal dialog box and the WMD code
    // will continue to execute while the dialog is displayed.
    // This prevents the dialog pattern I'm used to and means
    // I can't do something like this:
    //
    // var link = CreateLinkDialog();
    // makeMarkdownLink(link);
    //
    // Instead of this straightforward method of handling a
    // dialog I have to pass any code which would execute
    // after the dialog is dismissed (e.g. link creation)
    // in a function parameter.
    //
    // Yes this is awkward and I think it sucks, but there's
    // no real workaround.  Only the image and link code
    // create dialogs and require the function pointers.
    var fixupInputArea = function () {

      inputBox.focus();

      if (chunks) {
        state.setChunks(chunks);
      }

      state.restore();
    };

    var noCleanup = button(chunks, fixupInputArea);

    if (!noCleanup) {
      fixupInputArea();
      if (!linkOrImage) {
        inputBox.adjustCursorPosition();
      }
    }
  }

  function bindCommand(method) {
    if (typeof method === "string")
      method = commandManager[method];
    return function () {
      method.apply(commandManager, arguments);
    };
  }

  function makeSpritedButtonRow() {

    buttons.bold = bindCommand("doBold");
    buttons.italic = bindCommand("doItalic");
    buttons.strikethrough = bindCommand("doStrikethrough");
    buttons.link = bindCommand(function (chunk, postProcessing) {
      return this.doLinkOrImage(chunk, postProcessing, false);
    });
    buttons.quote = bindCommand("doBlockquote");
    buttons.code = bindCommand("doCode");
    buttons.image = bindCommand(function (chunk, postProcessing) {
      return this.doLinkOrImage(chunk, postProcessing, true);
    });
    buttons.olist = bindCommand(function (chunk, postProcessing) {
      this.doList(chunk, postProcessing, true);
    });
    buttons.ulist = bindCommand(function (chunk, postProcessing) {
      this.doList(chunk, postProcessing, false);
    });
    buttons.clist = bindCommand(function (chunk, postProcessing) {
      this.doList(chunk, postProcessing, false, true);
    });
    buttons.heading = bindCommand("doHeading");
    buttons.hr = bindCommand("doHorizontalRule");
    buttons.table = bindCommand("doTable");
  }

  this.doClick = doClick;

}

function CommandManager(pluginHooks, getString) {
  this.hooks = pluginHooks;
  this.getString = getString;
}

var commandProto = CommandManager.prototype;

// The markdown symbols - 4 spaces = code, > = blockquote, etc.
commandProto.prefixes = "(?:\\s{4,}|\\s*>|\\s*-\\s+|\\s*\\d+\\.|=|\\+|-|_|\\*|#|\\s*\\[[^\n]]+\\]:)";

// Remove markdown symbols from the chunk selection.
commandProto.unwrap = function (chunk) {
  var txt = new re("([^\\n])\\n(?!(\\n|" + this.prefixes + "))", "g");
  chunk.selection = chunk.selection.replace(txt, "$1 $2");
};

commandProto.wrap = function (chunk, len) {
  this.unwrap(chunk);
  var regex = new re("(.{1," + len + "})( +|$\\n?)", "gm"),
    that = this;

  chunk.selection = chunk.selection.replace(regex, function (line, marked) {
    if (new re("^" + that.prefixes, "").test(line)) {
      return line;
    }
    return marked + "\n";
  });

  chunk.selection = chunk.selection.replace(/\s+$/, "");
};

commandProto.doBold = function (chunk, postProcessing) {
  return this.doBorI(chunk, postProcessing, 2, this.getString("boldexample"));
};

commandProto.doItalic = function (chunk, postProcessing) {
  return this.doBorI(chunk, postProcessing, 1, this.getString("italicexample"));
};

// chunk: The selected region that will be enclosed with */**
// nStars: 1 for italics, 2 for bold
// insertText: If you just click the button without highlighting text, this gets inserted
commandProto.doBorI = function (chunk, postProcessing, nStars, insertText) {

  // Get rid of whitespace and fixup newlines.
  chunk.trimWhitespace();
  chunk.selection = chunk.selection.replace(/\n{2,}/g, "\n");

  // Look for stars before and after.  Is the chunk already marked up?
  // note that these regex matches cannot fail
  var starsBefore = /(\**$)/.exec(chunk.before)[0];
  var starsAfter = /(^\**)/.exec(chunk.after)[0];

  var prevStars = Math.min(starsBefore.length, starsAfter.length);

  // Remove stars if we have to since the button acts as a toggle.
  if ((prevStars >= nStars) && (prevStars != 2 || nStars != 1)) {
    chunk.before = chunk.before.replace(re("[*]{" + nStars + "}$", ""), "");
    chunk.after = chunk.after.replace(re("^[*]{" + nStars + "}", ""), "");
  } else if (!chunk.selection && starsAfter) {
    // It's not really clear why this code is necessary.  It just moves
    // some arbitrary stuff around.
    chunk.after = chunk.after.replace(/^([*_]*)/, "");
    chunk.before = chunk.before.replace(/(\s?)$/, "");
    var whitespace = re.$1;
    chunk.before = chunk.before + starsAfter + whitespace;
  } else {

    // In most cases, if you don't have any selected text and click the button
    // you'll get a selected, marked up region with the default text inserted.
    if (!chunk.selection && !starsAfter) {
      chunk.selection = insertText;
    }

    // Add the true markup.
    var markup = nStars <= 1 ? "*" : "**"; // shouldn't the test be = ?
    chunk.before = chunk.before + markup;
    chunk.after = markup + chunk.after;
  }

  return;
};

commandProto.doStrikethrough = function (chunk, postProcessing) {

  // Get rid of whitespace and fixup newlines.
  chunk.trimWhitespace();
  chunk.selection = chunk.selection.replace(/\n{2,}/g, "\n");

  // Look for stars before and after.  Is the chunk already marked up?
  // note that these regex matches cannot fail
  var starsBefore = /(~*$)/.exec(chunk.before)[0];
  var starsAfter = /(^~*)/.exec(chunk.after)[0];

  var prevStars = Math.min(starsBefore.length, starsAfter.length);

  var nStars = 2;

  // Remove stars if we have to since the button acts as a toggle.
  if ((prevStars >= nStars) && (prevStars != 2 || nStars != 1)) {
    chunk.before = chunk.before.replace(re("[~]{" + nStars + "}$", ""), "");
    chunk.after = chunk.after.replace(re("^[~]{" + nStars + "}", ""), "");
  } else if (!chunk.selection && starsAfter) {
    // It's not really clear why this code is necessary.  It just moves
    // some arbitrary stuff around.
    chunk.after = chunk.after.replace(/^(~*)/, "");
    chunk.before = chunk.before.replace(/(\s?)$/, "");
    var whitespace = re.$1;
    chunk.before = chunk.before + starsAfter + whitespace;
  } else {

    // In most cases, if you don't have any selected text and click the button
    // you'll get a selected, marked up region with the default text inserted.
    if (!chunk.selection && !starsAfter) {
      chunk.selection = this.getString("strikethroughexample");
    }

    // Add the true markup.
    var markup = "~~"; // shouldn't the test be = ?
    chunk.before = chunk.before + markup;
    chunk.after = markup + chunk.after;
  }

  return;
};

commandProto.stripLinkDefs = function (text, defsToAdd) {

  text = text.replace(/^[ ]{0,3}\[(\d+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?[ \t]*\n?[ \t]*(?:(\n*)["(](.+?)[")][ \t]*)?(?:\n+|$)/gm,
    function (totalMatch, id, link, newlines, title) {
      defsToAdd[id] = totalMatch.replace(/\s*$/, "");
      if (newlines) {
        // Strip the title and return that separately.
        defsToAdd[id] = totalMatch.replace(/["(](.+?)[")]$/, "");
        return newlines + title;
      }
      return "";
    });

  return text;
};

commandProto.addLinkDef = function (chunk, linkDef) {

  var refNumber = 0; // The current reference number
  var defsToAdd = {}; //
  // Start with a clean slate by removing all previous link definitions.
  chunk.before = this.stripLinkDefs(chunk.before, defsToAdd);
  chunk.selection = this.stripLinkDefs(chunk.selection, defsToAdd);
  chunk.after = this.stripLinkDefs(chunk.after, defsToAdd);

  var defs = "";
  var regex = /(\[)((?:\[[^\]]*\]|[^\[\]])*)(\][ ]?(?:\n[ ]*)?\[)(\d+)(\])/g;

  var addDefNumber = function (def) {
    refNumber++;
    def = def.replace(/^[ ]{0,3}\[(\d+)\]:/, "  [" + refNumber + "]:");
    defs += "\n" + def;
  };

  // note that
  // a) the recursive call to getLink cannot go infinite, because by definition
  //    of regex, inner is always a proper substring of wholeMatch, and
  // b) more than one level of nesting is neither supported by the regex
  //    nor making a lot of sense (the only use case for nesting is a linked image)
  var getLink = function (wholeMatch, before, inner, afterInner, id, end) {
    inner = inner.replace(regex, getLink);
    if (defsToAdd[id]) {
      addDefNumber(defsToAdd[id]);
      return before + inner + afterInner + refNumber + end;
    }
    return wholeMatch;
  };

  chunk.before = chunk.before.replace(regex, getLink);

  if (linkDef) {
    addDefNumber(linkDef);
  } else {
    chunk.selection = chunk.selection.replace(regex, getLink);
  }

  var refOut = refNumber;

  chunk.after = chunk.after.replace(regex, getLink);

  if (chunk.after) {
    chunk.after = chunk.after.replace(/\n*$/, "");
  }
  if (!chunk.after) {
    chunk.selection = chunk.selection.replace(/\n*$/, "");
  }

  chunk.after += "\n\n" + defs;

  return refOut;
};

// takes the line as entered into the add link/as image dialog and makes
// sure the URL and the optinal title are "nice".
function properlyEncoded(linkdef) {
  return linkdef.replace(/^\s*(.*?)(?:\s+"(.+)")?\s*$/, function (wholematch, link, title) {
    link = link.replace(/\?.*$/, function (querypart) {
      return querypart.replace(/\+/g, " "); // in the query string, a plus and a space are identical
    });
    link = decodeURIComponent(link); // unencode first, to prevent double encoding
    link = encodeURI(link).replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29');
    link = link.replace(/\?.*$/, function (querypart) {
      return querypart.replace(/\+/g, "%2b"); // since we replaced plus with spaces in the query part, all pluses that now appear where originally encoded
    });
    if (title) {
      title = title.trim ? title.trim() : title.replace(/^\s*/, "").replace(/\s*$/, "");
      title = title.replace(/"/g, "quot;").replace(/\(/g, "&#40;").replace(/\)/g, "&#41;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
    return title ? link + ' "' + title + '"' : link;
  });
}

commandProto.doLinkOrImage = function (chunk, postProcessing, isImage) {

  chunk.trimWhitespace();
  //chunk.findTags(/\s*!?\[/, /\][ ]?(?:\n[ ]*)?(\[.*?\])?/);
  chunk.findTags(/\s*!?\[/, /\][ ]?(?:\n[ ]*)?(\(.*?\))?/);

  if (chunk.endTag.length > 1 && chunk.startTag.length > 0) {

    chunk.startTag = chunk.startTag.replace(/!?\[/, "");
    chunk.endTag = "";
    this.addLinkDef(chunk, null);

  } else {

    // We're moving start and end tag back into the selection, since (as we're in the else block) we're not
    // *removing* a link, but *adding* one, so whatever findTags() found is now back to being part of the
    // link text. linkEnteredCallback takes care of escaping any brackets.
    chunk.selection = chunk.startTag + chunk.selection + chunk.endTag;
    chunk.startTag = chunk.endTag = "";

    if (/\n\n/.test(chunk.selection)) {
      this.addLinkDef(chunk, null);
      return;
    }
    var that = this;
    // The function to be executed when you enter a link and press OK or Cancel.
    // Marks up the link and adds the ref.
    var linkEnteredCallback = function (link) {

      if (link !== null) {
        // (                          $1
        //     [^\\]                  anything that's not a backslash
        //     (?:\\\\)*              an even number (this includes zero) of backslashes
        // )
        // (?=                        followed by
        //     [[\]]                  an opening or closing bracket
        // )
        //
        // In other words, a non-escaped bracket. These have to be escaped now to make sure they
        // don't count as the end of the link or similar.
        // Note that the actual bracket has to be a lookahead, because (in case of to subsequent brackets),
        // the bracket in one match may be the "not a backslash" character in the next match, so it
        // should not be consumed by the first match.
        // The "prepend a space and finally remove it" steps makes sure there is a "not a backslash" at the
        // start of the string, so this also works if the selection begins with a bracket. We cannot solve
        // this by anchoring with ^, because in the case that the selection starts with two brackets, this
        // would mean a zero-width match at the start. Since zero-width matches advance the string position,
        // the first bracket could then not act as the "not a backslash" for the second.
        chunk.selection = (" " + chunk.selection).replace(/([^\\](?:\\\\)*)(?=[[\]])/g, "$1\\").substr(1);

        /*
        var linkDef = " [999]: " + properlyEncoded(link);

        var num = that.addLinkDef(chunk, linkDef);
        */
        chunk.startTag = isImage ? "![" : "[";
        //chunk.endTag = "][" + num + "]";
        chunk.endTag = "](" + properlyEncoded(link) + ")";

        if (!chunk.selection) {
          if (isImage) {
            chunk.selection = that.getString("imagedescription");
          } else {
            chunk.selection = that.getString("linkdescription");
          }
        }
      }
      postProcessing();
    };

    if (isImage) {
      this.hooks.insertImageDialog(linkEnteredCallback);
    } else {
      this.hooks.insertLinkDialog(linkEnteredCallback);
    }
    return true;
  }
};

// When making a list, hitting shift-enter will put your cursor on the next line
// at the current indent level.
commandProto.doAutoindent = function (chunk) {

  var commandMgr = this,
    fakeSelection = false;

  chunk.before = chunk.before.replace(/(\n|^)[ ]{0,3}([*+-]|\d+[.])[ \t]*\n$/, "\n\n");
  chunk.before = chunk.before.replace(/(\n|^)[ ]{0,3}>[ \t]*\n$/, "\n\n");
  chunk.before = chunk.before.replace(/(\n|^)[ \t]+\n$/, "\n\n");

  // There's no selection, end the cursor wasn't at the end of the line:
  // The user wants to split the current list item / code line / blockquote line
  // (for the latter it doesn't really matter) in two. Temporarily select the
  // (rest of the) line to achieve this.
  if (!chunk.selection && !/^[ \t]*(?:\n|$)/.test(chunk.after)) {
    chunk.after = chunk.after.replace(/^[^\n]*/, function (wholeMatch) {
      chunk.selection = wholeMatch;
      return "";
    });
    fakeSelection = true;
  }

  if (/(\n|^)[ ]{0,3}([*+-]|\d+[.])[ \t]+.*\n$/.test(chunk.before)) {
    if (commandMgr.doList) {
      commandMgr.doList(chunk);
    }
  }
  if (/(\n|^)[ ]{0,3}>[ \t]+.*\n$/.test(chunk.before)) {
    if (commandMgr.doBlockquote) {
      commandMgr.doBlockquote(chunk);
    }
  }
  if (/(\n|^)(\t|[ ]{4,}).*\n$/.test(chunk.before)) {
    if (commandMgr.doCode) {
      commandMgr.doCode(chunk);
    }
  }

  if (fakeSelection) {
    chunk.after = chunk.selection + chunk.after;
    chunk.selection = "";
  }
};

commandProto.doBlockquote = function (chunk) {

  chunk.selection = chunk.selection.replace(/^(\n*)([^\r]+?)(\n*)$/,
    function (totalMatch, newlinesBefore, text, newlinesAfter) {
      chunk.before += newlinesBefore;
      chunk.after = newlinesAfter + chunk.after;
      return text;
    });

  chunk.before = chunk.before.replace(/(>[ \t]*)$/,
    function (totalMatch, blankLine) {
      chunk.selection = blankLine + chunk.selection;
      return "";
    });

  chunk.selection = chunk.selection.replace(/^(\s|>)+$/, "");
  chunk.selection = chunk.selection || this.getString("quoteexample");

  // The original code uses a regular expression to find out how much of the
  // text *directly before* the selection already was a blockquote:

  /*
  if (chunk.before) {
  chunk.before = chunk.before.replace(/\n?$/, "\n");
  }
  chunk.before = chunk.before.replace(/(((\n|^)(\n[ \t]*)*>(.+\n)*.*)+(\n[ \t]*)*$)/,
  function (totalMatch) {
  chunk.startTag = totalMatch;
  return "";
  });
  */

  // This comes down to:
  // Go backwards as many lines a possible, such that each line
  //  a) starts with ">", or
  //  b) is almost empty, except for whitespace, or
  //  c) is preceeded by an unbroken chain of non-empty lines
  //     leading up to a line that starts with ">" and at least one more character
  // and in addition
  //  d) at least one line fulfills a)
  //
  // Since this is essentially a backwards-moving regex, it's susceptible to
  // catstrophic backtracking and can cause the browser to hang;
  // see e.g. http://meta.stackoverflow.com/questions/9807.
  //
  // Hence we replaced this by a simple state machine that just goes through the
  // lines and checks for a), b), and c).

  var match = "",
    leftOver = "",
    line;
  if (chunk.before) {
    var lines = chunk.before.replace(/\n$/, "").split("\n");
    var inChain = false;
    for (var i = 0; i < lines.length; i++) {
      var good = false;
      line = lines[i];
      inChain = inChain && line.length > 0; // c) any non-empty line continues the chain
      if (/^>/.test(line)) { // a)
        good = true;
        if (!inChain && line.length > 1) // c) any line that starts with ">" and has at least one more character starts the chain
          inChain = true;
      } else if (/^[ \t]*$/.test(line)) { // b)
        good = true;
      } else {
        good = inChain; // c) the line is not empty and does not start with ">", so it matches if and only if we're in the chain
      }
      if (good) {
        match += line + "\n";
      } else {
        leftOver += match + line;
        match = "\n";
      }
    }
    if (!/(^|\n)>/.test(match)) { // d)
      leftOver += match;
      match = "";
    }
  }

  chunk.startTag = match;
  chunk.before = leftOver;

  // end of change

  if (chunk.after) {
    chunk.after = chunk.after.replace(/^\n?/, "\n");
  }

  chunk.after = chunk.after.replace(/^(((\n|^)(\n[ \t]*)*>(.+\n)*.*)+(\n[ \t]*)*)/,
    function (totalMatch) {
      chunk.endTag = totalMatch;
      return "";
    }
  );

  var replaceBlanksInTags = function (useBracket) {

    var replacement = useBracket ? "> " : "";

    if (chunk.startTag) {
      chunk.startTag = chunk.startTag.replace(/\n((>|\s)*)\n$/,
        function (totalMatch, markdown) {
          return "\n" + markdown.replace(/^[ ]{0,3}>?[ \t]*$/gm, replacement) + "\n";
        });
    }
    if (chunk.endTag) {
      chunk.endTag = chunk.endTag.replace(/^\n((>|\s)*)\n/,
        function (totalMatch, markdown) {
          return "\n" + markdown.replace(/^[ ]{0,3}>?[ \t]*$/gm, replacement) + "\n";
        });
    }
  };

  if (/^(?![ ]{0,3}>)/m.test(chunk.selection)) {
    this.wrap(chunk, SETTINGS.lineLength - 2);
    chunk.selection = chunk.selection.replace(/^/gm, "> ");
    replaceBlanksInTags(true);
    chunk.skipLines();
  } else {
    chunk.selection = chunk.selection.replace(/^[ ]{0,3}> ?/gm, "");
    this.unwrap(chunk);
    replaceBlanksInTags(false);

    if (!/^(\n|^)[ ]{0,3}>/.test(chunk.selection) && chunk.startTag) {
      chunk.startTag = chunk.startTag.replace(/\n{0,2}$/, "\n\n");
    }

    if (!/(\n|^)[ ]{0,3}>.*$/.test(chunk.selection) && chunk.endTag) {
      chunk.endTag = chunk.endTag.replace(/^\n{0,2}/, "\n\n");
    }
  }

  chunk.selection = this.hooks.postBlockquoteCreation(chunk.selection);

  if (!/\n/.test(chunk.selection)) {
    chunk.selection = chunk.selection.replace(/^(> *)/,
      function (wholeMatch, blanks) {
        chunk.startTag += blanks;
        return "";
      });
  }
};

commandProto.doCode = function (chunk) {

  var hasTextBefore = /\S[ ]*$/.test(chunk.before);
  var hasTextAfter = /^[ ]*\S/.test(chunk.after);

  // Use 'four space' markdown if the selection is on its own
  // line or is multiline.
  if ((!hasTextAfter && !hasTextBefore) || /\n/.test(chunk.selection)) {

    chunk.before = chunk.before.replace(/[ ]{4}$/,
      function (totalMatch) {
        chunk.selection = totalMatch + chunk.selection;
        return "";
      });

    var nLinesBack = 1;
    var nLinesForward = 1;

    if (/(\n|^)(\t|[ ]{4,}).*\n$/.test(chunk.before)) {
      nLinesBack = 0;
    }
    if (/^\n(\t|[ ]{4,})/.test(chunk.after)) {
      nLinesForward = 0;
    }

    chunk.skipLines(nLinesBack, nLinesForward);

    if (!chunk.selection) {
      chunk.startTag = "    ";
      chunk.selection = this.getString("codeexample");
    } else {
      if (/^[ ]{0,3}\S/m.test(chunk.selection)) {
        if (/\n/.test(chunk.selection))
          chunk.selection = chunk.selection.replace(/^/gm, "    ");
        else // if it's not multiline, do not select the four added spaces; this is more consistent with the doList behavior
          chunk.before += "    ";
      } else {
        chunk.selection = chunk.selection.replace(/^(?:[ ]{4}|[ ]{0,3}\t)/gm, "");
      }
    }
  } else {
    // Use backticks (`) to delimit the code block.

    chunk.trimWhitespace();
    chunk.findTags(/`/, /`/);

    if (!chunk.startTag && !chunk.endTag) {
      chunk.startTag = chunk.endTag = "`";
      if (!chunk.selection) {
        chunk.selection = this.getString("codeexample");
      }
    } else if (chunk.endTag && !chunk.startTag) {
      chunk.before += chunk.endTag;
      chunk.endTag = "";
    } else {
      chunk.startTag = chunk.endTag = "";
    }
  }
};

commandProto.doList = function (chunk, postProcessing, isNumberedList, isCheckList) {

  // These are identical except at the very beginning and end.
  // Should probably use the regex extension function to make this clearer.
  var previousItemsRegex = /(\n|^)(([ ]{0,3}([*+-]|\d+[.])[ \t]+.*)(\n.+|\n{2,}([*+-].*|\d+[.])[ \t]+.*|\n{2,}[ \t]+\S.*)*)\n*$/;
  var nextItemsRegex = /^\n*(([ ]{0,3}([*+-]|\d+[.])[ \t]+.*)(\n.+|\n{2,}([*+-].*|\d+[.])[ \t]+.*|\n{2,}[ \t]+\S.*)*)\n*/;

  // The default bullet is a dash but others are possible.
  // This has nothing to do with the particular HTML bullet,
  // it's just a markdown bullet.
  var bullet = "-";

  // The number in a numbered list.
  var num = 1;

  // Get the item prefix - e.g. " 1. " for a numbered list, " - " for a bulleted list.
  var getItemPrefix = function (checkListContent) {
    var prefix;
    if (isNumberedList) {
      prefix = " " + num + ". ";
      num++;
    } else {
      prefix = " " + bullet + " ";
      if (isCheckList) {
        prefix += '[';
        prefix += checkListContent || ' ';
        prefix += '] ';
      }
    }
    return prefix;
  };

  // Fixes the prefixes of the other list items.
  var getPrefixedItem = function (itemText) {

    // The numbering flag is unset when called by autoindent.
    if (isNumberedList === undefined) {
      isNumberedList = /^\s*\d/.test(itemText);
    }

    // Renumber/bullet the list element.
    itemText = itemText.replace(isCheckList
      ? /^[ ]{0,3}([*+-]|\d+[.])\s+\[([ xX])\]\s/gm
      : /^[ ]{0,3}([*+-]|\d+[.])\s/gm,
      function (match, p1, p2) {
        return getItemPrefix(p2);
      });

    return itemText;
  };

  chunk.findTags(/(\n|^)*[ ]{0,3}([*+-]|\d+[.])\s+/, null);

  if (chunk.before && !/\n$/.test(chunk.before) && !/^\n/.test(chunk.startTag)) {
    chunk.before += chunk.startTag;
    chunk.startTag = "";
  }

  if (chunk.startTag) {

    var hasDigits = /\d+[.]/.test(chunk.startTag);
    chunk.startTag = "";
    chunk.selection = chunk.selection.replace(/\n[ ]{4}/g, "\n");
    this.unwrap(chunk);
    chunk.skipLines();

    if (hasDigits) {
      // Have to renumber the bullet points if this is a numbered list.
      chunk.after = chunk.after.replace(nextItemsRegex, getPrefixedItem);
    }
    if (isNumberedList == hasDigits) {
      return;
    }
  }

  var nLinesUp = 1;

  chunk.before = chunk.before.replace(previousItemsRegex,
    function (itemText) {
      if (/^\s*([*+-])/.test(itemText)) {
        bullet = re.$1;
      }
      nLinesUp = /[^\n]\n\n[^\n]/.test(itemText) ? 1 : 0;
      return getPrefixedItem(itemText);
    });

  if (!chunk.selection) {
    chunk.selection = this.getString("litem");
  }

  var prefix = getItemPrefix();

  var nLinesDown = 1;

  chunk.after = chunk.after.replace(nextItemsRegex,
    function (itemText) {
      nLinesDown = /[^\n]\n\n[^\n]/.test(itemText) ? 1 : 0;
      return getPrefixedItem(itemText);
    });

  chunk.trimWhitespace(true);
  chunk.skipLines(nLinesUp, nLinesDown, true);
  chunk.startTag = prefix;
  var spaces = prefix.replace(/./g, " ");
  this.wrap(chunk, SETTINGS.lineLength - spaces.length);
  chunk.selection = chunk.selection.replace(/\n/g, "\n" + spaces);

};

commandProto.doTable = function (chunk) {
  // Credit: https://github.com/fcrespo82/atom-markdown-table-formatter

  var keepFirstAndLastPipes = true,
    /*
                      ( # header capture
                        (?:
                          (?:[^\n]*?\|[^\n]*)       # line w/ at least one pipe
                          \ *                       # maybe trailing whitespace
                        )?                          # maybe header
                        (?:\n|^)                    # newline
                      )
                      ( # format capture
                        (?:
                          \|\ *:?-+:?\ *            # format starting w/pipe
                          |\|?(?:\ *:?-+:?\ *\|)+   # or separated by pipe
                        )
                        (?:\ *:?-+:?\ *)?           # maybe w/o trailing pipe
                        \ *                         # maybe trailing whitespace
                        \n                          # newline
                      )
                      ( # body capture
                        (?:
                          (?:[^\n]*?\|[^\n]*)       # line w/ at least one pipe
                          \ *                       # maybe trailing whitespace
                          (?:\n|$)                  # newline
                        )+ # at least one
                      )
              */
    regex = /((?:(?:[^\n]*?\|[^\n]*) *)?(?:\r?\n|^))((?:\| *:?-+:? *|\|?(?: *:?-+:? *\|)+)(?: *:?-+:? *)? *\r?\n)((?:(?:[^\n]*?\|[^\n]*) *(?:\r?\n|$))+)/;


  function padding(len, str) {
    var result = '';
    str = str || ' ';
    len = Math.floor(len);
    for (var i = 0; i < len; i++) {
      result += str;
    }
    return result;
  }

  function stripTailPipes(str) {
    return str.trim().replace(/(^\||\|$)/g, "");
  }

  function splitCells(str) {
    return str.split('|');
  }

  function addTailPipes(str) {
    if (keepFirstAndLastPipes) {
      return "|" + str + "|";
    } else {
      return str;
    }
  }

  function joinCells(arr) {
    return arr.join('|');
  }

  function formatTable(text, appendNewline) {
    var i, j, len1, ref1, ref2, ref3, k, len2, results, formatline, headerline, just, formatrow, data, line, lines, justify, cell, cells, first, last, ends, columns, content, widths, formatted, front, back;
    formatline = text[2].trim();
    headerline = text[1].trim();
    ref1 = headerline.length === 0 ? [0, text[3]] : [1, text[1] + text[3]], formatrow = ref1[0], data = ref1[1];
    lines = data.trim().split('\n');
    justify = [];
    ref2 = splitCells(stripTailPipes(formatline));
    for (j = 0, len1 = ref2.length; j < len1; j++) {
      cell = ref2[j];
      ref3 = cell.trim(), first = ref3[0], last = ref3[ref3.length - 1];
      switch ((ends = (first ? first : ':') + (last ? last : ''))) {
        case '::':
        case '-:':
        case ':-':
          justify.push(ends);
          break;
        default:
          justify.push('--');
      }
    }
    columns = justify.length;
    content = [];
    for (j = 0, len1 = lines.length; j < len1; j++) {
      line = lines[j];
      cells = splitCells(stripTailPipes(line));
      cells[columns - 1] = joinCells(cells.slice(columns - 1));
      results = [];
      for (k = 0, len2 = cells.length; k < len2; k++) {
        cell = cells[k];
        results.push(padding(' ') + ((ref2 = cell ? typeof cell.trim === "function" ? cell.trim() : void 0 : void 0) ? ref2 : '') + padding(' '));
      }
      content.push(results);
    }
    widths = [];
    for (i = j = 0, ref2 = columns - 1; 0 <= ref2 ? j <= ref2 : j >= ref2; i = 0 <= ref2 ? ++j : --j) {
      results = [];
      for (k = 0, len1 = content.length; k < len1; k++) {
        cells = content[k];
        results.push(cells[i].length);
      }
      widths.push(Math.max.apply(Math, [2].concat(results)));
    }
    just = function (string, col) {
      var back, front, length;
      length = widths[col] - string.length;
      switch (justify[col]) {
        case '::':
          front = padding[0], back = padding[1];
          return padding(length / 2) + string + padding((length + 1) / 2);
        case '-:':
          return padding(length) + string;
        default:
          return string + padding(length);
      }
    };
    formatted = [];
    for (j = 0, len1 = content.length; j < len1; j++) {
      cells = content[j];
      results = [];
      for (i = k = 0, ref2 = columns - 1; 0 <= ref2 ? k <= ref2 : k >= ref2; i = 0 <= ref2 ? ++k : --k) {
        results.push(just(cells[i], i));
      }
      formatted.push(addTailPipes(joinCells(results)));
    }
    formatline = addTailPipes(joinCells((function () {
      var j, ref2, ref3, results;
      results = [];
      for (i = j = 0, ref2 = columns - 1; 0 <= ref2 ? j <= ref2 : j >= ref2; i = 0 <= ref2 ? ++j : --j) {
        ref3 = justify[i], front = ref3[0], back = ref3[1];
        results.push(front + padding(widths[i] - 2, '-') + back);
      }
      return results;
    })()));
    formatted.splice(formatrow, 0, formatline);
    var result = (headerline.length === 0 && text[1] !== '' ? '\n' : '') + formatted.join('\n');
    if (appendNewline !== false) {
      result += '\n'
    }
    return result;
  }

  if (chunk.before.slice(-1) !== '\n') {
    chunk.before += '\n';
  }
  var match = chunk.selection.match(regex);
  if (match) {
    chunk.selection = formatTable(match, chunk.selection.slice(-1) === '\n');
  } else {
    var table = chunk.selection + '|\n-|-\n|';
    match = table.match(regex);
    if (!match || match[0].slice(0, table.length) !== table) {
      return;
    }
    table = formatTable(match);
    var selectionOffset = keepFirstAndLastPipes ? 1 : 0;
    var pipePos = table.indexOf('|', selectionOffset);
    chunk.before += table.slice(0, selectionOffset);
    chunk.selection = table.slice(selectionOffset, pipePos);
    chunk.after = table.slice(pipePos) + chunk.after;
  }
};

commandProto.doHeading = function (chunk) {

  // Remove leading/trailing whitespace and reduce internal spaces to single spaces.
  chunk.selection = chunk.selection.replace(/\s+/g, " ");
  chunk.selection = chunk.selection.replace(/(^\s+|\s+$)/g, "");

  // If we clicked the button with no selected text, we just
  // make a level 2 hash header around some default text.
  if (!chunk.selection) {
    chunk.startTag = "## ";
    chunk.selection = this.getString("headingexample");
    return;
  }

  var headerLevel = 0; // The existing header level of the selected text.

  // Remove any existing hash heading markdown and save the header level.
  chunk.findTags(/#+[ ]*/, /[ ]*#+/);
  if (/#+/.test(chunk.startTag)) {
    headerLevel = re.lastMatch.length;
  }
  chunk.startTag = chunk.endTag = "";

  // Try to get the current header level by looking for - and = in the line
  // below the selection.
  chunk.findTags(null, /\s?(-+|=+)/);
  if (/=+/.test(chunk.endTag)) {
    headerLevel = 1;
  }
  if (/-+/.test(chunk.endTag)) {
    headerLevel = 2;
  }

  // Skip to the next line so we can create the header markdown.
  chunk.startTag = chunk.endTag = "";
  chunk.skipLines(1, 1);

  // We make a level 2 header if there is no current header.
  // If there is a header level, we substract one from the header level.
  // If it's already a level 1 header, it's removed.
  var headerLevelToCreate = headerLevel === 0 ? 2 : headerLevel - 1;

  if (headerLevelToCreate > 0) {

    chunk.startTag = '';
    while (headerLevelToCreate--) {
      chunk.startTag += '#';
    }
    chunk.startTag += ' ';
  }
};

commandProto.doHorizontalRule = function (chunk) {
  chunk.startTag = "----------\n";
  chunk.selection = "";
  chunk.skipLines(2, 1, true);
};

export default function (options) {
  return new Pagedown(options);
};
