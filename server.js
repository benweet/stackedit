var cluster = require('cluster');
var app = require('./app');

var count = require('os').cpus().length;

if(!process.env.NO_CLUSTER && cluster.isMaster) {
	for(var i = 0; i < count; i++) {
		cluster.fork();
	}
	cluster.on('exit', function(worker) {
		console.log('Worker died. Spawning a new process...');
		cluster.fork();
	});
}
else {
	// Listen on port 3000
	var port = process.env.PORT || 3000;
	app.listen(port, null, function() {
		console.log('Server started: http://localhost:' + port);
	});
}

