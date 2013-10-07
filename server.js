var express = require('express');
var app = express();
app.all('*', function(req, res, next) {
    console.log(req.headers);
    if (req.headers.host == 'stackedit.io' && req.headers['x-forwarded-proto'] != 'https') {
        res.redirect('https://stackedit.io' + req.url);
    }
    else {
        next();
    }
});
app.use(express.compress());
app.use(express.static(__dirname + '/public'));
app.listen(process.env.PORT || 3000);