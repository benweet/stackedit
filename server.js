var app = require('./app');

// Listen on port 3000
var port = process.env.PORT || 3000;
app.listen(port, null, function() {
	console.log('Server started: http://localhost:' + port);
});
