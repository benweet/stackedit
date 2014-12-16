var cluster = require('cluster');
var http = require('http');
var https = require('https');
var app = require('./app');

var count = require('os').cpus().length;

if(!process.env.NO_CLUSTER && cluster.isMaster) {
	for(var i = 0; i < count; i++) {
		cluster.fork();
	}
	cluster.on('exit', function() {
		console.log('Worker died. Spawning a new process...');
		cluster.fork();
	});
}
else {
	var server;
	var port = process.env.PORT || 3000;
	if(port == 443) {
		// Configure HTTPS on OpsWorks
		var fs = require('fs');
		var credentials = {
			key: fs.readFileSync(__dirname + '/../../shared/config/ssl.key', 'utf8'),
			cert: fs.readFileSync(__dirname + '/../../shared/config/ssl.crt', 'utf8'),
			ca: fs.readFileSync(__dirname + '/../../shared/config/ssl.ca', 'utf8').split('\n\n')
		};
		server = https.createServer(credentials, app);
	}
	else {
		server = http.createServer(app);
	}

	server.listen(port, null, function() {
		console.log('Server started: http://localhost:' + port);
	});
}

