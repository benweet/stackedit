// Setup an empty localStorage or upgrade an existing one
define([
    "underscore",
    "utils"
], function(_, utils) {

    var fileIndexList = utils.retrieveIndexArray("file.list");

    // localStorage versioning
    var version = localStorage["version"];

    // Upgrade from v0 to v1
    if(version === undefined) {

        // Not used anymore
        localStorage.removeItem("sync.queue");
        localStorage.removeItem("sync.current");
        localStorage.removeItem("file.counter");

        _.each(fileIndexList, function(fileIndex) {
            localStorage[fileIndex + ".publish"] = ";";
            var syncIndexList = utils.retrieveIndexArray(fileIndex + ".sync");
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
            var syncIndexList = utils.retrieveIndexArray(fileIndex + ".sync");
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
                utils.removeIndexFromArray("file.list", fileIndex);
            }
        });
        version = "v3";
    }

    // Upgrade from v3 to v4
    if(version == "v3") {
        var currentFileIndex = localStorage["file.current"];
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
            var publishIndexList = utils.retrieveIndexArray(fileIndex + ".publish");
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
        var currentFileIndex = localStorage["file.current"];
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

    localStorage["version"] = version;
});