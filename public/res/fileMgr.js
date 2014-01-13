define([
    "jquery",
    "underscore",
    "constants",
    "core",
    "utils",
    "storage",
    "settings",
    "eventMgr",
    "fileSystem",
    "classes/FileDescriptor",
    "text!WELCOME.md"
], function($, _, constants, core, utils, storage, settings, eventMgr, fileSystem, FileDescriptor, welcomeContent) {

    var fileMgr = {};

    // Defines the current file
    fileMgr.currentFile = undefined;

    // Set the current file and refresh the editor
    fileMgr.selectFile = function(fileDesc) {
        fileDesc = fileDesc || fileMgr.currentFile;

        if(fileDesc === undefined) {
            var fileSystemSize = _.size(fileSystem);
            if(fileSystemSize === 0) {
                // If fileSystem empty create one file
                fileDesc = fileMgr.createFile(constants.WELCOME_DOCUMENT_TITLE, welcomeContent);
            }
            else {
                // Select the last selected file
                fileDesc = _.max(fileSystem, function(fileDesc) {
                    return fileDesc.selectTime || 0;
                });
            }
        }

        if(fileMgr.currentFile !== fileDesc) {
            fileMgr.currentFile = fileDesc;
            fileDesc.selectTime = new Date().getTime();

            // Notify extensions
            eventMgr.onFileSelected(fileDesc);

            // Hide the viewer pencil button
            $(".action-edit-document").toggleClass("hide", fileDesc.fileIndex != constants.TEMPORARY_FILE_INDEX);
        }

        // Refresh the editor (even if it's the same file)
        core.initEditor(fileDesc);
    };

    fileMgr.createFile = function(title, content, syncLocations, isTemporary) {
        content = content !== undefined ? content : settings.defaultContent;
        if(!title) {
            // Create a file title
            title = constants.DEFAULT_FILE_TITLE;
            var indicator = 2;
            var checkTitle = function (fileDesc) {
                return fileDesc.title == title;
            };
            while (_.some(fileSystem, checkTitle)) {
                title = constants.DEFAULT_FILE_TITLE + indicator++;
            }
        }

        // Generate a unique fileIndex
        var fileIndex = constants.TEMPORARY_FILE_INDEX;
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

        storage[fileIndex + ".title"] = title;
        storage[fileIndex + ".content"] = content;
        storage[fileIndex + ".sync"] = sync;
        storage[fileIndex + ".publish"] = ";";

        // Create the file descriptor
        var fileDesc = new FileDescriptor(fileIndex, title, syncLocations);

        // Add the index to the file list
        if(!isTemporary) {
            utils.appendIndexToArray("file.list", fileIndex);
            fileSystem[fileIndex] = fileDesc;
            eventMgr.onFileCreated(fileDesc);
        }
        return fileDesc;
    };

    fileMgr.deleteFile = function(fileDesc) {
        fileDesc = fileDesc || fileMgr.currentFile;
        
        // Unassociate file from folder
        if(fileDesc.folder) {
            fileDesc.folder.removeFile(fileDesc);
            eventMgr.onFoldersChanged();
        }

        // Remove the index from the file list
        utils.removeIndexFromArray("file.list", fileDesc.fileIndex);
        delete fileSystem[fileDesc.fileIndex];

        if(fileMgr.currentFile === fileDesc) {
            // Unset the current fileDesc
            fileMgr.currentFile = undefined;
            // Refresh the editor with another file
            fileMgr.selectFile();
        }

        // Remove synchronized locations from storage
        _.each(fileDesc.syncLocations, function(syncAttributes) {
            storage.removeItem(syncAttributes.syncIndex);
        });

        // Remove publish locations from storage
        _.each(fileDesc.publishLocations, function(publishAttributes) {
            storage.removeItem(publishAttributes.publishIndex);
        });

        storage.removeItem(fileDesc.fileIndex + ".title");
        storage.removeItem(fileDesc.fileIndex + ".content");
        storage.removeItem(fileDesc.fileIndex + ".sync");
        storage.removeItem(fileDesc.fileIndex + ".publish");
        storage.removeItem(fileDesc.fileIndex + ".selectTime");
        storage.removeItem(fileDesc.fileIndex + ".editorStart");
        storage.removeItem(fileDesc.fileIndex + ".editorEnd");
        storage.removeItem(fileDesc.fileIndex + ".editorScrollTop");
        storage.removeItem(fileDesc.fileIndex + ".previewScrollTop");
        storage.removeItem(fileDesc.fileIndex + ".editorSelectRange");

        eventMgr.onFileDeleted(fileDesc);
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

    // Get the file descriptor associated to a publishIndex
    fileMgr.getFileFromPublishIndex = function(publishIndex) {
        return _.find(fileSystem, function(fileDesc) {
            return _.has(fileDesc.publishLocations, publishIndex);
        });
    };

    var aceEditor;
    eventMgr.addListener('onAceCreated', function(aceEditorParam) {
        aceEditor = aceEditorParam;
    });

    eventMgr.addListener("onReady", function() {
        var $editorElt = $("#wmd-input");
        fileMgr.selectFile();

        var $fileTitleElt = $('.file-title-navbar');
        var $fileTitleInputElt = $(".input-file-title");
        $(".action-create-file").click(function() {
            var fileDesc = fileMgr.createFile();
            fileMgr.selectFile(fileDesc);
            $fileTitleElt.click();
        });
        $('.action-remove-file-confirm').click(function() {
            $('.modal-remove-file-confirm').modal('show');
        });
        $(".action-remove-file").click(function() {
            fileMgr.deleteFile();
        });
        $fileTitleElt.click(function() {
            if(window.viewerMode === true) {
                return;
            }
            $fileTitleElt.addClass('hide');
            var fileTitleInput = $fileTitleInputElt.removeClass('hide');
            _.defer(function() {
                fileTitleInput.focus().get(0).select();
            });
        });
        function applyTitle() {
            $fileTitleInputElt.addClass('hide');
            $fileTitleElt.removeClass('hide');
            var title = $.trim($fileTitleInputElt.val());
            var fileDesc = fileMgr.currentFile;
            if(title && title != fileDesc.title) {
                fileDesc.title = title;
                eventMgr.onTitleChanged(fileDesc);
            }
            $fileTitleInputElt.val(fileDesc.title);
            aceEditor ? aceEditor.focus() : $editorElt.focus();
        }
        $fileTitleInputElt.blur(function() {
            applyTitle();
        }).keyup(function(e) {
            if(e.keyCode == 13) {
                applyTitle();
            }
            if(e.keyCode == 27) {
                $fileTitleInputElt.val("");
                applyTitle();
            }
        });
        $(".action-open-stackedit").click(function() {
            window.location.href = ".";
        });
        $(".action-edit-document").click(function() {
            var content = $editorElt.val();
            if(aceEditor !== undefined) {
                content = aceEditor.getValue();
            }
            var title = fileMgr.currentFile.title;
            var fileDesc = fileMgr.createFile(title, content);
            fileMgr.selectFile(fileDesc);
            window.location.href = ".";
        });
        $(".action-welcome-file").click(function() {
            var fileDesc = fileMgr.createFile(constants.WELCOME_DOCUMENT_TITLE, welcomeContent);
            fileMgr.selectFile(fileDesc);
        });
    });

    eventMgr.onFileMgrCreated(fileMgr);
    return fileMgr;
});
