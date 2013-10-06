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
            return buttonTocHTML;
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
    var previewContentsElt = undefined;
    function buildToc() {
        var anchorList = {};
        function createAnchor(element) {
            var id = element.id || utils.slugify(element.textContent) || 'title';
            var anchor = id;
            var index = 0;
            while (_.has(anchorList, anchor)) {
                anchor = id + "-" + (++index);
            }
            anchorList[anchor] = true;
            // Update the id of the element
            element.id = anchor;
            return anchor;
        }

        var elementList = [];
        _.each(previewContentsElt.querySelectorAll('.preview-content > .wmd-title'), function(elt) {
            elementList.push(new TocElement(elt.tagName, createAnchor(elt), elt.textContent));
        });
        elementList = groupTags(elementList);
        return '<div class="toc">\n<ul>\n' + elementList.join("") + '</ul>\n</div>\n';
    }

    toc.onPagedownConfigure = function(editor) {
        previewContentsElt = document.getElementById('preview-contents');
        var tocEltList = document.querySelectorAll('.table-of-contents');
        var tocExp = new RegExp("^" + toc.config.marker + "$", "g");
        // Run TOC generation when conversion is finished directly on HTML
        editor.hooks.chain("onPreviewRefresh", function() {
            var htmlToc = buildToc();
            // Replace toc paragraphs
            _.each(previewContentsElt.getElementsByTagName('p'), function(elt) {
                if(tocExp.test(elt.innerHTML)) {
                    elt.innerHTML = htmlToc;
                }
            });
            // Add toc in the TOC button 
            _.each(tocEltList, function(elt) {
                elt.innerHTML = htmlToc;
            });
        });
    };

    return toc;
});
