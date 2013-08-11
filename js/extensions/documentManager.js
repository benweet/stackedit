define([
    "jquery",
    "underscore",
    "utils",
    "classes/Extension",
    "classes/FolderDescriptor",
    "fileSystem",
    "config"
], function($, _, utils, Extension, FolderDescriptor, fileSystem) {

    var documentManager = new Extension("documentManager", 'Document Manager', false, true);

    var fileMgr = undefined;
    documentManager.onFileMgrCreated = function(fileMgrParameter) {
        fileMgr = fileMgrParameter;
    };

    var eventMgr = undefined;
    documentManager.onEventMgrCreated = function(eventMgrParameter) {
        eventMgr = eventMgrParameter;
    };

    var documentListElt = undefined;
    var selectFileDesc = undefined;
    var folderList = {};
    var folderEltTmpl = [
        '<a href="#" class="list-group-item folder clearfix" data-folder-index="<%= folderDesc.folderIndex %>" data-toggle="collapse" data-target=".modal-document-manager .nav.<%= id %>">',
        '<label class="checkbox" title="Select"><input type="checkbox"></label>',
        '<button class="btn btn-default button-rename" title="Rename"><i class="icon-pencil"></i></button>',
        '<div class="pull-right file-count"><%= _.size(folderDesc.fileList) %></div>',
        '<div class="name"><i class="icon-folder"></i> ',
        '<%= folderDesc.name %></div>',
        '<input type="text" class="input-rename form-control hide"></a>',
        '<ul class="nav collapse <%= id %>"><%= fileListHtml %></ul>'
    ].join('');
    var orphanEltTmpl = [
        '<li class="list-group-item file clearfix" data-file-index="<%= fileDesc.fileIndex %>">',
        '<label class="checkbox" title="Select"><input type="checkbox"></label>',
        '<button class="btn btn-default button-rename" title="Rename"><i class="icon-pencil"></i></button>',
        '<div class="name"><%= fileDesc.composeTitle() %></div>',
        '<input type="text" class="input-rename form-control hide"></li>',
    ].join('');
    var buildManager = function() {

        var documentListHtml = '';

        // Add orphan documents
        documentListHtml += '<ul class="nav">' + _.chain(fileSystem).filter(function(fileDesc) {
            return fileDesc.folder === undefined;
        }).sortBy(function(fileDesc) {
            return fileDesc.title.toLowerCase();
        }).reduce(function(result, fileDesc) {
            return result + _.template(orphanEltTmpl, {
                fileDesc: fileDesc,
            });
        }, '').value() + '</ul>';

        // Build directories
        _.chain(folderList).sortBy(function(folderDesc) {
            return folderDesc.name.toLowerCase();
        }).each(function(folderDesc) {
            var fileListHtml = _.chain(folderDesc.fileList).sortBy(function(fileDesc) {
                return fileDesc.title.toLowerCase();
            }).reduce(function(result, fileDesc) {
                return result + '<li><a href="#">' + fileDesc.composeTitle() + '</a></li>';
            }, '').value();
            documentListHtml += _.template(folderEltTmpl, {
                folderDesc: folderDesc,
                fileListHtml: fileListHtml,
                id: folderDesc.folderIndex.replace('.', '')
            });
        });

        documentListElt.innerHTML = documentListHtml;
        
        // Set rename event listeners
        _.each(documentListElt.querySelectorAll('.button-rename'), function(buttonElt) {
            buttonElt = $(buttonElt);
            buttonElt.click(function() {
                var parentElt = buttonElt.parent();
                var name = undefined;
                var folderDesc = folderList[parentElt.data('folderIndex')];
                var fileDesc = fileSystem[parentElt.data('fileIndex')];
                if(folderDesc) {
                    name = folderDesc.name;
                }
                else if(fileDesc) {
                    name = fileDesc.title;
                }
                parentElt.find('.name').addClass('hide');
                parentElt.find('.input-rename').removeClass('hide').val(name)[0].select();
            });
        });
        _.each(documentListElt.querySelectorAll('.input-rename'), function(inputElt) {
            inputElt = $(inputElt);
            function rename() {
                var parentElt = inputElt.parent();
                var name = $.trim(inputElt.val());
                var folderDesc = folderList[parentElt.data('folderIndex')];
                var fileDesc = fileSystem[parentElt.data('fileIndex')];
                if(name && folderDesc && name != folderDesc.name) {
                    folderDesc.name = name;
                    buildManager();
                }
                else if(name && fileDesc && name != fileDesc.title) {
                    fileDesc.title = name;
                    buildManager();
                    eventMgr.onTitleChanged(fileDesc);
                }
                else {
                    inputElt.addClass('hide');
                    parentElt.find('.name').removeClass('hide');
                }
            }
            inputElt.blur(function() {
                rename();
            }).keyup(function(e) {
                if(e.keyCode == 13) {
                    rename();
                    e.stopPropagation();
                }
                if(e.keyCode == 27) {
                    inputElt.val('');
                    rename();
                    e.stopPropagation();
                }
            });
        });
    };

    documentManager.onFileSelected = function(fileDesc) {
        selectFileDesc = fileDesc;
        buildManager();
    };

    documentManager.onFileCreated = buildManager;
    documentManager.onFileDeleted = buildManager;
    documentManager.onTitleChanged = buildManager;
    documentManager.onSyncExportSuccess = buildManager;
    documentManager.onSyncRemoved = buildManager;
    documentManager.onNewPublishSuccess = buildManager;
    documentManager.onPublishRemoved = buildManager;

    documentManager.onInit = function() {
        // Retrieve folder descriptors from localStorage
        _.each(utils.retrieveIndexArray("folder.list"), function(folderIndex) {
            folderList[folderIndex] = new FolderDescriptor(folderIndex);
        });
    };

    documentManager.onReady = function() {
        var modalElt = document.querySelector('.modal-document-manager');
        documentListElt = modalElt.querySelector('.list-group.document-list');
        $('.action-create-folder').click(function() {

            // Create new folder
            var folderIndex = undefined;
            do {
                folderIndex = "folder." + utils.randomString();
            } while (_.has(folderList, folderIndex));

            localStorage[folderIndex + ".name"] = DEFAULT_FOLDER_NAME;

            // Create the folder descriptor
            var folderDesc = new FolderDescriptor(folderIndex, DEFAULT_FOLDER_NAME);

            // Add the index to the folder list
            utils.appendIndexToArray("folder.list", folderIndex);
            folderList[folderIndex] = folderDesc;

            buildManager();
            
            var renameButtonElt = $(modalElt.querySelector('[data-folder-index="' + folderIndex + '"] .button-rename')).click();
            modalElt.scrollTop = modalElt.scrollTop + renameButtonElt.offset().top;
        });

    };

    return documentManager;

});