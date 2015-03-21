/**
 * express
 * 1.安装express
 * 2.
 */
var express = require('express');
var app = express();
var path = require('path');
app.get('/',function(req,res){
    res.send('zfpx');
});

app.get('/a',function(req,res){
    res.send(404);//http.STATUS_CODE[404]
});

app.get('/b',function(req,res){
    res.send({name:'zfpx'});
});

app.get('/c',function(req,res){
    res.sendFile(path.join(__dirname,'index.html'));
});
app.listen(3000);