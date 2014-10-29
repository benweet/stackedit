define([
	"jquery",
	"constants",
	"eventMgr",
	"utils",
	"fileMgr",
	"classes/Provider",
	"classes/AsyncTask"
], function($, constants, eventMgr, utils, fileMgr, Provider, AsyncTask) {

	var downloadProvider = new Provider("download");
	downloadProvider.viewerSharingAttributes = [
		"url"
	];

	downloadProvider.importPublic = function(importParameters, callback) {
		var title;
		var content;
		var task = new AsyncTask(true);
		task.onRun(function() {
			var url = importParameters.url;
			var slashUrl = url.lastIndexOf("/");
			if(slashUrl === -1) {
				task.error(new Error("Invalid URL parameter."));
				return;
			}
			title = url.substring(slashUrl + 1);
			$.ajax({
				url: constants.DOWNLOAD_IMPORT_URL + '?' + $.param({
					url: url
				}),
				dataType: 'text',
				timeout: constants.AJAX_TIMEOUT
			}).done(function(result) {
				content = result;
				task.chain();
			}).fail(function() {
				task.error(new Error("Unable to access URL " + url));
			});
		});
		task.onSuccess(function() {
			callback(undefined, title, content);
		});
		task.onError(function(error) {
			callback(error);
		});
		task.enqueue();
	};

	eventMgr.addListener("onReady", function() {
		$('.action-import-url').click(function(e) {
			var url = utils.getInputTextValue('#input-import-url', e);
			if(url) {
				downloadProvider.importPublic({
					url: url
				}, function(error, title, content) {
					if(error) {
						return;
					}
					var fileDesc = fileMgr.createFile(title, content);
					fileMgr.selectFile(fileDesc);
				});
			}
		});
	});

	return downloadProvider;
});