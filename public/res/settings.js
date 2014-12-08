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
			'</head>',
			'<body><div class="container"><%= documentHTML %></div></body>',
			'</html>'
		].join('\n'),
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
