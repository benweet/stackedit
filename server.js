var express = require('express');
var app = express();
app.use(express.compress());
app.use('/stackedit', express.static(__dirname));
app.listen(process.env.PORT || 3000);