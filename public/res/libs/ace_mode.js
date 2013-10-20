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
var TextMode = require("ace/mode/text").Mode;
var Tokenizer = require("ace/tokenizer").Tokenizer;
var MarkdownHighlightRules = require("./ace_mode_highlight_rules").MarkdownHighlightRules;
var MarkdownFoldMode = require("ace/mode/folding/markdown").FoldMode;
var eventMgr = require('eventMgr');
var Range = require('ace/range').Range
var editor = undefined;
eventMgr.addListener('onAceCreated', function(editorParam) {
    editor = editorParam;
});

var Mode = function() {
    var highlighter = new MarkdownHighlightRules();
    
    this.$tokenizer = new Tokenizer(highlighter.getRules());
    this.$embeds = highlighter.getEmbeds();
    
    //this.foldingRules = new MarkdownFoldMode();
};
oop.inherits(Mode, TextMode);

var isIndentingList = false;

(function() {
    this.type = "text";
    this.lineCommentStart = ">";
    
    this.getNextLineIndent = function(state, line, tab) {
        if(isIndentingList === true && (state == "listblock" || state == "listblock-start") && /^\s*(?:[-+*]|\d+\.)\s+$/.test(line)) {
            // When hitting enter twice in a listblock, remove the previous line
            var rows = editor.$getSelectedRows();
            if (rows.last > 1) {
                var range = new Range(
                    rows.last - 2, editor.session.getLine(rows.last - 2).length,
                    rows.last - 1, editor.session.getLine(rows.last - 1).length);
                var previousLine = editor.session.getTextRange(range);
                if(/^\s*(?:[-+*]|\d+\.)\s+$/.test(previousLine)) {
                    editor.session.remove(range);
                }
            }
            isIndentingList = false;
            return this.$getIndent(line);
        }
        isIndentingList = false;
        if (state == "listblock") {
            var match = /^(\s*)(?:([-+*])|(\d+)\.)(\s+)/.exec(line);
            if (!match)
                return "";
            var marker = match[2];
            if (!marker)
                marker = parseInt(match[3], 10) + 1 + ".";
            isIndentingList = true;
            return match[1] + marker + match[4];
        } else {
            return this.$getIndent(line);
        }
    };
    
}).call(Mode.prototype);

exports.Mode = Mode;
});
