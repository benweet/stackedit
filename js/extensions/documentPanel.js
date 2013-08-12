define([
    "jquery",
    "underscore",
    "utils",
    "classes/Extension",
    "folderList",
    "fileSystem",
], function($, _, utils, Extension, folderList, fileSystem) {

    var documentPanel = new Extension("documentPanel", 'Document Panel');

    var fileMgr = undefined;
    documentPanel.onFileMgrCreated = function(fileMgrParameter) {
        fileMgr = fileMgrParameter;
    };

    var folderEltTmpl = [
        '<a href="#" class="list-group-item folder clearfix" data-folder-index="<%= folderDesc.folderIndex %>" data-toggle="collapse" data-target=".document-panel .nav.<%= id %>">',
        '<div class="pull-right file-count"><%= _.size(folderDesc.fileList) %></div>',
        '<i class="icon-folder"></i> <%= folderDesc.name %></a>',
        '<ul class="nav collapse <%= id %>"><%= fileListHtml %></ul>'
    ].join('');
    var documentEltTmpl = [
        '<a href="#" class="list-group-item file action-close-panel<%= fileDesc === selectedFileDesc ? " active" : "" %>" data-file-index="<%= fileDesc.fileIndex %>">',
        '<%= fileDesc.composeTitle() %></a>',
    ].join('');

    var panelElt = undefined;
    var documentListElt = undefined;
    var refreshPanel = function() {

        // List orphan documents
        var orphanDocumentList = _.filter(fileSystem, function(fileDesc) {
            return fileDesc.folder === undefined;
        });

        // Add orphan documents
        var documentListHtml = _.chain(orphanDocumentList).sortBy(function(fileDesc) {
            return fileDesc.title.toLowerCase();
        }).reduce(function(result, fileDesc) {
            return result + '<li>' + _.template(documentEltTmpl, {
                fileDesc: fileDesc,
            }) + '</li>';
        }, '').value();
        documentListHtml = '<ul class="nav">' + documentListHtml + '</ul>';
        
        // Build directories
        _.chain(folderList).sortBy(function(folderDesc) {
            return folderDesc.name.toLowerCase();
        }).each(function(folderDesc) {
            var fileListHtml = _.chain(folderDesc.fileList).sortBy(function(fileDesc) {
                return fileDesc.title.toLowerCase();
            }).reduce(function(result, fileDesc) {
                return result + _.template(documentEltTmpl, {
                    fileDesc: fileDesc,
                });
            }, '').value();
            documentListHtml += _.template(folderEltTmpl, {
                folderDesc: folderDesc,
                fileListHtml: fileListHtml,
                id: folderDesc.folderIndex.replace('.', '')
            });
        });

        documentListElt.innerHTML = documentListHtml;
        
        // Add click listeners
        _.each(documentListElt.querySelectorAll('.file'), function(fileElt) {
            fileElt = $(fileElt);
            fileElt.click(function(e) {
                var fileDesc = fileSystem[fileElt.data('fileIndex')];
                if(fileDesc && fileDesc !== selectedFileDesc) {
                    fileMgr.selectFile(fileDesc);
                }
            });
        });

    };

    documentPanel.onFileSelected = function(fileDesc) {
        selectedFileDesc = fileDesc;
        refreshPanel();
    };

    documentPanel.onFileCreated = refreshPanel;
    documentPanel.onFileDeleted = refreshPanel;
    documentPanel.onTitleChanged = refreshPanel;
    documentPanel.onSyncExportSuccess = refreshPanel;
    documentPanel.onSyncRemoved = refreshPanel;
    documentPanel.onNewPublishSuccess = refreshPanel;
    documentPanel.onPublishRemoved = refreshPanel;
    documentPanel.onFoldersChanged = refreshPanel;

    // Filter for search input in file selector
    function filterFileSelector(filter) {
        var liList = $(".file-selector > li");
        liList.show();
        if(filter) {
            var words = filter.toLowerCase().split(/\s+/);
            liList.each(function() {
                var fileTitle = $(this).text().toLowerCase();
                if(_.some(words, function(word) {
                    return fileTitle.indexOf(word) === -1;
                })) {
                    $(this).hide();
                }
            });
        }
    }

    documentPanel.onReady = function() {
        panelElt = document.querySelector('.document-panel');
        documentListElt = panelElt.querySelector('.list-group');
    };

    return documentPanel;

});