const compression = require('compression');
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');
const path = require('path');
const user = require('./user');
const github = require('./github');
const pdf = require('./pdf');
const pandoc = require('./pandoc');
const conf = require('./conf');

const resolvePath = pathToResolve => path.join(__dirname, '..', pathToResolve);

module.exports = (app) => {
  if (process.env.NODE_ENV === 'production') {
    // Enable CORS for fonts
    app.all('*', (req, res, next) => {
      if (/\.(eot|ttf|woff2?|svg)$/.test(req.url)) {
        res.header('Access-Control-Allow-Origin', '*');
      }
      next();
    });

    // Use gzip compression
    app.use(compression());
  }

  app.get('/oauth2/githubToken', github.githubToken);
  app.get('/conf', (req, res) => res.send(conf.publicValues));
  app.get('/userInfo', user.userInfo);
  app.post('/pdfExport', pdf.generate);
  app.post('/pandocExport', pandoc.generate);
  app.post('/paypalIpn', bodyParser.urlencoded({
    extended: false,
  }), user.paypalIpn);

  // Serve landing.html
  app.get('/', (req, res) => res.sendFile(resolvePath('static/landing/index.html')));
  // Serve sitemap.xml
  app.get('/sitemap.xml', (req, res) => res.sendFile(resolvePath('static/sitemap.xml')));
  // Serve callback.html
  app.get('/oauth2/callback', (req, res) => res.sendFile(resolvePath('static/oauth2/callback.html')));
  // Google Drive action receiver
  app.get('/googleDriveAction', (req, res) =>
    res.redirect(`./app#providerId=googleDrive&state=${encodeURIComponent(req.query.state)}`));

  // Serve static resources
  if (process.env.NODE_ENV === 'production') {
    // Serve index.html in /app
    app.get('/app', (req, res) => res.sendFile(resolvePath('dist/index.html')));

    // Serve style.css with 1 day max-age
    app.get('/style.css', (req, res) => res.sendFile(resolvePath('dist/style.css'), {
      maxAge: '1d',
    }));

    // Serve the static folder with 1 year max-age
    app.use('/static', serveStatic(resolvePath('dist/static'), {
      maxAge: '1y',
    }));

    app.use(serveStatic(resolvePath('dist')));
  }
};
