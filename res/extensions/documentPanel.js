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
        '<a href="#"',
        ' class="list-group-item folder clearfix"',
        ' data-folder-index="<%= folderDesc.folderIndex %>"',
        ' data-toggle="collapse"',
        ' data-target=".document-panel .file-list.<%= id %>">',
        '   <div class="pull-right file-count">',
        '       <%= _.size(folderDesc.fileList) %>',
        '   </div>',
        '   <i class="icon-folder"></i> <%= folderDesc.name %>',
        '</a>',
        '<div class="file-list collapse <%= id %> clearfix">',
        '   <%= fileListHtml %>',
        '</div>'
    ].join('');
    var documentEltTmpl = [
        '<a href="#"',
        ' class="list-group-item file<%= fileDesc === selectedFileDesc ? " active" : "" %>"',
        ' data-file-index="<%= fileDesc.fileIndex %>"',
        ' data-toggle="collapse"',
        ' data-target=".document-panel">',
        '   <%= fileDesc.composeTitle() %>',
        '</a>',
    ].join('');

    var panelElt = undefined;
    var documentListElt = undefined;
    var $documentListElt = undefined;
    var documentListFilteredElt = undefined;
    var $documentListFilteredElt = undefined;
    var selectedFileDesc = undefined;
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
                selectedFileDesc: selectedFileDesc
            }) + '</li>';
        }, '').value();
        documentListHtml = documentListHtml && '<ul class="nav">' + documentListHtml + '</ul>';

        // Build directories
        _.chain(folderList).sortBy(function(folderDesc) {
            return folderDesc.name.toLowerCase();
        }).each(function(folderDesc) {
            var fileListHtml = _.chain(folderDesc.fileList).sortBy(function(fileDesc) {
                return fileDesc.title.toLowerCase();
            }).reduce(function(result, fileDesc) {
                return result + '<li>' + _.template(documentEltTmpl, {
                    fileDesc: fileDesc,
                    selectedFileDesc: selectedFileDesc
                }) + '</li>';
            }, '').value();
            fileListHtml = fileListHtml && '<ul class="nav">' + fileListHtml + '</ul>';
            documentListHtml += _.template(folderEltTmpl, {
                folderDesc: folderDesc,
                fileListHtml: fileListHtml,
                id: folderDesc.folderIndex.replace('.', '')
            });
        });

        documentListElt.innerHTML = documentListHtml;
        
        // Create filtered list
        var documentListFilteredHtml = _.chain(fileSystem).sortBy(function(fileDesc) {
            return fileDesc.title.toLowerCase();
        }).reduce(function(result, fileDesc) {
            return result + '<li>' + _.template(documentEltTmpl, {
                fileDesc: fileDesc,
                selectedFileDesc: selectedFileDesc
            }) + '</li>';
        }, '').value();
        documentListFilteredHtml = '<ul class="nav">' + documentListFilteredHtml + '</ul>';

        documentListFilteredElt.innerHTML = documentListFilteredHtml;
        
        // Add click listeners
        _.each(documentListElt.querySelectorAll('.file'), function(fileElt) {
            var $fileElt = $(fileElt);
            $fileElt.click(function(e) {
                var fileDesc = fileSystem[$fileElt.data('fileIndex')];
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
    var panelContentElt = undefined;
    var previousFilterValue = '';
    function filterFiles(filterValue) {
        if(filterValue == previousFilterValue) {
            return;
        }
        previousFilterValue = filterValue;
        
        // Scroll to top
        panelContentElt.scrollTop = 0;

        if(!filterValue) {
            $documentListFilteredElt.addClass('hide');
            $documentListElt.removeClass('hide');
            return;
        }
        var wordList = filterValue.toLowerCase().split(/\s+/);
        _.each(documentListFilteredElt.querySelectorAll('.file'), function(fileElt) {
            var $fileElt = $(fileElt);
            var fileTitle = $fileElt.text().toLowerCase();
            $fileElt.toggle(!_.some(wordList, function(word) {
                return fileTitle.indexOf(word) === -1;
            }));
        });
        $documentListFilteredElt.removeClass('hide');
        $documentListElt.addClass('hide');
    }

    documentPanel.onReady = function() {
        panelElt = document.querySelector('.document-panel');
        panelContentElt = panelElt.querySelector('.panel-content');
        documentListElt = panelElt.querySelector('.document-list');
        $documentListElt = $(documentListElt);
        documentListFilteredElt = panelElt.querySelector('.document-list-filtered');
        $documentListFilteredElt = $(documentListFilteredElt);
        
        // Open current folder before opening
        $(panelElt).on('show.bs.collapse', function(e) {
            if(e.target === panelElt) {
                var folderDesc = selectedFileDesc.folder;
                if(folderDesc !== undefined) {
                    $(panelElt.querySelector('.file-list.' + folderDesc.folderIndex.replace('.', ''))).collapse('show');
                }
            }
        }).on('shown.bs.collapse', function(e) {
            if(e.target === panelElt) {
                // Unset the filter
                $filterInputElt.val('');
                filterFiles('');
                
                // Scroll to the active file
                panelContentElt.scrollTop += documentListElt.querySelector('.file.active').getBoundingClientRect().top - 120;
            }
        });
        
        // Search bar input change
        var $filterInputElt = $(panelElt.querySelector('.search-bar .form-control'));
        $filterInputElt.bind("propertychange keyup input paste", function() {
            filterFiles($filterInputElt.val());
        });
        
        // Clear button
        $(panelElt.querySelector('.search-bar .close')).click(function() {
            $filterInputElt.val('');
            filterFiles('');
            $filterInputElt.focus();
        });
    };

    return documentPanel;

});