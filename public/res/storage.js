// Setup an empty localStorage or upgrade an existing one
define([
    "underscore"
], function(_) {
    
    function retrieveIndexArray(storeIndex) {
        try {
            return _.compact(localStorage[storeIndex].split(";"));
        }
        catch(e) {
            localStorage[storeIndex] = ";";
            return [];
        }
    }

    var fileIndexList = retrieveIndexArray("file.list");
    var currentFileIndex, settings;

    // localStorage versioning
    var version = localStorage.version;

    // Upgrade from v0 to v1
    if(version === undefined) {

        // Not used anymore
        localStorage.removeItem("sync.queue");
        localStorage.removeItem("sync.current");
        localStorage.removeItem("file.counter");

        _.each(fileIndexList, function(fileIndex) {
            localStorage[fileIndex + ".publish"] = ";";
            var syncIndexList = retrieveIndexArray(fileIndex + ".sync");
            _.each(syncIndexList, function(syncIndex) {
                localStorage[syncIndex + ".contentCRC"] = "0";
                // We store title CRC only for Google Drive synchronization
                if(localStorage[syncIndex + ".etag"] !== undefined) {
                    localStorage[syncIndex + ".titleCRC"] = "0";
                }
            });
        });
        version = "v1";
    }

    // Upgrade from v1 to v2
    if(version == "v1") {
        var gdriveLastChangeId = localStorage["sync.gdrive.lastChangeId"];
        if(gdriveLastChangeId) {
            localStorage["gdrive.lastChangeId"] = gdriveLastChangeId;
            localStorage.removeItem("sync.gdrive.lastChangeId");
        }
        var dropboxLastChangeId = localStorage["sync.dropbox.lastChangeId"];
        if(dropboxLastChangeId) {
            localStorage["dropbox.lastChangeId"] = dropboxLastChangeId;
            localStorage.removeItem("sync.dropbox.lastChangeId");
        }

        var PROVIDER_GDRIVE = "gdrive";
        var PROVIDER_DROPBOX = "dropbox";
        var SYNC_PROVIDER_GDRIVE = "sync." + PROVIDER_GDRIVE + ".";
        var SYNC_PROVIDER_DROPBOX = "sync." + PROVIDER_DROPBOX + ".";
        _.each(fileIndexList, function(fileIndex) {
            var syncIndexList = retrieveIndexArray(fileIndex + ".sync");
            _.each(syncIndexList, function(syncIndex) {
                var syncAttributes = {};
                if(syncIndex.indexOf(SYNC_PROVIDER_GDRIVE) === 0) {
                    syncAttributes.provider = PROVIDER_GDRIVE;
                    syncAttributes.id = syncIndex.substring(SYNC_PROVIDER_GDRIVE.length);
                    syncAttributes.etag = localStorage[syncIndex + ".etag"];
                    syncAttributes.contentCRC = localStorage[syncIndex + ".contentCRC"];
                    syncAttributes.titleCRC = localStorage[syncIndex + ".titleCRC"];
                }
                else if(syncIndex.indexOf(SYNC_PROVIDER_DROPBOX) === 0) {
                    syncAttributes.provider = PROVIDER_DROPBOX;
                    syncAttributes.path = decodeURIComponent(syncIndex.substring(SYNC_PROVIDER_DROPBOX.length));
                    syncAttributes.version = localStorage[syncIndex + ".version"];
                    syncAttributes.contentCRC = localStorage[syncIndex + ".contentCRC"];
                }
                localStorage[syncIndex] = JSON.stringify(syncAttributes);
                localStorage.removeItem(syncIndex + ".etag");
                localStorage.removeItem(syncIndex + ".version");
                localStorage.removeItem(syncIndex + ".contentCRC");
                localStorage.removeItem(syncIndex + ".titleCRC");
            });
        });
        version = "v2";
    }

    // Upgrade from v2 to v3
    if(version == "v2") {
        _.each(fileIndexList, function(fileIndex) {
            if(!_.has(localStorage, fileIndex + ".sync")) {
                localStorage.removeItem(fileIndex + ".title");
                localStorage.removeItem(fileIndex + ".publish");
                localStorage.removeItem(fileIndex + ".content");
                localStorage["file.list"].replace(";" + fileIndex + ";", ";");
            }
        });
        version = "v3";
    }

    // Upgrade from v3 to v4
    if(version == "v3") {
        currentFileIndex = localStorage["file.current"];
        if(currentFileIndex !== undefined && localStorage["file.list"].indexOf(";" + currentFileIndex + ";") === -1) {
            localStorage.removeItem("file.current");
        }
        version = "v4";
    }

    // Upgrade from v4 to v5
    if(version == "v4") {
        // Recreate GitHub token
        localStorage.removeItem("githubToken");
        version = "v5";
    }

    // Upgrade from v5 to v6
    if(version == "v5") {
        _.each(fileIndexList, function(fileIndex) {
            var publishIndexList = retrieveIndexArray(fileIndex + ".publish");
            _.each(publishIndexList, function(publishIndex) {
                var publishAttributes = JSON.parse(localStorage[publishIndex]);
                if(publishAttributes.provider == "gdrive") {
                    // Change fileId to Id to be consistent with syncAttributes
                    publishAttributes.id = publishAttributes.fileId;
                    publishAttributes.fileId = undefined;
                    localStorage[publishIndex] = JSON.stringify(publishAttributes);
                }
            });
        });
        version = "v6";
    }

    // Upgrade from v6 to v7
    if(version == "v6") {
        currentFileIndex = localStorage["file.current"];
        if(currentFileIndex !== undefined) {
            localStorage[currentFileIndex + ".selectTime"] = new Date().getTime();
            localStorage.removeItem("file.current");
        }
        version = "v7";
    }

    // Upgrade from v7 to v8
    if(version == "v7") {
        _.each(_.keys(localStorage), function(key) {
            var matchResult = key.match(/(file\.\S+\.)\S+/);
            if(matchResult) {
                if(!_.has(localStorage, matchResult[1] + 'title')) {
                    localStorage.removeItem(key);
                }
            }
        });
        version = "v8";
    }

    // Upgrade from v8 to v9
    if(version == "v8") {
        _.each(_.keys(localStorage), function(key) {
            var matchResult = key.match(/file\.\S+\.(editorEnd|editorStart)/);
            if(matchResult) {
                localStorage.removeItem(key);
            }
        });
        version = "v9";
    }

    // Upgrade from v9 to v10
    if(version == "v9") {
        if(_.has(localStorage, 'settings')) {
            settings = JSON.parse(localStorage.settings);
            delete settings.editorFontFamily;
            delete settings.editorFontSize;
            settings.template && (settings.template = settings.template.replace('http://benweet.github.io/stackedit/css/main-min.css', 'http://benweet.github.io/stackedit/res-min/themes/default.css'));
            localStorage.settings = JSON.stringify(settings);
        }
        version = "v10";
    }

    // Upgrade from v10 to v11
    if(version == "v10") {
        if(_.has(localStorage, 'settings')) {
            settings = JSON.parse(localStorage.settings);
            ((settings.extensionSettings || {}).markdownExtra || {}).extensions && settings.extensionSettings.markdownExtra.extensions.push('smartypants');
            settings.sshProxy == 'http://stackedit-ssh-proxy.herokuapp.com/' && (settings.sshProxy = 'https://stackedit-ssh-proxy.herokuapp.com/');
            settings.template && (settings.template = settings.template.replace('http://benweet.github.io/stackedit/lib/', 'https://stackedit.io/libs/'));
            settings.template && (settings.template = settings.template.replace('http://benweet.github.io/stackedit/', 'https://stackedit.io/'));
            settings.pdfTemplate && (settings.pdfTemplate = settings.pdfTemplate.replace('http://benweet.github.io/stackedit/lib/', 'https://stackedit.io/libs/'));
            settings.pdfTemplate && (settings.pdfTemplate = settings.pdfTemplate.replace('http://benweet.github.io/stackedit/', 'https://stackedit.io/'));
            settings.defaultContent && (settings.defaultContent = settings.defaultContent.replace('http://benweet.github.io/stackedit/', 'https://stackedit.io/'));
            settings.commitMsg && (settings.commitMsg = settings.commitMsg.replace('http://benweet.github.io/stackedit/', 'https://stackedit.io/'));
            localStorage.settings = JSON.stringify(settings);
        }
        version = "v11";
    }

    // Upgrade from v11 to v12
    if(version == "v11") {
        // Force new theme by using themeV3 variable
        localStorage.removeItem("theme");
        if(_.has(localStorage, 'settings')) {
            settings = JSON.parse(localStorage.settings);
            // Force new font
            delete settings.editorFontFamily;
            delete settings.editorFontSize;
            settings.template && (settings.template = settings.template.replace('https://stackedit.io/res-min/themes/default.css', 'https://stackedit.io/res-min/themes/base.css'));
            settings.pdfTemplate && (settings.pdfTemplate = settings.pdfTemplate.replace('https://stackedit.io/res-min/themes/default.css', 'https://stackedit.io/res-min/themes/base.css'));
            localStorage.settings = JSON.stringify(settings);
        }
        version = "v12";
    }

    // Upgrade from v12/v13 to v14
    if(version == "v12" || version == "v13") {
        if(_.has(localStorage, 'settings')) {
            settings = JSON.parse(localStorage.settings);
            // Have to reset the font because of Monaco issue with ACE
            delete settings.editorFontFamily;
            localStorage.settings = JSON.stringify(settings);
        }
        version = "v14";
    }

    // Upgrade from v14 to v15
    if(version == "v14") {
        if(_.has(localStorage, 'settings')) {
            settings = JSON.parse(localStorage.settings);
            settings.template && (settings.template = settings.template.replace('https://stackedit.io/res-min/themes/default.css', 'https://stackedit.io/res-min/themes/base.css'));
            settings.pdfTemplate && (settings.pdfTemplate = settings.pdfTemplate.replace('https://stackedit.io/res-min/themes/default.css', 'https://stackedit.io/res-min/themes/base.css'));
            localStorage.settings = JSON.stringify(settings);
        }
        version = "v15";
    }

    // Upgrade from v15 to v16
    if(version == "v15") {
        localStorage.removeItem('gdrivePermissions');
        if(_.has(localStorage, 'gdrive.lastChangeId')) {
            localStorage['google.gdrive0.gdrive.lastChangeId'] = localStorage['gdrive.lastChangeId'];
            localStorage.removeItem('gdrive.lastChangeId');
        }
        if(_.has(localStorage, 'settings')) {
            settings = JSON.parse(localStorage.settings);
            if(((settings.extensionSettings || {}).markdownExtra || {}).extensions) {
                settings.extensionSettings.markdownExtra.extensions.push('newlines');
                settings.extensionSettings.markdownExtra.extensions.push('strikethrough');
            }
            localStorage.settings = JSON.stringify(settings);
        }
        version = "v16";
    }

    // Upgrade from v16 to v17
    if(version == "v16") {
        _.each(_.keys(localStorage), function(key) {
            var matchResult = key.match(/(file\.\S+\.)\S+/);
            if(matchResult) {
                if(!_.has(localStorage, matchResult[1] + 'title')) {
                    localStorage.removeItem(key);
                }
            }
        });
        version = "v17";
    }
    
    localStorage.version = version;
    return localStorage;
});