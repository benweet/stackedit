define([
    "jquery",
    "underscore",
    "core",
    "utils",
    "settings",
    "extensionMgr",
    "fileSystem",
    "text!../WELCOME.md"
], function($, _, core, utils, settings, extensionMgr, fileSystem, welcomeContent) {

    var fileMgr = {};

    // Defines a file descriptor (fileDesc objects)
    function FileDescriptor(fileIndex, title, syncLocations, publishLocations) {
        this.fileIndex = fileIndex;
        this._title = title;
        this._editorScrollTop = parseInt(localStorage[fileIndex + ".editorScrollTop"]) || 0;
        this._editorStart = parseInt(localStorage[fileIndex + ".editorStart"]) || 0;
        this._editorEnd = parseInt(localStorage[fileIndex + ".editorEnd"]) || 0;
        this._previewScrollTop = parseInt(localStorage[fileIndex + ".previewScrollTop"]) || 0;
        this._selectTime = parseInt(localStorage[fileIndex + ".selectTime"]) || 0;
        this.syncLocations = syncLocations || {};
        this.publishLocations = publishLocations || {};
        Object.defineProperty(this, 'title', {
            get: function() {
                return this._title;
            },
            set: function(title) {
                this._title = title;
                localStorage[this.fileIndex + ".title"] = title;
                extensionMgr.onTitleChanged(this);
            }
        });
        Object.defineProperty(this, 'content', {
            get: function() {
                return localStorage[this.fileIndex + ".content"];
            },
            set: function(content) {
                localStorage[this.fileIndex + ".content"] = content;
                extensionMgr.onContentChanged(this);
            }
        });
        Object.defineProperty(this, 'editorScrollTop', {
            get: function() {
                return this._editorScrollTop;
            },
            set: function(editorScrollTop) {
                this._editorScrollTop = editorScrollTop;
                localStorage[this.fileIndex + ".editorScrollTop"] = editorScrollTop;
            }
        });
        Object.defineProperty(this, 'editorStart', {
            get: function() {
                return this._editorStart;
            },
            set: function(editorStart) {
                this._editorStart = editorStart;
                localStorage[this.fileIndex + ".editorStart"] = editorStart;
            }
        });
        Object.defineProperty(this, 'editorEnd', {
            get: function() {
                return this._editorEnd;
            },
            set: function(editorEnd) {
                this._editorEnd = editorEnd;
                localStorage[this.fileIndex + ".editorEnd"] = editorEnd;
            }
        });
        Object.defineProperty(this, 'previewScrollTop', {
            get: function() {
                return this._previewScrollTop;
            },
            set: function(previewScrollTop) {
                this._previewScrollTop = previewScrollTop;
                localStorage[this.fileIndex + ".previewScrollTop"] = previewScrollTop;
            }
        });
        Object.defineProperty(this, 'selectTime', {
            get: function() {
                return this._selectTime;
            },
            set: function(selectTime) {
                this._selectTime = selectTime;
                localStorage[this.fileIndex + ".selectTime"] = selectTime;
            }
        });
    }

    // Retrieve file descriptors from localStorage and populate fileSystem
    _.each(utils.retrieveIndexArray("file.list"), function(fileIndex) {
        fileSystem[fileIndex] = new FileDescriptor(fileIndex, localStorage[fileIndex + ".title"]);
    });

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
        if(fileDesc === undefined) {
            localStorage.removeItem("file.current");
        }
        else if(fileDesc.fileIndex != TEMPORARY_FILE_INDEX) {
            localStorage["file.current"] = fileDesc.fileIndex;
        }
    };

    fileMgr.selectFile = function(fileDesc) {
        fileDesc = fileDesc || fileMgr.getCurrentFile();

        if(fileDesc === undefined) {
            var fileSystemSize = _.size(fileSystem);
            // If fileSystem empty create one file
            if(fileSystemSize === 0) {
                fileDesc = fileMgr.createFile(WELCOME_DOCUMENT_TITLE, welcomeContent);
            }
            else {
                var fileIndex = localStorage["file.current"];
                // If no file is selected take the last created
                if(fileIndex === undefined) {
                    fileIndex = _.keys(fileSystem)[fileSystemSize - 1];
                }
                fileDesc = fileSystem[fileIndex];
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
            // Refresh the editor with an other file
            fileMgr.selectFile();
        }

        // Remove synchronized locations
        _.each(fileDesc.syncLocations, function(syncAttributes) {
            fileMgr.removeSync(syncAttributes);
        });

        // Remove publish locations
        _.each(fileDesc.publishLocations, function(publishAttributes) {
            fileMgr.removePublish(publishAttributes);
        });

        localStorage.removeItem(fileDesc.fileIndex + ".title");
        localStorage.removeItem(fileDesc.fileIndex + ".content");
        localStorage.removeItem(fileDesc.fileIndex + ".sync");
        localStorage.removeItem(fileDesc.fileIndex + ".publish");

        extensionMgr.onFileDeleted(fileDesc);
    };

    // Add a synchronized location to a file
    fileMgr.addSync = function(fileDesc, syncAttributes) {
        utils.appendIndexToArray(fileDesc.fileIndex + ".sync", syncAttributes.syncIndex);
        fileDesc.syncLocations[syncAttributes.syncIndex] = syncAttributes;
        // addSync is only used for export, not for import
        extensionMgr.onSyncExportSuccess(fileDesc, syncAttributes);
    };

    // Remove a synchronized location
    fileMgr.removeSync = function(syncAttributes) {
        var fileDesc = fileMgr.getFileFromSyncIndex(syncAttributes.syncIndex);
        if(fileDesc !== undefined) {
            utils.removeIndexFromArray(fileDesc.fileIndex + ".sync", syncAttributes.syncIndex);
            delete fileDesc.syncLocations[syncAttributes.syncIndex];
            extensionMgr.onSyncRemoved(fileDesc, syncAttributes);
        }
        // Remove sync attributes from localStorage
        localStorage.removeItem(syncAttributes.syncIndex);
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

    // Add a publishIndex (publish location) to a file
    fileMgr.addPublish = function(fileDesc, publishAttributes) {
        utils.appendIndexToArray(fileDesc.fileIndex + ".publish", publishAttributes.publishIndex);
        fileDesc.publishLocations[publishAttributes.publishIndex] = publishAttributes;
        extensionMgr.onNewPublishSuccess(fileDesc, publishAttributes);
    };

    // Remove a publishIndex (publish location)
    fileMgr.removePublish = function(publishAttributes) {
        var fileDesc = fileMgr.getFileFromPublishIndex(publishAttributes.publishIndex);
        if(fileDesc !== undefined) {
            utils.removeIndexFromArray(fileDesc.fileIndex + ".publish", publishAttributes.publishIndex);
            delete fileDesc.publishLocations[publishAttributes.publishIndex];
            extensionMgr.onPublishRemoved(fileDesc, publishAttributes);
        }
        // Remove publish attributes from localStorage
        localStorage.removeItem(publishAttributes.publishIndex);
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
