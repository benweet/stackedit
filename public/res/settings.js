define([
	"underscore",
	"constants",
	"storage"
], function(_, constants, storage) {

	var settings = {
		layoutOrientation: "horizontal",
		editMode: 'ltr',
		lazyRendering: true,
		editorFontClass: 'font-rich',
		fontSizeRatio: 1,
		maxWidthRatio: 1,
		cursorFocusRatio: 0.5,
		defaultContent: "\n\n\n> Written with [StackEdit](" + constants.MAIN_URL + ").",
		commitMsg: "Published with " + constants.MAIN_URL,
		conflictMode: 'merge',
		markdownMimeType: 'text/plain',
		gdriveMultiAccount: 1,
		gdriveFullAccess: true,
		dropboxFullAccess: true,
		githubFullAccess: true,
		template: [
			'<!DOCTYPE html>',
			'<html>',
			'<head>',
			'<meta charset="utf-8">',
			'<meta name="viewport" content="width=device-width, initial-scale=1.0">',
			'<title><%= documentTitle %></title>',
			'<link rel="stylesheet" href="' + constants.MAIN_URL + 'res-min/themes/base.css" />',
			'<script type="text/javascript" src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML"></script>',
			'</head>',
			'<body><div class="container"><%= documentHTML %></div></body>',
			'</html>'
		].join('\n'),
		pdfTemplate: [
			'<!DOCTYPE html>',
			'<html>',
			'<head>',
			'<meta charset="utf-8">',
			'<title><%= documentTitle %></title>',
			'<link rel="stylesheet" href="http://localhost/res-min/themes/base.css" />',
			'<script type="text/x-mathjax-config">',
			'MathJax.Hub.Config({ messageStyle: "none" });',
			'</script>',
			'<script type="text/javascript" src="http://localhost/res/bower-libs/MathJax/MathJax.js?config=TeX-AMS_HTML"></script>',
			'</head>',
			'<body><%= documentHTML %></body>',
			'</html>'
		].join('\n'),
		pdfOptions: [
			'{',
			'    "marginTop": 25,',
			'    "marginRight": 25,',
			'    "marginBottom": 25,',
			'    "marginLeft": 25,',
			'    "pageSize": "A4"',
			'}'
		].join('\n'),
		couchdbUrl: constants.COUCHDB_URL,
		extensionSettings: {}
	};

	try {
		_.extend(settings, JSON.parse(storage.settings));
	}
	catch(e) {
		// Ignore parsing error
	}

	return settings;
});
