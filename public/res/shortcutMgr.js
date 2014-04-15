define([
    "underscore",
    "eventMgr",
    "settings",
    "utils",
    "text!html/settingsShortcutEntry.html",
], function(_, eventMgr, settings, utils, settingsShortcutEntryHTML) {

    var shortcutMgr = {};

    var shortcuts = {
        'bold': {
            title: 'Strong',
            defaultKey: {
                win: 'Ctrl-B',
                mac: 'Command-B|Ctrl-B',
            },
        },
        'italic': {
            title: 'Emphasis',
            defaultKey: {
                win: 'Ctrl-I',
                mac: 'Command-I|Ctrl-I',
            },
        },
        'link': {
            title: 'Hyperlink',
            defaultKey: {
                win: 'Ctrl-L',
                mac: 'Command-L|Ctrl-L',
            },
        },
        'quote': {
            title: 'Blockquote',
            defaultKey: {
                win: 'Ctrl-Q',
                mac: 'Command-Q|Ctrl-Q',
            },
        },
        'code': {
            title: 'Code Sample',
            defaultKey: {
                win: 'Ctrl-K',
                mac: 'Command-K|Ctrl-K',
            },
        },
        'image': {
            title: 'Image',
            defaultKey: {
                win: 'Ctrl-G',
                mac: 'Command-G|Ctrl-G',
            },
        },
        'olist': {
            title: 'Numbered List',
            defaultKey: {
                win: 'Ctrl-O',
                mac: 'Command-O|Ctrl-O',
            },
        },
        'ulist': {
            title: 'Bulleted List',
            defaultKey: {
                win: 'Ctrl-U',
                mac: 'Command-U|Ctrl-U',
            },
        },
        'heading': {
            title: 'Heading',
            defaultKey: {
                win: 'Ctrl-H',
                mac: 'Command-H|Ctrl-H',
            },
        },
        'hr': {
            title: 'Horizontal Rule',
            defaultKey: {
                win: 'Ctrl-R',
                mac: 'Command-R|Ctrl-R',
            },
        },
        'undo': {
            title: 'Undo',
            defaultKey: {
                win: 'Ctrl-Z',
                mac: 'Command-Z',
            },
        },
        'redo': {
            title: 'Redo',
            defaultKey: {
                win: 'Ctrl-Y|Ctrl-Shift-Z',
                mac: 'Command-Y|Command-Shift-Z',
            },
        },
    };

    _.each(shortcuts, function(shortcut, key) {
        shortcut.name = key;
        shortcut.bindKey = settings.shortcuts[key] || shortcut.defaultKey;
    });

    shortcutMgr.getPagedownKeyStrokes = function() {
        return _.chain(shortcuts).where({
            isPageDown: true
        }).map(function(shortcut) {
            return [shortcut.name, shortcut.bindKey];
        }).object().value();
    };

    shortcutMgr.addSettingEntries = function() {
        var shortcutEntries = _.reduce(shortcuts, function(result, shortcut) {
            return result + _.template(settingsShortcutEntryHTML, {
                shortcut: shortcut
            });
        }, '');
        var settingsFormElement = document.querySelector('#tabpane-settings-shortcuts .form-horizontal');
        settingsFormElement && (settingsFormElement.innerHTML = shortcutEntries);
    };

    shortcutMgr.loadSettings = function() {
        _.each(shortcuts, function(shortcut) {
            utils.setInputValue("#input-settings-shortcut-" + shortcut.name, shortcut.bindKey.win);
            utils.setInputValue("#input-settings-shortcut-" + shortcut.name + '-mac', shortcut.bindKey.mac);
        });
    };

    shortcutMgr.saveSettings = function(newSettings) {
        newSettings.shortcuts = {};
        _.each(shortcuts, function(shortcut, key) {
            var newShortcut = {};
            newShortcut.win = utils.getInputValue("#input-settings-shortcut-" + shortcut.name);
            newShortcut.mac = utils.getInputValue("#input-settings-shortcut-" + shortcut.name + '-mac');
            newSettings.shortcuts[key] = newShortcut;
        });
    };

    return shortcutMgr;
});
