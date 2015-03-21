var express = require('express');
var serverIndex = require('serve-index');
var staticServer = require('serve-static');
var app = express();
app.use(serverIndex('./',{}));
app.use(staticServer('./'));
app.listen(8080);