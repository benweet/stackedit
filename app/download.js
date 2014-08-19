var request = require('request');

exports.importPublic = function(req, res) {
	var url = req.param('url');
	if(!url) {
		res.send(400, 'No URL parameter');
	}
	else if(url.indexOf("http://") === 0 || url.indexOf("https://") === 0) {
		var stream = request.get(url);
		stream.on('error', function(err) {
			res.send(400, err);
		});
		stream.on('response', function() {
			stream.pipe(res);
		});
	}
	else {
		res.send(400, 'Unknown protocol');
	}
};