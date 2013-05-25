define( [ "Markdown.Extra" ], function() {
    
    var markdownExtra = {
        extensionId: "markdownExtra",
        extensionName: "Markdown Extra",
        defaultConfig: {
			prettify: true
		}
    };
    
    markdownExtra.onEditorConfigure = function(editor) {
    	var converter = editor.getConverter();
		var options = {};
		if(markdownExtra.config.prettify === true) {
			options.highlighter = "prettify";
			editor.hooks.chain("onPreviewRefresh", prettyPrint);
		}
    	Markdown.Extra.init(converter, options);
	};
	
    return markdownExtra;
});