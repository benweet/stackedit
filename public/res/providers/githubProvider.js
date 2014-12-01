define([
	"utils",
	"underscore",
	"classes/Provider",
	"settings",
	"storage",
	"eventMgr",
	"fileSystem",
	"fileMgr",
	"helpers/githubHelper"
], function(utils, _, Provider, settings, storage, eventMgr, fileSystem, fileMgr, githubHelper) {

	var githubProvider = new Provider("github", "GitHub");
	githubProvider.publishPreferencesInputIds = [
		"github-repo",
		"github-branch"
	];

	githubProvider.getPublishLocationLink = function(attributes) {
		var result = [
			'https://github.com',
			attributes.username,
			attributes.repository,
			'blob',
			attributes.branch
		];
		return result.concat(attributes.path.split('/').map(encodeURIComponent)).join('/');
	};

	githubProvider.publish = function(publishAttributes, frontMatter, title, content, callback) {
		var commitMsg = settings.commitMsg;
		githubHelper.upload(publishAttributes.repository, publishAttributes.username, publishAttributes.branch, publishAttributes.path, content, commitMsg, function(err, username) {
			publishAttributes.username = username;
			callback(err);
		});
	};

	githubProvider.read = function(publishAttributes, callback) {
		githubHelper.read(publishAttributes.repository, publishAttributes.username, publishAttributes.branch, publishAttributes.path, function(err, username, content) {
			if (err === undefined) {
				callback(content);
			} else {
				callback("");
			}
		});
	};

	githubProvider.newPublishAttributes = function(event) {
		var publishAttributes = {};
		publishAttributes.repository = utils.getInputTextValue("#input-publish-github-repo", event);
		publishAttributes.branch = utils.getInputTextValue("#input-publish-github-branch", event);
		publishAttributes.path = utils.getInputTextValue("#input-publish-file-path", event);
		if(event.isPropagationStopped()) {
			return undefined;
		}
		var parsedRepository = publishAttributes.repository.match(/[\/:]?([^\/:]+)\/([^\/]+?)(?:\.git)?$/);
		if(parsedRepository) {
			publishAttributes.repository = parsedRepository[2];
			publishAttributes.username = parsedRepository[1];
		}
		return publishAttributes;
	};

	eventMgr.addListener("onReady", function() {
		if (location.hash) {
			var hash = JSON.parse(location.hash.replace("#", ""));
			if (hash.type === "github") {
				var fileDesc = null;
				utils.retrieveIndexArray("file.list").forEach(function(fileIndex) {
					if (fileSystem[fileIndex].title === hash.publishAttributes.title) {
						fileDesc = fileSystem[fileIndex];
						return;
					}
				});

				githubProvider.read(hash.publishAttributes, function(content) {
					if (fileDesc === null) {
						fileDesc = fileMgr.createFile(hash.publishAttributes.title, content);
					} else {
						var pLoc = fileDesc.publishLocations;
						var loc;
						for (loc in pLoc) {
							if (pLoc.hasOwnProperty(loc) && pLoc[loc].provider.providerId === "github") {
								fileDesc.removePublishLocation(pLoc[loc]);
							}
						}
					}
					var publishIndex;
					hash.publishAttributes.provider = githubProvider;
					do {
						publishIndex = "publish." + utils.id();
					} while(_.has(storage, publishIndex));
					hash.publishAttributes.publishIndex = publishIndex;
					fileDesc.addPublishLocation(hash.publishAttributes);
					eventMgr.onContentChanged(fileDesc, content);

					fileMgr.selectFile(fileDesc);
				});
			}
		}
	});

	return githubProvider;
});
