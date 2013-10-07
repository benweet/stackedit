ac8aab509fc34e298981297ada8346b166caf10a
// Nodetime
if(process.env.NODETIME_ACCOUNT_KEY) {
  require('nodetime').profile({
    accountKey: process.env.NODETIME_ACCOUNT_KEY,
    appName: 'StackEdit'
  });
}

var express = require('express');
var app = express();

// Force HTTPS on stackedit.io
app.all('*', function(req, res, next) {
    if (req.headers.host == 'stackedit.io' && req.headers['x-forwarded-proto'] != 'https') {
        res.redirect('https://stackedit.io' + req.url);
    }
    else {
        next();
    }
});

// Use gzip compression
app.use(express.compress());

// Serve static resources
app.use(express.static(__dirname + '/public'));

// Listen on port 3000
app.listen(process.env.PORT || 3000);
