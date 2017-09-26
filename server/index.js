var compression = require('compression');
var serveStatic = require('serve-static');
var path = require('path');

module.exports = function (app) {
  // Force HTTPS on stackedit.io
  app.all('*', function(req, res, next) {
    if (req.headers.host === 'stackedit.io' && !req.secure && req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect('https://stackedit.io' + req.url);
    }
    /\.(eot|ttf|woff|svg)$/.test(req.url) && res.header('Access-Control-Allow-Origin', '*');
    next();
  });

  // Use gzip compression
  app.use(compression());

  app.post('/pdfExport', require('./pdf').export);
  app.get('/oauth2/githubToken', require('./github').githubToken);

  // Serve landing.html in /
  app.get('/', function(req, res) {
    res.sendFile(require.resolve('stackedit/views/landing.html'));
  });
  // Serve editor.html in /viewer
  app.get('/editor', function(req, res) {
    res.sendFile(require.resolve('stackedit/views/editor.html'));
  });
  // Serve viewer.html in /viewer
  app.get('/viewer', function(req, res) {
    res.sendFile(require.resolve('stackedit/views/viewer.html'));
  });
  // Serve index.html in /app
  app.get('/app', function(req, res) {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
  // Serve callback.html in /app
  app.get('/oauth2/callback', function(req, res) {
    res.sendFile(path.join(__dirname, '../dist/static/oauth2/callback.html'));
  });

  // Serve static resources
  app.use(serveStatic(path.join(__dirname, '../dist'))); // v5
  app.use(serveStatic(path.dirname(require.resolve('stackedit/public/cache.manifest')))); // v4

  // Error 404
  app.use(function(req, res) {
    res.status(404).sendFile(require.resolve('stackedit/views/error_404.html'));
  });
};
