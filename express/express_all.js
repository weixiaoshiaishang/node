/**
 * express
 * 1.安装express
 * 2.
 */
var express = require('express');
var app = express();
var util = require('util');
var path = require('path');
app.use(function(req,res,next){
    console.log(req.hostname,req.method,req.url,req.query);
    res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
    next();
});
app.get('/',function(req,res){
    res.end('珠峰培训');
});

app.get('/a',function(req,res){
    res.end('珠峰培训');
});


app.listen(3000);