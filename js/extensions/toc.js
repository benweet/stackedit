define([
    "jquery",
    "underscore",
    "utils",
    "classes/Extension",
    "text!html/buttonToc.html",
    "text!html/tocSettingsBlock.html",
], function($, _, utils, Extension, buttonTocHTML, tocSettingsBlockHTML) {

    var toc = new Extension("toc", "Table of Contents", true);
    toc.settingsBlock = tocSettingsBlockHTML;
    toc.defaultConfig = {
        marker: "\\[(TOC|toc)\\]",
        button: true,
    };

    toc.onLoadSettings = function() {
        utils.setInputValue("#input-toc-marker", toc.config.marker);
        utils.setInputChecked("#input-toc-button", toc.config.button);
    };

    toc.onSaveSettings = function(newConfig, event) {
        newConfig.marker = utils.getInputRegExpValue("#input-toc-marker", event);
        newConfig.button = utils.getInputChecked("#input-toc-button");
    };

    toc.onCreatePreviewButton = function() {
        if(toc.config.button) {
            return $(buttonTocHTML);
        }
    };

    // TOC element description
    function TocElement(tagName, anchor, text) {
        this.tagName = tagName;
        this.anchor = anchor;
        this.text = text;
        this.children = [];
    }
    TocElement.prototype.childrenToString = function() {
        if(this.children.length === 0) {
            return "";
        }
        var result = "<ul>\n";
        _.each(this.children, function(child) {
            result += child.toString();
        });
        result += "</ul>\n";
        return result;
    };
    TocElement.prototype.toString = function() {
        var result = "<li>";
        if(this.anchor && this.text) {
            result += '<a href="#' + this.anchor + '">' + this.text + '</a>';
        }
        result += this.childrenToString() + "</li>\n";
        return result;
    };

    // Transform flat list of TocElement into a tree
    function groupTags(array, level) {
        level = level || 1;
        var tagName = "H" + level;
        var result = [];

        var currentElement = undefined;
        function pushCurrentElement() {
            if(currentElement !== undefined) {
                if(currentElement.children.length > 0) {
                    currentElement.children = groupTags(currentElement.children, level + 1);
                }
                result.push(currentElement);
            }
        }

        _.each(array, function(element, index) {
            if(element.tagName != tagName) {
                if(currentElement === undefined) {
                    currentElement = new TocElement();
                }
                currentElement.children.push(element);
            }
            else {
                pushCurrentElement();
                currentElement = element;
            }
        });
        pushCurrentElement();
        return result;
    }

    // Build the TOC
    function buildToc() {
        var anchorList = {};
        function createAnchor(element) {
            var id = element.prop("id") || utils.slugify(element.text());
            var anchor = id;
            var index = 0;
            while (_.has(anchorList, anchor)) {
                anchor = id + "-" + (++index);
            }
            anchorList[anchor] = true;
            // Update the id of the element
            element.prop("id", anchor);
            return anchor;
        }

        var elementList = [];
        $("#preview-contents > .preview-content").children("h1, h2, h3, h4, h5, h6").each(function() {
            elementList.push(new TocElement($(this).prop("tagName"), createAnchor($(this)), $(this).text()));
        });
        elementList = groupTags(elementList);
        return '<div class="toc">\n<ul>\n' + elementList.join("") + '</ul>\n</div>\n';
    }

    toc.onEditorConfigure = function(editor) {
        // Run TOC generation when conversion is finished directly on HTML
        editor.hooks.chain("onPreviewRefresh", function() {
            var htmlToc = buildToc();
            $("#preview-contents > .preview-content").each(function() {
                var html = $(this).html();
                html = html.replace(new RegExp("<p>" + toc.config.marker + "<\\/p>", "g"), htmlToc);
                $(this).html(html);
            });
            $(".table-of-contents").html(htmlToc);
        });
    };

    return toc;
});
