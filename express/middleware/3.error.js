var express = require('express');
var favicon = require('serve-favicon');
var app = express();
app.use(favicon(__dirname+'/favicon.ico'));
app.use('/',function(req,res,next){
    console.log("1");
    //throw Error('error');
    //next(null);
    next();
});
app.use('/',function(req,res){
   console.log("2");
    res.send('welcome');
});

app.use(function(err,req,res,next){
    console.log("3");
    res.send('不好意思没有你找的页面，看看别的吧!');
});

app.listen(8080);