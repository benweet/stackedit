define([
    "jquery",
    "underscore"
], function($, _) {

    var buttonShare = {
        extensionId: "buttonShare",
        extensionName: 'Button "Share"',
        optional: true,
        settingsBloc: '<p>Adds a "Share document" button in the navigation bar.</p>'
    };

    buttonShare.onCreateButton = function() {
        return $([
            '<button class="btn dropdown-toggle" data-toggle="dropdown" title="Share this document">',
            '   <i class="icon-link"></i>',
            '</button>',
            '<div id="link-container" class="dropdown-menu pull-right">',
            '   <h3 class="muted">Sharing</h3>',
            '   <div class="link-list"></div>',
            '   <p class="no-link">To share this document you need first to ',
            '       <a href="#" class="action-publish-gist">publish it as a Gist</a>',
            '       in Markdown format.',
            '   </p>',
            '   <blockquote class="muted">',
            '       <b>NOTE:</b> You can open any URL within StackEdit using',
            '       <a href="viewer.html?url=https://raw.github.com/benweet/stackedit/master/README.md"',
            '       title="Sharing example">viewer.html?url=...</a>',
            '   </blockquote>',
            '</div>'
        ].join(""));
    };

    var fileDesc = undefined;
    var lineTemplate = [
        '<div class="input-prepend">',
        '   <a href="<%= link %>" class="add-on" title="Sharing location"><i class="icon-link"></i></a>',
        '   <input class="span2" type="text" value="<%= link %>" readonly />',
        '</div>'
    ].join("");
    var refreshDocumentSharing = function(fileDescParameter) {
        if(fileDescParameter !== undefined && fileDescParameter !== fileDesc) {
            return;
        }

        var linkList = $("#link-container .link-list").empty();
        $("#link-container .no-link").show();

        var attributesList = _.values(fileDesc.publishLocations);
        _.each(attributesList, function(attributes) {
            if(attributes.sharingLink) {
                var lineElement = $(_.template(lineTemplate, {
                    link: attributes.sharingLink
                }));
                lineElement.click(function(event) {
                    event.stopPropagation();
                });
                linkList.append(lineElement);
                $("#link-container .no-link").hide();
            }
        });
    };

    buttonShare.onFileSelected = function(fileDescParameter) {
        fileDesc = fileDescParameter;
        refreshDocumentSharing(fileDescParameter);
    };

    buttonShare.onNewPublishSuccess = refreshDocumentSharing;
    buttonShare.onPublishRemoved = refreshDocumentSharing;

    return buttonShare;

});