var express = require('express');
var favicon = require('serve-favicon');
var app = express();
var methodOverride = require('method-override');
var path = require('path');
/*app.use(function(req,res,next){
    res.set('X-HTTP-Method-Override','PUT');
    next();
});*/
//三种用法，1.header
//app.use(methodOverride('X-HTTP-Method-Override'));
//2.query取值
//app.use(methodOverride('_method'));
app.use(methodOverride(function(req,res,next){
    var method  = req.body._method;
    req.method = method;
}))
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'index.html'));
});
app.all('/upload',function(req,res){
    console.log(req.method);
   res.end('over');
});
app.use(function(err,req,res){
   // console.log(err);
});
app.listen(8080);