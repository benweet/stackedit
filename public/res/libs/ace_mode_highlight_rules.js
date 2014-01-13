/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2010, Ajax.org B.V.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***** END LICENSE BLOCK ***** */

define(function(require, exports, module) {
"use strict";

var oop = require("ace/lib/oop");
var TextHighlightRules = require("ace/mode/text_highlight_rules").TextHighlightRules;
var HtmlHighlightRules = require("ace/mode/html_highlight_rules").HtmlHighlightRules;

var MarkdownHighlightRules = function() {
    HtmlHighlightRules.call(this);

    // regexp must not have capturing parentheses
    // regexps are ordered -> the first match is used
    this.$rules["start"].unshift({
        token : "empty_line",
        regex : '^$',
        next: "allowBlock"
    }, { // h1
        token: "markup.heading.multi.1",
        regex: "^=+(?=\\s*$)"
    }, { // h2
        token: "markup.heading.multi.2",
        regex: "^\\-+(?=\\s*$)"
    }, {
        token : function(value) {
            return "markup.heading." + value.length;
        },
        regex : /^#{1,6}(?=\s*[^ #]|\s+#.)/,
        next : "header"
    },
    { // Github style block
        token : "constant.language.escape",
        regex : "^```\\s*[a-zA-Z]*(?:{.*?\\})?\\s*$",
        next  : "githubblock"
    }, { // block quote
        token : ["constant.language.escape", "blockquote"],
        regex : "(^\\s*>\\s*(?:[*+-]|\\d+\\.)?)(\\s+)",
        next  : "blockquote"
    }, { // HR * - _
        token : "constant",
        regex : "^ {0,2}(?:(?: ?\\* ?){3,}|(?: ?\\- ?){3,}|(?: ?\\_ ?){3,})\\s*$",
        next: "allowBlock"
    }, { // list
        token : ["constant.language.escape", "markup.list"],
        regex : "(^\\s{0,3}(?:[*+-]|\\d+\\.))(\\s+)",
        next  : "listblock-start"
    }, { // Math block
        token : "constant.language.escape",
        regex : "\\$\\$|\\\\\\\\\\[|\\\\\\\\\\\\\\\\\\(",
        next  : "mathblock"
    }, { // LaTeX block
        token : ["keyword", "text"],
        regex : "(\\\\?\\\\begin)(\\{[a-z]*\\*?\\})",
        next  : "latexblock"
    }, {
        include : "basic"
    });

    this.addRules({
        "basic" : [{
            token : "constant.language.escape",
            regex : /\\[\\`*_{}\[\]()#+\-.!]/
        }, { // Escaped $
            token : "text",
            regex : "\\\\\\$",
        }, { // Math inline
            token : ["constant.language.escape", "keyword", "constant.language.escape"],
            regex : "(\\$)(.*?)(\\$)"
        }, { // code span `
            token : ["constant.language.escape", "code", "constant.language.escape"],
            regex : "(`+)(.*?[^`])(\\1)"
        }, { // reference
            token : ["constant.language.escape", "reference", "constant.language.escape", "link", "description", "constant.language.escape"],
            regex : "^([ ]{0,3}\\[)([^\\]]+)(\\]:\\s*)([^ ]+)(\\s*(?:[\"][^\"]+[\"])?(\\s*))$"
        }, { // link by reference
            token : ["constant.language.escape", "markup.underline", "constant.language.escape", "reference", "constant.language.escape"],
            regex : "(\\[)((?:[[^\\]]*\\]|[^\\[\\]])*)(\\][ ]?(?:\\n[ ]*)?\\[)(.*?)(\\])"
        }, { // link by url
            token : ["constant.language.escape", "markup.underline", "constant.language.escape", "link", "description", "constant.language.escape"],
            regex : "(\\[)"+
                    "(\\[[^\\]]*\\]|[^\\[\\]]*)"+
                    "(\\]\\([ \\t]*)"+
                    "(<?(?:(?:[^\\(]*?\\([^\\)]*?\\)\\S*?)|(?:.*?))>?)"+
                    "((?:[ \t]*\"(?:.*?)\"[ \\t]*)?)"+
                    "(\\))"
        }, { // strong ** __
            token : ["constant.language.escape", "strong", "constant.language.escape"],
            regex : "([*]{2}|[_]{2}(?=\\S))(.*?\\S[*_]*)(\\1)"
        }, { // emphasis * _
            token : ["constant.language.escape", "emphasis", "constant.language.escape"],
            regex : "([*]|[_](?=\\S))(.*?\\S[*_]*)(\\1)"
        }, { //
            token : ["text", "url", "text"],
            regex : "(<)("+
                      "(?:https?|ftp|dict):[^'\">\\s]+"+
                      "|"+
                      "(?:mailto:)?[-.\\w]+\\@[-a-z0-9]+(?:\\.[-a-z0-9]+)*\\.[a-z]+"+
                    ")(>)"
        }],

        // code block
        "allowBlock": [
            {token : ["text", "code_block"], regex : "^( {4}|\\t)(.+)", next : "allowBlock"},
            {token : "empty", regex : "", next : "start"}
        ],

        "header" : [{
            regex: "$",
            next : "start"
        }, {
            include: "basic"
        }, {
            defaultToken : "markup.heading"
        } ],

        "listblock-start" : [{
            token : "checkbox",
            regex : /(?:\[[ x]\])?/,
            next  : "listblock"
        }],

        "listblock" : [ { // Lists only escape on completely blank lines.
            token : "empty_line",
            regex : "^$",
            next  : "start"
        }, { // list
            token : ["constant.language.escape", "markup.list"],
            regex : "(^\\s{0,3}(?:[*+-]|\\d+\\.))(\\s+)",
            next  : "listblock-start"
        }, {
            include : "basic", noEscape: true
        }, {
            defaultToken : "markup.list"
        } ],

        "blockquote" : [ { // BLockquotes only escape on blank lines.
            token : "empty_line",
            regex : "^\\s*$",
            next  : "start"
        }, { // block quote
            token : ["constant.language.escape", "blockquote"],
            regex : "(^\\s*>\\s*(?:[*+-]|\\d+\\.)?)(\\s+)",
            next  : "blockquote"
        }, {
            include : "basic", noEscape: true
        }, {
            defaultToken : "blockquote"
        } ],

        "githubblock" : [ {
            token : "constant.language.escape",
            regex : "^```",
            next  : "start"
        }, {
            token : "code_block",
            regex : ".+"
        } ],

        "mathblock" : [ {
            token : "constant.language.escape",
            regex : "\\$\\$|\\\\\\\\\\]|\\\\\\\\\\\\\\\\\\)",
            next  : "start"
        }, {
            include : "latex"
        } ],

        "latexblock" : [{
            token : ["keyword", "text"],
            regex : "(\\\\?\\\\end)(\\{[a-z]*\\*?\\})",
            next  : "start"
        }, {
            include : "latex"
        }],
        
        "latex" : [{
            // A tex command e.g. \foo
            token : "keyword",
            regex : "\\\\(?:[^a-zA-Z]|[a-zA-Z]+)"
        }, {
            // Curly and square braces
            token : "lparen",
            regex : "[[({]"
        }, {
            // Curly and square braces
            token : "rparen",
            regex : "[\\])}]"
        }, {
            // A comment. Tex comments start with % and go to 
            // the end of the line
            token : "comment",
            regex : "%.*$"
        }]
    });

    this.normalizeRules();
};
oop.inherits(MarkdownHighlightRules, TextHighlightRules);

exports.MarkdownHighlightRules = MarkdownHighlightRules;
});
