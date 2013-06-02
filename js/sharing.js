define([
    "jquery",
    "underscore",
    "core",
    "utils",
    "extension-manager",
    "file-manager",
    "async-runner",
    "providers/download-provider",
    "providers/gist-provider"
], function($, _, core, utils, extensionMgr, fileMgr, asyncRunner) {

    var sharing = {};

    // Create a map with providerId: providerModule
    var providerMap = _.chain(arguments).map(function(argument) {
        return argument && argument.providerId && [
            argument.providerId,
            argument
        ];
    }).compact().object().value();

    // Used to populate the "Sharing" dropdown box
    var lineTemplate = [
        '<div class="input-prepend">',
        '   <a href="<%= link %>" class="add-on" title="Sharing location"><i class="icon-link"></i></a>',
        '   <input class="span2" type="text" value="<%= link %>" readonly />',
        '</div>'
    ].join("");
    sharing.refreshDocumentSharing = function(attributesList) {
        var linkList = $("#link-container .link-list").empty();
        $("#link-container .no-link").show();
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

    sharing.createLink = function(attributes, callback) {
        var provider = providerMap[attributes.provider.providerId];
        // Don't create link if link already exists or provider is not
        // compatible for sharing
        if(attributes.sharingLink !== undefined || provider === undefined
        // Or document is not published in markdown format
        || attributes.format != "markdown") {
            callback();
            return;
        }
        var task = asyncRunner.createTask();
        var shortUrl = undefined;
        task.onRun(function() {
            if(core.isOffline === true) {
                task.chain();
                return;
            }
            var url = [
                MAIN_URL,
                'viewer.html?provider=',
                provider.providerId
            ];
            _.each(provider.sharingAttributes, function(attributeName) {
                url.push('&');
                url.push(attributeName);
                url.push('=');
                url.push(encodeURIComponent(attributes[attributeName]));
            });
            url = url.join("");
            $.getJSON("https://api-ssl.bitly.com/v3/shorten", {
                "access_token": BITLY_ACCESS_TOKEN,
                "longUrl": url
            }, function(response) {
                if(response.data) {
                    shortUrl = response.data.url;
                    attributes.sharingLink = shortUrl;
                }
                else {
                    extensionMgr.onError("An error occured while creating sharing link.");
                    attributes.sharingLink = url;
                }
                task.chain();
            });
        });
        function onFinish() {
            callback();
        }
        task.onSuccess(onFinish);
        task.onError(onFinish);
        asyncRunner.addTask(task);
    };

    core.onReady(function() {
        if(viewerMode === false) {
            return;
        }
        // Check parameters to see if we have to download a shared document
        var providerId = utils.getURLParameter("provider");
        if(providerId === undefined) {
            providerId = "download";
        }
        var provider = providerMap[providerId];
        if(provider === undefined) {
            return;
        }
        var importParameters = {};
        _.each(provider.sharingAttributes, function(attributeName) {
            var parameter = utils.getURLParameter(attributeName);
            if(!parameter) {
                importParameters = undefined;
                return;
            }
            importParameters[attributeName] = parameter;
        });
        if(importParameters === undefined) {
            return;
        }
        $("#wmd-preview, #file-title").hide();
        provider.importPublic(importParameters, function(error, title, content) {
            $("#wmd-preview, #file-title").show();
            if(error) {
                return;
            }
            var fileDesc = fileMgr.createFile(title, content, undefined, true);
            fileMgr.selectFile(fileDesc);
        });
    });

    return sharing;
});