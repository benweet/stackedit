var cluster = require('cluster');
var http = require('http');
var https = require('https');
var path = require('path');
var express = require('express');
var app = express();

require('./server')(app);

var port = process.env.PORT || 8080;
if(port === 443) {
	var fs = require('fs');
	var credentials = {
		key: fs.readFileSync(path.join(__dirname, '/../../shared/config/ssl.key'), 'utf8'),
		cert: fs.readFileSync(path.join(__dirname, '/../../shared/config/ssl.crt'), 'utf8'),
		ca: fs.readFileSync(path.join(__dirname, '/../../shared/config/ssl.ca'), 'utf8').split('\n\n')
	};
	var httpsServer = https.createServer(credentials, app);
	httpsServer.listen(port, null, function() {
		console.log('HTTPS server started: https://localhost');
	});
	port = 80;
}
var httpServer = http.createServer(app);
httpServer.listen(port, null, function() {
	console.log('HTTP server started: http://localhost:' + port);
});
