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
	var port = process.env.PORT || 3000;
	var bindIp = process.env.BIND_IP;
	var prettyBindIp = bindIp ? (bindIp.indexOf(':') >= 0 ? '[' + bindIp + ']' : bindIp) : 'localhost';
	if(port == 443) {
		// OpsWorks configuration
		var fs = require('fs');
		var credentials = {
			key: fs.readFileSync(__dirname + '/../../shared/config/ssl.key', 'utf8'),
			cert: fs.readFileSync(__dirname + '/../../shared/config/ssl.crt', 'utf8'),
			ca: fs.readFileSync(__dirname + '/../../shared/config/ssl.ca', 'utf8').split('\n\n')
		};
		var httpsServer = https.createServer(credentials, app);
		httpsServer.listen(port, bindIp, function() {
			console.log('HTTPS server started: https://' + prettyBindIp);
		});
		port = 80;
	}
	var httpServer = http.createServer(app);
	httpServer.listen(port, bindIp, function() {
		console.log('HTTP server started: http://' + prettyBindIp + ':' + port);
	});
}

