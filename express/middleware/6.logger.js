var express = require('express');
var favicon = require('serve-favicon');
var app = express();
var morgan = require('morgan');
var path = require('path');
/**
 * logger(options);
 * immediate true
 * format default short tiny dev
 * stream
 */
    morgan.token('my',function my(req){
        return req.method.toLowerCase();
    })
var access = require('fs').createWriteStream('./log');
//app.use(morgan({stream:access}));
//app.use(morgan(':url :method :my'));
app.use(morgan(function(tokens,req,res){
    return tokens['my'](req)+require('util').inspect(req.query);
}));
app.get('/',function(req,res){
    res.send('welcome');
})
app.listen(8080);