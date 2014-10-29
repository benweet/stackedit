define([
    "jquery",
    "underscore",
    "constants",
    "utils",
    "storage",
    "classes/Extension",
    "classes/FolderDescriptor",
    "folderList",
    "fileSystem"
], function($, _, constants, utils, storage, Extension, FolderDescriptor, folderList, fileSystem) {

    var documentManager = new Extension("documentManager", 'Document Manager', false, true);

    var fileMgr;
    documentManager.onFileMgrCreated = function(fileMgrParameter) {
        fileMgr = fileMgrParameter;
    };

    var eventMgr;
    documentManager.onEventMgrCreated = function(eventMgrParameter) {
        eventMgr = eventMgrParameter;
    };

    var folderEltTmpl = [
        '<a href="#" class="list-group-item folder clearfix" data-folder-index="<%= folderDesc.folderIndex %>" data-toggle="collapse" data-target=".modal-document-manager .file-list.<%= id %>">',
        '<label class="checkbox" title="Select"><input type="checkbox"></label>',
        '<button class="btn btn-default button-delete" title="Delete"><i class="icon-trash"></i></button>',
        '<button class="btn btn-default button-rename" title="Rename"><i class="icon-pencil"></i></button>',
        '<div class="pull-right file-count"><%= _.size(folderDesc.fileList) %></div>',
        '<div class="name"><i class="icon-folder"></i> ',
        '<%= folderDesc.name %></div>',
        '<input type="text" class="input-rename form-control hide"></a>',
        '<div class="file-list collapse <%= id %> clearfix"><%= fileListHtml %></div>'
    ].join('');
    var documentEltTmpl = [
        '<li class="list-group-item file clearfix" data-file-index="<%= fileDesc.fileIndex %>">',
        '<label class="checkbox" title="Select"><input type="checkbox"></label>',
        '<button class="btn btn-default button-delete" title="Delete"><i class="icon-trash"></i></button>',
        '<button class="btn btn-default button-rename" title="Rename"><i class="icon-pencil"></i></button>',
        '<div class="name"><%= fileDesc.composeTitle() %></div>',
        '<input type="text" class="input-rename form-control hide"></li>'
    ].join('');
    var selectFolderEltTmpl = [
        '<a href="#" class="list-group-item folder clearfix" data-folder-index="<%= folderDesc.folderIndex %>">',
        '<div class="pull-right file-count"><%= _.size(folderDesc.fileList) %></div>',
        '<div class="name"><i class="icon-forward"></i> ',
        '<%= folderDesc.name %></div></a>'
    ].join('');
    var selectedDocumentEltTmpl = [
        '<li class="list-group-item file clearfix">',
        '<div class="name"><%= fileDesc.composeTitle() %></div></li>'
    ].join('');

    var isVisible;
    var modalElt;
    var documentListElt;
    var selectedDocumentList = [];
    var selectedFolderList = [];
    function doSelect() {
        selectedFolderList = [];
        selectedDocumentList = [];
        _.each(documentListElt.querySelectorAll('input[type="checkbox"]:checked'), function(checkboxElt) {
            var $parentElt = $(checkboxElt.parentNode.parentNode);
            var folderDesc = folderList[$parentElt.data('folderIndex')];
            var fileDesc = fileSystem[$parentElt.data('fileIndex')];
            if(folderDesc !== undefined) {
                selectedFolderList.push(folderDesc);
            }
            else if(fileDesc !== undefined) {
                selectedDocumentList.push(fileDesc);
            }
        });
    }

    var selectedDocumentListElt;
    function doDeleteConfirmation() {
        // Don't ask user confirmation if we delete only folders
        if(_.size(selectedDocumentList) === 0) {
            doDelete();
            return;
        }

        // Build the selected document list
        var selectedDocumentListHtml = _.chain(selectedDocumentList).sortBy(function(fileDesc) {
            return fileDesc.title.toLowerCase();
        }).reduce(function(result, fileDesc) {
            return result + _.template(selectedDocumentEltTmpl, {
                fileDesc: fileDesc
            });
        }, '').value();
        selectedDocumentListElt.innerHTML = '<ul class="file-list nav">' + selectedDocumentListHtml + '</ul>';

        // Ask user confirmation
        $(modalElt.querySelectorAll('.document-list')).addClass('hide');
        $(modalElt.querySelectorAll('.confirm-delete, .selected-document-list')).removeClass('hide');
    }

    function doDelete() {
        // Delete files
        _.each(selectedDocumentList, function(fileDesc) {
            fileDesc.folder && fileDesc.folder.removeFile(fileDesc);
            fileMgr.deleteFile(fileDesc);
        });

        // Delete folders
        _.each(selectedFolderList, function(folderDesc) {
            utils.removeIndexFromArray("folder.list", folderDesc.folderIndex);
            delete folderList[folderDesc.folderIndex];
        });
        eventMgr.onFoldersChanged();
    }

    var $liMoveElt;
    var $liDeleteElt;
    var doActiveButtons = _.debounce(function() {
        doSelect();

        $liMoveElt.toggleClass('disabled', _.size(folderList) === 0 || _.size(selectedDocumentList) === 0);
        $liDeleteElt.toggleClass('disabled', _.size(selectedFolderList) === 0 && _.size(selectedDocumentList) === 0);
    }, 50);

    var orphanDocumentList;
    var $documentCountElt;
    var $folderCountElt;
    var refreshManager = _.debounce(function() {
        if(isVisible === false) {
            return;
        }

        doActiveButtons();

        // Refresh file/folder counters
        $documentCountElt.text(_.size(fileSystem));
        $folderCountElt.text(_.size(folderList) + 1);

        // List orphan documents
        orphanDocumentList = _.filter(fileSystem, function(fileDesc) {
            return fileDesc.folder === undefined;
        });

        // Root folder
        var documentListHtml = [
            '<a href="#" class="list-group-item folder root-folder clearfix" data-toggle="collapse" data-target=".modal-document-manager .file-list.root-folder">',
            '<label class="checkbox" title="Select"><input type="checkbox"></label>',
            '<div class="pull-right file-count">',
            _.size(orphanDocumentList),
            '</div>',
            '<div class="name"><i class="icon-folder"></i> ',
            'ROOT folder</div></a>'
        ].join('');

        // Add orphan documents
        var orphanListHtml = _.chain(orphanDocumentList).sortBy(function(fileDesc) {
            return fileDesc.title.toLowerCase();
        }).reduce(function(result, fileDesc) {
            return result + _.template(documentEltTmpl, {
                fileDesc: fileDesc
            });
        }, '').value();
        orphanListHtml = orphanListHtml && '<ul class="nav">' + orphanListHtml + '</ul>';
        documentListHtml += '<div class="file-list collapse root-folder clearfix">' + orphanListHtml + '</div>';

        // Build directories
        _.chain(folderList).sortBy(function(folderDesc) {
            return folderDesc.name.toLowerCase();
        }).each(function(folderDesc) {
            var fileListHtml = _.chain(folderDesc.fileList).sortBy(function(fileDesc) {
                return fileDesc.title.toLowerCase();
            }).reduce(function(result, fileDesc) {
                return result + _.template(documentEltTmpl, {
                    fileDesc: fileDesc
                });
            }, '').value();
            fileListHtml = fileListHtml && '<ul class="nav">' + fileListHtml + '</ul>';
            documentListHtml += _.template(folderEltTmpl, {
                folderDesc: folderDesc,
                fileListHtml: fileListHtml,
                id: folderDesc.folderIndex.replace('.', '')
            });
        });

        documentListElt.innerHTML = documentListHtml;
    }, 50);

    documentManager.onFileCreated = refreshManager;
    documentManager.onFileDeleted = refreshManager;
    documentManager.onSyncExportSuccess = refreshManager;
    documentManager.onSyncRemoved = refreshManager;
    documentManager.onNewPublishSuccess = refreshManager;
    documentManager.onPublishRemoved = refreshManager;
    documentManager.onFoldersChanged = refreshManager;

    documentManager.onTitleChanged = function(fileDesc) {
        if(isVisible === false) {
            return;
        }
        $(documentListElt).find('[data-file-index="' + fileDesc.fileIndex + '"] .name').html(fileDesc.composeTitle()).removeClass('hide');
        $(documentListElt.querySelectorAll('.input-rename')).addClass('hide');
    };

    documentManager.onReady = function() {
        modalElt = document.querySelector('.modal-document-manager');
        documentListElt = modalElt.querySelector('.list-group.document-list');
        $documentCountElt = $(modalElt.querySelectorAll('.document-count'));
        $folderCountElt = $(modalElt.querySelectorAll('.folder-count'));
        selectedDocumentListElt = modalElt.querySelector('.list-group.selected-document-list');
        var selectFolderListElt = modalElt.querySelector('.list-group.select-folder-list');

        // Only refresh manager if visible (costly)
        $(modalElt).on('show.bs.modal', function() {
            isVisible = true;
            refreshManager();
            // Open root folder
            setTimeout(function() {
                $(documentListElt.querySelectorAll('.root-folder')).click();
            }, 250);
        }).on('hide.bs.modal', function() {
            isVisible = false;
            documentListElt.innerHTML = '';
        });

        // Create folder action
        $(modalElt.querySelectorAll('.action-create-folder')).click(function() {
            var folderIndex;
            do {
                folderIndex = "folder." + utils.id();
            } while (_.has(folderList, folderIndex));

            storage[folderIndex + ".name"] = constants.DEFAULT_FOLDER_NAME;

            // Create the folder descriptor
            var folderDesc = new FolderDescriptor(folderIndex, constants.DEFAULT_FOLDER_NAME);

            // Add the index to the folder list
            utils.appendIndexToArray("folder.list", folderIndex);
            folderList[folderIndex] = folderDesc;
            eventMgr.onFoldersChanged();

            // Edit the name when folder has just been created
            setTimeout(function() {
                var renameButtonElt = $(modalElt.querySelector('[data-folder-index="' + folderIndex + '"] .button-rename')).click();
                modalElt.scrollTop += renameButtonElt.offset().top - 50;
            }, 60);
        });

        // Selection dropdown menu actions
        $(modalElt.querySelectorAll('.action-select-all')).click(function() {
            $(documentListElt.querySelectorAll('.folder input[type="checkbox"]')).prop('checked', true).change();
        });
        $(modalElt.querySelectorAll('.action-unselect-all')).click(function() {
            $(documentListElt.querySelectorAll('.folder input[type="checkbox"]')).prop('checked', false).change();
        });

        // Delete selection actions
        var $aDeleteElt = $(modalElt.querySelectorAll('.action-delete-items')).click(function() {
            if($liDeleteElt.hasClass('disabled')) {
                return;
            }

            doSelect();
            doDeleteConfirmation();
        });
        $liDeleteElt = $aDeleteElt.parent();

        // Delete confirmation actions
        $(modalElt.querySelectorAll('.action-delete-items-confirm')).click(function() {
            doDelete();

            $(modalElt.querySelectorAll('.document-list')).removeClass('hide');
            $(modalElt.querySelectorAll('.confirm-delete, .selected-document-list')).addClass('hide');
        });

        // Move selection actions
        var $aMoveElt = $(modalElt.querySelectorAll('.action-move-items')).click(function() {
            if($liMoveElt.hasClass('disabled')) {
                return;
            }

            doSelect();

            // Build the destination folder list
            var selectFolderListHtml = [
                '<a href="#" class="list-group-item folder clearfix">',
                '<div class="pull-right file-count">',
                _.size(orphanDocumentList),
                '</div>',
                '<div class="name"><i class="icon-forward"></i> ',
                'ROOT folder</div></a>'
            ].join('');
            selectFolderListHtml += _.chain(folderList).sortBy(function(folderDesc) {
                return folderDesc.name.toLowerCase();
            }).reduce(function(result, folderDesc) {
                return result + _.template(selectFolderEltTmpl, {
                    folderDesc: folderDesc
                });
            }, '').value();
            selectFolderListElt.innerHTML = selectFolderListHtml;

            // Set selection event listeners
            _.each(selectFolderListElt.querySelectorAll('.folder'), function(folderElt) {
                folderElt = $(folderElt);
                folderElt.click(function() {
                    var folderDesc = folderList[folderElt.data('folderIndex')];
                    _.each(selectedDocumentList, function(fileDesc) {
                        fileDesc.folder && fileDesc.folder.removeFile(fileDesc);
                        folderDesc && folderDesc.addFile(fileDesc);
                    });
                    eventMgr.onFoldersChanged();

                    $(modalElt.querySelectorAll('.document-list')).removeClass('hide');
                    $(modalElt.querySelectorAll('.choose-folder, .select-folder-list')).addClass('hide');
                });
            });

            // Ask user for destination folder
            $(modalElt.querySelectorAll('.document-list')).addClass('hide');
            $(modalElt.querySelectorAll('.choose-folder, .select-folder-list')).removeClass('hide');
        });
        $liMoveElt = $aMoveElt.parent();

        // Cancel button
        $(modalElt.querySelectorAll('.action-cancel')).click(function() {
            $(modalElt.querySelectorAll('.document-list')).removeClass('hide');
            $(modalElt.querySelectorAll('.confirm-delete, .choose-folder, .selected-document-list, .select-folder-list')).addClass('hide');
        });

        $(documentListElt).on('click', '.button-delete', function(evt) {
            evt.stopPropagation();
            var $buttonElt = $(this);
            var $parentElt = $buttonElt.parent();
            var folderDesc = folderList[$parentElt.data('folderIndex')];
            var fileDesc = fileSystem[$parentElt.data('fileIndex')];
            selectedDocumentList = [];
            selectedFolderList = [];
            if(folderDesc) {
                selectedFolderList.push(folderDesc);
                selectedDocumentList = folderDesc.fileList;
            }
            else if(fileDesc) {
                selectedDocumentList.push(fileDesc);
            }
            doDeleteConfirmation();

        }).on('click', '.button-rename', function(evt) {
            evt.stopPropagation();
            var $parentElt = $(this.parentNode);
            var name;
            var folderDesc = folderList[$parentElt.data('folderIndex')];
            var fileDesc = fileSystem[$parentElt.data('fileIndex')];
            if(folderDesc) {
                name = folderDesc.name;
            }
            else if(fileDesc) {
                name = fileDesc.title;
            }
            $parentElt.find('.name').addClass('hide');
            $parentElt.find('.input-rename').removeClass('hide').val(name)[0].select();

        }).on('blur keyup', '.input-rename', function(evt) {
            var $inputElt = $(this);
            function rename() {
                var parentElt = $inputElt.parent();
                var name = $.trim($inputElt.val());
                var folderDesc = folderList[parentElt.data('folderIndex')];
                var fileDesc = fileSystem[parentElt.data('fileIndex')];
                if(name && folderDesc && name != folderDesc.name) {
                    folderDesc.name = name;
                    eventMgr.onFoldersChanged();
                }
                else if(name && fileDesc && name != fileDesc.title) {
                    fileDesc.title = name;
                    eventMgr.onTitleChanged(fileDesc);
                }
                else {
                    $inputElt.addClass('hide');
                    parentElt.find('.name').removeClass('hide');
                }
            }
            // Blur event
            if(evt.keyCode === undefined) {
                rename();
            }
            // Enter key event
            else if(evt.keyCode == 13) {
                rename();
                evt.stopPropagation();
            }
            // Escape key event
            else if(evt.keyCode == 27) {
                $inputElt.val('');
                rename();
                evt.stopPropagation();
            }
        }).on('click', '.file .checkbox', function(evt) {
            evt.stopPropagation();
        }).on('change', '.file .checkbox input', function() {
            $(this).parents('.file-list').prev().find('.checkbox input').prop('checked', false);
            doActiveButtons();
        }).on('click', '.folder .checkbox', function(evt) {
            evt.stopPropagation();
        }).on('change', '.folder .checkbox input', function() {
            $(this).parents('.folder').next().find('.checkbox input').prop('checked', this.checked);
            doActiveButtons();
        });
    };

    return documentManager;

});
