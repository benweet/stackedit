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
var port = process.env.PORT || 3000;
app.listen(port, null, function() {
    console.log('Server started: http://localhost:' + port);
});
