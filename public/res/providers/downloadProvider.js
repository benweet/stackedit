define([
	"jquery",
	"constants",
	"eventMgr",
	"utils",
	"fileSystem",
	"fileMgr",
	"classes/Provider",
	"classes/AsyncTask"
], function($, constants, eventMgr, utils, fileSystem, fileMgr, Provider, AsyncTask) {

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
		if (location.hash) {
			var hash = JSON.parse(location.hash.replace("#", ""));
			if (hash.type === "download") {
				var fileDesc = null;
				utils.retrieveIndexArray("file.list").forEach(function(fileIndex) {
					if (fileSystem[fileIndex].title === hash.importParameters.title) {
						fileDesc = fileSystem[fileIndex];
						return;
					}
				});

				downloadProvider.importPublic(hash.importParameters, function(undefined, title, content) {
					if (fileDesc === null) {
						fileDesc = fileMgr.createFile(hash.importParameters.title, content);
					}
					eventMgr.onContentChanged(fileDesc, content);

					fileMgr.selectFile(fileDesc);
				});
			}
		}
	});

	return downloadProvider;
});
