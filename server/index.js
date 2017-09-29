var compression = require('compression');
var serveStatic = require('serve-static');
var path = require('path');

module.exports = function (app, serveV4) {
  // Use gzip compression
  if (process.env.NODE_ENV === 'production') {
    app.all('*', function(req, res, next) {
      // Force HTTPS on stackedit.io
      if (req.headers.host === 'stackedit.io' && !req.secure && req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect('https://stackedit.io' + req.url);
      }
      // Enable CORS for fonts
      if (/\.(eot|ttf|woff|svg)$/.test(req.url)) {
        res.header('Access-Control-Allow-Origin', '*');
      }
      next();
    });

    app.use(compression());
  }

  app.get('/oauth2/githubToken', require('./github').githubToken);
  if (serveV4) {
    app.post('/pdfExport', require('../stackedit_v4/app/pdf').export);
    app.post('/sshPublish', require('../stackedit_v4/app/ssh').publish);
    app.post('/picasaImportImg', require('../stackedit_v4/app/picasa').importImg);
    app.get('/downloadImport', require('../stackedit_v4/app/download').importPublic);
  }

  // Serve callback.html in /app
  app.get('/oauth2/callback', function(req, res) {
    res.sendFile(path.join(__dirname, '../static/oauth2/callback.html'));
  });

  // Serve static resources
  if (process.env.NODE_ENV === 'production') {
    if (serveV4) {
      // Serve landing.html in /
      app.get('/', function(req, res) {
        res.sendFile(require.resolve('../stackedit_v4/views/landing.html'));
      });
      // Serve editor.html in /viewer
      app.get('/editor', function(req, res) {
        res.sendFile(require.resolve('../stackedit_v4/views/editor.html'));
      });
      // Serve viewer.html in /viewer
      app.get('/viewer', function(req, res) {
        res.sendFile(require.resolve('../stackedit_v4/views/viewer.html'));
      });
    }

    // Serve index.html in /app
    app.get('/app', function(req, res) {
      res.sendFile(path.join(__dirname, '../dist/index.html'));
    });

    app.use(serveStatic(path.join(__dirname, '../dist')));

    if (serveV4) {
      app.use(serveStatic(path.dirname(require.resolve('../stackedit_v4/public/cache.manifest'))));

      // Error 404
      app.use(function(req, res) {
        res.status(404).sendFile(require.resolve('../stackedit_v4/views/error_404.html'));
      });
    }
  }
};
