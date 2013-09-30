define([
    "underscore",
    "eventMgr",
    "settings",
    ], function(_, eventMgr, settings) {

    var shortcutMgr = {};

    var shortcuts = {
        'bold': {
            title: 'Strong',
            defaultKey: {
                win: 'Ctrl-B',
                mac: 'Command-B|Ctrl-B',
            },
            isPageDown: true
        },
        'italic': {
            name: 'Emphasis',
            defaultKey: {
                win: 'Ctrl-I',
                mac: 'Command-I|Ctrl-I',
            },
            isPageDown: true
        },
        'link': {
            name: 'Hyperlink',
            defaultKey: {
                win: 'Ctrl-L',
                mac: 'Command-L|Ctrl-L',
            },
            isPageDown: true
        },
        'quote': {
            name: 'Blockquote',
            defaultKey: {
                win: 'Ctrl-Q',
                mac: 'Command-Q|Ctrl-Q',
            },
            isPageDown: true
        },
        'code': {
            name: 'Code Sample',
            defaultKey: {
                win: 'Ctrl-K',
                mac: 'Command-K|Ctrl-K',
            },
            isPageDown: true
        },
        'image': {
            name: 'Image',
            defaultKey: {
                win: 'Ctrl-G',
                mac: 'Command-G|Ctrl-G',
            },
            isPageDown: true
        },
        'olist': {
            name: 'Numbered List',
            defaultKey: {
                win: 'Ctrl-O',
                mac: 'Command-O|Ctrl-O',
            },
            isPageDown: true
        },
        'ulist': {
            name: 'Bulleted List',
            defaultKey: {
                win: 'Ctrl-U',
                mac: 'Command-U|Ctrl-U',
            },
            isPageDown: true
        },
        'heading': {
            name: 'Heading',
            defaultKey: {
                win: 'Ctrl-H',
                mac: 'Command-H|Ctrl-H',
            },
            isPageDown: true
        },
        'hr': {
            name: 'Horizontal Rule',
            defaultKey: {
                win: 'Ctrl-R',
                mac: 'Command-R|Ctrl-R',
            },
            isPageDown: true
        },
        'undo': {
            name: 'Undo',
            defaultKey: {
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
            defaultKey: {
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
            defaultKey: {
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
            defaultKey: {
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
            defaultKey: {
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
            defaultKey: {
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
            defaultKey: {
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
            defaultKey: {
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
            defaultKey: {
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
            defaultKey: {
                win: 'Ctrl-F',
                mac: 'Command-F',
            },
            exec: function(editor) {
                var config = require("ace/config");
                config.loadModule("ace/ext/searchbox", function(e) {
                    e.Search(editor);
                });
            },
            readOnly: true
        },
        'replace': {
            title: 'Replace',
            defaultKey: {
                win: 'Ctrl-Shift-F',
                mac: 'Command-Option-F',
            },
            exec: function(editor) {
                var config = require("ace/config");
                config.loadModule("ace/ext/searchbox", function(e) {
                    e.Search(editor, true);
                });
            },
            readOnly: true
        },
        'togglerecording': {
            title: 'Toggle Recording',
            defaultKey: {
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
            defaultKey: {
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
        shortcut.name = key;
        shortcut.bindKey = settings.shortcuts[key] || shortcut.defaultKey;
    });

    shortcutMgr.configureAce = function(aceEditor) {
        _.each(shortcuts, function(shortcut) {
            shortcut.exec && aceEditor.commands.addCommand(_.pick(shortcut, 'name', 'bindKey', 'exec', 'readOnly', 'multiSelectAction'));
        });
    };

    return shortcutMgr;
});