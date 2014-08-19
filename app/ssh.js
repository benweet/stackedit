var ssh2 = require('ssh2');

exports.publish = function(req, res) {
	var done;
	function sendResult(result) {
		if(!done) {
			res.json(result);
		}
		done = true;
	}
	function sendError(error) {
		sendResult({error: error});
	}

	var conn = new ssh2();
	conn.on('ready', function() {
		conn.sftp(function(err, sftp) {
			if(err) {
				return sendError('Unable to establish SFTP connection');
			}

			var writeStream = sftp.createWriteStream(req.query.path);

			writeStream.on('close', function() {
				sftp.end();
				conn.end();
			});

			writeStream.on('error', function() {
				sendError('Unable to write "' + req.query.path + '"');
				sftp.end();
				conn.end();
			});

			req.pipe(writeStream);
		});
	});

	conn.on('error', function(err) {
		if(err.level == "authentication") {
			return sendError('Authentication failure');
		}
		if(err.code == "ENOTFOUND") {
			return sendError('Host not found');
		}
		if(err.code == "ETIMEDOUT") {
			return sendError('Connection timeout');
		}
		sendError(err);
	});

	conn.on('end', function() {
		sendResult({});
	});

	conn.connect({
		host: req.query.host,
		port: req.query.port || 22,
		username: req.query.username,
		password: req.query.password
	});
};