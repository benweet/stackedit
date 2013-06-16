define([
    "jquery",
    "underscore",
    "utils",
    "toMarkdown",
    "config",
], function($, _, utils, toMarkdown) {

    var dialogOpenHarddrive = {
        extensionId: "dialogOpenHarddrive",
        extensionName: 'Dialog "Open from"',
        settingsBloc: '<p>Handles the "Import from hard drive" and the "Convert HTML to Markdown" dialog boxes.</p>'
    };

    var fileMgr = undefined;
    dialogOpenHarddrive.onFileMgrCreated = function(fileMgrParameter) {
        fileMgr = fileMgrParameter;
    };

    var extensionMgr = undefined;
    dialogOpenHarddrive.onExtensionMgrCreated = function(extensionMgrParameter) {
        extensionMgr = extensionMgrParameter;
    };

    var contentWrapper = undefined;
    var converter = undefined;
    var htmlContentWrapper = function(content) {
        return converter.makeMd(content);
    };
    function handleFileImport(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        var files = (evt.dataTransfer || evt.target).files;
        $("#modal-import-harddrive-markdown, #modal-import-harddrive-html").modal("hide");
        _.each(files, function(file) {
            var reader = new FileReader();
            reader.onload = (function(importedFile) {
                return function(e) {
                    var content = e.target.result;
                    if(content.match(/\uFFFD/)) {
                        extensionMgr.onError(importedFile.name + " is a binary file.");
                        return;
                    }
                    content = contentWrapper ? contentWrapper(content) : content;
                    if(content === undefined) {
                        extensionMgr.onError(importedFile.name + " is not a valid HTML file.");
                        return;
                    }
                    var title = importedFile.name;
                    var dotPosition = title.lastIndexOf(".");
                    title = dotPosition !== -1 ? title.substring(0, dotPosition) : title; 
                    var fileDesc = fileMgr.createFile(title, content);
                    fileMgr.selectFile(fileDesc);
                };
            })(file);
            var blob = file.slice(0, IMPORT_FILE_MAX_CONTENT_SIZE);
            reader.readAsText(blob);
        });
    }

    function handleMarkdownImport(evt) {
        contentWrapper = undefined;
        handleFileImport(evt);
    }
    
    function handleHtmlImport(evt) {
        contentWrapper = htmlContentWrapper;
        handleFileImport(evt);
    }
    
    function handleDragOver(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'copy';
    }

    dialogOpenHarddrive.onReady = function() {
        // Create toMarkdown converter
        converter = new toMarkdown.converter();
        
        $("#input-file-import-harddrive-markdown").change(handleMarkdownImport);
        $('#dropzone-import-harddrive-markdown').each(function() {
            this.addEventListener('dragover', handleDragOver, false);
            this.addEventListener('drop', handleMarkdownImport, false);
        });
        $("#input-file-import-harddrive-html").change(handleHtmlImport);
        $('#dropzone-import-harddrive-html').each(function() {
            this.addEventListener('dragover', handleDragOver, false);
            this.addEventListener('drop', handleHtmlImport, false);
        });
        $(".action-convert-html").click(function(e) {
            var content = utils.getInputTextValue("#input-convert-html", e);
            if(content === undefined) {
                return;
            }
            content = converter.makeMd(content);
            if(content === undefined) {
                extensionMgr.onError(importedFile.name + " is not a valid HTML file.");
                return;
            }
            var fileDesc = fileMgr.createFile(undefined, content);
            fileMgr.selectFile(fileDesc);
        });
    };

    return dialogOpenHarddrive;

});