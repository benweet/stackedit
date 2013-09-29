define([
    "underscore",
    "eventMgr",
    "settings",
    ], function(_, eventMgr, settings) {

    var shortcutMgr = {};
    
    var shortcuts = {
        'bold': {
            title: 'Strong',
            defaults: {
                win: 'Ctrl-B',
                mac: 'Command-B|Ctrl-B',
            },
            isPageDown: true
        },
        'italic': {
            title: 'Emphasis',
            defaults: {
                win: 'Ctrl-I',
                mac: 'Command-I|Ctrl-I',
            },
            isPageDown: true
        },
        'link': {
            title: 'Hyperlink',
            defaults: {
                win: 'Ctrl-L',
                mac: 'Command-L|Ctrl-L',
            },
            isPageDown: true
        },
        'quote': {
            title: 'Blockquote',
            defaults: {
                win: 'Ctrl-Q',
                mac: 'Command-Q|Ctrl-Q',
            },
            isPageDown: true
        },
        'code': {
            title: 'Code Sample',
            defaults: {
                win: 'Ctrl-K',
                mac: 'Command-K|Ctrl-K',
            },
            isPageDown: true
        },
        'image': {
            title: 'Image',
            defaults: {
                win: 'Ctrl-G',
                mac: 'Command-G|Ctrl-G',
            },
            isPageDown: true
        },
        'olist': {
            title: 'Numbered List',
            defaults: {
                win: 'Ctrl-O',
                mac: 'Command-O|Ctrl-O',
            },
            isPageDown: true
        },
        'ulist': {
            title: 'Bulleted List',
            defaults: {
                win: 'Ctrl-U',
                mac: 'Command-U|Ctrl-U',
            },
            isPageDown: true
        },
        'heading': {
            title: 'Heading',
            defaults: {
                win: 'Ctrl-H',
                mac: 'Command-H|Ctrl-H',
            },
            isPageDown: true
        },
        'hr': {
            title: 'Horizontal Rule',
            defaults: {
                win: 'Ctrl-R',
                mac: 'Command-R|Ctrl-R',
            },
            isPageDown: true
        },
        'undo': {
            title: 'Undo',
            defaults: {
                win: 'Ctrl-Z',
                mac: 'Command-Z',
            },
            exec: function(editor) {
                editor.undo();
            },
            isPageDown: true
        },
        'redo': {
            title: 'Redo',
            defaults: {
                win: 'Ctrl-Shift-Z|Ctrl-Y',
                mac: 'Command-Shift-Z|Command-Y',
            },
            exec: function(editor) {
                editor.redo();
            },
            isPageDown: true
        },
        'selectall': {
            title: 'Select All',
            defaults: {
                win: 'Ctrl-A',
                mac: 'Command-A',
            },
            exec: function(editor) {
                editor.selectAll();
            },
            readOnly: true
        },
        'removeline': {
            title: 'Remove Line',
            defaults: {
                win: 'Ctrl-D',
                mac: 'Command-D',
            },
            exec: function(editor) {
                editor.removeLines();
            },
            multiSelectAction: "forEachLine"
        },
        'duplicateSelection': {
            title: 'Duplicate Selection',
            defaults: {
                win: 'Ctrl-Shift-D',
                mac: 'Command-Shift-D',
            },
            exec: function(editor) {
                editor.duplicateSelection();
            },
            multiSelectAction: "forEach"
        },
        'sortlines': {
            title: 'Sort Lines',
            defaults: {
                win: 'Ctrl-Alt-S',
                mac: 'Command-Alt-S',
            },
            exec: function(editor) {
                editor.sortLines();
            },
            multiSelectAction: "forEachLine"
        },
        'indent': {
            title: 'Sort Lines',
            defaults: {
                win: 'Ctrl-Alt-S',
                mac: 'Command-Alt-S',
            },
            exec: function(editor) {
                editor.sortLines();
            },
            multiSelectAction: "forEachLine"
        },
        'modifyNumberUp': {
            title: 'Number Up',
            defaults: {
                win: 'Ctrl-Shift-Up',
                mac: 'Alt-Shift-Up',
            },
            exec: function(editor) {
                editor.modifyNumber(1);
            },
            multiSelectAction: "forEach"
        },
        'modifyNumberDown': {
            title: 'Number Down',
            defaults: {
                win: 'Ctrl-Shift-Down',
                mac: 'Alt-Shift-Down',
            },
            exec: function(editor) {
                editor.modifyNumber(-1);
            },
            multiSelectAction: "forEach"
        },
        'find': {
            title: 'Find',
            defaults: {
                win: 'Ctrl-F',
                mac: 'Command-F',
            },
            exec: function(editor) {
                var config = require("ace/config");
                config.loadModule("ace/ext/searchbox", function(e) {
                    e.Search(editor)
                });
            },
            readOnly: true
        },
        'replace': {
            title: 'Replace',
            defaults: {
                win: 'Ctrl-Shift-F',
                mac: 'Command-Option-F',
            },
            exec: function(editor) {
                var config = require("ace/config");
                config.loadModule("ace/ext/searchbox", function(e) {e.Search(editor, true)});
            },
            readOnly: true
        },
        'togglerecording': {
            title: 'Toggle Recording',
            defaults: {
                win: 'Ctrl-Alt-E',
                mac: 'Command-Option-E',
            },
            exec: function(editor) {
                editor.commands.toggleRecording(editor);
            },
            readOnly: true
        },
        'replaymacro': {
            title: 'Replay Macro',
            defaults: {
                win: 'Ctrl-Shift-E',
                mac: 'Command-Shift-E',
            },
            exec: function(editor) {
                editor.commands.replay(editor);
            },
            readOnly: true
        },
    };
    
    _.each(shortcuts, function(shortcut, key) {
        shortcut.values = settings.shortcuts[key] || shortcut.defaults;
    });

    shortcutMgr.configureAce = function() {
        
    };

    return shortcutMgr;
});