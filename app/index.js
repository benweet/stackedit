var express = require('express');
var app = express();
var compression = require('compression');
var serveStatic = require('serve-static');
var fs = require('fs');

// Configure ejs engine
app.set('views', __dirname + '/../views');
app.engine('html', require('ejs').renderFile);

// Force HTTPS on stackedit.io
app.all('*', function(req, res, next) {
	if (req.headers.host == 'stackedit.io' && req.headers['x-forwarded-proto'] != 'https') {
		return res.redirect('https://stackedit.io' + req.url);
	}
	/\.(eot|ttf|woff|svg)$/.test(req.url) && res.header('Access-Control-Allow-Origin', '*');
	next();
});

// Use gzip compression
app.use(compression());

// Serve static resources
var staticOverride = process.env.STATIC_OVERRIDE;
staticOverride && app.use(serveStatic(__dirname + '/../' + staticOverride));
app.use(serveStatic(__dirname + '/../public'));

app.post('/pdfExport', require('./pdf').export);
app.post('/sshPublish', require('./ssh').publish);
app.post('/picasaImportImg', require('./picasa').importImg);
app.get('/downloadImport', require('./download').importPublic);

var packageJson = JSON.parse(fs.readFileSync(__dirname + '/../package.json', {
	encoding: 'utf8'
}));
var cdnLocation = staticOverride == 'public-stackedit.io' ? '//stackedit.s3.amazonaws.com/' + packageJson.version + '/' : '';
app.use(function(req, res, next) {
	res.renderDebug = function(page) {
		return res.render(page, {
			cache: !req.query.hasOwnProperty('debug'),
			cdn: cdnLocation
		});
	};
	next();
});

// Serve landing.html in /
app.get('/', function(req, res) {
	res.renderDebug('landing.html');
});

// Serve editor.html in /viewer
app.get('/editor', function(req, res) {
	res.renderDebug('editor.html');
});

// Serve viewer.html in /viewer
app.get('/viewer', function(req, res) {
	res.renderDebug('viewer.html');
});

// Error 404
app.use(function(req, res) {
	res.status(404);
	res.render('error_404.html');
});

module.exports = app;
