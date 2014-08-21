var express = require('express');
var app = express();

// Configure ejs engine
app.set('views', __dirname + '/../public');
app.engine('html', require('ejs').renderFile);

// Force HTTPS on stackedit.io
app.all('*', function(req, res, next) {
	if (req.headers.host == 'stackedit.io' && req.headers['x-forwarded-proto'] != 'https') {
		return res.redirect('https://stackedit.io' + req.url);
	}
	/\.(eot|ttf|woff)$/.test(req.url) && res.header('Access-Control-Allow-Origin', '*');
	next();
});

// Use gzip compression
app.use(express.compress());

// Serve static resources
app.use(express.static(__dirname + '/../public'));

// Serve viewer.html in /viewer
app.get('/viewer', function (req, res) {
	res.render('viewer.html');
});

app.post('/pdfExport', require('./pdf').export);
app.post('/sshPublish', require('./ssh').publish);
app.post('/picasaImportImg', require('./picasa').importImg);
app.get('/downloadImport', require('./download').importPublic);

// Error 404
app.use(function(req, res, next) {
	res.status(404);
	res.render('error_404.html');
});

module.exports = app;
