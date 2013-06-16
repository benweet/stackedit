define([
    "jquery",
    "underscore",
    "core",
    "utils",
    "settings",
    "extensionMgr",
    "fileSystem",
    "classes/FileDescriptor",
    "text!../WELCOME.md"
], function($, _, core, utils, settings, extensionMgr, fileSystem, FileDescriptor, welcomeContent) {

    var fileMgr = {};

    // Defines the current file
    var currentFile = undefined;
    fileMgr.getCurrentFile = function() {
        return currentFile;
    };
    fileMgr.isCurrentFile = function(fileDesc) {
        return fileDesc === currentFile;
    };
    fileMgr.setCurrentFile = function(fileDesc) {
        currentFile = fileDesc;
    };

    fileMgr.selectFile = function(fileDesc) {
        fileDesc = fileDesc || fileMgr.getCurrentFile();

        if(fileDesc === undefined) {
            var fileSystemSize = _.size(fileSystem);
            if(fileSystemSize === 0) {
                // If fileSystem empty create one file
                fileDesc = fileMgr.createFile(WELCOME_DOCUMENT_TITLE, welcomeContent);
            }
            else {
                // Select the last selected file
                fileDesc = _.max(fileSystem, function(fileDesc) {
                    return fileDesc.selectTime || 0;
                });
            }
        }

        if(fileMgr.isCurrentFile(fileDesc) === false) {
            fileMgr.setCurrentFile(fileDesc);
            fileDesc.selectTime = new Date().getTime();

            // Notify extensions
            extensionMgr.onFileSelected(fileDesc);

            // Hide the viewer pencil button
            if(fileDesc.fileIndex == TEMPORARY_FILE_INDEX) {
                $(".action-edit-document").removeClass("hide");
            }
            else {
                $(".action-edit-document").addClass("hide");
            }
        }

        // Refresh the editor
        core.createEditor(fileDesc);
    };

    fileMgr.createFile = function(title, content, syncLocations, isTemporary) {
        content = content !== undefined ? content : settings.defaultContent;
        if(!title) {
            // Create a file title
            title = DEFAULT_FILE_TITLE;
            var indicator = 2;
            while (_.some(fileSystem, function(fileDesc) {
                return fileDesc.title == title;
            })) {
                title = DEFAULT_FILE_TITLE + indicator++;
            }
        }

        // Generate a unique fileIndex
        var fileIndex = TEMPORARY_FILE_INDEX;
        if(!isTemporary) {
            do {
                fileIndex = "file." + utils.randomString();
            } while (_.has(fileSystem, fileIndex));
        }

        // syncIndex associations
        syncLocations = syncLocations || {};
        var sync = _.reduce(syncLocations, function(sync, syncAttributes) {
            utils.storeAttributes(syncAttributes);
            return sync + syncAttributes.syncIndex + ";";
        }, ";");

        localStorage[fileIndex + ".title"] = title;
        localStorage[fileIndex + ".content"] = content;
        localStorage[fileIndex + ".sync"] = sync;
        localStorage[fileIndex + ".publish"] = ";";

        // Create the file descriptor
        var fileDesc = new FileDescriptor(fileIndex, title, syncLocations);

        // Add the index to the file list
        if(!isTemporary) {
            utils.appendIndexToArray("file.list", fileIndex);
            fileSystem[fileIndex] = fileDesc;
            extensionMgr.onFileCreated(fileDesc);
        }
        return fileDesc;
    };

    fileMgr.deleteFile = function(fileDesc) {
        fileDesc = fileDesc || fileMgr.getCurrentFile();

        // Remove the index from the file list
        utils.removeIndexFromArray("file.list", fileDesc.fileIndex);
        delete fileSystem[fileDesc.fileIndex];

        if(fileMgr.isCurrentFile(fileDesc) === true) {
            // Unset the current fileDesc
            fileMgr.setCurrentFile();
            // Refresh the editor with another file
            fileMgr.selectFile();
        }

        // Remove synchronized locations from localStorage
        _.each(fileDesc.syncLocations, function(syncAttributes) {
            localStorage.removeItem(syncAttributes.syncIndex);
        });

        // Remove publish locations from localStorage
        _.each(fileDesc.publishLocations, function(publishAttributes) {
            localStorage.removeItem(publishAttributes.publishIndex);
        });

        localStorage.removeItem(fileDesc.fileIndex + ".title");
        localStorage.removeItem(fileDesc.fileIndex + ".content");
        localStorage.removeItem(fileDesc.fileIndex + ".sync");
        localStorage.removeItem(fileDesc.fileIndex + ".publish");

        extensionMgr.onFileDeleted(fileDesc);
    };

    // Get the file descriptor associated to a syncIndex
    fileMgr.getFileFromSyncIndex = function(syncIndex) {
        return _.find(fileSystem, function(fileDesc) {
            return _.has(fileDesc.syncLocations, syncIndex);
        });
    };

    // Get syncAttributes from syncIndex
    fileMgr.getSyncAttributes = function(syncIndex) {
        var fileDesc = fileMgr.getFileFromSyncIndex(syncIndex);
        return fileDesc && fileDesc.syncLocations[syncIndex];
    };

    // Returns true if provider has locations to synchronize
    fileMgr.hasSync = function(provider) {
        return _.some(fileSystem, function(fileDesc) {
            return _.some(fileDesc.syncLocations, function(syncAttributes) {
                return syncAttributes.provider === provider;
            });
        });
    };

    // Get the file descriptor associated to a publishIndex
    fileMgr.getFileFromPublishIndex = function(publishIndex) {
        return _.find(fileSystem, function(fileDesc) {
            return _.has(fileDesc.publishLocations, publishIndex);
        });
    };

    core.onReady(function() {

        fileMgr.selectFile();

        $(".action-create-file").click(function() {
            var fileDesc = fileMgr.createFile();
            fileMgr.selectFile(fileDesc);
            var wmdInput = $("#wmd-input").focus().get(0);
            if(wmdInput.setSelectionRange) {
                wmdInput.setSelectionRange(0, 0);
            }
            $("#file-title").click();
        });
        $(".action-remove-file").click(function() {
            fileMgr.deleteFile();
        });
        $("#file-title").click(function() {
            if(viewerMode === true) {
                return;
            }
            $(this).hide();
            var fileTitleInput = $("#file-title-input").show();
            _.defer(function() {
                fileTitleInput.focus().get(0).select();
            });
        });
        function applyTitle(input) {
            input.hide();
            $("#file-title").show();
            var title = $.trim(input.val());
            var fileDesc = fileMgr.getCurrentFile();
            if(title && title != fileDesc.title) {
                fileDesc.title = title;
                extensionMgr.onTitleChanged(fileDesc);
            }
            input.val(fileDesc.title);
            $("#wmd-input").focus();
        }
        $("#file-title-input").blur(function() {
            applyTitle($(this));
        }).keyup(function(e) {
            if(e.keyCode == 13) {
                applyTitle($(this));
            }
            if(e.keyCode == 27) {
                $(this).val("");
                applyTitle($(this));
            }
        });
        $(".action-open-stackedit").click(function() {
            window.location.href = ".";
        });
        $(".action-edit-document").click(function() {
            var content = $("#wmd-input").val();
            var title = fileMgr.getCurrentFile().title;
            var fileDesc = fileMgr.createFile(title, content);
            fileMgr.selectFile(fileDesc);
            window.location.href = ".";
        });
        $(".action-welcome-file").click(function() {
            var fileDesc = fileMgr.createFile(WELCOME_DOCUMENT_TITLE, welcomeContent);
            fileMgr.selectFile(fileDesc);
        });
    });

    extensionMgr.onFileMgrCreated(fileMgr);
    return fileMgr;
});
