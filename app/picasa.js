var request = require('request');

exports.importImg = function(req, res) {
	var stream = req.pipe(request.post({
		uri: 'https://picasaweb.google.com/data/feed/api/user/default/albumid/' + req.query.albumId,
		headers: {
			'Authorization': req.headers.authorization,
			'Content-Type': req.headers['content-type'],
			'Slug': req.headers.slug
		}
	}));
	stream.on('error', function(err) {
		res.send(400, err);
	});
	stream.pipe(res);
};