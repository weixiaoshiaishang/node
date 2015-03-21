var express = require('express');
var favicon = require('serve-favicon');
var app = express();
var rowBoy = require('raw-body');
var methodOverride = require('method-override');
var path = require('path');
app.use(function(req,res,next){
    rowBoy(req,{
        length:req.headers['content-length'],
        limit:'1mb'
    },function(err,msg){
        if(err)
            next(err);
        else
            next();
    })
});
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'index.html'));
});
app.post('/upload',function(req,res){
   res.end('over');
});
app.use(function(err,req,res){
    console.log(err);
});
app.listen(8080);