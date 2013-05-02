define(["jquery", "core", "async-runner", "gdrive-provider", "underscore"], function($, core, asyncRunner) {
	var sharing = {};
	
	// Create a map with providerId: providerObject
	var providerMap = _.chain(arguments)
		.map(function(argument) {
			return argument && argument.providerId && [argument.providerId, argument];
		}).compact().object().value();

	sharing.getLink = function(attributes) {
		var provider = providerMap[attributes.provider];
		if(provider === undefined) {
			return undefined;
		}
		var url = [BASE_URL, 'viewer.html?provider=', attributes.provider];
		_.each(provider.sharingAttributes, function(attributeName) {
			url.push('&');
			url.push(attributeName);
			url.push('=');
			url.push(attributes[attributeName]);
		});
		return url.join("");
	};
	
	sharing.createLink = function(attributes, callback) {
		if(attributes.sharingLink !== undefined) {
			callback();
			return;
		}
		var provider = providerMap[attributes.provider];
		if(provider === undefined) {
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
			var url = [MAIN_URL, 'viewer.html?provider=', attributes.provider];
			_.each(provider.sharingAttributes, function(attributeName) {
				url.push('&');
				url.push(attributeName);
				url.push('=');
				url.push(attributes[attributeName]);
			});
			$.getJSON(
		        "https://api-ssl.bitly.com/v3/shorten", 
		        { 
		            "access_token": BITLY_ACCESS_TOKEN,
		            "longUrl": url.join("")
		        },
		        function(response)
		        {
		        	if(response.data) {
		        		shortUrl = response.data.url;
		        	}
		            console.log(shortUrl);
		            task.chain();
		        }
		    );
		});
		task.onSuccess(function() {
			callback(shortUrl);
		});
		asyncRunner.addTask(task);
	};
	
	core.onReady(function() {
		var fileIndexList = _.compact(localStorage["file.list"].split(";"));
		_.each(fileIndexList, function(fileIndex) {
			var publishIndexList = _.compact(localStorage[fileIndex + ".publish"].split(";"));
			_.each(publishIndexList, function(publishIndex) {
				var publishAttributes = JSON.parse(localStorage[publishIndex]);
				sharing.createLink(publishAttributes, function(shortUrl) {
					publishAttributes.sharingLink = shortUrl;
				});
			});
		});
	});
	
	return sharing;
});